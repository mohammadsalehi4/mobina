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
import { Calendar, CalendarProvider } from "zaman"
import { JalaliCalendar } from '../../processors/jalaliCalendar'
import { MiladiCalendar } from '../../processors/MiladiCalendar'
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

  const [EditSelectedReport, SetEditSelectedReport] = useState(null)
  const [EditSelectedReportContent, SetEditSelectedReportContent] = useState(null)
  const [EditBox, SetEditBox] = useState(false)
  const [Time, SetTime] = useState('انتخاب نشده')
  const [EditTime, SetEditTime] = useState('')
  const [EditLoading, SetEditLoading] = useState(false)

  const imageHandler = (event) => {
    setImage(event.target.files[0])
  }

  const addNewReports = () => {
    SetLoading(true)
    const title = document.getElementById('reportTitle').value
    const summary = document.getElementById('summary').value
    const Content = document.getElementById('Content').value
    const author_fname = document.getElementById('author_fname').value
    const author_lname = document.getElementById('author_lname').value
    const checked = document.getElementById('ShareReport').checked

    let publication_status

    if (checked) {
      publication_status = 'انتشار یافته'
    } else {
      publication_status = 'پیش نویس'
    }

    const bodyFormData = new FormData()
    console.log(`${MiladiCalendar(Time).year}-${MiladiCalendar(Time).month}-${MiladiCalendar(Time).day}`)
    bodyFormData.append('title', title)
    bodyFormData.append('summary', summary)
    bodyFormData.append('text', Content)
    bodyFormData.append('author_fname', author_fname)
    bodyFormData.append('author_lname', author_lname)
    bodyFormData.append('image', image)
    bodyFormData.append('publication_status', publication_status)
    bodyFormData.append('date_choices', `${MiladiCalendar(Time).year}-${MiladiCalendar(Time).month}-${MiladiCalendar(Time).day}`)
    for (let i = 0; i < Rolls.length; i++) {
      if (document.getElementById(`RollText${Rolls[i].id}`).checked) {
        bodyFormData.append('accesses', Rolls[i].id)
      }
    }
    SetTime('انتخاب نشده')
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
      SetLoading(false)
      if (response.status === 201) {
        SetAddNewReportBox(false)
        dispatch({type:"reportsBeload", value:!(States.reportsBeload)})
        return toast.success('با موفقیت ساخته شد.', {
          position: 'bottom-left'
        })
      }
    })
    .catch((err) => {
      console.log(err)
      SetLoading(false)

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
  }

  const EditReport = () => {
    SetLoading(true)
    const title = document.getElementById('EditreportTitle').value
    const summary = document.getElementById('Editsummary').value
    const Content = document.getElementById('EditContent').value
    const checked = document.getElementById('EditShareReport').checked
    const author_fname = document.getElementById('authorEdit_fname').value
    const author_lname = document.getElementById('authorEdit_lname').value
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
    bodyFormData.append('author_fname', author_fname)
    bodyFormData.append('author_lname', author_lname)
    bodyFormData.append('date_choices', `${MiladiCalendar(EditTime).year}-${MiladiCalendar(EditTime).month}-${MiladiCalendar(EditTime).day}`)
    bodyFormData.append('publication_status', publication_status)

    for (let i = 0; i < Rolls.length; i++) {
      if (document.getElementById(`EditRollText${Rolls[i].id}`).checked) {
        bodyFormData.append('accesses', Rolls[i].id)
      }
    }

    if (document.getElementById('EditreportImage').files.length > 0) {
      const getImage = document.getElementById('EditreportImage').files[0]
      bodyFormData.append('image', getImage)
    }
    SetEditTime('')
    axios.put(`${serverAddress}/reports/edit/${EditSelectedReport}/`, 
    bodyFormData,
    {
        headers: {
            Authorization: `Bearer ${Cookies.get('access')}`, 
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response) => {
    SetLoading(false)
    console.log(response)
    if (response.status === 200) {
      dispatch({type:"reportsBeload", value:!(States.reportsBeload)})
      SetEditBox(false)
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
          <a href={`/reports/${row.id}`} style={{color:'inherit'}}>
            <ion-icon style={{fontSize:'24px', cursor:'pointer'}} name="eye-outline" id={`showReportIcon${row.id}`}></ion-icon>
          </a>
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
    if (EditSelectedReport !== null) {
      SetEditLoading(true)
      console.log((EditTime))
      axios.get(`${serverAddress}/reports/detail/${EditSelectedReport}/`, 
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
        console.log(response.data)
          if (response.status === 200) {
            SetEditTime(response.data.date_choices)
            SetEditSelectedReportContent(response.data)
          }
        SetEditLoading(false)

      })
      .catch((err) => {
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
    }
  }, [EditSelectedReport])

  useEffect(() => {
    if (States.rollsLoading === 4) {
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
              writer:(`${response.data.results[i].author_fname} ${response.data.results[i].author_lname}`),
              author_fname:response.data.results[i].author_fname,
              author_lname:response.data.results[i].author_lname,
              accesses:response.data.results[i].accesses
            }
          )
        }
        console.log(a)
        SetData(a)
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
      }
    )
    }

  }, [, States.reportsBeload, States.rollsLoading])

  //roll
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

  useEffect(() => {
    try {
      console.log(JalaliCalendar(Time))
    } catch (error) {}
  }, [Time])

  return (
    <Card className='overflow-hidden mt-4' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h6' style={{width:'100%'}}>
          لیست مقالات

          <ion-icon size={18} onClick={ () => { 
              dispatch({type:"reportsBeload", value:!(States.reportsBeload)})
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

        {
          Loading ? 
          <LocalLoading/>
          :
          <DataTable
          noHeader
          columns={columns}
          className='react-dataTable'
          data={data}
        />
        }


        <Modal
          isOpen={AddNewReportBox}
          className='modal-dialog-centered'
          toggle={ () => { SetAddNewReportBox(false) } }
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

            <span>نام نویسنده گزارش</span>
            <Input placeholder='نام' id='author_fname' className='mb-3'/>

            <span>نام خانوادگی نویسنده گزارش</span>
            <Input placeholder='نام خانوادگی' id='author_lname' className='mb-3'/>

            <span>تاریخ انتشار گزارش</span>
            <br/>
            <span>
              {
                Time === 'انتخاب نشده' ?
                  <span>
                    انتخاب نشده
                  </span>
                  :
                  <span>
                    {
                      `${JalaliCalendar(Time).year}/${JalaliCalendar(Time).month}/${JalaliCalendar(Time).day}`
                    }
                  </span>
              }
            </span>
            <CalendarProvider locale={'fa'}>
              <Calendar
                onChange={(date) => {
                  SetTime(String(date))
                }}
              />
            </CalendarProvider>
            <br/>

            <span className='mt-3'>عکس مورد نظر را وارد کنید.</span>
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
          toggle={ () => { SetDeleteBox(false) } }
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
                    SetLoading(false)
                    SetDeleteBox(false)
                    dispatch({type:"reportsBeload", value:!(States.reportsBeload)})
                    return toast.success('با موفقیت حذف شد.', {
                      position: 'bottom-left'
                    })
                  }
                })
                .catch((err) => {
                  SetLoading(false)
                    SetDeleteBox(false)
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

        <Modal
          isOpen={EditBox}
          className='modal-dialog-centered'
          toggle={ () => { 
            SetEditBox(false)
            SetEditSelectedReportContent(null)
            SetEditSelectedReport(null)
          } }
          modalClassName={'modal-danger'}
        >
          <ModalBody>
            {
              EditSelectedReportContent !== null ?
              <>
                <h6>ویرایش گزارش</h6>

                <span>عنوان گزارش</span>
                <Input defaultValue={EditSelectedReportContent.title} placeholder='عنوان' id='EditreportTitle' className='mb-3'/>

                <span>خلاصه گزارش</span>
                <Input defaultValue={EditSelectedReportContent.summary} className='mb-3' id='Editsummary' placeholder='خلاصه' type='textarea' style={{minHeight:'50px'}}/>

                <span>محتوا گزارش</span>
                <Input defaultValue={EditSelectedReportContent.text} className='mb-3' id='EditContent' placeholder='محتوا' type='textarea' style={{minHeight:'150px'}}/>
                <span>نام نویسنده گزارش</span>
                <Input placeholder='نام' id='authorEdit_fname' defaultValue={EditSelectedReportContent.author_fname} className='mb-3'/>

                <span>نام خانوادگی نویسنده گزارش</span>
                <Input placeholder='نام خانوادگی' defaultValue={EditSelectedReportContent.author_lname} id='authorEdit_lname' className='mb-3'/>

                <span>تاریخ انتشار گزارش</span>
                <br/>
                <span>
                  {
                    EditTime === '' ?
                      <span>
                        انتخاب نشده
                      </span>
                      :
                        EditTime !== null ? 
                        <span>
                          {`${JalaliCalendar(EditTime).year}/${JalaliCalendar(EditTime).month}/${JalaliCalendar(EditTime).day}`}
                        </span>
                        :
                        <span>
                          بدون اطلاعات
                        </span>

                  }
                </span>
                <CalendarProvider locale={'fa'}>
                  <Calendar
                    onChange={(date) => {
                      SetEditTime(String(date))
                    }}
                  />
                </CalendarProvider>
                <br/>
                <img style={{width:'200px'}} src={`${EditSelectedReportContent.image}`} />
                <br/>
                <span>عکس مورد نظر را وارد کنید.</span>
                <input onChange={imageHandler} accept="image/*" type='file' name='file' id='EditreportImage' />

                <div className='mt-3'>
                  {
                    EditSelectedReportContent.publication_status === "انتشار یافته" ?
                      <Input defaultChecked type='switch' name='customSwitch' id='EditShareReport' className='ms-2' />
                    :
                      <Input type='switch' name='customSwitch' id='EditShareReport' className='ms-2' />
                  }
                  <Label for='exampleCustomSwitch'>گزارش مورد نظر انتشار پیدا کند؟</Label>
                </div>

                <div className='mt-2'>
                  <span>دسترسی ها</span>
                  {
                    Rolls.map((item) => {
                      console.log(EditSelectedReportContent.accesses.some(access => access === item))
                      if (EditSelectedReportContent.accesses.some(access => access === item.id)) {
                        return (
                          <div>
                            <Input  type='switch' defaultChecked id={`EditRollText${item.id}`} />
                            <Label for={`RollText${item.id}`} className='me-2'>{item.name}</Label>
                          </div>
                        )
                      } else {
                        return (
                          <div>
                          <Input  type='switch' id={`EditRollText${item.id}`} />
                          <Label for={`RollText${item.id}`} className='me-2'>{item.name}</Label>
                          </div>
                        )
                      }
                    })
                  }
                </div>
                </>
                :
                <p>در حال پردازش</p>
            }


          </ModalBody>
          <ModalFooter>
            <Button color={'warning'} onClick={() => {
                SetEditSelectedReportContent(null)
                SetEditSelectedReport(null)
                SetEditBox(false)
              }}>
              بازگشت
              
            </Button>
            <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={() => {
                EditReport()
            }}>
              {
                Loading ? 
                    <LoadingButton/>
                :
                'ویرایش'
              }
            </Button>
          </ModalFooter>
        </Modal>
    </Card >
  )
}

export default AdminReports
