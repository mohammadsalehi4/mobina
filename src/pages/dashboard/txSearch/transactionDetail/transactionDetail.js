/* eslint-disable no-unused-vars */
/* eslint-disable space-infix-ops */
import React from 'react'
import './transactiondetail.css'
import CardContentTypes from './rightCard'
import Cards from '../../../../views/ui-elements/cards/advance'
import CardTransactions from './leftcard'
import RightDataTableWithButtons from './rightTable/TableWithButtons'
import LeftDataTableWithButtons from './leftTable/TableWithButtons'
const TransactionDetail = () => {
  const data={
    address:"sadashdasdsakugdakskljhjklhukh",
    blockNumber:128750,
    TotalInput:9.89,
    TotalOutput:6.09,
    BlockDate:"1401/02/03"
  }
  return (
    <div id='TransactionDetail' class="container-fluid vazir mt-5">
        <div class="row vazir bg-white">
            <div className='col-lg-6'>
              <CardContentTypes data={data}/>
            </div>
            <div className='col-lg-6'>
              <CardTransactions data={data}/>
            </div>
        </div>
        <div class="row vazir row2 bg-white ">
            <div className='col-lg-6 mt-2'>
              <RightDataTableWithButtons data={data}/>
            </div>
            <div className='col-lg-6 mt-2'>
              <LeftDataTableWithButtons data={data} />
            </div>
        </div>

    </div>
  )
}

export default TransactionDetail