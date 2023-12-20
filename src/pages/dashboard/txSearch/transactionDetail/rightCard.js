/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { digitsEnToFa } from 'persian-tools'
import NiceAddress2 from '../../../../components/niceAddress2/niceAddress'
import {ArrowDownCircle, Package, AlertOctagon, Calendar} from 'react-feather'
import { serverAddress } from '../../../../address'
import { RecognizeNetwork } from '../../../../processors/recognizeNetwork'
import Cookies from 'js-cookie'
import axios from 'axios'
import './transactiondetail.css'
import { useDispatch, useSelector } from 'react-redux'
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  UncontrolledTooltip,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label
} from 'reactstrap'
import { MainSiteOrange, MainSiteyellow } from '../../../../../public/colors'
import LoadingButton from '../../../../components/loadinButton/LoadingButton'
import Chip from '@mui/material/Chip'
import toast from 'react-hot-toast'

// ** Images

const CardContentTypes = (props) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()

  //barchasb ha
  const [addressMark, SetAddressMark] = useState(false)
  const [addressText, SetAddressText] = useState('')
  const [addressId, SetAddressId] = useState('')

  //tag
  const [TagValues, setTagValues] = useState([])
  const [TagId, setTagId] = useState([])
  const [AddTagModal, setAddTagModal] = useState(false)
  const [AddLabelModal, setAddLabelModal] = useState(false)
  const [DeleteLabelModal, setDeleteLabelModal] = useState(false)
  const [DeleteTagModal, setDeleteTagModal] = useState(false)
  const [DeleteTagText, setDeleteTagText] = useState('')
  const [TagList, setAddTagList] = useState(false)
  const [SelectedTag, setSelectedTag] = useState(false)
  const [Loading, setLoading] = useState(false)

  const getTagList = () => {
    axios.get(serverAddress + "/address-labels/tag/", 
    {
      headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
      }
    }
    )
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        const AllTagList = []
        for (let i = 0; i < response.data.results.length; i++) {
          if (AllTagList.some(item => item.tag === response.data.results[i].tag) === false) {
            AllTagList.push(
              {
                tag:response.data.results[i].tag
              }
            )
          }
        }
        setAddTagList(AllTagList)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  //add new tag
  const GetTag = (userInput) => {
    if (userInput) {
    setLoading(true)
    axios.post(serverAddress + "/address-labels/tag/", 
      {
        items:[
          {
            address: props.data.address,
            tag: userInput,
            // network need set
            network:RecognizeNetwork(props.data.name)
          }
        ]
      },
      {
        headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
        }
      }
      )
      .then((response) => {
    setLoading(false)
    if (Number(response.status) >= 200 && Number(response.status) < 300) {
          setTagValues(prevTags => [...prevTags, userInput])
          setTagId(prevTags => [
            ...prevTags, 
            {
              tagText:userInput,
              tagId:response.data[0].id
            }
          ])
        } else {
          if (err.response.status === 400) {
            return toast.error('تگ مورد نظر تکراری است.', {
              position: 'bottom-left'
            })
          } else {}
          return toast.error('خطا در پردازش', {
            position: 'bottom-left'
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        if (err.response.status === 400) {
          return toast.error('تگ مورد نظر تکراری است.', {
            position: 'bottom-left'
          })
        } else {
          return toast.error('خطا در پردازش', {
            position: 'bottom-left'
          })
        }
      })
    }
  }

  //delete tag
  const DeleteTag = () => {
    const name = DeleteTagText
    let getTagValues = TagValues
    let getTagId = TagId
    
    const thisTag = getTagId.filter(element => element.tagText === name)[0]
    setLoading(true)
    axios.delete(serverAddress + `/address-labels/tag/${thisTag.tagId}/`, 
    {
      headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
      }
    }
    )
    .then((response) => {
    setLoading(false)
    if (Number(response.status) >= 200 && Number(response.status) < 300) {

        getTagValues = getTagValues.filter(element => element !== name)
        getTagId = getTagId.filter(element => element.tagText !== name)
    
        setTagValues(getTagValues)
        setTagId(getTagId)
        setDeleteTagModal(false)
      } else {
        return toast.error('خطا در پردازش', {
          position: 'bottom-left'
        })
      }
    })
    .catch((err) => {
    setLoading(false)
    console.log(err)
      return toast.error('خطا در پردازش', {
        position: 'bottom-left'
      })
    })
  }

  // Label
  const getAddressMark = () => {
    if (addressMark) {
      deleteLabel()
    } else {
      setAddLabelModal(true)
    }
  }

  //delete label
  const deleteLabel = () => {
    setLoading(true)
    axios.delete(serverAddress + `/address-labels/label/${addressId}/`, 
    {
      headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
      }
    }
    )
    .then((response) => {
    setLoading(false)
    if (Number(response.status) >= 200 && Number(response.status) < 300) {
        SetAddressMark(false)
        SetAddressText('')
        SetAddressId('')
        setDeleteLabelModal(false)
      } else {
        return toast.error('خطا در پردازش', {
          position: 'bottom-left'
        })
      }
    })
    .catch((err) => {
    setLoading(false)
    console.log(err)
      return toast.error('خطا در پردازش', {
        position: 'bottom-left'
      })
    })
  }

  //add label
  const addNewLabel = () => {
    setLoading(true)
    axios.post(serverAddress + "/address-labels/label/", 
    {
      items:[
        {
          address: props.data.address,
          label:document.getElementById('CreateNewLabelInput').value,
          // network need set
          network:RecognizeNetwork(props.data.name)
        }
      ]
    },
    {
      headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
      }
    }
    )
    .then((response) => {
    setLoading(false)
    if (Number(response.status) >= 200 && Number(response.status) < 300) {
        SetAddressMark(true)
        SetAddressText(document.getElementById('CreateNewLabelInput').value)
        SetAddressId(response.data[0].id)
        setAddLabelModal(false)
      } else {
        return toast.error('خطا در پردازش', {
          position: 'bottom-left'
        })
      }
    })
    .catch((err) => {
    setLoading(false)
    console.log(err)
      return toast.error('خطا در پردازش', {
        position: 'bottom-left'
      })
    })
  }

  //show label
  useEffect(() => {
    const labelText = props.labelData.labelText
    const labelId = props.labelData.labelId
    if (labelText !== null && labelId !== null) {
      SetAddressMark(true)
      SetAddressText(labelText)
      SetAddressId(labelId)
    }

    const TagData = props.TagData
    if (TagData.isTag) {
      for (let i = 0; i < TagData.TagInfo.length; i++) {
        setTagValues(prevTags => [...prevTags, TagData.TagInfo[i].tagText])
        setTagId(prevTags => [...prevTags, TagData.TagInfo[i]])
      }
    }
    getTagList()
  }, [, props.labelData, props.TagData])

  const [LastTagSelected, SetLastTagSelected] = useState(false)
  const handleDelete = () => {
    SetLastTagSelected(false)
    setSelectedTag(false)
  }

  function formatNumber(num, index) {
    num = parseFloat(num.toFixed(index))
  
    const parts = num.toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  
    if (parts[1]) {
        parts[1] = parts[1].replace(/0+$/, '')
    }
  
    return parts.join(".")
  }

  const renderTransactions = () => {
    return (
      <div>
        <div className='row mt-3'>
          <div style={{float:"right"}} className='col-12'>
            <div  style={{textAlign:"left", float:"left"}}>
              <div style={{display:"inline-block"}} id='AddressTagIcons021'  onClick={() => { setAddTagModal(!AddTagModal) }}>
                <ion-icon style={{ borderRadius:"50%", zIndex:2, color:"black", marginRight:"0px", marginTop:"8px", background:MainSiteOrange, fontSize:"8px", cursor:"pointer", position:"absolute"}} name="add-outline"></ion-icon>
                <ion-icon style={{marginBottom:"-2px", cursor:"pointer", marginLeft:"2px"}} name="pricetag-outline"></ion-icon>
              </div>
              <UncontrolledTooltip placement='right' target='AddressTagIcons021'>
                افزودن تگ
              </UncontrolledTooltip>
              <ion-icon id="copyAddressTr" name="copy-outline" onClick={() => { navigator.clipboard.writeText(props.data.address) }} style={{marginLeft:"5px", marginBottom:"-3px", cursor:"pointer"}}></ion-icon>
              <UncontrolledTooltip placement='top' target="copyAddressTr">
                  کپی آدرس
                </UncontrolledTooltip>
              <NiceAddress2 text={props.data.address} number={8}/>
            </div>
            {
                  TagValues.map((item, index) => {
                    return (
                      index === 0 ?
                        <div style={{display:"inline-block", float:'right'}} onClick={ () => { setDeleteTagText(item), setDeleteTagModal(true) } }>
                          <div style={{display:"inline-block", marginRight:"0px", cursor:"pointer"}} id={`tag` + index}>
                            <small style={{background:"rgb(248,248,248)", padding:"1px 5px", borderRadius:"5px"}}><ion-icon style={{marginBottom:"-2px"}} name="ticket-outline"></ion-icon> {item}</small>
                          </div>
                          <UncontrolledTooltip placement='top' target={`tag` + index}>
                            حذف تگ
                          </UncontrolledTooltip>
                        </div>
                      :
                        <div style={{display:"inline-block", float:'right'}} onClick={ () => { setDeleteTagText(item), setDeleteTagModal(true) } }>
                          <div style={{display:"inline-block", marginRight:"5px", cursor:"pointer"}} id={`tag` + index}>
                            <small style={{background:"rgb(248,248,248)", padding:"1px 5px", borderRadius:"5px"}}><ion-icon style={{marginBottom:"-2px"}} name="ticket-outline"></ion-icon> {item}</small>
                          </div>
                          <UncontrolledTooltip placement='top' target={`tag` + index}>
                            حذف تگ
                          </UncontrolledTooltip>
                        </div>
                    )
                  })
              }
            </div>
          </div>

        <div className='row mt-3'>
          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'شماره بلاک'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.blockNumber)}
                <AlertOctagon size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>

          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'حجم تراکنش'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa((props.data.TotalAmount).toFixed(5))} {props.data.symbole}
                <Package size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-12'>
          <button href='/' onClick={ () => { window.location.assign(`/tracker/${States.networkName}/${props.data.address}`) } } className='cardLink225' id='cardLink15' style={{background:MainSiteOrange}}>
            انتقال به ردیابی <ion-icon name="git-compare-outline"></ion-icon>
          </button>
          <button href='/' onClick={e => e.preventDefault()} className='cardLink225' id='cardLink25' style={{background:MainSiteyellow}}>
            افزودن به پرونده <ion-icon name="alert-circle-outline"></ion-icon>
          </button>
          <UncontrolledTooltip placement='top' target={`cardLink25`}>
            در نسخه دمو قابل انجام نیست!
          </UncontrolledTooltip>
          </div>
        </div>

      </div>
    )
  }
  return (
    <>
      <Card className='card-transaction' id='leftCard1' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", height:"100%"}}>
        <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
          <CardTitle tag='h4' style={{width:"100%"}}>
          <img src={`../images/${props.data.image}`} style={{width:"25px"}}/> 
          تراکنش {props.data.name}  

          {
              !addressMark ? 
                <div style={{display:"inline-block"}} className='me-1' id='AddressTitleName021'>
                  <ion-icon  onClick={() => { getAddressMark() }} style={{marginBottom:"-7px", cursor:"pointer" }} name="bookmark-outline"></ion-icon>
                  <UncontrolledTooltip placement='left' target='AddressTitleName021'>
                    افزودن برچسب
                  </UncontrolledTooltip>
                </div>
              :
                <div style={{display:"inline-block"}} className='me-0' id='AddressTitleDeleteName021'>
                  <ion-icon  onClick={() => { setDeleteLabelModal(true) }} style={{marginBottom:"-7px", color:MainSiteOrange, cursor:"pointer"}} name="bookmark"></ion-icon>
                  <small style={{background:MainSiteyellow, fontSize:"12px", padding:"0px 3px", borderRadius:"5px"}}>{addressText}</small>
                  <UncontrolledTooltip placement='left' target='AddressTitleDeleteName021'>
                    حذف برچسب
                  </UncontrolledTooltip>
                </div>
            }

          </CardTitle>
        </CardHeader>
        <CardBody>{renderTransactions()}</CardBody>
      </Card>

      <Modal
        isOpen={AddTagModal}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => setAddTagModal(!AddTagModal)}
      >
        <ModalBody>
          <h6>تگ مورد نظر خود را وارد کنید یا از لیست زیر انتخاب کنید.</h6>
          <Label style={{display:'block'}}>تگ مورد نظر</Label>
          {
            !LastTagSelected ? 
            <Input id='CreateNewTagInput' />
            :
            <Chip label={SelectedTag} onDelete={handleDelete} style={{direction:'ltr'}} />
          }
          {
            TagList === false ? 
              <p>در حال دریافت اطلاعات...</p>
            :
            TagList.length === 0 ? 
              <p>بدون تگ ذخیره شده</p>
            :
              <>
                <p className='mt-3'>
                  لیست تگ های ذخیره شده
                </p>
                {
                  TagList.map((item, index) => {
                    return (
                      <div style={{ marginTop:'4px'}}>
                        <Chip label={item.tag} style={{direction:'ltr', cursor:'pointer'}} onClick={ () => { SetLastTagSelected(true), setSelectedTag(item.tag) } }/>
                      </div>
                    )
                  })
                }
              </>

          }
        </ModalBody>
        <ModalFooter>

          <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={ () => { setAddTagModal(false) } }>
            بسته
          </Button>
          <Button color={'warning'} style={{height:'37px', width:'80px'}} onClick={ () => { 
            if (LastTagSelected) {
              GetTag(SelectedTag)
            } else {
              GetTag(document.getElementById('CreateNewTagInput').value)
            }
            SetLastTagSelected(false)
            setAddTagModal(false) 
          } }>
            {
              Loading ? 
              <LoadingButton/>
              :
              <span>
            افزودن
              </span>
            }
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={AddLabelModal}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => setAddLabelModal(!AddLabelModal)}
      >
        <ModalBody>
          <h6>برچسب مورد نظر خود را وارد کنید.</h6>
          <Label style={{display:'block'}}>برچسب مورد نظر</Label>
          <Input id='CreateNewLabelInput' />
        </ModalBody>
        <ModalFooter>

          <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={ () => { setAddLabelModal(false) } }>
            بسته
          </Button>
          <Button color={'warning'} style={{height:'37px', width:'80px'}} onClick={ () => { addNewLabel() } }>
            {
              Loading ? 
              <LoadingButton/>
              :
              <span>
            افزودن
              </span>
            }
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={DeleteLabelModal}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => setDeleteLabelModal(!DeleteLabelModal)}
      >
        <ModalBody>
          <h6>آیا اطمینان دارید که می‌خواهید برچسب مورد نظر را حذف کنید؟</h6>
        </ModalBody>
        <ModalFooter>

          <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={ () => { setDeleteLabelModal(false) } }>
            بسته
          </Button>
          <Button color={'warning'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteLabel() } }>
          {
              Loading ? 
              <LoadingButton/>
              :
              <span>
                حذف
              </span>
            }
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={DeleteTagModal}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => setDeleteTagModal(!DeleteTagModal)}
      >
        <ModalBody>
          <h6>آیا اطمینان دارید که می‌خواهید تگ مورد نظر را حذف کنید؟</h6>
        </ModalBody>
        <ModalFooter>

          <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={ () => { setDeleteTagModal(false) } }>
            بسته
          </Button>
          <Button color={'warning'} style={{height:'37px', width:'80px'}} onClick={ () => { DeleteTag() } }>
            {
              Loading ? 
              <LoadingButton/>
              :
              <span>
                حذف
              </span>
            }
          </Button>
        </ModalFooter>
      </Modal>
    </>

  )
}

export default CardContentTypes
