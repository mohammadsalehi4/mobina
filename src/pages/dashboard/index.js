/* eslint-disable no-unused-vars */
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import './style.css'
import { useState, useEffect } from 'react'
import DataTableWithButtons from './TableWithButtons'
import TransactionDetail from './txSearch/transactionDetail/transactionDetail'
import Walletdetail from './WSearch/walletDetail/walletdetail'
import { useDispatch } from 'react-redux'

import { Label, Input } from 'reactstrap'

const EcommerceDashboard = () => {
  const dispatch = useDispatch()
  const [mode, SetMode] = useState(0)
  const isTextInInput = () => {
    // eslint-disable-next-line eqeqeq
    if (document.getElementById("transactionValue").value != '') {
      SetMode(2)
    } else {
      SetMode(0)
    }
  }
  useEffect(() => {
    dispatch({type:"SHOWNAVBAR"})
    dispatch({type:"SETWITCHPAGE", value:1})
  }, [])

  return (
    <div id='dashboard' class='container-fluid'>
          <div class="row main_row1 ">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8 middleBox  mt-5">
                {
                  // eslint-disable-next-line multiline-ternary
                  mode === 0 ? 
                    // eslint-disable-next-line multiline-ternary
                    <h1>آدرس یا شناسه تراکنش را به کمک <span class="vazir" >پنتا</span> جست و جوکنید!</h1>
                : 
                    null
                }
                <Input type='email' id='transactionValue' onChange={isTextInInput} class="form-control vazir m-auto bg-white" placeholder='آدرس تراکنش، کیف پول، نام، شماره بلاک ...' style={{backgroundColor:"white"}}/>
                {
                  // eslint-disable-next-line multiline-ternary
                  mode === 0 ? 
                    <Label className='form-label' for='transactionValue'>
                      <p class="vazir" id='searchExample11'>
                        نمونه کاوش:
                        <span class="ms-1">
                          <ion-icon name="file-tray-stacked-outline"></ion-icon>
                          <p>آدرس</p>
                        </span>
                        <span>
                          <ion-icon name="git-compare-outline"></ion-icon>
                          <p>تراکنش</p>
                        </span>
                      </p>
                    </Label> : null}
            </div>
            <div class="col-lg-2">
            </div>
          </div>
          <div class="row row2">
          <div class="col-lg-2">
            </div>
            <div class="col-lg-8 p-1 ">
              {
                mode === 0 ? <DataTableWithButtons/> : null
              }
              {
                mode === 1 ? <TransactionDetail/> : null
              }
              {
                mode === 2 ? <Walletdetail/> : null
              }
            </div>
            <div class="col-lg-2">
            </div>
          </div>
        </div>
  )
}

export default EcommerceDashboard
