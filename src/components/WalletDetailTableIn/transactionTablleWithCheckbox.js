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
  const [CustomData, SetCustomData] = useState(States.CustomGraphData)
  const [selectedRows, setSelectedRows] = useState([])

  const addSelectedData = (row) => {
    const a = selectedRows
    if (!a.some(obj => obj === row)) {
      a.push(row)
    }
    setSelectedRows(a)
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
    const MainData = States.GraphData

    //get All Hash
    const AllHash = []
    for (let i = 0; i < MainData.length; i++) {
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

    for (let i = 0; i < props.data.inputs.length; i++) {
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
    for (let i = 0; i < props.data.outputs.length; i++) {
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

    //recognizing available data
    for (let i = 0; i < a.length; i++) {
      if (AllHash.some(item => item.toUpperCase() === (a[i].hash).toUpperCase())) {
        a[i].show = true
      }
    }

    SetData(a)

  }, [, props.data])

  const columns = [
    {
      name: <Input type='checkbox'/>,
      minWidth: '50px',
      maxWidth: '50px',
      cell: row => {
        if (row.show) {
          return (
            <Input onChange={(event) => { 
              if (event.target.checked) {
                addSelectedData(row) 
              } else {
                removeByAddress(row)
              }
            }} defaultChecked type='checkbox'/>
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
  const [currentPage, setCurrentPage] = useState(0)
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
            pagination
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default WalletDetailTableBottom
