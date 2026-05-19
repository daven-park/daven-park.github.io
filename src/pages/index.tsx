import { FC, useMemo } from 'react'
import styled from '@emotion/styled'
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList'
import PostList from 'components/Main/PostList'
import { graphql } from 'gatsby'
import { PostListItemType } from 'types/PostItem.types'
import queryString, { ParsedQuery } from 'query-string'
import Template from 'components/Common/Template'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[]
    }
    file: {
      publicURL: string
    }
  }
}

const PostWrapper = styled.div`
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  padding: 0 24px 100px;

  @media (max-width: 768px) {
    padding: 0 20px 80px;
  }
`

/* 카드 목록 */
const PostListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 24px;
`

/* 카테고리 사이드바 */
const CategorySidebar = styled.aside`
  position: fixed;
  top: 60px;
  left: calc(50% + 380px);
  width: 200px;
  max-height: calc(100vh - 100px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 4px;
  }

  @media (max-width: 1199px) {
    display: none;
  }
`

const IndexPage: FC<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    file,
  },
}) {
  const parsed: ParsedQuery<string> = queryString.parse(search)
  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : parsed.category

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: PostListItemType,
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1
            else list[category]++
          })
          list['All']++

          return list
        },
        { All: 0 },
      ),
    [],
  )

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={file?.publicURL ?? ''}
    >
      <PostWrapper>
        <PostListSection>
          <PostList selectedCategory={selectedCategory} posts={edges} />
        </PostListSection>
      </PostWrapper>
      <CategorySidebar>
        <CategoryList
          selectedCategory={selectedCategory}
          categoryList={categoryList}
        />
      </CategorySidebar>
    </Template>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: [{ frontmatter: { date: DESC } }, { frontmatter: { title: ASC } }]
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
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      publicURL
    }
  }
`
