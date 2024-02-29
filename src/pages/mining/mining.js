/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react'
import WizardModern from '../../components/wizard/WizardModern'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import AdminWizardModern from '../../components/wizardAdminMiner/WizardModern'
import './mining.css'
const Mining = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:3})
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
        <div id='mining' className='container-fluid'>
            <div className='row'>
                <div className='col-lg-1'>
                </div>
                <div className='col-lg-10 '  style={{background:"white"}}>
                    {
                        (Number(Cookies.get('roll')) === 2 || Number(Cookies.get('roll')) === 6) ?
                            <AdminWizardModern/>
                        :
                            <WizardModern/>
                    }
                </div>
                <div className='col-lg-1'>
                </div>
            </div>
        </div>
    )
}

export default Mining