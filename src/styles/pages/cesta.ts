import styled from 'styled-components'
import { breakPoints } from '../constants'

export const Container = styled.div`
  padding: 3.6rem 1.6rem;

  @media ${breakPoints.tablet} {
    padding: 5.6rem 3.2rem;
  }

  overflow-x: hidden;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.4rem;

  div {
    content: '';
    width: 1.6rem;
    height: 1.6rem;

    border: 4px solid ${({ theme }) => theme.colors.orangePrimary};
    border-radius: 100vmax;

    margin-right: 1.6rem;
  }

  h1 {
    font-size: 2.4rem;
  }

  @media ${breakPoints.tablet} {
    div {
      width: 2.4rem;
      height: 2.4rem;

      border: 8px solid ${({ theme }) => theme.colors.orangePrimary};
    }

    h1 {
      font-size: 4rem;
    }
  }
`

export const CheckoutTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  overflow-x: scroll;

  @media ${breakPoints.tablet} {
    overflow-x: hidden;
  }
`

export const CheckoutDetails = styled.div`
  height: 100%;

  display: flex;
  align-items: center;

  border-bottom: 1px solid ${({ theme }) => theme.colors.orangePrimary};

  aside {
    min-width: 53.2rem;
    display: flex;
    align-items: center;

    img {
      height: 8.8rem;
    }

    h4 {
      white-space: nowrap;
      margin-left: 2.4rem;
      font-weight: lighter;
      font-size: 1.6rem;
    }
  }

  a {
    font-weight: lighter;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.error};
  }

  h3 {
    font-weight: 400;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.gray};
  }

  h3,
  a,
  section {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
  }
`

export const CheckoutColumns = styled.section`
  display: flex;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.white};

  strong {
    text-align: center;
    font-size: 1.6rem;
    font-weight: bold;
    width: 100%;

    padding: 0.8rem 5.6rem;

    background-color: ${({ theme }) => theme.colors.orangePrimary};
    color: ${({ theme }) => theme.colors.white};
  }

  strong + strong {
    border-left: 1px solid ${({ theme }) => theme.colors.yellowPrimary};
  }

  strong:first-child {
    min-width: 53.2rem;
  }
`
