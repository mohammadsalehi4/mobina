/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import './tax.css'
import { Card, CardHeader, Row, CardBody, Col } from 'reactstrap'
import { Input, Label, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import { WriteNumber } from '../../processors/PersianWriteNumber'
import CountedTaxTable from './CountedTaxTable'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { serverAddress } from '../../address'
import axios from 'axios'
import Cookies from 'js-cookie'

const ShowTaxResult = ({ stepper }) => {
    const dispatch = useDispatch()
    const States = useSelector(state => state)
    const [data, SetData] = useState(false)
    useEffect(() => {
        if (States.taxData === 1) {
            axios.get(`${serverAddress}/taxing/operation`, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`, 
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    SetData(response.data.find(item => item.id === States.taxId))
                }
            })
            .catch((err) => {
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
        } 
    }, [States.taxData])
  return (
        <Card className='m-0 ShowLastTaxes' style={{boxShadow:'none', maxWidth:'100%'}} id='ShowTaxResult' >
            <CardHeader style={{ margin:'0px', paddingBottom:'0px', paddingTop:'16px'}}>
                <h5>بخشش های مالیاتی</h5>
            </CardHeader>
            <CardBody style={{textAlign:'left', boxShadow:'none'}}>
                <Row>
                    <Col xl='6' className='mt-3' style={{textAlign:'right'}}>
                        <Label for='TaxCount'>مبلغ قابل پرداخت (ریال)</Label>
                        <Input id='TaxCount' placeholder='نام کسب و کار' disabled value={WriteNumber(States.taxAmount)}/>
                    </Col>
                    <Col xl='6' className='mt-3' style={{textAlign:'left'}}>
                        <a href={data.download_link} target="_blank">
                            <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next'>
                                <span className='align-middle d-sm-inline-block d-none'>دریافت</span>
                            </button>
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col className='mt-3' style={{textAlign:'right'}}>
                        <CountedTaxTable  data={data}/>
                    </Col>

                </Row>

            </CardBody>
    
        </Card>
  )
}

export default ShowTaxResult
