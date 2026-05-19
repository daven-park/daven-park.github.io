import { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import SearchModal from './SearchModal'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--color-bg-nav);
  border-bottom: 1px solid var(--color-border);
  z-index: 100;
  transition: background 0.2s, border-color 0.2s;
`

const NavInner = styled.div`
  max-width: 720px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`

const LogoLink = styled(Link)`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  line-height: 1;
`

const LogoMain = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: -0.5px;
`

const LogoSub = styled.span`
  font-size: 10px;
  color: var(--color-text-subtle);
  font-weight: 400;
  align-self: flex-end;
  margin-top: 1px;
  letter-spacing: 0.2px;
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const NavLink = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-secondary);
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: var(--color-border-light);
    color: var(--color-text-primary);
  }
`

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--color-text-muted);
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
  margin-left: 4px;

  &:hover {
    background: var(--color-border-light);
    color: var(--color-text-primary);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const Header: FC = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored === 'dark' || (!stored && prefersDark)
    setIsDark(dark)
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

  return (
    <Nav>
      <NavInner>
        <LogoLink to="/">
          <LogoMain>Davlog</LogoMain>
          <LogoSub>Daven + Blog</LogoSub>
        </LogoLink>
        <NavMenu>
          <NavLink to="/info">About</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <IconButton onClick={() => setSearchOpen(true)} aria-label="검색">
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
          </IconButton>
          <IconButton onClick={toggleTheme} aria-label="테마 전환">
            {isDark ? (
              /* 다크모드일 때 → 해 아이콘 (라이트로 전환) */
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* 라이트모드일 때 → 달 아이콘 (다크로 전환) */
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </IconButton>
        </NavMenu>
      </NavInner>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </Nav>
  )
}

export default Header
