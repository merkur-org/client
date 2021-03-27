import styled from 'styled-components'
import { border } from '../constants'
import device from '../constants/breakPoints'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const BannerContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 75vw;
  background: ${({ theme }) => theme.colors.gray};
  max-height: 39.8rem;
  max-width: 120rem;
  margin: 0 auto 3.6rem;

  img {
    width: 100%;
    height: 100%;
  }

  @media ${device.tablet} {
    border-radius: ${border.borderRadius};
    width: calc(100vw - calc(12.2rem * 2));

    margin: 5.6rem auto;
    img {
      border-radius: ${border.borderRadius};
    }
  }
`

export const OffersContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const OffersTopTitle = styled.div`
  display: flex;
  justify-content: space-between;

  section {
    display: flex;
    align-items: center;

    svg {
      color: ${({ theme }) => theme.colors.orangePrimary};
      font-size: 1.6rem;
    }

    span {
      font-weight: bold;
      font-size: 2.4rem;
      margin-left: 1.6rem;
    }
  }

  @media ${device.tablet} {
    section {
      span {
        font-size: 4rem;
      }
    }
  }
`
export const Filter = styled.div`
  display: flex;
  flex-direction: column;
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33%);

  @media ${device.mobileS} {
    grid-template-columns: repeat(1, 100%);
  }
  @media ${device.tablet} {
    grid-template-columns: repeat(2, 50%);
  }
  @media ${device.laptop} {
    grid-template-columns: repeat(3, 33%);
  }
  @media ${device.laptopL} {
    grid-template-columns: repeat(4, 25%);
  }
  @media ${device.desktopL} {
    grid-template-columns: repeat(5, 20%);
  }
`
