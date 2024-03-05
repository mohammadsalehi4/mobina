/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** Table Columns
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Row, Col, Button, Modal, ModalBody, ModalFooter} from 'reactstrap'
import LocalLoading from '../../../components/localLoading/localLoading'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'
import { Trash2 } from 'react-feather'
import toast from 'react-hot-toast'
import LoadingButton from '../../../components/loadinButton/LoadingButton'

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
                        uuid: response.data.results[i].uuid
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
