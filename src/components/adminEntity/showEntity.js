/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye, Edit, PlusCircle } from 'react-feather'
import { Card, CardHeader, CardTitle, Row, Col, UncontrolledTooltip, Modal, ModalBody, ModalFooter, Button, Label, Input, Nav,
    TabPane,
    NavItem,
    TabContent} from 'reactstrap'
import ReactPaginate from 'react-paginate'
import LoadingButton from '../loadinButton/LoadingButton'
import LegalDetail from './legalDetail'
import AddressList from './AddressList'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../address'
import LocalLoading from '../localLoading/localLoading'
import toast from 'react-hot-toast'

import { useDispatch, useSelector } from 'react-redux'

const ShowEntity = () => {
    
    const dispatch = useDispatch()
    const States = useSelector(state => state)

    const [data, SetData] = useState([])
    const [EditBox, setEditBox] = useState(false)
    const [AddBox, setAddBox] = useState(false)
    const [ShowBox, setShowBox] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [AddLoading, setAddLoading] = useState(false)
    const [EntityDetail, setEntityDetail] = useState(null)
    const [Types, setTypes] = useState([])

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
                console.log('getType')
                console.log(getType)
                setTypes(getType)
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

    const basicColumns = [
        {
            name: 'نام',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            selector: row => row.name
        },
        {
            name: 'نوع',
            sortable: true,
            maxWidth: '130px',
            minWidth: '130px',
            selector: row => row.type,
            cell: row => {
                if (row.type === null) {
                    return (
                        <span>
                            
                        </span>
                    )
                } else {
                    if (Types.length > 0) {
                        return (
                            <span>
                                {Types.find(item => item.id === row.type).value}
                            </span>
                        )
                    } else {
                        return (
                            <span></span>
                        )
                    }
                }
            }
            
        },
        {
            name: 'وب‌سایت',
            sortable: true,
            maxWidth: '200px',
            minWidth: '200px',
            selector: row => row.website,
            cell: row => {
                return (
                    <a href={`https://${row.website}`} style={{color:'inherit'}}>{row.website}</a>
                )
            }
        },
        {
            name: 'نام حقوقی',
            sortable: true,
            maxWidth: '130px',
            minWidth: '130px',
            selector: row => row.legal_name
        },
        {
            name: 'عملیات',
            sortable: true,
            maxWidth: '100px',
            minWidth: '100px',
            cell: row => {
                return (
                    <div>
                        <Eye id={`Eye${row.id}`} style={{cursor:'pointer'}} onClick={ () => { toggle('1'), setEntityDetail(row.data), setShowBox(true) } } />
                        <UncontrolledTooltip placement='top' target={`Eye${row.id}`}>
                          مشاهده
                        </UncontrolledTooltip>

                        {/* <Edit id={`Edit${row.id}`} style={{cursor:'pointer', marginRight:'16px'}} onClick={ () => { setEditBox(true) } } />
                        <UncontrolledTooltip placement='top' target={`Edit${row.id}`}>
                          ویرایش
                        </UncontrolledTooltip> */}

                        <PlusCircle id={`AddNew${row.id}`} style={{cursor:'pointer', marginRight:'16px'}} onClick={ () => { setEntityDetail(row.data), setAddBox(true) } }   />
                        <UncontrolledTooltip placement='top' target={`AddNew${row.id}`}>
                          افزودن آدرس
                        </UncontrolledTooltip>
                    </div>
                )
            }
        }
    ]

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

        if (array.length > 0) {
            setAddLoading(true)
            axios.put(`${serverAddress}/entity/${EntityDetail.uuid}/`, 
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
                setAddLoading(false)
                if (response.status === 200) {
                    return toast.success('آدرس ها با موفقیت اضافه شدند.', {
                        position: 'bottom-left'
                    })
                }               
            })
            .catch((err) => {
                setAddLoading(false)
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
    }

        //pagination
        const [currentPage, setCurrentPage] = useState(0)
        const handlePagination = page => {
          setCurrentPage(page.selected)
        }
        const CustomPagination = () => (
          <ReactPaginate
            nextLabel=''
            breakLabel='...'
            previousLabel=''
            pageRangeDisplayed={2}
            forcePage={(currentPage)}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            nextLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextClassName='page-item next-item'
            previousClassName='page-item prev-item'
            pageCount={Math.ceil(data.length / 10) || 1}
            onPageChange={page => handlePagination(page)}
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-3'
          />
        )

        const [active, setActive] = useState('1')
        const toggle = tab => {
            setActive(tab)
        }

        useEffect(() => {
            if (States.rollsLoading === 7) {
                
                setLoading(true)
                axios.get(`${serverAddress}/entity/`, 
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                  }
                })
                .then((response) => {
                    setLoading(false)
                    const getData = []
                    if (response.status === 200) {
                        for (let i = 0; i < response.data.results.length; i++) {
                            getData.push(
                                {
                                    name:response.data.results[i].name,
                                    type:response.data.results[i].type,
                                    website:response.data.results[i].web_site,
                                    legal_name:response.data.results[i].legal_name,
                                    id:response.data.results[i].uuid,
                                    data:response.data.results[i]
                                }
                            )
                            SetData(getData)
                        }
                    }
                })
                .catch((err) => {
                    setLoading(false)
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
        }, [States.rollsLoading, States.EntityBeload])
  return (
    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
        <CardTitle tag='h6' style={{width:'100%'}}>لیست موجودیت‌ها
              <ion-icon size={18} onClick={ () => { 
                dispatch({type:"EntityBeload", value:!States.EntityBeload})
            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-6px'}} className='ms-2' name="refresh-circle-outline"></ion-icon>
        </CardTitle>
      </CardHeader>
        <div className='react-dataTable'>
            {
                Loading ? 
                <div className='mt-5'>
                    <LocalLoading/>
                </div>
                :
                <DataTable
                    noHeader
                    data={data}
                    columns={basicColumns}
                    pagination
                    className='react-dataTable'
                    paginationDefaultPage={currentPage + 1}
                    paginationComponent={CustomPagination}
                    sortIcon={<ChevronDown size={10} />}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                />
            }

        </div>
        
        <Modal
          isOpen={ShowBox}
          toggle={ () => { setShowBox(false) } }
          className='modal-dialog-centered'
          modalClassName={'modal-danger'}
          style={{minWidth:'50%'}}
        >
          <ModalBody>
            <div>
                <Nav tabs style={{fontSize:"12px", marginRight:"0px", paddingBottom:"12px"}}>
                    <NavItem className="NavItem" style={{  cursor:"pointer"}} >
                        {
                            active === '1' ?
                            <a
                                id='Link1'
                                active={active === '1'}
                                onClick={() => {
                                toggle('1')
                            }}>
                                <span className='align-right'
                                 style={{fontWeight:'bold', fontSize:'14px'}}
                                >مشخصات حقوقی</span>
                            </a>
                        :
                            <a
                                id='Link1'
                                active={active === '1'}
                                onClick={() => {
                                toggle('1')
                            }}>
                                <span className='align-right'
                                 style={{ fontSize:'14px'}}
                                >مشخصات حقوقی</span>
                            </a>
                        }

                    </NavItem>

                    <NavItem className="NavItem" style={{ marginRight:'16px' }} >
                        {
                            active === '2' ? 
                            <a
                                id='Link1'
                                active={active === '2'}
                                onClick={() => {
                                toggle('2')
                            }}>
                                <span className='align-right' style={{fontWeight:'bold', fontSize:'14px'}} >فهرست آدرس ها</span>
                            </a>
                            :
                            <a
                                id='Link1'
                                active={active === '2'}
                                onClick={() => {
                                toggle('2')
                            }}>
                                <span className='align-right' style={{ fontSize:'14px'}}>فهرست آدرس ها</span>
                            </a>
                        }

                    </NavItem>
                </Nav>

                <TabContent activeTab={active}>
                    <TabPane tabId='1'>
                        {
                            EntityDetail !== null ? 
                            <LegalDetail data={EntityDetail}/>
                            :
                            null
                        }
                    </TabPane>
                    <TabPane tabId='2'>
                        <AddressList  data={EntityDetail}/>
                    </TabPane>
                </TabContent>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={() => { setShowBox(false) }}>
                بسته
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={EditBox}
          toggle={ () => { setEditBox(false) } }
          className='modal-dialog-centered'
          modalClassName={'modal-danger'}
        >
          <ModalBody>
            <Row>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        نام (فارسی)
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        نام (انگلیسی)
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        وبسایت
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        نوع
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        کشور
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        تاسیس
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        پشتیبانی از فیات
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        سکه خصوصی
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        نهاد ناظر
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        اسم حقوقی
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        شماره ثبت
                    </Label>
                    <Input/>
                </Col>
                <Col xl='12'  className='mt-3'>
                    <Label>
                        مجوز
                    </Label>
                    <Input/>
                </Col>
            </Row>

          </ModalBody>
          <ModalFooter>
            <Button color={'warning'} style={{height:'37px', width:'80px'}} onClick={() => {}}>
                ویرایش
            </Button>
            <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={() => { setEditBox(false) }}>
                بسته
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={AddBox}
          toggle={ () => { setAddBox(false) } }
          className='modal-dialog-centered'
          modalClassName={'modal-danger'}
        >
          <ModalBody>
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
                </Row>

          </ModalBody>
          <ModalFooter>
            <Button color={'warning'} style={{height:'37px', width:'80px'}} onClick={() => { addAllAddress() }}>
                {
                    !AddLoading ? 
                    <span>
                        افزودن
                    </span>
                    :
                    <LoadingButton/>
                }
            </Button>
            <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={() => { setAddBox(false) }}>
                بسته
            </Button>
          </ModalFooter>
        </Modal>
    </Card>
  )
}

export default ShowEntity
