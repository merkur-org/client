import { border, effects, transitions } from '@/styles/constants'
import styled, { keyframes } from 'styled-components'

const buttonClicked = keyframes`
  50%{
    transform: scale(0.95)
  }

  100%{
    transform: scale(1)
  }
`

export const Container = styled.button`
  background-color: ${({ theme }) => theme.colors.greenPrimary};
  color: ${({ theme }) => theme.colors.white};
  transition: background ${transitions.hover};
  &:hover {
    background-color: ${({ theme }) => theme.colors.greenSecundary};
  }

  &:active {
    animation: ${buttonClicked} 0.1s ease-in-out;
    background-color: ${({ theme }) => theme.colors.darkGreen};
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.6rem;
  font-weight: bold;

  border: none;
  border-radius: ${border.borderRadius};
  box-shadow: ${effects.dropShadow};
  padding: 1.6rem;

  width: 100%;
  min-width: 22rem;
  min-height: 4.8rem;
`
