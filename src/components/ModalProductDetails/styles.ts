import styled from 'styled-components'

import { effects } from '@/styles/constants'

interface styleProps {
  asideOpen: boolean
}
export const ModalContent = styled.div`
  opacity: 0;
  visibility: hidden;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  height: 100vh;
  width: 100vw;
  bottom: 0;
  top: 0;
  z-index: 100;
  border-radius: 0.4rem;
  box-shadow: ${effects.dropShadow};
  display: flex;
  flex-direction: column;
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
  }
  ${props => props.asideOpen && ModalContent} {
    opacity: 1;
    visibility: visible;
  }
`
