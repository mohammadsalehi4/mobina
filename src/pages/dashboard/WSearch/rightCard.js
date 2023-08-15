/* eslint-disable prefer-template */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import NiceAddress2 from '../../../components/niceAddress2/niceAddress'
import './walletdetail.css'
import {
  Card,
  CardTitle,
  UncontrolledTooltip,
  CardHeader,
  CardBody
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

  //add new tag
  const GetTag = () => {
    const userInput = prompt('تگ مورد نظر را وارد کنید:')
    if (userInput) {
      setTagValues(prevTags => [...prevTags, userInput])
    }
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

  const renderTransactions = () => {
    return (
      <div className='rightCard1 m-0'>
        <div className='row mt-3'>
          <div style={{float:"right"}} className='col-12'>
            <div style={{textAlign:"left", float:"left"}}>
              <div style={{display:"inline-block"}} onClick={GetTag}>
                <ion-icon style={{ borderRadius:"50%", zIndex:2, color:"black", marginRight:"0px", marginTop:"8px", background:MainSiteOrange, fontSize:"8px", cursor:"pointer", position:"absolute"}} name="add-outline"></ion-icon>
                <ion-icon style={{marginBottom:"-2px", cursor:"pointer", marginLeft:"2px"}} name="pricetag-outline"></ion-icon>
              </div>
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
                      <div style={{display:"inline-block"}}>
                        <div style={{display:"inline-block", marginRight:"0px", cursor:"pointer"}} id={`tag` + index}>
                          <small style={{background:"rgb(248,248,248)", padding:"1px 5px", borderRadius:"5px"}}><ion-icon style={{marginBottom:"-2px"}} name="ticket-outline"></ion-icon> {item}</small>
                        </div>
                        <UncontrolledTooltip placement='top' target={`tag` + index}>
                          در نسخه دمو قابل انجام نیست!
                        </UncontrolledTooltip>
                      </div>
                    :
                      <div style={{display:"inline-block"}}>
                        <div style={{display:"inline-block", marginRight:"5px", cursor:"pointer"}} id={`tag` + index}>
                          <small style={{background:"rgb(248,248,248)", padding:"1px 5px", borderRadius:"5px"}}><ion-icon style={{marginBottom:"-2px"}} name="ticket-outline"></ion-icon> {item}</small>
                        </div>
                        <UncontrolledTooltip placement='top' target={`tag` + index}>
                          در نسخه دمو قابل انجام نیست!
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
              {
                !ownerMark ? 
                  <div style={{display:"inline-block", cursor:"pointer"}} className='me-1'>
                    <ion-icon onClick={() => { getOwnerMark() }} style={{marginBottom:"-4px" }} name="bookmark-outline"></ion-icon>
                  </div>
                :
                  <div style={{display:"inline-block"}} className='me-2'>
                    <ion-icon onClick={() => { getOwnerMark() }} style={{marginBottom:"-4px", color:MainSiteOrange}} name="bookmark"></ion-icon>
                    <small style={{background:MainSiteyellow, fontSize:"10px", padding:"0px 3px", borderRadius:"5px"}}>{ownerText}</small>
                  </div>
              }
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
          <button href='/' onClick={e => e.preventDefault()} className='cardLink' id='cardLink1' style={{background:MainSiteOrange}}>
            انتقال به ردیابی <ion-icon name="git-compare-outline"></ion-icon>
          </button>
          <button href='/' onClick={e => e.preventDefault()} className='cardLink' id='cardLink2' style={{background:MainSiteyellow}}>
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
      </div>
    )
  }

  return (
    <Card className='card-transaction' id='rightCard1' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
        <CardTitle tag='h4' style={{width:"100%", boxSizing:"border-box"}}>
          آدرس {props.data.name}
          {
            !addressMark ? 
              <div style={{display:"inline-block"}} className='me-1'>
                <ion-icon onClick={() => { getAddressMark() }} style={{marginBottom:"-7px", cursor:"pointer" }} name="bookmark-outline"></ion-icon>
              </div>
            :
              <div style={{display:"inline-block"}} className='me-0'>
                <ion-icon  onClick={() => { getAddressMark() }} style={{marginBottom:"-7px", color:MainSiteOrange, cursor:"pointer"}} name="bookmark"></ion-icon>
                <small style={{background:MainSiteyellow, fontSize:"12px", padding:"0px 3px", borderRadius:"5px"}}>{addressText}</small>
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
