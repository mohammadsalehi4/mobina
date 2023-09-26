/* eslint-disable multiline-ternary */
import './transactiondetail.css'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Switch from '../switch/switch'
import { digitsEnToFa } from 'persian-tools'
import { useSelector } from "react-redux"
import {ArrowDownCircle, ArrowUpCircle, AlertOctagon, Calendar} from 'react-feather'
import moment from 'jalali-moment'

function formatNumber(num, index) {
  // اول: تا حداکثر 5 رقم اعشار
  num = parseFloat(num.toFixed(index))

  // دوم: برای افزودن ویرگول به اعداد بزرگتر از 1000
  const parts = num.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  // سوم: حذف اعداد 0 از انتهای قسمت اعشار
  if (parts[1]) {
      parts[1] = parts[1].replace(/0+$/, '')
  }

  return parts.join(".")
}

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

const CardTransactions = (props) => {
  const renderTransactions = () => {
    const States = useSelector(state => state)
    return (
      <div>

        <div className='row mt-3'>
          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'کارمزد'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(`${String(parseFloat(Number(props.data.fee).toFixed(5)).toString())} `)}
                <small>{props.data.symbole}</small>
                <AlertOctagon size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px'}} className={` col-6`}>
          <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'زمان بلاک'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(`${moment(`${getMyTime(props.data.BlockDate).year}-${getMyTime(props.data.BlockDate).month}-${getMyTime(props.data.BlockDate).day}`, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')} - ${getMyTime(props.data.BlockDate).hour}:${getMyTime(props.data.BlockDate).minute}`)}
                {/* {digitsEnToFa(`${`${getMyTime(props.data.BlockDate).year}/${getMyTime(props.data.BlockDate).month}/${getMyTime(props.data.BlockDate).day}`}`)} */}
                <Calendar size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'مجموع ورودی'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                  {digitsEnToFa(formatNumber(Number(props.data.TotalInput), 5))}
                  <small style={{fontSize:"13px"}}> USD</small>  
                <ArrowDownCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px'}} className={` col-6`}>
            <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'مجموع خروجی'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                  {digitsEnToFa(formatNumber(Number(props.data.TotalInput), 5))}
                  <small style={{fontSize:"13px"}}> USD</small>  
                <ArrowUpCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>
      </div>
    )
  }

  return (
      <Card className='card-transaction' id='leftCard1' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", minHeight:"100%"}}>
        <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
          <CardTitle tag='h4' style={{width:"100%"}}>
            جزئیات
          </CardTitle>
        </CardHeader>
        <CardBody>{renderTransactions()}</CardBody>
      </Card>
  )
}

export default CardTransactions
