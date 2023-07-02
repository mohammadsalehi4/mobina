// ** Dropdowns Imports
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import { Sun, Moon } from 'react-feather'
import './style.css'
import { NavItem, NavLink } from 'reactstrap'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ms-auto ' id='headerTopLeftLinks' style={{marginTop:"10px"}}>
      <UserDropdown />
      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NavbarSearch />
      <ion-icon name="log-out-outline" id="TopNavbarIcon" onClick={() => { window.location.assign('/') }}></ion-icon>
    </ul>
  )
}
export default NavbarUser
