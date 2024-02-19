/* eslint-disable prefer-template */
/* eslint-disable multiline-ternary */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, UncontrolledTooltip, Row, Col, Label } from 'reactstrap'
import {Modal, ModalBody, ModalFooter, Input, Button}  from 'reactstrap'
import { Calendar, CalendarProvider } from "zaman"
import { JalaliCalendar } from '../../../processors/jalaliCalendar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'
import toast from 'react-hot-toast'
import LoadingButton from '../../../components/loadinButton/LoadingButton'
const NewCalculate = () => {
    const dispatch = useDispatch()
    const [startDateBox, SetStartDateBox] = useState(false)
    const [EndDateBox, SetEndDateBox] = useState(false)
    const [StartDate, SetStartDate] = useState(null)
    const [StartMillisecond, SetStartMillisecond] = useState(null)
    const [EndDate, SetEndDate] = useState(null)
    const [EndMillisecond, SetEndMillisecond] = useState(null)
    const [minerData, SetMinerData] = useState([])
    const [DeviceData, SetDeviceData] = useState([])
    const [minerSelected, SetMinerSelected] = useState(null)
    const [DeviceLoading, SetDeviceLoading] = useState(false)
    const [Loading, SetLoading] = useState(false)

    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:7})
    }, [])

    useEffect(() => {
        axios.get(`${serverAddress}/miners/operation/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            if (response.status === 200) {
                const getData = []
                for (let i = 0; i < response.data.results.length; i++) {
                    getData.push(
                        {
                            uuid:response.data.results[i].uuid,
                            name: `${response.data.results[i].interface_fname} ${response.data.results[i].interface_lname}`
                        }
                    )
                }
                SetMinerData(getData)
                SetMinerSelected(getData[0].uuid)
            }
        })
        .catch((err) => {
            
        })
    }, [])

    useEffect(() => {
        if (minerSelected !== null) {
            SetDeviceLoading(true)
            axios.get(`${serverAddress}/miners/extraction-halde/?UUID=${minerSelected}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
                SetDeviceLoading(false)
                console.log(response)
                if (response.status === 200) {
                    const getData = []
                    for (let i = 0; i < response.data.results.length; i++) {
                        getData.push(
                            {
                                uuid:response.data.results[i].uuid,
                                name:response.data.results[i].device.device_name
                            }
                        )
                    }
                    SetDeviceData(getData)
                }
            })
            .catch((err) => {
                SetDeviceLoading(false)
            })
        }
    }, [minerSelected])

    const submit = () => {
        let check = false

        if (StartDate === null) {
            check = true
        }

        if (EndDate === null) {
            check = true
        }

        if (minerSelected === null) {
            check = true
        }
        
        const selectedDevice = []

        for (let i = 0; i < DeviceData.length; i++) {
            if (document.getElementById(`device${i}`).checked) {
                selectedDevice.push(DeviceData[i].uuid)
            }
            
            if (selectedDevice.length === 0) {
                check = true
            }
        }

        if (!check) {
            SetLoading(true)
            axios.post(serverAddress + "/miners/calculate/", 
            {
                start_date: String(Date.parse(StartMillisecond) / 1000),
                end_date: String(Date.parse(EndMillisecond) / 1000),
                miner: minerSelected,
                devices: selectedDevice
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                }
            }
            )
            .then((response) => {
                SetLoading(false)
                console.log(response)
                if (response.status === 201) {
                    window.location.assign('/minerefficienty')
                    return toast.success('محاسبه در حال انجام است', {
                        position: 'bottom-left'
                    })
                } else {
                    return toast.error('خطا در پردازش', {
                        position: 'bottom-left'
                    })
                }
            })
            .catch((err) => {
                SetLoading(false)
                console.log(err)
                return toast.error('خطا در پردازش', {
                    position: 'bottom-left'
                })
            })
        } else {
            return toast.error('مقادیر را به طور کامل مشخص کنید.', {
                position: 'bottom-left'
            })
        }
    }

    const selectAll = () => {
        if (document.getElementById('selectAll').checked === true) {
            for (let i = 0; i < DeviceData.length; i++) {
                document.getElementById(`device${i}`).checked = true
            }
        } else {
            for (let i = 0; i < DeviceData.length; i++) {
                document.getElementById(`device${i}`).checked = false
            }
        }
    }

  return (
    <div className='container-fluid mt-3'
        style={{
            textAlign: 'center', 
            maxWidth: '1280px', 
            marginLeft: 'auto', 
            marginRight: 'auto'
        }}
    >
        <Card className='p-3' style={{textAlign:'right'}}>
            <h6>
                ثبت محاسبات جدید
            </h6>
            <Row>
                <Col className='mt-3' xl={4} sm={6}>
                    <Label>تاریخ شروع</Label>
                    <Input onClick={ () => { SetStartDateBox(true) } } value={StartDate}/>
                </Col>
                <Col className='mt-3' xl={4} sm={6}>
                    <Label>تاریخ پایان</Label>
                    <Input onClick={ () => { SetEndDateBox(true) } } value={EndDate}/>
                </Col>
                <Col className='mt-3' xl={4} sm={6}>
                    <Label>انتخاب استخراج‌کننده</Label>
                    <select class="form-select" id='minerName' onChange={ (e) => { SetMinerSelected(e.target.value) } } aria-label="Default select example">
                        {
                            minerData.map((item, index) => {
                                return (
                                    <option selected={index === 0} value={item.uuid}>{item.name}</option>
                                )
                            })
                        }
                    </select>
                </Col>
                <Col className='mt-3' xl={4} sm={6}>
                    <Label>انتخاب دستگاه</Label>
                    {
                        DeviceLoading ? 
                            <Input value={'درحال پردازش'}/>
                        :
                            <div>
                                <Input type='checkbox' id='selectAll' onChange={selectAll}/>
                                <Label style={{fontSize:'15px'}} className='me-2' for='selectAll'>انتخاب همه</Label>
                                {
                                    DeviceData.map((item, index) => {
                                        return (
                                            // <option selected={index === 0} value={item.uuid}>{item.name}</option>
                                            <div>
                                                <Input type='checkbox' id={`device${index}`}/>
                                                <Label style={{fontSize:'18px'}} className='me-2' for={`device${index}`}>{item.name}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                    }

                </Col>
                <Col xl={12} className='mt-3'>
                    <Button color='primary' onClick={submit} style={{height:'36px'}}>
                        {
                            Loading ? 
                            <LoadingButton/>
                            :
                            <span>ثبت</span>
                        }
                    </Button>
                </Col>
            </Row>
        </Card>
        <Modal
            isOpen={startDateBox}
            className='modal-dialog-centered'
            toggle={ () => { SetStartDateBox(false) } }
            style={{maxWidth:'370px'}}
            modalClassName={'modal-danger'}
        >
            <ModalBody>
                <h6>انتخاب تاریخ شروع محاسبات</h6>
                <CalendarProvider locale={'fa'} >
                  <Calendar
                  onChange={(date) => {
                      if (date.value !== undefined) {
                            SetStartMillisecond(date.value)
                            SetStartDate(`${JalaliCalendar(date.value).year}-${JalaliCalendar(date.value).month}-${JalaliCalendar(date.value).day}`)
                      } else {
                            SetStartMillisecond(date)
                            SetStartDate(`${JalaliCalendar(date).year}-${JalaliCalendar(date).month}-${JalaliCalendar(date).day}`)
                      }
                      SetStartDateBox(false)
                  }}
                  />
                </CalendarProvider>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' >انتخاب</Button>
            </ModalFooter>
        </Modal>

        <Modal
            isOpen={EndDateBox}
            className='modal-dialog-centered'
            toggle={ () => { SetEndDateBox(false) } }
            style={{maxWidth:'370px'}}
            modalClassName={'modal-danger'}
        >
            <ModalBody>
                <h6>انتخاب تاریخ پایان محاسبات</h6>
                <CalendarProvider locale={'fa'} >
                  <Calendar
                  onChange={(date) => {
                      if (date.value !== undefined) {
                            SetEndMillisecond(date.value)
                            SetEndDate(`${JalaliCalendar(date.value).year}-${JalaliCalendar(date.value).month}-${JalaliCalendar(date.value).day}`)
                      } else {
                            SetEndMillisecond(date)
                            SetEndDate(`${JalaliCalendar(date).year}-${JalaliCalendar(date).month}-${JalaliCalendar(date).day}`)
                      }
                      SetEndDateBox(false)
                  }}
                  />
                </CalendarProvider>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' >انتخاب</Button>
            </ModalFooter>
        </Modal>
    </div>
  )
}

export default NewCalculate