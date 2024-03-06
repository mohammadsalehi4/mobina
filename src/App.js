/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, useLocation } from "react-router-dom"
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import EcommerceDashboard2 from '../src/pages/dashboard/index2'
import Main from '../src/pages/main/main'
import Header from '../src/pages/header/header'
import Tracker from '../src/pages/tracker/tracker'
import Tax from './pages/tax/tax'
import Mining from './pages/mining/mining'
import Reports from './pages/reports/reports'
import Recovery from './pages/passwordRecovery/recovery'
import ChangePassword from './pages/changePassword/changePassword'
import Admin from './pages/admin/admin'
import Owner from './pages/owner/owner'
import Entities from './pages/entities/entities'
import Folders from './pages/folders/folders'
import SingleCase from './components/folders/singleCase/singleCase'
import Demo from './pages/demo/demo'
import Profile from './pages/profile/profile'
import WelcomePage from './pages/minerSupervisor/WelcomePage'
import DropDown from './layouts/DropDown'
import './App.css'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import MainTax from './pages/tax/MainTax'
import ShowReport from './pages/reports/ShowReport'
import ShowLastTaxes from './pages/tax/ShowLastTaxes'
import axios from 'axios'
import { serverAddress } from './address'
import MinerUsers from './pages/minerSupervisor/minerUsers/minerUsers'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import MinerProfile from './pages/mining/profile/minerprofile'
import Minerefficienty from './pages/minerSupervisor/minerEfficienty/minerefficienty'
import NewCalculate from './pages/minerSupervisor/minerEfficienty/newCalculate'
import Footer from './pages/footer/footer'
const App = () => {
  const [Loading, SetLoading] = useState(false)

  const States = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    SetLoading(States.LoadingEffect)
  }, [States.LoadingEffect])

  const myFunction = () => {
    const refresh = Cookies.get('refresh')
    const bodyFormData = new FormData()
    bodyFormData.append('refresh', refresh)
    axios.post(`${serverAddress}/accounts/api/token/refresh/`, 
    bodyFormData,
    {
        headers: {
            Authorization: `Bearer ${Cookies.get('access')}`, 
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response) => {
      if (response.status === 200) {
        Cookies.set('access', response.data.access)
      }
    })
    .catch((err) => {})
  }

  useEffect(() => {
    // تنظیم یک تایمر برای اجرای تابع هر 50 دقیقه
    const interval = setInterval(() => {
      myFunction()
    }, 5 * 60 * 1000) // 50 دقیقه به میلی‌ثانیه

    // پاک‌سازی تایمر هنگام unmount شدن کامپوننت
    return () => clearInterval(interval)
  }, [])

  const location = useLocation()
  const showFooter = location.pathname !== '/' && location.pathname !== '/recovery'
  return (

    <UILoader  blocking={Loading} loader={<Spinner />}  id="loadingElement" style={{height:"100vh", zIndex:"1000000000000000"}}>
    <div style={{display:'flex', flexDirection:'column'}}>
      <div style={{
          minHeight: showFooter ? 'calc(100vh - 30px)' : '100vh',
           flex:'1', 
           marginBottom: showFooter ? '30px' : '0px'}}>
            {
              States.showNavbar ? < Header/> : null
            }
            <Routes>
              <Route path="/" exact element={<Main/>}/>
              <Route path="/recovery"  element={<Recovery/>}/>
              <Route path="/profile"  element={<Profile/>}/>
              {
                (Number(Cookies.get('roll')) === 2) ?
                  <Route path="/admin"  element={<Admin/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                  <Route path="/researcher"  element={<EcommerceDashboard2/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                  <Route path="/researcher/:hash"  element={<EcommerceDashboard2/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                  <Route path="/researcher/:network/:hash"  element={<EcommerceDashboard2/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                  <Route path="/tracker"  element={<Tracker/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                  <Route path="/tracker/:network/:hash"  element={<Tracker/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                  <Route path="/tracker/loadGraph/:network/:id"  element={<Tracker/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                  <Route path="/folders"  element={<Folders/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                  <Route path="/case"  element={<SingleCase/>}/>
                :
                null
              }
              <Route path="/newpassword/:username/:token"  element={<ChangePassword/>}/>
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 4) ?
                  <Route path="/tax"  element={<MainTax/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 4) ?
                  <Route path="/tax/management"  element={<Tax/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 4) ?
                  <Route path="/tax/management/:id/:state"  element={<Tax/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 4) ?
                  <Route path="/tax/list"  element={<ShowLastTaxes/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 5) ?
                  <Route path="/miner"  element={<MinerProfile/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 5) ?
                  <Route path="/miner/:minerid"  element={<Mining/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 5) ?
                  <Route path="/mining"  element={<Mining/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 6) ?
                  <Route path="/minersupervisor"  element={<WelcomePage/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 6) ?
                  <Route path="/minerusers"  element={<MinerUsers/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 6) ?
                  <Route path="/minerefficienty"  element={<Minerefficienty/>}/>
                :
                null
              }
              {
                (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 6) ?
                  <Route path="/new_miner_calculate"  element={<NewCalculate/>}/>
                :
                null
              }
              <Route path="/reports"  element={<Reports/>}/>
              <Route path="/reports/:id"  element={<ShowReport/>}/>
              {/* <Route path="/owner"  element={<Owner/>}/> */}
              {/* <Route path="/entities"  element={<Entities/>}/> */}
              <Route path="/demo"  element={<Demo/>}/>
              
            </Routes>
      </div>
      
      {
        showFooter ? 
          <Footer/>
        :
        null
      }
    </div>
    </UILoader>

  )
}

export default App
