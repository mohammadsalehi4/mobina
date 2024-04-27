/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
/* eslint-disable no-tabs */
import React, {useEffect, useRef, useState} from 'react'
import '../../assets/vendor/fonts/fontawesome.css'
import '../../assets/vendor/fonts/tabler-icons.css'
import '../../assets/vendor/fonts/flag-icons.css'
import '../../assets/vendor/css/rtl/core.css'
import '../../assets/css/demo.css'
import '../../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import '../../assets/vendor/libs/node-waves/node-waves.css'
import '../../assets/vendor/libs/typeahead-js/typeahead.css'
import '../../assets/vendor/libs/apex-charts/apex-charts.css'
import '../../assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css'
import '../../assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css'
import '../../assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css'
import DropDown from '../../layouts/DropDown'
import './header.css'
import './searchStyle.css'
import Cookies from 'js-cookie'
import { useSelector } from "react-redux"
// eslint-disable-next-line no-duplicate-imports
import { useDispatch } from "react-redux"
import { Eye, X } from 'react-feather'
import {
  Input,
  InputGroup, InputGroupText, Modal, ModalBody
} from 'reactstrap'
import axios from 'axios'
import { serverAddress } from '../../address'
import FoundItems from './FoundItems'
import * as Icon from 'react-feather'

