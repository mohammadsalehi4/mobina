/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import EcommerceDashboard from '../src/pages/dashboard/index'
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
import './App.css'

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
                <Route path="/researcher"  element={<EcommerceDashboard/>}/>
              :
              null
            }
            {
              (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 3) ?
                <Route path="/researcher/:hash"  element={<EcommerceDashboard/>}/>
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
                <Route path="/tracker/:hash"  element={<Tracker/>}/>
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
                <Route path="/tax"  element={<Tax/>}/>
              :
              null
            }
            {
              (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 4) ?
                <Route path="/tax/:txid"  element={<Tax/>}/>
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
            {/* <Route path="/owner"  element={<Owner/>}/> */}
            {/* <Route path="/entities"  element={<Entities/>}/> */}
            <Route path="/demo"  element={<Demo/>}/>
            
          </Routes>
    </div>
  )
}

export default App
