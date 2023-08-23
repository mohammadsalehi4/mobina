/* eslint-disable prefer-const */
/* eslint-disable space-infix-ops */
/* eslint-disable no-duplicate-imports */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import './style.css'
import { useState, useEffect } from 'react'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import TransactionDetail from './txSearch/transactionDetail/transactionDetail'
import Walletdetail from './WSearch/walletDetail/walletdetail'
import { useDispatch } from 'react-redux'
import { Label, Input } from 'reactstrap'
import { MainSiteOrange } from '../../../public/colors'
import axios from 'axios'
import { serverAddress } from '../../address'
import toast from 'react-hot-toast'

const EcommerceDashboard = () => {
  
  const dispatch = useDispatch()
  const [mode, SetMode] = useState(0)
  const [trData, SetTrData] = useState({})
  const [adData, SetAdData] = useState({})
  const [Loading, SetLoading] = useState(false)
  const [address, SetAddress] = useState('')
  const [coinData, SetCoinData] = useState({})

  const BitcoinAddress =(getData, address) => {
    let data=[]
    for (let i=0; i<getData.length; i++) {
      let input=0
      let output=0

      let timeStamp
      let from
      let to
      let gasUsed
      let gasPrice
      let value
      let hash

      for (let j=0; j<getData[i].inputs.length; j++) {
        if (getData[i].inputs[j].coin.address===address) {
          input=input+Number(getData[i].inputs[j].coin.value)
        }
      }  
      for (let j=0; j<getData[i].outputs.length; j++) {
        if (getData[i].outputs[j].address===address) {
          output=output+Number(getData[i].outputs[j].value)
        }
      }

      if ((input-output) > 0) {
        from=address
        to=''
      }  else {
        to=address
        from=''
      }
      value=Number(Math.abs(output-input))/100000000
      timeStamp=getData[i].time
      gasUsed=Number(getData[i].fee)/100000000
      gasPrice=1
      hash=getData[i].hash

      data.push({
        timeStamp,
        from,
        to,
        gasUsed,
        gasPrice,
        value,
        hash
      })
    }

    return data
  }

  const EthereumAddress =(getData) => {
    let data=[]
    for (let i=0; i<getData.length; i++) {
      data.push({
        timeStamp:getData[i].timestamp,
        from:getData[i].from,
        to:getData[i].to,
        gasUsed:getData[i].gasUsed,
        gasPrice:Number(getData[i].gasPrice)/1000000000000000000,
        value:Number(getData[i].value)/1000000000000000000,
        hash:getData[i].transactionHash
      })
    }
    return data
  }

  const BitcoinTransaction =(data) => {
    const CurrencyPrice=28000
    const USDPrice=490000

    const address=data.hash
    const blockNumber=data.blockNumber
    const name='بیت کوین'
    const image='bitcoin.png'
    const BlockDate='سرور نمیده'
    const symbole="BTC"
    const color='#f8a23a'
    let TotalOutput=0
    let TotalInput=0
    const inputData=[]
    const outputData=[]
    for (let i=0; i<data.inputs.length; i++) {
      TotalInput=TotalInput+((data.inputs[i].coin.value)/100000000)
      inputData.push({
        BTCAmount:((data.inputs[i].coin.value)/100000000),
        RiskScore:"0%",
        address:data.inputs[i].coin.address
      })
    }
    for (let i=0; i<data.outputs.length; i++) {
      TotalOutput=TotalOutput+((data.outputs[i].value)/100000000)
      outputData.push({
        BTCAmount:((data.outputs[i].value)/100000000),
        RiskScore:"0%",
        address:data.outputs[i].address
      })
    }
    const TotalOutput1=TotalOutput*CurrencyPrice
    const TotalOutput2=TotalOutput1*USDPrice
    const TotalInput1=TotalInput*CurrencyPrice
    const TotalInput2=TotalInput1*USDPrice
    const RiskScore='0%'
    const BTCAmount=(Number(data.value)/1000000000000000000)
    const isUTXOBase=true

    return ({
      address,
      blockNumber,
      name,
      image,
      BlockDate,
      symbole,
      color,
      TotalOutput,
      TotalOutput1,
      TotalOutput2,
      TotalInput,
      TotalInput1,
      TotalInput2,
      RiskScore,
      BTCAmount,
      inputData,
      outputData,
      isUTXOBase
    })
  }

  const EthereumTransaction =(data) => {

    const CurrencyPrice=1900
    const USDPrice=490000

    const address=data.blockHash
    const blockNumber=data.blockNumber
    const name='اتریوم'
    const image='ethereum.png'
    const BlockDate='سرور نمیده'
    const symbole="ETH"
    const color='#627eea'
    const TotalOutput=(Number(data.value)/1000000000000000000)
    const TotalOutput1=TotalOutput*CurrencyPrice
    const TotalOutput2=TotalOutput1*USDPrice
    const TotalInput=(Number(data.value)/1000000000000000000)
    const TotalInput1=TotalInput*CurrencyPrice
    const TotalInput2=TotalInput1*USDPrice
    const RiskScore='0%'
    const BTCAmount=(Number(data.value)/1000000000000000000)
    const inputData=[
      {
        address:data.from,
        RiskScore:'0%',
        BTCAmount:(Number(data.value)/1000000000000000000)
      }
    ]
    const outputData=[
      {
        address:data.to,
        RiskScore:'0%',
        BTCAmount:(Number(data.value)/1000000000000000000)
      }
    ]

    return ({
      address,
      blockNumber,
      name,
      image,
      BlockDate,
      symbole,
      color,
      TotalOutput,
      TotalOutput1,
      TotalOutput2,
      RiskScore,
      BTCAmount,
      inputData,
      outputData,
      TotalInput,
      TotalInput1,
      TotalInput2
    })
  }

  const onSubmit = (event) => {
    SetLoading(true)
    event.preventDefault()
    const inputValue = document.getElementById("transactionValue").value
    SetAddress(inputValue)
    if (inputValue.length === 66 || inputValue.length === 64) {
      if (inputValue.startsWith("0x")) {
        axios.get(`${serverAddress}/explorer/transaction/?network=ETH&txid=${inputValue}`)
        .then((response) => {
          SetTrData(EthereumTransaction(response.data))
          SetLoading(false)
          SetMode(1)
        })
        .catch(err => {
          SetLoading(false)
        })
      } else {
        axios.get(`${serverAddress}/explorer/transaction/?network=BTC&txid=${inputValue}`)
        .then((response) => {
          alert('BTC tr')
          SetTrData(BitcoinTransaction(response.data))
          SetMode(1)
          SetLoading(false)
        })
        .catch(err => {
          SetLoading(false)
        })
      }
    } else {
      if (inputValue.startsWith("0x")) {
        axios.get(`${serverAddress}/explorer/address?address=${inputValue}&network=ETH&page_size=50&offset=1`)
        .then((response) => {
          console.log(response.data)
          SetLoading(false)
          SetCoinData({
            name:'اتریوم',
            symbole:"ETH",
            risk:"0%",
            owner:"بدون اطلاعات",
            ownerMode:"بدون اطلاعات",
            website:"بدون اطلاعات",
            color:"#627eea",
            image:"ethereum.png"
          })
          SetAdData(EthereumAddress(response.data))
          
          SetAddress(inputValue)
          SetMode(2)
        })
        .catch((err) => {
          SetLoading(false)
        })
      } else {
        axios.get(`${serverAddress}/explorer/address?address=${inputValue}&network=BTC&page_size=50&offset=0`)
        .then((response) => {
          SetLoading(false)
          SetCoinData({
            name:'بیت کوین',
            symbole:"BTC",
            risk:"0%",
            owner:"بدون اطلاعات",
            ownerMode:"بدون اطلاعات",
            website:"بدون اطلاعات",
            color:"#f8a23a",
            image:"bitcoin.png"
          })
          SetAdData(BitcoinAddress(response.data, inputValue))
          SetMode(2)
        })
        .catch((err) => {
          SetLoading(false)
        })
      }
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
    <UILoader blocking={Loading} loader={<Spinner />} style={{height:"100vh"}}>
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
                      <span class="ms-1" onClick={() => { document.getElementById('transactionValue').value = '0xd55dac2f76ff813ccbb779501d544e9e97f0fef9' }}>
                        <ion-icon name="file-tray-stacked-outline"></ion-icon>
                        {' '}
                        <p> آدرس </p>
                      </span>
                      <span onClick={() => { document.getElementById('transactionValue').value = '0xb515742dc2065871c98c411a5e55c4cca102cb7c7cd48b093a2a659c546e8035' }}>
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
            <div class="col-lg-8 middleBox container-fluid" id='hamoniKeBayadBiadBala' style={{marginTop:"160px"}}>
            {
              // eslint-disable-next-line multiline-ternary
              mode === 0 ?
                // eslint-disable-next-line multiline-ternary
                <h3 style={{ display:"block", textAlign:"center", color:"#497979"}}>آدرس یا شناسه تراکنش را به کمک <span class="vazir" style={{color:"#2f4f4f"}}>پنتا</span> جست و جو کنید!</h3>
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

    <div class="row row2 pb-2">
      <div class="col-lg-2">
        </div>
        <div class="col-lg-8 p-0">
          {
            mode === 1 ? <TransactionDetail data={trData}/> : null
          }
          {
            mode === 2 ? <Walletdetail data={adData} address={address} coinData={coinData}/> : null
          }
        </div>
        <div class="col-lg-2">
        </div>
      </div>
        
    </div>
    </UILoader>
  )
}

export default EcommerceDashboard