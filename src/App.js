import React from 'react'
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import './App.css'

import EcommerceDashboard from '../src/pages/dashboard/index'
import Main from '../src/pages/main/main'
import Header from '../src/pages/header/header'
import Tracker from '../src/pages/tracker/tracker'
import Tax from './pages/tax/tax'

const App = () => {
  const States = useSelector(state => state)
  return (
    <div>
          {
            States.showNavbar ? < Header/> : null
          }
          <Routes>
            <Route path="/" exact element={<Main/>}/>
            <Route path="/researcher" exact element={<EcommerceDashboard/>}/>
            <Route path="/tracker/:address" exact element={<Tracker/>}/>
            <Route path="/tax" exact element={<Tax/>}/>
            <Route path="/tax/:txid" exact element={<Tax/>}/>
          </Routes>
    </div>
  )
}

export default App
