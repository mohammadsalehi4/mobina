/* eslint-disable multiline-ternary */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react'

import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectThemeColors } from '@utils'
import axios from 'axios'
import { serverAddress } from '../../../address'
import Cookies from 'js-cookie'
import { Label, Row, Col, Form, Input, Button } from 'reactstrap'
import LocalLoading from '../../localLoading/localLoading'
import '@styles/react/libs/react-select/_react-select.scss'

const St2 = ({ stepper, type }) => {
  const States = useSelector(state => state)
  const [devices, SetDevices] = useState([])
  const [Addresses, SetAddresses] = useState([])
  const [DefaultPower, SetDefaultPower] = useState()
  const [Loaded, SetLoaded] = useState(false)
  const [Data, SetData] = useState([])

  useEffect(() => {
    SetLoaded(false)
    console.log()
    if (States.miningMode === 1) {
      alert(States.miningMode)
      axios.get(`${serverAddress}/miners/devices/`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
        SetDevices(response.data.results)
        console.log('response.data.results')
        console.log(response.data.results)
        SetDefaultPower(Math.floor(response.data.results[0].hash_rate / 1e12))
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

  const changeDevice = (e) => {
    console.log(devices)
    console.log(e.target.value)
    console.log(devices.find(item => item.id === e.target.value))
  }

  const DailyWork = (e) => {
    if (e.target.value > 24) {
      e.target.value = 24
    }
    if (e.target.value < 0) {
      e.target.value = 0
    }
    e.target.value = Number(e.target.value)
  }

  const addDevice = () => {
    const deviceName = document.getElementById('deviceName').value
    const rewardAddress = document.getElementById('rewardAddress').value
    const pool = document.getElementById('pool').value
    const DailyWork = document.getElementById('DailyWork').value
    const status = document.getElementById('status').value
    const network = document.getElementById('network').value
    const hashPower = document.getElementById('hashPower').value
    const DeviceNumber = document.getElementById('DeviceNumber').value

    const newData = {
      device:deviceName,
      address:rewardAddress,
      count:DeviceNumber,
      power:Number(hashPower),
      network,
      daily_working_hours:DailyWork,
      status,
      miner:States.miningData.response.miner_uuid,
      pool
    }

    const getData = Data

    getData.push(newData)
    SetData(getData)

    
  }

  const submit = () => {
    console.log(Data)
    console.log(States.miningData.response.miner_uuid)
    axios.post(`${serverAddress}/miners/create/extraction-halde/`, 
      Data    
    ,
    {
      headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <Fragment>
      {
        Loaded ? 
        <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Col xl={4} md={6} className='mt-3'>
            <Label>دستگاه</Label>
            <select class="form-select" id='deviceName' aria-label="Default select example" onChange={changeDevice}>
              {
                devices.map((item, index) => {
                  return (
                    <option value={item.id} >{item.device_name}</option>
                  )
                })
              }
            </select>
          </Col>
          <Col xl={4} md={6} className='mt-3'>
            <Label>انتخاب استخر</Label>
            <select class="form-select" id='pool' aria-label="Default select example">
              <option selected value="Foundry USA">Foundry USA</option>
              <option value="AntPool">AntPool</option>
              <option value="ViaBTC">ViaBTC</option>
              <option value="F2Pool">F2Pool</option>
              <option value="Binance Pool">Binance Pool</option>
              <option value="Luxor">Luxor</option>
              <option value="BTC.com">BTC.com</option>
              <option value="Braiins Pool">Braiins Pool</option>
              <option value="SBI Crypto">SBI Crypto</option>
              <option value="Unknown">Unknown</option>
              <option value="SECPOOL">SECPOOL</option>
              <option value="MARA Pool">MARA Pool</option>
              <option value="Poolin">Poolin</option>
              <option value="ULTIMUSPOOL">ULTIMUSPOOL</option>
              <option value="OCEAN">OCEAN</option>
              <option value="1THash">1THash</option>
            </select>
          </Col>
          <Col xl={4} md={6} className='mt-3'>
            <Label>آدرس پاداش</Label>
            <select class="form-select" id='rewardAddress' aria-label="Default select example">
              {
                Addresses.map((item, index) => {
                  return (
                    <option value={item.id}>{item.hash}</option>
                  )
                })
              }
            </select>
          </Col>
          <Col xl={4} md={6} className='mt-3'>
            <Label>ساعت کار روزانه</Label>
            <Input type='number' id='DailyWork' onChange={DailyWork}/>
          </Col>
          <Col xl={4} md={6} className='mt-3'>
            <Label>وضعیت</Label>
            <select class="form-select" id='status' aria-label="Default select example">
              <option value="active">فعال</option>
              <option value="not_active">غیرفعال</option>
            </select>
          </Col>
          <Col xl={4} md={6} className='mt-3'>
            <Label>شبکه</Label>
            <select class="form-select" id='network' aria-label="Default select example">
              <option value={1}>بیت‌کوین</option>
            </select>
          </Col>
          <Col xl={4} md={6} className='mt-3'>
            <Label>قدرت هش</Label>
            <Input type='number' id='hashPower' defaultValue={DefaultPower}/>
          </Col>
          <Col xl={4} md={6} className='mt-3'>
            <Label>تعداد</Label>
            <Input type='number' id='DeviceNumber' />
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-3'>
          <button style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => { addDevice() }}>
            <span className='align-middle d-sm-inline-block d-none'>ثبت دستگاه</span>
          </button>
          <button style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => { submit() }}>
            <span className='align-middle d-sm-inline-block d-none'>اتمام</span>
            <ArrowLeft size={14} className='align-middle ms-sm-25 ms-0 me-1'></ArrowLeft>
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
