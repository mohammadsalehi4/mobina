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

const ShowEntity = () => {
    const [data, SetData] = useState([])
    const [EditBox, setEditBox] = useState(false)
    const [AddBox, setAddBox] = useState(false)
    const [ShowBox, setShowBox] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [EntityDetail, setEntityDetail] = useState({})

    const basicColumns = [
        {
            name: 'نام',
            sortable: true,
            maxWidth: '200px',
            minWidth: '200px',
            selector: row => row.name
        },
        {
            name: 'نوع',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            selector: row => row.type
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
            maxWidth: '200px',
            minWidth: '200px',
            selector: row => row.legal_name
        },
        {
            name: 'عملیات',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            cell: row => {
                return (
                    <div>
                        <Eye id={`Eye${row.id}`} style={{cursor:'pointer'}} onClick={ () => { setShowBox(true) } } />
                        <UncontrolledTooltip placement='top' target={`Eye${row.id}`}>
                          مشاهده
                        </UncontrolledTooltip>

                        <Edit id={`Edit${row.id}`} style={{cursor:'pointer', marginRight:'16px'}} onClick={ () => { setEditBox(true) } } />
                        <UncontrolledTooltip placement='top' target={`Edit${row.id}`}>
                          ویرایش
                        </UncontrolledTooltip>

                        <PlusCircle id={`AddNew${row.id}`} style={{cursor:'pointer', marginRight:'16px'}} onClick={ () => { setAddBox(true) } }   />
                        <UncontrolledTooltip placement='top' target={`AddNew${row.id}`}>
                          افزودن آدرس
                        </UncontrolledTooltip>
                    </div>
                )
            }
        }
    ]

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
                                name:response.data.results[i].persian_name,
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
        }, [])
  return (
    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
        <CardTitle tag='h6' style={{width:'100%'}}>لیست موجودیت ها
              <ion-icon size={18} onClick={ () => { 
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
                        <a
                            id='Link1'
                            active={active === '1'}
                            onClick={() => {
                            toggle('1')
                        }}>
                            <span className='align-right'>مشخصات حقوقی</span>
                        </a>
                    </NavItem>

                    <NavItem className="NavItem" style={{ marginRight:'16px' }} >
                        <a
                            id='Link1'
                            active={active === '2'}
                            onClick={() => {
                            toggle('2')
                        }}>
                            <span className='align-right'>فهرست آدرس ها</span>
                        </a>
                    </NavItem>
                </Nav>

                <TabContent activeTab={active}>
                    <TabPane tabId='1'>
                        <LegalDetail/>
                    </TabPane>
                    <TabPane tabId='2'>
                        <AddressList/>
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
            <Button color={'warning'} style={{height:'37px', width:'80px'}} onClick={() => {}}>
                افزودن
            </Button>
            <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={() => { setEditBox(false) }}>
                بسته
            </Button>
          </ModalFooter>
        </Modal>
    </Card>
  )
}

export default ShowEntity
