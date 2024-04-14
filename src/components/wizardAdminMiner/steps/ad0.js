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
import { Label, Row, Col, Input, Button, Card } from 'reactstrap'
import { serverAddress } from '../../../address'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoadingButton from '../../loadinButton/LoadingButton'
import { useParams } from "react-router-dom"
import DataTable from 'react-data-table-component'
import LocalLoading from '../../localLoading/localLoading'
import CardAction from '@components/card-actions'

const St0 = ({ stepper, type }) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const { minerid } = useParams()

  
  const [Loading, SetLoading] = useState(false)
  const [UserLoading, SetUserLoading] = useState(false)
  const [AddUserBox, SetAddUserBox] = useState(false)
  const [users, SetUsers] = useState([])

  useEffect(() => {
    if (minerid !== undefined || typeof (minerid) === 'string') {
      if (stepper !== null) {
        stepper.next()
      }
    }
  }, [stepper])

  //get users
  useEffect(() => {
    SetUserLoading(true)
    axios.get(`${serverAddress}/accounts/users`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      console.log('users')
      console.log(response)
      const getUsers = []
      for (let i = 0; i < response.data.results.length; i++) {
        if (response.data.results[i].role === 5) {
          getUsers.push(response.data.results[i])
        }
      }
      SetUsers(getUsers)
      SetUserLoading(false)
    })
    .catch((err) => {
      SetUserLoading(false)
      console.log(err)
    })
  }, [])

  const basicColumns = [
    {
      name: 'نام',
      sortable: true,
      maxWidth: '90px',
      minWidth: '90px',
      selector: row => row.first_name
    },
    {
        name: 'نام خانوادگی',
        sortable: true,
        maxWidth: '170px',
        minWidth: '170px',
        selector: row => row.last_name
    },
    {
      name: 'نام کاربری',
      sortable: true,
      maxWidth: '150px',
      minWidth: '150px',
      selector: row => row.username
    },
    {
        name: 'ایمیل',
        sortable: true,
        minWidth: '270px',
        maxWidth: '270px',
        selector: row => row.email
    },
    {
        name: 'شماره تلفن',
        sortable: true,
        minWidth: '160px',
        maxWidth: '160px',
        selector: row => row.phone_number
    }
  ]

  const newUser = () => {
    const username = document.getElementById('username').value
    const first_name = document.getElementById('name').value
    const last_name = document.getElementById('Lname').value
    const email = document.getElementById('email').value
    const phone_number = document.getElementById('number').value
    SetLoading(true)
    axios.post(`${serverAddress}/accounts/register/`, 
    {
      username,
      first_name,
      last_name,
      email,
      phone_number,
      role:"5"
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      SetLoading(false)

      if (response.status === 201) {
        dispatch({type:"userMinerId", value:response.data.id})
        dispatch({type:"userMinerEmail", value:email})
        dispatch({type:"userMinerinterface_fname", value:first_name})
        dispatch({type:"userMinerinterface_lname", value:last_name})
        dispatch({type:"userMinerinterface_phone_number", value:phone_number})
        stepper.next()
      }
    })
    .catch((err) => {
      SetLoading(false)

      if (err.response.data.error.fields.phone_number[0] === 'user with this phone number already exists.') {
        return toast.error('کاربری با این شماره موبایل وجود دارد.', {
          position: 'bottom-left'
        })
      } else if (err.response.data.error.fields.phone_number !== undefined) {
        return toast.error('شماره موبایل را به درستی وارد کنید', {
          position: 'bottom-left'
        })
      } else if (err.response.data.error.fields.email !== undefined) {
        return toast.error('ایمیل را به درستی وارد کنید', {
          position: 'bottom-left'
        })
      } else if (err.response.data.error.fields.username !== undefined) {
        return toast.error('نام کاربری وارد شده تکراری است', {
          position: 'bottom-left'
        })
      } else {
        return toast.error('ناموفق در پردازش', {
          position: 'bottom-left'
        })
      }
    })
  }

  return (
    <Fragment>
      <h6>
        لیست کاربران استخراج کننده
      </h6>
      {
        UserLoading ?
          <LocalLoading/>
        :
        <div id='adminMinerTable'>
          <DataTable
            noHeader
            data={users}
            columns={basicColumns}
            className='react-dataTable'
            onRowClicked={(row) => {
              dispatch({type:"userMinerId", value:row.id})
              dispatch({type:"userMinerEmail", value:row.email})
              dispatch({type:"userMinerinterface_fname", value:row.first_name})
              dispatch({type:"userMinerinterface_lname", value:row.last_name})
              dispatch({type:"userMinerinterface_phone_number", value:row.phone_number})
              stepper.next()
            }}
          />
        </div>

      }
        <Button color='primary' className='mt-3' onClick={ () => { SetAddUserBox(true) }}>افزودن کاربر جدید</Button>
          <Card style={{
            display:AddUserBox ? 'block' : 'none'
          }}>
            <Row className="p-4 mt-3">
              <Col xl={4} md={6} className='mt-3'>
                  <Label>نام کاربری</Label>
                  <Input type='text' id='username'/>
              </Col>
              <Col xl={4} md={6} className='mt-3'>
                  <Label>نام رابط</Label>
                  <Input type='text' id='name'/>
              </Col>
              <Col xl={4} md={6} className='mt-3'>
                  <Label>نام خانوادگی رابط</Label>
                  <Input type='text' id='Lname'/>
              </Col>
              <Col xl={4} md={6} className='mt-3'>
                  <Label>شماره همراه</Label>
                  <Input type='text' id='number'/>
              </Col>
              <Col xl={4} md={6} className='mt-3'>
                  <Label>ایمیل</Label>
                  <Input type='text' id='email'/>
              </Col>
            </Row>
            <Row className='mt-3 p-4'>
              <Col>
                <Button color='primary' onClick={newUser} style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px", height:'40px'}} className='btn-next'>
                {
                    Loading ? 
                      <LoadingButton/>
                    :
                      <span>
                        ثبت کاربر جدید
                      </span>
                  }
                </Button>
              </Col>
            </Row>
          </Card>

    </Fragment>
  )
}

export default St0
