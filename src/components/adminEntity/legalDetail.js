/* eslint-disable multiline-ternary */
import React, { useEffect } from 'react'
import {Row, Col, Label} from 'reactstrap'
import {
  AlertCircle
} from 'react-feather'
const LegalDetail = (props) => {

  useEffect(() => {
    console.log(props.data)
  }, [props.data])

  return (
    <div className='container-fluid'>
      <h6>
        مشخصات حقوقی
      </h6>
      <Row>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}}>
                  نام (فارسی)
              </Label>
              <p >
                <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {props.data.persian_name}
              </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  نام (انگلیسی)
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {props.data.name}
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  وبسایت
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {props.data.web_site}
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  نوع
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {
                    (props.data.type === null) ?
                      <span>
                        null
                      </span>
                    :
                      <span>
                        false
                      </span>
                  }
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  کشور
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {props.data.country}
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  تاسیس
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {props.data.establishment}
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  پشتیبانی از فیات
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {
                    (props.data.fiat_support === null || props.data.fiat_support === false) ?
                      <span>
                        خیر
                      </span>
                    :
                      <span>
                        بله
                      </span>
                  }
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  سکه خصوصی
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {
                    (props.data.private_coin === null || props.data.private_coin === false) ?
                      <span>
                        خیر
                      </span>
                    :
                      <span>
                        بله
                      </span>
                  }
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  نهاد ناظر
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {props.data.supervisory_body}
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  اسم حقوقی
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {props.data.legal_name}
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  شماره ثبت
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {props.data.registration_number}
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  مجوز
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px', marginTop:'-4px'}} />
                  {props.data.licence}
                </p>
          </Col>
      </Row>
    </div>
  )
}

export default LegalDetail
