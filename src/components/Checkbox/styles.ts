import styled from 'styled-components'

export const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 2.4rem;
  font-size: 1.6rem;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.gray};

  input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  span {
    position: absolute;
    top: 0.2rem;
    left: 0;
    height: 1.6rem;
    width: 1.6rem;
    background: transparent;
    border: 2px solid ${({ theme }) => theme.colors.gray};
    border-radius: 0.2rem;
  }

  span:after {
    content: '';
    position: absolute;
    display: none;
  }

  & input:checked ~ span:after {
    display: block;
  }

  & input:checked ~ span {
    background-color: ${({ theme }) => theme.colors.greenPrimary};
    border: 2px solid ${({ theme }) => theme.colors.greenPrimary};
  }

  & span:after {
    left: 0.3rem;
    width: 0.5rem;
    height: 1rem;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  a {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.greenPrimary};
    margin-left: 0.6rem;
  }
`
