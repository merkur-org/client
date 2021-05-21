import styled, { css } from 'styled-components'

import { breakPoints, effects, transitions } from '@/styles/constants'

interface styleProps {
  asideOpen: boolean
}
export const DropdownContent = styled.ul<styleProps>`
  ${props =>
    props.asideOpen
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `}

  position: absolute;
  z-index: 100;
  left: 0;
  top: 4.8rem;

  padding: 1.6rem;

  width: fit-content;
  height: fit-content;
  white-space: nowrap;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${effects.dropShadow};

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  li {
    font-size: 1.6rem;
    text-align: right;

    cursor: pointer;

    width: 100%;

    & + li {
      margin-top: 0.8rem;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.orangePrimary};
    }
  }
`
export const BodyButton = styled.div`
  border: 0;
  background: transparent;
  position: relative;

  cursor: default;
  > button {
    background: transparent;
    border: 0;
    width: fit-content;
    cursor: pointer;
    transition: all ${transitions.hover};

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.6rem;
    text-align: left;
    padding: 0.8rem;

    span {
      color: ${({ theme }) => theme.colors.gray};
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.lightGray};
    }

    svg {
      margin: 0 1.6rem;
    }
  }

  ${breakPoints.tablet} {
    margin: 0;
  }
`
