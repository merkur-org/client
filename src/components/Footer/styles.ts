import { effects } from '@/styles/constants'
import device from '@/styles/constants/breakPoints'
import styled from 'styled-components'

export const Container = styled.footer`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;

  background-color: ${({ theme }) => theme.colors.white};

  box-shadow: ${effects.dropShadow};

  margin-top: 5.6rem;

  > section {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 12.8rem;
      margin-bottom: 2.4rem;
    }

    aside {
      display: flex;
      flex-direction: column;
      align-items: center;

      strong {
        color: ${({ theme }) => theme.colors.gray};
        font-size: 1.2rem;
      }

      span {
        color: ${({ theme }) => theme.colors.gray};
        font-size: 1.2rem;
        & + span {
          margin-top: 0.8rem;
        }
      }

      & + aside {
        margin-top: 2.4rem;
      }
    }

    & + section {
      margin: 5.6rem 0;
      color: ${({ theme }) => theme.colors.gray};
      font-size: 1.2rem;
    }
  }

  @media ${device.mobileL} {
    > section {
      img {
        width: 16rem;
      }

      aside {
        strong {
          font-size: 1.4rem;
        }

        span {
          font-size: 1.4rem;
        }
      }
    }
  }
  @media ${device.tablet} {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    padding: 1.6rem 12rem;

    margin-top: 3.6rem;

    > section {
      flex-direction: row;

      img {
        width: 17.2rem;
      }

      aside {
        margin-left: 3.2rem;
        align-items: flex-start;

        & + aside {
          margin-top: 0rem;
        }
      }
      & + section {
        margin: 0;
        align-self: flex-end;
      }
    }
  }
  @media ${device.laptop} {
    > section {
      aside {
        margin-left: 12.8rem;

        strong {
          font-size: 1.6rem;
        }

        span {
          font-size: 1.6rem;
        }
      }
    }
  }
`
