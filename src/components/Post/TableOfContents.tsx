import { AnchorHTMLAttributes, FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'

type HeadingItem = {
  id: string
  text: string
  level: number
}

type TocLinkCustomProps = {
  level: number
  active: boolean
}

type TableOfContentsProps = {
  html: string
}

function parseHeadings(html: string): HeadingItem[] {
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi
  const result: HeadingItem[] = []
  let match

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const raw = match[2].replace(/<[^>]*>/g, '').trim()
    const id = raw
      .toLowerCase()
      .replace(/[^\w가-힣\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
    result.push({ id, text: raw, level })
  }

  return result
}

const TocWrapper = styled.div`
  padding: 24px 0;
`

const TocTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-subtle);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  padding-left: 12px;
`

const TocLink = styled(
  ({
    level: _level,
    active: _active,
    ...props
  }: TocLinkCustomProps & AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} />
  ),
)<TocLinkCustomProps>`
  display: block;
  padding: 5px 12px 5px ${({ level }) => (level === 3 ? '24px' : '12px')};
  font-size: 13px;
  line-height: 1.5;
  color: ${({ active }) =>
    active ? 'var(--color-accent)' : 'var(--color-text-muted)'};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  border-left: 2px solid
    ${({ active }) => (active ? 'var(--color-accent)' : 'transparent')};
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    color: var(--color-text-primary);
    background: var(--color-border-light);
  }
`

const TableOfContents: FC<TableOfContentsProps> = ({ html }) => {
  const headings = parseHeadings(html)
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    if (headings.length === 0) return

    const postContent = document.querySelector('.post-content')
    if (!postContent) return

    // heading 요소에 id 부여
    const els = postContent.querySelectorAll('h2, h3')
    els.forEach((el, i) => {
      if (headings[i]) el.id = headings[i].id
    })

    // 스크롤 위치 기반으로 현재 섹션 추적
    const onScroll = () => {
      const headingEls = Array.from(els) as HTMLElement[]
      let current = headings[0]?.id ?? ''

      headingEls.forEach(el => {
        if (el.getBoundingClientRect().top <= 100) {
          current = el.id
        }
      })

      setActiveId(current)
    }

    onScroll() // 초기 실행
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (headings.length === 0) return null

  return (
    <TocWrapper>
      <TocTitle>목차</TocTitle>
      {headings.map(({ id, text, level }) => (
        <TocLink
          key={id}
          href={`#${id}`}
          level={level}
          active={id === activeId}
        >
          {text}
        </TocLink>
      ))}
    </TocWrapper>
  )
}

export default TableOfContents
