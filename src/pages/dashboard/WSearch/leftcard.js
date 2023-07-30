/* eslint-disable no-unused-vars */
/* eslint-disable arrow-spacing */
import './walletdetail.css'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { digitsEnToFa } from 'persian-tools'

const CardTransactions = (props) => {
  const renderTransactions = () => {
    return (
      <div>

        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>{'دریافت شده'}</p>
            </div>
          </div>
          <div style={{direction:"ltr", fontSize:"14px", marginBottom:'-10px'}} className={` amountOption`}>
            {digitsEnToFa(props.data.InCome)}
            <small> {props.data.symbole}</small>
          </div>
        </div>
        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>{'ارسال شده'}</p>
            </div>
          </div>
          <div style={{direction:"ltr", fontSize:"14px", marginBottom:'-10px'}} className={` amountOption`}>
            {digitsEnToFa(props.data.OutCome)}
            <small> {props.data.symbole}</small>
          </div>
        </div>
        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>{'موجودی'}</p>
            </div>
          </div>
          <div style={{direction:"ltr", fontSize:"14px", marginBottom:'-10px'}} className={` amountOption`}>
            {digitsEnToFa(props.data.Total)}
            <small> {props.data.symbole}</small>
          </div>
        </div>
        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>{'تعداد تراکنش'}</p>
            </div>
          </div>
          <div style={{direction:"ltr", fontSize:"14px", marginBottom:'-10px'}} className={` amountOption`}>
            {digitsEnToFa(props.data.TrNumber)}
          </div>
        </div>
        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>{'اولین فعالیت'}</p>
            </div>
          </div>
          <div style={{direction:"ltr", fontSize:"14px", marginBottom:'-10px'}} className={` amountOption`}>
            {digitsEnToFa(props.data.FirstActivity)}
          </div>
        </div>
        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>{'آخرین فعالیت'}</p>
            </div>
          </div>
          <div style={{direction:"ltr", fontSize:"14px", marginBottom:'-10px'}} className={` amountOption`}>
            {digitsEnToFa(props.data.LastActivity)}
          </div>
        </div>
      </div>

    )
  }

  return (
    <Card className='card-transaction' id='leftCard1'>
      <CardHeader>
        <CardTitle tag='h4'>جزئیات</CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
