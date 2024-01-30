/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import DataTable from 'react-data-table-component'
import { ChevronDown, Eye, CameraOff } from 'react-feather'
import React, { useState, forwardRef, useEffect } from 'react'
import {
    Card,
    Modal,
    CardTitle,
    CardHeader,
    UncontrolledTooltip,
    ModalBody,
    ModalFooter,
    Button,
    Label,
    Input
  } from 'reactstrap'
import { digitsEnToFa } from 'persian-tools'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../address'
import LoadingButton from '../loadinButton/LoadingButton'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import LocalLoading from '../localLoading/localLoading'

function RecognizeNetwork (id) {
    if (typeof (id) === 'number') {
        if (id === 1) {
            return ('BTC')
        } else if (id === 2) {
            return ('BCH')
        } else if (id === 3) {
            return ('LTC')
        } else if (id === 4) {
            return ('ETH')
        } else if (id === 5) {
            return ('BSC')
        } else { return (false) }
    } else if (typeof (id) === 'string') {
        if (id === 'بیت کوین') {
            return (1)
        } else if (id === 'بیت کوین کش') {
            return (2)
        } else if (id === 'لایت کوین') {
            return (3)
        } else if (id === 'اتریوم') {
            return (4)
        } else if (id === 'بایننس اسمارت چین') {
            return (5)
        } else { return (false) }
    } else {
        return (false)
    }
}

