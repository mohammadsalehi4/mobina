/* eslint-disable space-before-blocks */
/* eslint-disable keyword-spacing */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import CardTransactions from '../leftcard'
import CardContentTypes from '../rightCard'
import DataTableWithButtons from './TableWithButtons'

//delete duplicate values
function removeDuplicates(arr, prop) {
  return arr.filter((obj, pos, self) => self.findIndex((testObj) => testObj[prop] === obj[prop]) === pos)
}

const Walletdetail = (props) => {

  const [totalsend, SetTotalsend] = useState(0.0)
  const [totalget, SetTotalget] = useState(0)
  const [totalSum, SetTotalSum] = useState(0)
  const [GetTr, SetTr]=useState([])

  useEffect(() => {
      let get=0
      let send=0
  
      let transactions=[]
  
      for (let i=0; i<props.data.length; i++) {

        //total send and get
        if((props.data[i].from).toLowerCase()===(props.address).toLowerCase()){
          get=get+(Number(props.data[i].value))
        } else if ((props.data[i].to).toLowerCase()===(props.address).toLowerCase()) {
          send=send+(Number(props.data[i].value))
        }

        //transactions data
        if((props.data[i].from).toLowerCase()===(props.address).toLowerCase()){
          transactions.push({
            address:props.data[i].hash,
            mode:false,
            BTCAmount:Number(Number(props.data[i].value)),
            Date:props.data[i].timeStamp,
            Time:props.data[i].timeStamp,
            Fee:Number(Number((props.data[i].gasPrice)*Number(props.data[i].gasUsed))).toFixed(5)
          })
        } else {
          transactions.push({
            address:props.data[i].hash,
            mode:true,
            BTCAmount:String(Number(props.data[i].value)),
            Date:props.data[i].timeStamp,
            Time:props.data[i].timeStamp,
            Fee:Number(Number((props.data[i].gasPrice)*Number(props.data[i].gasUsed))).toFixed(5)
          })
        }
      }
      
      SetTotalget(send)
      SetTotalsend(get)
      SetTotalSum(send-get)

      SetTr(removeDuplicates(transactions, 'address'))
  }, [, props.data])

  const data = {
    address:props.address,
    name:props.coinData.name,
    Total: String(parseFloat(totalSum.toFixed(5)).toString()),
    InCome: String(parseFloat(totalget.toFixed(5)).toString()),
    OutCome: String(parseFloat(totalsend.toFixed(5)).toString()),
    symbole:props.coinData.symbole,
    risk:props.coinData.risk,
    owner:props.coinData.owner,
    ownerMode:props.coinData.ownerMode,
    website:props.coinData.website,
    image:props.coinData.image,
    color:props.coinData.color
  }


  return (
    <div className='container-fluid mt-0' style={{borderRadius:"8px", boxSizing:"border-box", background:"rgb(248,248,248)"}}>
        <div className='row mb-0' style={{borderRadius:"8px"}}>
          <div className='col-lg-6  mt-2'>
            <CardContentTypes data={data}/>
          </div>
          <div className='col-lg-6  mt-2'>
            <CardTransactions data={data} transactions={GetTr}/>
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