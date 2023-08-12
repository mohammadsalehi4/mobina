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

  const data={
    address:props.data.transactionHash,
    name:"اتریوم",
    ethUSDPrice:1900,
    blockNumber:props.data.blockNumber,
    TotalInput:(props.data.value*Math.pow(10, -18)).toFixed(5).toLocaleString(),
    TotalOutput:(props.data.value*Math.pow(10, -18)).toFixed(5).toLocaleString(),
    TotalInput1:((props.data.value*Math.pow(10, -18))*1900).toFixed(2).toLocaleString(),
    TotalOutput1:((props.data.value*Math.pow(10, -18))*1900).toFixed(2).toLocaleString(),
    TotalInput2:(((props.data.value*Math.pow(10, -18))*1900).toFixed(2)*490000).toLocaleString(),
    TotalOutput2:(((props.data.value*Math.pow(10, -18))*1900).toFixed(2)*490000).toLocaleString(),
    BlockDate:"اینو سرور نمیده",
    symbole:"ETH",
    color:"#627eea",
    isUTXOBase:false,
    image:'../../images/ethereum.png',
    inputData:[
      {
        address:props.data.from,
        RiskScore:'سرور نمیده',
        BTCAmount:(props.data.value*Math.pow(10, -18)).toFixed(5),
        Fee:0.004,
        inNumber:12,
        outNumber:43
      }
    ],
    outputData:[
      {
        address:props.data.to,
        RiskScore:'سرور نمیده',
        BTCAmount:(props.data.value*Math.pow(10, -18)).toFixed(5),
        Fee:0.004,
        inNumber:12,
        outNumber:43
      }
    ]
  }

  return (
    <div id='TransactionDetail' class="container-fluid vazir">
        <div class="row vazir">
            <div className='col-lg-6 mt-2'>
              <CardContentTypes data={data}/>
            </div>
            <div className='col-lg-6 mt-2'>
              <CardTransactions data={data}/>
            </div>
        </div>
        <div class="row vazir row2 ">
            {
              data.isUTXOBase ? 
              <div className='col-lg-6 mt-2'>
                <RightDataTableWithButtons data={data}/>
              </div>
              :
              <div className='col-lg-6 mt-2'>
                <DashboardAccWallet data={data.inputData[0]} symbole={data.symbole} mode={1} title={"آدرس های ورودی"}/>
              </div>
            }              
            {
              data.isUTXOBase ? 
                <div className='col-lg-6 mt-2'>
                  <LeftDataTableWithButtons data={data}/>
                </div>
              :
              <div className='col-lg-6 mt-2'>
                <DashboardAccWallet data={data.outputData[0]} symbole={data.symbole} mode={2} title={"آدرس های خروجی"}/>
              </div>
            }
        </div>

    </div>
  )
}

export default TransactionDetail