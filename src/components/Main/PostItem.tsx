import { FC } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { PostFrontmatterType } from 'types/PostItem.types'

type PostItemProps = PostFrontmatterType & { link: string }

const PostItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 28px 0;
  border-bottom: 1px solid var(--color-border-light);
  text-decoration: none;

  &:last-child {
    border-bottom: none;
  }

  &:hover .post-title {
    text-decoration: underline;
    text-decoration-color: var(--color-text-primary);
    text-underline-offset: 3px;
  }
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.45;
  margin-bottom: 10px;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Summary = styled.div`
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  margin-bottom: 20px;
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`

const DateText = styled.div`
  font-size: 14px;
  color: var(--color-text-subtle);
  white-space: nowrap;
  flex-shrink: 0;
`

const TagRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
`

const Tag = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--color-accent-text);
  background: var(--color-accent-bg);
  padding: 2px 9px;
  border-radius: 9999px;
`

const PostItem: FC<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  link,
}) {
  return (
    <PostItemWrapper to={link}>
      <Title className="post-title">{title}</Title>
      <Summary>{summary}</Summary>
      <BottomRow>
        <DateText>{date}</DateText>
        <TagRow>
          {categories.map(cat => (
            <Tag key={cat}>{cat}</Tag>
          ))}
        </TagRow>
      </BottomRow>
    </PostItemWrapper>
  )
}

export default PostItem
