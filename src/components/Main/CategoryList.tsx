import { FC, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

type CategoryItemProps = {
  active: boolean
}

type GatsbyLinkProps = {
  children: ReactNode
  className?: string
  to: string
} & CategoryItemProps

export type CategoryListProps = {
  selectedCategory: string
  categoryList: {
    [key: string]: number
  }
}

const CategoryListWrapper = styled.div`
  padding: 8px 0;
`

const SidebarTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: var(--color-text-subtle);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  padding-left: 12px;
`

const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  font-size: 13px;
  color: ${({ active }) => (active ? 'var(--color-accent)' : 'var(--color-text-muted)')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  border-left: 2px solid
    ${({ active }) => (active ? 'var(--color-accent)' : 'transparent')};
  text-decoration: none;
  transition: all 0.15s;

  &:hover {
    color: var(--color-text-primary);
    background: var(--color-border-light);
  }
`

const Count = styled.span`
  font-size: 12px;
  color: var(--color-text-subtle);
  font-weight: 400;
`

const CategoryList: FC<CategoryListProps> = ({
  selectedCategory,
  categoryList,
}) => {
  return (
    <CategoryListWrapper>
      <SidebarTitle>카테고리</SidebarTitle>
      {Object.entries(categoryList).map(([name, count]) => (
        <CategoryItem
          to={`/?category=${name}`}
          active={name === selectedCategory}
          key={name}
        >
          <span>{name}</span>
          <Count>{count}</Count>
        </CategoryItem>
      ))}
    </CategoryListWrapper>
  )
}

export default CategoryList
