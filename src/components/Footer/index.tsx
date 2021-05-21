import { Container } from './styles'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <Container>
      <section>
        <img src="merkur_horizontal.png" alt="" />

        <aside>
          <span>Cnpj nº 99.999.999/0001-00</span>
          <span>Email: exemplo@exemplo.com</span>
          <span>Telefone: (99) 99999-9999</span>
        </aside>

        <aside>
          <strong>Desenvolvido por:</strong>
          <span>Antonio Maccarini, Daniel Favero</span>
          <span>Gabriel Prando, Gustavo Tiecker,</span>
          <span>Vinicius Pegorini</span>
        </aside>
      </section>

      <section>copyright Ⓒ {year}</section>
    </Container>
  )
}

export default Footer
