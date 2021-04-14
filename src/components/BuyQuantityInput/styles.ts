import styled from 'styled-components'

export const BuyQuantity = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;

  .quantity-selector {
    display: flex;
    align-items: center;
    border: 0.25px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 0.8rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      background: transparent;
      border: none;
      width: 3.2rem;

      svg {
        font-size: 0.8rem;
        margin: 0 auto;
      }
    }
    .quantity-label {
      width: 3.2rem;
    }
  }

  .quantity-label {
    border-left: 0.25px solid ${({ theme }) => theme.colors.lightGray};
    border-right: 0.25px solid ${({ theme }) => theme.colors.lightGray};
  }

  span {
    font-size: 1.6rem;
    padding: 0.8rem 0 0.8rem 1.2rem;
  }
`
