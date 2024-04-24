/* eslint-disable no-duplicate-imports */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-const */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import PickerRange from '../../components/timeRangePicker/PickerRange'
import WalletDetailTopTable from '../../components/walletDetailTopTable/walletDetailTopTable'
import WalletDetailTableBottom from '../../components/WalletDetailTableIn/transactionTablleWithCheckbox'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import AmountPickerRange from '../../components/amountRangePicker/PickerRange'
import { MainSiteOrange } from '../../../public/colors'
import TrackerTimeLimit from '../../components/trackerTimeLimit/trackerTimeLimit'
import TrackerAmountLimit from '../../components/trackerAmountLimit/trackerAmountLimit'
import { Spinner, Card } from 'reactstrap'
import { serverAddress } from '../../address'
import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { Trash2 } from 'react-feather'
import { useParams } from "react-router-dom"
import { digitsEnToFa } from 'persian-tools'
import {CornerLeftDown, CornerUpRight, Crop, CreditCard, Circle, Aperture} from 'react-feather'
import moment from 'jalali-moment'
import LoadingButton from '../../components/loadinButton/LoadingButton'
//new processors
import { UTXO_Address } from '../../newProcessors/UTXO_Address'
import { Account_Address } from '../../newProcessors/Account_Address'
import { Account_Token_Address } from '../../newProcessors/Account_Token_Address'

