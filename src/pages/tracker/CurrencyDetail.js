/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import PickerRange from '../../components/timeRangePicker/PickerRange'
import WalletDetailTopTable from '../../components/walletDetailTopTable/walletDetailTopTable'
import WalletDetailTableBottom from '../../components/WalletDetailTableIn/transactionTablleWithCheckbox'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import AmountPickerRange from '../../components/amountRangePicker/PickerRange'
import { MainSiteOrange } from '../../../public/colors'
const CurrencyDetail = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const close = () => {
    dispatch({type:"SETshowWalletData", value:false})
  }
  // eslint-disable-next-line no-return-assign
  return (
    
    <div id='CurrencyDetail' className='container-fluid' style={{overflowY:"auto"}}>
        <div className='row'>
          <div className='col-12'>
            <h6 style={{display:"inline-block"}}>جزئیات آدرس بیت کوین</h6>
            <span onClick={close}><ion-icon name="close-outline" id="closeIcon" ></ion-icon></span>
          </div>
        </div>
        <div className='row'>
          <div className='col-12' >
            <div id='address'>
              <a id='justUp500'>{States.WDetail.address}</a>
              <NiceAddress2 text={States.WDetail.address} number={8}/>
              <ion-icon name="copy-outline"></ion-icon>
              <ion-icon name="git-network-outline"></ion-icon>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mt-3' >
            <div style={{background:"#2f4f4f", height:"75px", borderRadius:"10px"}}>
              <a className='text-whit mt-3 me-3' style={{transition:"0.2s", color:"black", background:MainSiteOrange, borderRadius:"8px", padding:"10px 15px", display:"inline-block"}}>نمایش مالک</a>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mt-3' >
            <button type="button" class="btn btn-outline-warning">نمایش آدرس <ion-icon name="open-outline"></ion-icon></button>
            <button type="button" class="btn btn-outline-danger me-3">گزارش آدرس <ion-icon name="alert-circle-outline"></ion-icon></button>
          </div>
        </div>
        <div className='row' id='scrollingWalletDetail' style={{boxSizing:"border-box"}}>
          <div className='col-12 p-4'>
            <div className='row' >
              <div className='col-12'>
                <WalletDetailTopTable/>
              </div>
            </div>
            <div className='row mt-3' style={{borderBottomStyle:"solid", borderColor:"rgb(242,242,242)", borderWidth:"2px"}}>
              <div className='col-4' style={{borderBottomStyle:"solid", borderColor:"orange", borderWidth:"2px"}}>
                <h6  >تراکنش ها</h6>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-6'>
                <PickerRange/>
              </div>
              <div className='col-6'>
                {/* bayad jaygozin shavad */}
                <AmountPickerRange/>
              </div>
            </div>
            <div className='row mt-3'>
              <div className='col-12'>
                <WalletDetailTableBottom/>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CurrencyDetail