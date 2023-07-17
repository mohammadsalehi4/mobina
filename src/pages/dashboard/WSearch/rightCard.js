/* eslint-disable prefer-template */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import NiceAddress2 from '../../../components/niceAddress2/niceAddress'
import './walletdetail.css'
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle
} from 'reactstrap'
import { MainSiteGreen, MainSiteOrange, MainSiteRed, MainSiteyellow } from '../../../../public/colors'

// ** Images

const CardContentTypes = (props) => {
  const [isCleared, setIsCleared] = useState(false)
  const [change, setIschange] = useState(false)

  const [inputValue, setInputValue] = useState(['تگ اول', 'تگ دوم'])
  const [showValue, setshowValue] = useState([])

  const handleClick = () => {
    const userInput = prompt('تگ مورد نظر را وارد کنید:')
    const a = inputValue
    a.push(userInput)
    setInputValue(a)
    console.log(inputValue)
    console.log(inputValue.length)
  }

  useEffect(() => {
    setshowValue(inputValue)
    setIschange(!change)
  }, [, inputValue])

  return (
    <Fragment>
          <Card className='mt-4 mb-1 p-3' id='rightCard1'>
              <CardTitle tag='h4'>
                آدرس ترون
                {
                  !isCleared ? 
                    <div style={{display:"inline-block", cursor:"pointer"}} className='me-2'>
                      <ion-icon onClick={() => { setIsCleared(true) }} style={{marginBottom:"-7px" }} name="bookmark-outline"></ion-icon>
                    </div>
                  :
                    <div style={{display:"inline-block"}} className='me-2'>
                      <ion-icon style={{marginBottom:"-7px", color:MainSiteOrange}} name="bookmark"></ion-icon>
                      <small style={{background:MainSiteyellow, fontSize:"12px", padding:"0px 3px", borderRadius:"5px"}}>برچسب اول</small>
                    </div>
                }
                <div style={{float:"left"}} title={"ریسک"}>
                  <span style={{fontSize:"24px"}}>100%</span>
                  <ion-icon style={{color:"red"}} name="flash"></ion-icon>
                </div>
              </CardTitle>

              <div className='text-muted mb-1' style={{float:"left", display:"inline-block"}} >
                <div style={{float:"left"}}>
                  <div style={{display:"inline-block"}} onClick={handleClick}>
                    <ion-icon style={{ borderRadius:"50%", zIndex:2, color:"black", marginRight:"0px", marginTop:"8px", background:MainSiteOrange, fontSize:"8px", cursor:"pointer", position:"absolute"}} name="add-outline"></ion-icon>
                    <ion-icon style={{marginBottom:"-2px", cursor:"pointer", marginLeft:"2px"}} name="pricetag-outline"></ion-icon>
                  </div>
                  <ion-icon title={"کپی"} name="copy-outline" style={{marginBottom:"-2px", cursor:"pointer", marginLeft:"2px"}}></ion-icon>
                  <NiceAddress2 text={props.data.address} title={props.data.address} number={7}/>
                </div>
                <div style={{float:"right"}}>
                  {
                      showValue.map((item, index) => {
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
                  !isCleared ? 
                    <div style={{display:"inline-block", cursor:"pointer"}} className='me-2'>
                      <ion-icon onClick={() => { setIsCleared(true) }} style={{marginBottom:"-4px" }} name="bookmark-outline"></ion-icon>
                    </div>
                  :
                    <div style={{display:"inline-block"}} className='me-2'>
                      <ion-icon style={{marginBottom:"-4px", color:MainSiteOrange}} name="bookmark"></ion-icon>
                      <small style={{background:MainSiteyellow, fontSize:"10px", padding:"0px 3px", borderRadius:"5px"}}>برچسب دوم</small>
                    </div>
                }
                <span style={{float:"left"}}>NBCTF: ASO - 29/23<ion-icon name="information-circle-outline" style={{marginBottom:"-6px", marginRight:"3px", fontSize:"18px"}}></ion-icon></span>
              </div>
              <div className="">
                <h6 style={{display:"inline-block"}}>نوع:</h6>
                <span style={{float:"left", fontSize:"13px"}}>کیف پول تحریمی</span>
              </div>
              <div className="">
                <h6 style={{display:"inline-block"}}>وبسایت:</h6>
                <span style={{float:"left", fontSize:"13px"}}><a>___________</a></span>
              </div>
              <div className='mt-1'>
                <button href='/' onClick={e => e.preventDefault()} id='cardLink' style={{borderColor:MainSiteOrange}} className='cardLink1'>
                  انتقال به ردیابی <ion-icon name="git-compare-outline"></ion-icon>
                </button>
                <button href='/' onClick={e => e.preventDefault()} id='cardLink' style={{borderColor:MainSiteOrange}} className='cardLink2'>
                  افزودن به پرونده <ion-icon name="alert-circle-outline"></ion-icon>
                </button>
              </div>

          </Card>
    </Fragment>
  )
}

export default CardContentTypes