function Header() {
  const myInputRef = useRef(null)

  const focusInput = () => {
    myInputRef.current.focus()
  }
  
  const [Roll, SetRoll] = useState('')
  const States = useSelector(state => state)
	const dispatch = useDispatch()
  const myElementRef = useRef(null)
  
  const openMobileMenu = () => {
		// eslint-disable-next-line no-tabs
		dispatch({type:"SHOWMOBILEMENU", value:true})
	// eslint-disable-next-line no-tabs
	}

	const closeMobileMenu = () => {
		dispatch({type:"SHOWMOBILEMENU", value:false})
	}
  
  useEffect(() => {
		if (States.showMobileMenu) {
			document.getElementById('MobileHeaderBox').style.right = "0%"
			document.getElementById('MobileMenuHider').style.display = "block"
		} else {
			document.getElementById('MobileHeaderBox').style.right = "-60%"
			document.getElementById('MobileMenuHider').style.display = "none"
		}
	}, [States.showMobileMenu])

  useEffect(() => {
    if (States.witchPage) {
      for (let i = 0; i < 9; i++) {
        try {
          document.getElementById(`MenuBottomItem${i}`).className = 'menu-item thisNotActive'
          document.getElementById(`MobileheaderLink${i + 1}`).className = 'menu-item thisNotActive'
        } catch (error) {}
      }
      if (States.witchPage !== -1) {
        try {
          document.getElementById(`MenuBottomItem${States.witchPage}`).className = 'menu-item thisActive'
          document.getElementById(`MobileheaderLink${States.witchPage + 1}`).className = 'menu-item thisActive'
        } catch (error) {}
      }
    }
  }, [States.witchPage])

  const handleClickOutside = (e) => {
    if (myElementRef.current && !myElementRef.current.contains(e.target)) {
      dispatch({type:"SHOWADMINACCESSBOX", value:false})
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  //recognize admin or not
  useEffect(() => {
    SetRoll(Cookies.get('roll'))
  }, [, Cookies.get('roll')])

  const [SearchBox, SetSearchBox] = useState(false)

  return (

    <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu" id='header'>
      <div class="layout-container">
        <nav class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
          <div class="container-fluid  ">

            <div class="navbar-brand app-brand demo d-none d-xl-flex py-0"  style={{marginRight:"60px"}}>
              <a href="/" class="app-brand-link gap-2">
                <img src='/images/logo22.png' id='logo'/>
                <p className='vazir' id='brandName'>پنتا</p>
              </a>
            </div>

            <div  class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none" style={{color:"#f8f8f8"}} onClick={openMobileMenu}>
              <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)" style={{color:"#f8f8f8"}}>
                <i class="ti ti-menu-2 ti-sm" style={{color:"#f8f8f8"}}></i>
              </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center">
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

              <ul class="navbar-nav flex-row ms-auto rightheaderItems">

                <li id='AdminPanelHeaderIcon' title='پنل ادمین' class="nav-item dropdown-shortcuts navbar-dropdown dropdown  me-xl-0" onClick={ () => { SetSearchBox(true) } }>
                    <a  class="nav-link dropdown-toggle hide-arrow topHeaderIcon" id='headerLinkAdminPanel' style={{direction:'rtl'}}>
                      <Icon.Search />
                    </a>
                </li> 

                {
                  (Number(Roll) === 2) ? 
                    <li id='AdminPanelHeaderIcon' title='پنل ادمین' class="nav-item dropdown-shortcuts navbar-dropdown dropdown  me-xl-0">
                      <a  class="nav-link dropdown-toggle hide-arrow topHeaderIcon" href='/admin' id='headerLinkAdminPanel'>
                        <i class="ti ti-layout-grid-add ti-md "></i>
                      </a>
                    </li> 
                  : 
                    null
                }

                <li title='پروفایل' class="nav-item dropdown-notifications navbar-dropdown dropdown">
                    <DropDown/>
                </li>

              </ul>
            </div>

            <div class="navbar-search-wrapper search-input-wrapper container-xxl d-none">
              <input
                type="text"
                class="form-control search-input border-0"
                placeholder="Search..."
                aria-label="Search..." />
              <i class="ti ti-x ti-sm search-toggler cursor-pointer"></i>
            </div>

          </div>
        </nav>

        <div class="layout-page " id='row2HeaderBox' >
          <div class="content-wrapper">
            <aside id="layout-menu" class="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0">
              <div class="container-fluid d-flex h-100" style={{marginRight:"50px"}}>
                <ul class="menu-inner">

                  <li id='MenuBottomItem9' class="menu-item thisNotActive" style={{marginRight:"0px"}}>
                    <a class="menu-link" href='/home'>
                    <ion-icon name="home-outline"></ion-icon>
                      <div data-i18n="Dashboards" className='vazir'>داشبورد</div>
                    </a>
                  </li>

                  {
                    (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                      <li id='MenuBottomItem1' class="menu-item thisActive">
                        <a class="menu-link" href='/researcher'>
                          <ion-icon name="locate-outline"></ion-icon>
                          <div data-i18n="Layouts" className='vazir'>کاوشگر</div>
                        </a>
                      </li>
                    :
                      null
                  }

                  {
                    (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                      <li id='MenuBottomItem2' class="menu-item thisNotActive">
                        <a class="menu-link" href='/tracker'>
                        <ion-icon name="radio-outline"></ion-icon>
                          <div data-i18n="Apps" className='vazir'>ردیابی</div>
                        </a>
                      </li>
                    :
                      null
                  }

                  {
                    (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 6) ?
                      <li id='MenuBottomItem7' class="menu-item thisNotActive">
                        <a class="menu-link" href='/minersupervisor'>
                          <ion-icon name="eye-outline"></ion-icon>
                          <div data-i18n="Pages" className='vazir'>ناظر استخراج</div>
                        </a>
                      </li>
                    :
                      null
                  }

                  {
                    (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 5) ?
                      <li id='MenuBottomItem3' class="menu-item thisNotActive">
                        <a class="menu-link" href='/miner'>
                        <ion-icon name="diamond-outline"></ion-icon>
                          <div data-i18n="Pages" className='vazir'>استخراج</div>
                        </a>
                      </li>
                    :
                      null
                  }

                  {
                    (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 4) ?
                      <li id='MenuBottomItem4' class="menu-item thisNotActive">
                        <a class="menu-link" href='/tax'>
                        <ion-icon name="cash-outline"></ion-icon>
                          <div data-i18n="Components" className='vazir'>مالیات</div>
                        </a>
                      </li>
                    :
                      null
                  }

                  <li id='MenuBottomItem5' class="menu-item thisNotActive">
                    <a class="menu-link" href='/reports'>
                    <ion-icon name="reader-outline"></ion-icon>
                      <div data-i18n="Forms" className='vazir'>مقالات</div>
                    </a>
                  </li>

                  {
                    (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                      <li id='MenuBottomItem6' class="menu-item thisNotActive">
                        <a class="menu-link" href='/folders'>
                        <ion-icon name="folder-open-outline"></ion-icon>
                          <div data-i18n="Forms" className='vazir'>پرونده‌ها</div>
                        </a>
                      </li>
                    :
                      null
                  }

                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div id='MobileMenuHider' onClick={closeMobileMenu}>

      </div>
      <div id='MobileHeaderBox'>
        <div id='menuItems'>
          <div style={{display:"block", marginRight:"15px", width:"calc(100% - 30px)"}}>
            <img src='images/myLogo.png' id='logo' style={{display:"inline-block", marginRight:"15px"}}/>
            <h1 onClick={() => { window.location.assign('/researcher') }} style={{ cursor:"pointer", display:"inline-block", marginRight:"20px", paddingTop:"10px"}}>پنتا</h1>
          </div>
          <a className="vazir" id='MobileheaderLink1' href="#"><ion-icon name="people-outline" className="headerIonIcon"></ion-icon> حساب کاربری</a>
          <a className="vazir" id='MobileheaderLink2' href="/researcher"><ion-icon name="radio-outline" className="headerIonIcon "></ion-icon> کاوشگر</a>
          <a className="vazir" id='MobileheaderLink4' href="/tracker"><ion-icon name="locate-outline"></ion-icon>ردیابی</a>
          <a className="vazir" id='MobileheaderLink3' href="/mining"><ion-icon name="diamond-outline" className="headerIonIcon"></ion-icon> استخراج</a>
          <a className="vazir" id='MobileheaderLink5' href="/tax"><ion-icon name="cash-outline" className="headerIonIcon"></ion-icon> مالیات</a>
          <a className="vazir" id='MobileheaderLink6' href="/reports"><ion-icon name="reader-outline" className="headerIonIcon"></ion-icon>مقالات</a>
          <a className="vazir" id='MobileheaderLink7' href="/folders"><ion-icon name="folder-open-outline" className="headerIonIcon"></ion-icon> پرونده ها</a>
          <div id='mobileOptionsSeprator'></div>
          <a className="vazir" id='MobileheaderLink7' href="#"><ion-icon name="exit-outline"></ion-icon> خروج</a>
        </div>
      </div>
      <div id='adminOptionBox'>
        <a>
          <div className='adminOptionBox1'>
            <p className='vazir'>ادمین</p>
            <ion-icon name="apps-outline"></ion-icon>
          </div>
        </a>
        <div className='adminOptionBox adminOptionBox2'>
          <a>
            <div className='adminOptionBox adminOptionBox4'>
              <ion-icon name="people-outline"></ion-icon>
              <p className='vazir'>کاربران</p>
            </div>
          </a>
          <a>
            <div className='adminOptionBox adminOptionBox5'>
              <ion-icon name="game-controller-outline"></ion-icon>
              <p className='vazir'>رخداد ها</p>
            </div>
          </a>
        </div>
        <div className='adminOptionBox adminOptionBox3'>
          <a>
            <div className='adminOptionBox adminOptionBox6'>
              <ion-icon name="git-merge-outline"></ion-icon>
              <p className='vazir'>نقش ها</p>
            </div>
          </a>
          <a>
            <div className='adminOptionBox adminOptionBox7'>
              <ion-icon name="reader-outline"></ion-icon>
              <p className='vazir'>گزارش ها</p>
            </div>
          </a>
        </div>
      </div>
      
      <Modal
        isOpen={SearchBox}
        toggle={ () => { SetSearchBox(false) } }
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        style={{minWidth:'40%', padding:'0px'}}
      >
        <ModalBody style={{padding:'0px', borderRadius:'12px', overflow:'hidden'}}>
          <FoundItems isOpen={SearchBox}/>
        </ModalBody>
      </Modal>

    </div>

  )
}

export default Header