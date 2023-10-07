/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import NiceAddress2 from '../niceAddress2/niceAddress'
import { digitsEnToFa } from 'persian-tools'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from "react-redux"

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

const  WalletDetailTableBottom = (props) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()

  const [data, SetData] = useState([])
  const [CustomData, SetCustomData] = useState(States.CustomGraphData)
  const [selectedRows, setSelectedRows] = useState([])

  const addSelectedData = (row) => {
    const a = selectedRows
    if (!a.some(obj => obj === row)) {
      a.push(row)
    }
    setSelectedRows(a)
    console.log('/////////////////////////////////')
    console.log(selectedRows)
    console.log(CustomData)
  }

  function removeByAddress(value) {
    const array = selectedRows
    const indexToRemove = array.findIndex(obj => obj.address === value.address)
    if (indexToRemove !== -1) {
      array.splice(indexToRemove, 1)
    }
    setSelectedRows(array)
  }

  useEffect(() => {
    const a = []
    console.log(CustomData)
    for (let i = 0; i < props.data.in.length; i++) {
      a.push({
        address:props.data.in[i].address,
        amount:props.data.in[i].amount,
        date:props.data.in[i].date,
        time:props.data.in[i].time,
        mode:"in"
      })
    }
    for (let i = 0; i < props.data.out.length; i++) {
      a.push({
        address:props.data.out[i].address,
        amount:props.data.out[i].amount,
        date:props.data.out[i].date,
        time:props.data.out[i].time,
        mode:"out"
      })
    }
    SetData(a)
  }, [, props.data])

  const columns = [
    {
      name: <Input type='checkbox'/>,
      minWidth: '50px',
      maxWidth: '50px',
      cell: row => {
        if (row.id === 2) {
          return (
            <Input onChange={(event) => { 
              if (event.target.checked) {
                addSelectedData(row) 
              } else {
                removeByAddress(row)
              }
            }} type='checkbox'/>
          )
        } else {
            addSelectedData(row) 
            return (
            <Input onChange={(event) => { 
              if (event.target.checked) {
                addSelectedData(row) 
              } else {
                removeByAddress(row)
              }
            }} defaultChecked type='checkbox'/>
          )
        }

      }
    },
    {
      name: 'تاریخ',
      sortable: true,
      minWidth: '120px',
      maxWidth: '120px',
      selector: row => Number((row.year) + (row.month) + (row.day) + (row.hour) + (row.minute)),
      cell: row => {
        return (
          <div>
            <p  style={{marginBottom:"-8px"}}>{`${row.date}`}</p>
            <small>{`${row.time}`}</small>
          </div>
        )
      }
    },
    {
      name: 'آدرس',
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
      name: 'حجم (BTC)',
      sortable: true,
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
  
  return (
    <Fragment>
      <Card>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            columns={columns}
            className='react-dataTable'
            data={data}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default WalletDetailTableBottom
