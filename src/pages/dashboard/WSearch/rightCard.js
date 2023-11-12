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
  CardBody
} from 'reactstrap'
import { MainSiteOrange, MainSiteyellow } from '../../../../public/colors'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { RecognizeNetwork } from '../../../processors/recognizeNetwork'

const CardContentTypes = (props) => {
  //barchasb ha
  const [addressMark, SetAddressMark] = useState(false)
  const [addressText, SetAddressText] = useState('')
  const [addressId, SetAddressId] = useState('')

  //tag
  const [TagValues, setTagValues] = useState([])
  const [TagId, setTagId] = useState([])

  //add new tag
  const GetTag = () => {
    const userInput = prompt('تگ مورد نظر را وارد کنید:')
    if (userInput) {
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
          return toast.error('خطا در پردازش', {
            position: 'bottom-left'
          })
        }
      })
      .catch((err) => {
        console.log(err)
        return toast.error('خطا در پردازش', {
          position: 'bottom-left'
        })
      })
    }
  }

  //delete tag
  const DeleteTag = (name) => {

    let getTagValues = TagValues
    let getTagId = TagId
    
    const thisTag = getTagId.filter(element => element.tagText === name)[0]
    axios.delete(serverAddress + `/address-labels/tag/${thisTag.tagId}/`, 
    {
      headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
      }
    }
    )
    .then((response) => {
      if (Number(response.status) >= 200 && Number(response.status) < 300) {

        getTagValues = getTagValues.filter(element => element !== name)
        getTagId = getTagId.filter(element => element.tagText !== name)
    
        setTagValues(getTagValues)
        setTagId(getTagId)
      } else {
        return toast.error('خطا در پردازش', {
          position: 'bottom-left'
        })
      }
    })
    .catch((err) => {
      console.log(err)
      return toast.error('خطا در پردازش', {
        position: 'bottom-left'
      })
    })
  }

  // Label
  const getAddressMark = () => {
    if (addressMark) {
      axios.delete(serverAddress + `/address-labels/label/${addressId}/`, 
      {
        headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
        }
      }
      )
      .then((response) => {
        if (Number(response.status) >= 200 && Number(response.status) < 300) {
          SetAddressMark(false)
          SetAddressText('')
          SetAddressId('')
        } else {
          return toast.error('خطا در پردازش', {
            position: 'bottom-left'
          })
        }
      })
      .catch((err) => {
        console.log(err)
        return toast.error('خطا در پردازش', {
          position: 'bottom-left'
        })
      })
    } else {
      const userInput = prompt('برچسب مورد نظر را وارد کنید:')
      if (userInput) {
        axios.post(serverAddress + "/address-labels/label/", 
        {
          items:[
            {
              address: props.data.address,
              label: userInput,
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
          if (Number(response.status) >= 200 && Number(response.status) < 300) {
            SetAddressMark(true)
            SetAddressText(userInput)
            SetAddressId(response.data[0].id)
          } else {
            return toast.error('خطا در پردازش', {
              position: 'bottom-left'
            })
          }
        })
        .catch((err) => {
          console.log(err)
          return toast.error('خطا در پردازش', {
            position: 'bottom-left'
          })
        })
      }
    }
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
  }, [, props.labelData, props.TagData])


  const renderTransactions = () => {
    return (

      <div className='rightCard1 m-0'>
        <div className='row mt-3'>
          <div style={{float:"right"}} className='col-12'>
            <div style={{textAlign:"left", float:"left"}}>
              <div style={{display:"inline-block"}} id='AddressTagIcons021' onClick={GetTag}>
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
                      <div style={{display:"inline-block", float:'right'}} onClick={ () => { DeleteTag(item) } }>
                        <div style={{display:"inline-block", marginRight:"0px", cursor:"pointer"}} id={`tag` + index}>
                          <small style={{background:"rgb(248,248,248)", padding:"1px 5px", borderRadius:"5px"}}><ion-icon style={{marginBottom:"-2px"}} name="ticket-outline"></ion-icon> {item}</small>
                        </div>
                        <UncontrolledTooltip placement='top' target={`tag` + index}>
                          حذف تگ
                        </UncontrolledTooltip>
                      </div>
                    :
                      <div style={{display:"inline-block", float:'right'}} onClick={ () => { DeleteTag(item) } }>
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
          <button onClick={() => (window.location.assign(`/tracker/${props.data.address}`))} className='cardLink22' id='cardLink1' style={{background:MainSiteOrange, fontSize:'13px'}}>
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


  return (

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
                <ion-icon  onClick={() => { getAddressMark() }} style={{marginBottom:"-7px", color:MainSiteOrange, cursor:"pointer"}} name="bookmark"></ion-icon>
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
  )
}

export default CardContentTypes
