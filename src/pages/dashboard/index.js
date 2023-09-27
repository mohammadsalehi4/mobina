/* eslint-disable prefer-const */
/* eslint-disable space-infix-ops */
/* eslint-disable no-duplicate-imports */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import './style.css'
import { useState, useEffect, useRef } from 'react'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import TransactionDetail from './txSearch/transactionDetail/transactionDetail'
import Walletdetail from './WSearch/walletDetail/walletdetail'
import { useDispatch } from 'react-redux'
import { Label, Input, InputGroup, InputGroupText } from 'reactstrap'
import { MainSiteOrange } from '../../../public/colors'
import axios from 'axios'
import { serverAddress } from '../../address'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { Search } from 'react-feather'
import { useParams } from "react-router-dom"

const EcommerceDashboard = () => {
  const { hash } = useParams()

  const dispatch = useDispatch()
  const [mode, SetMode] = useState(0)
  const [trData, SetTrData] = useState({})
  const [adData, SetAdData] = useState({})
  const [Loading, SetLoading] = useState(false)
  const [address, SetAddress] = useState('0x62Dece3416741fcEECA25A50A584a37037eadc04')
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
        if ((getData[i].inputs[j].coin.address.address).toLowerCase()===address.toLowerCase()) {
          input=input+Number(getData[i].inputs[j].coin.value)
        }
      }
      for (let j=0; j<getData[i].outputs.length; j++) {
        if ((getData[i].outputs[j].address.address).toLowerCase()===address.toLowerCase()) {
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
        hash,
        currencyType:"BTC",
        Logo:"BTC.png",
        image:"BTC.png",
        Type:"coin"
      })
    }
    return data
  }

  const EthereumAddress =(getData, add) => {
    let data=[]
    for (let i=0; i<getData.result.length; i++) {
      try {
        if ((getData.result[i].to.address).toUpperCase()===add.toUpperCase() || (getData.result[i].from.address).toUpperCase()===add.toUpperCase()) {
          data.push({
            timeStamp:getData.result[i].timestamp,
            from:getData.result[i].from.address,
            to:getData.result[i].to.address,
            gasUsed:getData.result[i].gasUsed,
            gasPrice:Number(getData.result[i].gasPrice)/1000000000000000000,
            value:(Number(getData.result[i].value))/1000000000000000000,
            hash:getData.result[i].transactionHash,
            currencyType:"ETH",
            Logo:"ETH.png",
            Type:"coin"
          })
        }
      } catch (error) {
        if ((getData.result[i].to.address)===null && (getData.result[i].from.address)!==null) {
          data.push({
            timeStamp:getData.result[i].timestamp,
            from:(getData.result[i].from.address),
            to:'coin base',
            gasUsed:getData.result[i].gasUsed,
            gasPrice:Number(getData.result[i].gasPrice)/1000000000000000000,
            value:(Number(getData.result[i].value))/1000000000000000000,
            hash:getData.result[i].transactionHash,
            currencyType:"ETH",
            Logo:"ETH.png",
            Type:"coin"
          })
        } else if ((getData.result[i].to.address)!==null && (getData.result[i].from.address)===null) {
          data.push({
            timeStamp:getData.result[i].timestamp,
            from:'coin base',
            to:(getData.result[i].to.address),
            gasUsed:getData.result[i].gasUsed,
            gasPrice:Number(getData.result[i].gasPrice)/1000000000000000000,
            value:(Number(getData.result[i].value))/1000000000000000000,
            hash:getData.result[i].transactionHash,
            currencyType:"ETH",
            Logo:"ETH.png",
            Type:"coin"
          })
        }
      }

    }
    for (let a=0; a<getData.result.length; a++) {
      if (getData.result[a].logs.length > 0) {
        for (let j=0; j<getData.result[a].logs.length; j++) {
          try {
            if (getData.result[a].logs[j].address.symbol) {
              data.push({
                timeStamp:getData.result[a].timestamp,
                from:getData.result[a].logs[j].from,
                to:getData.result[a].logs[j].to,
                gasUsed:getData.result[a].gasUsed,
                gasPrice:Number(getData.result[a].gasPrice)/1000000000000000000,
                value:Number(getData.result[a].logs[j].amount)/(Math.pow(10, getData.result[a].logs[j].address.decimal)),
                hash:getData.result[a].logs[j].transactionHash,
                currencyType:getData.result[a].logs[j].address.symbol,
                Logo:`${getData.result[a].logs[j].address.symbol}.png`,
                Type:"token"
              })
            }
          } catch (error) {}
        }
      }
    }
    return data
  }

  const LitecoinAddress =(getData, address) => {
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
        try {
          if ((getData[i].inputs[j].coin.address).toLowerCase()===address.toLowerCase()) {
            input=input+Number(getData[i].inputs[j].coin.value)
          }
        } catch (error) {}

      }
      for (let j=0; j<getData[i].outputs.length; j++) {
        try {
          if ((getData[i].outputs[j].address).toLowerCase()===address.toLowerCase()) {
            output=output+Number(getData[i].outputs[j].value)
          }
        } catch (error) {}
      }

      if ((input-output) > 0) {
        from=address
        to=''
      }  else {
        to=address
        from=''
      }
      value=Number(Math.abs(output-input))
      timeStamp=getData[i].time
      gasUsed=Number(getData[i].fee)
      gasPrice=1
      hash=getData[i].hash

      data.push({
        timeStamp,
        from,
        to,
        gasUsed,
        gasPrice,
        value,
        hash,
        currencyType:"LTC",
        Logo:"LTC.png",
        image:"LTC.png",
        Type:"coin"
      })
    }
    return data
  }

  const BitcoinTransaction =(data) => {
    const CurrencyPrice=28000
    const USDPrice=490000
    const fee=data.fee/100000000
    const address=data.hash
    const blockNumber=data.blockNumber
    const name='بیت کوین'
    const image='BTC.png'
    const BlockDate=data.time
    const symbole="BTC"
    const color='#f8a23a'
    let TotalOutput=0
    let TotalInput=0
    const inputData=[]
    const outputData=[]
    for (let i=0; i<data.inputs.length; i++) {
      if (data.inputs[i].coin.address !== null) {
        inputData.push({
          BTCAmount:((data.inputs[i].coin.value)/100000000),
          RiskScore:"0%",
          address:data.inputs[i].coin.address
        })
      } else {
        inputData.push({
          BTCAmount:((data.inputs[i].coin.value)/100000000),
          RiskScore:"0%",
          address:'coin base'
        })
      }
    }
    for (let i=0; i<data.outputs.length; i++) {
      if (data.outputs[i].address !== null) {
        outputData.push({
          BTCAmount:((data.outputs[i].value)/100000000),
          RiskScore:"0%",
          address:data.outputs[i].address
        })
      } else {
        outputData.push({
          BTCAmount:((data.outputs[i].value)/100000000),
          RiskScore:"0%",
          address:'coin base'
        })
      }

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
      isUTXOBase,
      fee
    })
  }

  const EthereumTransaction =(data) => {

    const blockNumber=data.blockNumber
    const address=data.hash
    const BlockDate=data.timestamp
    const name='اتریوم'
    const image='ETH.png'
    const color='#627eea'
    const RiskScore='0%'
    let TotalOutput=0
    let symbole="ETH"
    let TotalInput=0
    let fee = (Number(data.gasPrice))*(Number(data.gasUsed))/1000000000000000000
    let transfers=[]

    if (data.from.address !== null && data.to.address !== null) {
      transfers.push({
        from:data.from.address,
        to:data.to.address,
        currencyType:'ETH',
        amount:(Number(data.value)/1000000000000000000)
      })
    } else if (data.from.address === null && data.to.address !== null) {
      transfers.push({
        from:'coin base',
        to:data.to.address,
        currencyType:'ETH',
        amount:(Number(data.value)/1000000000000000000)
      })
    } else if (data.from.address !== null && data.to.address === null) {
      transfers.push({
        from:data.from.address,
        to:'coin base',
        currencyType:'ETH',
        amount:(Number(data.value)/1000000000000000000)
      })
    } else {
      transfers.push({
        from:'coin base',
        to:'coin base',
        currencyType:'ETH',
        amount:(Number(data.value)/1000000000000000000)
      })
    }

    for (let i=0; i<data.logs.length; i++) {
      if (data.logs[i].address.symbol) {
        try {
          if (data.logs[i].from !== null && data.logs[i].to !== null) {
            transfers.push({
              from:data.logs[i].from,
              to:data.logs[i].to,
              currencyType:data.logs[i].address.symbol,
              amount:(Number(data.logs[i].amount)/(Math.pow(10, data.logs[i].address.decimal)))
            })
          } else if (data.logs[i].from === null && data.logs[i].to !== null) {
            transfers.push({
              from:'coin base',
              to:data.logs[i].to,
              currencyType:data.logs[i].address.symbol,
              amount:(Number(data.logs[i].amount)/(Math.pow(10, data.logs[i].address.decimal)))
            })
          } else if (data.logs[i].from !== null && data.logs[i].to === null) {
            transfers.push({
              from:data.logs[i].from,
              to:'coin base',
              currencyType:data.logs[i].address.symbol,
              amount:(Number(data.logs[i].amount)/(Math.pow(10, data.logs[i].address.decimal)))
            })
          } else {
            transfers.push({
              from:'coin base',
              to:'coin base',
              currencyType:data.logs[i].address.symbol,
              amount:(Number(data.logs[i].amount)/(Math.pow(10, data.logs[i].address.decimal)))
            })
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    return ({
      address,
      blockNumber,
      name,
      image,
      BlockDate,
      symbole,
      color,
      TotalOutput,
      TotalInput,
      RiskScore,
      transfers,
      fee
    })
  }

  const LitecoinTransaction =(data) => {
    const CurrencyPrice=28000
    const USDPrice=490000

    const address=data.hash
    const blockNumber=data.blockNumber
    const name='لایت کوین'
    const image='LTC.png'
    const BlockDate=data.time
    const symbole="LTC"
    const color='#345d9d'
    const fee=data.fee
    let TotalOutput=0
    let TotalInput=0
    const inputData=[]
    const outputData=[]
    for (let i=0; i<data.inputs.length; i++) {
      if (data.inputs[i].coin.address !== null) {
        inputData.push({
          BTCAmount:((data.inputs[i].coin.value)/1),
          RiskScore:"0%",
          address:data.inputs[i].coin.address
        })
      } else {
          inputData.push({
          BTCAmount:((data.inputs[i].coin.value)/1),
          RiskScore:"0%",
          address:'coin base'
        })
      }

    }
    for (let i=0; i<data.outputs.length; i++) {
      if (data.outputs[i].address !== null) {
        outputData.push({
          BTCAmount:((data.outputs[i].value)/1),
          RiskScore:"0%",
          address:data.outputs[i].address
        })
      } else {
          outputData.push({
          BTCAmount:((data.outputs[i].value)/1),
          RiskScore:"0%",
          address:'coin base'
        })
      }
    }

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
      TotalInput,
      RiskScore,
      BTCAmount,
      inputData,
      outputData,
      isUTXOBase,
      fee
    })
  }

  useEffect(() => {
    if (hash !== undefined) {
      document.getElementById("transactionValue").value=hash
      SetLoading(true)
      SetAddress(hash)
      axios.get(`${serverAddress}/explorer/search/?query=${hash}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((addressMode) => {
        if (addressMode.data.query === 'transaction') {
          if (addressMode.data.network === 'BTC') {
            axios.get(`${serverAddress}/explorer/transaction/?network=BTC&txid=${hash}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
              SetTrData(BitcoinTransaction(response.data))
              SetMode(1)
              SetLoading(false)
            })
            .catch(err => {
              SetLoading(false)
              try {
                if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                  Cookies.set('refresh', '')
                  Cookies.set('access', '')
                  window.location.assign('/')
                }
              } catch (error) {}
            })
          } else if (addressMode.data.network === 'ETH') {
            axios.get(`${serverAddress}/explorer/transaction/?network=ETH&txid=${hash}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
              SetTrData(EthereumTransaction(response.data))
              SetLoading(false)
              SetMode(1)
            })
            .catch(err => {
              SetLoading(false)
              try {
                if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                  Cookies.set('refresh', '')
                  Cookies.set('access', '')
                  window.location.assign('/')
                }
              } catch (error) {}
            })
          } else if (addressMode.data.network === 'LTC') {
            axios.get(`${serverAddress}/explorer/transaction/?network=LTC&txid=${hash}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
              SetTrData(LitecoinTransaction(response.data))
              SetMode(1)
              SetLoading(false)
            })
            .catch(err => {
              SetLoading(false)
              console.log(err)
              try {
                if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                  Cookies.set('refresh', '')
                  Cookies.set('access', '')
                  window.location.assign('/')
                }
              } catch (error) {}
            })
          }
        } else if (addressMode.data.query === 'address') {
          if (addressMode.data.network === 'BTC') {
            axios.get(`${serverAddress}/explorer/address?address=${hash}&network=BTC&page_size=50&offset=0`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
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
              SetAdData(BitcoinAddress(response.data.result, hash))
              SetMode(2)
            })
            .catch((err) => {
              SetLoading(false)
              try {
                if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                  Cookies.set('refresh', '')
                  Cookies.set('access', '')
                  window.location.assign('/')
                }
              } catch (error) {}
            })
          } else if (addressMode.data.network === 'ETH') {
            axios.get(`${serverAddress}/explorer/address?address=${hash}&network=ETH&page_size=50&offset=1`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
              SetLoading(false)
              SetAddress(document.getElementById("transactionValue").value)
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
              SetAdData(EthereumAddress(response.data, document.getElementById("transactionValue").value))
              SetMode(2)
            })
            .catch((err) => {
              SetLoading(false)
              try {
                if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                  Cookies.set('refresh', '')
                  Cookies.set('access', '')
                  window.location.assign('/')
                }
              } catch (error) {}
            })
          } else if (addressMode.data.network === 'LTC') {
            axios.get(`${serverAddress}/explorer/address?network=LTC&offset=0&address=${hash}&page_size=50`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
    
              SetLoading(false)
              SetCoinData({
                name:'لایت کوین',
                symbole:"LTC",
                risk:"0%",
                owner:"بدون اطلاعات",
                ownerMode:"بدون اطلاعات",
                website:"بدون اطلاعات",
                color:"#345d9d",
                image:"LTC.png"
              })
              SetAdData(LitecoinAddress(response.data.result, hash))
              SetMode(2)
            })
            .catch((err) => {
              SetLoading(false)
              console.log(err)
              try {
                if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                  Cookies.set('refresh', '')
                  Cookies.set('access', '')
                  window.location.assign('/')
                }
              } catch (error) {}
            })
          }
        }
      })
      .catch((err) => {
        SetLoading(false)
        console.log(err)
        try {
          if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
        } catch (error) {}
        try {
          if (err.response.data.detail === 'Not found.') {
            return toast.error('آدرس مورد نظر یافت نشد.', {
              position: 'bottom-left'
            })
          }
        } catch (error) {}
      })
    }
  }, [])

  const onSubmit = (event) => {
    const inputValue=(document.getElementById("transactionValue").value)
    event.preventDefault()
    window.location.assign(`/researcher/${inputValue}`)
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

  const myInputRef = useRef(null)

  const focusInput = () => {
    myInputRef.current.focus()
  }

  //login check
  useEffect(() => {
    try {
        const access = Cookies.get('access')
        const decoded = jwt.decode(access)
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime || !decoded || decoded === '') {
            window.location.assign('/')
        } else {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
        }
    } catch {
    }
  }, [])

  return (
    <UILoader ref={myInputRef} blocking={Loading} loader={<Spinner />}  id="loadingElement" style={{height:"100vh", zIndex:"1000000000000000"}}>
    <div id='dashboard' class='container-fluid'>
      {
        mode === 0 ?
        <div class="row main_row1">
            <div class="col-lg-3">
            </div>
            <div class="col-lg-6 middleBox" id='hamoniKeBayadBiadBala' style={{marginTop:"160px" }}>
              {
                // eslint-disable-next-line multiline-ternary
                mode === 0 ?
                // eslint-disable-next-line multiline-ternary
                <h3 style={{ display:"block", textAlign:"center", color:"#497979"}}>آدرس یا شناسه تراکنش را به کمک <span class="vazir" style={{color:MainSiteOrange}}>پنتا</span> جست و جو کنید!</h3>
              :
                null
              }
              <form id='myMainForm' onSubmit={ (event) => { 
                onSubmit(event)
                focusInput() 
              } }>
                <InputGroup className='mb-2' style={{ height:'50px', paddingTop:'0px'}}>
                  <Input type='text' id='transactionValue' class="form-control vazir m-0 bg-white" placeholder='شناسه تراکنش، آدرس کیف پول' style={{marginTop:'0px', backgroundColor:"white", width:"80%", borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}/>
                  <InputGroupText  onClick={ (event) => { onSubmit(event) } } style={{marginTop:"0px", borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px", borderTopRightRadius:"0px", borderBottomRightRadius:"0px", height:"50px", cursor:"pointer"}}>
                    <Search size={20} />
                  </InputGroupText>
                </InputGroup>
              </form>
              {
                // eslint-disable-next-line multiline-ternary
                mode === 0 ?
                  <Label className='form-label' for='transactionValue'>
                    <p class="vazir" id='searchExample11'>
                      نمونه کاوش:
                      <span class="ms-1" onClick={() => { document.getElementById('transactionValue').value = '0xf9BCc0e756F0a8A6ac3EEc744e8BDB19a488E131' }}>
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
            <form id='myMainForm' onSubmit={ (event) => { onSubmit(event) } }>
                <InputGroup className='mb-2'>
                  <Input type='text' id='transactionValue' class="form-control vazir m-auto bg-white" placeholder='شناسه تراکنش، آدرس کیف پول' style={{backgroundColor:"white", width:"70%", borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}/>
                  <InputGroupText id='MainSubmitBotton' onClick={ (event) => { onSubmit(event) } } style={{ borderTopLeftRadius:"10px", borderBottomLeftRadius:"10px", borderTopRightRadius:"0px", borderBottomRightRadius:"0px", height:"50px", cursor:"pointer"}}>
                    <Search size={20} />
                  </InputGroupText>
                </InputGroup>
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