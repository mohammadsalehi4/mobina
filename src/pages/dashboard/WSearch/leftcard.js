import * as Icon from 'react-feather'
import './walletdetail.css'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const CardTransactions = () => {
  const transactionsArr = [
    {
      title: 'مجموع',
      color: 'light-primary',
      subtitle: 'Starbucks',
      amount: '8.82 BTC',
      Icon: Icon['Pocket'],
      down: true
    },
    {
      title: 'دریافت شده',
      color: 'light-success',
      subtitle: 'Add Money',
      amount: '3.92 BTC',
      Icon: Icon['Check']
    },
    {
      title: 'ارسال شده',
      color: 'light-danger',
      subtitle: 'Add Money',
      amount: '5.39 BTC',
      Icon: Icon['DollarSign']
    },
    {
      title: 'تعداد تراکنش',
      color: 'light-warning',
      subtitle: 'Ordered Food',
      amount: '35',
      Icon: Icon['CreditCard'],
      down: true
    },
    {
      title: 'اولین فعالیت',
      color: 'light-warning',
      subtitle: 'Ordered Food',
      amount: '11/6/2013',
      Icon: Icon['CreditCard'],
      down: true
    },
    {
      title: 'آخرین فعالیت',
      color: 'light-warning',
      subtitle: 'Ordered Food',
      amount: '12/2/2023',
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
    <Card className='card-transaction' id='leftCard1'>
      <CardHeader>
        <CardTitle tag='h4'>جزئیات</CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardTransactions
