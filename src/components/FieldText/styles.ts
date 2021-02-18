import styled, { css, keyframes } from 'styled-components'
import Tooltip from '../Tooltip'

export const Error = styled(Tooltip)`
  svg {
    margin: 0;
    color: ${({ theme }) => theme.colors.error};
    cursor: pointer;
  }
  span {
    background: ${({ theme }) => theme.colors.error};
    color: white;
    &::before {
      border-color: ${({ theme }) => theme.colors.error} transparent;
    }
  }
`
const showMessage = keyframes`
  0%,80%{
    opacity: 1;
    visibility: visible;
  }
  100%{
    opacity: 0;
    visibility: hidden;
  }
`
export const BodyField = styled.label<{ isEmpty: boolean }>`
  width: 100%;
  min-width: 26.4rem;
  min-height: 3.2rem;

  border-bottom: 0.5px solid ${({ theme }) => theme.colors.gray};

  position: relative;
  display: flex;
  align-items: center;

  cursor: text;
  font-size: 1.6rem;
  font-weight: 400;

  ${Error} {
    align-self: flex-start;
    margin-top: calc((2.4rem - 1.6rem + 1.2rem / 2) / 2);
    svg {
      font-size: 1.2rem;
    }
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0.8rem;

    color: ${({ theme }) => theme.colors.gray};

    transition: 0.5s;
    cursor: text;
  }
  :focus-within {
    label {
      top: -1.6rem;
      color: ${({ theme }) => theme.colors.greenPrimary};
    }
    ${Error} {
      &:hover span {
        opacity: 1;
        animation-duration: 0s;
      }
      span {
        animation: 3s ease-in-out 0s 1 none running ${showMessage};
      }
    }
  }
  ${props =>
    !props.isEmpty &&
    css`
      label {
        top: -1rem;
      }
    `}

  :focus-within::after {
    width: 100%;
    height: 1.92px;
    content: '';
    background: ${({ theme }) => theme.colors.greenPrimary};
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`
