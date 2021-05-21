import styled from 'styled-components'
import { border, effects } from '../constants'
import device from '../constants/breakPoints'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin: 0 auto;

  max-width: 119.6rem;
`

export const BannerContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vw;
  background: ${({ theme }) => theme.colors.gray};
  max-height: 39.8rem;
  max-width: 120rem;
  margin: 0 auto 3.6rem;
  height: fit-content;

  img {
    width: 100%;
    height: fit-content;
    object-fit: contain;

    box-shadow: ${effects.dropShadow};
  }

  @media ${device.laptopL} {
    border-radius: ${border.borderRadius};
    width: calc(100vw - calc(12.2rem * 2));

    margin: 5.6rem auto;

    img {
      height: 100%;

      border-radius: 0.8rem;
    }
  }

  @media ${device.desktopL} {
  }
`

export const OffersContainer = styled.div`
  display: block;
  overflow: auto;
  width: 100%;

  @media ${device.laptopL} {
    overflow: visible;
  }
`

export const OffersTopTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 2.4rem;
  margin-left: 1.6rem;

  width: 100%;

  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-left: 0;
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 1.6rem;
  grid-row-gap: 1.6rem;
`
