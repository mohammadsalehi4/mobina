/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, forwardRef } from 'react'
import NiceAddress2 from '../niceAddress2/niceAddress'

// ** Table Data & Columns
const data = [
  {
    address:"dsfhsdkhfklsadhfklsdhlkfhaskldhfklasdhflkjasdhflk",
    amount:"1.34"
  },
  {
    address:"dsfhsdkhfklsadhfklsdhlkfhaskldhfklasdhflkjasdhflk",
    amount:"0.23"
  },
  {
    address:"dsfhsdkhfklsadhfklsdhlkfhaskldhfklasdhflkjasdhflk",
    amount:"1.90"
  }
]
const columns = [
  {
    name: 'آدرس های خروجی',
    sortable: false,
    minWidth: '300px',
    selector: row => row.address,
    cell: row => {
      return (
        <NiceAddress2 text={row.address} number={12}/>
      )
    }
  },
  {
    name: 'مقدار',
    sortable: true,
    minWidth: '100px',
    selector: row => row.amount
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

const TransactionTablleWithCheckbox2 = () => {
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

export default TransactionTablleWithCheckbox2
