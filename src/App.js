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
            <Route path="/researcher"  element={<EcommerceDashboard/>}/>
            <Route path="/tracker"  element={<Tracker/>}/>
            <Route path="/newpassword/:username/:token"  element={<ChangePassword/>}/>
            <Route path="/tax"  element={<Tax/>}/>
            <Route path="/mining"  element={<Mining/>}/>
            <Route path="/reports"  element={<Reports/>}/>
            <Route path="/tax/:txid"  element={<Tax/>}/>
            <Route path="/admin"  element={<Admin/>}/>
            <Route path="/owner"  element={<Owner/>}/>
            <Route path="/entities"  element={<Entities/>}/>
            <Route path="/folders"  element={<Folders/>}/>
            <Route path="/case"  element={<SingleCase/>}/>
            <Route path="/demo"  element={<Demo/>}/>
            
          </Routes>
                    {/* {
            States.showNavbar ? < Header/> : null
          }
          <Routes>
            <Route path="/" exact element={<Main/>}/>
            <Route path="/recovery"  element={<Recovery/>}/>
            <Route path="/researcher"  element={<EcommerceDashboard/>}/>
            <Route path="/tracker"  element={<Tracker/>}/>
            <Route path="/newpassword/:username/:token"  element={<ChangePassword/>}/>
            <Route path="/tax"  element={<Demo/>}/>
            <Route path="/mining"  element={<Demo/>}/>
            <Route path="/reports"  element={<Demo/>}/>
            <Route path="/tax/:txid"  element={<Demo/>}/>
            <Route path="/admin"  element={<Admin/>}/>
            <Route path="/owner"  element={<Demo/>}/>
            <Route path="/entities"  element={<Entities/>}/>
            <Route path="/folders"  element={<Demo/>}/>
            <Route path="/case"  element={<Demo/>}/>
            <Route path="/demo"  element={<Demo/>}/>
            
          </Routes> */}
    </div>
  )
}

export default App
