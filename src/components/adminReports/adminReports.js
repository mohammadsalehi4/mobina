/* eslint-disable no-duplicate-imports */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, UncontrolledTooltip, Row, Col, Label } from 'reactstrap'
import {Modal, ModalBody, ModalFooter, Input, Button}  from 'reactstrap'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import LocalLoading from '../localLoading/localLoading'
import { MainSiteOrange } from '../../../public/colors'
import LoadingButton from '../loadinButton/LoadingButton'
import toast from 'react-hot-toast'

const AdminReports = () => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const [image, setImage] = useState()
  const [data, SetData] = useState([])
  const [AddNewReportBox, SetAddNewReportBox] = useState(false)
  const [Loading, SetLoading] = useState(false)
  const [Rolls, SetRolls] = useState([])
  const [DeleteSelectedReport, SetDeleteSelectedReport] = useState(0)
  const [DeleteBox, SetDeleteBox] = useState(false)
  const [EditSelectedReport, SetEditSelectedReport] = useState(0)
  const [EditBox, SetEditBox] = useState(false)

  const imageHandler = (event) => {
    setImage(event.target.files[0])
  }

  const addNewReports = () => {
    
    const title = document.getElementById('reportTitle').value
    const summary = document.getElementById('summary').value
    const Content = document.getElementById('Content').value
    const checked = document.getElementById('ShareReport').checked

    let publication_status

    if (checked) {
      publication_status = 'انتشار یافته'
    } else {
      publication_status = 'پیش نویس'
    }

    const bodyFormData = new FormData()

    bodyFormData.append('title', title)
    bodyFormData.append('summary', summary)
    bodyFormData.append('text', Content)
    bodyFormData.append('author_fname', `${Cookies.get('name')}`)
    bodyFormData.append('author_lname', `${Cookies.get('lastname')}`)
    bodyFormData.append('author', `${Cookies.get('name')} ${Cookies.get('lastname')}`)
    bodyFormData.append('image', image)
    bodyFormData.append('publication_status', publication_status)
    for (let i = 0; i < Rolls.length; i++) {
      if (document.getElementById(`RollText${Rolls[i].id}`).checked) {
        bodyFormData.append('accesses', Rolls[i].id)
      }
    }

    axios.post(`${serverAddress}/reports/create/`, 
    bodyFormData,
    {
        headers: {
            Authorization: `Bearer ${Cookies.get('access')}`, 
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const columns = [
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>وضعیت</p>,
      minWidth: '80px',
      maxWidth: '80px',
      cell: row => {
        if (row.status === "انتشار یافته") {
          return (
            <>
              <ion-icon id={`reportStatus${row.id}`} style={{fontSize:'24px', color:'green'}} name="checkmark-outline"></ion-icon>
              <UncontrolledTooltip placement='top' target={`reportStatus${row.id}`}>
                منتشر شده
              </UncontrolledTooltip>
            </>
          )
        } else {
          return (
            <>
              <ion-icon id={`reportStatus${row.id}`} style={{fontSize:'24px', color:'orange'}} name="arrow-undo-outline"></ion-icon>
              <UncontrolledTooltip placement='top' target={`reportStatus${row.id}`}>
                پیش نویس
              </UncontrolledTooltip>
            </>
          )
        }
      }
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تاریخ انتشار</p>,
      minWidth: '250px',
      maxWidth: '250px',
      selector: row => row.date
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>عنوان</p>,
      minWidth: '500px',
      maxWidth: '500px',
      cell: row => (
        <p className='mt-3'>
          {row.title}
        </p>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>نویسنده</p>,
      minWidth: '140px',
      maxWidth: '140px',
      selector: row => row.writer
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>عملیات</p>,
      minWidth: '200px',
      maxWidth: '200px',
      cell: row => (
        <div>
          <ion-icon style={{fontSize:'24px', cursor:'pointer'}} name="eye-outline" id={`showReportIcon${row.id}`}></ion-icon>
          <UncontrolledTooltip placement='top' target={`showReportIcon${row.id}`}>
              مشاهده
          </UncontrolledTooltip>
          <ion-icon
          onClick = {
            () => {
              SetEditSelectedReport(row.id)
              SetEditBox(true)
            }
          }
          style={{fontSize:'24px', cursor:'pointer', marginRight:'16px'}} name="create-outline" id={`editReportIcon${row.id}`}></ion-icon>
          <UncontrolledTooltip placement='top' target={`editReportIcon${row.id}`}>
              ویرایش
          </UncontrolledTooltip>
          <ion-icon
          onClick = {
            () => {
              SetDeleteSelectedReport(row.id)
              SetDeleteBox(true)
            }
          }
          style={{fontSize:'24px', cursor:'pointer', marginRight:'16px'}} name="trash-outline" id={`deleteReportIcon${row.id}`}></ion-icon>
          <UncontrolledTooltip placement='top' target={`deleteReportIcon${row.id}`}>
              حذف
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

  useEffect(() => {
    SetData([])
    SetLoading(true)
    axios.get(`${serverAddress}/reports/panel-reports/`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
    SetLoading(false)
    const a = []
      for (let i = 0; i < response.data.results.length; i++) {
        a.push(
          {
            id: response.data.results[i].id,
            status: response.data.results[i].publication_status,
            date:response.data.results[i].latest_update,
            title:response.data.results[i].title,
            summary:response.data.results[i].summary,
            writer:(`${response.data.results[i].author_fname} ${response.data.results[i].author_lname}`)
          }
        )
      }
      SetData(a)
    })
    .catch((err) => {
      SetLoading(false)
      console.log(err)
    }
  )
  }, [, States.beLoad])

  useEffect(() => {
    axios.get(`${serverAddress}/accounts/role/`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
        if (response.data.results.length > 0) {
            const array = response.data.results
            array.sort((a, b) => ((a['id'] > b['id']) ? 1 : ((b['id'] > a['id']) ? -1 : 0)))
            SetRolls(array)
        }
    })
    .catch((err) => {
        try {
          if (err.response.status === 401) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
        } catch (error) {}
    })

  }, [])

  return (
    <Card className='overflow-hidden mt-4' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h6' style={{width:'100%'}}>
          لیست گزارش‌‌ها

          <ion-icon size={18} onClick={ () => { 
              dispatch({type:"beLoad", value:!(States.beLoad)})
            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-6px'}} className='ms-2' name="refresh-circle-outline"></ion-icon>  

        </CardTitle>
        
      </CardHeader>
      <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-2 mb-2' md='6' sm='12'>
          <button onClick={() => { SetAddNewReportBox(true) }} style={{background:MainSiteOrange, color:"white", border:"none", padding:"8px 16px", borderRadius:"8px", float:'left', fontSize:'15px'}} className='ms-3' color='primary'>
            <span className='align-middle'>افزودن گزارش</span>
          </button>
          </Col>
        </Row>
      {/* { */}
        {/* Loading ? */}
        <DataTable
          noHeader
          columns={columns}
          className='react-dataTable'
          data={data}
        />
      {/* : */}
      {/* <LocalLoading/> */}
      {/* } */}
        <Modal
          isOpen={AddNewReportBox}
          className='modal-dialog-centered'
          modalClassName={'modal-danger'}
        >
          <ModalBody>
            <h6>افزودن گزارش جدید</h6>

            <span>عنوان گزارش</span>
            <Input placeholder='عنوان' id='reportTitle' className='mb-3'/>

            <span>خلاصه گزارش</span>
            <Input className='mb-3' id='summary' placeholder='خلاصه' type='textarea' style={{minHeight:'50px'}}/>

            <span>محتوا گزارش</span>
            <Input className='mb-3' id='Content' placeholder='محتوا' type='textarea' style={{minHeight:'150px'}}/>

            <span>عکس مورد نظر را وارد کنید.</span>
            <input onChange={imageHandler} accept="image/*" type='file' name='file' id='reportImage' />

            <div className='mt-3'>
              <Input defaultChecked type='switch' name='customSwitch' id='ShareReport' className='ms-2' />
              <Label for='exampleCustomSwitch'>گزارش مورد نظر انتشار پیدا کند؟</Label>
            </div>

            <div className='mt-2'>
              <span>دسترسی ها</span>
              {
                Rolls.map((item) => {
                  return (
                    <div>
                      <Input  type='switch' defaultChecked id={`RollText${item.id}`} />
                      <Label for={`RollText${item.id}`} className='me-2'>{item.name}</Label>
                    </div>
                  )
                })
              }
            </div>


          </ModalBody>
          <ModalFooter>
            <Button color={'warning'} onClick={() => {
                SetAddNewReportBox(false)
              }}>
              بازگشت
              
            </Button>
            <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={() => {
                addNewReports()
            }}>
              {
                Loading ? 
                    <LoadingButton/>
                :
                'ارسال'
              }
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={DeleteBox}
          className='modal-dialog-centered'
          modalClassName={'modal-danger'}
        >
          <ModalBody>
            <h6>حذف گزارش</h6>

            <p>آیا برای حذف گزارش انتخاب شده مطمئن هستید؟</p>

          </ModalBody>
          <ModalFooter>
            <Button color={'warning'} onClick={() => {
                SetDeleteBox(false)
              }}>
              بازگشت
              
            </Button>
            <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={() => {
                SetLoading(true)
                axios.delete(`${serverAddress}/reports/edit/${DeleteSelectedReport}/`, 
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                  }
                })
                .then((response) => {
                  if (response.status === 200) {
                    SetLoading(true)
                    return toast.success('با موفقیت حذف شد.', {
                      position: 'bottom-left'
                    })
                  }
                })
                .catch((err) => {
                  SetLoading(true)
                  console.log(err)
                })
            }}>
              {
                Loading ? 
                    <LoadingButton/>
                :
                'حذف'
              }
            </Button>
          </ModalFooter>
        </Modal>
    </Card >
  )
}

export default AdminReports
