import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import { Fragment, useState, useEffect } from 'react'
import { MainSiteGray, MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import AdminAddNewUser from '../adminAddNewUser/adminAddNewUser'
// ** Reactstrap Imports
const AdminUsers = () => {
  const [active, setActive] = useState('1')
  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  useEffect(() => {
    for (let i = 1; i <= 2; i++) {
        document.getElementById(`AdminUsersDesktopLink${i}`).style.color = "rgb(120,120,120)"
        document.getElementById(`AdminUsersMobileLink${i}`).style.color = "rgb(120,120,120)"
    }
    document.getElementById(`AdminUsersDesktopLink${active}`).style.color = MainSiteOrange
    document.getElementById(`AdminUsersMobileLink${active}`).style.color = MainSiteOrange
  }, [active])

  return (
    <div className='nav-vertical mt-3 '>
      <div className='JDAdmin'>
        <Nav tabs className='nav-left' style={{marginRight:"0px", width:"140px", border:"none"}}>
          <NavItem style={{ marginRight:"-40px", marginBottom:"16px"}}>
            <a
              active={active === '1'}
              id='AdminUsersDesktopLink1'
              style={{marginRight:"0px", color:MainSiteOrange}}
              onClick={() => {
                toggle('1')
              }}
            >
              مشاهده کاربران
            </a>
          </NavItem>
          <NavItem  style={{ marginRight:"-40px", marginBottom:"16px"}}>
            <a
              id='AdminUsersDesktopLink2'
              active={active === '2'}
              onClick={() => {
                toggle('2')
              }}
            >
              افزودن کاربر جدید
            </a>
          </NavItem>
        </Nav>
        <TabContent activeTab={active}>
          <TabPane tabId='2'>
            <AdminAddNewUser/>
          </TabPane>
          <TabPane tabId='1'>
            <p>
              box2
            </p>
          </TabPane>
        </TabContent>
      </div>
      
      <div className='JMAdmin'>
        <Fragment>
          <Nav tabs style={{fontSize:"12px", marginRight:"-40px", paddingBottom:"12px"}}>
            <NavItem style={{ marginBottom:"10px"}}>
              <a
                id='AdminUsersMobileLink1'
                active={active === '1'}
                style={{
                  paddingBottom:"5px"
                }}
                onClick={() => {
                  toggle('1')
                }}
              >
              افزودن کاربر جدید
              </a>
            </NavItem>
            <NavItem style={{ }}>
              <a
                active={active === '2'}
                id='AdminUsersMobileLink2'
                style={{
                  marginRight:"12px",
                  paddingBottom:"5px"
                }}
                onClick={() => {
                  toggle('2')
                }}
              >
              مشاهده کاربران
              </a>
            </NavItem>
          </Nav>
          <TabContent className='py-50' activeTab={active}>
            <TabPane tabId='1'>
              <AdminAddNewUser/>
            </TabPane>
            <TabPane tabId='2'>
              box2
            </TabPane>
          </TabContent>
        </Fragment>
      </div>
      
    </div>
  )
}
export default AdminUsers

