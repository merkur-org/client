import styled from 'styled-components'
import { border, breakPoints } from '../constants'
import device from '../constants/breakPoints'

export const Container = styled.div`
  padding: 3.6rem 1.6rem;

  @media ${breakPoints.tablet} {
    padding: 5.6rem 3.2rem;
  }
`
export const SummaryOrder = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;

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
      svg {
        margin-right: 1.6rem;
        font-size: 2.4rem;
        color: ${({ theme }) => theme.colors.gray};
      }
    }

    p {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.gray};
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
    width: 28%;
  }
`

export const SummaryInfo = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  section {
    display: flex;
    justify-content: space-between;

    strong {
      color: ${({ theme }) => theme.colors.black};
      font-size: 2.4rem;
      display: flex;
      align-items: center;
    }

    span {
      color: ${({ theme }) => theme.colors.black};
      font-size: 2.4rem;
      display: flex;
      align-items: center;
    }

    & + section {
      margin-top: 3.2rem;
    }
  }
  @media ${device.tablet} {
    width: 28%;
  }
`

export const SummaryButtons = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 4.8rem;
    padding: 1.6rem;

    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.orangePrimary};

    border: 0;
    border-radius: ${border.borderRadius};

    font-size: 1.6rem;
    & + button {
      background: ${({ theme }) => theme.colors.greenPrimary};
      margin-top: 1.6rem;
    }
  }

  @media ${device.tablet} {
    width: 28%;
  }
`
