/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import './tax.css'
import { Card, CardHeader, Row, CardBody, Col } from 'reactstrap'
import { Input, Label, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import { WriteNumber } from '../../processors/PersianWriteNumber'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import LoadingButton from '../../components/loadinButton/LoadingButton'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useParams } from "react-router-dom"

const IncreaseTax = ({ stepper }) => {
    const { id } = useParams()
    const { state } = useParams()

    const dispatch = useDispatch()
    const States = useSelector(state => state)
    const [Loading, SetLoading] = useState(false)

    const Increase = () => {
        const percent = Number(document.getElementById('percent').value)
        const IncAmount = Number(document.getElementById('IncAmount').value)

        if (percent !== '' && IncAmount !== '') {
            const bodyFormData = new FormData()

            bodyFormData.append('forgiveness_precentage', percent)
            bodyFormData.append('forgiveness_mount', IncAmount)
            SetLoading(true)
            console.log('States.taxId')
            console.log(States.taxId)
            console.log(percent)
            console.log(IncAmount)
            axios.put(`${serverAddress}/taxing/update/${States.taxId}/`, 
            bodyFormData,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`, 
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                SetLoading(false)
                if (response.status === 200) {
                    dispatch({type:"taxAmount", value:Number(response.data.final_calcualation_price)})
                    dispatch({type:"taxData", value:1})
                    stepper.next()
                }
            })
            .catch((err) => {
                SetLoading(false)
                console.log(err)
                if (err.response.status === 403) {
                    Cookies.set('refresh', '')
                    Cookies.set('access', '')
                    window.location.assign('/')
                }
                if (err.response.status === 401) {
                    Cookies.set('refresh', '')
                    Cookies.set('access', '')
                    window.location.assign('/')
                }
            })
        } else {
            return toast.error('مقادیر را به طور کامل وارد کنید.', {
                position: 'bottom-left'
            })
        }
    }

    useEffect(() => {
        if (state === 'Done') {
          if (stepper !== null) {
            dispatch({type:"taxId", value:id})
            stepper.next()
          }
        }
    }, [stepper])

  return (
    <Card className='m-0 ' style={{boxShadow:'none', maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto'}}>
        <CardHeader style={{ margin:'0px', paddingBottom:'0px', paddingTop:'16px'}}>
            <h5>بخشش های مالیاتی</h5>
        </CardHeader>
        <CardBody style={{textAlign:'left', boxShadow:'none'}}>
            <Row>
                <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
                    <Label for='TaxCount'>مالیات محاسبه شده (ریال)</Label>
                    <Input id='TaxCount' placeholder='نام کسب و کار' disabled value={WriteNumber(States.taxAmount)}/>
                </Col>
            </Row>
            <Row>
                <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
                    <Label for='percent'>درصد بخشش (درصد)</Label>
                    <Input id='percent' defaultValue={0} placeholder='درصد' />
                </Col>
                <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
                    <Label for='IncAmount'>مبلغ بخشش (ریال)</Label>
                    <Input id='IncAmount' defaultValue={0} placeholder='ریال' />
                </Col>
            </Row>
            <Row>
                <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
                    <Label for='finalTax'>مالیات نهایی</Label>
                    <Input id='finalTax' placeholder='محاسبه نشده.' disabled/>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <button disabled style={{background:"gray", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px", float:'right'}} className='btn-next' onClick={() => {
                        stepper.previous()
                        }}>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowRight>
                        <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
                    </button>
                    <button style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => {
                        Increase()
                        }}>
                            {
                                Loading ? 
                                <LoadingButton/>
                                :
                                <>
                                    <span className='align-middle d-sm-inline-block d-none'>بعدی</span>
                                    <ArrowLeft size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowLeft>
                                </>
                            }

                    </button>
                </Col>
            </Row>
        </CardBody>

    </Card>
  )
}

export default IncreaseTax
