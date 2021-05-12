import styled, { css, keyframes } from 'styled-components'

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
  border-bottom-left-radius: 1.6rem;
  border-top-left-radius: 1.6rem;

  right: 0rem;
  top: 0rem;

  background: ${({ theme }) => theme.colors.orangePrimary};

  svg {
    color: ${({ theme }) => theme.colors.white};
    font-size: 2.4rem;
    font-weight: bold;
    transform: rotate(45deg);
  }
  &:hover {
    background: ${({ theme }) => theme.colors.orangeSecundary};
  }
`

export const BodyButton = styled.div<styleProps>`
  border: 0;
  background: transparent;
  position: absolute;

  border: 1px solid red;

  cursor: default;
  > span {
    background: red;
    border: 0;
    width: 100%;
    cursor: pointer;
  }

  ${props =>
    !props.asideOpen &&
    css`
      display: none;
    `}
`
interface ModalProps {
  isOpen: boolean
}

const openAnimation = keyframes`
  from{
    right: -50vw;
  }

  to{
    right: 0;
  }
`

const closeAnimation = keyframes`
  from{
    right: 0;
  }

  to{
    right: -50vw;
  }
`

export const ModalContent = styled.div<ModalProps>`
  opacity: 1;
  visibility: visible;
  overflow-y: auto;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.white};
  width: 0%;
  height: 100%;

  /* bottom: 0; */
  top: 0;
  right: 0vw;
  z-index: 100;
  box-shadow: ${effects.dropShadow};
  display: flex;
  flex-direction: column;

  hr {
    border: 0;
  }

  ${props =>
    props.isOpen &&
    css`
      width: 100%;
      right: 0;
    `}

  @media ${device.tablet} {
    width: 50vw;
    right: -50vw;
    overflow-x: hidden;

    ${props =>
      props.isOpen
        ? css`
            animation: ${openAnimation} 0.3s ease;
            width: 50vw;
            right: 0;
          `
        : css`
            animation: ${closeAnimation} 0.3s ease;
            right: -50vw;
            visibility: 0;
            opacity: 0;

            transition: opacity 0.2s;
          `}
  }
`

export const ContentUp = styled.aside`
  display: flex;
  flex-direction: column;
  width: 100vw;

  border-bottom: 1px solid ${({ theme }) => theme.colors.division};

  img {
    width: 100%;

    height: 21.2rem;
    object-fit: cover;
  }

  > aside {
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media ${device.tablet} {
    flex-direction: row;
    width: 100%;

    padding: 3.2rem;

    img {
      width: 60%;
      border-radius: 1.6rem;
    }

    > aside {
      margin-left: 1.6rem;
      padding: 0 1.6rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`

export const Data = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  aside {
    h3 {
      color: ${({ theme }) => theme.colors.orangePrimary};
      font-size: 1.6rem;
      font-weight: 400;
    }
    h1 {
      color: ${({ theme }) => theme.colors.black};
      font-size: 3.2rem;
      font-weight: 400;
    }
  }
  h2 {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 2.4rem;
    margin-bottom: 0.8rem;
    font-weight: 400;
  }
`

export const InfoContent = styled.section`
  display: flex;
  flex-direction: column;

  padding: 0 1.6rem;

  overflow: auto;

  @media ${device.tablet} {
    padding: 1.6rem 3.2rem 0 3.2rem;
  }
`

export const Info = styled.div`
  h2 {
    font-size: 2.4rem;
    font-weight: 400;
    margin-top: 1.6rem;
    margin-bottom: 0.8rem;
    color: ${({ theme }) => theme.colors.orangePrimary};
  }

  p {
    font-size: 1.6rem;
    font-weight: 100;
    color: ${({ theme }) => theme.colors.black};
  }
`

export const ButtonsContainer = styled.div`
  padding: 1.6rem;

  display: flex;
  flex-direction: column;
  width: 100%;

  position: absolute;
  bottom: 0;
  right: 0;

  border-top: 1px solid ${({ theme }) => theme.colors.division};
  background-color: ${({ theme }) => theme.colors.white};

  @media ${device.tablet} {
    padding: 3.2rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 50vw;
  }
`
