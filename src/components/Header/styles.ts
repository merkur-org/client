import styled, { css } from 'styled-components'
import { breakPoints as device } from '@/styles/constants'

export const Main = styled.header``
export const HeaderUp = styled.section`
  padding: 1.6rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  max-width: 120rem;
  margin: 0 auto;
  overflow: hidden;
  height: 7rem;
  img {
    height: 4.8rem;
    cursor: pointer;
  }

  @media ${device.tablet} {
    img {
      height: 6rem;
      width: 12rem;
    }
  }
`
export const SearchArea = styled.div``
export const ManagerArea = styled.section`
  display: none;

  @media ${device.tablet} {
    display: initial;
  }
`
interface PropsBurguer {
  openMenu: boolean
}

export const Burguer = styled.div<PropsBurguer>`
  label {
    div {
      background: transparent;
      border-radius: 50%;
      width: 60px;
      height: 60px;

      span {
        position: relative;
        display: block;
        background: #fff;
        width: 30px;
        height: 2px;
        top: 16px;
        left: 15px;
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
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    background: transparent;
    .menu-links {
      position: fixed;
      background-color: white;
      min-width: 100vw;
      box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.2);
      top: 10.4rem;
      z-index: 2;
      /* padding: 1.2rem; */
      aside {
        border-top: solid 1px ${({ theme }) => theme.colors.black};
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        a {
          color: ${({ theme }) => theme.colors.orangePrimary};

          padding: 0.8rem 0;

          display: initial;
          strong {
            font-size: 1.6rem;
          }
        }
        legend {
          font-size: 1.6rem;
          cursor: pointer;
          color: ${({ theme }) => theme.colors.orangePrimary};
          align-items: center;

          strong {
            font-size: 1.6rem;
          }

          & + a {
            margin-left: 3.2rem;
          }
        }
        padding: 0.8rem 0;
      }
      div {
        width: 100vw;
        background: ${({ theme }) => theme.colors.orangePrimary};
        section {
          width: 90%;
          display: flex;
          flex-direction: column;
          margin: 0 auto;
          padding: 1.6rem 0;
          a {
            color: #fff;
            align-items: center;

            svg {
              color: #fff;
              font-size: 1.6rem;
              margin-right: 0.8rem;
            }

            & + a {
              margin-top: 1.6rem;
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
  height: 4rem;
  aside {
    display: none;
    a {
      color: #fff;
      svg {
        color: #fff;
        margin-right: 0.8rem;
      }
    }
  }
  @media ${device.tablet} {
    display: flex;
    padding: 1.6rem;
    height: 4rem;

    width: 100%;

    aside {
      display: initial;
      width: 100rem;
      margin: 0 auto;
      padding: 0 1.6rem;
      display: flex;

      justify-content: space-between;

      a {
        display: flex;
        align-items: center;

        svg {
          margin-right: 0.8rem;
        }
      }
    }
  }
`
