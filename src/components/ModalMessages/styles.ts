import { border, effects } from '@/styles/constants'
import styled, { keyframes, css } from 'styled-components'

interface OpenModalProps {
  isOpen: boolean
  time: number
  type: string
}

const openAnimation = keyframes`
  0% {
    transform: translate(0, 200%);
  }

  25%{
    transform: translate(0, 0);
  }

  70%{
    transform: translate(0, 0);
  }

  85%{
    transform: translate(0, -20%);
  }

  100%{
    transform: translate(0, 200%);
  }
`

export const Container = styled.div<OpenModalProps>`
  display: none;
  transform: translate(0, 300%);

  p {
    transform: translateX(-50%);

    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${effects.dropShadow};
    border-radius: ${border.borderRadius};

    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;

    padding: 0.8rem;

    ${props => {
      if (props.type === 'success') {
        return css`
          background-color: ${({ theme }) => theme.colors.greenPrimary};
        `
      } else if (props.type === 'error') {
        return css`
          background-color: ${({ theme }) => theme.colors.redPrimary};
        `
      }
    }}
  }

  ${props =>
    props.isOpen &&
    css`
      display: flex;

      position: fixed;
      z-index: 100;
      left: 50%;

      animation: ${openAnimation} 2s ease-in-out;
    `}
`
