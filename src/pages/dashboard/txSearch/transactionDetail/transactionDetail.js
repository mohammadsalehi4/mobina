/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable space-infix-ops */
import React, {useState, Fragment} from 'react'
import './transactiondetail.css'
import CardContentTypes from './rightCard'
import CardTransactions from './leftcard'
import RightDataTableWithButtons from './rightTable/TableWithButtons'
import LeftDataTableWithButtons from './leftTable/TableWithButtons'
import DashboardAccWallet from '../../../../components/dashboardAccWallet/dashboardAccWallet'

const TransactionDetail = (props) => {
  return (
    <div id='TransactionDetail' class="container-fluid vazir">
        <div class="row vazir">
            <div className='col-lg-6 mt-2'>
              <CardContentTypes data={props.data}/>
            </div>
            <div className='col-lg-6 mt-2'>
              <CardTransactions data={props.data}/>
            </div>
        </div>
        <div class="row vazir row2 ">
            {
              props.data.isUTXOBase ? 
              <div className='col-lg-6 mt-2'>
                <RightDataTableWithButtons data={props.data}/>
              </div>
              :
              <div className='col-lg-6 mt-2'>
                <DashboardAccWallet data={props.data.inputData[0]} symbole={props.data.symbole} mode={1} title={"آدرس های ورودی"}/>
              </div>
            }              
            {
              props.data.isUTXOBase ? 
                <div className='col-lg-6 mt-2'>
                  <LeftDataTableWithButtons data={props.data}/>
                </div>
              :
              <div className='col-lg-6 mt-2'>
                <DashboardAccWallet data={props.data.outputData[0]} symbole={props.data.symbole} mode={2} title={"آدرس های خروجی"}/>
              </div>
            }
        </div>
    </div>
  )
}

export default TransactionDetail