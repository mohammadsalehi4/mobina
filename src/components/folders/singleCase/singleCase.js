/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import Cases from './cases'
import Settings from './settings'
import Notes from './notes'
import Addresses from './addresses'
import Transactions from './transactions'
import Visualizations from './visualizations'
import Trackings from './trackings'
import Cookies from 'js-cookie'
const SingleCase = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:6})
    }, [])

    useEffect(() => {
        try {
          const access = Cookies.get('access')
          const decoded = jwt.decode(access)
          const currentTime = Date.now() / 1000
          if (decoded.exp > currentTime) {
          } else {
            window.location.assign('/')
          }
        } catch {
          window.location.assign('/')
        }
      }, [])
      
  return (
    <div className='container-fluid mt-2' style={{boxSizing:"border-box", background:"rgb(240,240,240)"}}>
        <div className='row'>
            <div className='col-lg-6 mt-3'>
                <Cases/>
            </div>
            <div className='col-lg-4 mt-3'>
                <Settings/>
            </div>
            <div className='col-lg-2 mt-3'>
                <Notes/>
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-12 mt-3'>
                <Addresses/>
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-12 mt-3'>
                <Transactions/>
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-6 mt-3 mb-3'>
                <Visualizations/>
            </div>
            <div className='col-lg-6 mt-3 mb-3'>
                <Trackings/>
            </div>
        </div>
    </div>
  )
}

export default SingleCase
