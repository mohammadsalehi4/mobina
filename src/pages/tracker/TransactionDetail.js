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

const TransactionDetail1 = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
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

  const EthereumTransaction = (data) => {

    const blockNumber = data.blockNumber
    const address = data.hash
    const BlockDate = data.timestamp
    const name = 'اتریوم'
    const image = 'ETH.png'
    const color = '#627eea'
    const RiskScore = '0%'
    let TotalOutput = 0
    let symbole = "ETH"
    let TotalInput = 0
    let fee = (Number(data.gasPrice)) * (Number(data.gasUsed)) / 1000000000000000000
    let transfers = []

    if (data.from.address !== null && data.to.address !== null) {
      transfers.push({
        from:data.from.address,
        to:data.to.address,
        currencyType:'ETH',
        amount:(Number(data.value) / 1000000000000000000),
        valueInDollar:data.valueInDollar
      })
    } else if (data.from.address === null && data.to.address !== null) {
      transfers.push({
        from:'coin base',
        to:data.to.address,
        currencyType:'ETH',
        amount:(Number(data.value) / 1000000000000000000),
        valueInDollar:data.valueInDollar
      })
    } else if (data.from.address !== null && data.to.address === null) {
      transfers.push({
        from:data.from.address,
        to:'coin base',
        currencyType:'ETH',
        amount:(Number(data.value) / 1000000000000000000),
        valueInDollar:data.valueInDollar
      })
    } else {
      transfers.push({
        from:'coin base',
        to:'coin base',
        currencyType:'ETH',
        amount:(Number(data.value) / 1000000000000000000),
        valueInDollar:data.valueInDollar
      })
    }

    //tokens
    // for (let i = 0; i < data.logs.length; i++) {
    //   if (data.logs[i].address.symbol) {
    //     try {
    //       if (data.logs[i].from !== null && data.logs[i].to !== null) {
    //         transfers.push({
    //           from:data.logs[i].from,
    //           to:data.logs[i].to,
    //           currencyType:data.logs[i].address.symbol,
    //           amount:(Number(data.logs[i].amount) / (Math.pow(10, data.logs[i].address.decimal)))
    //         })
    //       } else if (data.logs[i].from === null && data.logs[i].to !== null) {
    //         transfers.push({
    //           from:'coin base',
    //           to:data.logs[i].to,
    //           currencyType:data.logs[i].address.symbol,
    //           amount:(Number(data.logs[i].amount) / (Math.pow(10, data.logs[i].address.decimal)))
    //         })
    //       } else if (data.logs[i].from !== null && data.logs[i].to === null) {
    //         transfers.push({
    //           from:data.logs[i].from,
    //           to:'coin base',
    //           currencyType:data.logs[i].address.symbol,
    //           amount:(Number(data.logs[i].amount) / (Math.pow(10, data.logs[i].address.decimal)))
    //         })
    //       } else {
    //         transfers.push({
    //           from:'coin base',
    //           to:'coin base',
    //           currencyType:data.logs[i].address.symbol,
    //           amount:(Number(data.logs[i].amount) / (Math.pow(10, data.logs[i].address.decimal)))
    //         })
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // }

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


    for (let i = 0; i < transfers.length; i++) {
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

    let value = 0
    for (let i = 0; i < transfers.length; i++) {
      if (transfers[i].currencyType === 'ETH') {
        value = value + transfers[i].amount
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
      value
    })
  }

  useEffect(() => {
    const address = States.WDetail
    SetLoading(true)
    axios.get(`${serverAddress}/explorer/transaction/?network=ETH&txid=${address}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      try {
        SetData(EthereumTransaction(response.data, address))
        SetIsGet(true)
        SetValue(EthereumTransaction(response.data, address).value)
        SetSymbole(EthereumTransaction(response.data, address).symbole)
        SetFee(EthereumTransaction(response.data, address).fee)
        SetDate(EthereumTransaction(response.data, address).BlockDate)
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
      console.log(err)
      SetLoading(false)
      try {
          if (err.response.statusText === 'Unauthorized') {
              Cookies.set('refresh', '')
              Cookies.set('access', '')
              window.location.assign('/')
          } else {
              return toast.error('خطا در دریافت اطلاعات', {
                  position: 'bottom-left'
              })
          }
      } catch (error) {
          return toast.error('خطا در دریافت اطلاعات', {
              position: 'bottom-left'
          })
      }
    })
  }, [])

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
    dispatch({type:"MotherFucker", value:(!(States.MotherFucker))})
  }

  // eslint-disable-next-line no-return-assign
  return (
    
    <div id='CurrencyDetail' className='container-fluid' style={{overflowY:"auto"}}>
        <div className='row mb-4'>
          <div className='col-12'>
            <h6 style={{display:"inline-block"}}>جزئیات تراکنش بیت کوین</h6>
            <span onClick={close}><ion-icon name="close-outline" id="closeIcon" ></ion-icon></span>
          </div>
          <Switch options={["BTC", "USD", "IRR"]} specialProps="TransactionDetailCurrencyMode"/>
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
            <button type="button" class="btn btn-outline-warning">نمایش آدرس <ion-icon name="open-outline"></ion-icon></button>
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
              IsGet ? 
              <><TransactionTablleWithCheckbox data={Data} address={States.WDetail} /><TransactionTablleWithCheckbox2 data={Data} address={States.WDetail} /></>
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