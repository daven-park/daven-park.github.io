import { FC } from 'react'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import Template from 'components/Common/Template'

type PortfolioPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
  }
}

const Wrapper = styled.div`
  max-width: 720px;
  margin: 60px auto 80px;
  padding: 0 24px;

  @media (max-width: 768px) {
    margin-top: 40px;
    padding: 0 16px;
  }
`

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`

const PageSubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 48px;
  line-height: 1.6;
`

const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px 40px;
  border: 2px dashed #e5e7eb;
  border-radius: 16px;
  color: #9ca3af;
  text-align: center;
`

const EmptyIcon = styled.div`
  font-size: 40px;
`

const EmptyText = styled.div`
  font-size: 16px;
  font-weight: 500;
`

const EmptySubText = styled.div`
  font-size: 13px;
`

const PortfolioPage: FC<PortfolioPageProps> = ({
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
  },
}) => {
  return (
    <Template
      title={`Portfolio | ${title}`}
      description={description}
      url={`${siteUrl}/portfolio`}
      image=""
    >
      <Wrapper>
        <PageTitle>Portfolio</PageTitle>
        <PageSubtitle>제가 만든 프로젝트들을 소개합니다.</PageSubtitle>
        <EmptyBox>
          <EmptyIcon>🚀</EmptyIcon>
          <EmptyText>포트폴리오를 준비 중입니다</EmptyText>
          <EmptySubText>곧 업데이트될 예정이에요!</EmptySubText>
        </EmptyBox>
      </Wrapper>
    </Template>
  )
}

export default PortfolioPage

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`
