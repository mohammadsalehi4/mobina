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
          if(props.data[i].Type==='coin'){
            get=get+(Number(props.data[i].value))
          }
        } else if ((props.data[i].to).toLowerCase()===(props.address).toLowerCase()) {
          if(props.data[i].Type==='coin'){
            send=send+(Number(props.data[i].value))
          }
        }

        //transactions data
        if((props.data[i].from).toLowerCase()===(props.address).toLowerCase()){
        transactions.push({
          address:props.data[i].hash,
          mode:false,
          BTCAmount:Number(Number(props.data[i].value)),
          Date:props.data[i].timeStamp,
          Time:props.data[i].timeStamp,
          currencyType:props.data[i].currencyType,
          Logo:props.data[i].Logo,
          Fee:Number(Number((props.data[i].gasPrice)*Number(props.data[i].gasUsed))).toFixed(5),
          Type:props.data[i].Type
        })
        } else {
          transactions.push({
            address:props.data[i].hash,
            mode:true,
            BTCAmount:Number(Number(props.data[i].value)),
            Date:props.data[i].timeStamp,
            Time:props.data[i].timeStamp,
            currencyType:props.data[i].currencyType,
            Logo:props.data[i].Logo,
            Fee:Number(Number((props.data[i].gasPrice)*Number(props.data[i].gasUsed))).toFixed(5),
            Type:props.data[i].Type
          })
        }
      }

      SetTotalget(send)
      SetTotalsend(get)
      SetTotalSum(send-get)
      SetTr(transactions)
  }, [, props.data])

  const data = {
    address:props.address,
    name:props.coinData.name,
    Total: String(parseFloat(totalSum.toFixed(3)).toString()),
    InCome: String(parseFloat(totalget.toFixed(3)).toString()),
    OutCome: String(parseFloat(totalsend.toFixed(3)).toString()),
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
            <CardContentTypes data={data} Entity={props.Entity} labelData={props.labelData} TagData={props.TagData}/>
          </div>
          <div className='col-lg-6  mt-2'>
            <CardTransactions data={data} transactions={GetTr}/>
          </div>
        </div>
        <div className='row mt-0'>
          <div className='col-lg-12 mt-2'>
            <DataTableWithButtons Token={props.Token} data={data} transactions={GetTr}/>
          </div>
        </div>
    </div>
  )
}

export default Walletdetail