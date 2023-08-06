/* eslint-disable no-tabs */
import React, {useEffect, useRef} from 'react'
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
import './header.css'
import { useSelector } from "react-redux"
// eslint-disable-next-line no-duplicate-imports
import { useDispatch } from "react-redux"
function Header() {
  const States = useSelector(state => state)
	const dispatch = useDispatch()
  const openMobileMenu = () => {
		// eslint-disable-next-line no-tabs
		dispatch({type:"SHOWMOBILEMENU", value:true})
	// eslint-disable-next-line no-tabs
	}
	const closeMobileMenu = () => {
		dispatch({type:"SHOWMOBILEMENU", value:false})
	}

  const myElementRef = useRef(null)
  
  useEffect(() => {
		if (States.showMobileMenu) {
			document.getElementById('MobileHeaderBox').style.right = "0%"
			document.getElementById('MobileMenuHider').style.display = "block"
		} else {
			document.getElementById('MobileHeaderBox').style.right = "-60%"
			document.getElementById('MobileMenuHider').style.display = "none"
		}
	}, [States.showMobileMenu])

  // useEffect(() => {
  //   if (States.showAdminAccessBox) {
  //     document.getElementById('adminOptionBox').style.display = "block"
  //   } else {
  //     document.getElementById('adminOptionBox').style.display = "none"
  //   }
  // }, [States.showAdminAccessBox])

  useEffect(() => {
    if (States.witchPage) {
      for (let i = 0; i < 7; i++) {
        document.getElementById(`MenuBottomItem${i}`).className = 'menu-item thisNotActive'
      }
      document.getElementById(`MenuBottomItem${States.witchPage}`).className = 'menu-item thisActive'

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

  // const changeAdminAccessShow = () => {
  //   const show = States.showAdminAccessBox
	// 	dispatch({type:"SHOWADMINACCESSBOX", value:!show})
  // }

  return (
    <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu" id='header'>
      <div class="layout-container">
        <nav class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
          <div class="container-fluid  ">
            <div class="navbar-brand app-brand demo d-none d-xl-flex py-0"  style={{marginRight:"60px"}}>
              <a href="/" class="app-brand-link gap-2">
                <img src='images/logo.png' id='logo'/>
                <p className='vazir' id='brandName'>پنتا</p>
              </a>
            </div>

            <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none" style={{color:"#f8f8f8"}} onClick={openMobileMenu}>
              <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)" style={{color:"#f8f8f8"}}>
                <i class="ti ti-menu-2 ti-sm" style={{color:"#f8f8f8"}}></i>
              </a>
            </div>

            <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              <ul class="navbar-nav flex-row ms-auto rightheaderItems">
                <li class="nav-item dropdown-shortcuts navbar-dropdown dropdown  me-xl-0">
                  {/* <a class="nav-link dropdown-toggle hide-arrow topHeaderIcon"  ref={myElementRef} onClick={changeAdminAccessShow} id='openAdminaccessBoxIcon'> */}
                  <a class="nav-link dropdown-toggle hide-arrow topHeaderIcon" href='/admin'>
                    <i class="ti ti-layout-grid-add ti-md "></i>
                  </a>
                </li>

                <li class="nav-item dropdown-shortcuts navbar-dropdown dropdown  me-xl-1">
                  <a class="nav-link dropdown-toggle hide-arrow topHeaderIcon">
                    <ion-icon name="moon-outline" className="topHeaderIcon"></ion-icon>
                  </a>
                </li>

                <li class="nav-item dropdown-notifications navbar-dropdown dropdown  me-xl-1">
                  <a class="nav-link dropdown-toggle hide-arrow topHeaderIcon">
                    <ion-icon name="notifications-outline" className="topHeaderIcon"></ion-icon>
                  </a>
                </li>

                <li class="nav-item dropdown-notifications navbar-dropdown dropdown  me-xl-1" onClick={() => { window.location.assign('/') }}>
                  <a class="nav-link dropdown-toggle hide-arrow topHeaderIcon">
                    <ion-icon name="exit-outline" id="signoutIcon" className="topHeaderIcon"></ion-icon>
                  </a>
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

                <li id='MenuBottomItem0' class="menu-item thisNotActive" style={{marginRight:"0px"}}>
                  <a class="menu-link">
                  <ion-icon name="home-outline"></ion-icon>
                    <div data-i18n="Dashboards" className='vazir'>داشبورد</div>
                  </a>
                </li>

                  <li id='MenuBottomItem1' class="menu-item thisActive">
                    <a class="menu-link" href='/researcher'>
                      <ion-icon name="locate-outline"></ion-icon>
                      <div data-i18n="Layouts" className='vazir'>کاوشگر</div>
                    </a>
                  </li>

                  <li id='MenuBottomItem2' class="menu-item thisNotActive">
                    <a class="menu-link" href='/tracker'>
                    <ion-icon name="radio-outline"></ion-icon>
                      <div data-i18n="Apps" className='vazir'>ردیابی</div>
                    </a>
                  </li>

                  <li id='MenuBottomItem3' class="menu-item thisNotActive">
                    <a class="menu-link" href='mining'>
                    <ion-icon name="diamond-outline"></ion-icon>
                      <div data-i18n="Pages" className='vazir'>استخراج</div>
                    </a>
                  </li>

                  <li id='MenuBottomItem4' class="menu-item thisNotActive">
                    <a class="menu-link" href='/tax'>
                    <ion-icon name="cash-outline"></ion-icon>
                      <div data-i18n="Components" className='vazir'>مالیات</div>
                    </a>
                  </li>

                  <li id='MenuBottomItem5' class="menu-item thisNotActive">
                    <a class="menu-link" href='/reports'>
                    <ion-icon name="reader-outline"></ion-icon>
                      <div data-i18n="Forms" className='vazir'>گزارش ها</div>
                    </a>
                  </li>

                  <li id='MenuBottomItem6' class="menu-item thisNotActive">
                    <a class="menu-link" href='/folders'>
                    <ion-icon name="folder-open-outline"></ion-icon>
                      <div data-i18n="Forms" className='vazir'>پرونده ها</div>
                    </a>
                  </li>
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
          <img src='images/logoPanta.png' id='logo' style={{display:"inline-block", marginRight:"15px"}}/>
              <h1 onClick={() => { window.location.assign('/researcher') }} style={{ cursor:"pointer", display:"inline-block", marginRight:"20px", paddingTop:"10px"}}>پنتا</h1>
          </div>
          <a class="vazir" id='MobileheaderLink1' href="#"><ion-icon name="people-outline" className="headerIonIcon"></ion-icon> حساب کاربری</a>
          <a class="vazir" id='MobileheaderLink2' href="#"><ion-icon name="radio-outline" className="headerIonIcon "></ion-icon> کاوشگر</a>
          <a class="vazir" id='MobileheaderLink3' href="#"><ion-icon name="diamond-outline" className="headerIonIcon"></ion-icon> استخراج</a>
          <a class="vazir" id='MobileheaderLink4' href="#"><ion-icon name="locate-outline"></ion-icon>ردیابی</a>
          <a class="vazir" id='MobileheaderLink5' href="#"><ion-icon name="cash-outline" className="headerIonIcon"></ion-icon> مالیات</a>
          <a class="vazir" id='MobileheaderLink6' href="#"><ion-icon name="reader-outline" className="headerIonIcon"></ion-icon> گزارش ها</a>
          <div id='mobileOptionsSeprator'></div>
          <a class="vazir" id='MobileheaderLink7' href="#"><ion-icon name="exit-outline"></ion-icon> خروج</a>
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
    </div>
  )
}

export default Header