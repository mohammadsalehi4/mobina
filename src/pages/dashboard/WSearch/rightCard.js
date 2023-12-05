/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-template */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect, useRef } from 'react'
import NiceAddress2 from '../../../components/niceAddress2/niceAddress'
import { serverAddress } from '../../../address'
import axios from 'axios'
import './walletdetail.css'
import {
  Card,
  CardTitle,
  UncontrolledTooltip,
  CardHeader,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label
} from 'reactstrap'
import { XCircle } from 'react-feather'
import { MainSiteOrange, MainSiteyellow } from '../../../../public/colors'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { RecognizeNetwork } from '../../../processors/recognizeNetwork'
import Chip from '@mui/material/Chip'
import LoadingButton from '../../../components/loadinButton/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'

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


  const renderTransactions = () => {
    return (

      <div className='rightCard1 m-0'>
        <div className='row mt-3'>
          <div style={{float:"right"}} className='col-12'>
            <div style={{textAlign:"left", float:"left"}}>
              <div style={{display:"inline-block"}} id='AddressTagIcons021' onClick={() => { setAddTagModal(!AddTagModal) }}>
                <ion-icon style={{ borderRadius:"50%", zIndex:2, color:"black", marginRight:"0px", marginTop:"8px", background:MainSiteOrange, fontSize:"8px", cursor:"pointer", position:"absolute"}} name="add-outline"></ion-icon>
                <ion-icon style={{marginBottom:"-2px", cursor:"pointer", marginLeft:"2px"}} name="pricetag-outline"></ion-icon>
              </div>
              <UncontrolledTooltip placement='right' target='AddressTagIcons021'>
                افزودن تگ
              </UncontrolledTooltip>
              <ion-icon id="copyIcon" name="copy-outline" onClick={() => { navigator.clipboard.writeText(props.data.address) }} style={{marginBottom:"-2px", cursor:"pointer", marginLeft:"2px"}}></ion-icon>
              <UncontrolledTooltip placement='top' target='copyIcon'>
                کپی آدرس
              </UncontrolledTooltip>
              <NiceAddress2 text={props.data.address} title={props.data.address} number={7}/>
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
          <div className='col-12' style={{float:"right"}}>
              <h6 style={{display:"inline-block", marginBottom:"5px"}}>مالک:</h6>
            <div style={{textAlign:"left", float:"left"}}>
              <span style={{}}>
                {props.data.owner}
              </span>
            </div>
          </div>

        </div>

        <div className='row mt-2'>
          <div className="col-4">
            <div>
              <h6 style={{display:"inline-block", marginBottom:"5px"}}>نوع:</h6>
            </div>
            </div>
          <div className='col-8' style={{textAlign:"left"}}>
            <span style={{}}>
              {props.data.ownerMode}
            </span>
          </div>
        </div>

        <div className='row mt-2'>
          <div className="col-4">
            <div>
              <h6 style={{display:"inline-block", marginBottom:"5px"}}>آدرس:</h6>
            </div>
            </div>
          <div className='col-8' style={{textAlign:"left"}}>
            <span style={{}}>
              {props.data.website}
            </span>
          </div>
        </div>
        
        <div style={{marginTop:"4px"}}>
          <button onClick={() => (window.location.assign(`/tracker/${States.networkName}/${props.data.address}`))} className='cardLink22' id='cardLink1' style={{background:MainSiteOrange, fontSize:'13px'}}>
            انتقال به ردیابی <ion-icon name="git-compare-outline"></ion-icon>
          </button>
          <button href='/' onClick={e => e.preventDefault()} className='cardLink22' id='cardLink2' style={{background:MainSiteyellow, fontSize:'13px'}}>
            افزودن به پرونده <ion-icon name="alert-circle-outline"></ion-icon>
          </button>
          
          <UncontrolledTooltip placement='top' target='cardLink2'>
            در نسخه دمو قابل انجام نیست!
          </UncontrolledTooltip>
        </div>
      </div>
    )
  }

  const [LastTagSelected, SetLastTagSelected] = useState(false)
  const handleDelete = () => {
    SetLastTagSelected(false)
    setSelectedTag(false)
  }
  return (
    <>
      <Card className='card-transaction' id='rightCard1' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
          <CardTitle tag='h4' style={{width:"100%", boxSizing:"border-box"}} >
            <span >آدرس</span> {props.data.name}

            {
              !addressMark ? 
                <div style={{display:"inline-block"}} className='me-1' id='AddressTitleName021'>
                  <ion-icon onClick={() => { getAddressMark() }} style={{marginBottom:"-7px", cursor:"pointer" }} name="bookmark-outline"></ion-icon>
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


            <span style={{float:"left"}} title={"ریسک"}>
              <span>{props.data.risk}</span>
              <ion-icon style={{color:"green", fontSize:"16px"}}  name="flash"></ion-icon>
            </span>
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
