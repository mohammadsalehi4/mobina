import * as Icon from 'react-feather'
import './transactionDetail.css'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import Switch from '../switch/switch'

const CardTransactions = () => {
  const transactionsArr = [
    {
      title: 'مجموع ورودی',
      color: 'light-primary',
      subtitle: 'Starbucks',
      amount: '3.92 BTC',
      Icon: Icon['Pocket'],
      down: true
    },
    {
      title: 'مجموع خروجی',
      color: 'light-success',
      subtitle: 'Add Money',
      amount: '3.92 BTC',
      Icon: Icon['Check']
    },
    {
      title: 'تاریخ بلاک',
      color: 'light-danger',
      subtitle: 'Add Money',
      amount: '2021/03/01',
      Icon: Icon['DollarSign']
    },
    {
      title: 'تاییدیه',
      color: 'light-warning',
      subtitle: 'Ordered Food',
      amount: '121778',
      Icon: Icon['CreditCard'],
      down: true
    }
  ]

  const renderTransactions = () => {
    return transactionsArr.map(item => {
      return (
        <div key={item.title} className='transaction-item'>
          <div className='d-flex option'>
            <div>
              <h6 className='transaction-title'>{item.title}</h6>
            </div>
          </div>
          <div className={` amountOption`}>{item.amount}</div>
        </div>
      )
    })
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
