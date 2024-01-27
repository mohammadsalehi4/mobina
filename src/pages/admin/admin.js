/* eslint-disable no-unused-vars */
import react, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'

import './admin.css'
import {
  Nav,
  TabPane,
  NavItem,
  TabContent
} from 'reactstrap'
import { MainSiteOrange, MainSiteyellow } from '../../../public/colors'

import AdminEvents from '../../components/adminEvents/adminEvents'
import AdminReports from '../../components/adminReports/adminReports'
import AdminRolls from '../../components/adminRolls/adminRolls'
import AdminUsers from '../../components/adminUsers/adminUsers'
import AdminPrices from '../../components/adminPrices/adminPrices'
import AdminTax from '../../components/adminTax/adminTax'
import AdminEntity from '../../components/adminEntity/adminEntity'
import AdminAssets from '../../components/adminAssets/adminAssets'

const Admin = () => {
  const [active, setActive] = useState('1')
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  useEffect(() => {
    for (let i = 1; i <= 8; i++) {
        if (i !== 3) {
            document.getElementById(`Link${i}`).className = 'NotActiveAdmin'
        }
    }
    document.getElementById(`Link${active}`).className = 'ActiveAdmin'
    document.getElementById(`Link${active}`).style.borderColor = MainSiteyellow
  }, [active])

  useEffect(() => {
    dispatch({type:"SHOWNAVBAR"})
    dispatch({type:"SETWITCHPAGE", value:-1})
  }, [])

  //login check
  useEffect(() => {
    try {
        const access = Cookies.get('access')
        const decoded = jwt.decode(access)
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime || !decoded || decoded === '') {
            window.location.assign('/')
        } else {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
        }
    } catch {
    }
  }, [])

  const toggle = tab => {
    setActive(tab)
  }

  return (
    <div className='container-fluid' id='Admin'>

        <div className='row'>
            <div className='col-sm-1'>
            </div>
            <div className='col-sm-10' style={{background:"white", borderRadius:"8px", maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto'}}>
                <Fragment>
                    <Nav pills style={{background:"white"}} id='adminNav'>
                        <NavItem className="NavItem" style={{marginTop:"16px", marginBottom:"10px"}} id='AdminNavItem'>
                            <a
                                id='Link1'
                                active={active === '1'}
                                onClick={() => {
                                dispatch({type:"rollsLoading", value:1})
                                toggle('1')
                            }}>
                                <span className='align-middle'>کاربران</span>
                            </a>
                        </NavItem>
                        
                        <NavItem className="NavItem" style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link2'
                                active={active === '2'}
                                onClick={() => {
                                dispatch({type:"rollsLoading", value:2})
                                toggle('2')
                                }}>

                                <span className='align-middle'>نقش‌ها</span>
                            </a>
                        </NavItem>
                        {/* <NavItem className="NavItem" style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link3'
                                active={active === '3'}
                                onClick={() => {
                                dispatch({type:"rollsLoading", value:3})
                                toggle('3')
                                }}>
                                <span className='align-middle'>رخداد‌ها</span>
                            </a>
                        </NavItem> */}
                        <NavItem className="NavItem" style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link4'
                                active={active === '4'}
                                onClick={() => {
                                dispatch({type:"rollsLoading", value:4})
                                toggle('4')
                                }}>
                                <span className='align-middle'>مقالات</span>
                            </a>
                        </NavItem>
                        <NavItem className="NavItem" style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link5'
                                active={active === '5'}
                                onClick={() => {
                                dispatch({type:"rollsLoading", value:5})
                                toggle('5')
                                }}>
                                <span className='align-middle'>قیمت‌ها</span>
                            </a>
                        </NavItem>
                        <NavItem className="NavItem" style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link6'
                                active={active === '6'}
                                onClick={() => {
                                dispatch({type:"rollsLoading", value:6})
                                toggle('6')
                                }}>
                                <span className='align-middle'>مالیات</span>
                            </a>
                        </NavItem>
                        <NavItem className="NavItem" style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link7'
                                active={active === '7'}
                                onClick={() => {
                                dispatch({type:"rollsLoading", value:7})
                                toggle('7')
                                }}>
                                <span className='align-middle'>موجودیت‌ها</span>
                            </a>
                        </NavItem>
                        <NavItem className="NavItem" style={{marginTop:"16px", marginBottom:"10px"}}>
                            <a
                                id='Link8'
                                active={active === '8'}
                                onClick={() => {
                                dispatch({type:"rollsLoading", value:8})
                                toggle('8')
                                }}>
                                <span className='align-middle'>دارایی‌ها</span>
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
                        <TabPane tabId='5'>
                            <AdminPrices/>
                        </TabPane>
                        <TabPane tabId='6'>
                            <AdminTax/>
                        </TabPane>
                        <TabPane tabId='7'>
                            <AdminEntity/>
                        </TabPane>
                        <TabPane tabId='8'>
                            <AdminAssets/>
                        </TabPane>
                    </TabContent>
                </Fragment>
            </div>
        </div>
    </div>
  )
}
export default Admin
