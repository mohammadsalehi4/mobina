import React from 'react'
import {Row, Col, Label} from 'reactstrap'
import {
  AlertCircle
} from 'react-feather'
const LegalDetail = () => {
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
                <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
              </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  نام (انگلیسی)
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  وبسایت
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  نوع
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  کشور
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  تاسیس
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  پشتیبانی از فیات
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  سکه خصوصی
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  نهاد ناظر
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  اسم حقوقی
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  شماره ثبت
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
          <Col xl='4' lg='6' className='mt-3'>
              <Label style={{color:'gray'}} >
                  مجوز
              </Label>
                <p >
                  <AlertCircle size={16} style={{marginLeft:'4px'}} />
                  هیچ
                </p>
          </Col>
      </Row>
    </div>
  )
}

export default LegalDetail
