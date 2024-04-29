/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, useLocation } from "react-router-dom"
import Main from '../src/pages/main/main'

import './App.css'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const App = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()

  return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <Routes>
          <Route path="/" exact element={<Main/>}/>
        </Routes>
      </div>
  )
}

export default App
