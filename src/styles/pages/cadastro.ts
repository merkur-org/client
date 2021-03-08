import styled, { css } from 'styled-components'
import { breakPoints, effects } from '../constants'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 9.6rem;

  h1 {
    /* BEM VINDO */

    font-weight: bold;
    font-size: 2.4rem;

    /* Black Text */
    color: ${({ theme }) => theme.colors.black};
  }
  h2 {
    /* Informe seus dados para iniciar a sessão */

    font-weight: 400;
    font-size: 1.2rem;

    /* Black Text */
    color: ${({ theme }) => theme.colors.black};
  }

  @media ${breakPoints.mobileL} {
    margin-top: 0;

    h1 {
      font-size: 3.6rem;
    }
    h2 {
      font-size: 1.6rem;
    }
  }
`

export const BackgroundOrange = styled.div`
  /* Rectangle 25 */
  position: absolute;
  top: 0;
  height: 41.3%;
  width: 100%;

  z-index: -100;

  background: ${({ theme }) => theme.colors.orangePrimary};
`
export const BackgroundWhiteRectangle = styled.div`
  background: ${({ theme }) => theme.colors.white};
  /* Drop Shadow */
  box-shadow: ${effects.dropShadow};
  border-radius: 8px;

  margin: 0 1.6rem;

  @media ${breakPoints.mobileL} {
    width: 100%;
    max-width: 89.6rem;
  }
`
export const WelcomeContainer = styled.div`
  padding: 3.2rem;
`

export const FormContainer = styled.div`
  border-top: 1px solid #efeded;
  padding: 0 3.2rem 3.2rem 3.2rem;

  aside {
    margin-top: 0.8rem;
    margin-bottom: 2.4rem;

    p {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.yellowPrimary};
    }
  }

  @media ${breakPoints.mobileL} {
    aside {
      margin-bottom: 4.8rem;
    }
  }
`

export const InputsColumn = styled.section`
  @media ${breakPoints.tablet} {
    display: grid;
    grid-column-gap: 2.4rem;
    grid-template-columns: 1fr 1fr;

    .column1 {
      grid-column: 1;
    }

    .column2 {
      grid-column: 2;
    }
  }
`

export const InputContainer = styled.div`
  margin-bottom: 2.4rem;
  width: 100%;
`

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media ${breakPoints.tablet} {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`

export const ButtonContainer = styled.div`
  width: 100%;

  @media ${breakPoints.tablet} {
    margin-bottom: 2.4rem;
    max-width: 22rem;
  }
`

export const LinksContainer = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 2.4rem;
  display: flex;
  justify-content: space-between;

  a {
    color: ${({ theme }) => theme.colors.gray};
  }
`
