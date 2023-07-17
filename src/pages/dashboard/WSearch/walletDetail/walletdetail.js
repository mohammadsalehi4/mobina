/* eslint-disable no-unused-vars */
import React from 'react'
import CardTransactions from '../leftcard'
import CardContentTypes from '../rightCard'
import DataTableWithButtons from './TableWithButtons'
const Walletdetail = () => {
  
  const data = {
    address:"TWBAPzpPiZarfVsY2BLXeaLhNHurn4wkWG",
    Total: 8.82,
    InCome: 3.92,
    OutCome: 5.39,
    TrNumber: 35,
    FirstActivity: '11/6/2013',
    LastActivity: '12/2/2023',
    LastTransactions:[
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:false,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:false,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:false,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:false,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:false,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      },
      {
        address:"adsyfusdfuasdgifusgduifyasgdiugdf",
        mode:true,
        BTCAmount:4.354,
        Date:'12/3/2021',
        Time:'14:30',
        Fee:0.004
      }
    ]
  }

  return (
    <div className='container-fluid bg-white mt-5' style={{borderRadius:"8px", boxSizing:"border-box"}}>
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
            <div className='row mt-3'>
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