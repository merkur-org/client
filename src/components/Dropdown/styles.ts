import styled from 'styled-components'

import { breakPoints, effects } from '@/styles/constants'

interface styleProps {
  asideOpen: boolean
}
export const DropdownContent = styled.ul`
  --arrowWidth: 8px;
  --arrowRight: 16px;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  z-index: 100;
  right: calc(50% - var(--arrowRight) - var(--arrowWidth));

  margin-top: 0.8rem;
  padding: 1.6rem;

  width: fit-content;
  height: fit-content;
  white-space: nowrap;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${effects.dropShadow};

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &:before,
  &:after {
    content: '';
    position: absolute;
    height: 0px;
    width: 0px;
    right: var(--arrowRight);
    border-width: var(--arrowWidth);
    border-style: solid;
  }
  &:before {
    border-color: transparent transparent ${({ theme }) => theme.colors.white}
      transparent;
    filter: blur(2px);

    bottom: calc(100% + 0.1rem);
    right: calc(var(--arrowRight) - 0.1rem);
    z-index: 80;

    border-width: calc(var(--arrowWidth) + 0.1rem);
  }
  &:after {
    border-color: transparent transparent ${({ theme }) => theme.colors.white}
      transparent;
    z-index: 100;
    bottom: 100%;
  }

  li {
    font-size: 1.6rem;
    text-align: right;

    cursor: pointer;

    width: 100%;

    & + li {
      margin-top: 0.8rem;
    }
  }
`
export const BodyButton = styled.div<styleProps>`
  border: 0;
  background: transparent;
  position: relative;
  cursor: default;
  > span {
    background: transparent;
    border: 0;
    width: 100%;
    cursor: pointer;

    display: flex;
    align-items: center;
    font-size: 1.6rem;

    margin-left: 3.2rem;

    svg {
      margin: 0 1.6rem;
    }
  }
  ${props => props.asideOpen && DropdownContent} {
    opacity: 1;
    visibility: visible;
  }

  ${breakPoints.tablet} {
    margin: 0;
  }
`
