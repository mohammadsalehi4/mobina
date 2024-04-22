/* eslint-disable multiline-ternary */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
import React, { useState, useEffect } from 'react'
import './tracker.css'
import { useSelector, useDispatch } from "react-redux"
import Switch from '../../components/switch/switch'
import TransactionTablleWithCheckbox from '../../components/TransactionDetailTable/transactionTablleWithCheckbox'
import TransactionTablleWithCheckbox2 from '../../components/TransactionDetailTableOut/transactionTablleWithCheckbox'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import { digitsEnToFa } from 'persian-tools'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Spinner } from 'reactstrap'
import { useParams } from "react-router-dom"

//new processors
import { UTXO_Transaction } from '../../newProcessors/UTXO_Transaction'
import { Account_transaction } from '../../newProcessors/Account_transaction'

const TransactionDetail1 = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const { network } = useParams()

  const close = () => {
    dispatch({type:"SETSHOWTRANSACTIONDATA", value:false})
  }
  const [Loading1, SetLoading] = useState(true)
  const [Data, SetData] = useState({})
  const [MyDate, SetDate] = useState('بدون اطلاعات!')
  const [Fee, SetFee] = useState('بدون اطلاعات!')
  const [Value, SetValue] = useState('بدون اطلاعات!')
  const [IsGet, SetIsGet] = useState(false)
  const [Symbole, SetSymbole] = useState(false)

  const getMyTime = (index) => {
    
    const date = new Date(index * 1000)
    let month
    let day
    let hour
    let minute
  
    if (String(Number(date.getMonth()) + 1).length === 1) {
      month = `0${date.getMonth() + 1}`
    } else {
      month = date.getMonth() + 1
    }
  
    if (String(date.getDate()).length === 1) {
      day = `0${date.getDate()}`
    } else {
      day = date.getDate()
    }
  
    if (String(date.getHours()).length === 1) {
      hour = `0${date.getHours()}`
    } else {
      hour = date.getHours()
    }
  
    if (String(date.getMinutes()).length === 1) {
      minute = `0${date.getMinutes()}`
    } else {
      minute = date.getMinutes()
    }
  
    return ({
      year:date.getFullYear(),
      month,
      day,
      hour,
      minute
    })
  }

  const UTXOTr = (data) => {
    const blockNumber = data.blockNumber
    const address = data.hash
    const BlockDate = data.time
    const name = 'بیت کوین'
    const image = `BTC.png`
    const color = '#627eea'
    const RiskScore = '0%'
    let TotalOutput = 0
    let symbole = "BTC"
    let TotalInput = 0
    let fee = data.fee
    let value = 0

    const inputAddresses = []
    const outputAddresses = []

    for (let i = 0; i < data.inputs.length; i++) {
      inputAddresses.push(
        {
          address:data.inputs[i].address,
          Label:data.inputs[i].Label ? data.inputs[i].Label : data.inputs[i].entity !== null ? data.inputs[i].entity.name : data.inputs[i].Label,
          value:data.inputs[i].value,
          symbole:data.symbole,
          show:false,
          valueInDollar:data.inputs[i].valueInDollar
        }
      )
    }

    for (let i = 0; i < data.outputs.length; i++) {
      outputAddresses.push(
        {
          address:data.outputs[i].address,
          value:data.outputs[i].value,
          Label:data.outputs[i].Label ? data.outputs[i].Label : data.outputs[i].entity !== null ? data.outputs[i].entity.name : data.outputs[i].Label,
          symbole:data.symbole,
          show:false,
          valueInDollar:data.outputs[i].valueInDollar
        }
      )
    }

    for (let i = 0; i < inputAddresses.length; i++) {
      for (let j = 0; j < outputAddresses.length; j++) {
        if (inputAddresses[i].address === outputAddresses[j].address) {
          inputAddresses[i].value = inputAddresses[i].value - outputAddresses[j].value
          inputAddresses[i].valueInDollar = inputAddresses[i].valueInDollar - outputAddresses[j].valueInDollar
          outputAddresses.splice(j, 1)
          j = j - 1
        }
      }
    }

    for (let i = 0; i < inputAddresses.length; i++) {
      value = value + inputAddresses[i].value
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
      fee,
      inputAddresses,
      outputAddresses,
      value
    })
  }

  const AccountBaseTr = (data, symbole) => {

    console.log('AccountBase Data')
    console.log(data)

    const blockNumber = data.blockNumber
    const address = data.hash
    const BlockDate = data.timestamp
    const name = 'اتریوم'
    const image = `ETH.png`
    const color = '#627eea'
    const RiskScore = '0%'
    let TotalOutput = 0
    let TotalInput = 0
    let fee = data.fee
    let value = 0

    const inputAddresses = []
    const outputAddresses = []

    inputAddresses.push(
      {
        address:data.from,
        value:data.value,
        Label: data.FromLabel ? data.FromLabel : data.FromEntity !== null ? data.FromEntity.name : data.FromLabel,
        symbole:data.symbole,
        show:false,
        valueInDollar:data.valueInDollar
      }
    )

    outputAddresses.push(
      {
        address:data.to,
        value:data.value,
        Label: data.ToLabel ? data.ToLabel : data.ToEntity !== null ? data.ToEntity.name : data.ToLabel,
        symbole:data.symbole,
        show:false,
        valueInDollar:data.valueInDollar
      }
    )

    for (let i = 0; i < inputAddresses.length; i++) {
      value = value + inputAddresses[i].value
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
      fee,
      inputAddresses,
      outputAddresses,
      value
    })
  }

  useEffect(() => {
    
    const address = States.WDetail
    SetLoading(true)

    const saveToStorage = (data) => {
      const newData = {
        data,
        time:Date.now()
      }
      if (localStorage.getItem(address) === null) {
        localStorage.setItem(address, JSON.stringify(newData))
      }
    }

    const ProcessGetData = (response) => {
      try {

        if (network === 'ETH') {
          const TrData = (AccountBaseTr(Account_transaction(response.data.data, 'ETH', 1000000000000000000), 'ETH'))
          SetIsGet(true)
          SetValue(TrData.value)
          SetSymbole(TrData.symbole)
          SetFee(TrData.fee)
          SetDate(TrData.BlockDate)
          SetLoading(false)
          SetData(TrData)
        } else if (network === 'TRX') {
          const TrData = (AccountBaseTr(Account_transaction(response.data.data, 'TRX', 1000000000000000000), 'TRX'))
          SetIsGet(true)
          SetValue(TrData.value)
          SetSymbole(TrData.symbole)
          SetFee(TrData.fee)
          SetDate(TrData.BlockDate)
          SetLoading(false)
          SetData(TrData)
        } else if (network === 'BSC') {
          const TrData = (AccountBaseTr(Account_transaction(response.data.data, 'BNB', 1000000000000000000), 'BNB'))
          SetIsGet(true)
          SetValue(TrData.value)
          SetSymbole(TrData.symbole)
          SetFee(TrData.fee)
          SetDate(TrData.BlockDate)
          SetLoading(false)
          SetData(TrData)
        } else if (network === 'BTC') {
          const TrData = (UTXOTr(UTXO_Transaction(response.data.data, 'BTC', 100000000)))
          SetIsGet(true)
          SetValue(TrData.value)
          SetSymbole(TrData.symbole)
          SetFee(TrData.fee)
          SetDate(TrData.BlockDate)
          SetLoading(false)
          SetData(TrData)
        } else if (network === 'LTC') {
          const TrData = (UTXOTr(UTXO_Transaction(response.data.data, 'LTC', 1)))
          SetIsGet(true)
          SetValue(Number(TrData.value))
          SetSymbole(TrData.symbole)
          SetFee(Number(TrData.fee))
          SetDate(TrData.BlockDate)
          SetLoading(false)
          SetData(TrData)
        } else if (network === 'BCH') {
          const TrData = (UTXOTr(UTXO_Transaction(response.data.data, 'BCH', 1)))
          SetIsGet(true)
          SetValue(Number(TrData.value))
          SetSymbole(TrData.symbole)
          SetFee(Number(TrData.fee))
          SetDate(TrData.BlockDate)
          SetLoading(false)
          SetData(TrData)
        } else if (network === 'DOGE') {
          const TrData = (UTXOTr(UTXO_Transaction(response.data.data, 'DOGE', 100000000)))
          SetIsGet(true)
          SetValue(TrData.value)
          SetSymbole(TrData.symbole)
          SetFee(TrData.fee)
          SetDate(TrData.BlockDate)
          SetLoading(false)
          SetData(TrData)
        } else if (network === 'MATIC') {
          const TrData = (AccountBaseTr(Account_transaction(response.data.data, 'MATIC', 1000000000000000000), 'MATIC'))
          SetIsGet(true)
          SetValue(TrData.value)
          SetSymbole(TrData.symbole)
          SetFee(TrData.fee)
          SetDate(TrData.BlockDate)
          SetLoading(false)
          SetData(TrData)
        }

      } catch (error) {
        console.log(error)
        SetLoading(false)
        return toast.error('خطا در دریافت اطلاعات از سرور', {
          position: 'bottom-left'
        })
      }
    }

    const getFromApi = () => {
      axios.get(`${serverAddress}/explorer/search/?query=${address}&network=${network}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
        saveToStorage(response)
        ProcessGetData(response)
      })
      .catch((err) => {
        console.log(err)
        SetLoading(false)
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
  
          return toast.error('خطا در دریافت اطلاعات', {
              position: 'bottom-left'
          })
        } catch (error) {
            return toast.error('خطا در دریافت اطلاعات', {
                position: 'bottom-left'
            })
        }
      })
    }
    
    const getFromDB = localStorage.getItem(address)
    if (getFromDB !== null) {
      if (Date.now() <=  JSON.parse(getFromDB).time + 300000) {
        SetLoading(false)
        ProcessGetData(JSON.parse(getFromDB).data)
      } else {
        localStorage.removeItem(address)
        SetLoading(true)
        getFromApi()
      }
    } else {
      SetLoading(true)
      getFromApi()
    }

  }, [, States.WDetail])

  const deleteTransaction = (hash) => {
    const getGraph = States.GraphData
    console.log(getGraph)
    for (let i = 0; i < getGraph.length; i++) {
      let inputTrs = getGraph[i].inputs
      let outputTrs = getGraph[i].outputs
      inputTrs = inputTrs.filter(item => (item.hash).toUpperCase() !== hash.toUpperCase())
      outputTrs = outputTrs.filter(item => (item.hash).toUpperCase() !== hash.toUpperCase())
      getGraph[i].inputs = inputTrs
      getGraph[i].outputs = outputTrs
    }
    dispatch({type:"GRAPHDATA", value:getGraph})
    dispatch({type:"BeGraphReload", value:(!(States.BeGraphReload))})
  }

  // eslint-disable-next-line no-return-assign
  return (
    
    <div id='CurrencyDetail' className='container-fluid' style={{overflowY:"auto"}}>
        <div className='row mb-2 mt-1'>
          <div className='col-12'>
            <h6 style={{display:"inline-block"}}>جزئیات تراکنش</h6>
            <span onClick={close}><ion-icon name="close-outline" id="closeIcon" ></ion-icon></span>
          </div>
          {/* <Switch options={["BTC", "USD", "IRR"]} specialProps="TransactionDetailCurrencyMode"/> */}
        </div>

        <div className='row'>
          <div className='col-12' >
            <div id='address' style={{background:"rgb(248,248,248)", width:"100%", padding:"15px", borderRadius:"10px"}}>
              <a id='justUp400'>{`...${(States.WDetail).substring(0, 30)}`}</a>
              <a id='justUnder400'>{`...${(States.WDetail).substring(0, 20)}`}</a>
              <ion-icon title={'کپی تراکنش'} name="copy-outline" onClick={ () => { 
                navigator.clipboard.writeText(States.WDetail) 
                return toast.success('تراکنش مورد نظر در کلیپ‌بورد کپی شد.', {
                  position: 'bottom-left'
                })
              }}></ion-icon>
              <ion-icon name="trash-outline"  title="حذف تراکنش" onClick={ () => { 
                deleteTransaction(States.WDetail)
              }}></ion-icon>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 mt-3' >
            <a href={`/researcher/${States.WDetail}`}><button type="button" class="btn btn-outline-warning">نمایش تراکنش <ion-icon name="open-outline"></ion-icon></button></a>
          </div>
        </div>
        <div className='row' id='scrollingWalletDetail' style={{boxSizing:"border-box"}}>
          {
            IsGet ? 
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
                {
                  IsGet ? 
                    <><span>{digitsEnToFa(parseFloat((Value).toFixed(5)).toString())}</span><small> {Symbole} </small></>
                  :
                    <span>{Value}</span>
                }
              </div>
                </div>
                <div className='row' >
                  <div className='col-6'>
                    <p>کارمزد</p>
                  </div>
                  <div className='col-6' style={{float:"left", direction:"ltr"}}>
                    {
                      IsGet ? 
                        <><span>{digitsEnToFa(parseFloat((Fee).toFixed(5)).toString())}</span><small> {Symbole} </small></>

                      :
                        <span>{Value}</span>
                    }
                  </div>
                </div>
                <div className='row' >
                  <div className='col-6'>
                    <p>تاریخ بلاک</p>
                  </div>
                  <div className='col-6' style={{float:"left", direction:"ltr"}}>
                    {
                      IsGet ? 
                        <>
                          <span  style={{marginBottom:"-8px"}}>{`${digitsEnToFa(getMyTime(MyDate).year)}/${digitsEnToFa(getMyTime(MyDate).month)}/${digitsEnToFa(getMyTime(MyDate).day)} - ${digitsEnToFa(getMyTime(MyDate).hour)}:${digitsEnToFa(getMyTime(MyDate).minute)}`}</span>
                        </>
                      :
                        <span>{Value}</span>
                    }
                  </div>
                </div>
              </div>
              :
              null
          }

        </div>
        <div className='row'>
          <div className='col-12'>
            {
              !Loading1 ? 
              <>
                <TransactionTablleWithCheckbox data={Data} address={States.WDetail} />
                <TransactionTablleWithCheckbox2 data={Data} address={States.WDetail} />
              </>
              :
              <div className='mt-3' style={{textAlign:'center'}}>
                <Spinner />
                <p>در حال دریافت اطلاعات</p>
              </div>
            }

          </div>
        </div>
    </div>
  )
}

export default TransactionDetail1