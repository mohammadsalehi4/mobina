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

  //login check
  useEffect(() => {
    try {
        const access = Cookies.get('access')
        const decoded = jwt.decode(access)
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime || !decoded || decoded === '') {
            window.location.assign('/')
        } else {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
        }
    } catch {
    }
  }, [])
      
  return (
    <div className='container-fluid mt-2'
    style={{
        textAlign: 'center', 
        maxWidth: '1280px', 
        marginLeft: 'auto', 
        marginRight: 'auto'
      }}
    >
        <div className='row' style={{textAlign:'right'}}>
            <div className='col-xl-6 mt-3'>
                <Cases/>
            </div>
            <div className='col-xl-6 mt-3'>
                <Notes/>
            </div>
        </div>
        <div className='row' style={{textAlign:'right'}}>
            <div className='col-lg-12 mt-3'>
                <Addresses/>
            </div>
        </div>
        <div className='row' style={{textAlign:'right'}}>
            <div className='col-lg-6 mt-3'>
                <Transactions/>
            </div>
            <div className='col-lg-6 mt-3'>
                <Visualizations/>
            </div>
        </div>
    </div>
  )
}

export default SingleCase
