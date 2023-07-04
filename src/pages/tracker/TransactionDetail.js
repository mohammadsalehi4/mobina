/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Switch from '../../components/switch/switch'
import TransactionTablleWithCheckbox from '../../components/TransactionDetailTable/transactionTablleWithCheckbox'
import TransactionTablleWithCheckbox2 from '../../components/TransactionDetailTableOut/transactionTablleWithCheckbox'

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
            <div id='address' style={{background:"rgb(248,248,248)", padding:"15px", borderRadius:"10px"}}>
              <a>{States.WDetail.address}</a>
              <ion-icon name="copy-outline"></ion-icon>
              <ion-icon name="git-network-outline"></ion-icon>
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
                <span>2.37</span> <small>BTC</small>
              </div>
            </div>
            <div className='row' >
              <div className='col-6'>
                <p>کارمزد</p>
              </div>
              <div className='col-6' style={{float:"left", direction:"ltr"}}>
                <span>0.003</span> <small>BTC</small>
              </div>
            </div>
            <div className='row' >
              <div className='col-6'>
                <p>تاریخ بلاک</p>
              </div>
              <div className='col-6' style={{float:"left", direction:"ltr"}}>
                <span>2023/02/03</span><br/>
                <small>13:23</small>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <TransactionTablleWithCheckbox/>
            <TransactionTablleWithCheckbox2/>
          </div>
        </div>
    </div>
  )
}

export default TransactionDetail1