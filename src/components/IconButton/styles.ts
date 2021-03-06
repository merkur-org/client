import { border, effects, transitions } from '@/styles/constants'
import styled from 'styled-components'

export const Container = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;

  height: 6rem;
  width: max-content;
  font-size: 64px;
  float: right;

  color: ${({ theme }) => theme.colors.greenPrimary};
`
