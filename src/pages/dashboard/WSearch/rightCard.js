/* eslint-disable prefer-template */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import NiceAddress2 from '../../../components/niceAddress2/niceAddress'
import './walletdetail.css'
import {
  Card,
  CardTitle,
  UncontrolledTooltip
} from 'reactstrap'
import { MainSiteOrange, MainSiteyellow } from '../../../../public/colors'

const CardContentTypes = (props) => {
  
  //barchasb ha
  const [ownerMark, setOwnerMark] = useState(false)
  const [ownerText, setOwnerText] = useState('')
  const [addressMark, SetAddressMark] = useState(false)
  const [addressText, SetAddressText] = useState('')

  //tag
  const [TagValues, setTagValues] = useState([])

  //messages

  //add new tag
  const GetTag = () => {
    const userInput = prompt('تگ مورد نظر را وارد کنید:')
    setTagValues(prevTags => [...prevTags, userInput])
    console.log(TagValues)
  }

  //set address mark
  const getAddressMark = () => {
    if (addressMark) {
      SetAddressMark(false)
      SetAddressText('')
    } else {
      const userInput = prompt('برچسب مورد نظر را وارد کنید:')
      if (userInput) {
        SetAddressMark(true)
        SetAddressText(userInput)
      }
    }
  }

  //set owner mark
  const getOwnerMark = () => {
    if (ownerMark) {
      setOwnerMark(false)
      setOwnerText('')
    } else {
      const userInput = prompt('برچسب مورد نظر را وارد کنید:')
      if (userInput) {
        setOwnerMark(true)
        setOwnerText(userInput)
      }
    }
  }

  return (
    <Fragment>
          <Card className='mt-4 mb-1 p-3' id='rightCard1'>
              <CardTitle tag='h4'>
                آدرس {props.data.name}
                {
                  !addressMark ? 
                    <div style={{display:"inline-block"}} className='me-2'>
                      <ion-icon onClick={() => { getAddressMark() }} style={{marginBottom:"-7px", cursor:"pointer" }} name="bookmark-outline"></ion-icon>
                    </div>
                  :
                    <div style={{display:"inline-block"}} className='me-2'>
                      <ion-icon  onClick={() => { getAddressMark() }} style={{marginBottom:"-7px", color:MainSiteOrange, cursor:"pointer"}} name="bookmark"></ion-icon>
                      <small style={{background:MainSiteyellow, fontSize:"12px", padding:"0px 3px", borderRadius:"5px"}}>{addressText}</small>
                    </div>
                }
                <div style={{float:"left"}} title={"ریسک"}>
                  <span style={{fontSize:"24px"}}>{props.data.risk}</span>
                  <ion-icon style={{color:"green"}} name="flash"></ion-icon>
                </div>
              </CardTitle>

              <div className='text-muted mb-1' style={{float:"left", display:"inline-block"}} >
                <div style={{float:"left"}}>
                  <div style={{display:"inline-block"}} onClick={GetTag}>
                    <ion-icon style={{ borderRadius:"50%", zIndex:2, color:"black", marginRight:"0px", marginTop:"8px", background:MainSiteOrange, fontSize:"8px", cursor:"pointer", position:"absolute"}} name="add-outline"></ion-icon>
                    <ion-icon style={{marginBottom:"-2px", cursor:"pointer", marginLeft:"2px"}} name="pricetag-outline"></ion-icon>
                  </div>
                  <ion-icon title={"کپی"} name="copy-outline" style={{marginBottom:"-2px", cursor:"pointer", marginLeft:"2px"}}></ion-icon>
                  <NiceAddress2 text={props.data.address} title={props.data.address} number={7}/>
                </div>
                <div style={{float:"right"}}>
                  {
                      TagValues.map((item, index) => {
                        return (
                          index === 0 ?
                            <div style={{display:"inline-block", marginRight:"0px"}}>
                              <small style={{background:"white", padding:"1px 5px", borderRadius:"5px"}}><ion-icon style={{marginBottom:"-2px"}} name="ticket-outline"></ion-icon> {item}</small>
                            </div>
                          :
                            <div style={{display:"inline-block", marginRight:"5px"}}>
                              <small style={{background:"white", padding:"1px 5px", borderRadius:"5px"}}><ion-icon style={{marginBottom:"-2px"}} name="ticket-outline"></ion-icon> {item}</small>
                            </div>
                        )
                      })
                  }
                </div>
              </div>

              <div className="mt-1">
                <h6 style={{display:"inline-block"}}>مالک:</h6>
                {
                  !ownerMark ? 
                    <div style={{display:"inline-block", cursor:"pointer"}} className='me-2'>
                      <ion-icon onClick={() => { getOwnerMark() }} style={{marginBottom:"-4px" }} name="bookmark-outline"></ion-icon>
                    </div>
                  :
                    <div style={{display:"inline-block"}} className='me-2'>
                      <ion-icon onClick={() => { getOwnerMark() }} style={{marginBottom:"-4px", color:MainSiteOrange}} name="bookmark"></ion-icon>
                      <small style={{background:MainSiteyellow, fontSize:"10px", padding:"0px 3px", borderRadius:"5px"}}>{ownerText}</small>
                    </div>
                }
                <span style={{float:"left"}}>{props.data.owner}<ion-icon name="information-circle-outline" style={{marginBottom:"-6px", marginRight:"3px", fontSize:"18px"}}></ion-icon></span>
              </div>
              <div className="">
                <h6 style={{display:"inline-block"}}>نوع:</h6>
                <span style={{float:"left", fontSize:"13px"}}>{props.data.ownerMode}</span>
              </div>
              <div className="">
                <h6 style={{display:"inline-block"}}>وبسایت:</h6>
                <span style={{float:"left", fontSize:"13px"}}><a>{props.data.website}</a></span>
              </div>
              <div className='mt-1'>
                <button href='/' onClick={e => e.preventDefault()} className='cardLink' style={{borderColor:MainSiteOrange}} id='cardLink1'>
                  انتقال به ردیابی <ion-icon name="git-compare-outline"></ion-icon>
                </button>
                <button href='/' onClick={e => e.preventDefault()} className='cardLink' style={{borderColor:MainSiteOrange}} id='cardLink2'>
                  افزودن به پرونده <ion-icon name="alert-circle-outline"></ion-icon>
                </button>
                
                {/* movaghati baraye noskhe demo */}
                <UncontrolledTooltip placement='top' target='cardLink1'>
                  در نسخه دمو قابل انجام نیست!
                </UncontrolledTooltip>
                <UncontrolledTooltip placement='top' target='cardLink2'>
                  در نسخه دمو قابل انجام نیست!
                </UncontrolledTooltip>
              </div>
          </Card>
    </Fragment>
  )
}

export default CardContentTypes
