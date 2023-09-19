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
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'شماره بلاک'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.blockNumber)}
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
                {
                  States.TransactionDetailCurrencyMode === 0 ?
                  digitsEnToFa(formatNumber(Number(props.data.TotalInput), 5))
                :
                  null
                }
                {
                    States.TransactionDetailCurrencyMode === 1 ?
                    digitsEnToFa(formatNumber(Number(props.data.TotalInput1), 2))
                  :
                  null
                }
                {
                  States.TransactionDetailCurrencyMode === 0 ?
                    <small style={{fontSize:"13px"}}> {props.data.symbole}</small>  
                  :
                  null
                }
                {
                  States.TransactionDetailCurrencyMode === 1 ?
                    <small style={{fontSize:"13px"}}> USD</small>  
                  :
                  null
                }
                <ArrowDownCircle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px'}} className={` col-6`}>
            <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'مجموع خروجی'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
              {
                  States.TransactionDetailCurrencyMode === 0 ?
                
                  digitsEnToFa(formatNumber(Number(props.data.TotalOutput), 5))
                :
                  null
                }
                {
                    States.TransactionDetailCurrencyMode === 1 ?
                  
                    digitsEnToFa(formatNumber(Number(props.data.TotalOutput1), 2))
                  :
                  null
                }
                {
                  States.TransactionDetailCurrencyMode === 0 ?
                    <small style={{fontSize:"13px"}}> {props.data.symbole}</small>  
                  :
                  null
                }
                {
                  States.TransactionDetailCurrencyMode === 1 ?
                    <small style={{fontSize:"13px"}}> USD</small>  
                  :
                  null
                }
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
            <Switch  options={[`${props.data.symbole}`, 'USD']} color={props.data.color} specialProps={'TransactionDetailCurrencyMode'}/>
          </CardTitle>
        </CardHeader>
        <CardBody>{renderTransactions()}</CardBody>
      </Card>
  )
}

export default CardTransactions
