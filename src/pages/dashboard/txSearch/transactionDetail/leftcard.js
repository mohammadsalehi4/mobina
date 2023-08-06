/* eslint-disable multiline-ternary */
import './transactiondetail.css'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Switch from '../switch/switch'
import { digitsEnToFa } from 'persian-tools'
import { useSelector } from "react-redux"
const CardTransactions = (props) => {

  const renderTransactions = () => {
    const States = useSelector(state => state)
    return (
      <div>
        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>شماره بلاک</p>
            </div>
          </div>
          <div className={` amountOption`} style={{direction:"ltr", fontSize:"14px"}}>{digitsEnToFa(props.data.blockNumber)}</div>
        </div>

        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>مجموع ورودی</p>
            </div>
          </div>
          <div className={` amountOption`} style={{direction:"ltr", fontSize:"14px"}}>
            {
                States.TransactionDetailCurrencyMode === 0 ?
              
                digitsEnToFa(props.data.TotalInput)
              :
              null
            }
            {
                States.TransactionDetailCurrencyMode === 1 ?
              
                digitsEnToFa(props.data.TotalInput1)
              :
              null
            }
            {
                States.TransactionDetailCurrencyMode === 2 ?
              
                digitsEnToFa(props.data.TotalInput2)
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
            {
              States.TransactionDetailCurrencyMode === 2 ?
                <small style={{fontSize:"13px"}}> IRR</small>  
              :
              null
            }
          </div>
        </div>

        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>مجموع خروجی</p>
            </div>
          </div>
          <div className={` amountOption`} style={{direction:"ltr", fontSize:"14px"}}>
            {
                States.TransactionDetailCurrencyMode === 0 ?
              
                digitsEnToFa(props.data.TotalOutput)
              :
              null
            }
            {
                States.TransactionDetailCurrencyMode === 1 ?
              
                digitsEnToFa(props.data.TotalOutput1)
              :
              null
            }
            {
                States.TransactionDetailCurrencyMode === 2 ?
              
                digitsEnToFa(props.data.TotalOutput2)
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
            {
              States.TransactionDetailCurrencyMode === 2 ?
                <small style={{fontSize:"13px"}}> IRR</small>  
              :
              null
            }
          </div>
        </div>

        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>تاریخ بلاک</p>
            </div>
          </div>
          <div className={` amountOption`} style={{direction:"ltr", fontSize:"14px"}}>{digitsEnToFa(props.data.BlockDate)}</div>
        </div>
      </div>
    )
  }

  return (
    <Card className='card-transaction' id='leftCard'>
      <CardHeader>
        <CardTitle tag='h4'>جزئیات</CardTitle>
        <Switch options={[`${props.data.symbole}`, 'USD', 'IRR']} color={props.data.color} specialProps={'TransactionDetailCurrencyMode'}/>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
