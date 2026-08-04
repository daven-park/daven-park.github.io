import { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import Template from 'components/Common/Template'

type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
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
  color: var(--color-text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`

const PageSubtitle = styled.p`
  font-size: 16px;
  color: var(--color-text-muted);
  margin-bottom: 40px;
  line-height: 1.6;
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 36px 0;
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 20px;
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const InfoItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 4px;
  }
`

const Label = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  min-width: 120px;
  padding-top: 2px;
`

const Value = styled.div`
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.6;
`

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Tag = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: var(--color-accent-text);
  background: var(--color-accent-bg);
  padding: 4px 12px;
  border-radius: 9999px;
`

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title, description, author, siteUrl },
    },
  },
}) {
  return (
    <Template
      title={`About | ${title}`}
      description={description}
      url={`${siteUrl}/info`}
      image=""
    >
      <Wrapper>
        <PageTitle>About Me</PageTitle>
        <PageSubtitle>
          안녕하세요, {author}입니다.
          <br />
          기억보단 기록을 남기는 것을 좋아하는 주니어 프론트엔드 개발자입니다.
          배우고 경험한 것들을 이 블로그에 자유롭게 기록합니다.
        </PageSubtitle>

        <Divider />

        <SectionTitle>기본 정보</SectionTitle>
        <InfoRow>
          <InfoItem>
            <Label>이름</Label>
            <Value>{author}</Value>
          </InfoItem>
          <InfoItem>
            <Label>깃허브</Label>
            <Value>{siteUrl}</Value>
          </InfoItem>
          <InfoItem>
            <Label>관심 분야</Label>
            <TagRow>
              <Tag>DevOps</Tag>
              <Tag>AWS</Tag>
              <Tag>Docker</Tag>
              <Tag>Java</Tag>
              <Tag>Spring</Tag>
              <Tag>Kubernetes</Tag>
              <Tag>Terraform</Tag>
              <Tag>CI/CD</Tag>
              <Tag>Git</Tag>
              <Tag>GitHub</Tag>
              <Tag>GitLab</Tag>
              <Tag>GitLab</Tag>
            </TagRow>
          </InfoItem>
        </InfoRow>
      </Wrapper>
    </Template>
  )
}

export default InfoPage

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`
