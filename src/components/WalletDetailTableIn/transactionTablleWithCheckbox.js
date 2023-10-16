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
  const [selectedRows, setSelectedRows] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  //add new node to graph
  const addSelectedData = (row) => {
    const getGraph = States.GraphData
    
      // ------------------------------------BUG------------------------------------
      if (row.mode === 'in') {
        for (let i = 0; i < getGraph.length; i++) {
          if ((getGraph[i].address).toUpperCase() === (props.address).toUpperCase()) {
            getGraph[i].inputs.push({
              hash:row.hash,
              symbole:'ETH',
              value:row.amount.toFixed(5),
              timeStamp:row.date,
              address:row.address
            })
          }
        }
        if (getGraph.find(item => (item.address).toUpperCase() === (row.address).toUpperCase())) {
          for (let i = 0; i < getGraph.length; i++) {
            if ((getGraph[i].address).toUpperCase() === (row.address).toUpperCase()) {
              getGraph[i].outputs.push({
                hash:row.hash,
                symbole:'ETH',
                value:row.amount.toFixed(5),
                timeStamp:row.date,
                address:props.address
              })
            }
          }
        } else {
          const newNode = {
            address:row.address,
            symbole:'ETH',
            inputs:[],
            outputs:[
              {
                hash:row.hash,
                symbole:'ETH',
                value:row.amount.toFixed(5),
                timeStamp:row.date,
                address:props.address
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
              symbole:'ETH',
              value:row.amount.toFixed(5),
              timeStamp:row.date,
              address:row.address
            })
          }
        }
        if (getGraph.find(item => (item.address).toUpperCase() === (row.address).toUpperCase())) {
          for (let i = 0; i < getGraph.length; i++) {
            if ((getGraph[i].address).toUpperCase() === (row.address).toUpperCase()) {
              getGraph[i].inputs.push({
                hash:row.hash,
                symbole:'ETH',
                value:row.amount.toFixed(5),
                timeStamp:row.date,
                address:props.address
              })
            }
          }
        } else {
          const newNode = {
            address:row.address,
            symbole:'ETH',
            inputs:[
              {
                hash:row.hash,
                symbole:'ETH',
                value:row.amount.toFixed(5),
                timeStamp:row.date,
                address:props.address
              }
            ],
            outputs:[]
          }
          getGraph.push(newNode)
        }
        dispatch({type:"GRAPHDATA", value:getGraph})
        dispatch({type:"MotherFucker", value:(!(States.MotherFucker))})
      }

      console.log(States.GraphData)
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

  useEffect(() => {
    const a = []
    const MainData = States.GraphData
    console.log(props.data)
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
          address:props.data.inputs[i].address,
          amount:props.data.inputs[i].amount,
          date:props.data.inputs[i].date,
          time:props.data.inputs[i].time,
          hash:props.data.inputs[i].hash,
          mode:"in",
          show:true
        })
      } else {
        a.push({
          address:props.data.inputs[i].address,
          amount:props.data.inputs[i].amount,
          date:props.data.inputs[i].date,
          time:props.data.inputs[i].time,
          hash:props.data.inputs[i].hash,
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
          date:props.data.outputs[i].date,
          time:props.data.outputs[i].time,
          hash:props.data.outputs[i].hash,
          mode:"out",
          show:true
        })
      } else {
        a.push({
          address:props.data.outputs[i].address,
          amount:props.data.outputs[i].amount,
          date:props.data.outputs[i].date,
          time:props.data.outputs[i].time,
          hash:props.data.outputs[i].hash,
          mode:"out",
          show:false
        })
      }

    }

    SetData(a)

  }, [, props.data, currentPage])

  const columns = [
    {
      minWidth: '50px',
      maxWidth: '50px',
      sortable:false,
      selector: row => row.show,
      cell: row => {
        if (row.show) {
          return (
            <Input id={row.hash} onChange={(event) => { 
              if (event.target.checked) {
                addSelectedData(row)
              } else {
                removeSelectedData(row)
              }
            }} defaultChecked type='checkbox'/>
          )
        } else {
            return (
              <Input id={row.hash} onChange={(event) => { 
                if (event.target.checked) {
                  addSelectedData(row)
                } else {
                  removeSelectedData(row)
                }
              }}  type='checkbox'/>
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
      name: 'آدرس کیف پول',
      sortable: false,
      minWidth: '160px',
      maxWidth: '160px',
      selector: row => row.address,
      cell: row => {
        return (
          <NiceAddress2 text={row.address} number={6}/>
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

  return (
    <Fragment>
      <Card>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            columns={columns}
            className='react-dataTable'
            data={data}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default WalletDetailTableBottom
