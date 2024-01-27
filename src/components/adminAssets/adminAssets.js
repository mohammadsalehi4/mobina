/* eslint-disable no-unused-vars */
import React, {Fragment, useState, useEffect} from 'react'
import {
    Nav,
    TabPane,
    NavItem,
    TabContent
  } from 'reactstrap'
import ShowAssets from './showAssets'
import AddAsset from './AddAsset'

const AdminAssets = () => {
    const [active, setActive] = useState('1')
    const toggle = tab => {
        setActive(tab)
    }

  return (
    <div className='nav-vertical'>
        <Nav tabs className='nav-left JDAdmin' style={{marginRight:"0px", width:"140px", border:"none"}}>
            <NavItem style={{ marginRight:"-40px", cursor:"pointer"}} >
                <a
                    id='Link1'
                    active={active === '1'}
                    onClick={() => {
                    toggle('1')
                }}>
                    <span className='align-right'>مشاهده دارایی‌ها</span>
                </a>
            </NavItem>

            <NavItem className="NavItem" style={{ marginRight:"-40px", marginTop:"16px", marginBottom:"10px"}} >
                <a
                    id='Link1'
                    active={active === '2'}
                    onClick={() => {
                    toggle('2')
                }}>
                    <span className='align-right'>افزودن دارایی</span>
                </a>
            </NavItem>
        </Nav>

        <Nav  className='JMAdmin' tabs style={{fontSize:"12px", marginRight:"0px", paddingBottom:"12px"}}>
            <NavItem className="NavItem" style={{  cursor:"pointer"}} >
                <a
                    id='Link1'
                    active={active === '1'}
                    onClick={() => {
                    toggle('1')
                }}>
                    <span className='align-right'>مشاهده دارایی‌ها</span>
                </a>
            </NavItem>

            <NavItem className="NavItem" style={{ marginRight:'16px' }} >
                <a
                    id='Link1'
                    active={active === '2'}
                    onClick={() => {
                    toggle('2')
                }}>
                    <span className='align-right'>افزودن دارایی</span>
                </a>
            </NavItem>
        </Nav>

        <TabContent activeTab={active}>
          <TabPane tabId='1'>
            <ShowAssets/>
          </TabPane>
          <TabPane tabId='2'>
            <AddAsset/>
          </TabPane>
        </TabContent>
    </div>
  )
}

export default AdminAssets
