/* eslint-disable prefer-template */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import './walletdetail.css'
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle
} from 'reactstrap'
import { MainSiteGreen, MainSiteOrange, MainSiteRed, MainSiteyellow } from '../../../public/colors'

// ** Images

const OwnerTopBox = (props) => {
  const [isCleared, setIsCleared] = useState(false)
  const [change, setIschange] = useState(false)

  const [inputValue, setInputValue] = useState([])
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
          <Card className='mt-4 mb-1 p-3' id='OwnerTopBox'>
              <CardTitle tag='h4'>
                موجودیت
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

              </CardTitle>

              <div className='text-muted mb-1' style={{float:"left", display:"inline-block"}} >
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
                <h6 style={{display:"inline-block"}}>{props.data.owner}</h6>
                
                <span style={{float:"left"}}>
                  <div style={{float:"left"}} title={"ریسک"}>
                    <span style={{fontSize:"24px"}}>{props.data.risk}</span>
                    <ion-icon style={{color:"green"}} name="flash"></ion-icon>
                  </div>
                </span>
              </div>
              <div className="">
                <h6 style={{display:"inline-block", background:"rgb(210,210,210)", padding:"8px 16px", borderRadius:"8px", cursor:"pointer"}}>مشاهده در کتابچه</h6>
              </div>
              <div className="" style={{marginTop:"-10px"}}>
                <h6 style={{display:"inline-block"}}>نوع</h6>
              </div>
              <div className="" style={{marginTop:"-10px"}}>
                <p style={{display:"inline-block"}}>دیگر</p>
              </div>
              <div className="" style={{marginTop:"-10px"}}>
                <small style={{display:"inline-block"}}>سرویس غیر متمرکز</small>
              </div>

              <div className='mt-1'>
                <button href='/' onClick={e => e.preventDefault()} id='cardLink' style={{borderColor:MainSiteOrange}} className='cardLink1'>
                  انتقال به ردیابی <ion-icon name="git-compare-outline"></ion-icon>
                </button>

              </div>

          </Card>
    </Fragment>
  )
}

export default OwnerTopBox
