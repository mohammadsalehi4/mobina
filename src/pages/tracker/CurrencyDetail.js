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

const CurrencyDetail = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const close = () => {
    dispatch({type:"SETshowWalletData", value:false})
  }

  const [Loading1, SetLoading] = useState(true)
  const [Data, SetData] = useState({})

  const EthereumAddress = (getData, add) => {
    let data = []

    for (let i = 0; i < getData.result.length; i++) {
      try {
        if ((getData.result[i].to.address).toUpperCase()===add.toUpperCase() || (getData.result[i].from.address).toUpperCase()===add.toUpperCase()) {
          data.push({
            timeStamp:getData.result[i].timestamp,
            from:getData.result[i].from.address,
            to:getData.result[i].to.address,
            gasUsed:getData.result[i].gasUsed,
            gasPrice:Number(getData.result[i].gasPrice)/1000000000000000000,
            value:(Number(getData.result[i].value))/1000000000000000000,
            hash:getData.result[i].hash,
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
            hash:getData.result[i].hash,
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
            hash:getData.result[i].hash,
            currencyType:"ETH",
            Logo:"ETH.png",
            Type:"coin"
          })
        }
      }
    }
    
    // for (let a=0; a<getData.result.length; a++) {
    //   if (getData.result[a].logs.length > 0) {
    //     for (let j=0; j<getData.result[a].logs.length; j++) {
    //       try {
    //         if (getData.result[a].logs[j].address.symbol) {
    //           data.push({
    //             timeStamp:getData.result[a].timestamp,
    //             from:getData.result[a].logs[j].from,
    //             to:getData.result[a].logs[j].to,
    //             gasUsed:getData.result[a].gasUsed,
    //             gasPrice:Number(getData.result[a].gasPrice)/1000000000000000000,
    //             value:Number(getData.result[a].logs[j].amount)/(Math.pow(10, getData.result[a].logs[j].address.decimal)),
    //             hash:getData.result[a].logs[j].transactionHash,
    //             currencyType:getData.result[a].logs[j].address.symbol,
    //             Logo:`${getData.result[a].logs[j].address.symbol}.png`,
    //             Type:"token"
    //           })
    //         }
    //       } catch (error) {}
    //     }
    //   }
    // }

    //check values
    for (let i = 0; i < data.length; i++) {
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

    console.log('data')
    console.log(data)


    const inputs=[]
    const outputs=[]
    for (let i = 0; i < data.length; i++) {
      if ((data[i].to).toUpperCase() === add.toUpperCase()) {
        if (typeof (data[i].currencyType) === 'string' && typeof (data[i].from) === 'string' && typeof (data[i].hash) === 'string' && typeof (data[i].timeStamp) === 'number' && typeof (data[i].value) === 'number') {
          inputs.push({
            address:data[i].from,
            hash:data[i].hash,
            date:data[i].timeStamp,
            time:data[i].timeStamp,
            amount:data[i].value,
            currencyType:data[i].currencyType
          })
        }
      } else if ((data[i].from).toUpperCase() === add.toUpperCase()) {
        if (typeof (data[i].currencyType) === 'string' && typeof (data[i].from) === 'string' && typeof (data[i].hash) === 'string' && typeof (data[i].timeStamp) === 'number' && typeof (data[i].value) === 'number') {
          outputs.push({
            address:data[i].to,
            hash:data[i].hash,
            date:data[i].timeStamp,
            time:data[i].timeStamp,
            amount:data[i].value,
            currencyType:data[i].currencyType
          })
        }
      }
    }

    console.log({
      symbole:'ETH',
      inputs,
      outputs
    })

    return {
      symbole:'ETH',
      inputs,
      outputs
    }
  }

  useEffect(() => {
    const address = States.WDetail
    SetLoading(true)
    axios.get(`${serverAddress}/explorer/address?address=${address}&network=ETH&page_size=50&offset=1`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      try {
        SetData(EthereumAddress(response.data, address))
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

  const deleteAddress = (value) => {
    const getGraph = States.GraphData
    const fitredAddress= getGraph.filter(obj => obj.address !== value)
    dispatch({type:"GRAPHDATA", value:fitredAddress})
    dispatch({type:"MotherFucker", value:(!(States.MotherFucker))})
  }

  return (
      <div id='CurrencyDetail' className='container-fluid' style={{overflowY:"auto"}}>
      <div className='row'>
        <div className='col-12'>
          <h6 style={{display:"inline-block"}}>جزئیات آدرس بیت کوین</h6>
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
              console.log(States.WDetail)
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
          <button type="button" class="btn btn-outline-warning">نمایش آدرس <ion-icon name="open-outline"></ion-icon></button>
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
                    <WalletDetailTableBottom data={Data} address={States.WDetail}/>
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrencyDetail