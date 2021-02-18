import { useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { Container } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

import Input from '@/components/Input'

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  return (
    <Container>
      <SEO title="HOME" image="/banner.png" />

      <Form
        ref={formRef}
        onSubmit={() => {
          console.log('aaaaa')
        }}
      >
        <Input name="Email" label="email" />
      </Form>
    </Container>
  )
}

export default Home
