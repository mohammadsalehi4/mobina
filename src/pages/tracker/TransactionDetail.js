/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
import React, { useState, useEffect } from 'react'
import './tracker.css'
import { useSelector, useDispatch } from "react-redux"
import Switch from '../../components/switch/switch'
import TransactionTablleWithCheckbox from '../../components/TransactionDetailTable/transactionTablleWithCheckbox'
import TransactionTablleWithCheckbox2 from '../../components/TransactionDetailTableOut/transactionTablleWithCheckbox'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import { digitsEnToFa } from 'persian-tools'
const TransactionDetail1 = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const close = () => {
    dispatch({type:"SETSHOWTRANSACTIONDATA", value:false})
  }

  // eslint-disable-next-line no-return-assign
  return (
    
    <div id='CurrencyDetail' className='container-fluid' style={{overflowY:"auto"}}>
        <div className='row mb-4'>
          <div className='col-12'>
            <h6 style={{display:"inline-block"}}>جزئیات تراکنش بیت کوین</h6>
            <span onClick={close}><ion-icon name="close-outline" id="closeIcon" ></ion-icon></span>
          </div>
          <Switch options={["BTC", "USD", "IRR"]} specialProps="TransactionDetailCurrencyMode"/>
        </div>

        <div className='row'>
          <div className='col-12' >
            <div id='address' style={{background:"rgb(248,248,248)", width:"100%", padding:"15px", borderRadius:"10px"}}>
              <ion-icon name="copy-outline"></ion-icon>
              <ion-icon name="git-network-outline"></ion-icon>
              <a id='justUp400'>{`...${(States.WDetail.address).substring(0, 30)}`}</a>
              <a id='justUnder400'>{`...${(States.WDetail.address).substring(0, 20)}`}</a>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mt-3' >
            <button type="button" class="btn btn-outline-warning">نمایش آدرس <ion-icon name="open-outline"></ion-icon></button>
          </div>
        </div>
        <div className='row' id='scrollingWalletDetail' style={{boxSizing:"border-box"}}>
          <div className='col-12 p-4'>
            <div className='row' >
              <div className='col-12'>
                <h6 style={{borderColor:"rgb(200,200,200)", borderBottomStyle:"solid", borderWidth:"1px"}} className='pb-1'>آدرس ها</h6>
              </div>
            </div>
            <div className='row' >
              <div className='col-6'>
                <p>حجم، اندازه</p>
              </div>
              <div className='col-6' style={{float:"left", direction:"ltr"}}>
                <span>{digitsEnToFa(String(States.WDetail.Amount))}</span> <small>BTC</small>
              </div>
            </div>
            <div className='row' >
              <div className='col-6'>
                <p>کارمزد</p>
              </div>
              <div className='col-6' style={{float:"left", direction:"ltr"}}>
                <span>{(digitsEnToFa(String(States.WDetail.fee)))}</span> <small>BTC</small>
              </div>
            </div>
            <div className='row' >
              <div className='col-6'>
                <p>تاریخ بلاک</p>
              </div>
              <div className='col-6' style={{float:"left", direction:"ltr"}}>
                <span>{digitsEnToFa(States.WDetail.date)}</span><br/>
                <small>{digitsEnToFa(States.WDetail.time)}</small>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <TransactionTablleWithCheckbox data={States.WDetail}/>
            <TransactionTablleWithCheckbox2 data={States.WDetail}/>
          </div>
        </div>
    </div>
  )
}

export default TransactionDetail1