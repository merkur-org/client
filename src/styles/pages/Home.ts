import styled from 'styled-components'
import device from '../constants/breakPoints'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
export const OffersContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const OffersTopTitle = styled.div`
  display: flex;
  justify-content: space-between;
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
