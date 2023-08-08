/* eslint-disable no-unused-vars */
import React from 'react'
import CardTransactions from '../leftcard'
import CardContentTypes from '../rightCard'
import DataTableWithButtons from './TableWithButtons'
const Walletdetail = () => {
  const data = {
    address:"bc1qyfjj7npyc863lqzqkenxt0ydhfqtfuermur8ph",
    name:"اتریوم",
    Total: 1.025879,
    InCome: 1.56796,
    OutCome: 0.542081,
    TrNumber: 7,
    FirstActivity: '1398/03/01',
    LastActivity: '1401/05/27',
    symbole:"ETH",
    risk:"25%",
    owner:"آریان کوین",
    ownerMode:"صرافی بدون مجوز رسمی",
    website:"www.ariancoin.com",
    image:'../images/ethereum.png',
    LastTransactions:[
      {
        address:"5be51c891894736a2992c08610ca5caf0daf95a192cc1ce4f3876fdeb58d2fe1",
        mode:true,
        BTCAmount:0.026119,
        Date:'1398/03/01',
        Time:'09:29',
        Fee:0.00042
      },
      {
        address:"a239763a0395f3a7c0d5a139333fac53445fca8a30381deb7b0f98f6aa7b1627",
        mode:true,
        BTCAmount:0.136021,
        Date:'1399/02/13',
        Time:'13:31',
        Fee:0.00037
      },
      {
        address:"fecafd75051baea32322fc74930a91f8ad8174e2a2e5d6e562537f1d0883d230",
        mode:true,
        BTCAmount:0.121145,
        Date:'1399/08/22',
        Time:'14:30',
        Fee:0.00045
      },
      {
        address:"9800d8144046c31797af57b20f82f956f0299a87f29e222b2abbd2915faa0ce6",
        mode:false,
        BTCAmount:0.283285,
        Date:'1400/03/17',
        Time:'12:20',
        Fee:0.00026
      },
      {
        address:"aa04082111a5fc05c9016bcd9f7563af20430219e24e0158f06c7d2317f5e346",
        mode:true,
        BTCAmount:0.258796,
        Date:'1400/03/19',
        Time:'18:49',
        Fee:0.00076
      },
      {
        address:"6b154ecab6e058c5ba1e5371bf7009a7a0bbaa735727286e7e0386720f55b99a",
        mode:false,
        BTCAmount:0.258796,
        Date:'1400/11/30',
        Time:'17:38',
        Fee:0.00025
      },
      {
        address:"f74b6119d89229efe2edc3cee7786d94c1631f35c3af55a2f44918d2547885e9",
        mode:true,
        BTCAmount:1.025879,
        Date:'1401/05/27',
        Time:'08:30',
        Fee:0.00067
      }
    ]
  }

  return (
    <div className='container-fluid mt-5' style={{borderRadius:"8px", boxSizing:"border-box", background:"rgb(248,248,248)"}}>
        <div className='row ' style={{borderRadius:"8px"}}>
          <div className='col-lg-6'>
            <CardContentTypes data={data}/>
          </div>
          <div className='col-lg-6'>
            <CardTransactions data={data}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='row'>
              <div className='col-lg-12'>
                <DataTableWithButtons data={data}/>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Walletdetail