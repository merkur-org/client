import { border } from '@/styles/constants'
import device from '@/styles/constants/breakPoints'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: ${border.borderRadius};
  border-color: ${({ theme }) => theme.colors.gray};

  padding: 0.4rem;

  height: 3.2rem;
  width: 50%;
  max-width: 51.2rem;

  input {
    border: 0;
    width: 80%;
    height: 2.8rem;

    &::placeholder {
      color: transparent;
    }
  }

  svg {
    margin: 1rem;
    height: 1.2rem;
    color: ${({ theme }) => theme.colors.gray};
  }

  @media ${device.tablet} {
    height: 4.8rem;
    input {
      margin: 0.6rem;
      &::placeholder {
        color: ${({ theme }) => theme.colors.gray};
      }
    }
  }
`
