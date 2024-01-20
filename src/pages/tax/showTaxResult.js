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
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import {ArrowDownCircle, ArrowUpCircle, AlertOctagon, Calendar} from 'react-feather'
import { RecognizeNetwork } from '../../processors/recognizeNetwork'
const ShowTaxResult = ({ stepper }) => {
    const dispatch = useDispatch()
    const States = useSelector(state => state)
    const [data, SetData] = useState(false)
    const [Networks, SetNetworks] = useState([])
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
                    console.log('response.data.find(item => item.id === States.taxId)')
                    console.log(response.data.find(item => item.id === States.taxId))
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

    useEffect(() => {
        axios.get(`${serverAddress}/explorer/assets/`, 
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('access')}`, 
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            if (response.status === 200) {
                SetNetworks(response.data.results)
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
    }, [])
  return (
        <Card className='m-0 ShowLastTaxes' style={{boxShadow:'none', maxWidth:'100%', maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto'}} id='ShowTaxResult' >
            <CardHeader style={{ margin:'0px', paddingBottom:'0px', paddingTop:'16px'}}>
                <div style={{textAlign:'right'}}>
                    <h5 className='mt-3'>نتیجه نهایی محاسبه مالیات</h5>
                </div>
            </CardHeader>
            <CardBody style={{textAlign:'left', boxShadow:'none'}}>
                {
                    data && Networks.length > 0 ? 
                    <Row className='mt-3'>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'نام کسب و کار'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.bussiness}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'آدرس کیف پول'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            <NiceAddress2 text={data.wallet_address} number={6}/>
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'شبکه'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {RecognizeNetwork(data.network)}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'توکن'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {
                                Networks.find(item => item.id === data.asset).persian_name
                            }
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'ضریب گردش اعمالی'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.applied_circulation_coefficient}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'نرخ برابری ریال-دلار'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.rial_price}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'درصد سود صرافی'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.precentage_profit_exchange}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'درصد مالیات بر درآمد'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.precentage_tax_income}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'شروع دوره زمانی'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.start_date_of_calculations}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'پایان دوره زمانی'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.end_date_of_calculations}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'نوع تراکنش ها'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {
                                data.type === "withdraw" ? 
                                <span>برداشت</span>
                                :
                                <span>
                                    واریز
                                </span>
                            }
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'مالیات بدون بخشش'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.final_tax}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <hr className='mt-3'/>

                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'درصد بخشش'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.final_tax}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Col xl='3' lg='4' md='6' sm='12' style={{textAlign:'right'}} className='mt-3'>
                        <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'مبلغ بخشش'}</p>
                        <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {data.final_tax}
                            <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                        </div>
                    </Col>
                    <Row>
                        <Col xl='6' className='mt-3' style={{textAlign:'right'}}>
                            <Label for='TaxCount'>مبلغ قابل پرداخت (ریال)</Label>
                            <Input id='TaxCount' placeholder='نام کسب و کار' disabled value={WriteNumber(States.taxAmount)}/>
                        </Col>
                        <Col xl='6' className='mt-3' style={{textAlign:'left'}}>
                            <a href={data.download_link} target="_blank">
                                <button style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next'>
                                    <span className='align-middle d-sm-inline-block d-none'>اکسل محاسبات</span>
                                </button>
                            </a>
                        </Col>
                    </Row>

                </Row>
                :
                null
                }

                <Row>
                    <Col className='mt-3' style={{textAlign:'right'}}>
                        <CountedTaxTable  data={data}/>
                        <br/>
                        <a className='m-0 mt-3' href={'/tax/list'}>
                        <button style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className=''>
                            <span className='align-middle d-sm-inline-block d-none'>بازگشت به لیست مالیات ها</span>
                        </button>
                    </a>
                    </Col>

                </Row>
                

            </CardBody>
    
        </Card>
  )
}

export default ShowTaxResult
