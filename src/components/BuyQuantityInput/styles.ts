import styled from 'styled-components'

export const BuyQuantity = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;

  .quantity-selector {
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 0.8rem;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      background: transparent;
      border: none;
      width: 3.2rem;
    }
    .quantity-label {
      width: 3.2rem;
    }
  }

  .quantity-label {
    border-left: 1px solid ${({ theme }) => theme.colors.gray};
    border-right: 1px solid ${({ theme }) => theme.colors.gray};
  }

  span {
    font-size: 1.6rem;
    padding: 0.8rem 1.2rem;
  }
`
