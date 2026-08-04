import { FC } from 'react'
import { Global, css } from '@emotion/react'

const defaultStyle = css`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

  /* Light mode (default) */
  :root,
  [data-theme='light'] {
    --color-bg: #f8f9fa;
    --color-bg-nav: #ffffff;
    --color-bg-secondary: #f9fafb;
    --color-bg-code-inline: #e5e7eb;
    --color-inline-code-text: #4f46e5;
    --color-bg-blockquote: #f5f3ff;
    --color-text-primary: #111827;
    --color-text-secondary: #374151;
    --color-text-body: #1f2937;
    --color-text-muted: #6b7280;
    --color-text-subtle: #9ca3af;
    --color-border: #e5e7eb;
    --color-border-light: #f3f4f6;
    --color-accent: #4f46e5;
    --color-accent-bg: #ede9fe;
    --color-accent-text: #4f46e5;
  }

  /* Dark mode */
  [data-theme='dark'] {
    --color-bg: #191919;
    --color-bg-nav: #191919;
    --color-bg-secondary: #2d2d2d;
    --color-bg-code-inline: #2d2d2d;
    --color-inline-code-text: #f8f9fa;
    --color-bg-blockquote: #2d2d2d;
    --color-text-primary: #f8f9fa;
    --color-text-secondary: #ced4da;
    --color-text-body: #ced4da;
    --color-text-muted: #adb5bd;
    --color-text-subtle: #adb5bd;
    --color-border: #2d2d2d;
    --color-border-light: #2d2d2d;
    --color-accent: #f8f9fa;
    --color-accent-bg: #2d2d2d;
    --color-accent-text: #f8f9fa;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, sans-serif;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text-body);
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.2s, color 0.2s;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`

const GlobalStyle: FC = () => {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle
