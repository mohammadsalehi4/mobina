import React from 'react'
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import './App.css'

import EcommerceDashboard from './views/dashboard/ecommerce'
import Main from './views/main/main'
import Header from './views/header/header'
import Tracker from './views/pages/tracker/tracker'

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
          </Routes>
    </div>
  )
}

export default App
