/* eslint-disable multiline-ternary */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { digitsEnToFa } from 'persian-tools'
import NiceAddress2 from '../../../../components/niceAddress2/niceAddress'
import {ArrowDownCircle, ArrowUpCircle, AlertOctagon, Calendar} from 'react-feather'
import { serverAddress } from '../../../../address'
import { RecognizeNetwork } from '../../../../processors/recognizeNetwork'
import Cookies from 'js-cookie'
import axios from 'axios'
import './transactiondetail.css'
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  UncontrolledTooltip
} from 'reactstrap'
import { MainSiteOrange, MainSiteyellow } from '../../../../../public/colors'

// ** Images

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
    console.log(thisTag)
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
      <div>
        <div className='row mt-3'>
          <div style={{float:"right"}} className='col-12'>
            <div  style={{textAlign:"left", float:"left"}}>
              <div style={{display:"inline-block"}} id='AddressTagIcons021' onClick={GetTag}>
                <ion-icon style={{ borderRadius:"50%", zIndex:2, color:"black", marginRight:"0px", marginTop:"8px", background:MainSiteOrange, fontSize:"8px", cursor:"pointer", position:"absolute"}} name="add-outline"></ion-icon>
                <ion-icon style={{marginBottom:"-2px", cursor:"pointer", marginLeft:"2px"}} name="pricetag-outline"></ion-icon>
              </div>
              <UncontrolledTooltip placement='right' target='AddressTagIcons021'>
                افزودن تگ
              </UncontrolledTooltip>
              <ion-icon id="copyAddressTr" name="copy-outline" style={{marginLeft:"5px", marginBottom:"-3px", cursor:"pointer"}}></ion-icon>
              <UncontrolledTooltip placement='top' target="copyAddressTr">
                  کپی آدرس
                </UncontrolledTooltip>
              <NiceAddress2 text={props.data.address} number={8}/>
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
          <div className='col-12'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'شماره بلاک'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.blockNumber)}
                <AlertOctagon size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>


        <div className='row mt-3'>
          <div className='col-12'>
          <button href='/' onClick={ () => { window.location.assign(`/tracker/${props.data.address}`) } } className='cardLink225' id='cardLink15' style={{background:MainSiteOrange}}>
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
    <Card className='card-transaction' id='leftCard1' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", height:"100%"}}>
      <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
        <CardTitle tag='h4' style={{width:"100%"}}>
        <img src={`../images/${props.data.image}`} style={{width:"25px"}}/> 
        تراکنش {props.data.name}  

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

        </CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardContentTypes
