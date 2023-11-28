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

const MainTax = () => {
    const dispatch = useDispatch()
    const [stepper, setStepper] = useState(null)
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
    useEffect(() => {
          dispatch({type:"SHOWNAVBAR"})
          dispatch({type:"SETWITCHPAGE", value:4})
    }, [])

  return (
    <div className='container-fluid' id='MainTax'>

        <Row >
            <Col xl={{size:1}} lg={{size:1}} md={{size:0}} >
            </Col>

            <Col xl={{size:10}} lg={{size:10}} md={{size:12}} style={{textAlign:'center', background:'white', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', borderRadius:'8px'}} id='MainTax'>
                    <Row className='m-3' >
                        <Col style={{textAlign:'right'}} id='MainTax'>
                            <h5 className='mt-3 mb-4'>
                                سرویس های مالیاتی
                            </h5>
                        </Col>
                    </Row>
                    <Row className='m-3'>
                        <Col xl='4' lg='6' md='6'>
                            <a href='/tax/management' style={{color:'inherit', textDecoration:'none'}}>
                                <TokenInformation TokenImage='images/income.png' TokenTitle='مالیات بر درآمد' status='ورود به پنل' color1='primary' TokenDescription='این مالیات بر اساس درآمدهای ناشی جریان کلی ورودی و خروجی از کیف پول‌ کریپتویی کسب و کار در مدت مشخص شده، محاسبه و اعلام می‌شود.'/>
                            </a>
                        </Col>
                        <Col xl='4' lg='6' md='6'>
                            <TokenInformation TokenImage='images/invest.png' TokenTitle='مالیات بر عایدی سرمایه' status='به زودی' color1='warning' TokenDescription='این مالیات بر مبنای میزان رشد ارزش ریالی سرمایه‌ٔ کریپتویی کسب و کار در مدت زمانی مشخص شده محاسبه می‌شود.'/>
                        </Col>
                        <Col xl='4' lg='6' md='6'>
                            <TokenInformation TokenImage='images/trade.png' TokenTitle='مالیات بر معامله' status='به زودی' color1='warning' TokenDescription='در محاسبه این مالیات فرض می‌شود که تراکنش‌های انتخابی از کیف پول، مبنای یک معامله رمز ارزی هستند.'/>
                        </Col>
                    </Row>

            </Col>

            <Col xl={{size:1}} lg={{size:1}} md={{size:0}}>
            </Col>
        </Row>
      </div>
  )
}

export default MainTax
