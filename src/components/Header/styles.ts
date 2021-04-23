import styled, { css } from 'styled-components'
import { breakPoints as device, effects } from '@/styles/constants'

export const Main = styled.header``
export const HeaderUp = styled.section`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  max-width: 120rem;
  margin: 0 auto;
  height: 100%;

  img {
    height: 4.8rem;
    cursor: pointer;
  }

  @media ${device.tablet} {
    height: 10.4rem;
    img {
      height: 6rem;
      width: 12rem;
    }
  }
`
export const ManagerArea = styled.section`
  > aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    a {
      font-weight: 100;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.black};
      margin: 0 1.6rem;

      & + a {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.yellowPrimary};
      }
    }
  }

  > section {
    display: flex;
    align-items: center;

    a {
      & + a {
        margin-left: 1.6rem;
      }
    }
  }

  @media ${device.tablet} {
    > aside {
      flex-direction: row;
      align-items: center;
      a {
        font-size: 1.6rem;
        & + a {
          margin-left: 1.6rem;
        }
      }
    }
  }
`
export const Manager = styled.a`
  cursor: pointer;
  div {
    display: none;
  }

  margin-right: 1.6rem;

  aside {
    position: relative;
    svg {
      color: ${({ theme }) => theme.colors.black};
      font-size: 1.6rem;
    }

    span {
      position: absolute;

      text-align: center;
      font-size: 1rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.white};
      width: 1.6rem;
      height: 1.6rem;

      border-radius: 50%;
      background: ${({ theme }) => theme.colors.redPrimary};

      bottom: -0.6rem;
      right: -1rem;
    }
  }

  @media ${device.tablet} {
    display: flex;
    align-items: center;

    div {
      flex-direction: column;
      color: ${({ theme }) => theme.colors.black};
      font-size: 1.2rem;

      span + span {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.colors.gray};
      }
    }

    svg {
      font-size: 1.2rem;
    }
  }
  > svg {
    display: none;
  }

  @media ${device.laptop} {
    div {
      display: flex;
      text-align: right;
      font-size: 1.6rem;
    }

    svg {
      margin-left: 1.6rem;
    }

    > svg {
      display: initial;
      margin-right: 0.8rem;
    }
  }
`
interface PropsBurguer {
  openMenu: boolean
}

export const Burguer = styled.div<PropsBurguer>`
  label {
    div {
      background: transparent;
      width: 60px;
      height: 60px;

      span {
        position: relative;
        display: block;
        background: #fff;
        width: 30px;
        height: 3px;
        border-radius: 0.4rem;
        top: 50%;
        left: 16px;
        transition: 0.5s ease-in-out;

        &:before,
        &:after {
          background: #fff;
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          position: absolute;
          transition: 0.5s ease-in-out;
        }

        &:before {
          top: -10px;
        }

        &:after {
          bottom: -10px;
        }
      }
    }
  }

  input {
    display: none;
  }

  input:checked ~ label {
    div {
      span {
        transform: rotate(45deg);

        &:before {
          transform: rotate(90deg);
          top: 0;
        }
        &:after {
          transform: rotate(90deg);
          bottom: 0;
        }
      }
    }
  }
  .outside-menu {
    ${props =>
      props.openMenu
        ? css`
            display: flex;
          `
        : css`
            display: none;
          `}
    width:100vw;
    height: 100vh;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    background: transparent;
    .menu-links {
      position: absolute;
      background-color: white;
      min-width: 100vw;
      box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.2);
      top: 10.4rem;
      z-index: 2;

      div {
        border-top: 2px solid ${({ theme }) => theme.colors.yellowPrimary};
        width: 100vw;
        background: ${({ theme }) => theme.colors.orangePrimary};
        section {
          width: 90%;
          display: flex;
          flex-direction: column;
          margin: auto;
          padding: 1.6rem 0;

          a {
            color: ${({ theme }) => theme.colors.white};
            align-items: center;

            font-size: 1.6rem;
            font-weight: bold;

            svg {
              color: ${({ theme }) => theme.colors.white};
              font-size: 1.6rem;
              margin-right: 0.8rem;
            }

            & + a {
              margin-top: 0.8rem;
              padding-top: 0.8rem;

              border-top: 1px solid ${({ theme }) => theme.colors.yellowPrimary};
            }
          }
        }
      }
    }
  }

  @media ${device.tablet} {
    display: none;
  }
`

export const HeaderDown = styled.section`
  background: ${props => props.theme.colors.orangePrimary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.2rem;

  box-shadow: ${effects.dropShadow};

  button {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    background: transparent;
    border: 0;

    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;

    width: 100%;
    height: 3.2rem;
    padding-left: 1.6rem;

    svg {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.white};

      margin-right: 0.8rem;
    }
  }

  aside {
    display: none;
  }
  @media ${device.tablet} {
    height: 4.8rem;
    justify-content: initial;

    width: 100%;

    button {
      padding-left: 12rem;
      width: 25%;
      height: 4.8rem;

      font-size: 1.6rem;

      svg {
        font-size: 1.6rem;
      }
    }

    aside {
      display: flex;

      border-left: 2px solid ${({ theme }) => theme.colors.yellowPrimary};

      width: 100%;
      height: 4.8rem;
    }
  }
`

interface HeaderLinkProps {
  isSelected: boolean
}

export const HeaderLink = styled.a<HeaderLinkProps>`
  ${props =>
    props.isSelected &&
    css`
      border-bottom: 4px solid ${({ theme }) => theme.colors.yellowSecundary};
      background-color: ${({ theme }) => theme.colors.yellowPrimary};
    `}

  color: ${({ theme }) => theme.colors.white};

  @media ${device.tablet} {
    display: flex;
    align-items: center;

    font-weight: bold;
    font-size: 1.6rem;
    padding: 0 1.2rem;

    svg {
      margin-right: 0.8rem;
    }
  }
`
