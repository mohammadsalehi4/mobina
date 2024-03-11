/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-duplicate-imports */
// ** React Imports
import { Fragment, useEffect, useState } from 'react'
// ** Icons Imports
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import { Card, CardHeader, CardBody, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Calendar, CalendarProvider } from "zaman"
import { JalaliCalendar } from '../../../processors/jalaliCalendar'
import { MiladiCalendar } from '../../../processors/MiladiCalendar'
import { serverAddress } from '../../../address'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoadingButton from '../../loadinButton/LoadingButton'
import { useParams } from "react-router-dom"

const St1 = ({ stepper, type }) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const { minerid } = useParams()

  const [getImage, SetImage] = useState(null)
  const [Loading, SetLoading] = useState(false)
  const [DatePickerBox, SetDatePickerBox] = useState(false)
  const [DatePickedText, SetDatePickedText] = useState('')
  const [DatePicked, SetDatePicked] = useState('')

  const [legal_nameText, Setlegal_nameText] = useState('')

  const submit = () => {
    //شماره پروانه بهره برداری
    const operating_license_number = document.getElementById('operating_license_number').value
    //شماره مجوز
    const license_number = document.getElementById('license_number').value
    //شماره ثبت شرکت
    const company_registration_number = document.getElementById('company_registration_number').value
    //نام رابط
    const interface_fname = States.userMinerinterface_fname
    //نام خانوادگی رابط
    const interface_lname = States.userMinerinterface_lname
     //شماره همراه رابط
    const interface_phone_number = States.userMinerinterface_phone_number
    //ایمیل
    const email = States.userMinerEmail
    //کد ملی
    const national_code = document.getElementById('national_code').value
    //تامین برق
    const electricity_supply = document.getElementById('electricity_supply').value
    //شماره انشعاب برق
    const electricity_branch_number = document.getElementById('electricity_branch_number').value
    //نام کسب و کار
    const company_persina_name = document.getElementById('company_persina_name').value
    //نام برند
    const name_brancd_persian = legal_nameText
    // نام انگلیسی برند
    const name_brand = document.getElementById('name_brand').value
    //نام انگلیسی کسب و کار
    const company_name = document.getElementById('company_name').value
    //وبسایت
    const website = document.getElementById('website').value
    //تاریخ تاسیس
    const establishment = DatePicked
    //آدرس پستی
    const postal_address = document.getElementById('postal_address').value
    //کد پستی
    const postal_code = document.getElementById('postal_code').value
    //آدرس ها
    const reward_address = document.getElementById('reward_address').value
    
    let check = true

    if (reward_address === '') { check = false, console.log('reward_address') }
    if (operating_license_number === '') { check = false, console.log('operating_license_number') }
    if (license_number === '') { check = false, console.log('license_number') }
    if (company_registration_number === '') { check = false, console.log('company_registration_number') }
    if (interface_fname === '') { check = false, console.log('interface_fname') }
    if (interface_lname === '') { check = false, console.log('interface_lname') }
    if (interface_phone_number === '') { check = false, console.log('interface_phone_number') }
    if (email === '') { check = false, console.log('email') }
    if (national_code === '') { check = false, console.log('national_code') }
    if (electricity_supply === '') { check = false, console.log('electricity_supply') }
    if (name_brand === '') { check = false, console.log('name_brand') }
    if (name_brancd_persian === '') { check = false, console.log('name_brancd_persian') }
    if (company_name === '') { check = false, console.log('company_name') }
    if (website === '') { check = false, console.log('website') }
    if (establishment === '') { check = false, console.log('establishment') }
    if (postal_address === '') { check = false, console.log('postal_address') }
    if (getImage === '' || getImage === null) { check = false }

    let extra_fields = {
      company_registration_number,
      name_brand,
      name_brancd_persian,
      establishment,
      company_name,
      company_persina_name,
      website
    }

    extra_fields = JSON.stringify(extra_fields)

    const lines = reward_address.split('\n')
    const GetAddresses = []

    for (let i = 0; i < lines.length; i++) {
      GetAddresses.push(
        {
          hash:lines[i]
        }
      )
    }

    const addresses = JSON.stringify(GetAddresses)

    console.log(lines)
    if (!check) {
        
      return toast.error('تکمیل تمامی موارد به جز شماره انشعاب، الزامی است!', {
        position: 'bottom-left'
      })
    } else {
      const bodyFormData = new FormData()
      bodyFormData.append('operating_license_number', operating_license_number)
      bodyFormData.append('license_number', license_number)
      bodyFormData.append('interface_fname', interface_fname)
      bodyFormData.append('interface_lname', interface_lname)
      bodyFormData.append('interface_phone_number', interface_phone_number)
      bodyFormData.append('email', email)
      bodyFormData.append('national_code', national_code)
      bodyFormData.append('electricity_supply', electricity_supply)
      bodyFormData.append('electricity_branch_number', electricity_branch_number)
      bodyFormData.append('postal_address', postal_address)
      bodyFormData.append('postal_code', postal_code)
      bodyFormData.append('extra_fields', extra_fields)
      bodyFormData.append('addresses', addresses)
      bodyFormData.append('logo', getImage)
      bodyFormData.append('user', States.userMinerId)

      SetLoading(true)

      axios.post(`${serverAddress}/miners/operation/`, 
          bodyFormData
      ,
      {
          headers: {
              Authorization: `Bearer ${Cookies.get('access')}`, 
              'Content-Type': 'multipart/form-data'
          }
      })
      .then((response) => {
      SetLoading(false)
          if (response.status === 201) {
            dispatch({type:"miningMode", value:1})
            console.log({
              response:response.data,
              addresses:GetAddresses
            })

            dispatch({type:"miningData", 
            value:
              {
                response:response.data,
                addresses:GetAddresses
              }
            })
            stepper.next()
            return toast.success('اطلاعات مورد نظر با موفقیت ثبت شد.', {
              position: 'bottom-left'
            })
          }
      })
      .catch((err) => {
          SetLoading(false)
          console.log(err)
          if (err.response.data.error.fields.email !== undefined) {
            toast.error('ایمیل خود را به درستی وارد کنید', {
                position: 'bottom-left'
            })
          } else if (err.response.data.error.fields.national_code !== undefined) {
            toast.error('کد ملی خود را به درستی وارد کنید', {
              position: 'bottom-left'
            })
          } else if (err.response.data.error.fields.interface_phone_number !== undefined) {
            toast.error('شماره موبایل خود را به درستی وارد کنید', {
              position: 'bottom-left'
            })
          } else {
            return toast.error('خطا در ساخت استخراج کننده', {
                position: 'bottom-left'
            })
          }
      })
    }
  }
  
  const [operating_license_numberText, Setoperating_license_numberText] = useState('')
  const operating_license_numberValidator = (e) => {
    if (/^[A-Za-z0-9]*$/.test(e.target.value)) {
      Setoperating_license_numberText(e.target.value)
    }
  }

  const [interface_fnameText, Setinterface_fnameText] = useState('')
  const interface_fnameValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[\u0600-\u06FF\s]+$/
    if (persianRegex.test(value) || value === '') {
      Setinterface_fnameText(value)
    }
  }

  const [interface_lnameText, Setinterface_lnameText] = useState('')
  const interface_lnameValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[\u0600-\u06FF\s]+$/
    if (persianRegex.test(value) || value === '') {
      Setinterface_lnameText(value)
    }
  }

  const [interface_phone_numberText, Setinterface_phone_numberText] = useState('')
  const interface_phone_numberValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[0-9]*$/
    if (persianRegex.test(value) || value === '') {
      Setinterface_phone_numberText(value)
    }
  }

  const [national_codeText, Setnational_codeText] = useState('')
  const national_codeValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[0-9]*$/
    if (persianRegex.test(value) || value === '') {
      Setnational_codeText(value)
    }
  }

  const legal_nameValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[\u0600-\u06FF\s]+$/
    if (persianRegex.test(value) || value === '') {
      Setlegal_nameText(value)
    }
  }

  const [Englishlegal_nameText, SetEnglishlegal_nameText] = useState('')
  const Englishlegal_nameValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[A-Za-z]*$/
    if (persianRegex.test(value) || value === '') {
      SetEnglishlegal_nameText(value)
    }
  }

  const [company_nameText, Setcompany_nameText] = useState('')
  const company_nameValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[A-Za-z]*$/
    if (persianRegex.test(value) || value === '') {
      Setcompany_nameText(value)
    }
  }

  const imageHandler = (e) => {
    SetImage(e.target.files[0])
  }

  useEffect(() => {
    dispatch({type:"miningMode", value:0})
  }, [])

  useEffect(() => {
    if (minerid !== undefined || typeof (minerid) === 'string') {
      if (stepper !== null) {
        stepper.next()
      }
    }
  }, [stepper])

  return (
    <Fragment>
      <Row>
        <Col xl={4} md={6} className='mt-3'>
          <Label>لوگو</Label>
          <Input type='file' id='logo' onChange={ (e) => { imageHandler(e) } }/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>شماره پروانه بهره‌برداری</Label>
          <Input type='text' pattern="[A-Za-z0-9]*" id='operating_license_number' value={operating_license_numberText}  onChange={(e) => { operating_license_numberValidator(e) }}/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>شماره مجوز </Label>
          <Input type='text' id='license_number'/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>شماره ثبت شرکت </Label>
          <Input type='number' id='company_registration_number'/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>کد ملی</Label>
          <Input type='text' id='national_code' onChange={national_codeValidator} value={national_codeText}/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>تامین برق</Label>
          <select class="form-select" id='electricity_supply' aria-label="Default select example">
            <option value="nationalـpowerـgrid">شبکه برق سراسری</option>
            <option value="green_power_plant_inside">نیروگاه برق سبز داخل</option>
            <option selected  value="fossil_fuel_power_plant">نیروگاه سوخت فسیلی</option>
          </select>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>  شماره انشعاب برق</Label>
          <Input type='text' id='electricity_branch_number'/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label> نام کسب و کار </Label>
          <Input type='text' id='company_persina_name'/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label> نام برند (فارسی) </Label>
          <Input type='text' id='name_brancd_persian ' onChange={legal_nameValidator} value={legal_nameText}/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label> نام برند (انگلیسی) </Label>
          <Input type='text' id='name_brand' onChange={Englishlegal_nameValidator} value={Englishlegal_nameText}/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label> نام انگلیسی کسب‌وکار </Label>
          <Input type='text' id='company_name' onChange={company_nameValidator} value={company_nameText}/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>وبسایت</Label>
          <Input type='text' id='website'/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>تاریخ تاسیس</Label>
          <Input type='text' id='establishment' value={(DatePickedText)} onClick={ () => { SetDatePickerBox(true) }}/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>آدرس پستی</Label>
          <Input type='text' id='postal_address'/>
        </Col>
        <Col xl={4} md={6} className='mt-3'>
          <Label>کد پستی</Label>
          <Input type='number' id='postal_code'/>
        </Col>
        <Col xl={12} className='mt-3'>
          <Label>آدرس های پاداش</Label>
          <Input type='textarea' id='reward_address'/>
        </Col>

      </Row>
      <Row className='mt-3'>
        <Col>
          <button onClick={submit} style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px", height:'40px'}} className='btn-next'>
          {
              Loading ? 
                <LoadingButton/>
              :
                <span>
                  ثبت
                </span>
            }
          </button>
        </Col>
      </Row>

      <Modal
          isOpen={DatePickerBox}
          className='modal-dialog-centered'
          modalClassName={'modal-danger'}
          toggle={() => SetDatePickerBox(!DatePickerBox)}
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
                          SetDatePickedText(`${JalaliCalendar(date.value).year}-${JalaliCalendar(date.value).month}-${JalaliCalendar(date.value).day}`)
                          SetDatePicked(`${MiladiCalendar(date.value).year}-${MiladiCalendar(date.value).month}-${MiladiCalendar(date.value).day}`)
                      } else {
                          SetDatePickedText(`${JalaliCalendar(date).year}-${JalaliCalendar(date).month}-${JalaliCalendar(date).day}`)
                          SetDatePicked(`${MiladiCalendar(date).year}-${MiladiCalendar(date).month}-${MiladiCalendar(date).day}`)
                      }
                      SetDatePickerBox(false)
                  }}
                  />
              </CalendarProvider>
          </ModalBody>

      </Modal>
    </Fragment>
  )
}

export default St1
