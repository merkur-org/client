import styled from 'styled-components'
import Input from '@/components/Input'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  place-content: center;

  h1 {
    /* BEM VINDO */
    width: 251px;
    height: 47px;
    margin-left: 32px;
    margin-top: 32px;

    font-family: Roboto Slab;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 47px;

    /* Black Text */
    color: #141211;
  }
  h2 {
    /* Informe seus dados para iniciar a sessão */

    width: 366px;
    height: 21px;
    margin-left: 32px;
    margin-top: 0px;

    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;

    /* Black Text */
    color: #141211;
  }
  h3 {
    /* email e senha */

    width: 306px;
    height: 21px;
    margin-left: 32px;
    margin-top: 48px;

    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    /* identical to box height */

    /* Black Text */
    color: #141211;
  }
  h4 {
    /* cpf e telefone */

    width: 306px;
    height: 21px;
    margin-left: 135px;
    margin-top: -20px;

    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    /* identical to box height */

    color: #888888;
  }
  h5 {
    /* esqueceu sua senha? */

    width: 306px;
    height: 21px;
    margin-left: 32px;
    margin-top: 146px;

    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    /* identical to box height */

    color: #888888;
  }
  h6 {
    /* não possui cadastro? */

    width: 306px;
    height: 21px;
    margin-left: 313px;
    margin-top: -21px;

    font-family: Roboto Slab;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    }

    /* identical to box height */

    color: #888888;
  }

  Button {
    font-size: 12px;
    width: 220px;
    height: 48px;
    margin-left: 30px;
    margin-top: 0px;

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
export const OrangeLine = styled.div`
  /* Line 11 */

  position: absolute;
  width: 96px;
  height: 0px;
  margin-left: 23px;
  margin-top: 135px;

  border: 4px solid #f7c80c;
`
export const SeparationLine = styled.div`
  /* Line 10 */

  position: absolute;
  width: 464px;
  height: 0px;
  margin-left: 0px;
  margin-top: 132px;

  border: 1px solid #efeded;
`
export const BackgroundOrange = styled.div`
  /* Rectangle 25 */

  position: absolute;
  width: 100%;
  height: 278px;
  left: 0px;
  top: 0px;

  background: #f59100;
`
export const BackgroundWhiteRectangle = styled.div`
  /* Rectangle 24 */

  position: absolute;

  width: 464px;
  height: 430px;
  margin-left: 488px;
  margin-top: -115px;

  background: #ffffff;

  /* Drop Shadow */
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`
