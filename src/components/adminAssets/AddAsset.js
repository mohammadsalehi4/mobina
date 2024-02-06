/* eslint-disable prefer-const */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-duplicate-imports */
import React, {useState, useEffect} from 'react'
import {
    Col,
    Row,
    Input,
    Label,
    Button
} from 'reactstrap'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../address'
import { Card, CardHeader, CardBody, Modal, ModalBody, ModalFooter } from 'reactstrap'
import toast from 'react-hot-toast'
import LoadingButton from '../loadinButton/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, CalendarProvider } from "zaman"
import { JalaliCalendar } from '../../processors/jalaliCalendar'
const AddAsset = () => {
    const [loading, SetLoading] = useState(false)
    const States = useSelector(state => state)
    const dispatch = useDispatch()

    const [EstablishmentDate, setEstablishmentDate] = useState('')
    const [launchDateBox, SetLaunchDateBox] = useState(false)

  const addNewAsset = () => {
    let symbol = document.getElementById('symbol').value
    let name = document.getElementById('AssetName').value
    let persian_name = document.getElementById('PAssetName').value
    let decimal_number = document.getElementById('decimal_number').value
    let contract_address = document.getElementById('contract_address').value
    let network = document.getElementById('network').value
    let color = document.getElementById('AssetsColor').value

    let check = false
    if (name === '') { check = true }
    if (persian_name === '') { check = true }
    if (symbol === '') { check = true }
    if (network === '') { check = true }
    if (decimal_number === '') { check = true }
    if (contract_address === '') { check = true }
    if (EstablishmentDate === '') { check = true }
    if (color === '') { color = null }

    const bodyFormData = new FormData()
    if (document.getElementById('AddAssetPicture').files.length > 0) {
        const getImage = document.getElementById('AddAssetPicture').files[0]
        bodyFormData.append('image', getImage)
    } else {
        check = true
    }

    bodyFormData.append('name', name)
    bodyFormData.append('persian_name', persian_name)
    bodyFormData.append('symbol', symbol)
    bodyFormData.append('network', network)
    bodyFormData.append('color', color)
    bodyFormData.append('decimal_number', decimal_number)
    bodyFormData.append('contract_address', contract_address)
    bodyFormData.append('launch_date', EstablishmentDate !== '' ? `${JalaliCalendar(EstablishmentDate).year}-${JalaliCalendar(EstablishmentDate).month}-${JalaliCalendar(EstablishmentDate).day}` : null)

    if (!check) {
        SetLoading(true)
        axios.post(`${serverAddress}/explorer/assets/`, 
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
            console.log(response)
            if (response.status === 201) {
                dispatch({type:"AssetPage", value:!(States.AssetPage)})
                dispatch({type:"AssetsBeload", value:!(States.AssetsBeload)})
                return toast.success('دارایی با موفقیت ساخته شد', {
                    position: 'bottom-left'
                  })
            }
        })
        .catch((err) => {
            SetLoading(false)
            console.log(err)
            return toast.error('خطا در ساخت دارایی', {
                position: 'bottom-left'
              })
        })
    } else {
        return toast.error('مقادیر را به طور کامل وارد کنید.', {
            position: 'bottom-left'
          })
    }

  }

  const [AssetNameText, SetAssetNameText] = useState('')
  const AssetNameTextValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[A-Za-z0-9]*$/
    if (persianRegex.test(value) || value === '') {
      SetAssetNameText(value)
    }
  }

  const [PAssetNameText, SetPAssetNameText] = useState('')
  const PAssetNameTextValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[\u0600-\u06FF\s0-9]+$/
    if (persianRegex.test(value) || value === '') {
      SetPAssetNameText(value)
    }
  }

  const [contract_addressText, Setcontract_addressText] = useState('')
  const contract_addressTextValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[A-Za-z0-9]+$/
    if (persianRegex.test(value) || value === '') {
      Setcontract_addressText(value)
    }
  }

  const [AssetsColorText, SetAssetsColorText] = useState('')
  const AssetsColorTextValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[A-Za-z1-9#]+$/
    if (persianRegex.test(value) || value === '') {
      SetAssetsColorText(value)
    }
  }
  const [SymbolText, SetSymbolText] = useState('')
  const SymbolTextValidator = (e) => {
    const value = e.target.value
    const persianRegex = /^[A-Za-z\s]+$/
    if (persianRegex.test(value) || value === '') {
      SetSymbolText(value)
    }
  }

  return (
    <div className='container-fluid' style={{borderStyle:'solid', borderWidth:'1px', borderRadius:'8px', borderColor:"rgb(210,210,210)"}}>
        <Row>
            <Col className='mt-3'>
                <h5>
                    دارایی جدید
                </h5>
            </Col>
        </Row>
        <Row>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    نماد
                </Label>
                <Input id='symbol' value={SymbolText} onChange={SymbolTextValidator}/>
            </Col>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    نام انگلیسی
                </Label>
                <Input id='AssetName' value={AssetNameText} onChange={AssetNameTextValidator}/>
            </Col>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    نام فارسی
                </Label>
                <Input id='PAssetName' value={PAssetNameText} onChange={PAssetNameTextValidator}/>
            </Col>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    دسیمال
                </Label>
                <Input id='decimal_number' type='number'/>
            </Col>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    آدرس قرارداد
                </Label>
                <Input id='contract_address' value={contract_addressText} onChange={contract_addressTextValidator}/>
            </Col>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                   شبکه
                </Label>
                <select class="form-select" id='network' aria-label="Default select example" >
                    <option selected value={1}>بیت‌کوین</option>
                    <option value={4}>اتریوم</option>
                    <option value={5}>بایننس‌اسمارت‌چین</option>
                    <option value={3}>لایت‌کوین</option>
                    <option value={2}>بیت‌کوین‌کش</option>
                </select>
            </Col>


            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    تصویر
                </Label>
                <Input id='AddAssetPicture' type='file'/>
            </Col>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    رنگ
                </Label>
                <Input id='AssetsColor' value={AssetsColorText} onChange={AssetsColorTextValidator}/>
            </Col>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    تاریخ ایجاد
                </Label>
                <Input id='launch_date' onClick={ () => { SetLaunchDateBox(true) }} 
                    value=
                    {
                        EstablishmentDate !== '' ? `${JalaliCalendar(EstablishmentDate).year}/${JalaliCalendar(EstablishmentDate).month}/${JalaliCalendar(EstablishmentDate).day}` : ''
                    }
                />
            </Col>
        </Row>

        <Row>
            <Col className='mt-3 mb-3'>
                <Button color='primary' style={{height:'36px', float:'left'}} onClick={ () => { addNewAsset() } }>
                    {
                        !loading ? 
                        <span>
                            ثبت
                        </span>
                        :
                        <LoadingButton/>
                    }
                </Button>
            </Col>
        </Row>

        <Modal
            isOpen={launchDateBox}
            className='modal-dialog-centered'
            modalClassName={'modal-danger'}
            toggle={() => SetLaunchDateBox(!launchDateBox)}
            style={{maxWidth:'370px'}}
            >
            <ModalBody>
                <h6>
                انتخاب زمان ایجاد
                </h6>
                <CalendarProvider locale={'fa'} >
                    <Calendar
                    onChange={(date) => {
                        if (date.value !== undefined) {
                            setEstablishmentDate(date.value)
                        } else {
                            setEstablishmentDate(date)
                        }
                        SetLaunchDateBox(false)
                    }}
                    />
                </CalendarProvider>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default AddAsset
