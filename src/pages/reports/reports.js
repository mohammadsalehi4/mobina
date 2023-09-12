/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import CardMain from '../../components/cardMainBig/cardMain'
import CardSubMain from '../../components/cardSubMain/cardsubmain'
import CardNews from '../../components/cardNews/cardnews'
import './reports.css'
import Cookies from 'js-cookie'

const Reports = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:5})
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
      
    const data = {
        CardMain:{
            title:"پیش‌نویس سند «الزامات فعالیت صرافی‌های رمزارزی» توسط فراجا تدوین شد ",
            description:"بنابر اظهارات برخی فعالان حوزه رمزارز، فراجا پیش‌نویس سندی در مورد الزامات فعالیت‌ صرافی‌های رمزارزی در ایران تدوین کرده که در صورت نهایی شدن می‌تواند به منزله چارچوب فعالیت برای صرافی‌های ایرانی تلقی شود."
        },
        CardSubMain:
        [
            {
                title:"مروری بر تاریخچه پروژه‌های کلاهبرداری رمز ارزها در ایران",
                description:"در تمام دنیا هنگامی که یک بازار مالی بر سر زبان‌ها می‌افتد، افرادی هستند که بخواهند از این فرصت سو استفاده کنند و پول افراد دیگر را بدست آورند.",
                img:"2.jpg"
            },
            {
                title:"کمیسیون SEC نظارت بیشتری بر حوزه دیفای اعمال می‌کند ",
                description:"سخنگوی AnChain.AI، موسسه تحلیل بلاکچین بیان کرد این شرکت قراردادی به ارزش بیش از ۶۰۰ هزار دلار با کمیسیون بورس و اوراق بهادار آمریکا (SEC) منعقد کرده است که به این کمیسیون برای رگولاتوری و رصد فضای دیفای، کمک می‌کند.",
                img:"3.jpg"
            },
            {
                title:"آخرین وضعیت قانون گذاری بیت کوین و ارزهای دیجیتال در جهان چگونه است؟ ",
                description:" با افزایش استفاده از رمزارزها شاهد وضع مقررات بیشتر در کشورهای مختلف برای کنترل شرایط حاکم بر دنیای کریپتوکارنسی‌ها هستیم. ",
                img:"4.jpg"
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
                    <div className='row'>
                        <div className='col-lg-12 p-0'>
                            <CardSubMain data={data.CardSubMain[0]}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12 p-0'>
                            <CardSubMain data={data.CardSubMain[1]}/>
                        </div>
                    </div>
                    <div className='row'>
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
