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
import { Spinner } from 'reactstrap'
import { serverAddress } from '../../address'
import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { Trash2 } from 'react-feather'
import { useParams } from "react-router-dom"

//processors
import { UTXOAddress } from '../../processors/UTXOAddress'
import { AccountBaseAddress } from '../../processors/AccountBaseAddress'
import { BSCAddress } from '../../processors/BSCAddress'

const CurrencyDetail = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const { network } = useParams()

  const close = () => {
    dispatch({type:"SETshowWalletData", value:false})
  }
  const [Loading1, SetLoading] = useState(true)
  const [Error, SetError] = useState(false)
  const [Data, SetData] = useState({})

  const AccountBaseAdd = (getData) => {

    const inputs=[]
    const outputs=[]
    console.log(getData)
    for (let i = 0; i < getData.inputs.length; i++) {
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

    for (let i = 0; i < getData.outputs.length; i++) {
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
    
    return {
      symbole:'ETH',
      inputs,
      outputs
    }
  }

  const UTXOAdd = (data) => {
    const inputs = []
    const outputs = []
    for (let j = 0; j < data.inputs.length; j++) {
      inputs.push({
        address:data.inputs[j].sender[0].address,
        Label:data.inputs[j].sender[0].label,
        hash:data.inputs[j].hash,
        date:data.inputs[j].timestamp,
        time:data.inputs[j].timestamp,
        amount:parseFloat(data.inputs[j].value.toFixed(5)),
        senderAmount:parseFloat(data.inputs[j].sender[0].value.toFixed(5)),
        currencyType:data.symbole,
        valueInDollar:data.inputs[j].ValueInDollar
      })
    }

    for (let j = 0; j < data.outputs.length; j++) {
      outputs.push({
        address:data.outputs[j].reciver[0].address,
        Label:data.outputs[j].reciver[0].label,
        hash:data.outputs[j].hash,
        date:data.outputs[j].timestamp,
        time:data.outputs[j].timestamp,
        amount:parseFloat(data.outputs[j].value.toFixed(5)),
        reciverAmount:parseFloat(data.outputs[j].reciver[0].value.toFixed(5)),
        currencyType:data.symbole,
        valueInDollar:data.outputs[j].ValueInDollar
      })
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
    SetLoading(true)
    axios.get(`${serverAddress}/explorer/search/?query=${address}&network=${network}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      console.log(response)
      console.log(network)
      SetError(false)
      if (response.status === 200) {
        try {
          if (network === 'ETH') {
            SetData(AccountBaseAdd(AccountBaseAddress(response.data.data, address, 'ETH', 1000000000000000000)))
            SetLoading(false)
          } else if (network === 'BTC') {
            SetData(UTXOAdd(UTXOAddress(response.data.data, address, 'BTC', 100000000)))
            SetLoading(false)
          } else if (network === 'LTC') {
            SetData(UTXOAdd(UTXOAddress(response.data.data, address, 'LTC', 1)))
            SetLoading(false)
          } else if (network === 'BSC') {
            SetData(AccountBaseAdd(BSCAddress(response.data.data, address, 'BSC', 1000000000000000000)))
            SetLoading(false)
          } else if (network === 'BCH') {
            SetData(UTXOAdd(UTXOAddress(response.data.data, address, 'BCH', 1)))
            SetLoading(false)
          }
        } catch (error) {
          console.log(error)
          SetLoading(false)
          return toast.error('خطا در دریافت اطلاعات از سرور', {
            position: 'bottom-left'
          })
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
  }, [, States.WDetail])

  const deleteAddress = (value) => {
    const getGraph = States.GraphData
    const fitredAddress= getGraph.filter(obj => obj.address !== value)
    dispatch({type:"GRAPHDATA", value:fitredAddress})
    dispatch({type:"BeGraphReload", value:(!(States.BeGraphReload))})
  }

  return (
      <div id='CurrencyDetail' className='container-fluid' style={{overflowY:"auto"}}>
      <div className='row'>
        <div className='col-12'>
          <h6 style={{display:"inline-block"}}>جزئیات آدرس</h6>
          <span onClick={close}><ion-icon name="close-outline" id="closeIcon" ></ion-icon></span>
        </div>
      </div>
      <div className='row'>
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
          <div style={{background:"#2f4f4f", height:"75px", borderRadius:"10px"}}>
            <a className='text-whit mt-3 me-3' style={{transition:"0.2s", color:"black", background:MainSiteOrange, borderRadius:"8px", padding:"10px 15px", display:"inline-block"}}>نمایش مالک</a>
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
            <div className='col-12'>
            </div>
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
                    <WalletDetailTableBottom data={Data} address={States.WDetail}/>
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