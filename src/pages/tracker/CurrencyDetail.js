/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
import React, { useState } from 'react'
import NiceAddress1 from './niceAddress/niceAddress'
import { useSelector, useDispatch } from "react-redux"
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
              <NiceAddress1 href={'#'} text={States.WDetail.address} number={8}/>
              <ion-icon name="copy-outline"></ion-icon>
              <ion-icon name="git-network-outline"></ion-icon>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mt-3' >
            <div style={{background:"rgb(38, 6, 110)", height:"75px", borderRadius:"10px"}}>
              <a className='text-whit mt-3 me-3' style={{transition:"0.2s", color:"black", background:"rgb(255, 191, 0)", borderRadius:"8px", padding:"10px 15px", display:"inline-block"}}>نمایش مالک</a>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mt-3' >
            <button type="button" class="btn btn-outline-warning">نمایش آدرس <ion-icon name="open-outline"></ion-icon></button>
            <button type="button" class="btn btn-outline-danger me-3">گزارش آدرس <ion-icon name="alert-circle-outline"></ion-icon></button>
          </div>
        </div>
        <div className='row mt-3' style={{borderColor:"rgb(240, 240, 240)", borderRadius:"8px", borderWidth:"2px", borderStyle:"solid"}}>
          <div className='row me-0 p-2' style={{background:"rgb(240, 240, 240)", borderTopLeftRadius:"8px", borderTopRightRadius:"8px"}}>
            <div className='col-4'>
              اطلاعات
            </div>
            <div className='col-4'>
              مجموع
            </div>
            <div className='col-4'>
              انتخاب شده
            </div>
          </div>
          <div className='row me-0 p-1' style={{ width:"100%"}}>
            <div className='col-4'>
              تراکنش ها
            </div>
            <div className='col-4'>
              5
            </div>
            <div className='col-4'>
              2
            </div>
          </div>
          <div className='row me-0 p-1' style={{ width:"100%"}}>
            <div className='col-4'>
              دریافت شده
            </div>
            <div className='col-4'>
              2.29
            </div>
            <div className='col-4'>
              0.97
            </div>
          </div>
          <div className='row me-0 p-1' style={{ width:"100%"}}>
            <div className='col-4'>
              ارسال شده
            </div>
            <div className='col-4'>
              2.29
            </div>
            <div className='col-4'>
              0.97
            </div>
          </div>
          <div className='row me-0 p-1' style={{ width:"100%"}}>
            <div className='col-4'>
              مجموع
            </div>
            <div className='col-8'>
              1.23
            </div>
          </div>
        </div>
        <div className='row mt-3' style={{borderColor:"rgb(240, 240, 240)", borderBottomStyle:"solid", borderBottomWidth:"1px"}}>
          <div className='col-3' style={{borderColor:"rgb(255, 191, 0)", borderBottomStyle:"solid", borderBottomWidth:"2px"}}>
            <h6 >تراکنش ها</h6>
          </div>
        </div>
    </div>
  )
}

export default CurrencyDetail