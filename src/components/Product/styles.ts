import { border, effects, transitions } from '@/styles/constants'
import styled, { css, keyframes } from 'styled-components'

export const Card = styled.section`
  width: 22rem;
  height: 36.4rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  box-shadow: ${effects.dropShadow};

  > img {
    cursor: pointer;
    width: 100%;
    height: 17.6rem;
    object-fit: cover;
    object-position: top;
    border-radius: 0.8rem 0.8rem 0 0;
  }
`

export const Info = styled.div`
  padding: 0 1.6rem;
  display: flex;
  flex-direction: column;
`
export const Data = styled.section`
  display: flex;
  flex-direction: column;
  height: 12.8rem;
  justify-content: space-between;
  padding: 1.6rem 0 0.8rem;
  aside {
    > h1 {
      font-size: 2.4rem;
      font-weight: 400;
    }

    > h3 {
      font-size: 1.2rem;
      font-weight: normal;
      color: ${({ theme }) => theme.colors.orangePrimary};
    }
  }
  > h2 {
    font-size: 1.6rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.gray};
  }
`
export const BuyContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.6rem;

  aside {
    cursor: pointer;

    svg {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.greenPrimary};
      transition: color ${transitions.hover};
      &:hover {
        color: ${({ theme }) => theme.colors.greenSecundary};
      }
    }
  }
`
export const BuyQuantity = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;

  .quantity-selector {
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 0.8rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      background: transparent;
      border: none;
      width: 3.2rem;
    }
    .quantity-label {
      width: 3.2rem;
    }
  }

  .quantity-label {
    border-left: 1px solid ${({ theme }) => theme.colors.gray};
    border-right: 1px solid ${({ theme }) => theme.colors.gray};
  }

  span {
    font-size: 1.6rem;
    padding: 0.8rem 1.2rem;
  }
`

interface OpenModalProps {
  isOpen: boolean
  time: number
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

export const Success = styled.div<OpenModalProps>`
  display: none;

  ${props =>
    props.isOpen &&
    css`
      display: initial;

      position: fixed;
      z-index: 100;
      bottom: 3.2rem;
      padding: 0.8rem;

      font-size: 1.6rem;
      font-weight: bold;
      text-align: center;

      background-color: ${({ theme }) => theme.colors.greenPrimary};
      color: ${({ theme }) => theme.colors.white};
      box-shadow: ${effects.dropShadow};

      border-radius: ${border.borderRadius};

      animation: ${openAnimation} 2s ease-in-out;
    `}
`

export const Error = styled.div<OpenModalProps>`
  display: none;
  ${props =>
    props.isOpen &&
    css`
      display: inline-block;

      position: fixed;
      z-index: 100;
      bottom: 3.2rem;
      padding: 0.8rem;

      font-size: 1.6rem;
      font-weight: bold;
      text-align: center;

      background-color: ${({ theme }) => theme.colors.redPrimary};
      color: ${({ theme }) => theme.colors.white};
      box-shadow: ${effects.dropShadow};

      border-radius: ${border.borderRadius};

      animation: ${openAnimation} 2s ease-in-out;
    `}
`
