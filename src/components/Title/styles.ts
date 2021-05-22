import styled from 'styled-components'
import { breakPoints } from '@/styles/constants'

export const Container = styled.div`
  display: flex;
  align-items: center;

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
    margin-right: 1.6rem;
  }

  span {
    font-size: 1.2rem;
    font-weight: 100;
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

    span {
      font-size: 1.6rem;
    }
  }
`
