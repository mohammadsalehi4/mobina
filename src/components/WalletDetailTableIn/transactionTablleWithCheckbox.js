/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, forwardRef } from 'react'
import NiceAddress2 from '../niceAddress2/niceAddress'

// ** Table Data & Columns
const data = [
  {
    address:"dsfhsdkhfklsadhfklsdhlkfhaskldhfklasdhflkjasdhflk",
    amount:"2.98121",
    year:"2021",
    month:"03",
    day:"13",
    hour:"19",
    minute:"45",
    mode:"in"
  },
  {
    address:"sadsdFSDFASDTFGSJADFGJSADGFJASsudkfgsjakdfgjasdgf",
    amount:"1.2291",
    year:"2020",
    month:"02",
    day:"11",
    hour:"11",
    minute:"25",
    mode:"out"
  },
  {
    address:"asdfasdfasdfathgtfshyfsbreagrnyhjshgesrgstgsgga",
    amount:"0.1231",
    year:"2019",
    month:"01",
    day:"19",
    hour:"22",
    minute:"24",
    mode:"in"
  }

]


const columns = [
  {
    name: 'تاریخ',
    sortable: true,
    minWidth: '120px',
    selector: row => Number((row.year) + (row.month) + (row.day) + (row.hour) + (row.minute)),
    cell: row => {
      return (
        <div>
          <p  style={{marginBottom:"-8px"}}>{`${row.year}/${row.month}/${row.day}`}</p>
          <small>{`${row.hour}:${row.minute}`}</small>
        </div>
      )
    }
  },
  {
    name: 'آدرس',
    sortable: false,
    minWidth: '180px',
    selector: row => row.address,
    cell: row => {
      return (
        <NiceAddress2 text={row.address} number={6}/>
      )
    }
  },
  {
    name: 'حجم',
    sortable: true,
    minWidth: '90px',
    selector: row => row.amount,
    cell: row => {
      if (row.mode === "in") {
        return (
          <p style={{color:"green", marginTop:"15px"}}>{row.amount}</p>
        )
      }
      if (row.mode === "out") {
        return (
          <p style={{color:"red"}}>{row.amount}</p>
        )
      }

    }
  }
]
// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'

// ** Reactstrap Imports
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

const WalletDetailTableBottom = () => {
  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

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
            selectableRows
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

export default WalletDetailTableBottom
