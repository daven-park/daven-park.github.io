import Template from 'components/Common/Template'
import CommentWidget from 'components/Post/CommentWidget'
import PostContent from 'components/Post/PostContent'
import PostHead from 'components/Post/PostHead'
import TableOfContents from 'components/Post/TableOfContents'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { FC } from 'react'

type PostPageItemType = {
  node: {
    html: string
    frontmatter: {
      title: string
      summary: string
      date: string
      categories: string[]
      thumbnail: {
        publicURL: string
      }
    }
  }
}

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
  location: {
    href: string
  }
}

/* 본문 영역: 페이지 정중앙 정렬 */
const PostWrapper = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 100px;

  @media (max-width: 768px) {
    padding: 0 20px 80px;
  }
`

/* 목차: 본문 오른쪽에 고정 — 뷰포트 50% + 본문 절반(360px) + 여백(20px) */
const TocArea = styled.aside`
  position: fixed;
  top: 60px;
  left: calc(50% + 380px);
  width: 220px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 4px;
  }

  @media (max-width: 1199px) {
    display: none;
  }
`

const PostTemplate: FC<PostTemplateProps> = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}) => {
  const {
    node: {
      html,
      frontmatter: { title, summary, date, categories, thumbnail },
    },
  } = edges[0]

  return (
    <Template
      title={title}
      description={summary}
      url={href}
      image={thumbnail?.publicURL ?? ''}
    >
      <PostWrapper>
        <PostHead title={title} date={date} categories={categories} />
        <PostContent html={html} />
        <CommentWidget />
      </PostWrapper>
      <TocArea>
        <TableOfContents html={html} />
      </TocArea>
    </Template>
  )
}

export default PostTemplate

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  }
`
