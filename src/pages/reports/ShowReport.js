/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import {Col, Row, Card} from 'reactstrap'
import { digitsEnToFa } from 'persian-tools'
import { Clock } from 'react-feather'
const ShowReport = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [data, SetData] = useState(null)
    const [Html, SetHtml] = useState(null)
    const [AccessError, SetAccessError] = useState(false)
    
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

    //get Report Detail
    useEffect(() => {
        axios.get(`${serverAddress}/reports/detail/${id}/`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            if (response.status === 200) {
                SetData(response.data)
                console.log(response.data)
            }
        })
        .catch((err) => {
            console.log(err)
            if (err.response.status === 403) {
              Cookies.set('refresh', '')
              Cookies.set('access', '')
              window.location.assign('/')
            } else if (err.response.status === 401) {
              Cookies.set('refresh', '')
              Cookies.set('access', '')
              window.location.assign('/')
            } else {
                SetAccessError(true)
            }
        })
    }, [])

    function parseDateTime(dateTimeString) {
        const date = new Date(dateTimeString)
    
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1, // ماه‌ها از 0 شروع می‌شوند، بنابراین 1 اضافه می‌کنیم
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            millisecond: date.getMilliseconds()
        }
    }

    useEffect(() => {
        if (data !== null) {
        console.log(parseDateTime(data.publication_date))
            
            const myHTML = `
            <div>
                ${data.text} 
            </div>`
            SetHtml(myHTML)
        }
    }, [data])

    return (
    <div className='container-fluid mt-3' style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto'}}  >

        <Row>
            <Col lg='2'></Col>
            <Col lg='8'>
                {
                    !AccessError ? 
                    <Card className='p-5'>
                    {
                        Html !== null ? 
                            <>
                                <Row>
                                    <Col lg='12' style={{textAlign:'left'}}>
                                        <img style={{width:'100%', borderRadius:'8px'}} src={data.image}/>
                                    </Col>
                                </Row>
                                <Row className='mt-3'>
                                    <Col lg='6'>
                                        <h3>
                                            {data.title}
                                        </h3>
                                        <p>
                                            <Clock size={18} style={{marginTop:'-4px', marginLeft:'8px'}}/>
                                            {`${digitsEnToFa(parseDateTime(data.publication_date).hour)}:${digitsEnToFa(parseDateTime(data.publication_date).minute)} ${digitsEnToFa(parseDateTime(data.publication_date).year)}/${digitsEnToFa(parseDateTime(data.publication_date).month)}/${digitsEnToFa(parseDateTime(data.publication_date).day)}`}
                                        </p>
                                        <small>
                                            نویسنده:
                                            {` ${data.author_fname} ${data.author_lname}`}
                                        </small>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col >
                                        <div style={{background:'#dcdcdc', borderRadius:'12px'}} className='p-3 mt-3 mb-3'>
                                            {data.summary}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div id='MainReportContent' dangerouslySetInnerHTML={{ __html: Html }} ></div>
                                    </Col>
                                </Row>
                            </>
                        :
                        null
                    }
                </Card>
                :
                <Card className='p-5'>
                    <p>شما دسترسی مشاهده این گزارش را ندارید!</p>
                </Card>
                }

            </Col>
            <Col lg='2'></Col>
        </Row>
    </div>
  )
}

export default ShowReport
