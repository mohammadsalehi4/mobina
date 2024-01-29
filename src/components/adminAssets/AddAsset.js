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

const AddAsset = () => {
    const [loading, SetLoading] = useState(false)
    const States = useSelector(state => state)
    const dispatch = useDispatch()

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
                <Input id='symbol'/>
            </Col>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    نام انگلیسی
                </Label>
                <Input id='AssetName'/>
            </Col>

            <Col xl='4' lg='6' className='mt-3'>
                <Label>
                    نام فارسی
                </Label>
                <Input id='PAssetName'/>
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
                <Input id='contract_address'/>
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
                <Input id='AssetsColor'/>
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
    </div>
  )
}

export default AddAsset
