/* eslint-disable no-unused-vars */
/* eslint-disable space-infix-ops */
import React from 'react'
import './transactiondetail.css'
import CardContentTypes from './rightCard'
import CardTransactions from './leftcard'
import RightDataTableWithButtons from './rightTable/TableWithButtons'
import LeftDataTableWithButtons from './leftTable/TableWithButtons'
const TransactionDetail = () => {
  const data={
    address:"3bf80a46ee08b7da13026827cadec449608fdb785ddf405e47ba1908ad686c9c",
    blockNumber:799226,
    TotalInput:"۱.۲۱۴۲۰۳",
    TotalOutput:"۱.۲۱۴۲۰۳",
    TotalInput1:"33997",
    TotalOutput1:"33997",
    TotalInput2:"1,665,886,516",
    TotalOutput2:"1,665,886,516",
    BlockDate:"1401/02/03",
    symbol:"BTC",
    inputData:[
      {
        address:"bc1q7cyrfmck2ffu2ud3rn5l5a8yv6f0chkp0zpemf",
        RiskScore:25,
        BTCAmount:0.322005,
        Fee:0.004,
        inNumber:12,
        outNumber:43
      },
      {
        address:"bc1qwfuuas9z9je6ugffyfva3n7jrr4jnnrnf32522",
        RiskScore:50,
        BTCAmount:0.882198,
        Fee:0.004,
        inNumber:12,
        outNumber:43
      }
    ],
    outputData:[
      {
        address:"bc1qe7x4de224kt0rjkhy8n0glk03uf9ta4jyr6xxy",
        RiskScore:10,
        BTCAmount:1.214203,
        Fee:0.004,
        inNumber:12,
        outNumber:43
      }
    ]
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