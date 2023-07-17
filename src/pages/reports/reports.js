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
    const data = {
        CardMain:{
            title:"عنوان خبر",
            description:" در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود. این یک متن تستی جهت نمایش بلاگ است."
        },
        CardSubMain:
        [
            {
                title:"عنوان خبر",
                description:"در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود. این یک متن تستی جهت نمایش بلاگ است."
            },
            {
                title:"عنوان خبر",
                description:"در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود. این یک متن تستی جهت نمایش بلاگ است."
            },
            {
                title:"عنوان خبر",
                description:"در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود. این یک متن تستی جهت نمایش بلاگ است."
            }
        ],
        CardNews:[
            {
                title:"عنوان خبر",
                description:"در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود. این یک متن تستی جهت نمایش بلاگ است."
            },
            {
                title:"عنوان خبر",
                description:"در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود. این یک متن تستی جهت نمایش بلاگ است."
            },
            {
                title:"عنوان خبر",
                description:"در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود. این یک متن تستی جهت نمایش بلاگ است."
            },
            {
                title:"عنوان خبر",
                description:"در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود. این یک متن تستی جهت نمایش بلاگ است."
            },
            {
                title:"عنوان خبر",
                description:"در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود. این یک متن تستی جهت نمایش بلاگ است."
            },
            {
                title:"عنوان خبر",
                description:"د این یک متن تستی جهت نمایش بلاگ است"
            }
        ]
        
    }
    return (
        <div className='container-fluid bg-white pt-2' id='Reports'>
            <div className='row'>
                <div className='col-lg-6 bg-white h-100 p-0'>
                    <CardMain data={data.CardMain}/>
                </div>
                <div className='col-lg-6'>
                    <div className='row' style={{height:"33.3%"}}>
                        <div className='col-lg-12 p-0'>
                            <CardSubMain data={data.CardSubMain[0]}/>
                        </div>
                    </div>
                    <div className='row' style={{height:"33.3%"}}>
                        <div className='col-lg-12 p-0'>
                            <CardSubMain data={data.CardSubMain[1]}/>
                        </div>
                    </div>
                    <div className='row' style={{height:"33.3%"}}>
                        <div className='col-lg-12 p-0'>
                            <CardSubMain data={data.CardSubMain[2]}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                <h4 id='lastNewsTitle'>
                    آخرین اخبار
                </h4>
            </div>
            <div className='row mt-2 mb-1'>
                <div className='col-lg-4'>
                    <CardNews data={data.CardNews[0]}/>
                </div>
                <div className='col-lg-4'>
                    <CardNews data={data.CardNews[1]}/>
                </div>
                <div className='col-lg-4'>
                    <CardNews data={data.CardNews[2]}/>
                </div>
            </div>
            <div className='row mt-2 mb-1'>
                <div className='col-lg-4'>
                    <CardNews data={data.CardNews[3]}/>
                </div>
                <div className='col-lg-4'>
                    <CardNews data={data.CardNews[4]}/>
                </div>
                <div className='col-lg-4'>
                    <CardNews data={data.CardNews[5]}/>
                </div>
            </div>
        </div>
    )
}

export default Reports
