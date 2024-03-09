/* eslint-disable no-unused-vars */
/* eslint-disable arrow-spacing */
import './walletdetail.css'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { digitsEnToFa } from 'persian-tools'
import {CornerLeftDown, CornerUpRight, Crop, CreditCard, Circle, Aperture} from 'react-feather'
import CalendarSwitch from '../../../components/dashboard/switch/switch'
import { useEffect, useState } from 'react'
import moment from 'jalali-moment'
import { useSelector, useDispatch } from "react-redux"

function countSpecificObjects(array, key, value) {
  return array.filter(item => item[key] === value).length
}

const CardTransactions = (props) => {
  const States = useSelector(state => state)

  const [FirstActivity, SetFirstActivity] = useState(0)
  const [LastActivity, SetLastActivity] = useState(0)
  
  const [FirstTime, SetFirstTime] = useState(0)
  const [LastTime, SetLastTime] = useState(0)

  //find first and last activity
  useEffect(()=>{
    if (props.transactions.length > 0) {
      let first = props.transactions[0].Date
      let last = props.transactions[0].Date
      for (let i = 0; i < props.transactions.length; i++) {
        if (props.transactions[i].Date < first) {
          first = props.transactions[i].Date
        }
  
        if (props.transactions[i].Date > last) {
          last = props.transactions[i].Date
        }
      }
      SetFirstActivity(first)
      SetLastActivity(last)
    }
  }, [, props.transactions])

  function getMyTime(millis) {
    const date = new Date(millis * 1000)
  
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return {
      year,
      month,
      day,
      hour,
      minute,
      second
    }
  }

  //tabdil zaman be taarikh
  useEffect(() => {
    const first = `${getMyTime(FirstActivity).year}/${Number(getMyTime(FirstActivity).month)}/${getMyTime(FirstActivity).day}`
    const last = `${getMyTime(LastActivity).year}/${Number(getMyTime(LastActivity).month)}/${getMyTime(LastActivity).day}`
    if (States.jalaliCalendar) {
      SetFirstTime(moment(first, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
      SetLastTime(moment(last, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
    } else {
      SetFirstTime(first)
      SetLastTime(last)
    }
  }, [FirstActivity, LastActivity, States.jalaliCalendar])

  const renderTransactions = () => {
    return (
      <div className=''>
        <div className='row mt-2'>
          <div className='col-6' style={{textAlign:'right'}}>
              <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'ارسال شده'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.OutCome)}
                <small> {props.data.symbole}</small>
                <CornerUpRight size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px', textAlign:'right'}} className={` col-6`}>
            <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'دریافت شده'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.InCome)}
                <small> {props.data.symbole}</small>
                <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

        <div className='row mt-2'>
          <div className='col-6' style={{textAlign:'right'}}>
              <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'موجودی'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.Total)}
                <small> {props.data.symbole}</small>
                <Crop size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px", transform:"rotate(90deg)"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px', textAlign:'right'}} className={` col-6`}>
              <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'تعداد تراکنش'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(
                  countSpecificObjects(props.transactions, 'Type', 'coin')
                )}
                <CreditCard size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

        <div className='row mt-2'>
          <div className='col-6' style={{textAlign:'right'}}>
              <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'اولین فعالیت'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(FirstTime)}
                <Circle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px', textAlign:'right'}} className={` col-6`}>
              <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'آخرین فعالیت'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(LastTime)}
                <Aperture size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>
      </div>

    )
  }

  return (
    <Card className='card-transaction  m-0' id='leftCard1' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", height:"100%"}}>
      <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
        <CardTitle tag='h4'>
          جزئیات
        </CardTitle>
        <CalendarSwitch options={['میلادی', 'شمسی']} color={props.data.color}/>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
