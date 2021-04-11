import styled from 'styled-components'
import { border, breakPoints } from '../constants'
import { Form } from '@unform/web'
import device from '../constants/breakPoints'

export const Container = styled.div`
  padding: 3.6rem 1.6rem;

  overflow-x: hidden;

  @media ${breakPoints.tablet} {
    padding: 5.6rem 12rem;
  }
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.4rem;
  max-width: 120rem;
  margin: 0 auto 2.4rem;

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
export const SummaryOrder = styled(Form)`
  width: 100%;
  max-width: 120rem;
  margin: 5.6rem auto;

  display: flex;
  flex-direction: column;
`

export const SummaryTitle = styled.div`
  width: 100%;
  text-align: center;
  height: 3.2rem;
  background: ${({ theme }) => theme.colors.orangePrimary};

  h2 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.6rem;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
  }
`

export const SummaryDelivery = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;

  section {
    display: flex;

    justify-content: space-between;
    align-items: center;

    strong {
      color: ${({ theme }) => theme.colors.black};
      font-size: 2.4rem;
      display: flex;
      align-items: center;
    }
    span {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.black};

      display: flex;
      flex-direction: column;

      button {
        border: 0;
        background: transparent;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.redPrimary};
        margin-top: 0.4rem;
      }
    }

    & + section {
      margin-top: 3.2rem;
    }
  }

  @media ${device.tablet} {
    width: 50%;
    padding: 0 3.2rem;
    border-left: 0.1rem solid ${({ theme }) => theme.colors.division};
  }
`
export const SummaryButtons = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  button + button {
    margin-top: 1.6rem;
  }

  @media ${device.tablet} {
    width: 50%;
    padding: 0 3.2rem;
    border-left: 0.1rem solid ${({ theme }) => theme.colors.division};
    border-right: 0.1rem solid ${({ theme }) => theme.colors.division};
  }
`
