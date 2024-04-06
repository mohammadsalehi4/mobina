/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState, useRef } from 'react'

import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectThemeColors } from '@utils'
import axios from 'axios'
import { serverAddress } from '../../../address'
import Cookies from 'js-cookie'
import { Label, Row, Col, Form, Input, Card, UncontrolledTooltip } from 'reactstrap'
import LocalLoading from '../../localLoading/localLoading'
import '@styles/react/libs/react-select/_react-select.scss'
import toast from 'react-hot-toast'
import LoadingButton from '../../loadinButton/LoadingButton'
import CardAction from '@components/card-actions'
import './style.css'
import { useParams } from "react-router-dom"
import {Trash2} from 'react-feather'
const St2 = ({ stepper, type }) => {


  const { minerid } = useParams()
  const States = useSelector(state => state)
  const [devices, SetDevices] = useState([])
  const [Addresses, SetAddresses] = useState([])
  const [DefaultPower, SetDefaultPower] = useState()
  const [Loaded, SetLoaded] = useState(false)
  const [Loading, SetLoading] = useState(false)
  const [Data, SetData] = useState([])
  const [reload, Setreload] = useState(false)

  const [EmptyData, SetEmptyData] = useState({})

  useEffect(() => {
    SetLoaded(false)
    if (States.miningMode === 1 || typeof (minerid) === 'string') {
      axios.get(`${serverAddress}/miners/devices/`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
        SetDevices(response.data.results)
        SetDefaultPower(Math.floor(response.data.results[0].hash_rate) / 1e12)
        axios.get(`${serverAddress}/miners/miner-addresses/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
          if (response.status === 200) {
            const addressList = []
            for (let i = 0; i < response.data.results.length; i++) {
              addressList.push({
                hash: response.data.results[i].hash,
                id: response.data.results[i].id
              })
            }
            SetEmptyData(
              {
                address:addressList[0].id,
                count:0,
                daily_working_hours:0,
                device:1,
                miner:  minerid === undefined ? (States.miningData.response.miner_uuid) : minerid,
                network:1,
                pool:"Foundry USA",
                power:18,
                status:'active'
              }
            )
            SetData(
              [
                {
                  address:addressList[0].id,
                  count:0,
                  daily_working_hours:0,
                  device:1,
                  miner:  minerid === undefined ? (States.miningData.response.miner_uuid) : minerid,
                  network:1,
                  pool:"Foundry USA",
                  power:18,
                  status:'active'
                }
              ]
            )
            SetAddresses(addressList)
            SetLoaded(true)
          }
        })
        .catch((err) => {
          console.log(err)
        })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [, States.miningMode])

  const submit = () => {

    let check = true
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].count <= 0) {
        check = false
      }
      if (Data[i].daily_working_hours <= 0) {
        check = false
      }
    }

    if (Data.length !== 0 && check) {
    SetLoading(true)
      axios.post(`${serverAddress}/miners/create/extraction-halde/`, 
        Data    
      ,
      {
        headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
        SetLoading(false)
        if (response.status === 201) {
          toast.success('ماینر ها با موفقیت ثبت شدند.', {
            position: 'bottom-left'
          })
          if (minerid === undefined) {
            window.location.reload()
          } else {
            window.location.assign('/miner')
          }
        } else {
          toast.error('خطا در افزودن دستگاه ها', {
            position: 'bottom-left'
          })
        }

      })
      .catch((err) => {
        SetLoading(false)
        console.log(err)
        if (err.response.status === 406) {
          toast.error('دستگاه‌ها قبلا اضافه شده‌اند', {
            position: 'bottom-left'
          })
        } else {
          toast.error('خطا در افزودن دستگاه ها', {
            position: 'bottom-left'
          })
        }

      })
    } else {
      toast.error('مقادیر را به صورت صحیح وارد کنید', {
        position: 'bottom-left'
      })
    }

  }

  return (
    <Fragment>
      {
        Loaded ? 
        <Form onSubmit={e => e.preventDefault()}>

        <Row id='miningStep2'>
        {
            Data.map((item, index) => {
              return (
                  <Card>
                    <Row className='m-3'>
                        <Col xl={4} md={6} className='mt-3'>
                          <Label>دستگاه</Label>
                          <select class="form-select" aria-label="Default select example"
                            onChange={
                              (e) => {
                                const getData = Data
                                getData[index].device = devices.find(item3 => item3.device_name === e.target.value).id
                                document.getElementById(`Power${index}`).value = (Math.floor(devices.find(item => item.device_name === e.target.value).hash_rate) / 1e12)
                                SetData(getData)
                                Setreload(!reload)
                              }
                            }
                          >
                            {
                              devices.map((item2, index) => {
                                
                                return (
                                  <option 
                                    value={item2.device_name} 
                                    selected={item.device === item2.id}
                                  >{item2.device_name}</option>
                                )
                              })
                            }
                          </select>
                        </Col>
                        
                        <Col xl={4} md={6} className='mt-3'>
                          <Label>انتخاب استخر</Label>
                          <select class="form-select" aria-label="Default select example"
                            onChange={
                              (e) => {
                                const getData = Data
                                getData[index].pool = e.target.value
                                SetData(getData)
                              }
                            }
                          >
                            <option selected = {item.pool === "Foundry USA"} value="Foundry USA">Foundry USA</option>
                            <option  selected = {item.pool === "AntPool"} value="AntPool">AntPool</option>
                            <option  selected = {item.pool === "ViaBTC"} value="ViaBTC">ViaBTC</option>
                            <option  selected = {item.pool === "F2Pool"} value="F2Pool">F2Pool</option>
                            <option  selected = {item.pool === "Binance"} value="Binance Pool">Binance Pool</option>
                            <option  selected = {item.pool === "Luxor"} value="Luxor">Luxor</option>
                            <option  selected = {item.pool === "BTC"} value="BTC.com">BTC.com</option>
                            <option  selected = {item.pool === "Braiins"} value="Braiins Pool">Braiins Pool</option>
                            <option  selected = {item.pool === "SBI"} value="SBI Crypto">SBI Crypto</option>
                            <option  selected = {item.pool === "Unknown"} value="Unknown">Unknown</option>
                            <option  selected = {item.pool === "SECPOOL"} value="SECPOOL">SECPOOL</option>
                            <option  selected = {item.pool === "MARA"} value="MARA Pool">MARA Pool</option>
                            <option  selected = {item.pool === "Poolin"} value="Poolin">Poolin</option>
                            <option  selected = {item.pool === "ULTIMUSPOOL"} value="ULTIMUSPOOL">ULTIMUSPOOL</option>
                            <option  selected = {item.pool === "OCEAN"} value="OCEAN">OCEAN</option>
                            <option  selected = {item.pool === "1THash"} value="1THash">1THash</option>
                          </select>
                        </Col>

                        <Col xl={4} md={6} className='mt-3'>
                          <Label>آدرس پاداش</Label>
                          <select class="form-select" aria-label="Default select example"
                            onChange={
                              (e) => {
                                const getData = Data
                                getData[index].address = Addresses.find(item3 => item3.hash === e.target.value).id
                                SetData(getData)
                              }
                            }
                          >
                            {
                              Addresses.map((item2, index) => {
                                return (
                                  <option selected={item2.id === item.address} value={item2.hash}>{item2.hash}</option>
                                )
                              })
                            }
                          </select>
                        </Col>

                        <Col xl={4} md={6} className='mt-3'>
                          <Label>ساعت کار روزانه</Label>
                          <Input type='number' defaultValue={Number(item.daily_working_hours)}
                            onChange={
                              (e) => {
                                const getData = Data
                                if (e.target.value > 24) {
                                  getData[index].daily_working_hours = 24
                                  e.target.value = 24
                                } else if (e.target.value < 0) {
                                  getData[index].daily_working_hours = 0
                                  e.target.value = 0
                                } else {
                                  getData[index].daily_working_hours = e.target.value
                                }
                                SetData(getData)
                              }
                            }
                          />
                        </Col>
                            
                        <Col xl={4} md={6} className='mt-3'>
                          <Label>وضعیت</Label>
                          <select class="form-select" aria-label="Default select example"
                            onChange={
                              (e) => {
                                const getData = Data
                                getData[index].status = e.target.value
                                SetData(getData)
                              }
                            }
                          >
                            <option selected={item.status === "active"} value="active">فعال</option>
                            <option selected={item.status === "not_active"} value="not_active">غیرفعال</option>
                          </select>
                        </Col>

                        <Col xl={4} md={6} className='mt-3'>
                          <Label>شبکه</Label>
                          <select class="form-select" aria-label="Default select example">
                            <option value={1}>بیت‌کوین</option>
                          </select>
                        </Col>

                        <Col xl={4} md={6} className='mt-3'>
                          <Label> قدرت هش (برحسب تراهش)</Label>
                          <Input type='number' id={`Power${index}`} defaultValue={Number(item.power)}
                            onChange={
                              (e) => {
                                const getData = Data
                                getData[index].power = e.target.value
                                SetData(getData)
                              }
                            }
                          />
                        </Col>

                        <Col xl={4} md={6} className='mt-3'>
                          <Label>تعداد</Label>
                          <Input type='number' defaultValue={Number(item.count)}
                            onChange={
                              (e) => {
                                const getData = Data
                                getData[index].count = e.target.value
                                SetData(getData)
                              }
                            }
                          />
                        </Col>

                        {
                          Data.length > 1 ? 
                            <Col xl={4} md={6} className='mt-3' style={{textAlign:'left'}}>
                              <Label> </Label>
                              <Trash2 style={{cursor:'pointer'}} 
                                id='deleteSelectedDevice'
                                className='mt-4'
                                onClick={ () => {
                                  const getData = Data
                                  getData.splice(index, 1)
                                  SetData(getData)
                                  Setreload(!reload)
                                }}
                              />
                              <UncontrolledTooltip placement='top' target='deleteSelectedDevice'>
                                حذف دستگاه
                              </UncontrolledTooltip>
                            </Col>
                          :
                            null
                        }

                    </Row>
                  </Card>

              )
            })
          }

        </Row>

        <div className='d-flex justify-content-between mt-3'>
          <button style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => { 
            const getData = Data
            getData.push(EmptyData)
            SetData(getData)
            Setreload(!reload)
          }}>
            <span className='align-middle d-sm-inline-block d-none'>افزودن دستگاه</span>
          </button>
          <button style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => { submit() }}>
            <span className='align-middle d-sm-inline-block d-none'>
              {
                Loading ? 
                  <LoadingButton/>
                :
                  <span>
                    اتمام
                  </span>
              }
            </span>
          </button>
        </div>
      </Form>
      :
        <LocalLoading/>
      }

    </Fragment>
  )
}

export default St2
