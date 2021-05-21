import { border, effects } from '@/styles/constants'
import device from '@/styles/constants/breakPoints'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 0.8rem;
  box-shadow: ${effects.dropShadow};

  padding: 0.8rem;

  height: 3.2rem;
  width: 40%;
  max-width: 51.2rem;

  input {
    border: 0;
    width: 80%;
    height: 2.8rem;

    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.gray};
    font-weight: 400;

    &::placeholder {
      color: transparent;
    }
  }

  svg {
    height: 1.2rem;
    width: 1.2rem;
    color: ${({ theme }) => theme.colors.gray};
  }

  @media ${device.tablet} {
    height: 4.8rem;
    padding: 1.6rem;

    input {
      &::placeholder {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.gray};
        font-weight: 400;
      }
    }

    svg {
      height: 1.6rem;
      width: 1.6rem;
      cursor: pointer;
    }
  }
`
