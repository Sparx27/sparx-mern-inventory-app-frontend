import './Sidebar.scss'
import { HiMenuAlt3 } from 'react-icons/hi'
import { TbLetterS } from 'react-icons/tb'
import menu from '../../data/sidebar'
import SidebarItem from './SidebarItem'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <div className='layout'>
      <div className='sidebar' style={{ width: isOpen ? '230px' : '60px' }}>

        <div className='top_section'>
          <div className='logo' style={{ display: isOpen ? 'block' : 'none' }}>
            <TbLetterS size={35} style={{ cursor: 'pointer' }} onClick={goHome} />
          </div>
          <div className='bars' style={{ marginLeft: isOpen ? '100px' : '0px' }}>
            <HiMenuAlt3 style={{ cursor: 'pointer' }} onClick={toggle} />
          </div>
        </div>
        <div>
          {menu.map((item, index) => {
            return <SidebarItem key={index} item={item} isOpen={isOpen} />
          })}
        </div>
      </div>

      <main style={{ paddingLeft: isOpen ? '230px' : '60px', transition: 'all .5s' }}>{children}</main>
    </div>
  )
}

export default Sidebar
