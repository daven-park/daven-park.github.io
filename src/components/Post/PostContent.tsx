import styled from '@emotion/styled'
import { FC } from 'react'

interface PostContentProps {
  html: string
}

const MarkdownRenderer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0 60px;
  word-break: keep-all;
  overflow-wrap: break-word;

  line-height: 1.85;
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text-body);

  p {
    margin-bottom: 12px;
  }

  h1,
  h2,
  h3 {
    font-weight: 800;
    color: var(--color-text-primary);
    letter-spacing: -0.3px;
    scroll-margin-top: 80px;
  }

  h1 {
    font-size: 28px;
    padding-top: 36px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 22px;
    padding-top: 32px;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 18px;
    padding-top: 24px;
    margin-bottom: 12px;
  }

  blockquote {
    margin: 24px 0;
    padding: 14px 18px;
    border-left: 3px solid var(--color-border);
    background: var(--color-bg-secondary);
    border-radius: 0 6px 6px 0;
    color: var(--color-text-muted);
    font-size: 0.93em;
    font-weight: 400;

    p {
      margin: 0;
    }
  }

  ol,
  ul {
    margin: 16px 0 16px 20px;

    li {
      margin: 6px 0;
      line-height: 1.75;
    }
  }

  hr {
    border: none;
    border-top: 1px solid var(--color-border);
    margin: 32px 0;
  }

  a {
    color: var(--color-accent-text);
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      opacity: 0.8;
    }
  }

  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 8px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    font-size: 14px;

    th,
    td {
      border: 1px solid var(--color-border);
      padding: 10px 14px;
      text-align: left;
    }

    th {
      background: var(--color-bg-secondary);
      font-weight: 700;
    }

    tr:nth-child(even) td {
      background: var(--color-bg-secondary);
    }
  }

  /* 인라인 코드 */
  code:not([class*='language-']) {
    background: var(--color-bg-code-inline);
    color: var(--color-inline-code-text);
    padding: 2px 6px;
    border-radius: 5px;
    font-size: 0.875em;
    font-weight: 700;
    font-family: 'Fira Code', 'JetBrains Mono', 'Consolas', monospace;
  }

  /* 코드 블록 — GitHub Dark */
  pre[class*='language-'] {
    margin: 28px 0;
    padding: 20px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.65;
    overflow-x: auto;
    background: #0d1117 !important;

    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    tab-size: 2;
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
    color: #c9d1d9;
  }

  /* GitHub Dark 토큰 색상 */
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #8b949e;
    font-style: italic;
  }

  .token.keyword,
  .token.boolean {
    color: #ff7b72;
  }

  .token.operator {
    color: #ff7b72;
  }

  .token.string,
  .token.char,
  .token.attr-value {
    color: #a5d6ff;
  }

  .token.number {
    color: #79c0ff;
  }

  .token.function,
  .token.function-name {
    color: #d2a8ff;
  }

  .token.class-name,
  .token.builtin {
    color: #ffa657;
  }

  .token.attr-name {
    color: #79c0ff;
  }

  .token.property {
    color: #79c0ff;
  }

  .token.tag,
  .token.selector {
    color: #7ee787;
  }

  .token.punctuation {
    color: #c9d1d9;
  }

  .token.variable,
  .token.parameter {
    color: #c9d1d9;
  }

  .token.regex,
  .token.important {
    color: #ffa657;
  }

  .token.constant {
    color: #79c0ff;
  }

  .token.inserted {
    color: #7ee787;
  }

  .token.deleted {
    color: #ff7b72;
  }

  /* GitHub Light 테마 (라이트 모드) */
  [data-theme='light'] & pre[class*='language-'] {
    background: #f6f8fa !important;
  }

  [data-theme='light'] & code[class*='language-'],
  [data-theme='light'] & pre[class*='language-'] {
    color: #24292f;
  }

  [data-theme='light'] & pre[class*='language-']::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
  }

  [data-theme='light'] & .token.comment,
  [data-theme='light'] & .token.prolog,
  [data-theme='light'] & .token.doctype,
  [data-theme='light'] & .token.cdata {
    color: #6e7781;
  }

  [data-theme='light'] & .token.keyword,
  [data-theme='light'] & .token.boolean {
    color: #cf222e;
  }

  [data-theme='light'] & .token.operator {
    color: #cf222e;
  }

  [data-theme='light'] & .token.string,
  [data-theme='light'] & .token.char,
  [data-theme='light'] & .token.attr-value {
    color: #0a3069;
  }

  [data-theme='light'] & .token.number {
    color: #0550ae;
  }

  [data-theme='light'] & .token.function,
  [data-theme='light'] & .token.function-name {
    color: #6639ba;
  }

  [data-theme='light'] & .token.class-name,
  [data-theme='light'] & .token.builtin {
    color: #953800;
  }

  [data-theme='light'] & .token.attr-name,
  [data-theme='light'] & .token.property {
    color: #0550ae;
  }

  [data-theme='light'] & .token.tag,
  [data-theme='light'] & .token.selector {
    color: #116329;
  }

  [data-theme='light'] & .token.punctuation,
  [data-theme='light'] & .token.variable,
  [data-theme='light'] & .token.parameter {
    color: #24292f;
  }

  [data-theme='light'] & .token.regex,
  [data-theme='light'] & .token.important {
    color: #953800;
  }

  [data-theme='light'] & .token.constant {
    color: #0550ae;
  }

  [data-theme='light'] & .token.inserted {
    color: #116329;
  }

  [data-theme='light'] & .token.deleted {
    color: #cf222e;
  }

  @media (max-width: 768px) {
    padding: 32px 0 60px;
    line-height: 1.75;
    font-size: 15px;

    h1 {
      font-size: 22px;
    }

    h2 {
      font-size: 19px;
    }

    h3 {
      font-size: 16px;
    }

    img {
      width: 100%;
    }

    pre[class*='language-'] {
      font-size: 13px;
      border-radius: 8px;
    }

    hr {
      margin: 36px 0;
    }
  }
`

const PostContent: FC<PostContentProps> = ({ html }) => {
  return (
    <MarkdownRenderer
      className="post-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default PostContent
