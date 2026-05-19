import { FC } from 'react'
import styled from '@emotion/styled'

export type PostHeadProps = {
  title: string
  date: string
  categories: string[]
}

const Wrapper = styled.div`
  padding: 16px 0 20px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 20px 0 16px;
  }
`

const Title = styled.h1`
  font-size: 34px;
  font-weight: 800;
  line-height: 1.35;
  color: var(--color-text-primary);
  letter-spacing: -0.5px;
  margin-bottom: 18px;
  word-break: keep-all;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`

const CategoryTag = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent-text);
  background: var(--color-accent-bg);
  padding: 3px 10px;
  border-radius: 9999px;
`

const Dot = styled.span`
  color: var(--color-border);
`

const DateText = styled.span`
  font-size: 14px;
  color: var(--color-text-subtle);
`

const PostHead: FC<PostHeadProps> = ({ title, date, categories }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Meta>
        {categories.map(cat => (
          <CategoryTag key={cat}>{cat}</CategoryTag>
        ))}
        <Dot>·</Dot>
        <DateText>{date}</DateText>
      </Meta>
    </Wrapper>
  )
}

export default PostHead
