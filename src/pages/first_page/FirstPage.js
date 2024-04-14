/* eslint-disable no-unused-vars */
// import Container from 'postcss/lib/container'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Entities from './DashboardSections/Entities/Entities'
import SlidBox from './DashboardSections/box/SlidBox'
import RewardStats from './DashboardSections/RewardStats/RewardStats'
import Chart from './DashboardSections/Charts/Chart'
import Addresses from './DashboardSections/Addresses/Addresses'


const FirstPage = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: "SHOWNAVBAR" })
    dispatch({ type: "SETWITCHPAGE", value: 9 })
  }, [])

  return (
    <div className='container-fluid'
      style={{
        // textAlign: 'center', 
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <Addresses />
      <Entities />
      <SlidBox />
      <RewardStats />
      <Chart />
    </div>
  )
}

export default FirstPage