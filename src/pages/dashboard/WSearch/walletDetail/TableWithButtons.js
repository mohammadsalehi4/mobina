import { Fragment, useState, forwardRef } from 'react'
import './style.css'
import { data, columns } from './data'
import Pickers from '../../../../views/forms/form-elements/datepicker'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'

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

const DataTableWithButtons = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue] = useState('')
  const [filteredData] = useState([])

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
    <Fragment >
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom' id="mainTable">
          <CardTitle tag='h3' id="CardTitle">آخرین تراکنش ها<img src='../images/bitcoin.png' style={{ marginTop:"-10px", float:"left"}}/></CardTitle>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-3'>
                <Pickers/>
              </div>
              <div className='col-lg-3'>
                <label for="customRange1" class="form-label">حداقل انتقال</label>
                <form class="multi-range-field">
                  <input placeholder='بدون محدودیت' id="multi" class="multi-range" type="number" style={{width:"100%", height:"37px", borderRadius:"5px", borderWidth:"1px", borderColor:"rgb(215,215,215)", borderStyle:"solid", paddingRight:"15px"}}/>
                </form>
              </div>
              <div className='col-lg-3'>
                <label for="customRange1" class="form-label">حداکثر انتقال</label>
                <form class="multi-range-field">
                  <input placeholder='بدون محدودیت' id="multi" class="multi-range" type="number" style={{width:"100%", height:"37px", borderRadius:"5px", borderWidth:"1px", borderColor:"rgb(215,215,215)", borderStyle:"solid", paddingRight:"15px"}}/>
                </form>
              </div>
              <div className='col-lg-3'>
              </div>
            </div>
          </div>

        </CardHeader>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            pagination
            columns={columns}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            selectableRowsComponent={BootstrapCheckbox}
            data={searchValue.length ? filteredData : data}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default DataTableWithButtons
