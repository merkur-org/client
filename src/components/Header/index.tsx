import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { FaShoppingBasket, FaUserAlt } from 'react-icons/fa'
import { FiMapPin, FiChevronDown } from 'react-icons/fi'
import {
  Main,
  HeaderUp,
  ManagerArea,
  Manager,
  Burguer,
  HeaderDown,
  HeaderLink
} from './styles'

import Dropdown from '@/components/Dropdown'

import { SearchProducts } from '@/components'
import { useAuth } from '@/hooks/auth'
import { useBag } from '@/hooks/bag'
import { GetStaticProps } from 'next'

interface TabsProps {
  name: string
  path: string
  selected: boolean
}

const Header: React.FC = () => {
  const { user, signOut } = useAuth()
  const { bagItems } = useBag()

  const router = useRouter()

  const [openDropDown, setOpenDropDown] = useState(false)
  const [bagNotification, setBagNotification] = useState(0)
  const [tabs, setTabs] = useState<TabsProps[]>([])

  useEffect(() => {
    setTabs([
      {
        name: 'Produtos',
        path: '/',
        selected: router.pathname === '/'
      },
      {
        name: 'Meus Pedidos',
        path: '/meus-pedidos',
        selected: router.pathname === '/meus-pedidos'
      }
    ])
  }, [router.pathname])

  useEffect(() => {
    if (router.pathname !== '/cesta') {
      setBagNotification(oldState => oldState + 1)
    } else {
      setBagNotification(0)
    }
  }, [bagItems])

  const handleOpenDropDown = useCallback(() => {
    setOpenDropDown(state => !state)
  }, [])

  const handleClearNotifications = useCallback(() => {
    setBagNotification(0)
  }, [])
  async function handleSignOut() {
    signOut()
    router.reload()
  }

  return (
    <Main>
      <HeaderUp>
        <Link href="/">
          <img src="merkur_horizontal.png" alt="" />
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
                <Manager onClick={handleClearNotifications}>
                  <div>Cesta</div>
                  <aside>
                    <FaShoppingBasket />
                    {bagNotification > 0 && (
                      <span>
                        {bagNotification < 9 ? bagNotification : '+9'}
                      </span>
                    )}
                  </aside>
                </Manager>
              </Link>
              <Dropdown
                buttonContent={
                  <Manager>
                    <FiChevronDown />
                    <div>
                      <span>{user.name}</span>
                      <span>{user.email}</span>
                    </div>
                    <aside>
                      {' '}
                      <FaUserAlt />
                    </aside>
                  </Manager>
                }
              >
                <li onClick={handleSignOut}>Sair</li>
              </Dropdown>
            </section>
          )}
        </ManagerArea>
      </HeaderUp>
      <HeaderDown>
        <aside>
          {tabs.map(tab => (
            <Link href={tab.path} key={tab.name}>
              <HeaderLink isSelected={tab.selected}>{tab.name}</HeaderLink>
            </Link>
          ))}
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
                  {tabs.map(tab => (
                    <Link href={tab.path} key={tab.name}>
                      <HeaderLink isSelected={tab.selected}>
                        {tab.name}
                      </HeaderLink>
                    </Link>
                  ))}
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
