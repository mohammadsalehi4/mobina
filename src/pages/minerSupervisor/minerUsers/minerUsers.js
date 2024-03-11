/* eslint-disable no-duplicate-imports */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** Table Columns
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Row, Col, Button, Modal, ModalBody, ModalFooter} from 'reactstrap'
import CardAction from '@components/card-actions'
import { CornerLeftDown } from 'react-feather'
import LocalLoading from '../../../components/localLoading/localLoading'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'
import { Trash2 } from 'react-feather'
import toast from 'react-hot-toast'
import LoadingButton from '../../../components/loadinButton/LoadingButton'
import './style.css'
const MinerUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:7})
    }, [])

    const [Data, SetData] = useState([])
    const [Loading, SetLoading] = useState(false)
    const [DeleteLoading, SetDeleteLoading] = useState(false)
    const [DeleteBox, SetDeleteBox] = useState(false)
    const [DeleteUUID, SetDeleteUUID] = useState(null)
    const [Reload, SetReload] = useState(false)

    const basicColumns = [
        {
            name: 'نام برند',
            sortable: true,
            maxWidth: '120px',
            minWidth: '120px',
            selector: row => row.BrandName
        },
        {
            name: 'نام استخراج‌کننده',
            sortable: true,
            maxWidth: '170px',
            minWidth: '170px',
            selector: row => row.name
        },
        {
            name: 'ایمیل',
            sortable: true,
            minWidth: '270px',
            maxWidth: '270px',
            selector: row => row.Email
        },
        {
            name: 'شماره تلفن',
            sortable: true,
            minWidth: '160px',
            maxWidth: '160px',
            selector: row => row.phoneNumber
        },
        {
          name: 'وبسایت',
          minWidth: '150px',
          maxWidth: '150px',
          selector: row => (
            row.website
          )
        },
        {
          name: 'عملیات',
          sortable: true,
          minWidth: '160px',
          maxWidth: '160px',
          cell: row => {
            return (
              <Trash2 size={20} style={{cursor:'pointer'}} onClick={ () => { SetDeleteUUID(row.uuid), SetDeleteBox(true) } }/>
            )
          }
        }
    ]

    useEffect(() => {
        SetLoading(true)
        axios.get(`${serverAddress}/miners/operation/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
        SetLoading(false)
        console.log('response')
        console.log(response)
          if (response.status === 200) {
            const getData = []
            for (let i = 0; i < response.data.results.length; i++) {
                getData.push(
                    {
                        BrandName:response.data.results[i].name_brand,
                        name:`${response.data.results[i].interface_fname} ${response.data.results[i].interface_lname}`,
                        phoneNumber: response.data.results[i].interface_phone_number,
                        Email: response.data.results[i].email,
                        website: response.data.results[i].website,
                        uuid: response.data.results[i].uuid,
                        data:response.data.results[i]
                    }
                )
            }
            SetData(getData)
          }
        })
        .catch((err) => {
            SetLoading(false)
            console.log(err)
            try {
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
            } catch (error) {}
            try {
              if (err.response.data.detail === 'Not found.') {
                return toast.error('آدرس مورد نظر یافت نشد.', {
                  position: 'bottom-left'
                })
              }
            } catch (error) {}
        })
    }, [, Reload])

    const DeleteMiner = () => {
      SetDeleteLoading(true)
      axios.delete(serverAddress + `/miners/operation/${DeleteUUID}/`, 
      {
          headers: {
              Authorization: `Bearer ${Cookies.get('access')}`
          }
      }
      )
      .then((response) => {
          SetDeleteLoading(false)
          console.log(response)
          if (response.status === 200) {
            SetReload(!Reload)
            SetDeleteBox(false)
            return toast.success('استخراج کننده با موفقیت حذف شد', {
              position: 'bottom-left'
          })
          }
      })
      .catch((err) => {
          SetDeleteLoading(false)
          SetLoading(false)
          console.log(err)
          return toast.error('خطا در پردازش', {
              position: 'bottom-left'
          })
      })
    }

    const ExpandableTable = (e) => {
      const [DeviceLoading, SetDeviceLoading] = useState(true)
      const [DeviceData, SetDeviceData] = useState([])
      console.log(e)
      if (DeviceLoading) {
        axios.get(serverAddress + `/miners/extraction-halde/?UUID=${e.data.uuid}`, 
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
            }
        }
        )
        .then((response) => {
            console.log(response)
            SetDeviceData(response.data.results)
            SetDeviceLoading(false)
        })
        .catch((err) => {
            SetDeleteLoading(false)
            SetLoading(false)
            console.log(err)
            return toast.error('خطا در پردازش', {
                position: 'bottom-left'
            })
        })
      }

      return (

          <div className='expandable-content p-2' id='minerUser'>
              {
                DeviceLoading ? 
                <div className='mt-5'>
                  <LocalLoading/>
                </div>
                :
                  <Card>
                    <Row className='me-3 ms-3 mt-3'>
                      <h5>مشخصات استخراج‌کننده</h5>

                      <Col xl='3' lg='4' md='6' className="mt-4">
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'کدملی'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              {e.data.data.interface_phone_number}
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <Col xl='3' lg='4' md='6' className="mt-4">
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'وضعیت'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              {e.data.data.is_active ? 'فعال' : 'غیرفعال'}
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <Col xl='3' lg='4' md='6' className="mt-4">
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'شماره ثبت شرکت'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              {e.data.data.company_registration_number}
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <Col xl='3' lg='4' md='6' className="mt-4">
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'تاریخ تاسیس'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              {e.data.data.establishment}
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <Col xl='3' lg='4' md='6' className="mt-4">
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'شماره انشعاب برق'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              {e.data.data.electricity_branch_number}
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <Col xl='3' lg='4' md='6' className="mt-4">
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'نام فارسی'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              {e.data.data.name_brand_persian}
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <Col xl='3' lg='4' md='6' className="mt-4">
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'شماره پروانه بهره‌برداری'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              {e.data.data.operating_license_number}
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <Col xl='3' lg='4' md='6' className="mt-4">
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'کد پستی'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              {e.data.data.postal_code}
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <Col xl='3' lg='4' md='6' className="mt-4">
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'لوگو'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              <img src={e.data.data.logo} style={{width:'30px', height:'30px'}}/>
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <Col xl='9' className='mt-4'>
                        <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'آدرس پستی'}</p>
                            <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                              {e.data.data.postal_address}
                              {/* <small> {'aaa'}</small> */}
                              <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                            </div>
                        </div>
                      </Col>

                      <h5 className='mt-5'>مشخصات دستگاه‌ها</h5>
                    </Row>
                    {
                      DeviceData.length > 0 ? 
                        <Card className='mt-3'>
                          {
                            DeviceData.map((item, index) => {
                              console.log(item)
                              return (
                                <CardAction 
                                title={item.device.device_name} 
                                actions='collapse' onClick='collapse' 
                              >
                                <div className='container-fluid pe-5 ps-5 pb-3'>
                                  <Row>
                                    <Col xl='3' lg='4' md='6' className='mt-5'>
                                      <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                                        <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'استخر'}</p>
                                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                                            {item.pool}
                                            {/* <small> {'aaa'}</small> */}
                                            <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                                          </div>
                                      </div>
                                    </Col>

                                    <Col xl='3' lg='4' md='6' className='mt-5'>
                                      <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                                        <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'قدرت'}</p>
                                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                                            {item.power}
                                            <small> {'TH'}</small>
                                            <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                                          </div>
                                      </div>
                                    </Col>

                                    <Col xl='3' lg='4' md='6' className='mt-5'>
                                      <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                                        <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'تعداد'}</p>
                                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                                            {item.count}
                                            {/* <small> {'TH'}</small> */}
                                            <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                                          </div>
                                      </div>
                                    </Col>

                                    <Col xl='3' lg='4' md='6' className='mt-5'>
                                      <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                                        <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'وضعیت'}</p>
                                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                                            {item.is_active ? 'فعال' : 'غیرفعال'}
                                            {/* <small> {'TH'}</small> */}
                                            <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                                          </div>
                                      </div>
                                    </Col>

                                    <Col xl='3' lg='4' md='6' className='mt-5'>
                                      <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                                        <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'ساعت کار روزانه'}</p>
                                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                                            {item.daily_working_hours}
                                            <small> {'h'}</small>
                                            <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                                          </div>
                                      </div>
                                    </Col>

                                    <Col xl='3' lg='4' md='6' className='mt-5'>
                                      <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                                        <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'مدل'}</p>
                                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                                            {item.device.model}
                                            {/* <small> {'h'}</small> */}
                                            <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                                          </div>
                                      </div>
                                    </Col>

                                    <Col xl='3' lg='4' md='6' className='mt-5'>
                                      <div style={{ marginBottom:'-10px', textAlign:'right'}}>
                                        <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'توان'}</p>
                                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                                            {item.device.power}
                                            <small> {'W'}</small>
                                            <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                                          </div>
                                      </div>
                                    </Col>

                                    <Col xl='3' lg='4' md='6' className='mt-5'>
                                      <div style={{ marginBottom:'-10px', textAlign:'right'}} className={``}>
                                        <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'ساخت'}</p>
                                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                                            {item.device.manufacture}
                                            {/* <small> {'wh'}</small> */}
                                            <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                                          </div>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                                </CardAction>
                              )
                            })
                          }
                        </Card>

                      :
                        <p style={{textAlign:'center'}} className='pt-5'>
                          بدون دستگاه ذخیره شده
                        </p>
                    }

                  </Card>


              }
              <hr/>
          </div>
      )
  }

    return (
        <div className='container-fluid mt-5'>
            <Row>
                <Col  xl={{size:1}} lg={{size:0}} md={{size:0}}></Col>
                <Col  
                 xl={{size:10}} lg={{size:10}} md={{size:12}}                
                    style={{
                      textAlign: 'center', 
                      maxWidth: '1280px', 
                      marginLeft: 'auto', 
                      marginRight: 'auto'
                    }}>
                    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", textAlign:'right'}}>
                        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                        <CardTitle tag='h6' style={{width:'100%'}}>
                            لیست استخراج کننده‌ها
                                {/* <ion-icon size={18} onClick={ () => { 
                            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-6px'}} className='ms-2' name="refresh-circle-outline"></ion-icon> */}
                            <a href='/mining'>
                              <Button color='primary' style={{float:'left'}}>
                                  افزودن
                              </Button>
                            </a>
                        </CardTitle>
                        </CardHeader>

                        {
                        
                        Loading ? 
                        <div className='mt-5'>
                            <LocalLoading/> 
                        </div>
                        : 
                            Data.length > 0 ?
                            <div className='react-dataTable'>
                            <DataTable
                                noHeader
                                data={Data}
                                columns={basicColumns}
                                className='react-dataTable'
                                expandableRows
                                expandOnRowClicked
                                expandableRowsComponent={ExpandableTable}
                            />
                            </div>
                            :
                            <p style={{textAlign:'center'}} className='mt-3'>بدون اطلاعات ثبت شده</p>
                        }
                
                    </Card>
                </Col>
                <Col xl={{size:1}} lg={{size:0}} md={{size:0}}></Col>
            </Row>
            <Modal
                isOpen={DeleteBox}
                className='modal-dialog-centered'
                toggle={ () => { SetDeleteBox(false) } }
                style={{maxWidth:'370px'}}
                modalClassName={'modal-danger'}
            >
                <ModalBody>
                    <h6>آیا از حذف استخراج کننده مطمئن هستید؟</h6>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' onClick={ () => { DeleteMiner() } } style={{height:'40px'}}>
                        {
                          DeleteLoading ? 
                            <LoadingButton/>
                          :
                          <span>
                            حذف
                          </span>
                        }
                    </Button>
                </ModalFooter>
            </Modal>
        </div>

    )
}

export default MinerUsers
