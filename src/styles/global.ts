import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  *,
  *:before,
  *:after  {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration:none;
    list-style:none;
    font-size:62.5%;
  }

  textarea:focus,
  input:focus,
  select:focus,
  button:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }
  a, button {
    text-decoration: none;
    cursor: pointer;
  }

  body {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.black};
    font: 400 1.6rem 'Roboto Slab', serif;
    cursor: default;
  }


`
