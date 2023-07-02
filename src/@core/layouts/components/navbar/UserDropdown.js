// ** React Imports
import { Link } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils

// ** Store & Actions

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, ShoppingCart, Table} from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image

const UserDropdown = () => {

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <Table className='ficon' />
      </DropdownToggle>
      <DropdownMenu id='adminPermisionMenu'>
        <DropdownItem tag={Link} to='/pages/profile'>
          <User size={14} className='me-75' />
          <span className='align-middle'>کاربران</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/email'>
          <Mail size={14} className='me-75' />
          <span className='align-middle'>رخداد ها</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/todo'>
          <CheckSquare size={14} className='me-75' />
          <span className='align-middle'>نقش ها</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/chat'>
          <MessageSquare size={14} className='me-75' />
          <span className='align-middle'>گزارش ها</span>
        </DropdownItem>
        <DropdownItem divider />
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