const ShowAssets = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()

    const [image, setImage] = useState()

    const [data, SetData] = useState([])
    const [DeleteBox, SetDeleteBox] = useState(false)
    const [EditBox, SetEditBox] = useState(false)
    const [HolesBox, SetHolesBox] = useState(false)
    const [DeleteId, SetDeleteId] = useState(0)
    const [EditData, SetEditData] = useState([])
    const [deleteLoading, SetDeleteLoading] = useState(false)
    const [EditLoading, SetEditLoading] = useState(false)
    const [Loading, SetLoading] = useState(false)

    const [Gap, SetGap] = useState([])
    const [GapLoading, SetGapLoading] = useState(false)
    const [GapId, SetGapId] = useState(null)

    const [AssetNameText, SetAssetNameText] = useState('')
    const AssetNameTextValidator = (e) => {
      const value = e.target.value
      const persianRegex = /^[A-Za-z\s]+$/
      if (persianRegex.test(value) || value === '') {
        SetAssetNameText(value)
      }
    }

    const [SymbolText, SetSymbolText] = useState('')
    const SymbolTextValidator = (e) => {
      const value = e.target.value
      const persianRegex = /^[A-Za-z\s]+$/
      if (persianRegex.test(value) || value === '') {
        SetSymbolText(value)
      }
    }
  
    const [PAssetNameText, SetPAssetNameText] = useState('')
    const PAssetNameTextValidator = (e) => {
      const value = e.target.value
      const persianRegex = /^[\u0600-\u06FF\s\u200C]+$/
      if (persianRegex.test(value) || value === '') {
        SetPAssetNameText(value)
      }
    }
  
    const [contract_addressText, Setcontract_addressText] = useState('')
    const contract_addressTextValidator = (e) => {
      const value = e.target.value
      const persianRegex = /^[A-Za-z0-9]+$/
      if (persianRegex.test(value) || value === '') {
        Setcontract_addressText(value)
      }
    }
  
    const [AssetsColorText, SetAssetsColorText] = useState('')
    const AssetsColorTextValidator = (e) => {
      const value = e.target.value
      const persianRegex = /^[A-Za-z#]+$/
      if (persianRegex.test(value) || value === '') {
        SetAssetsColorText(value)
      }
    }

    useEffect(() => {
        SetGap([])
        if (GapId !== null) {
            SetGapLoading(true)
            axios.get(`${serverAddress}/explorer/status-price-service/?symbol=${GapId}`)
            .then((response) => {
                console.log(response)
                if (response.data.results[0].gap.days.length > 0) {
                    SetGap(response.data.results[0].gap.days)
                }
                SetGapLoading(false)
            })  
            .catch((err) => {
                SetGapLoading(false)
            })
        }
    }, [GapId])

    const setPrice = (time, price, symbol) => {

        if (price === '') {
          alert('قیمت را وارد کنید.')
        } else {
          SetLoading(true)
          axios.post(`${serverAddress}/explorer/price/`, 
          {
            price:Number(price),
            symbol,
            date:time
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
                let getGap = Gap
                let editedData = getGap
                let index = editedData.findIndex(obj => obj === time)
                if (index !== -1) {
                  editedData.splice(index, 1)
                }
                getGap.days = editedData
                SetGap(getGap)
                if (Gap.days.length === 0) {
                  const myData = Data
                  myData.find(item => item.token === symbol).noGap = true
                  SetData(myData)
                }
                return toast.success('قیمت با موفقیت ثبت شد.', {
                  position: 'bottom-left'
                })
              }            
          })
          .catch((err) => {
              SetLoading(false)
              console.log(err)
              dispatch({type:"LOADINGEFFECT", value:false})
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
              return toast.error('خطا در پردازش', {
                position: 'bottom-left'
              })
          })
        }
      }
    
    const columns = [
        {
            name: 'نماد',
            minWidth: '90px',
            maxWidth: '90px',
            sortable: true,
            selector: row => row.symbol
        },
        {
            name: 'نام فارسی',
            minWidth: '160px',
            maxWidth: '160px',
            sortable: true,
            selector: row => row.persian_name
        },
        {
            name: 'نام انگلیسی',
            minWidth: '160px',
            maxWidth: '160px',
            sortable: true,
            selector: row => row.name
        },
        {
            name: 'لوگو',
            minWidth: '90px',
            maxWidth: '90px',
            sortable: true,
            cell : row => {
                if (typeof (row.image) === 'string') {
                    return (
                        <img src={row.image} style={{width:'30px'}} />
                    )
                } else {
                    return (
                        <CameraOff />
                    )
                }
            }
        },
        {
            name: 'دسیمال',
            minWidth: '100px',
            maxWidth: '100px',
            sortable: true,
            selector: row => row.decimal_number
        },
        {
            name: 'شبکه',
            minWidth: '90px',
            maxWidth: '90px',
            sortable: true,
            selector: row => row.network,
            cell : row => (
                <span>
                    {
                        RecognizeNetwork(row.network)
                    }
                </span>
            )
        },
        {
            name: 'عملیات',
            minWidth: '160px',
            maxWidth: '160px',
            sortable: true,
            cell : row => (
                <>
                    <ion-icon style={{fontSize:'24px', cursor:'pointer', marginRight:'8px'}} name="create-outline" id={`editReportIcon${row.id}`}
                        onClick = {
                            () => {
                                SetEditData(row)
                                SetEditBox(true)
                                console.log(row)
                            }
                        }
                    ></ion-icon>
                    <UncontrolledTooltip placement='top' target={`editReportIcon${row.id}`}>
                        ویرایش
                    </UncontrolledTooltip>

                    <ion-icon style={{fontSize:'24px', cursor:'pointer', marginRight:'8px'}} name="trash-outline" id={`deleteReportIcon${row.id}`} 
                        onClick = {
                        () => {
                            SetDeleteId(row.id)
                            SetDeleteBox(true)
                        }
                        }
                    ></ion-icon>
                    <UncontrolledTooltip placement='top' target={`deleteReportIcon${row.id}`}>
                        حذف
                    </UncontrolledTooltip>

                    <Eye style={{marginRight:'8px', cursor:'pointer'}} id={`ShowHolesIcon${row.id}`} onClick={ () => { SetHolesBox(true), SetGapId(row.symbol.toUpperCase()) }} />
                    <UncontrolledTooltip placement='top' target={`ShowHolesIcon${row.id}`}>
                        مشاهده حفره‌ها
                    </UncontrolledTooltip>
                </>
            )
        },
        {
            name: 'آدرس قرارداد',
            minWidth: '360px',
            maxWidth: '360px',
            sortable: true,
            selector: row => row.contract_address
        }
    ]

    useEffect(() => {
        if (States.rollsLoading === 8) {
            SetLoading(true)
            axios.get(`${serverAddress}/explorer/assets`, 
            {
                headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
                }
            })
            .then((response) => {
            SetLoading(false)
            if (response.status === 200) {
                    const getData = []
                    for (let i = 0; i < response.data.results.length; i++) {
                        getData.push(
                            {
                                id: response.data.results[i].id,
                                symbol: response.data.results[i].symbol,
                                persian_name: response.data.results[i].persian_name,
                                name:  response.data.results[i].name,
                                color: response.data.results[i].color,
                                image: response.data.results[i].image,
                                decimal_number: response.data.results[i].decimal_number,
                                contract_address: response.data.results[i].contract_address,
                                network: response.data.results[i].network
                            }
                        )
                    }
                    SetData(getData)
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
    }, [, States.AssetsBeload, States.rollsLoading])

    const deleteSelectedAsset = () => {
        console.log(DeleteId)
        SetDeleteLoading(true)
        axios.delete(`${serverAddress}/explorer/assets/${DeleteId}`, 
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
            }
        })
        .then((response) => {
            SetDeleteLoading(false)
            SetDeleteBox(false)
            dispatch({type:"AssetsBeload", value:!(States.AssetsBeload)})
            return toast.success('دارایی با موفقیت حذف شد', {
                position: 'bottom-left'
            })
        })
        .catch((err) => {
            console.log(err)
            SetDeleteLoading(false)
            if (err.response.status === 403) {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
            } else if (err.response.status === 401) {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
            } else {
                return toast.error('خطا در حذف دارایی', {
                    position: 'bottom-left'
                })
            }
        })
    }

    const EditSelectAsset = () => {
        let name = document.getElementById('EditTitle').value
        let persian_name = document.getElementById('EditPName').value
        let symbol = document.getElementById('EditSymbol').value
        let network = document.getElementById('EditNetwork').value
        let decimal_number = document.getElementById('EditDecimal').value
        let contract_address = document.getElementById('EditContract').value
        let color = document.getElementById('EditColor').value

        if (name === '') { name = null }
        if (persian_name === '') { persian_name = null }
        if (symbol === '') { symbol = null }
        if (network === '') { network = null }
        if (decimal_number === '') { decimal_number = null }
        if (contract_address === '') { contract_address = null }
        if (color === '') { color = null }

        const bodyFormData = new FormData()
        bodyFormData.append('name', name)
        bodyFormData.append('persian_name', persian_name)
        bodyFormData.append('symbol', symbol)
        bodyFormData.append('network', network)
        bodyFormData.append('color', color)
        bodyFormData.append('decimal_number', decimal_number)
        bodyFormData.append('contract_address', contract_address)
        if (document.getElementById('EditAssetImage1').files.length > 0) {
            const getImage = document.getElementById('EditAssetImage1').files[0]
            bodyFormData.append('image', getImage)
        }
        SetEditLoading(true)
        axios.put(`${serverAddress}/explorer/assets/${EditData.id}`,
            bodyFormData
        ,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('access')}`, 
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
        SetEditLoading(false)
            SetEditBox(false)
            console.log(response)
            if (response.status === 200) {
                return toast.success('دارایی با موفقیت ویرایش شد.', {
                    position: 'bottom-left'
                })
            }
        })
        .catch((err) => {
        SetEditLoading(false)

            console.log(err)
            return toast.error('خطا در ویرایش دارایی', {
                position: 'bottom-left'
              })
        })
    }

    const imageHandler = (event) => {
        setImage(event.target.files[0])
        console.log(event.target.files[0])
    }

    useEffect(() => {
        if (EditData.length !== 0) {
            SetAssetNameText(EditData.name)
            SetPAssetNameText(EditData.persian_name)
            Setcontract_addressText(EditData.contract_address)
            SetAssetsColorText(EditData.color)
            SetSymbolText(EditData.symbol)
        }
    }, [EditData])

    return (
        <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h6' style={{width:'100%'}}>لیست دارایی‌ها
          <ion-icon size={18} onClick={ () => { 
              dispatch({type:"AssetsBeload", value:!(States.AssetsBeload)})
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
                        columns={columns}
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10} />}
                    />
            }
          </div>
          <Modal
            isOpen={DeleteBox}
            className='modal-dialog-centered'
            toggle={ () => { SetDeleteBox(false) } }
            modalClassName={'modal-danger'}
          >
          <ModalBody>
            <h6>حذف دارایی</h6>

            <p>آیا برای حذف دارایی انتخاب‌ شده مطمئن هستید؟</p>

          </ModalBody>
          <ModalFooter>
            <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteSelectedAsset() }}>
                {
                    !deleteLoading ? 
                    <span>
                        حذف
                    </span>
                    :
                    <LoadingButton/>
                }
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
            isOpen={EditBox}
            className='modal-dialog-centered'
            toggle={ () => { SetEditBox(false) } }
            modalClassName={'modal-danger'}
          >
          <ModalBody>
            <h6>ویرایش دارایی</h6>

            <Label>عنوان انگلیسی</Label>
            <Input id='EditTitle' value={AssetNameText} onChange={AssetNameTextValidator}/>
            <Label className='mt-3'>عنوان فارسی</Label>
            <Input id='EditPName' value={PAssetNameText} onChange={PAssetNameTextValidator}/>
            <Label className='mt-3'>نماد</Label>
            <Input id='EditSymbol' value={SymbolText} onChange={SymbolTextValidator} />
            <Label className='mt-3'>شبکه</Label>
            <select class="form-select" id='EditNetwork' aria-label="Default select example" >
                <option selected={EditData.network === 1} value={1}>بیت‌کوین</option>
                <option selected={EditData.network === 4} value={4}>اتریوم</option>
                <option selected={EditData.network === 3}  value={3}>لایت‌کوین</option>
                <option selected={EditData.network === 5}  value={5}>بایننس‌اسمارت‌چین</option>
                <option selected={EditData.network === 2}  value={2}>بیت‌کوین‌کش</option>
            </select>
            <Label className='mt-3'>تصویر</Label>
            <br/>
            <img src={EditData.image} style={{width:'30px'}}/>
            <Input onChange={imageHandler} id='EditAssetImage1' type='file'/>
            <Label className='mt-3'>دسیمال</Label>
            <Input id='EditDecimal' defaultValue={EditData.decimal_number} type='number'/>
            <Label className='mt-3'>آدرس قرارداد</Label>
            <Input id='EditContract' value={contract_addressText} onChange={contract_addressTextValidator}/>
            <Label className='mt-3'>رنگ</Label>
            <Input id='EditColor' value={AssetsColorText} onChange={AssetsColorTextValidator}/>
            
          </ModalBody>
          <ModalFooter>
            <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { EditSelectAsset() }}>
                {
                    !EditLoading ? 
                    <span>
                        ویرایش
                    </span>
                    :
                    <LoadingButton/>
                }
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
            isOpen={HolesBox}
            className='modal-dialog-centered'
            toggle={ () => { SetHolesBox(false) } }
            modalClassName={'modal-danger'}
          >
          <ModalBody>
            <h6> حفره‌های دارایی {GapId}</h6>
            {
                GapLoading ? 
                <LocalLoading/>
                :
                Gap.length === 0 ?
                <p style={{textAlign:'center'}}>بدون حفره</p>
                :
                Gap.map((item, index) => {
                    return (
                      <form onSubmit={ (e) => { e.preventDefault(), setPrice(item, document.getElementById(`InputTokenPrice${index}`).value, GapId) }}>
                        <span key={index} style={{display:"block"}}>
                          {item}
                        </span>
                        <Input className='mb-3' style={{display:'inline-block', width:'80%'}} id={`InputTokenPrice${index}`}/>
                        <Button  style={{display:'inline-block', marginRight:'8px'}} color='primary' onClick={ () => { setPrice(item, document.getElementById(`InputTokenPrice${index}`).value, GapId) } }>ثبت</Button>
                      </form>

                    )
                })
            }
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>
      </Card>
    )
}

export default ShowAssets
