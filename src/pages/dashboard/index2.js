/* eslint-disable prefer-const */
/* eslint-disable space-infix-ops */
/* eslint-disable no-duplicate-imports */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import './newStyle.css'
import { useState, useEffect, useRef } from 'react'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import TransactionDetail from './txSearch/transactionDetail/transactionDetail'
import Walletdetail from './WSearch/walletDetail/walletdetail'
import { useDispatch } from 'react-redux'
import { MainSiteGray, MainSiteOrange } from '../../../public/colors'
import axios from 'axios'
import { serverAddress } from '../../address'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { Search } from 'react-feather'
import { useParams } from "react-router-dom"
import {Col, Row, InputGroup, Input, InputGroupText} from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import TokenInformation from '../../components/dashboard/TokenInformation'

const EcommerceDashboard2 = () => {
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

        if ((getData[i].inputs[j].coin.address.address)===address) {
          input=input+Number(getData[i].inputs[j].coin.value)
        }
      }
      for (let j=0; j<getData[i].outputs.length; j++) {

        if ((getData[i].outputs[j].address)===address) {
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

      if (typeof (timeStamp) !== 'number') {
        throw new Error('timestamp Error')
      }

      if (typeof (from) !== 'string' && from !== null) {
        throw new Error('from Error')
      }

      if (typeof (to) !== 'string' && to !== null) {
        throw new Error('to Error')
      }

      if (typeof (value) !== 'number') {
        throw new Error('value Error')
      }

      if (typeof (hash) !== 'string') {
        throw new Error('hash Error')
      }

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

    //check values
    for (let i=0; i<data.length; i++) {
      if (typeof (data[i].timeStamp) !== 'number') {
        throw new Error('timestamp Error')
      }

      if (typeof (data[i].from) !== 'string' && from !== null) {
        throw new Error('from Error')
      }

      if (typeof (data[i].to) !== 'string' && to !== null) {
        throw new Error('to Error')
      }

      if (typeof (data[i].gasUsed) !== 'number') {
        throw new Error('value Error')
      }

      if (typeof (data[i].gasPrice) !== 'number') {
        throw new Error('value Error')
      }

      if (typeof (data[i].value) !== 'number') {
        throw new Error('value Error')
      }

      if (typeof (data[i].hash) !== 'string') {
        throw new Error('hash Error')
      }

      if (typeof (data[i].currencyType) !== 'string') {
        throw new Error('hash Error')
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

    //check values
    for (let i=0; i<data.length; i++) {
      if (typeof (data[i].timeStamp) !== 'number') {
        throw new Error('timestamp Error')
      }

      if (typeof (data[i].from) !== 'string' && from !== null) {
        throw new Error('from Error')
      }

      if (typeof (data[i].to) !== 'string' && to !== null) {
        throw new Error('to Error')
      }

      if (typeof (data[i].gasUsed) !== 'number') {
        throw new Error('value Error')
      }

      if (typeof (data[i].gasPrice) !== 'number') {
        throw new Error('value Error')
      }

      if (typeof (data[i].value) !== 'number') {
        throw new Error('value Error')
      }

      if (typeof (data[i].hash) !== 'string') {
        throw new Error('hash Error')
      }
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
      if (data.inputs[i].coin.address.address !== null) {
        inputData.push({
          BTCAmount:((data.inputs[i].coin.value)/100000000),
          RiskScore:"0%",
          address:data.inputs[i].coin.address.address
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
      if (data.outputs[i].address.address !== null) {
        outputData.push({
          BTCAmount:((data.outputs[i].value)/100000000),
          RiskScore:"0%",
          address:data.outputs[i].address.address
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

    if (typeof (blockNumber) !== 'number') {
      throw new Error('blockNumber Error')
    }

    if (typeof (BlockDate) !== 'number') {
      throw new Error('BlockDate Error')
    }

    if (typeof (TotalOutput) !== 'number') {
      throw new Error('TotalOutput Error')
    }

    if (typeof (TotalInput) !== 'number') {
      throw new Error('TotalInput Error')
    }

    if (typeof (fee) !== 'number') {
      throw new Error('fee Error')
    }

    if (typeof (address) !== 'string' && address !== null) {
      throw new Error('address Error')
    }

    if (typeof (BTCAmount) !== 'number') {
      throw new Error('BTCAmount Error')
    }

    for (let i=0; i<inputData.length; i++) {
      if (typeof (inputData[i].BTCAmount) !== 'number') {
        throw new Error('InpDataBTCAmount Error')
      }
    }

    for (let i=0; i<outputData.length; i++) {
      if (typeof (outputData[i].BTCAmount) !== 'number') {
        throw new Error('OutDataBTCAmount Error')
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

    if (typeof (blockNumber) !== 'number') {
      throw new Error('blockNumber Error')
    }

    if (typeof (BlockDate) !== 'number') {
      throw new Error('BlockDate Error')
    }

    if (typeof (TotalOutput) !== 'number') {
      throw new Error('TotalOutput Error')
    }

    if (typeof (fee) !== 'number') {
      throw new Error('fee Error')
    }

    if (typeof (TotalInput) !== 'number') {
      throw new Error('TotalInput Error')
    }

    if (typeof (address) !== 'string' && address !== null) {
      throw new Error('address Error')
    }


    for (let i=0; i<transfers.length; i++) {
      if (typeof (transfers[i].amount) !== 'number') {
        throw new Error('InpDataamount Error')
      }

      if (typeof (transfers[i].from) !== 'string') {
        throw new Error('InpDatafrom Error')
      }

      if (typeof (transfers[i].to) !== 'string') {
        throw new Error('InpDatato Error')
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
    const fee=Number(data.fee)
    let TotalOutput=0
    let TotalInput=0
    const inputData=[]
    const outputData=[]

    for (let i=0; i<data.inputs.length; i++) {
      try {
        if (data.inputs[i].coin.address.address !== null) {
          inputData.push({
            BTCAmount:(Number(data.inputs[i].coin.value)/1),
            RiskScore:"0%",
            address:data.inputs[i].coin.address.address
          })
        } else {
            inputData.push({
            BTCAmount:((data.inputs[i].coin.value)/1),
            RiskScore:"0%",
            address:'coin base'
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    try {
      for (let i=0; i<data.outputs.length; i++) {
        if (data.outputs[i].address.address !== null) {
          outputData.push({
            BTCAmount:(Number(data.outputs[i].value)/1),
            RiskScore:"0%",
            address:data.outputs[i].address.address
          })
        } else {
            outputData.push({
            BTCAmount:((data.outputs[i].value)/1),
            RiskScore:"0%",
            address:'coin base'
          })
        }
      }
    } catch (error) {
      console.log(error)
    }

    const RiskScore='0%'
    const BTCAmount=1234
    const isUTXOBase=true
    console.log(inputData)
    console.log(outputData)

    if (typeof (blockNumber) !== 'number') {
      throw new Error('blockNumber Error')
    }

    if (typeof (BlockDate) !== 'number') {
      throw new Error('BlockDate Error')
    }

    if (typeof (TotalOutput) !== 'number') {
      throw new Error('TotalOutput Error')
    }

    if (typeof (fee) !== 'number') {
      throw new Error('fee Error')
    }

    if (typeof (TotalInput) !== 'number') {
      throw new Error('TotalInput Error')
    }

    if (typeof (address) !== 'string' && address !== null) {
      throw new Error('address Error')
    }

    if (typeof (BTCAmount) !== 'number') {
      throw new Error('BTCAmount Error')
    }

    for (let i=0; i<inputData.length; i++) {
      if (typeof (inputData[i].BTCAmount) !== 'number') {
        throw new Error('InpDataBTCAmount Error')
      }
    }

    for (let i=0; i<outputData.length; i++) {
      if (typeof (outputData[i].BTCAmount) !== 'number') {
        throw new Error('OutDataBTCAmount Error')
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
      BTCAmount,
      inputData,
      outputData,
      isUTXOBase,
      fee
    })
  }

  useEffect(() => {
    if (hash !== undefined) {
    //   document.getElementById("transactionValue").value=hash
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
              try {
                SetTrData(BitcoinTransaction(response.data))
                SetMode(1)
                SetLoading(false)
              } catch (error) {
                console.log(error)
                return toast.error('خطا در دریافت اطلاعات از سرور', {
                  position: 'bottom-left'
                })
              }

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
              SetLoading(false)
              try {
                SetTrData(EthereumTransaction(response.data))
                SetMode(1)
              } catch (error) {
                console.log(error)
                return toast.error('خطا در دریافت اطلاعات از سرور', {
                  position: 'bottom-left'
                })
              }
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
              SetLoading(false)
              try {
                SetTrData(LitecoinTransaction(response.data))
                SetMode(1)
              } catch (error) {
                console.log(error)
                return toast.error('خطا در دریافت اطلاعات از سرور', {
                  position: 'bottom-left'
                })
              }
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
              try {
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
                SetLoading(false)
              } catch (error) {
                console.log(error)
                SetLoading(false)
                return toast.error('خطا در دریافت اطلاعات از سرور', {
                  position: 'bottom-left'
                })
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
              try {
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
              } catch (error) {
                console.log(error)
                SetLoading(false)
                return toast.error('خطا در دریافت اطلاعات از سرور', {
                  position: 'bottom-left'
                })
              }
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
              try {
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
              } catch (error) {
                console.log(error)
                SetLoading(false)
                return toast.error('خطا در دریافت اطلاعات از سرور', {
                  position: 'bottom-left'
                })
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
    const inputValue=(document.getElementById("MainDashboardInputBox").value)
    event.preventDefault()
    window.location.assign(`/researcher/${inputValue}`)
  }

  useEffect(() => {
    dispatch({type:"SHOWNAVBAR"})
    dispatch({type:"SETWITCHPAGE", value:1})
  }, [])

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
              <Row>
                <Col xl={{size:1}} lg={{size:1}} md={{size:0}} >
                </Col>

                <Col xl={{size:10}} lg={{size:10}} md={{size:12}} style={{textAlign:'center'}} id='CenterDashboardBox'>
                    <Row className='pt-5 pb-5' id='DashboardTopRow'>
                        <Col xl={{size:3}} lg={{size:2}} md={{size:1}} sm={{size:0}}>
                        </Col>

                        <Col xl={{size:6}} lg={{size:8}} md={{size:10}} sm={{size:12}} style={{marginTop:'80px', marginBottom:'32px'}}>
                            <h4 style={{color:'#2f4f4f'}}>
                                آدرس یا شناسه تراکنش خود را به کمک
                                <span style={{color:MainSiteOrange}}> پنتا </span> 
                                جست‌وجو کنید!
                            </h4>
                            <form onSubmit={ (event) => { 
                                    onSubmit(event)
                                    focusInput() 
                                }}>
                                <InputGroup id='MainDashboardInputGroup' className='input-group-merge mb-2' style={{direction:'ltr', borderColor:'red', width:'100%'}}>
                                    <InputGroupText id='MainDashboardInputSymbole' onClick={ (event) => { onSubmit(event) } }>
                                        <Search size={16} />
                                    </InputGroupText>
                                    <Input id='MainDashboardInputBox' placeholder='آدرس یا شناسه تراکنش...' />
                                </InputGroup>
                            </form>
                            <p class="vazir"  style={{display:'inline-block', width:'100%', textAlign:'right'}}>
                                نمونه کاوش:
                                <span onClick={() => (document.getElementById('MainDashboardInputBox').value = '1Fw7wvVPhv5eioWQZ2if2zRUcHNdNBfu9r')} style={{display:'inline-block', marginLeft:'12px', marginRight:'12px', cursor:'pointer'}}>
                                    <ion-icon name="file-tray-stacked-outline"></ion-icon>
                                    {' '}
                                    <p  style={{display:'inline-block'}}> آدرس </p>
                                </span>
                                <span onClick={() => (document.getElementById('MainDashboardInputBox').value = '0xb515742dc2065871c98c411a5e55c4cca102cb7c7cd48b093a2a659c546e8035')} style={{display:'inline-block', cursor:'pointer'}} >
                                    <ion-icon name="git-compare-outline"></ion-icon>
                                    {' '}
                                    <p  style={{display:'inline-block'}}> تراکنش </p>
                                </span>
                            </p>
                        </Col>

                        <Col xl={{size:3}} lg={{size:2}} md={{size:1}} sm={{size:0}}>
                        </Col>
                    </Row>
                    <Row style={{background:'white'}} className=' pt-5 pb-4'>
                        <Col xl={{size:12}} className='pe-4'>
                            <h4 style={{ textAlign:'right'}}>
                                شبکه های پشتیبانی شده
                            </h4>
                        </Col>
                    </Row>
                    <Row style={{background:'white'}} className='pb-3'>
                        <Col xl='4' md='6' className='ps-4 pe-4'>
                            <TokenInformation TokenImage={'BTC.png'} TokenTitle={'بیت کوین'} TokenDescription={'بیت‌کوین یک ارز دیجیتال غیرمتمرکز، بدون بانک مرکزی یا مدیر واحد است که می‌تواند بدون نیاز به واسطه از کاربر به کاربر دیگر در شبکه بیت‌کوین همتا به همتا ارسال شود.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation TokenImage={'ETH.png'} TokenTitle={'اتریوم'} TokenDescription={'اتریوم یک پلتفرم غیرمتمرکز است که امکان ایجاد و اجرای قراردادهای هوشمند را با ارز دیجیتال بومی خود به نام «اتر» فراهم می‌کند.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation TokenImage={'BCH.png'} TokenTitle={'بیت کوین کش'} TokenDescription={'پول نقد الکترونیکی همتا به همتا'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation TokenImage={'LTC.png'} TokenTitle={'لایت کوین'} TokenDescription={'لایت کوین یک ارز دیجیتال همتا به همتا است که به عنوان یک نسخه سبک تر از بیت کوین ایجاد شده است و زمان تراکنش سریع تر و الگوریتم هش متفاوت را ارائه می دهد.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation TokenImage={'BNB.png'} TokenTitle={'بایننس اسمارت چین'} TokenDescription={'BSC یا زنجیره هوشمند بایننس یک پلتفرم بلاک چین است که توسط صرافی بایننس برای ایجاد و اجرای قراردادهای هوشمند ساخته شده است که اغلب به دلیل تراکنش های سریع و کارمزدهای پایین تر در مقایسه با اتریوم شناخته می شود.'}/>
                        </Col>
                    </Row>
                </Col>

                <Col xl={{size:1}} lg={{size:1}} md={{size:0}}>
                </Col>
              </Row>
            :
            null
        }

        <Row class="row row2 pb-2">
            <Col xl={{size:2}} lg={{size:1}} md={{size:1}} class="col-lg-2">
            </Col>
            <Col xl={{size:8}} lg={{size:10}} md={{size:10}} sm={{size:12}} class="col-lg-8 p-0">
            {
                mode === 1 ? <TransactionDetail data={trData}/> : null
            }
            {
                mode === 2 ? <Walletdetail data={adData} address={address} coinData={coinData}/> : null
            }
            </Col>
            <Col class="col-lg-2">
            </Col>
        </Row>
    </div>
    </UILoader>
  )
}

export default EcommerceDashboard2