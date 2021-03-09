import { border, effects, transitions } from '@/styles/constants'
import styled from 'styled-components'

export const Container = styled.button`
  background-color: ${({ theme }) => theme.colors.greenPrimary};
  color: ${({ theme }) => theme.colors.white};
  transition: background ${transitions.hover};
  &:hover {
    background-color: ${({ theme }) => theme.colors.greenSecundary};
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
