import styled, { css } from 'styled-components'

export const Error = styled.p`
  font-size: 1.2rem;
  text-align: right;

  margin-top: 0.8rem;

  color: ${({ theme }) => theme.colors.error};
`

export const BodyField = styled.label<{ isEmpty: boolean; isErrored: boolean }>`
  width: 100%;
  min-width: 26.4rem;
  min-height: 3.2rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};

  position: relative;
  display: flex;
  align-items: center;

  cursor: text;
  font-size: 1.6rem;
  font-weight: 400;

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0.8rem;

    color: ${({ theme }) => theme.colors.gray};

    transition: 0.5s;
    cursor: text;
  }
  :focus-within {
    border-bottom: 0.2rem solid ${({ theme }) => theme.colors.greenPrimary};
    label {
      top: -1.6rem;
      color: ${({ theme }) => theme.colors.greenPrimary};
    }
  }
  ${props =>
    !props.isEmpty &&
    css`
      label {
        top: -1rem;
      }
    `}
  ${props =>
    props.isErrored &&
    css`
      border-bottom: 2px solid ${({ theme }) => theme.colors.error};

      label {
        color: ${({ theme }) => theme.colors.error};
      }
    `}

  :focus-within::after {
    width: 100%;
    height: 1.92px;
    content: '';
    position: absolute;
    bottom: 0;
  }
`
