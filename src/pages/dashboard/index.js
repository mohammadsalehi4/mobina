/* eslint-disable no-duplicate-imports */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import './style.css'
import { useState, useEffect } from 'react'
import TransactionDetail from './txSearch/transactionDetail/transactionDetail'
import Walletdetail from './WSearch/walletDetail/walletdetail'
import { useDispatch } from 'react-redux'
import { Label, Input } from 'reactstrap'
import { MainSiteOrange } from '../../../public/colors'
import axios from 'axios'
import { serverAddress } from '../../address'
const EcommerceDashboard = () => {
  const dispatch = useDispatch()
  const [mode, SetMode] = useState(0)
  const [trData, SetTrData] = useState({})
  const [adData, SetAdData] = useState({})

  const onSubmit = (event) => {
    event.preventDefault()
    // eslint-disable-next-line eqeqeq
    const inputValue = document.getElementById("transactionValue").value
    if (inputValue.length === 66) {
      axios.get(`${serverAddress}/explorer/transaction/?network=ETH&txid=${inputValue}`)
      .then((response) => {
        console.log(response)
        SetTrData(response.data)
        SetMode(1)
      })
    } else if (inputValue.length === 42) {

    }
  }
  useEffect(() => {
    dispatch({type:"SHOWNAVBAR"})
    dispatch({type:"SETWITCHPAGE", value:1})
  }, [])

  useEffect(() => {
    if (mode === 0) {
      document.getElementById('hamoniKeBayadBiadBala').style.marginTop = "160px"
    } else {
      document.getElementById('hamoniKeBayadBiadBala').style.marginTop = "50px"
    }
  }, [mode])
  return (
    <div id='dashboard' class='container-fluid'>
      {
        mode === 0 ?
          <div class="row main_row1">
            <div class="col-lg-3">
            </div>
            <div class="col-lg-6 middleBox" id='hamoniKeBayadBiadBala' style={{marginTop:"160px"}}>
              {

                // eslint-disable-next-line multiline-ternary
                mode === 0 ?
                  // eslint-disable-next-line multiline-ternary
                  <h3 style={{ display:"block", textAlign:"center", color:"#497979"}}>آدرس یا شناسه تراکنش را به کمک <span class="vazir" style={{color:MainSiteOrange}}>پنتا</span> جست و جو کنید!</h3>
              :
                  null
              }
              <form onSubmit={ (event) => { onSubmit(event) } }>
                <Input type='text' id='transactionValue' class="form-control vazir m-auto bg-white" placeholder='شناسه تراکنش، آدرس کیف پول' style={{backgroundColor:"white"}}/>
              </form>
              {
                // eslint-disable-next-line multiline-ternary
                mode === 0 ?
                  <Label className='form-label' for='transactionValue'>
                    <p class="vazir" id='searchExample11'>
                      نمونه کاوش:
                      <span class="ms-1" onClick={() => { SetMode(2) }}>
                        <ion-icon name="file-tray-stacked-outline"></ion-icon>
                        {' '}
                        <p> آدرس </p>
                      </span>
                      <span onClick={() => { SetMode(1) }}>
                        <ion-icon name="git-compare-outline"></ion-icon>
                        {' '}
                        <p> تراکنش </p>
                      </span>
                    </p>
                  </Label> : null
              }
          </div>
          <div class="col-lg-2">
          </div>
        </div>
        :
          <div class="row main_row1">
            <div class="col-lg-2">
            </div>
            <div class="col-lg-8 middleBox" id='hamoniKeBayadBiadBala' style={{marginTop:"160px"}}>
            {
              // eslint-disable-next-line multiline-ternary
              mode === 0 ?
                // eslint-disable-next-line multiline-ternary
                <h3 style={{ display:"block", textAlign:"center", color:"#497979"}}>آدرس یا شناسه تراکنش را به کمک <span class="vazir" style={{color:"#2f4f4f"}}>پنتا</span> جست و جو کنید!</h3>
            :
                null
            }
            <form onSubmit={ (event) => { onSubmit(event) } }>
              <Input type='email' id='transactionValue' class="form-control vazir m-auto bg-white" placeholder='شناسه تراکنش، آدرس کیف پول' style={{backgroundColor:"white"}}/>
            </form>
            {
              // eslint-disable-next-line multiline-ternary
              mode === 0 ?
                <Label className='form-label' for='transactionValue'>
                  <p class="vazir" id='searchExample11'>
                    نمونه کاوش:
                    <span class="ms-1">
                      <ion-icon name="file-tray-stacked-outline"></ion-icon>
                      {' '}
                      <p> آدرس </p>
                    </span>
                    <span>
                      <ion-icon name="git-compare-outline"></ion-icon>
                      {' '}
                      <p> تراکنش </p>
                    </span>
                  </p>
                </Label> : null}
            </div>
        <div class="col-lg-2">
        </div>
      </div>
      }

      <div class="row row2">
      <div class="col-lg-2">
        </div>
        <div class="col-lg-8 p-1 ">
          {/* {
            mode === 0 ? <DataTableWithButtons/> : null
          } */}
          {
            mode === 1 ? <TransactionDetail data={trData}/> : null
          }
          {
            mode === 2 ? <Walletdetail data={adData}/> : null
          }
        </div>
        <div class="col-lg-2">
        </div>
      </div>
        
    </div>
  )
}

export default EcommerceDashboard