import React from 'react'
import './transactiondetail.css'
import CardContentTypes from './rightCard'
import Cards from '../../../../ui-elements/cards/advance'
import CardTransactions from './leftcard'
import RightDataTableWithButtons from './rightTable/TableWithButtons'
import LeftDataTableWithButtons from './leftTable/TableWithButtons'
const TransactionDetail = () => {
  return (
    <div id='TransactionDetail' class="container-fluid vazir mt-5">
        <div class="row vazir bg-white">
            <div className='col-lg-6'>
              <CardContentTypes/>
            </div>
            <div className='col-lg-6'>
              <CardTransactions/>
            </div>
        </div>
        <div class="row vazir row2 bg-white ">
            <div className='col-lg-6 mt-2'>
              <RightDataTableWithButtons/>
            </div>
            <div className='col-lg-6 mt-2'>
              <LeftDataTableWithButtons  />
            </div>
        </div>

    </div>
  )
}

export default TransactionDetail