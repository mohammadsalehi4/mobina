/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import CardMain from '../../components/cardMainBig/cardMain'
import CardSubMain from '../../components/cardSubMain/cardsubmain'
import CardNews from '../../components/cardNews/cardnews'
import './reports.css'
const Reports = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:5})
    }, [])
    return (
        <div className='container-fluid bg-white pt-2' id='Reports'>
            <div className='row'>
                <div className='col-lg-6 bg-white h-100 p-0'>
                    <CardMain/>
                </div>
                <div className='col-lg-6'>
                    <div className='row' style={{height:"33.3%"}}>
                        <div className='col-lg-12 p-0'>
                            <CardSubMain/>
                        </div>
                    </div>
                    <div className='row' style={{height:"33.3%"}}>
                        <div className='col-lg-12 p-0'>
                            <CardSubMain/>
                        </div>
                    </div>
                    <div className='row' style={{height:"33.3%"}}>
                        <div className='col-lg-12 p-0'>
                            <CardSubMain/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                <h4 id='lastNewsTitle'>
                    آخرین اخبار
                </h4>
            </div>
            <div className='row mt-3'>
                <div className='col-lg-4'>
                    <CardNews/>
                </div>
                <div className='col-lg-4'>
                    <CardNews/>
                </div>
                <div className='col-lg-4'>
                    <CardNews/>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-lg-4'>
                    <CardNews/>
                </div>
                <div className='col-lg-4'>
                    <CardNews/>
                </div>
                <div className='col-lg-4'>
                    <CardNews/>
                </div>
            </div>
        </div>
    )
}

export default Reports
