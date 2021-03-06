import styled, { css } from 'styled-components'
import Input from '@/components/Input'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    /* BEM VINDO */

    font-weight: bold;
    font-size: 3.6rem;

    /* Black Text */
    color: ${({ theme }) => theme.colors.black};
  }
  h2 {
    /* Informe seus dados para iniciar a sessão */

    font-weight: 400;
    font-size: 1.6rem;

    /* Black Text */
    color: ${({ theme }) => theme.colors.black};
  }
`
export const InputContainer1 = styled.div`
  margin-top: -110px;
  margin-left: 32px;
  width: 400px;
  height: 37px;
  }
`
export const InputContainer2 = styled.div`
  margin-bottom: 48px;
  margin-left: 32px;
  width: 400px;
  height: 37px;
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
  /* Rectangle 24 */

  background: ${({ theme }) => theme.colors.white};
  padding: 3.2rem;

  /* Drop Shadow */
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`
interface buttonProps {
  isSelected: boolean
}
export const TabContainer = styled.div`
  margin-bottom: 4.8rem;
  display: flex;
  justify-content: flex-start;
`
export const TabButton = styled.button<buttonProps>`
  background: transparent;
  border-top: 4px solid transparent;
  &:active {
    outline: none;
    border: none;
  }
  &:focus {
    border: none;
    outline: 0 !important;
  }

  margin: 0;

  padding: 0 1.2rem;
  padding-top: 1.6rem;
  ${props =>
    props.isSelected
      ? css`
          border-top: 4px solid ${({ theme }) => theme.colors.yellowPrimary};
        `
      : css`
          color: ${({ theme }) => theme.colors.gray};
        `}
`
export const FormContainer = styled.div`
  margin-top: 3.2rem;
  border-top: 1px solid #efeded;

  width: 100 %;
`
export const LinksContainer = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 2.4rem;
  display: flex;
  justify-content: space - between;
`
