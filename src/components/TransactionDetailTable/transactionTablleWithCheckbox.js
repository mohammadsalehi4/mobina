/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import NiceAddress2 from '../niceAddress2/niceAddress'
import { digitsEnToFa } from 'persian-tools'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { useSelector, useDispatch } from "react-redux"
import {
  Card,
  Input
} from 'reactstrap'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const TransactionTablleWithCheckbox = (props) => {

  const dispatch = useDispatch()
  const States = useSelector(state => state)

  // ** States
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [data, SetData] = useState({})

  useEffect(() => {
    const a = []
    for (let i = 0; i < (props.data.transfers).length; i++) {
      a.push({
        address:props.data.transfers[i].from,
        amount:props.data.transfers[i].amount,
        currencyType:props.data.transfers[i].currencyType,
        show:false
      })
    }

    //check available data
    const GetGraphData = States.GraphData
    for (let i = 0; i < a.length; i++) {
      let check = false
      if (GetGraphData.some(item => (item.address).toUpperCase() === (a[i].address).toUpperCase())) {
        for (let j = 0; j < GetGraphData.length; j++) {
          if ((GetGraphData[j].address).toUpperCase()  === (a[i].address).toUpperCase()) {
            for (let k = 0; k < GetGraphData[j].outputs.length; k++) {
              if ((GetGraphData[j].outputs[k].hash).toUpperCase()  === (props.address).toUpperCase()) {
                check = true
              }
            }
          }
        }
      }
      if (check) {
        a[i].show = true
      }
    }

    SetData(a)
  }, [, props.data])

  //add new node to graph
  const addSelectedData = (row) => {
    
  }

  function removeSelectedData(value) {

  }

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
      name: 'آدرس های ورودی',
      sortable: false,
      minWidth: '200px',
      selector: row => row.address,
      cell: row => {
        return (
          <NiceAddress2 text={row.address} number={6}/>
        )
      }
    },
    {
      name: 'مقدار',
      sortable: true,
      minWidth: '100px',
      selector: row => (`\u200E${digitsEnToFa(parseFloat((row.amount).toFixed(5)).toString())  } ${  row.currencyType}`)
    }
  ]

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? Math.ceil(filteredData.length / 7) : Math.ceil(data.length / 7) || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
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
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
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
            selectableRowsComponent={BootstrapCheckbox}
            data={data}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default TransactionTablleWithCheckbox
