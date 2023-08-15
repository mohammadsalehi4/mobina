/* eslint-disable space-before-blocks */
/* eslint-disable keyword-spacing */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import CardTransactions from '../leftcard'
import CardContentTypes from '../rightCard'
import DataTableWithButtons from './TableWithButtons'

const Walletdetail = (props) => {

  const [totalsend, SetTotalsend] = useState(0.0)
  const [totalget, SetTotalget] = useState(0)
  const [totalSum, SetTotalSum] = useState(0)
  const [MinTime, SetMinTime] = useState(0)
  const [MaxTime, SetMaxTime] = useState(0)
  const [TrNumber, SetTrNumber] = useState(0)
  const [GetTr, SetTr]=useState([])

  const getMyTime=(index) => {
    const date = new Date(index*1000)
    let month
    let day
    let hour
    let minute

    if (String(Number(date.getMonth())+1).length === 1) {
      month = `0${date.getMonth()}`
    } else {
      month = date.getMonth()
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


  useEffect(() => {
    let get=0
    let send=0
    SetMinTime(props.data[0].timeStamp)
    SetMaxTime(props.data[0].timeStamp)

    let transactions=[]

    for (let i=0; i<props.data.length; i++) {
      
      if((props.data[i].from).toLowerCase()===(props.address).toLowerCase()){
        get=get+(Number(props.data[i].value)/1000000000000000000)
      } else if ((props.data[i].to).toLowerCase()===(props.address).toLowerCase()) {
        send=send+(Number(props.data[i].value)/1000000000000000000)
      }
      if(props.data[i].timeStamp > SetMinTime){
        SetMinTime(Number(props.data[i].timeStamp))
      }
      if(props.data[i].timeStamp < SetMaxTime){
        SetMaxTime(Number(props.data[i].timeStamp))
      }
      if(props.data[i].from===props.address){
        transactions.push({
          address:props.data[i].hash,
          mode:false,
          BTCAmount:Number(Number(props.data[i].value)/1000000000000000000),
          Date:props.data[i].timeStamp,
          Time:props.data[i].timeStamp,
          Fee:Number(Number((props.data[i].gasPrice)*Number(props.data[i].gasUsed))/1000000000000000000).toFixed(5)
        })
      } else {
        transactions.push({
          address:props.data[i].hash,
          mode:true,
          BTCAmount:String(Number(props.data[i].value/1000000000000000000)),
          Date:props.data[i].timeStamp,
          Time:props.data[i].timeStamp,
          Fee:Number(Number((props.data[i].gasPrice)*Number(props.data[i].gasUsed))/1000000000000000000).toFixed(5)
        })
      }
    }

    SetTotalget(get)
    SetTotalsend(send)
    SetTotalSum(get-send)
    SetTr(transactions)
    if(props.data.length < 10000){
      SetTrNumber(props.data.length)
    } else {
      SetTrNumber('+10000')

    }
  }, [, props.data])

  const data = {
    address:props.address,
    name:"اتریوم",
    Total: String(parseFloat(totalSum.toFixed(5)).toString()),
    InCome: String(parseFloat(totalget.toFixed(5)).toString()),
    OutCome: String(parseFloat(totalsend.toFixed(5)).toString()),
    TrNumber,
    FirstActivity:(`${getMyTime(MinTime).year}/${Number(getMyTime(MinTime).month)+1}/${getMyTime(MinTime).day}`),
    LastActivity:(`${getMyTime(MaxTime).year}/${Number(getMyTime(MaxTime).month)+1}/${getMyTime(MaxTime).day}`),
    symbole:"ETH",
    risk:"0%",
    owner:"بدون اطلاعات",
    ownerMode:"بدون اطلاعات",
    website:"بدون اطلاعات",
    image:'../images/ethereum.png'
  }

  return (
    <div className='container-fluid mt-0' style={{borderRadius:"8px", boxSizing:"border-box", background:"rgb(248,248,248)"}}>
        <div className='row mb-0' style={{borderRadius:"8px"}}>
          <div className='col-lg-6  mt-2'>
            <CardContentTypes data={data}/>
          </div>
          <div className='col-lg-6  mt-2'>
            <CardTransactions data={data}/>
          </div>
        </div>
        <div className='row mt-0'>
          <div className='col-lg-12 mt-2'>
            <DataTableWithButtons data={data} transactions={GetTr}/>
          </div>
        </div>
    </div>
  )
}

export default Walletdetail