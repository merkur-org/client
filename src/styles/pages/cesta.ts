import styled from 'styled-components'
import { breakPoints } from '../constants'

export const Container = styled.div`
  padding: 3.6rem 1.6rem;

  @media ${breakPoints.tablet} {
    padding: 5.6rem 3.2rem;
  }
`
