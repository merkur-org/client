import styled from 'styled-components'

import { border, effects } from '@/styles/constants'
import device from '@/styles/constants/breakPoints'

interface styleProps {
  asideOpen: boolean
}

export const CloseButton = styled.button`
  position: absolute;
  height: 6.4rem;
  width: 6.4rem;

  border: 0;
  border-bottom-left-radius: 16px;

  right: 0rem;
  top: 0rem;

  background: ${({ theme }) => theme.colors.orangePrimary};

  svg {
    color: ${({ theme }) => theme.colors.white};
    font-size: 4.8rem;
    font-weight: bold;
  }
  &:hover {
    background: '#CB7903';
  }
`

export const BodyButton = styled.div<styleProps>`
  border: 0;
  background: transparent;
  position: relative;

  cursor: default;
  > span {
    background: red;
    border: 0;
    width: 100%;
    cursor: pointer;
  }
  ${props => props.asideOpen && ModalContent} {
    opacity: 1;
    visibility: visible;
  }
`
export const ModalContent = styled.div`
  opacity: 0;
  visibility: hidden;
  overflow-y: auto;
  max-height: 100vh;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100vw;
  min-height: 100vh;

  /* bottom: 0; */
  top: 0;
  right: 0;
  z-index: 100;
  border-radius: 0.4rem;
  box-shadow: ${effects.dropShadow};
  display: flex;
  flex-direction: column;

  hr {
    margin-top: 1.6rem;
    /* width: 100vw; */
    /* position: absolute; */
    border: 0;
    border-top: 0.5px solid ${({ theme }) => theme.colors.division};
  }

  @media ${device.tablet} {
    width: 50vw;
    overflow-x: hidden;
  }
`

export const ContentUp = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100%;
  img {
    width: 100%;

    height: 21.2rem;
    object-fit: cover;
  }

  > aside {
    > section {
      margin-top: 0.8rem;
      padding: 0 1.6rem;
    }
  }

  @media ${device.tablet} {
    flex-direction: row;

    margin: 3.2rem;
    img {
      width: 40%;
      border-radius: 1.6rem;
    }
  }
`

export const Data = styled.div`
  padding: 0 1.6rem;

  aside {
    margin: 1.6rem 0 2.4rem;

    h3 {
      color: ${({ theme }) => theme.colors.orangePrimary};
      font-size: 1.6rem;
    }
    h1 {
      color: ${({ theme }) => theme.colors.black};
      font-size: 3.2rem;
    }
  }
  h2 {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 2.4rem;
    margin-top: 0.8rem;
  }
`

export const InfoContent = styled.section`
  padding: 0 1.6rem 1.6rem;
`

export const Info = styled.div`
  h2 {
    font-size: 2.4rem;
    margin-top: 1.6rem;
    color: ${({ theme }) => theme.colors.orangePrimary};
  }

  p {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.black};
  }
`

export const ButtonsContainer = styled.div`
  margin: 1.6rem 0;

  display: flex;
  flex-direction: column;

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 1.6rem;

    height: 4.8rem;
    border: 0;
    border-radius: ${border.borderRadius};
    background: ${({ theme }) => theme.colors.yellowPrimary};

    span,
    svg {
      font-weight: bold;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.white};
    }

    &:hover {
      opacity: 0.8;
    }

    & + button {
      background: ${({ theme }) => theme.colors.greenPrimary};
      margin-top: 1.6rem;
    }
  }

  @media ${device.tablet} {
    flex-direction: row;

    button {
      width: 100%;
      & + button {
        margin: 0 0 0 2.4rem;
      }
    }
  }
`
