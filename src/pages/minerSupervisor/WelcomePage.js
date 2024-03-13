/* eslint-disable no-var */
/* eslint-disable semi */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {Col, Row, InputGroup, Input, InputGroupText} from 'reactstrap'
import TokenInformation from '../../components/dashboard/TokenInformation'
const WelcomePage = () => {
    const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type:"SHOWNAVBAR"})
    dispatch({type:"SETWITCHPAGE", value:7})
  }, [])
  
  return (
    <div className='container-fluid' id='MainTax'>

        <Row >
            <Col xl={{size:1}} lg={{size:1}} md={{size:0}} >
            </Col>

            <Col xl={{size:10}} lg={{size:10}} md={{size:12}} 
                style={{
                    textAlign:'center',
                    background:'white', 
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', 
                    borderRadius:'8px',
                    maxWidth: '1280px', 
                    marginLeft: 'auto', 
                    marginRight: 'auto'
                }} 
                
                >
                    <Row className='m-3' >
                        <Col style={{textAlign:'right'}} >
                            <h5 className='mt-3 mb-4'>
                                سرویس های مدیریت ناظر استخراج
                            </h5>
                        </Col>
                    </Row>
                    <Row className='m-3'>
                        <Col xl='4' lg='6' md='6'>
                            <a href='/minerusers' style={{color:'inherit', textDecoration:'none'}}>
                                <TokenInformation TokenImage='images/minerPeoformance.png' TokenTitle='مدیریت استخراج کنندگان' status='ورود' color1='primary' TokenDescription='در این بخش می‌توانید استخراج کننده جدید ثبت کنید و یا اطلاعات وارد شده را ویرایش کنید.'/>
                            </a>
                        </Col>
                        <Col xl='4' lg='6' md='6'>
                            <a href='/minerefficienty' style={{color:'inherit', textDecoration:'none'}}>
                                <TokenInformation TokenImage='images/minerManagement.png' TokenTitle='محاسبه کارآمدی استخراج کنندگان' status='ورود' color1='primary' TokenDescription='این بخش برای محاسبه‌ٔ عملکرد استخراج در یک بازه زمانی مشخص شده بر اساس اطلاعات ثبت شده در بخش مدیریت استخراج کنندگان است.'/>
                            </a>
                        </Col>
                    </Row>

            </Col>

            <Col xl={{size:1}} lg={{size:1}} md={{size:0}}>
            </Col>
        </Row>
      </div>
  )
}

export default WelcomePage
