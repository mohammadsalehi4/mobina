/* eslint-disable no-unused-expressions */
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
import { useDispatch, useSelector } from 'react-redux'
import { MainSiteGray, MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import axios from 'axios'
import { serverAddress } from '../../address'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { Search } from 'react-feather'
import { useParams } from "react-router-dom"
import {Col, Row, InputGroup, Input, InputGroupText, Card} from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import TokenInformation from '../../components/dashboard/TokenInformation'

//processors
import { UTXOTransaction } from '../../processors/UTXOTransaction'
import { UTXOAddress } from '../../processors/UTXOAddress'
import { AccountBaseTransaction } from '../../processors/AccountBaseTransaction'
import { AccountBaseAddress } from '../../processors/AccountBaseAddress'
import { BSCAddress } from '../../processors/BSCAddress'
import { BSCTransaction } from '../../processors/BSCTransaction'

//new processors
import { UTXO_Address } from '../../newProcessors/UTXO_Address'
import { UTXO_Transaction } from '../../newProcessors/UTXO_Transaction'
import { Account_Address } from '../../newProcessors/Account_Address'
import { Account_transaction } from '../../newProcessors/Account_transaction'

const EcommerceDashboard2 = () => {
  const { hash } = useParams()
  const { network } = useParams()

  const States = useSelector(state => state)
  const dispatch = useDispatch()

  const [mode, SetMode] = useState(0)
  const [trData, SetTrData] = useState({})
  const [adData, SetAdData] = useState({})
  const [Loading, SetLoading] = useState(false)
  const [address, SetAddress] = useState('0x62Dece3416741fcEECA25A50A584a37037eadc04')
  const [coinData, SetCoinData] = useState({})
  const [labelData, SetLabelData] = useState({})
  const [TagData, SetTagData] = useState({})
  const [Entity, SetEntity] = useState({})
  const [SelectToken, SetSelectToken] = useState(0)
  
  const UTXOAdd =(getData, symbol) => {
    
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
        currencyType:`${symbol}`,
        Logo:`${symbol}.png`,
        image:`${symbol}.png`,
        Type:`coin`
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
        currencyType:`${symbol}`,
        Logo:`${symbol}.png`,
        image:`${symbol}.png`,
        Type:"coin"
      })
    }

    return data
  }
  const AccountBaseAdd =(getData, symbol) => {
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
        currencyType:`${symbol}`,
        Logo:`${symbol}.png`,
        Type:`coin`
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
        currencyType:`${symbol}`,
        Logo:`${symbol}.png`,
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
  const UTXOTr =(data, symbol, name) => {

    const CurrencyPrice=28000
    const USDPrice=490000
    const fee=data.fee
    const address=data.hash
    const blockNumber=data.blockNumber
    const image=`${symbol}.png`
    const BlockDate=data.time
    const symbole=symbol
    const color='#f8a23a'
    let TotalOutput=0
    let TotalInput=0
    let BTCAmount = 0
    let TotalAmount = 0
    const inputData=[]
    const outputData=[]
    for (let i=0; i<data.inputs.length; i++) {
      if (data.inputs[i].address !== null) {
        TotalInput = TotalInput+data.inputs[i].valueInDollar
        inputData.push({
          BTCAmount:data.inputs[i].value,
          RiskScore:"0%",
          address:data.inputs[i].address
        })
      } else {
        TotalInput = TotalInput+data.inputs[i].valueInDollar
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
        TotalOutput=TotalOutput+data.outputs[i].valueInDollar
        TotalAmount = TotalAmount + Number(data.outputs[i].value)
        outputData.push({
          BTCAmount:data.outputs[i].value,
          RiskScore:"0%",
          address:data.outputs[i].address
          
        })
      } else {
        TotalOutput=TotalOutput+data.outputs[i].valueInDollar
        TotalAmount = TotalAmount + Number(data.outputs[i].value)
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

    if (typeof (Number(fee)) !== 'number') {
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
      fee,
      TotalAmount
    })
  }
  const AccountBaseTr =(data, symbole, name) => {
    console.log(data)
    const blockNumber=data.blockNumber
    const address=data.hash
    const BlockDate=data.timestamp
    const image=`${symbole}.png`
    const color='#627eea'
    const RiskScore='0%'
    let TotalOutput=data.valueInDollar
    let TotalInput=data.valueInDollar
    const TotalAmount = data.value
    let fee = data.fee
    let transfers=[]

    if (data.from !== null && data.to !== null) {
      transfers.push({
        from:data.from,
        to:data.to,
        currencyType:symbole,
        amount:data.value
      })
    } else if (data.from === null && data.to !== null) {
      transfers.push({
        from:'coin base',
        to:data.to,
        currencyType:symbole,
        amount:data.value
      })
    } else if (data.from !== null && data.to === null) {
      transfers.push({
        from:data.from,
        to:'coin base',
        currencyType:symbole,
        amount:data.value
      })
    } else {
      transfers.push({
        from:'coin base',
        to:'coin base',
        currencyType:symbole,
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
      fee,
      TotalAmount
    })
  }

  //we know network
  const SelectProcessHandler = (network) => {

    const processData = (addressMode) => {

      //save to local storage
      const saveToStorage = (data) => {
        const newData = {
          data,
          time:Date.now()
        }
        if (localStorage.getItem(hash) === null) {
          localStorage.setItem(hash, JSON.stringify(newData))
        }
      }

      if (addressMode.data.query === 'transaction') {
        if (addressMode.data.network[0] === 'ETH') {
          SetLoading(false)
          try {
            // SetTrData
            SetTrData(AccountBaseTr(Account_transaction(addressMode.data.data, 'ETH', 1000000000000000000), 'ETH', 'اتریوم'))

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
        } else if (addressMode.data.network[0] === 'BSC') {
          SetLoading(false)
          try {
            // SetTrData
            SetTrData(AccountBaseTr(BSCTransaction(addressMode.data.data, 'BSC', 1000000000000000000), 'BNB', 'بایننس اسمارت چین'))
  
            //labels
            let labelText = null
            let labelId = null
            if (addressMode.data.data.tag_labels.labels.length > 0) {
              labelText = addressMode.data.data.tag_labels.labels[0].label
              labelId = addressMode.data.data.tag_labels.labels[0].id
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
            if (addressMode.data.data.tag_labels.tags.length > 0) {
              isTag = true
              for (let i = 0; i < addressMode.data.data.tag_labels.tags.length; i++) {
                TagInfo.push(
                  {
                    tagText:addressMode.data.data.tag_labels.tags[i].tag,
                    tagId:addressMode.data.data.tag_labels.tags[i].id
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
        } else if (addressMode.data.network[0] === 'BTC') {
          try {
            const GetData = UTXO_Transaction(addressMode.data.data, 'BTC', 1)
            if (!GetData.isError) {
                                                        
              //catch
              saveToStorage(addressMode)
              
              SetTrData(UTXOTr(GetData, 'BTC', 'بیت‌کوین'))
              dispatch({type:"networkName", value:'BTC'})
  
              //labels
              let labelText = null
              let labelId = null
              if (GetData.MainLabel) {
                labelText = GetData.MainLabel.label
                labelId = GetData.MainLabel.id
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
              if (GetData.MainTag) {
                isTag = true
                for (let i = 0; i <GetData.MainTag.length; i++) {
                  TagInfo.push(
                    {
                      tagText:GetData.MainTag[i].tag,
                      tagId:GetData.MainTag[i].id
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
            } else {
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }

          } catch (error) {
            console.log(error)
            return toast.error('خطا در دریافت اطلاعات از سرور', {
              position: 'bottom-left'
            })
          }
        } else if (addressMode.data.network[0] === 'LTC') {
          try {
            const GetData = UTXO_Transaction(addressMode.data.data, 'LTC', 1)
            if (!GetData.isError) {
                                                        
              //catch
              saveToStorage(addressMode)
              
              SetTrData(UTXOTr(GetData, 'LTC', 'لایت‌کوین'))
              dispatch({type:"networkName", value:'LTC'})
  
              //labels
              let labelText = null
              let labelId = null
              if (GetData.MainLabel) {
                labelText = GetData.MainLabel.label
                labelId = GetData.MainLabel.id
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
              if (GetData.MainTag) {
                isTag = true
                for (let i = 0; i <GetData.MainTag.length; i++) {
                  TagInfo.push(
                    {
                      tagText:GetData.MainTag[i].tag,
                      tagId:GetData.MainTag[i].id
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
            } else {
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }

          } catch (error) {
            console.log(error)
            return toast.error('خطا در دریافت اطلاعات از سرور', {
              position: 'bottom-left'
            })
          }
        } else if (addressMode.data.network[0] === 'BCH') {
          try {
            const GetData = UTXO_Transaction(addressMode.data.data, 'BCH', 1)


            if (!GetData.isError) {
                                          
              //catch
              saveToStorage(addressMode)
              
              SetTrData(UTXOTr(GetData, 'BCH', 'بیت کوین کش'))
              dispatch({type:"networkName", value:'BCH'})

              //labels
              let labelText = null
              let labelId = null
              if (GetData.MainLabel) {
                labelText = GetData.MainLabel.label
                labelId = GetData.MainLabel.id
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
              if (GetData.MainTag) {
                isTag = true
                for (let i = 0; i <GetData.MainTag.length; i++) {
                  TagInfo.push(
                    {
                      tagText:GetData.MainTag[i].tag,
                      tagId:GetData.MainTag[i].id
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
            } else {
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }

          } catch (error) {
            console.log(error)
            return toast.error('خطا در دریافت اطلاعات از سرور', {
              position: 'bottom-left'
            })
          }
        }
      } else if (addressMode.data.query === 'address') {
        if (addressMode.data.network[0] === 'ETH') {
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

              let isEntity = false
              let EntityInfo = false
              if (addressMode.data.data.entity !== null) {
                isEntity = true
                EntityInfo = addressMode.data.data.entity
              }
              SetEntity(
                {
                  isEntity,
                  EntityInfo
                }
              )

              SetAdData(AccountBaseAdd(Account_Address(addressMode.data.data, hash, 'ETH', 1000000000000000000), 'ETH'))
              SetMode(2)
            } catch (error) {
              console.log(error)
              SetLoading(false)
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }
        } else if (addressMode.data.network[0] === 'BSC') {
          
          try {
            SetAddress(hash)
            SetLoading(false)
            SetCoinData({
              name:'بایننس اسمارت چین',
              symbole:"BNB",
              risk:"0%",
              owner:"بدون اطلاعات",
              ownerMode:"بدون اطلاعات",
              website:"بدون اطلاعات",
              color:"#f3ba2f",
              image:"BNB.png"
          })

          //labels
          let labelText = null
          let labelId = null
          if (addressMode.data.data.tag_labels.labels.length > 0) {
            labelText = addressMode.data.data.tag_labels.labels[0].label
            labelId = addressMode.data.data.tag_labels.labels[0].id
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
          if (addressMode.data.data.tag_labels.tags.length > 0) {
            isTag = true
            for (let i = 0; i < addressMode.data.data.tag_labels.tags.length; i++) {
              TagInfo.push(
                {
                  tagText:addressMode.data.data.tag_labels.tags[i].tag,
                  tagId:addressMode.data.data.tag_labels.tags[i].id
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
          
          let isEntity = false
          let EntityInfo = false
          if (addressMode.data.data.tag_labels.entity !== null) {
            isEntity = true
            EntityInfo = addressMode.data.data.tag_labels.entity
          }
          SetEntity(
            {
              isEntity,
              EntityInfo
            }
          )

            SetAdData(AccountBaseAdd(BSCAddress(addressMode.data.data, hash, 'BNB', 1000000000000000000), 'BNB'))
            SetMode(2)
          } catch (error) {
            console.log(error)
            SetLoading(false)
            return toast.error('خطا در دریافت اطلاعات از سرور', {
              position: 'bottom-left'
            })
          }
        } else if (addressMode.data.network[0] === 'BTC') {
          SetLoading(false)
          dispatch({type:"networkName", value:'BTC'})
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
  
            //get data from processor
            const getData = UTXO_Address(hash, addressMode.data.data,  'BTC', 1)

            if (!getData.isError) {
                            
              //catch
              saveToStorage(addressMode)
              
              //labels
              let labelText = null
              let labelId = null
              if (getData.label) {
                labelText = getData.label.label
                labelId = getData.label.id
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
              if (getData.tag) {
                isTag = true
                for (let i = 0; i < getData.tag.length; i++) {
                  TagInfo.push(
                    {
                      tagText:getData.tag[i].tag,
                      tagId:getData.tag[i].id
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

              //entity
              let isEntity = false
              let EntityInfo = false
              if (getData.entity !== null) {
                isEntity = true
                EntityInfo = getData.entity
              }
              SetEntity(
                {
                  isEntity,
                  EntityInfo
                }
              )
              SetAdData(UTXOAdd(getData, 'BTC'))
              SetMode(2)
              SetLoading(false)
            } else {
              SetLoading(false)
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }
          } catch (error) {
            console.log(error)
            SetLoading(false)
            return toast.error('خطا در دریافت اطلاعات از سرور', {
              position: 'bottom-left'
            })
          }
        } else if (addressMode.data.network[0] === 'LTC') {
          SetLoading(false)
          dispatch({type:"networkName", value:'LTC'})
          try {
            SetCoinData({
              name:'لایت‌کوین',
              symbole:"LTC",
              risk:"0%",
              owner:"بدون اطلاعات",
              ownerMode:"بدون اطلاعات",
              website:"بدون اطلاعات",
              color:"#345d9d",
              image:"LTC.png"
            })
  
            //get data from processor
            const getData = UTXO_Address(hash, addressMode.data.data,  'LTC', 1)

            if (!getData.isError) {
                            
              //catch
              saveToStorage(addressMode)

              //labels
              let labelText = null
              let labelId = null
              if (getData.label) {
                labelText = getData.label.label
                labelId = getData.label.id
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
              if (getData.tag) {
                isTag = true
                for (let i = 0; i < getData.tag.length; i++) {
                  TagInfo.push(
                    {
                      tagText:getData.tag[i].tag,
                      tagId:getData.tag[i].id
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

              //entity
              let isEntity = false
              let EntityInfo = false
              if (getData.entity !== null) {
                isEntity = true
                EntityInfo = getData.entity
              }
              SetEntity(
                {
                  isEntity,
                  EntityInfo
                }
              )
              SetAdData(UTXOAdd(getData, 'LTC'))
              SetMode(2)
              SetLoading(false)
            } else {
              SetLoading(false)
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }
          } catch (error) {
            console.log(error)
            SetLoading(false)
            return toast.error('خطا در دریافت اطلاعات از سرور', {
              position: 'bottom-left'
            })
          }
        } else if (addressMode.data.network[0] === 'BCH') {
          SetLoading(false)
          dispatch({type:"networkName", value:'BCH'})
          try {
            SetCoinData({
              name:'بیت کوین کش',
              symbole:"BCH",
              risk:"0%",
              owner:"بدون اطلاعات",
              ownerMode:"بدون اطلاعات",
              website:"بدون اطلاعات",
              color:"#8dc351",
              image:"BCH.png"
            })
  
            //get data from processor
            const getData = UTXO_Address(hash, addressMode.data.data,  'BCH', 1)
            
            if (!getData.isError) {
                            
              //catch
              saveToStorage(addressMode)

              const savedData = {
                address:hash,
                data:getData,
                nowTime:Date.now()
              }

              //labels
              let labelText = null
              let labelId = null
              if (getData.label) {
                labelText = getData.label.label
                labelId = getData.label.id
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
              if (getData.tag) {
                isTag = true
                for (let i = 0; i < getData.tag.length; i++) {
                  TagInfo.push(
                    {
                      tagText:getData.tag[i].tag,
                      tagId:getData.tag[i].id
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

              //entity
              let isEntity = false
              let EntityInfo = false
              if (getData.entity !== null) {
                isEntity = true
                EntityInfo = getData.entity
              }
              SetEntity(
                {
                  isEntity,
                  EntityInfo
                }
              )
              SetAdData(UTXOAdd(getData, 'BCH'))
              SetMode(2)
              SetLoading(false)
            } else {
              SetLoading(false)
              return toast.error('خطا در دریافت اطلاعات از سرور', {
                position: 'bottom-left'
              })
            }
          } catch (error) {
            console.log(error)
            SetLoading(false)
            return toast.error('خطا در دریافت اطلاعات از سرور', {
              position: 'bottom-left'
            })
          }
        }
      }
    }

    const GetFromApi = () => {
      axios.get(`${serverAddress}/explorer/search/?query=${hash}&network=${network}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((addressMode) => {
        SetLoading(false)
        processData(addressMode)
      })
      .catch((err) => {
        SetLoading(false)
        console.log(err)
        try {
          if (err.response.status === 403) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
          if (err.response.status === 401) {
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

    const getFromDB = localStorage.getItem(hash)
    if (getFromDB !== null) {
      console.log(JSON.parse(getFromDB).time)
      console.log(Date.now() + 300000)
      if (Date.now() <=  JSON.parse(getFromDB).time + 300000) {
        SetLoading(false)
        processData(JSON.parse(getFromDB).data)
      } else {
        localStorage.removeItem(hash)
        
        SetLoading(true)
        GetFromApi()
      }
    } else {
      SetLoading(true)
      GetFromApi()
    }
  }

  const processHandler = (addressMode, index) => {
    if (addressMode.data.query === 'transaction') {
      if (addressMode.data.network[index] === 'BTC') {
        SelectProcessHandler('BTC')
      } else if (addressMode.data.network[index] === 'LTC') {
        SelectProcessHandler('LTC')
      } else if (addressMode.data.network[index] === 'BCH') {
        SelectProcessHandler('BCH')
      }
    } else if (addressMode.data.query === 'address') {
      if (addressMode.data.network[index] === 'BTC') {
        SelectProcessHandler('BTC')
      } else if (addressMode.data.network[index] === 'LTC') {
        SelectProcessHandler('LTC')
      } else if (addressMode.data.network[index] === 'BCH') {
        SelectProcessHandler('BCH')
      }
    }
  }

  useEffect(() => {
    if (hash !== undefined) {
      if (network === undefined) {
        document.getElementById("MainDashboardInputBox").value=hash
        SetLoading(true)
        SetAddress(hash)
        axios.get(`${serverAddress}/explorer/search/?query=${hash}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((addressMode) => {
          console.log(addressMode)
          SetLoading(false)
          if (addressMode.data.network.length === 1) {
            processHandler(addressMode, 0)
          } else if (addressMode.data.network.length > 1) {
            if (addressMode.data.network[0] === 'ETH' || addressMode.data.network[0] === 'BSC') {
              SetSelectToken(1)
            } else if (addressMode.data.network[0] === 'BTC' || addressMode.data.network[0] === 'BCH') {
              SetSelectToken(2)
            }
          }
        })
        .catch((err) => {
          SetLoading(false)
          console.log(err)
          try {
            if (err.response.status === 403) {
              Cookies.set('refresh', '')
              Cookies.set('access', '')
              window.location.assign('/')
            }
            if (err.response.status === 401) {
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
      } else {
        dispatch({type:"networkName", value:network})
        SelectProcessHandler(network)
      }
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

                <Col xl={{size:10}} lg={{size:10}} md={{size:12}}id='CenterDashboardBox'
                    style={{
                      textAlign: 'center', 
                      maxWidth: '1280px', 
                      marginLeft: 'auto', 
                      marginRight: 'auto'
                    }}
                >
                    <Row className='pt-5 pb-5' id='DashboardTopRow'>
                        <Col xl={{size:3}} lg={{size:2}} md={{size:1}} sm={{size:0}}>
                        </Col>

                        <Col xl={{size:6}} lg={{size:8}} md={{size:10}} sm={{size:12}} style={{marginTop:'80px', marginBottom:'32px'}}>
                            <h4 style={{color:'#01153a'}}>
                                آدرس یا شناسه تراکنش خود را به کمک
                                <span style={{color:MainSiteyellow}}> پنتا </span> 
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
                                      document.getElementById('MainDashboardInputBox').value = 'bc1qjqnv9f8jkp6xvwhz90dunzwygw90uha26g6uvn' 
                                    }} style={{display:'inline-block', marginLeft:'12px', marginRight:'12px', cursor:'pointer'}}>
                                        <ion-icon name="file-tray-stacked-outline"></ion-icon>
                                        {' '}
                                        <p  style={{display:'inline-block'}}> آدرس </p>
                                    </span>
                                    <span onClick={() => {
                                      document.getElementById("MainDashboardInputBox").focus()
                                      document.getElementById('MainDashboardInputBox').value = '0x489057fdf61b55137b632d68ee538cabde91e1ddb51d188c07c78927342b64b2'
                                    }} style={{display:'inline-block', cursor:'pointer'}} >
                                        <ion-icon name="git-compare-outline"></ion-icon>
                                        {' '}
                                        <p  style={{display:'inline-block'}}> تراکنش </p>
                                    </span>
                                </p>
                                {
                                  SelectToken === 1 ? 
                                    <Card>

                                      <div onClick={ () => { SelectProcessHandler('ETH'), dispatch({type:"networkName", value:'ETH'}) } } className='m-1 p-2 selectNetworkBox' style={{borderRadius:'8px', transition:'0.2s', textAlign:'right'}}>
                                        <span>
                                          ETH - اتریوم
                                        </span>
                                        <img src='https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029' style={{width:'20px', float:'left'}} />
                                      </div>

                                      <div onClick={ () => { SelectProcessHandler('BSC'), dispatch({type:"networkName", value:'BSC'}) } } className='m-1 p-2 selectNetworkBox' style={{borderRadius:'8px', transition:'0.2s', textAlign:'right'}}>
                                        <span>
                                          BSC - بایننس اسمارت چین
                                        </span>
                                        <img src='https://cryptologos.cc/logos/bnb-bnb-logo.png?v=029' style={{width:'20px', float:'left'}} />
                                      </div>

                                    </Card>
                                  : SelectToken === 2 ?
                                  <Card>

                                    <div onClick={ () => { SelectProcessHandler('BTC'), dispatch({type:"networkName", value:'BTC'}) } } className='m-1 p-2 selectNetworkBox' style={{borderRadius:'8px', transition:'0.2s', textAlign:'right'}}>
                                      <span>
                                        BTC - بیت‌کوین
                                      </span>
                                      <img src='https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029' style={{width:'20px', float:'left'}} />
                                    </div>

                                    <div onClick={ () => { SelectProcessHandler('BCH'), dispatch({type:"networkName", value:'BCH'}) } } className='m-1 p-2 selectNetworkBox' style={{borderRadius:'8px', transition:'0.2s', textAlign:'right'}}>
                                      <span>
                                        BCH - بیت‌کوین کش
                                      </span>
                                      <img src='https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=029' style={{width:'20px', float:'left'}} />
                                    </div>

                                  </Card>
                                  :
                                    null
                                }

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
                            <TokenInformation color1="success" status="توسعه یافته" TokenImage={'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026'} TokenTitle={'بیت کوین'} TokenDescription={'بیت‌کوین یک ارز دیجیتال غیرمتمرکز، بدون بانک مرکزی یا مدیر واحد است که می‌تواند بدون نیاز به واسطه از کاربر به کاربر دیگر در شبکه بیت‌کوین همتا به همتا ارسال شود.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="success" status="توسعه یافته" TokenImage={'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026'} TokenTitle={'اتریوم'} TokenDescription={'اتریوم یک پلتفرم غیرمتمرکز است که امکان ایجاد و اجرای قراردادهای هوشمند را با ارز دیجیتال بومی خود به نام «اتر» فراهم می‌کند.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="success" status="توسعه یافته" TokenImage={'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=026'} TokenTitle={'بیت کوین کش'} TokenDescription={'پول نقد الکترونیکی همتا به همتا'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="success" status="توسعه یافته" TokenImage={'https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=026'} TokenTitle={'لایت کوین'} TokenDescription={'لایت کوین یک ارز دیجیتال همتا به همتا است که به عنوان یک نسخه سبک تر از بیت کوین ایجاد شده است و زمان تراکنش سریع تر و الگوریتم هش متفاوت را ارائه می دهد.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="success" status="توسعه یافته" TokenImage={'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026'} TokenTitle={'بایننس اسمارت چین'} TokenDescription={'BSC یا زنجیره هوشمند بایننس یک پلتفرم بلاک چین است که توسط صرافی بایننس برای ایجاد و اجرای قراردادهای هوشمند ساخته شده است که اغلب به دلیل تراکنش های سریع و کارمزدهای پایین تر در مقایسه با اتریوم شناخته می شود.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="warning" status="در حال توسعه" TokenImage={'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=029'} TokenTitle={'دوج'} TokenDescription={'ابتدا به عنوان شوخی شروع شد اما طرفداران زیادی در فضای آنلاین به دست آورد.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="warning" status="در حال توسعه" TokenImage={'https://cryptologos.cc/logos/tron-trx-logo.png?v=029'} TokenTitle={'ترون'} TokenDescription={'شبکه بلاکچین ترون یک پلتفرم غیرمتمرکز است که بر روی به اشتراک‌گذاری محتوای دیجیتال و سرگرمی تمرکز دارد.'}/>
                        </Col>
                        <Col xl='4' md='6' className='ps-4 pe-4' sm='12'>
                            <TokenInformation color1="warning" status="در حال توسعه" TokenImage={'https://cryptologos.cc/logos/polygon-matic-logo.png?v=029'} TokenTitle={'متیک'} TokenDescription={'شبکه بلاکچین پلیگان یک پلتفرم قابل توسعه و همکاری‌پذیر است که برای اتصال و ساخت شبکه‌های بلاکچین سازگار با اتریوم طراحی شده است.'}/>
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
            <Col xl={{size:2}} lg={{size:1}} md={{size:1}} class="">
            </Col>
            <Col xl={{size:8}} lg={{size:10}} md={{size:10}} sm={{size:12}} class=" p-0"
              style={{
                textAlign: 'center', 
                maxWidth: '1280px', 
                marginLeft: 'auto', 
                marginRight: 'auto'
              }}
            >
            {
                mode === 1 ? <TransactionDetail data={trData} labelData={labelData} TagData={TagData}/> : null
            }
            
            {
                mode === 2 ? <Walletdetail labelData={labelData} Entity={Entity} TagData={TagData} data={adData} address={address} coinData={coinData}/> : null
            }
            </Col>
            <Col xl={{size:2}} lg={{size:1}} md={{size:1}}>
            </Col>
        </Row>
    </div>
    </UILoader>
  )
}

export default EcommerceDashboard2