/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import {
    Col,
    Row,
    Input,
    Label,
    Button
} from 'reactstrap'
import LoadingButton from '../loadinButton/LoadingButton'
const AddEntity = () => {

    const [Loading, SetLoading] = useState(false)

  return (
    <div className='container-fluid'>
        <Row>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    نام (فارسی)
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    نام (انگلیسی)
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    وبسایت
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    نوع
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    کشور
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    تاسیس
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    پشتیبانی از فیات
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    سکه خصوصی
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    نهاد ناظر
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    اسم حقوقی
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    شماره ثبت
                </Label>
                <Input/>
            </Col>
            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    مجوز
                </Label>
                <Input/>
            </Col>
        </Row>
        <Row>
            <Col className='mt-3'>
                <Button color='warning' style={{height:'36px', float:'left'}}>
                    {
                        Loading ? 
                        <LoadingButton/>
                        :
                        <span>
                            ثبت
                        </span>
                    }
                </Button>
            </Col>
        </Row>
    </div>
  )
}

export default AddEntity
