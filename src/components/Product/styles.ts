import styled from 'styled-components'

export const Card = styled.section`
  width: max-content;
  min-width: 20rem;
  max-width: 30rem;
  height: 45rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  //gap: 1rem;
  box-shadow: 0px 0px 10px 0px rgb(0, 0, 0, 0.2);
  position: relative;
  > img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    object-position: top;
  }
`

export const Data = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 1rem;

  > h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 3rem;
  }

  > h2 {
    font-size: 2rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.gray};
  }

  > h3 {
    font-size: 1.5rem;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.orangePrimary};
  }
`
