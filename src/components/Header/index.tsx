import { useCallback, useState } from 'react'
import Link from 'next/link'
import { MdLocationOn } from 'react-icons/md'
import { FaShoppingBasket, FaUserAlt } from 'react-icons/fa'

import {
  Main,
  HeaderUp,
  ManagerArea,
  Manager,
  Burguer,
  HeaderDown
} from './styles'

import { SearchProducts } from '@/components'
import { useAuth } from '@/hooks/auth'

const Header: React.FC = () => {
  const [openDropDown, setOpenDropDown] = useState(false)

  const { user } = useAuth()

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

        <ManagerArea>
          {!user ? (
            <aside>
              <Link href="/cadastro">
                <a> cadastre-se</a>
              </Link>
              <Link href="/login">
                <a>entrar</a>
              </Link>
            </aside>
          ) : (
            <section>
              <Link href="/cesta">
                <Manager>
                  <div>Cesta</div>
                  <aside>
                    <FaShoppingBasket />
                    <span>1</span>
                  </aside>
                </Manager>
              </Link>
              <Link href="/">
                <Manager>
                  <div>
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                  </div>
                  <aside>
                    <FaUserAlt />
                    <span>1</span>
                  </aside>
                </Manager>
              </Link>
            </section>
          )}
        </ManagerArea>
      </HeaderUp>
      <HeaderDown>
        <button>
          <MdLocationOn /> Cidade - UF
        </button>
        <aside>
          <Link href="/produtos">
            <a>Produtos</a>
          </Link>
          <Link href="/meus-pedidos">
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
                    <a>Produtos</a>
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
