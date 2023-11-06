/* eslint-disable array-bracket-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import NiceAddress2 from '../niceAddress2/niceAddress'
import { digitsEnToFa } from 'persian-tools'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from "react-redux"
import ReactPaginate from 'react-paginate'

import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

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

const  WalletDetailTableBottom = (props) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()

  const [data, SetData] = useState([])
  const [Filtred, SetFiltred] = useState([])
  const [Reload, SetReload] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  //add new node to graph
  const addSelectedData = (row) => {
    console.log(row)
    const getGraph = States.GraphData
      // ------------------------------------BUG------------------------------------
      if (row.mode === 'in') {
        for (let i = 0; i < getGraph.length; i++) {
          if ((getGraph[i].address).toUpperCase() === (props.address).toUpperCase()) {
            getGraph[i].inputs.push({
              hash:row.hash,
              symbole:row.symbole,
              value:row.amount.toFixed(5),
              timeStamp:row.time,
              address:props.data.address,
              valueInDollar:row.valueInDollar
            })
          }
        }
        if (getGraph.find(item => (item.address).toUpperCase() === (row.address).toUpperCase())) {
          for (let i = 0; i < getGraph.length; i++) {
            if ((getGraph[i].address).toUpperCase() === (row.address).toUpperCase()) {
              getGraph[i].outputs.push({
                hash:row.hash,
                symbole:row.symbole,
                value:row.senderAmount.toFixed(5),
                timeStamp:row.time,
                address:props.data.address,
                valueInDollar:row.valueInDollar
              })
            }
          }
        } else {
          const newNode = {
            address:row.address,
            symbole:row.symbole,
            inputs:[],
            outputs:[
              {
                hash:row.hash,
                symbole:row.symbole,
                value:row.senderAmount.toFixed(5),
                timeStamp:row.time,
                address:props.data.address,
                valueInDollar:row.valueInDollar
              }
            ]
          }
          getGraph.push(newNode)
        }

        dispatch({type:"GRAPHDATA", value:getGraph})
        dispatch({type:"MotherFucker", value:(!(States.MotherFucker))})
      } else if (row.mode === 'out') {
        for (let i = 0; i < getGraph.length; i++) {
          if ((getGraph[i].address).toUpperCase() === (props.address).toUpperCase()) {
            getGraph[i].outputs.push({
              hash:row.hash,
              symbole:row.symbole,
              value:row.amount.toFixed(5),
              timeStamp:row.time,
              address:row.address,
              valueInDollar:row.valueInDollar
            })
          }
        }
        if (getGraph.find(item => (item.address).toUpperCase() === (row.address).toUpperCase())) {
          for (let i = 0; i < getGraph.length; i++) {
            if ((getGraph[i].address).toUpperCase() === (row.address).toUpperCase()) {
              getGraph[i].inputs.push({
                hash:row.hash,
                symbole:row.symbole,
                value:row.reciverAmount.toFixed(5),
                timeStamp:row.time,
                address:props.data.address,
                valueInDollar:row.valueInDollar
              })
            }
          }
        } else {
          const newNode = {
            address:row.address,
            symbole:row.symbole,
            inputs:[
              {
                hash:row.hash,
                symbole:row.symbole,
                value:row.reciverAmount.toFixed(5),
                timeStamp:row.time,
                address:props.data.address,
                valueInDollar:row.valueInDollar
              }
            ],
            outputs:[]
          }
          getGraph.push(newNode)
        }
        dispatch({type:"GRAPHDATA", value:getGraph})
        dispatch({type:"MotherFucker", value:(!(States.MotherFucker))})
      }
  }

  function removeSelectedData(value) {
    const getGraph = States.GraphData
    console.log(value)
    for (let i = 0; i < getGraph.length; i++) {
      if (getGraph[i].address === props.address) {
        if (value.mode === 'in') {
          let filtredData = getGraph[i].inputs
          filtredData = filtredData.filter(obj => obj.hash !== value.hash)
          getGraph[i].inputs = filtredData
        } else if (value.mode === 'out') {
          let filtredData = getGraph[i].outputs
          filtredData = filtredData.filter(obj => obj.hash !== value.hash)
          getGraph[i].outputs = filtredData
        }
      }
    }
    dispatch({type:"GRAPHDATA", value:getGraph})
    dispatch({type:"MotherFucker", value:(!(States.MotherFucker))})
  }

  //show all transactions
  useEffect(() => {
    const a = []
    const MainData = States.GraphData
    //get All Hash
    const AllHash = []
    for (let i = 0; i < MainData.length; i++) {
      if (MainData[i].address === props.address) {
        for (let j = 0; j < MainData[i].inputs.length; j++) {
          if (AllHash.find(item => item === MainData[i].inputs[j].hash) === undefined) {
            AllHash.push(MainData[i].inputs[j].hash)
          }
        }
        for (let j = 0; j < MainData[i].outputs.length; j++) {
          if (AllHash.find(item => item === MainData[i].outputs[j].hash) === undefined) {
            AllHash.push(MainData[i].outputs[j].hash)
          }
        }
      }
    }

    for (let i = 0; i < props.data.inputs.length; i++) {
      if (AllHash.some(item => item.toUpperCase() === (props.data.inputs[i].hash).toUpperCase())) {
        a.push({
          amount:props.data.inputs[i].amount,
          senderAmount:props.data.inputs[i].senderAmount,
          address:props.data.inputs[i].address,
          date:props.data.inputs[i].date,
          time:props.data.inputs[i].time,
          hash:props.data.inputs[i].hash,
          valueInDollar:props.data.inputs[i].valueInDollar,
          symbole:props.data.inputs[i].currencyType,
          mode:"in",
          show:true
        })
      } else {
        a.push({
          address:props.data.inputs[i].address,
          amount:props.data.inputs[i].amount,
          senderAmount:props.data.inputs[i].senderAmount,
          date:props.data.inputs[i].date,
          time:props.data.inputs[i].time,
          hash:props.data.inputs[i].hash,
          valueInDollar:props.data.inputs[i].valueInDollar,
          symbole:props.data.inputs[i].currencyType,
          mode:"in",
          show:false
        })
      }
    }
    for (let i = 0; i < props.data.outputs.length; i++) {
      if (AllHash.some(item => item.toUpperCase() === (props.data.outputs[i].hash).toUpperCase())) {
        a.push({
          address:props.data.outputs[i].address,
          amount:props.data.outputs[i].amount,
          reciverAmount:props.data.outputs[i].reciverAmount,
          date:props.data.outputs[i].date,
          time:props.data.outputs[i].time,
          hash:props.data.outputs[i].hash,
          valueInDollar:props.data.outputs[i].valueInDollar,
          symbole:props.data.outputs[i].currencyType,
          mode:"out",
          show:true
        })
      } else {
        a.push({
          address:props.data.outputs[i].address,
          amount:props.data.outputs[i].amount,
          reciverAmount:props.data.outputs[i].reciverAmount,
          date:props.data.outputs[i].date,
          time:props.data.outputs[i].time,
          hash:props.data.outputs[i].hash,
          valueInDollar:props.data.outputs[i].valueInDollar,
          symbole:props.data.outputs[i].currencyType,
          mode:"out",
          show:false
        })
      }

    }
    SetData(a)

  }, [, props.data, currentPage, Reload])

  const columns = [
    {
      minWidth: '50px',
      maxWidth: '50px',
      sortable:false,
      selector: row => row.show,
      cell: row => {
        if (row.show) {
          return (
            <ion-icon name="remove-circle-outline" style={{fontSize:'32px', color:'red', cursor:'pointer'}} onClick={
              () => {
                removeSelectedData(row)
                SetReload(!Reload)
              }
            }>y</ion-icon>
          )
        } else {
            return (
              <ion-icon style={{fontSize:'32px', color:'green', cursor:'pointer'}} name="add-circle-outline" onClick={ () => {
                addSelectedData(row)
                SetReload(!Reload)
              } }>no</ion-icon>
          )
        }
      }
    },
    {
      name: 'تاریخ',
      sortable: false,
      minWidth: '120px',
      maxWidth: '120px',
      selector: row => row.date,
      cell: row => {
        return (
          <div>
            <p  style={{marginBottom:"-8px"}}>{`${digitsEnToFa(getMyTime(row.date).year)}/${digitsEnToFa(getMyTime(row.date).month)}/${digitsEnToFa(getMyTime(row.date).day)}`}</p>
            <small>{`${digitsEnToFa(getMyTime(row.date).hour)}:${digitsEnToFa(getMyTime(row.date).minute)}`}</small>
          </div>
        )
      }
    },
    {
      name: 'آدرس تراکنش',
      sortable: false,
      minWidth: '160px',
      maxWidth: '160px',
      selector: row => row.address,
      cell: row => {
        return (
          <NiceAddress2 text={row.hash} number={6}/>
        )
      }
    },
    {
      name: `حجم (${props.data.symbole})`,
      sortable: false,
      minWidth: '110px',
      maxWidth: '110px',
      selector: row => row.amount,
      cell: row => {
        if (row.mode === "in") {
          return (
            <p style={{color:"green", marginTop:"15px"}}>{digitsEnToFa(parseFloat((row.amount).toFixed(5)).toString())}</p>
          )
        }
        if (row.mode === "out") {
          return (
            <p style={{color:"red"}}>{digitsEnToFa(parseFloat((row.amount).toFixed(5)).toString())}</p>
          )
        }
  
      }
    }
  ]

  //pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }
  const CustomPagination = () => (
    <ReactPaginate
      nextLabel=''
      breakLabel='...'
      previousLabel=''
      pageRangeDisplayed={2}
      forcePage={(currentPage)}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      pageCount={Math.ceil(data.length / 10) || 1}
      onPageChange={page => handlePagination(page)}
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-3'
    />
  )

  //filters
  useEffect(() => {
    //min value
    const filtredData = []
    if (Number(States.StartFilterAmount) > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].amount > States.StartFilterAmount) {
          filtredData.push(data[i])
        }
      }
    } else { 
      for (let i = 0; i < data.length; i++) {
          filtredData.push(data[i])
      }
    }

    //max value
    const filtredData2 = []
    if (States.EndFilterAmount > 0) {
      for (let i = 0; i < filtredData.length; i++) {
        if (filtredData[i].amount < States.EndFilterAmount) {
          filtredData2.push(filtredData[i])
        }
      }
    } else { 
      for (let i = 0; i < filtredData.length; i++) {
          filtredData2.push(filtredData[i])
      }
    }

    //min time
    const filtredData3 = []
    if (States.StartFilterTime > 0) {
      for (let i = 0; i < filtredData2.length; i++) {
        if (filtredData2[i].date * 1000 > States.StartFilterTime) {
          filtredData3.push(filtredData2[i])
        }
      }
    } else { 
      for (let i = 0; i < filtredData2.length; i++) {
          filtredData3.push(filtredData2[i])
      }
    }

    //max time
    const filtredData4 = []
    console.log('States.endFilterTime')
    console.log(States.EndFilterTime)
    if (States.EndFilterTime > 0) {
      for (let i = 0; i < filtredData3.length; i++) {
        console.log(filtredData3[i].date * 1000)
        if (filtredData3[i].date * 1000 < States.EndFilterTime) {
          filtredData4.push(filtredData3[i])
        }
      }
    } else { 
      for (let i = 0; i < filtredData3.length; i++) {
          filtredData4.push(filtredData3[i])
      }
    }

    //All Input Output
    const filtredData5 = []
    if (Number(States.All_Input_Output) > 0) {
      for (let i = 0; i < filtredData4.length; i++) {
        if (Number(States.All_Input_Output) === 1) {
          if (filtredData4[i].mode === 'in') {
            filtredData5.push(filtredData4[i])
          }
        } else if (Number(States.All_Input_Output) === 2) {
          if (filtredData4[i].mode === 'out') {
            filtredData5.push(filtredData4[i])
          }
        }
      }
    } else { 
      for (let i = 0; i < filtredData4.length; i++) {
        filtredData5.push(filtredData4[i])
      }
    }
    console.log('filtredData5')
    console.log(filtredData5)
    SetFiltred(filtredData5)
  }, [ ,data,States.StartFilterAmount, States.EndFilterAmount, States.StartFilterTime, States.EndFilterTime, States.All_Input_Output])

  return (
    <Fragment>
      <Card>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            columns={columns}
            className='react-dataTable'
            data={Filtred}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default WalletDetailTableBottom
