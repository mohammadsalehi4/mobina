/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
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
import DropDown from './layouts/DropDown'
import './App.css'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import MainTax from './pages/tax/MainTax'
import ShowReport from './pages/reports/ShowReport'
const App = () => {
  const States = useSelector(state => state)
  return (
    <div>
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
              (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 5) ?
                <Route path="/mining"  element={<Mining/>}/>
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
  )
}

export default App
