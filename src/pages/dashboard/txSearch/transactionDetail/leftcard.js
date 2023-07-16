import './transactionDetail.css'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Switch from '../switch/switch'
import { digitsEnToFa } from 'persian-tools'

const CardTransactions = (props) => {

  const renderTransactions = () => {
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
            {digitsEnToFa(props.data.TotalInput)}
            <small style={{fontSize:"13px"}}> BTC</small>  
          </div>
        </div>

        <div className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <p style={{fontSize:"14px"}} className='transaction-title'>مجموع خروجی</p>
            </div>
          </div>
          <div className={` amountOption`} style={{direction:"ltr", fontSize:"14px"}}>{digitsEnToFa(props.data.TotalOutput)}<small style={{fontSize:"13px"}}> BTC</small>  </div>
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
        <Switch options={['BTC', 'USD', 'IRR']} specialProps={'TransactionDetailCurrencyMode'}/>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