const CurrencyDetail = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const { network } = useParams()

  const close = () => {
    dispatch({type:"SETshowWalletData", value:false})
  }
  const [Loading1, SetLoading] = useState(true)
  const [Error, SetError] = useState(false)
  const [reLoad, SetreLoad] = useState(false)
  const [PaginationLoading, SetPaginationLoading] = useState(false)
  const [Pagination, SetPagination] = useState(1)
  const [Data, SetData] = useState({})

  const AccountBaseAdd = (getData, getTokenData, symbole) => {

    const inputs=[]
    const outputs=[]

    for (let i = 0; i < getTokenData.logs.inputs.length; i++) {
      try {
        if (getTokenData.logs.inputs[i].symbole === 'USDT') {
          if (typeof (getTokenData.logs.inputs[i].address) === 'string' || typeof (getTokenData.logs.inputs[i].hash) === 'string' || typeof (getTokenData.logs.inputs[i].timestamp) === 'number' || typeof (getTokenData.logs.inputs[i].value) === 'number' || typeof (getTokenData.logs.inputs[i].symbole) === 'string' || typeof (getTokenData.logs.inputs[i].ValueInDollar) === 'number') {
            inputs.push({
              address:getTokenData.logs.inputs[i].address,
              hash:getTokenData.logs.inputs[i].hash,
              Label:getTokenData.logs.inputs[i].Label,
              date:getTokenData.logs.inputs[i].timestamp,
              time:getTokenData.logs.inputs[i].timestamp,
              amount:parseFloat(getTokenData.logs.inputs[i].value.toFixed(5)),
              reciverAmount:parseFloat(getTokenData.logs.inputs[i].value.toFixed(5)),
              currencyType:getTokenData.logs.inputs[i].symbole,
              valueInDollar:getTokenData.logs.inputs[i].ValueInDollar
            })
          }
        }
      } catch (error) {}

    }

    for (let i = 0; i < getTokenData.logs.outputs.length; i++) {
      try {
        if (getTokenData.logs.outputs[i].symbole === 'USDT') {
          if (typeof (getTokenData.logs.outputs[i].address) === 'string' || typeof (getTokenData.logs.outputs[i].hash) === 'string' || typeof (getTokenData.logs.outputs[i].timestamp) === 'number' || typeof (getTokenData.logs.outputs[i].value) === 'number' || typeof (getTokenData.logs.outputs[i].symbole) === 'string' || typeof (getTokenData.logs.outputs[i].ValueInDollar) === 'number') {
            outputs.push({
              address:getTokenData.logs.outputs[i].address,
              hash:getTokenData.logs.outputs[i].hash,
              Label:getTokenData.logs.outputs[i].Label,
              date:getTokenData.logs.outputs[i].timestamp,
              time:getTokenData.logs.outputs[i].timestamp,
              amount:parseFloat(getTokenData.logs.outputs[i].value.toFixed(5)),
              reciverAmount:parseFloat(getTokenData.logs.outputs[i].value.toFixed(5)),
              currencyType:getTokenData.logs.outputs[i].symbole,
              valueInDollar:getTokenData.logs.outputs[i].ValueInDollar
            })
          }
        }
      } catch (error) {}

    }

    for (let i = 0; i < getData.inputs.length; i++) {
      try {
        if (inputs.some(item => item.hash === getData.inputs[i].hash) === false) {
          if (typeof (getData.inputs[i].address) === 'string' || typeof (getData.inputs[i].hash) === 'string' || typeof (getData.inputs[i].timestamp) === 'number' || typeof (getData.inputs[i].value) === 'number' || typeof (getData.symbole) === 'string' || typeof (getData.inputs[i].ValueInDollar) === 'number') {
            inputs.push({
              address:getData.inputs[i].address,
              hash:getData.inputs[i].hash,
              Label:getData.inputs[i].Label,
              date:getData.inputs[i].timestamp,
              time:getData.inputs[i].timestamp,
              amount:parseFloat(getData.inputs[i].value.toFixed(5)),
              senderAmount:parseFloat(getData.inputs[i].value.toFixed(5)),
              currencyType:getData.symbole,
              valueInDollar:getData.inputs[i].ValueInDollar
            })
          }
        }
      } catch (error) {}

    }

    for (let i = 0; i < getData.outputs.length; i++) {
      try {
        if (outputs.some(item => item.hash === getData.outputs[i].hash) === false) {
          if (typeof (getData.outputs[i].address) === 'string' || typeof (getData.outputs[i].hash) === 'string' || typeof (getData.outputs[i].timestamp) === 'number' || typeof (getData.outputs[i].value) === 'number' || typeof (getData.symbole) === 'string' || typeof (getData.outputs[i].ValueInDollar) === 'number') {
            outputs.push({
              address:getData.outputs[i].address,
              hash:getData.outputs[i].hash,
              Label:getData.outputs[i].Label,
              date:getData.outputs[i].timestamp,
              time:getData.outputs[i].timestamp,
              amount:parseFloat(getData.outputs[i].value.toFixed(5)),
              reciverAmount:parseFloat(getData.outputs[i].value.toFixed(5)),
              currencyType:getData.symbole,
              valueInDollar:getData.outputs[i].ValueInDollar
            })
          }
        }
      } catch (error) {}

    }
    
    return {
      symbole,
      inputs,
      outputs
    }
  }

  const UTXOAdd = (data) => {
    const inputs = []
    const outputs = []
    for (let j = 0; j < data.inputs.length; j++) {
      try {
        if (typeof (data.inputs[j].hash) === 'string' || typeof (data.inputs[j].timestamp) === 'number' || typeof (data.inputs[j].value) === 'number' || typeof (data.symbole) === 'string' || typeof (data.inputs[j].ValueInDollar) === 'number') {
          inputs.push({
            hash:data.inputs[j].hash,
            date:data.inputs[j].timestamp,
            time:data.inputs[j].timestamp,
            amount:parseFloat(data.inputs[j].value.toFixed(5)),
            currencyType:data.symbole,
            valueInDollar:data.inputs[j].ValueInDollar
          })
        }
      } catch (error) {}

    }

    for (let j = 0; j < data.outputs.length; j++) {
      try {
        if (typeof (data.outputs[j].hash) === 'string' || typeof (data.outputs[j].timestamp) === 'number' || typeof (data.outputs[j].value) === 'number' || typeof (data.symbole) === 'string' || typeof (data.outputs[j].ValueInDollar) === 'number') {
          outputs.push({
            hash:data.outputs[j].hash,
            date:data.outputs[j].timestamp,
            time:data.outputs[j].timestamp,
            amount:parseFloat(data.outputs[j].value.toFixed(5)),
            currencyType:data.symbole,
            valueInDollar:data.outputs[j].ValueInDollar
          })
        }
      } catch (error) {}
    }

    return (
      {
        symbole:'BTC',
        inputs,
        outputs
      }
    )
  }

  useEffect(() => {
    dispatch({type:"StartFilterAmount", value:0})
    dispatch({type:"EndFilterAmount", value:0})
    dispatch({type:"StartFilterTime", value:0})
    dispatch({type:"EndFilterTime", value:0})
    dispatch({type:"All_Input_Output", value:0})
    const address = States.WDetail

    const saveToStorage = (data) => {
      const newData = {
        data,
        time:Date.now()
      }
      if (localStorage.getItem(address) === null) {
        localStorage.setItem(address, JSON.stringify(newData))
      }
    }

    const processGetData = (response, token_response) => {
      try {
        if (network === 'ETH' || network === 'BSC' || network === 'TRX' || network === 'MATIC') {

          const getAccountAddress = Account_Address(response.data.data, address, network==='BSC' ? 'BNB' : network, 1)
          const AccountTokenAddress = Account_Token_Address(token_response.data.data, address, network, 1)

          SetData(AccountBaseAdd(getAccountAddress, AccountTokenAddress,  network==='BSC' ? 'BNB' : network))
          SetLoading(false)
        } else if (network === 'BTC' || network === 'LTC' || network === 'BCH' || network === 'DOGE') {
          SetData(UTXOAdd(UTXO_Address(address, response.data.data, network, 1)))
          SetLoading(false)
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
      SetLoading(true)
      axios.get(`${serverAddress}/explorer/search/?query=${address}&network=${network}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
        SetError(false)
        if (response.status === 200) {
          if (response.data.network[0] === 'ETH' || response.data.network[0] === 'BSC' || response.data.network[0] === 'MATIC' || response.data.network[0] === 'TRX') {
            axios.get(`${serverAddress}/explorer/search/?query=${address}&network=${network}&type=token-20`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((token_response) => {
              // saveToStorage(response)
              processGetData(response, token_response)
            })
            .catch((err) => {
              SetError(true)
              console.log(err)
              SetLoading(false)
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
          } else {
            // saveToStorage(response)
            processGetData(response, [])
          }
        } else if (response.status === 404) {
          return toast.error('آدرس مورد نظر یافت نشد!', {
            position: 'bottom-left'
          })
        } else {
          return toast.error('خطا در دریافت اطلاعات از سرور', {
            position: 'bottom-left'
          })
        }
  
      })
      .catch((err) => {
        SetError(true)
        console.log(err)
        SetLoading(false)
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
    }

    const getFromDB = localStorage.getItem(address)
    if (getFromDB !== null) {
      if (Date.now() <=  JSON.parse(getFromDB).time + 300000) {
        SetLoading(false)
        processGetData(JSON.parse(getFromDB).data)
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

  const deleteAddress = (value) => {
    const getGraph = States.GraphData
    const fitredAddress= getGraph.filter(obj => obj.address !== value)
    dispatch({type:"GRAPHDATA", value:fitredAddress})
    dispatch({type:"BeGraphReload", value:(!(States.BeGraphReload))})
  }

  function getMyTime(millis) {
    const date = new Date(millis * 1000)
  
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return {
      year,
      month,
      day,
      hour,
      minute,
      second
    }
  }

  const [TotalInput, SetTotalInput] = useState(0)
  const [TotalOutput, SetTotalOutput] = useState(0)
  const [TotalHolding, SetTotalHolding] = useState(0)
  const [TotalTransactions, SetTotalTransactions] = useState(0)
  const [FirstActivity, SetFirstActivity] = useState(0)
  const [LastActivity, SetLastActivity] = useState(0)
  useEffect(() => {
    try {
      if (Data.inputs !== undefined) {
        let inputs = 0
        let outputs = 0
        let firstActivity = Data.inputs[0].date
        let lastActivity = 0
        for (let i = 0; i < Data.inputs.length; i++) {
          if (Data.inputs[i].currencyType === network) {
            inputs = inputs + Data.inputs[i].amount
          }
          if (Data.inputs[i].date > lastActivity) {
            lastActivity = Data.inputs[i].date
          }
          if (Data.inputs[i].date < firstActivity) {
            firstActivity = Data.inputs[i].date
          }
        }
        for (let i = 0; i < Data.outputs.length; i++) {
          if (Data.outputs[i].currencyType === network) {
            outputs = outputs + Data.outputs[i].amount
          }
          if (Data.outputs[i].date > lastActivity) {
            lastActivity = Data.outputs[i].date
          }
          if (Data.outputs[i].date < firstActivity) {
            firstActivity = Data.outputs[i].date
          }
        }
        SetTotalInput(outputs)
        SetTotalOutput(inputs)
        SetTotalHolding(String(inputs - outputs))
        SetTotalTransactions(Data.inputs.length + Data.outputs.length)
        firstActivity = `${getMyTime(firstActivity).year}/${Number(getMyTime(firstActivity).month)}/${getMyTime(firstActivity).day}`
        lastActivity = `${getMyTime(lastActivity).year}/${Number(getMyTime(lastActivity).month)}/${getMyTime(lastActivity).day}`
        SetFirstActivity(firstActivity)
        SetLastActivity(lastActivity)
      }
    } catch (error) {
      
    }
  }, [Data, reLoad])

  const LoadMore = () => {

    const processGetData = (response, address) => {
      try {
        const oldData = Data

        let newData
        if (network === 'ETH') {
          newData = (AccountBaseAdd(Account_Address(response.data.data, address, 'ETH', 1000000000000000000), 'ETH'))
        } else if (network === 'BSC') {
          newData = (AccountBaseAdd(Account_Address(response.data.data, address, 'BNB', 1000000000000000000), 'BNB'))
        } else if (network === 'BTC') {
          newData = (UTXOAdd(UTXO_Address(address, response.data.data, 'BTC', 100000000)))
        } else if (network === 'LTC') {
          newData = (UTXOAdd(UTXO_Address(address, response.data.data, 'LTC', 1)))
        } else if (network === 'BCH') {
          newData = (UTXOAdd(UTXO_Address(address, response.data.data, 'BCH', 1)))
        }

        for (let i = 0; i < newData.inputs.length; i++) {
          oldData.inputs.push(newData.inputs[i])
        }
        for (let i = 0; i < newData.outputs.length; i++) {
          oldData.outputs.push(newData.outputs[i])
        }
        SetData(oldData)
        SetreLoad(!reLoad)
      } catch (error) {
        console.log(error)
        SetLoading(false)
        return toast.error('خطا در دریافت اطلاعات از سرور', {
          position: 'bottom-left'
        })
      }
    }

    SetPaginationLoading(true)
    const getPG = Pagination + 1
    axios.get(`${serverAddress}/explorer/search/?query=${States.WDetail}&network=${network}&page_number=${getPG}&page_size=10`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      SetPaginationLoading(false)
      processGetData(response, States.WDetail)
    })
    .catch((err) => {
      SetPaginationLoading(false)
      console.log(err)
    })
  }

  return (
    <div id='CurrencyDetail' className='container-fluid' style={{overflowY:"auto"}}>
      <div className='row'>
        <div className='col-12'>
          <h6 style={{display:"inline-block"}}>جزئیات آدرس</h6>
          <span onClick={close}><ion-icon name="close-outline" id="closeIcon" ></ion-icon></span>
        </div>
      </div>
      <div className='row' style={{background:"rgb(248,248,248)", width:"100%", padding:"15px", borderRadius:"10px", marginRight:'0px'}}>
        <div className='col-12' >
          <div id='address'>
            <a id='justUp500'>{States.WDetail}</a>
            <NiceAddress2 text={States.WDetail} number={8}/>
            <ion-icon title="کپی آدرس" name="copy-outline" onClick={ () => { 
              navigator.clipboard.writeText(States.WDetail) 
              return toast.success('آدرس مورد نظر در کلیپ‌بورد کپی شد.', {
                position: 'bottom-left'
              })
            }}></ion-icon>
            <ion-icon name="trash-outline"  title="حذف آدرس" onClick={ () => { 
              deleteAddress(States.WDetail)
            }}></ion-icon>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-12 mt-3' >
          <a href={`/researcher/${States.WDetail}`}><button type="button" class="btn btn-outline-warning">نمایش آدرس <ion-icon name="open-outline"></ion-icon></button></a>
          <button type="button" class="btn btn-outline-danger me-3">گزارش آدرس <ion-icon name="alert-circle-outline"></ion-icon></button>
        </div>
      </div>
      <div className='row' id='scrollingWalletDetail' style={{boxSizing:"border-box"}}>
        <div className='col-12 p-4'>
          <div className='row' >
            {
              !Loading1 ? 
                !Error ? 
                  <div className='col-12'>
                    <div className='row mt-2'>
                      <div className='col-6' style={{textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'ارسال شده'}</p>
                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {digitsEnToFa(parseFloat(Number(TotalInput).toFixed(5)).toString())}
                            <small> {Data.symbole}</small>
                            <CornerUpRight size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                          </div>
                      </div>
                      <div style={{ marginBottom:'-10px', textAlign:'right'}} className={` col-6`}>
                      <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'دریافت شده'}</p>
                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {digitsEnToFa(parseFloat(Number(TotalOutput).toFixed(5)).toString())}
                            <small> {Data.symbole}</small>
                            <CornerLeftDown size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                          </div>
                      </div>
                    </div>

                    <div className='row mt-2'>
                      <div className='col-6' style={{textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'موجودی'}</p>
                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {digitsEnToFa(parseFloat(Number(TotalHolding).toFixed(5)).toString())}
                            <small> {Data.symbole}</small>
                            <Crop size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px", transform:"rotate(90deg)"}} />
                          </div>
                      </div>
                      <div style={{ marginBottom:'-10px', textAlign:'right'}} className={` col-6`}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'تعداد تراکنش'}</p>
                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {digitsEnToFa(TotalTransactions)}
                            <CreditCard size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                          </div>
                      </div>
                    </div>

                    <div className='row mt-2'>
                      <div className='col-6' style={{textAlign:'right'}}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'اولین فعالیت'}</p>
                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {digitsEnToFa(FirstActivity)}
                            <Circle size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                          </div>
                      </div>
                      <div style={{ marginBottom:'-10px', textAlign:'right'}} className={` col-6`}>
                          <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'آخرین فعالیت'}</p>
                          <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                            {digitsEnToFa(LastActivity)}
                            <Aperture size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
                          </div>
                      </div>
                    </div>
                  </div>
                :
                null
              :
              null
            }
  
          </div>
          <div className='row mt-3' style={{borderBottomStyle:"solid", borderColor:"rgb(242,242,242)", borderWidth:"2px"}}>
            <div className='col-4' style={{borderBottomStyle:"solid", borderColor:"orange", borderWidth:"2px"}}>
              <h6  >تراکنش ها</h6>
            </div>
          </div>
          <div className='row mt-3 mb-3'>
            <div className='col-6'>
              <TrackerTimeLimit />
            </div>
            <div className='col-6 mb-3'>
              <TrackerAmountLimit />
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-12'>
                {
                  Loading1 ?
                  
                    <div className='mt-3' style={{textAlign:'center'}}>
                      <Spinner />
                      <p>در حال دریافت اطلاعات</p>
                    </div>
                  :
                  !Error ? 
                  <>
                    <WalletDetailTableBottom data={Data} address={States.WDetail} reLoad={reLoad}/>
                    <Card onClick={LoadMore} style={{ textAlign:'center', borderColor:'gray', borderWidth:'1px', borderStyle:'solid', width:'200px', cursor:'pointer', margin:'8px 0px', marginLeft:'auto', marginRight:'auto', height:'40px', transition:'0s'}} 
                      className = {!PaginationLoading ? 'p-2' : 'p-2 pt-3'}
                    >
                      {
                        PaginationLoading ? 
                          <LoadingButton/>
                        :
                          <span>
                            نمایش بیشتر
                          </span>
                      }
                    </Card>
                  </>
                  :
                  <p>خطا در دریافت اطلاعات</p>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrencyDetail