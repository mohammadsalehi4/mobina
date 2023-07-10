/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react'
import WizardModern from '../../components/wizard/WizardModern'
import { useDispatch } from 'react-redux'
import './mining.css'
const Mining = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:3})
    }, [])
    return (
        <div id='mining' className='container-fluid'>
            <div className='row'>
                <div className='col-lg-1'>
                </div>
                <div className='col-lg-10 mt-5'  style={{background:"white"}}>
                    <WizardModern/>
                </div>
                <div className='col-lg-1'>
                </div>
            </div>
        </div>
    )
}

export default Mining