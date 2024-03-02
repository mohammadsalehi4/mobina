/* eslint-disable object-shorthand */
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
import { selectThemeColors } from '@utils'

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
    const [CountryOptions, SetCountryOptions] = useState([])
    const [selectedCoutries, SetselectedCoutries] = useState([])
    const [selectedCurrencies, SetselectedCurrencies] = useState([])

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
        let error  = false

        if (EstablishmentDate !== '') {
            getTime = `${JalaliCalendar(EstablishmentDate).year}-${JalaliCalendar(EstablishmentDate).month}-${JalaliCalendar(EstablishmentDate).day}`
        } else {
            getTime = null
            error = true
        }
        let country = SelectedCountry


        if (name === '') {
            name = null
            error = true

        }
        if (Ename === '') {
            Ename = null
            error = true

        }
        if (website === '') {
            website = null
            error = true
        }
        if (supervisor === '') {
            supervisor = null
            error = true
        }
        if (legalName === '') {
            legalName = null
            error = true
        }
        if (licence === '') {
            licence = null
        }
        if (registerNumber === '') {
            registerNumber = null
            error = true
        }

        const countryList = []

        const currencyList = []

        for (let i = 0; i < selectedCoutries.length; i++) {
            countryList.push(
                selectedCoutries[i].value
            )
        }

        for (let i = 0; i < selectedCurrencies.length; i++) {
            currencyList.push(
                selectedCurrencies[i].value
            )
        }

        if (currencyList.length === 0) {
            error = true
        }
        if (countryList.length === 0) {
            error = true
        }

        if (error) {
            return toast.error('وارد کردن تمامی موارد الزامی است.', {
                position: 'bottom-left'
            })
        } else {
            SetLoading(true)
            console.log('result')

            const sendingData = {}

            if (Ename !== null) {
                sendingData.name = Ename
            }
            if (name !== null) {
                sendingData.persian_name = name
            }
            if (website !== null) {
                sendingData.web_site = website
            }
            if (type !== null) {
                sendingData.type = type
            }
            if (getTime !== null) {
                sendingData.establishment = getTime
            }
            if (fiatSupport !== null) {
                sendingData.fiat_support = fiatSupport
            }
            if (PrivateCoin !== null) {
                sendingData.private_coin = PrivateCoin
            }
            if (supervisor !== null) {
                sendingData.supervisory_body = supervisor
            }
            if (legalName !== null) {
                sendingData.legal_name = legalName
            }
            if (registerNumber !== null) {
                sendingData.registration_number = registerNumber
            }
            if (licence !== null) {
                sendingData.licence = licence
            }
            if (document.getElementById('sanctionList').value !== '') {
                sendingData.is_in_sanction_list = document.getElementById('sanctionList').value
            }
            if (countryList.length !== 0) {
                sendingData.countries = countryList
            }
            if (currencyList.length !== 0) {
                sendingData.currency = currencyList
            }
            console.log('sendingData')
            console.log(sendingData)

            axios.post(`${serverAddress}/entity/`, 
            sendingData,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`, 
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response)
                SetLoading(false)
                if (response.status >= 200 && response.status < 300) {
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
                    if (err.response.data.error.fields.web_site !== undefined) {
                        return toast.error('آدرس سایت را به درستی وارد کنید.', {
                            position: 'bottom-left'
                        })
                    } else if (err.response.data.error.fields.name !== undefined) {
                        return toast.error('نام انگلیسی را به درستی وارد کنید.', {
                            position: 'bottom-left'
                        })
                    }

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
            console.log('countries')
            console.log(response)
          if (response.status === 200) {
            const getC = []
            for (let i = 0; i < response.data.results.length; i++) {
                getC.push({
                    symbol:response.data.results[i].id,
                    name:response.data.results[i].name,
                    label:response.data.results[i].persian_name,
                    value:response.data.results[i].id,
                    color: '#FF5630', 
                    isFixed: false
                })
            }
            SetCountryOptions(getC)
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

        const TRXAddress = document.getElementById('TRX').value
        const mainTRX = TRXAddress.split('\n')

        const MATICAddress = document.getElementById('MATIC').value
        const mainMATIC = MATICAddress.split('\n')

        const ETCAddress = document.getElementById('ETC').value
        const mainETC = ETCAddress.split('\n')

        const XRPAddress = document.getElementById('XRP').value
        const mainXRP = XRPAddress.split('\n')

        const XLMAddress = document.getElementById('XLM').value
        const mainXLM = XLMAddress.split('\n')

        const ADAAddress = document.getElementById('ADA').value
        const mainADA = ADAAddress.split('\n')

        const XRDAddress = document.getElementById('XRD').value
        const mainXRD = XRDAddress.split('\n')

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

        if (mainTRX[0] !== '') {
            for (let i = 0; i < mainTRX.length; i++) {
                array.push(
                    {
                        name:mainTRX[i],
                        network:10
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

        if (mainMATIC[0] !== '') {
            for (let i = 0; i < mainMATIC.length; i++) {
                array.push(
                    {
                        name:mainMATIC[i],
                        network:6
                    }
                )
            }
        }

        if (mainETC[0] !== '') {
            for (let i = 0; i < mainETC.length; i++) {
                array.push(
                    {
                        name:mainETC[i],
                        network:8
                    }
                )
            }
        }

        if (mainXRP[0] !== '') {
            for (let i = 0; i < mainXRP.length; i++) {
                array.push(
                    {
                        name:mainXRP[i],
                        network:9
                    }
                )
            }
        }

        if (mainXLM[0] !== '') {
            for (let i = 0; i < mainXLM.length; i++) {
                array.push(
                    {
                        name:mainXLM[i],
                        network:11
                    }
                )
            }
        }

        if (mainADA[0] !== '') {
            for (let i = 0; i < mainADA.length; i++) {
                array.push(
                    {
                        name:mainADA[i],
                        network:12
                    }
                )
            }
        }

        if (mainXRD[0] !== '') {
            for (let i = 0; i < mainXRD.length; i++) {
                array.push(
                    {
                        name:mainXRD[i],
                        network:13
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

    const currencyOptions = [
        { value: 1, label: 'بیت‌کوین', color: '#00B8D9', isFixed: true },
        { value: 4, label: 'اتریوم', color: '#0052CC', isFixed: true },
        { value: 5, label: 'بایننس‌اسمارت‌چین', color: '#5243AA', isFixed: true },
        { value: 3, label: 'لایت‌کوین', color: '#FF5630', isFixed: false },
        { value: 2, label: 'بیت‌کوین‌کش', color: '#FF5630', isFixed: false },
        { value: 6, label: 'پالیگان', color: '#FF5630', isFixed: false },
        { value: 8, label: "اتریوم کلاسیک", color: '#FF5630', isFixed: false },
        { value: 9, label: "اکس آر پی", color: '#FF5630', isFixed: false },
        { value: 11, label: "استلار", color: '#FF5630', isFixed: false },
        { value: 12, label: "کاردانو", color: '#FF5630', isFixed: false },
        { value: 13, label: "رادیکس", color: '#FF5630', isFixed: false },
        { value: 10, label: 'ترون', color: '#FF5630', isFixed: false }
    ]

    const countryChange = (e) => {
    SetselectedCoutries(e)
    }

    const CurrencyChange = (e) => {
    SetselectedCurrencies(e)
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
                            لیست کشورها
                        </Label>
                        <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            closeMenuOnSelect={false}
                            // components={animatedComponents}
                            isMulti
                            options={CountryOptions}
                            className='react-select'
                            classNamePrefix='select'
                            onChange={countryChange}
                        />
                    </Col>

                    <Col xl='4' lg='6' className='mt-3'>
                        <Label>
                            لیست ارزها
                        </Label>
                        <Select
                            isClearable={false}
                            theme={selectThemeColors}
                            closeMenuOnSelect={false}
                            // components={animatedComponents}
                            isMulti
                            options={currencyOptions}
                            className='react-select'
                            classNamePrefix='select'
                            onChange={CurrencyChange}

                        />
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
                            جزو تحریم شده‌ها
                        </Label>
                        <select class="form-select" id='sanctionList' aria-label="Default select example" >
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

                    {/* <Col xl='4' lg='6' className='mt-3'>
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
                    </Col> */}

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
                    <Col xl='12' className='mt-3'>
                        <Label>
                            TRX-ترون
                        </Label>
                        <Input id='TRX' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                        MATIC-پالیگان
                        </Label>
                        <Input id='MATIC' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                        ETC-اتریوم کلاسیک
                        </Label>
                        <Input id='ETC' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                        XRP-اکس آر پی
                        </Label>
                        <Input id='XRP' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                        XLM-استلار
                        </Label>
                        <Input id='XLM' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                        ADA-کاردانو
                        </Label>
                        <Input id='ADA' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                        XRD-رادیکس
                        </Label>
                        <Input id='XRD' type='textarea' />
                    </Col>
                    <Col xl='12' className='mt-3 mb-3'>
                        <Button color='primary' style={{height:'36px', float:'left'}} onClick={ () => { addAllAddress() } }>
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
