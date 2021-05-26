import { breakPoints } from '@/styles/constants'
import styled, { css } from 'styled-components'
export const PaginationComponent = styled.section`
  display: inline-flex;
  white-space: nowrap;
  overflow-x: auto;
  justify-content: flex-start;

  margin-top: 5.6rem;

  border: 1px solid red;

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

  .pageNumbers {
    list-style: none;
    display: flex;
  }

  .pageNumbers button {
    border-radius: 0;
  }

  @media ${breakPoints.tablet} {
    justify-content: center;
  }
`
interface PaginationStyleProps {
  isSelected: boolean
}

export const PageButton = styled.button<PaginationStyleProps>`
  ${props =>
    props.isSelected &&
    css`
      font-weight: bold;
      color: ${({ theme }) => theme.colors.orangePrimary};
    `}

  &:active {
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    background: transparent;

    cursor: pointer;

    font-size: 1.6rem;
  }
`
