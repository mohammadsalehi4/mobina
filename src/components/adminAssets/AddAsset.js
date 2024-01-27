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
const AddAsset = () => {
    const [loading, SetLoading] = useState(false)
    
  const addNewAsset = () => {
    const symbol = document.getElementById('symbol').value
    const name = document.getElementById('AssetName').value
    const decimal_number = document.getElementById('decimal_number').value
    const contract_address = document.getElementById('contract_address').value
    const network = document.getElementById('network').value
    console.log(
        {
            symbol,
            name,
            decimal_number,
            contract_address,
            network
        }
    )
    SetLoading(true)
    axios.post(`${serverAddress}/explorer/assets/`, {
        symbol,
        name,
        decimal_number,
        contract_address,
        network
    },
    {
        headers: {
            Authorization: `Bearer ${Cookies.get('access')}`, 
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        SetLoading(false)
        console.log(response)
        if (response.status === 201) {
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
                    عنوان
                </Label>
                <Input id='AssetName'/>
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
