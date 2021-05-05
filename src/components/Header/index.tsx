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

const Header: React.FC = () => {
  const [openDropDown, setOpenDropDown] = useState(false)
  const [bagNotification, setBagNotification] = useState(0)
  const [tabs, setTabs] = useState([
    {
      name: 'Produtos',
      path: '/',
      selected: true
    },
    {
      name: 'Meus Pedidos',
      path: '/meus-pedidos',
      selected: false
    }
  ])

  const { user, signOut } = useAuth()
  const { bagItems } = useBag()
  const router = useRouter()

  useEffect(() => {
    setBagNotification(oldState => oldState + 1)
  }, [bagItems])

  const handleOpenDropDown = useCallback(() => {
    setOpenDropDown(state => !state)
  }, [])

  const handleClearNotifications = useCallback(() => {
    setBagNotification(0)
  }, [])

  const handleChangeTab = useCallback(tabName => {
    setTabs(oldTabs =>
      oldTabs.map(tab => {
        if (tabName === tab.name) {
          tab.selected = true
        } else {
          tab.selected = false
        }

        return tab
      })
    )
  }, [])

  async function handleSignOut() {
    signOut()
    router.reload()
  }

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
                <Manager onClick={handleClearNotifications}>
                  <div>Cesta</div>
                  <aside>
                    <FaShoppingBasket />
                    {bagNotification > 0 && router.pathname === 'cesta' && (
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
                      <span>1</span>
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
        <button>
          <FiMapPin /> <p>Cidade - UF</p>
        </button>
        <aside>
          {tabs.map(tab => (
            <Link href={tab.path} key={tab.name}>
              <HeaderLink
                isSelected={tab.selected}
                onClick={() => handleChangeTab(tab.name)}
              >
                {tab.name}
              </HeaderLink>
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
                      <HeaderLink
                        isSelected={tab.selected}
                        onClick={() => handleChangeTab(tab.name)}
                      >
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
