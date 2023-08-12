/* eslint-disable no-unused-vars */
/* eslint-disable arrow-spacing */
import './walletdetail.css'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { digitsEnToFa } from 'persian-tools'
import {CornerLeftDown, CornerUpRight, Crop, CreditCard, Circle, Aperture} from 'react-feather'

const CardTransactions = (props) => {
  const renderTransactions = () => {
    return (
      <div className=''>
        <div className='row mt-3'>
          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'ارسال شده'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.OutCome)}
                <small> {props.data.symbole}</small>
                <CornerUpRight size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px'}} className={` col-6`}>
          <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'دریافت شده'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.InCome)}
                <small> {props.data.symbole}</small>
                <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'مجموع'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.Total)}
                <small> {props.data.symbole}</small>
                <Crop size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px", transform:"rotate(90deg)"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px'}} className={` col-6`}>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'تعداد تراکنش'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.TrNumber)}
                <CreditCard size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-6'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'اولین فعالیت'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.FirstActivity)}
                <Circle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
          <div style={{ marginBottom:'-10px'}} className={` col-6`}>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'آخرین فعالیت'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.LastActivity)}
                <Aperture size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

      </div>

    )
  }

  return (
    <Card className='card-transaction  m-0' id='leftCard1' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
        <CardTitle tag='h4'>
          جزئیات
        </CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
