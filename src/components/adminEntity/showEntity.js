/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye, X, PlusCircle } from 'react-feather'
import { Card, CardHeader, CardTitle, Row, Col, UncontrolledTooltip, Modal, ModalBody, ModalFooter, Button, Label, Input, Nav,
    TabPane,
    NavItem,
    TabContent, InputGroup, InputGroupText} from 'reactstrap'
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

    const myInputRef = useRef(null)

    const [data, SetData] = useState([])
    const [SearchedData, SetSearchedData] = useState([])
    const [EditBox, setEditBox] = useState(false)
    const [AddBox, setAddBox] = useState(false)
    const [ShowBox, setShowBox] = useState(false)
    const [Loading, setLoading] = useState(false)
    const [AddLoading, setAddLoading] = useState(false)
    const [EntityDetail, setEntityDetail] = useState(null)
    const [Types, setTypes] = useState([])
    const [IsSearch, setIsSearch] = useState(false)

    const [ethAddress, SetethAddress] = useState('')
    const [btcAddress, SetbtcAddress] = useState('')
    const [BSCAddress, SetBSCAddress] = useState('')
    const [LTCAddress, SetLTCAddress] = useState('')
    const [BCHAddress, SetBCHAddress] = useState('')
    const [MATICAddress, SetMATICAddress] = useState('')
    const [ETCAddress, SetETCAddress] = useState('')
    const [XRPAddress, SetXRPAddress] = useState('')
    const [XLMAddress, SetXLMAddress] = useState('')
    const [ADAAddress, SetADAAddress] = useState('')
    const [XRDAddress, SetXRDAddress] = useState('')
    const [TRXAddress, SetTRXAddress] = useState('')

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
            maxWidth: '250px',
            minWidth: '250px',
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
        const mainETH = ethAddress.split('\n')
        
        const mainBTC = btcAddress.split('\n')
        
        const mainBSC = BSCAddress.split('\n')

        const mainLTC = LTCAddress.split('\n')

        const mainBCH = BCHAddress.split('\n')

        const mainMATIC = MATICAddress.split('\n')

        const mainETC = ETCAddress.split('\n')

        const mainXRP = XRPAddress.split('\n')

        const mainXLM = XLMAddress.split('\n')

        const mainADA = ADAAddress.split('\n')

        const mainXRD = XRDAddress.split('\n')

        const mainTRX = TRXAddress.split('\n')

        const array = []

        console.log(document.getElementById('BTC').value)

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

        if (mainMATIC[0] !== '') {
            for (let i = 0; i < mainMATIC.length; i++) {
                array.push(
                    {
                        name:mainMATIC[i],
                        network:6
                    }
                )
            }
        }

        if (mainETC[0] !== '') {
            for (let i = 0; i < mainETC.length; i++) {
                array.push(
                    {
                        name:mainETC[i],
                        network:8
                    }
                )
            }
        }

        if (mainXRP[0] !== '') {
            for (let i = 0; i < mainXRP.length; i++) {
                array.push(
                    {
                        name:mainXRP[i],
                        network:9
                    }
                )
            }
        }

        if (mainTRX[0] !== '') {
            for (let i = 0; i < mainTRX.length; i++) {
                array.push(
                    {
                        name:mainTRX[i],
                        network:10
                    }
                )
            }
        }

        if (mainXLM[0] !== '') {
            for (let i = 0; i < mainXLM.length; i++) {
                array.push(
                    {
                        name:mainXLM[i],
                        network:11
                    }
                )
            }
        }

        if (mainADA[0] !== '') {
            for (let i = 0; i < mainADA.length; i++) {
                array.push(
                    {
                        name:mainADA[i],
                        network:12
                    }
                )
            }
        }

        if (mainXRD[0] !== '') {
            for (let i = 0; i < mainXRD.length; i++) {
                array.push(
                    {
                        name:mainXRD[i],
                        network:13
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
        } else {
            console.log('no')
            console.log(array)
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
            document.getElementById('EntitySearch').focus()
        }
    }, [States.rollsLoading])

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

    const EntitySearch = (check) => {
        const value = document.getElementById('EntitySearch').value
        //form submit
        if (value.length >= 3) {
            if (check) {
                setLoading(true)
                
                axios.get(`${serverAddress}/entity/search-entities/?search=${value}`, 
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                  }
                })
                .then((response) => {
                setLoading(false)
    
                  if (response.status === 200) {
                    SetSearchedData(response.data)
                    console.log(response.data)
                  }
                })
                .catch((err) => {
                  console.log(err)
                setLoading(false)
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
    
            //onChange
            } else {
                setLoading(true)
                axios.get(`${serverAddress}/entity/search-entities/?search=${value}`, 
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                  }
                })
                .then((response) => {
                setLoading(false)
                if (response.status === 200) {
                    SetSearchedData(response.data)
                    console.log(response.data)
                  }
                })
                .catch((err) => {
                  console.log(err)
                setLoading(false)
                  
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
            if (value.length !== 0) {
                setIsSearch(true)
            } else {
                setIsSearch(false)
                SetSearchedData([])
            }
        } else {
            setIsSearch(false)
            setLoading(false)
            SetSearchedData([])
        }

    }

  return (
    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
        <CardTitle tag='h6' style={{width:'100%'}} id='EntityListTable'>لیست موجودیت‌ها
            
            <ion-icon size={18} onClick={ () => { 
                dispatch({type:"EntityBeload", value:!States.EntityBeload})
            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-3px'}} className='ms-2' name="refresh-circle-outline"></ion-icon>
            
            <form style={{float:'left', display:'inline-block', width:'200px', marginLeft:'16px'}} onSubmit={ (e) => { e.preventDefault(), EntitySearch(true) }} >
                <InputGroup id='MainDashboardInputGroup' className='input-group-merge mb-2' style={{direction:'ltr', borderColor:'red', width:'100%'}}>
                    <InputGroupText id='MainDashboardInputSymbole' onClick={ () => {
                        document.getElementById('EntitySearch').value = ''
                        EntitySearch(false)
                    }}>
                        {
                            document.getElementById('EntitySearch').value.length > 0 ?
                                <X size={16} />
                            :
                                null
                        }
                    </InputGroupText>
                    <Input ref={myInputRef} placeholder='جست‌وجو' id='EntitySearch' onChange={ () => { EntitySearch(false) }} />
                </InputGroup>
            </form>
       
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
                    data={!IsSearch ? data : SearchedData}
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
            <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={() => {}}>
                ویرایش
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
                        <Input id='ETH' type='textarea' onChange={ (e) => { SetethAddress(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            BTC-بیت کوین
                        </Label>
                        <Input id='BTC' type='textarea' onChange={ (e) => { SetBTCValue(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            BSC-بایننس اسمارت چین
                        </Label>
                        <Input id='BSC' type='textarea' onChange={ (e) => { SetBSCAddress(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            LTC-لایت کوین
                        </Label>
                        <Input id='LTC' type='textarea' onChange={ (e) => { SetLTCAddress(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            BCH-بیت کوین کش
                        </Label>
                        <Input id='BCH' type='textarea' onChange={ (e) => { SetBCHAddress(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            MATIC-پالیگان
                        </Label>
                        <Input id='MATIC' type='textarea' onChange={ (e) => { SetMATICAddress(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            ETC-اتریوم کلاسیک
                        </Label>
                        <Input id='ETC' type='textarea' onChange={ (e) => { SetETCAddress(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            XRP-اکس آر پی
                        </Label>
                        <Input id='XRP' type='textarea' onChange={ (e) => { SetXRPAddress(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            XLM-استلار
                        </Label>
                        <Input id='XLM' type='textarea' onChange={ (e) => { SetXLMAddress(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            ADA-کاردانو
                        </Label>
                        <Input id='ADA' type='textarea' onChange={ (e) => { SetADAAddress(e.target.value) }}/>
                    </Col>
                    <Col xl='12' className='mt-3'>
                        <Label>
                            XRD-رادیکس
                        </Label>
                        <Input id='XRD' type='textarea' onChange={ (e) => { SetXRDAddress(e.target.value) }}/>
                    </Col>
                </Row>

          </ModalBody>
          <ModalFooter>
            <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={() => { addAllAddress() }}>
                {
                    !AddLoading ? 
                    <span>
                        افزودن
                    </span>
                    :
                    <LoadingButton/>
                }
            </Button>

          </ModalFooter>
        </Modal>
    </Card>
  )
}

export default ShowEntity
