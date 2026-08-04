import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { Link, useStaticQuery, graphql } from 'gatsby'

type SearchModalProps = {
  onClose: () => void
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
`

const ModalBox = styled.div`
  background: var(--color-bg-nav);
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin: 0 16px;
`

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--color-border);
  gap: 12px;

  svg {
    width: 20px;
    height: 20px;
    color: var(--color-text-subtle);
    flex-shrink: 0;
  }
`

const SearchInput = styled.input`
  flex: 1;
  height: 56px;
  border: none;
  outline: none;
  font-size: 16px;
  color: var(--color-text-primary);
  background: transparent;
  font-family: inherit;

  &::placeholder {
    color: var(--color-text-subtle);
  }
`

const CloseButton = styled.button`
  border: 1px solid var(--color-border);
  background: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-muted);
  padding: 4px 8px;
  border-radius: 6px;
  font-family: inherit;
  white-space: nowrap;

  &:hover {
    background: var(--color-border-light);
  }
`

const ResultList = styled.div`
  max-height: 380px;
  overflow-y: auto;
`

const ResultItem = styled(Link)`
  display: block;
  padding: 14px 20px;
  border-bottom: 1px solid var(--color-border-light);
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--color-bg-secondary);
  }
`

const ResultTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
`

const ResultMeta = styled.div`
  font-size: 13px;
  color: var(--color-text-muted);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const EmptyState = styled.div`
  padding: 48px 20px;
  text-align: center;
  color: var(--color-text-subtle);
  font-size: 15px;
`

const SearchModal: FC<SearchModalProps> = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const data = useStaticQuery(graphql`
    query SearchQuery {
      allMarkdownRemark(
        sort: [{ frontmatter: { date: DESC } }]
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              summary
              date(formatString: "YYYY.MM.DD.")
              categories
            }
          }
        }
      }
    }
  `)

  useEffect(() => {
    inputRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const posts = data.allMarkdownRemark.edges
  const trimmed = query.trim()
  const filtered =
    trimmed.length > 0
      ? posts.filter(({ node }: any) => {
          const { title, summary } = node.frontmatter
          const q = trimmed.toLowerCase()
          return (
            title.toLowerCase().includes(q) ||
            summary.toLowerCase().includes(q)
          )
        })
      : []

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <SearchInputWrapper>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <SearchInput
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요..."
          />
          <CloseButton onClick={onClose}>ESC</CloseButton>
        </SearchInputWrapper>

        <ResultList>
          {trimmed.length === 0 ? (
            <EmptyState>검색어를 입력하면 결과가 표시됩니다</EmptyState>
          ) : filtered.length === 0 ? (
            <EmptyState>'{trimmed}'에 대한 검색 결과가 없습니다</EmptyState>
          ) : (
            filtered.map(({ node }: any) => (
              <ResultItem
                key={node.id}
                to={node.fields.slug}
                onClick={onClose}
              >
                <ResultTitle>{node.frontmatter.title}</ResultTitle>
                <ResultMeta>{node.frontmatter.summary}</ResultMeta>
              </ResultItem>
            ))
          )}
        </ResultList>
      </ModalBox>
    </Overlay>
  )
}

export default SearchModal
