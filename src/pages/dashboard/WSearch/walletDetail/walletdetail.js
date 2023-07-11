import React from 'react'
import CardTransactions from '../leftcard'
import CardContentTypes from '../rightCard'
import Pickers from '../../../../views/forms/form-elements/datepicker'
import DataTableWithButtons from './TableWithButtons'
const Walletdetail = () => {
  return (
    <div className='container-fluid bg-white mt-5' style={{borderRadius:"8px", boxSizing:"border-box"}}>
        <div className='row ' style={{borderRadius:"8px"}}>
          <div className='col-lg-6'>
            <CardContentTypes/>
          </div>
          <div className='col-lg-6'>
            <CardTransactions/>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='row mt-3'>
              <div className='col-lg-12'>
                <DataTableWithButtons/>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Walletdetail