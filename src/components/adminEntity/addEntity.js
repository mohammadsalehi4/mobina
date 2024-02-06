/* eslint-disable prefer-const */
/* eslint-disable no-duplicate-imports */
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
import Select, { components } from 'react-select'
import { Card, CardHeader, CardBody, Modal, ModalBody, ModalFooter } from 'reactstrap'
import LoadingButton from '../loadinButton/LoadingButton'
import { Calendar, CalendarProvider } from "zaman"
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../address'
import { JalaliCalendar } from '../../processors/jalaliCalendar'
import { GetMillisecond } from '../../processors/getMillisecond'
import toast from 'react-hot-toast'

const AddEntity = () => {

    const [Loading, SetLoading] = useState(false)
    const [Step, SetStep] = useState(1)
    const [EstablishmentBox, setEstablishmentBox] = useState(false)
    const [EstablishmentDate, setEstablishmentDate] = useState('')
    const [Types, setTypes] = useState([])
    const [Countries, setCountries] = useState([])
    const [SelectedType, setSelectedType] = useState(1)
    const [SelectedCountry, setSelectedCountry] = useState('')
    const [EntityId, setEntityId] = useState(null)

    const addNewEntity = () => {
        let name = document.getElementById('name').value
        let Ename = document.getElementById('Ename').value
        let website = document.getElementById('website').value
        let type = SelectedType
        let supervisor = document.getElementById('supervisor').value
        let legalName = document.getElementById('legalName').value
        let registerNumber = document.getElementById('registerNumber').value
        let licence = document.getElementById('licence').value
        let fiatSupport = document.getElementById('fiatSupport').value
        let PrivateCoin = document.getElementById('PrivateCoin').value
        let getTime
        if (EstablishmentDate !== '') {
            getTime = `${JalaliCalendar(EstablishmentDate).year}-${JalaliCalendar(EstablishmentDate).month}-${JalaliCalendar(EstablishmentDate).day}`
        } else {
            getTime = null
        }
        let country = SelectedCountry

        let error  = false

        if (name === '') {
            name = null
        }
        if (Ename === '') {
            Ename = null
        }
        if (website === '') {
            website = null
        }
        if (supervisor === '') {
            supervisor = null
        }
        if (legalName === '') {
            legalName = null
        }
        if (registerNumber === '') {
            registerNumber = null
        }

        if (error) {
            return toast.error('مقادیر را به طور کامل وارد کنید.', {
                position: 'bottom-left'
            })
        } else {
            SetLoading(true)
            axios.post(`${serverAddress}/entity/`, 
            {
                //
                name:Ename,

                //
                persian_name:name,

                //
                web_site:website,

                //
                type,

                //
                establishment:getTime,

                //
                fiat_support:fiatSupport,

                //
                private_coin:PrivateCoin,

                //
                supervisory_body:supervisor,

                //
                legal_name:legalName,

                //
                registration_number:registerNumber,

                //
                licence,
                
                //
                country
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`, 
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                SetLoading(false)
                if (response.status === 200) {
                    SetStep(2)
                    setEntityId(response.data.id)
                    return toast.success('موجودیت با موفقیت ساخته شد.', {
                        position: 'bottom-left'
                    })
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
                if (err.response.status === 400) {
                    return toast.error('مقادیر را به طور کامل وارد کنید.', {
                        position: 'bottom-left'
                    })
                }
            })
        }
    }

    //get types
    useEffect(() => {
        axios.get(`${serverAddress}/entity/type/`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
          if (response.status === 200) {
            const getType = []
            for (let i = 0; i < response.data.types.length; i++) {
                getType.push({
                    id:response.data.types[i].id,
                    value:response.data.types[i].name,
                    label:response.data.types[i].name
                })
            }
            setTypes(getType)
            setSelectedType(getType[0].id)
          }
        })
        .catch((err) => {
            console.log(err)
          SetEditLoading(false)
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

    //get Countries
    useEffect(() => {
        axios.get(`${serverAddress}/entity/countries/`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            console.log(response)
          if (response.status === 200) {
            const getC = []
            for (let i = 0; i < response.data.countries.length; i++) {
                getC.push({
                    symbol:response.data.countries[i][0],
                    name:response.data.countries[i][1]
                })
            }
            setCountries(getC)
            setSelectedCountry(getC[0].symbol)
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

    const addAllAddress = () => {
        const ethAddress = document.getElementById('ETH').value
        const mainETH = ethAddress.split('\n')
        
        const btcAddress = document.getElementById('BTC').value
        const mainBTC = btcAddress.split('\n')
        
        const BSCAddress = document.getElementById('BSC').value
        const mainBSC = BSCAddress.split('\n')

        const LTCAddress = document.getElementById('LTC').value
        const mainLTC = LTCAddress.split('\n')

        const BCHAddress = document.getElementById('BCH').value
        const mainBCH = BCHAddress.split('\n')

        const array = []

        if (mainETH[0] !== '') {
            for (let i = 0; i < mainETH.length; i++) {
                array.push(
                    {
                        name:mainETH[i],
                        network:4
                    }
                )
            }
        }

        if (mainBTC[0] !== '') {
            for (let i = 0; i < mainBTC.length; i++) {
                array.push(
                    {
                        name:mainBTC[i],
                        network:1
                    }
                )
            }
        }

        if (mainBSC[0] !== '') {
            for (let i = 0; i < mainBSC.length; i++) {
                array.push(
                    {
                        name:mainBSC[i],
                        network:5
                    }
                )
            }
        }

        if (mainLTC[0] !== '') {
            for (let i = 0; i < mainLTC.length; i++) {
                array.push(
                    {
                        name:mainLTC[i],
                        network:3
                    }
                )
            }
        }

        if (mainBCH[0] !== '') {
            for (let i = 0; i < mainBCH.length; i++) {
                array.push(
                    {
                        name:mainBCH[i],
                        network:2
                    }
                )
            }
        }

        if (array.length > 0) {
            axios.put(`${serverAddress}/entity/${EntityId}/`, 
            {
                addresses:array
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`, 
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    SetStep(1)
                    return toast.success('آدرس ها با موفقیت اضافه شدند.', {
                        position: 'bottom-left'
                    })
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
        } else {
            SetStep(1)
        }
    }

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
                        <Input id='name'/>
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            نام (انگلیسی)
                        </Label>
                        <Input id='Ename'/>
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            نوع
                        </Label>
                        <select class="form-select" id='type' aria-label="Default select example" 
                            onChange={ (event) => {
                                setSelectedType(event.target.value)
                            } }
                        >
                            <option value={null}>بدون اطلاعات</option>

                            {
                                Types.map((item, index) => {
                                    return (
                                        <option value={item.id}>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            مجوز
                        </Label>
                        <select class="form-select" id='licence' aria-label="Default select example" >
                            <option selected value={''}>بدون اطلاعات</option>
                            <option value="complete">دارد</option>
                            <option value="dont_have">ندارد</option>
                        </select>
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            پشتیبانی از فیات
                        </Label>
                        <select class="form-select" id='fiatSupport' aria-label="Default select example" >
                            <option selected value={''}>بدون اطلاعات</option>
                            <option value={true}>بلی</option>
                            <option value={false}>خیر</option>
                        </select>
                            
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            سکه خصوصی
                        </Label>
                        <select class="form-select" id='PrivateCoin' aria-label="Default select example" >
                            <option selected value={''}>بدون اطلاعات</option>
                            <option value={true}>بلی</option>
                            <option value={false}>خیر</option>
                        </select>
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            وبسایت
                        </Label>
                        <Input id='website'/>
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            نهاد ناظر
                        </Label>
                        <Input id='supervisor'/>
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            کشور
                        </Label>
                        <select style={{}} class="form-select" id='Roll_select_Options' aria-label="Default select example"
                            onChange={(event) => {
                                setSelectedCountry(event.target.value)
                            }}
                        >
                            <option value={''}>بدون اطلاعات</option>

                            {
                                Countries.map((item, index) => {
                                return (
                                    <option key={index} value={`${item.symbol}`}>{item.name}</option>
                                )
                                })
                            }
                        </select>
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            تاریخ تاسیس
                        </Label>
                        {
                            EstablishmentDate === '' ? 
                            <Input onClick={ () => { setEstablishmentBox(true) } } value={(EstablishmentDate)}/>
                            :
                            <Input onClick={ () => { setEstablishmentBox(true) } } value={
                                `${JalaliCalendar(EstablishmentDate).year}/${JalaliCalendar(EstablishmentDate).month}/${JalaliCalendar(EstablishmentDate).day}`
                            }/>
                        }

                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            اسم حقوقی
                        </Label>
                        <Input id='legalName'/>
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            شماره ثبت
                        </Label>
                        <Input id='registerNumber'/>
                    </Col>

                </Row>

                <Row>
                    <Col className='mt-3 mb-3'>
                        <Button color='primary' style={{height:'36px', float:'left'}} onClick={ () => { addNewEntity() } }>
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

                <Modal
                    isOpen={EstablishmentBox}
                    className='modal-dialog-centered'
                    modalClassName={'modal-danger'}
                    toggle={() => setEstablishmentBox(!EstablishmentBox)}
                    style={{maxWidth:'370px'}}
                    >
                    <ModalBody>
                        <h6>
                        انتخاب زمان تاسیس
                        </h6>
                        <CalendarProvider locale={'fa'} >
                            <Calendar
                            onChange={(date) => {
                                if (date.value !== undefined) {
                                    setEstablishmentDate(date.value)
                                } else {
                                    setEstablishmentDate(date)
                                }
                                setEstablishmentBox(false)
                            }}
                            />
                        </CalendarProvider>
                    </ModalBody>

                </Modal>

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
                        <Button color='warning' style={{height:'36px', float:'left'}} onClick={ () => { addAllAddress() } }>
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
