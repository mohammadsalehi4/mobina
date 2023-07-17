/* eslint-disable no-unused-vars */
// ** React Imports
import { useState } from 'react'
import { digitsEnToFa } from 'persian-tools'
import DataTablesBasic from '../basicTable/TableZeroConfig'
import PickerRange from '../../components/taxRangePicker/PickerRange'
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const data = [
  {
    address:"asdasdsfasdfsdfsdfasdfasdfasdfasdf",
    totalAmount:3.87,
    buyPrice:27878.98,
    timeLength:35,
    tax:123000000
  },
  {
    address:"asdasdsfasdfsdfsdfasdfasdfasdfasdf",
    totalAmount:3.87,
    buyPrice:27878.98,
    timeLength:35,
    tax:123000000
  },
  {
    address:"asdasdsfasdfsdfsdfasdfasdfasdfasdf",
    totalAmount:3.87,
    buyPrice:27878.98,
    timeLength:35,
    tax:123000000
  },
  {
    address:"asdasdsfasdfsdfsdfasdfasdfasdfasdf",
    totalAmount:3.87,
    buyPrice:27878.98,
    timeLength:35,
    tax:123000000
  }

]
const columns = [
  {
    name: <p  style={{marginBottom:"0px"}}>شناسه آدرس<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '300px',
    selector: row => row.address
  },
  {
    name: <p style={{marginBottom:"0px"}}>مجموع دارایی<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '210px',
    selector: row => row.totalAmount,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.totalAmount)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>میانگین قیمت خرید<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '210px',
    selector: row => row.buyPrice,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.buyPrice)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>میانگین مدت نگهداری<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '220px',
    selector: row => row.timeLength,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.buyPrice)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>مالیات<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '150px',
    selector: row => row.tax,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.tax)}</p>
      )
    }
  }

]
const ExpandableTable = () => {
  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-12">
          <DataTablesBasic/>
        </div>
      </div>
    </div>
  )
}
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

import '@styles/react/libs/tables/react-dataTable-component.scss'

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

const DataTableWithButtons = (props) => {
  const number = 12345
  const formattedNumber = digitsEnToFa(number)
  const [currentPage, setCurrentPage] = useState(0)

  const handlePagination = page => {
    setCurrentPage(page.selected)
  }
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={100}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active thisIsActivePageForce'
      pageClassName='page-item'
      breakClassName='page-item'
      // nextLinkClassName='page-link  nextLinkHoverForce'
      pageLinkClassName='page-link '
      breakLinkClassName='page-link'
      // previousLinkClassName='page-link nextLinkHoverForce'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'}
    />
  )

  return (
    <Card>
      <CardHeader>
        <div style={{ width:"100%", float:"left"}}>
          <h6 style={{float:"right"}}>اطلاعات محاسبه شده مالیات تراکنش</h6>
          <span style={{float:"left"}}>{props.trAddress}</span>
        </div>
        <div style={{height:"1px", width:"100%", display:"block", background:"rgb(220,220,220)"}}></div>
        <div style={{ width:"100%", float:"left", marginTop:"10px"}}>
          <span style={{float:"right"}}><PickerRange/></span>
          <div id='getExelFormat'>
              {/* <span>دانلود</span>
              <ion-icon name="download-outline"></ion-icon> */}
          <UncontrolledButtonDropdown id='taxTableDownloadDropDown'>
                <DropdownToggle color='secondary' id='taxTableDownloadDropDownButton' outline>
                  <span className='align-middle ms-50'>دریافت</span>
                  <ion-icon name="download-outline"></ion-icon>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className='w-100 taxTableDownloadDropDownOption'>
                    <span className='align-middle ms-50'>Excel</span>
                  </DropdownItem>
                  <DropdownItem className='w-100 taxTableDownloadDropDownOption'>
                    <span className='align-middle ms-50'>PDF</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
          </div>

        </div>
      
      </CardHeader>
      <div className='react-dataTable' style={{}}>
        <DataTable
          noHeader
          selectableRows
          data={data}
          expandableRows
          expandableIcon={
            {collapsed:<ion-icon style={{fontSize:"20px", marginRight:"8px"}} name="chevron-back-outline"></ion-icon>, expanded:<ion-icon style={{fontSize:"20px", marginRight:"8px"}} name="chevron-down-outline"></ion-icon> }
          }
          columns={columns}
          expandOnRowClicked
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          expandableRowsComponent={ExpandableTable}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </Card>
  )
}

export default DataTableWithButtons
