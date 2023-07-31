import React from 'react'
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import './App.css'

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
          </Routes>
    </div>
  )
}

export default App
