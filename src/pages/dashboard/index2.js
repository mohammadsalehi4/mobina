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

//processors
import { UTXOTransaction } from '../../processors/UTXOTransaction'
import { UTXOAddress } from '../../processors/UTXOAddress'
import { AccountBaseTransaction } from '../../processors/AccountBaseTransaction'
import { AccountBaseAddress } from '../../processors/AccountBaseAddress'

const EcommerceDashboard2 = () => {
  const { hash } = useParams()

  const dispatch = useDispatch()
  const [mode, SetMode] = useState(0)
  const [trData, SetTrData] = useState({})
  const [adData, SetAdData] = useState({})
  const [Loading, SetLoading] = useState(false)
  const [address, SetAddress] = useState('0x62Dece3416741fcEECA25A50A584a37037eadc04')
  const [coinData, SetCoinData] = useState({})
  const [labelData, SetLabelData] = useState({})
  const [TagData, SetTagData] = useState({})
  
  const UTXOAdd =(getData) => {
    let data=[]
    for (let i=0; i<getData.inputs.length; i++) {

      let timeStamp=getData.inputs[i].timestamp
      let from = 'test'
      let to = getData.address
      let gasUsed = getData.inputs[i].fee
      let gasPrice = 1
      let value = Number(getData.inputs[i].value)
      let hash = getData.inputs[i].hash

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

    for (let i=0; i<getData.outputs.length; i++) {

      let timeStamp=getData.outputs[i].timestamp
      let from = getData.address
      let to = 'test'
      let gasUsed = getData.outputs[i].fee
      let gasPrice = 1
      let value = Number(getData.outputs[i].value)
      let hash = getData.outputs[i].hash

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

  const AccountBaseAdd =(getData) => {
    let data = []
    for (let i = 0; i < getData.inputs.length; i++) {
      data.push({
        timeStamp:getData.inputs[i].timestamp,
        from:getData.inputs[i].address,
        to:getData.address,
        gasUsed:getData.inputs[i].fee,
        gasPrice:1,
        value:(Number(getData.inputs[i].value)),
        hash:getData.inputs[i].hash,
        currencyType:"ETH",
        Logo:"ETH.png",
        Type:"coin"
      })
    }

    for (let i = 0; i < getData.outputs.length; i++) {
      data.push({
        timeStamp:getData.outputs[i].timestamp,
        from:getData.address,
        to:getData.outputs[i].address,
        gasUsed:getData.outputs[i].fee,
        gasPrice:1,
        value:(Number(getData.outputs[i].value)),
        hash:getData.outputs[i].hash,
        currencyType:"ETH",
        Logo:"ETH.png",
        Type:"coin"
      })
    }

    for (let i = 0; i < getData.logs.inputs.length; i++) {
      data.push({
        timeStamp:getData.logs.inputs[i].timestamp,
        from:getData.logs.inputs[i].address,
        to:getData.address,
        gasUsed:getData.logs.inputs[i].fee,
        gasPrice:1,
        value:(Number(getData.logs.inputs[i].value)),
        hash:getData.logs.inputs[i].hash,
        currencyType:getData.logs.inputs[i].symbole,
        Logo:`${getData.logs.inputs[i].symbole}.png`,
        Type:"token"
      })
    }

    for (let i = 0; i < getData.logs.outputs.length; i++) {
      data.push({
        timeStamp:getData.logs.outputs[i].timestamp,
        from:getData.address,
        to:getData.logs.outputs[i].address,
        gasUsed:getData.logs.outputs[i].fee,
        gasPrice:1,
        value:(Number(getData.logs.outputs[i].value)),
        hash:getData.logs.outputs[i].hash,
        currencyType:getData.logs.outputs[i].symbole,
        Logo:`${getData.logs.outputs[i].symbole}.png`,
        Type:"token"
      })
    }

    return data
  }

  const UTXOTr =(data) => {

    const CurrencyPrice=28000
    const USDPrice=490000
    const fee=data.fee
    const address=data.hash
    const blockNumber=data.blockNumber
    const name='بیت کوین'
    const image='BTC.png'
    const BlockDate=data.time
    const symbole="BTC"
    const color='#f8a23a'
    let TotalOutput=0
    let TotalInput=0
    let BTCAmount = 0
    const inputData=[]
    const outputData=[]
    for (let i=0; i<data.inputs.length; i++) {
      if (data.inputs[i].address !== null) {
        inputData.push({
          BTCAmount:data.inputs[i].value,
          RiskScore:"0%",
          address:data.inputs[i].address
        })
      } else {
        inputData.push({
          BTCAmount:data.inputs[i].value,
          RiskScore:"0%",
          address:'coin base'
        })
      }
      BTCAmount = BTCAmount + data.inputs[i].value
    }
    for (let i=0; i<data.outputs.length; i++) {
      if (data.outputs[i].address !== null) {
        outputData.push({
          BTCAmount:data.outputs[i].value,
          RiskScore:"0%",
          address:data.outputs[i].address
        })
      } else {
        outputData.push({
          BTCAmount:data.outputs[i].value,
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

  const AccountBaseTr =(data) => {
    console.log(data)
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
    let fee = data.fee
    let transfers=[]

    if (data.from !== null && data.to !== null) {
      transfers.push({
        from:data.from,
        to:data.to,
        currencyType:'ETH',
        amount:data.value
      })
    } else if (data.from === null && data.to !== null) {
      transfers.push({
        from:'coin base',
        to:data.to,
        currencyType:'ETH',
        amount:data.value
      })
    } else if (data.from !== null && data.to === null) {
      transfers.push({
        from:data.from,
        to:'coin base',
        currencyType:'ETH',
        amount:data.value
      })
    } else {
      transfers.push({
        from:'coin base',
        to:'coin base',
        currencyType:'ETH',
        amount:data.value
      })
    }

    for (let i=0; i<data.logs.length; i++) {
      if (data.logs[i].symbole) {
        try {
          if (data.logs[i].from !== null && data.logs[i].to !== null) {
            transfers.push({
              from:data.logs[i].from,
              to:data.logs[i].to,
              currencyType:data.logs[i].symbole,
              amount:data.logs[i].value
            })
          } else if (data.logs[i].from === null && data.logs[i].to !== null) {
            transfers.push({
              from:'coin base',
              to:data.logs[i].to,
              currencyType:data.logs[i].symbole,
              amount:data.logs[i].value
            })
          } else if (data.logs[i].from !== null && data.logs[i].to === null) {
            transfers.push({
              from:data.logs[i].from,
              to:'coin base',
              currencyType:data.logs[i].symbole,
              amount:data.logs[i].value
            })
          } else {
            transfers.push({
              from:'coin base',
              to:'coin base',
              currencyType:data.logs[i].symbole,
              amount:data.logs[i].value
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
            try {
              SetTrData(UTXOTr(UTXOTransaction(addressMode.data.data, 'BTC', 100000000)))
              
              //labels
              let labelText = null
              let labelId = null
              if (addressMode.data.data.label_tag.labels.length > 0) {
                labelText = addressMode.data.data.label_tag.labels[0].label
                labelId = addressMode.data.data.label_tag.labels[0].id
              }
              SetLabelData(
                {
                  labelText,
                  labelId
                }
              )

              //tags
              let isTag = false
              let TagInfo = []
              if (addressMode.data.data.label_tag.tags.length > 0) {
                isTag = true
                for (let i = 0; i < addressMode.data.data.label_tag.tags.length; i++) {
                  TagInfo.push(
                    {
                      tagText:addressMode.data.data.label_tag.tags[i].tag,
                      tagId:addressMode.data.data.label_tag.tags[i].id
                    }
                  )
                }
              }

              SetTagData(
                {
                  isTag,
                  TagInfo
                }
              )

              SetMode(1)
              SetLoading(false)
            } catch (error) {
              console.log(error)
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }
          } else if (addressMode.data.network === 'ETH') {
            SetLoading(false)
            try {
              // SetTrData
              SetTrData(AccountBaseTr(AccountBaseTransaction(addressMode.data.data, 'ETH', 1000000000000000000)))

              //labels
              let labelText = null
              let labelId = null
              if (addressMode.data.data.label_tag.labels.length > 0) {
                labelText = addressMode.data.data.label_tag.labels[0].label
                labelId = addressMode.data.data.label_tag.labels[0].id
              }
              SetLabelData(
                {
                  labelText,
                  labelId
                }
              )

              //tags
              let isTag = false
              let TagInfo = []
              if (addressMode.data.data.label_tag.tags.length > 0) {
                isTag = true
                for (let i = 0; i < addressMode.data.data.label_tag.tags.length; i++) {
                  TagInfo.push(
                    {
                      tagText:addressMode.data.data.label_tag.tags[i].tag,
                      tagId:addressMode.data.data.label_tag.tags[i].id
                    }
                  )
                }
              }

              SetTagData(
                {
                  isTag,
                  TagInfo
                }
              )

              SetMode(1)
            } catch (error) {
              console.log(error)
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }
          } else if (addressMode.data.network === 'LTC') {
            SetLoading(false)
            return toast.error('لایت کوین سرچ نکن!!', {
              position: 'bottom-left'
            })
          }
        } else if (addressMode.data.query === 'address') {
          if (addressMode.data.network === 'BTC') {
            SetLoading(false)
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

              //labels
              let labelText = null
              let labelId = null
              if (addressMode.data.data.labels_tags.labels.length > 0) {
                labelText = addressMode.data.data.labels_tags.labels[0].label
                labelId = addressMode.data.data.labels_tags.labels[0].id
              }
              SetLabelData(
                {
                  labelText,
                  labelId
                }
              )

              //tags
              let isTag = false
              let TagInfo = []
              if (addressMode.data.data.labels_tags.tags.length > 0) {
                isTag = true
                for (let i = 0; i < addressMode.data.data.labels_tags.tags.length; i++) {
                  TagInfo.push(
                    {
                      tagText:addressMode.data.data.labels_tags.tags[i].tag,
                      tagId:addressMode.data.data.labels_tags.tags[i].id
                    }
                  )
                }
              }
              SetTagData(
                {
                  isTag,
                  TagInfo
                }
              )

              SetAdData(UTXOAdd(UTXOAddress(addressMode.data.data, hash, 'BTC', 100000000)))
              SetMode(2)
              SetLoading(false)
            } catch (error) {
              console.log(error)
              SetLoading(false)
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }
          } else if (addressMode.data.network === 'ETH') {
              try {
                SetAddress(hash)
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

              //labels
              let labelText = null
              let labelId = null
              if (addressMode.data.data.labels_tags.labels.length > 0) {
                labelText = addressMode.data.data.labels_tags.labels[0].label
                labelId = addressMode.data.data.labels_tags.labels[0].id
              }
              SetLabelData(
                {
                  labelText,
                  labelId
                }
              )

              //tags
              let isTag = false
              let TagInfo = []
              if (addressMode.data.data.labels_tags.tags.length > 0) {
                isTag = true
                for (let i = 0; i < addressMode.data.data.labels_tags.tags.length; i++) {
                  TagInfo.push(
                    {
                      tagText:addressMode.data.data.labels_tags.tags[i].tag,
                      tagId:addressMode.data.data.labels_tags.tags[i].id
                    }
                  )
                }
              }
              SetTagData(
                {
                  isTag,
                  TagInfo
                }
              )
                SetAdData(AccountBaseAdd(AccountBaseAddress(addressMode.data.data, hash, 'BTC', 1000000000000000000)))
                SetMode(2)
              } catch (error) {
                console.log(error)
                SetLoading(false)
                return toast.error('خطا در دریافت اطلاعات از سرور', {
                  position: 'bottom-left'
                })
              }
          } else if (addressMode.data.network === 'LTC') {
            SetLoading(false)
            return toast.error('لایت کوین سرچ نکن!!', {
              position: 'bottom-left'
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
    <UILoader  blocking={Loading} loader={<Spinner />}  id="loadingElement" style={{height:"100vh", zIndex:"1000000000000000"}}>
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
                            <form  onSubmit={ (event) => { 
                                    onSubmit(event)
                                }}>
                                <InputGroup id='MainDashboardInputGroup' className='input-group-merge mb-2' style={{direction:'ltr', borderColor:'red', width:'100%'}}>
                                    <InputGroupText id='MainDashboardInputSymbole' onClick={ (event) => { 
                                      onSubmit(event) 
                                    } }>
                                        <Search size={16} />
                                    </InputGroupText>
                                    <Input ref={myInputRef} id='MainDashboardInputBox' placeholder='آدرس یا شناسه تراکنش...' />
                                </InputGroup>
                                <p class="vazir"  style={{display:'inline-block', width:'100%', textAlign:'right'}}>
                                    نمونه کاوش:
                                    <span onClick={() => {
                                      document.getElementById("MainDashboardInputBox").focus()
                                      document.getElementById('MainDashboardInputBox').value = '1CpfTRNPjoy8hP6GEgySBwMxkYcJaNLtoj' 
                                    }} style={{display:'inline-block', marginLeft:'12px', marginRight:'12px', cursor:'pointer'}}>
                                        <ion-icon name="file-tray-stacked-outline"></ion-icon>
                                        {' '}
                                        <p  style={{display:'inline-block'}}> آدرس </p>
                                    </span>
                                    <span onClick={() => {
                                      document.getElementById("MainDashboardInputBox").focus()
                                      document.getElementById('MainDashboardInputBox').value = '0xd4c84b4e935f1e493e55295ebccdbb3744c2d1a444a03d150f23206900a618dd'
                                    }} style={{display:'inline-block', cursor:'pointer'}} >
                                        <ion-icon name="git-compare-outline"></ion-icon>
                                        {' '}
                                        <p  style={{display:'inline-block'}}> تراکنش </p>
                                    </span>
                                </p>
                            </form>

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
                            <TokenInformation color1="primary" status="توسعه یافته" TokenImage={'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026'} TokenTitle={'بیت کوین'} TokenDescription={'بیت‌کوین یک ارز دیجیتال غیرمتمرکز، بدون بانک مرکزی یا مدیر واحد است که می‌تواند بدون نیاز به واسطه از کاربر به کاربر دیگر در شبکه بیت‌کوین همتا به همتا ارسال شود.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="primary" status="توسعه یافته" TokenImage={'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026'} TokenTitle={'اتریوم'} TokenDescription={'اتریوم یک پلتفرم غیرمتمرکز است که امکان ایجاد و اجرای قراردادهای هوشمند را با ارز دیجیتال بومی خود به نام «اتر» فراهم می‌کند.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="primary" status="توسعه یافته" TokenImage={'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=026'} TokenTitle={'بیت کوین کش'} TokenDescription={'پول نقد الکترونیکی همتا به همتا'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="primary" status="توسعه یافته" TokenImage={'https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=026'} TokenTitle={'لایت کوین'} TokenDescription={'لایت کوین یک ارز دیجیتال همتا به همتا است که به عنوان یک نسخه سبک تر از بیت کوین ایجاد شده است و زمان تراکنش سریع تر و الگوریتم هش متفاوت را ارائه می دهد.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="warning" status="در حال توسعه" TokenImage={'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026'} TokenTitle={'بایننس اسمارت چین'} TokenDescription={'BSC یا زنجیره هوشمند بایننس یک پلتفرم بلاک چین است که توسط صرافی بایننس برای ایجاد و اجرای قراردادهای هوشمند ساخته شده است که اغلب به دلیل تراکنش های سریع و کارمزدهای پایین تر در مقایسه با اتریوم شناخته می شود.'}/>
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
                mode === 1 ? <TransactionDetail data={trData} labelData={labelData} TagData={TagData}/> : null
            }
            
            {
                mode === 2 ? <Walletdetail labelData={labelData} TagData={TagData} data={adData} address={address} coinData={coinData}/> : null
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