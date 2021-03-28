import { transitions } from '@/styles/constants'
import styled from 'styled-components'

export const Card = styled.section`
  margin: 2.4rem;
  width: max-content;
  height: max-content;
  min-width: 20rem;
  max-width: 30rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px 0px rgb(0, 0, 0, 0.2);
  > img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    object-position: top;
    border-radius: 0.8rem 0.8rem 0 0;
  }
`

export const Info = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
`
export const Data = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem;

  > h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 3rem;
  }

  > h2 {
    font-size: 2rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.gray};
  }

  > h3 {
    font-size: 1.5rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.orangePrimary};
  }
`
export const BuyContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;

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
