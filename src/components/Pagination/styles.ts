import { breakPoints } from '@/styles/constants'
import styled, { css } from 'styled-components'
export const PaginationComponent = styled.section`
  display: flex;
  width: 100%;
  overflow-x: auto;

  justify-content: center;

  padding: 0 1.6rem;
  margin-top: 5.6rem;

  button {
    padding: 1.6rem 2.4rem;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    background: transparent;

    cursor: pointer;

    font-size: 1.6rem;
  }

  button:first-child {
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
  }

  button:last-child {
    border-top-right-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
  }

  @media ${breakPoints.tablet} {
    padding: 0;
  }
`
interface PaginationStyleProps {
  isSelected: boolean
  isCurrentPage: boolean
}

export const PageButton = styled.button<PaginationStyleProps>`
  ${props =>
    props.isCurrentPage
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          display: none;
        `}

  ${props =>
    props.isSelected &&
    css`
      font-weight: bold;
      color: ${({ theme }) => theme.colors.orangePrimary};
    `}

  &:active {
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    background: transparent;
  }
  cursor: pointer;

  font-size: 1.6rem;

  @media ${breakPoints.laptop} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
