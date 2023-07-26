/* eslint-disable no-unused-vars */
import react, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './admin.css'
import {
  Nav,
  TabPane,
  NavItem,
  TabContent
} from 'reactstrap'
import { Home, FileText, Trello, User, Hexagon } from 'react-feather'
import { MainSiteOrange } from '../../../public/colors'

import AdminEvents from '../../components/adminEvents/adminEvents'
import AdminReports from '../../components/adminReports/adminReports'
import AdminRolls from '../../components/adminRolls/adminRolls'
import AdminUsers from '../../components/adminUsers/adminUsers'

const Admin = () => {
  const [active, setActive] = useState('1')
  const dispatch = useDispatch()

  useEffect(() => {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`Link${i}`).className = 'NotActiveAdmin'
    }
    document.getElementById(`Link${active}`).className = 'ActiveAdmin'
    document.getElementById(`Link${active}`).style.borderColor = MainSiteOrange
  }, [active])

  useEffect(() => {
    dispatch({type:"SHOWNAVBAR"})
    dispatch({type:"SETWITCHPAGE", value:0})
  }, [])

  const toggle = tab => {
    setActive(tab)
  }
  
  return (
    <div className='container-fluid' id='Admin'>
        <div className='row'>
            <div className='col-sm-1'>
            </div>
            <div className='col-sm-10' style={{background:"white", borderRadius:"8px"}}>
                <Fragment>
                    <Nav pills style={{background:"white"}} id='adminNav'>
                        <NavItem style={{marginTop:"16px", marginBottom:"10px"}} id='AdminNavItem'>
                            <a
                                id='Link1'
                                active={active === '1'}
                                onClick={() => {
                                toggle('1')
                                }}>
                                <span className='align-middle'>کاربران</span>
                            </a>
                        </NavItem>
                        <NavItem style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link2'
                                active={active === '2'}
                                onClick={() => {
                                toggle('2')
                                }}>

                                <span className='align-middle'>نقش ها</span>
                            </a>
                        </NavItem>
                        <NavItem style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link3'
                                active={active === '3'}
                                onClick={() => {
                                toggle('3')
                                }}>
                                <span className='align-middle'>رخداد ها</span>
                            </a>
                        </NavItem>
                        <NavItem style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link4'
                                active={active === '4'}
                                onClick={() => {
                                toggle('4')
                                }}>
                                <span className='align-middle'>گزارش ها</span>
                            </a>
                        </NavItem>
                    </Nav>
                    <TabContent className='py-50' activeTab={active}>
                        <TabPane tabId='1'>
                            <AdminUsers/>
                        </TabPane>
                        <TabPane tabId='2'>
                            <AdminRolls/>
                        </TabPane>
                        <TabPane tabId='3'>
                            <AdminEvents/>
                        </TabPane>
                        <TabPane tabId='4'>
                            <AdminReports/>
                        </TabPane>
                    </TabContent>
                </Fragment>
            </div>
        </div>
    </div>
  )
}
export default Admin
