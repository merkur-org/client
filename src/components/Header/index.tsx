import { useCallback, useState } from 'react'
import Link from 'next/link'
import { MdLocationOn } from 'react-icons/md'

import { Main, HeaderUp, ManagerArea, Burguer, HeaderDown } from './styles'

import { SearchProducts } from '@/components'

const Header: React.FC = () => {
  const [openDropDown, setOpenDropDown] = useState(false)

  const handleOpenDropDown = useCallback(() => {
    setOpenDropDown(state => !state)
  }, [])

  return (
    <Main>
      <HeaderUp>
        <Link href="/">
          <img src="logo.jpg" alt="" />
        </Link>
        <SearchProducts />
        <ManagerArea></ManagerArea>
      </HeaderUp>
      <HeaderDown>
        <button>
          <MdLocationOn /> Cidade - UF
        </button>
        <aside>
          <Link href="/">
            <a>Categorias</a>
          </Link>
          <Link href="/">
            <a>Produtos</a>
          </Link>
          <Link href="/">
            <a>Listas semanais</a>
          </Link>
          <Link href="/">
            <a>Meus pedidos</a>
          </Link>
        </aside>

        <Burguer openMenu={openDropDown}>
          <input
            id="menu-hamburguer"
            onChange={handleOpenDropDown}
            type="checkbox"
            checked={openDropDown}
          />

          <label htmlFor="menu-hamburguer">
            <div>
              <span></span>
            </div>
          </label>
          <div onClick={handleOpenDropDown} className="outside-menu">
            <div className="menu-links">
              <div>
                <section>
                  <Link href="/">
                    <a>Categorias</a>
                  </Link>
                  <Link href="/">
                    <a>Produtos</a>
                  </Link>
                  <Link href="/">
                    <a>Listas semanais</a>
                  </Link>
                  <Link href="/">
                    <a>Meus pedidos</a>
                  </Link>
                </section>
              </div>
            </div>
          </div>
        </Burguer>
      </HeaderDown>
    </Main>
  )
}

export default Header
