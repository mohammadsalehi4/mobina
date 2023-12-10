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
    const [Step, SetStep] = useState(1)

  return (
    <>
        {
        Step === 1 ?
            <div className='container-fluid' style={{borderStyle:'solid', borderWidth:'1px', borderRadius:'8px', borderColor:"rgb(210,210,210)"}}>
                <Row>
                    <Col className='mt-3'>
                        <h5>
                            موجودیت جدید
                        </h5>
                    </Col>
                </Row>
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
                    <Col className='mt-3 mb-3'>
                        <Button color='warning' style={{height:'36px', float:'left'}} onClick={ () => { SetStep(2) } }>
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
        :
            <div className='container-fluid' style={{borderStyle:'solid', borderWidth:'1px', borderRadius:'8px', borderColor:"rgb(210,210,210)"}}>
                <Row>
                    <Col xl='12' className='mt-3'>
                        <h5>
                            افزودن آدرس
                        </h5>
                        <Label>
                            ETH-اتریوم
                        </Label>
                        <Input id='ETH' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            BTC-بیت کوین
                        </Label>
                        <Input id='BTC' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            BSC-بایننس اسمارت چین
                        </Label>
                        <Input id='BSC' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            LTC-لایت کوین
                        </Label>
                        <Input id='LTC' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            BCH-بیت کوین کش
                        </Label>
                        <Input id='BCH' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3 mb-3'>
                        <Button color='warning' style={{height:'36px', float:'left'}} onClick={ () => { SetStep(1) } }>
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
        }
    </>

  )
}

export default AddEntity
