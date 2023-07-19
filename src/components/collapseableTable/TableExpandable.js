/* eslint-disable no-unused-vars */
// ** React Imports
import { useState } from 'react'
import { digitsEnToFa } from 'persian-tools'
import DataTablesBasic from '../basicTable/TableZeroConfig'
import PickerRange from '../../components/taxRangePicker/PickerRange'
import TaxAmountLimit from '../TaxAmountLimit/PickerRange'
import TaxDayLimit from '../TaxDayLimit/PickerRange'
import TaxMPriceLimit from '../TaxPriceLimit/PickerRange'
import NiceAddress2 from '../niceAddress2/niceAddress'

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const data = [
  {
    address:"bc1qa33q7cplz54zcm66huuv9e8vuct98mzadzvg",
    totalAmount:0.785563,
    buyPrice:12356.25,
    timeLength:180,
    tax:"180,650,522"
  },
  {
    address:"bc1qlc6yxdvkpem4uv0y5s86rc8wn4ehpfzpu647c5",
    totalAmount:0.147489,
    buyPrice:25878.23,
    timeLength:180,
    tax:"4,600,184"
  },
  {
    address:"bc1q93d8x6q5ywlccwzsgq3aeshupex7vxpngc8s",
    totalAmount:1.336698,
    buyPrice:35693.02,
    timeLength:180,
    tax:"0"
  }

]

const underData = [
  {
    utxo:"a239763a0395f3a7c0d5a139333fac53445fca8a30381deb7b0f98f6aa7b1627",
    assets:0.336987,
    buyTime:"1401/07/07",
    buyPrice:"12356.25",
    holdingPeriod:180,
    applyPercentage:30,
    tax:"77,494,583"
  },
  {
    utxo:"fecafd75051baea32322fc74930a91f8ad8174e2a2e5d6e562537f1d0883d230",
    assets:0.448576,
    buyTime:"1401/07/07",
    buyPrice:"12356.25",
    holdingPeriod:180,
    applyPercentage:30,
    tax:"103,155,939"
  }
]

const columns = [
  {
    name: <p  style={{marginBottom:"0px"}}>شناسه آدرس<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '300px',
    selector: row => row.address,
    cell: row => {
      return (
        <NiceAddress2 text={row.address} number={8}/>
      )
    }
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
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.timeLength)}</p>
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
          <DataTablesBasic data={underData}/>
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
  UncontrolledPopover, PopoverBody, 
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
      pageLinkClassName='page-link '
      breakLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'}
    />
  )

  return (
    <Card>
      <CardHeader>
        <div style={{ width:"100%", float:"left"}}>
          <h6 style={{float:"right"}}>اطلاعات محاسبه شده مالیات</h6>
          <div id='getExelFormat'>
                <UncontrolledButtonDropdown id='taxTableDownloadDropDown' style={{float:"left"}}>
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
        <div style={{height:"1px", width:"100%", display:"block", background:"rgb(220,220,220)"}}></div>
        <div style={{ width:"100%", float:"left", marginTop:"10px"}}>
            <div className='container-fluid'>
              <div className='row'>
              <div className='col-lg-1'>
                  <h6 style={{marginBottom:"-10px", marginTop:"6px"}}>تعیین بازه:</h6>
                </div>
                <div className='col-lg-2'>
                  <PickerRange/>
                </div>
                <div className='col-lg-2'>
                  <TaxAmountLimit/>
                </div>
                <div className='col-lg-2'>
                  <TaxMPriceLimit/>
                </div>
                <div className='col-lg-2'>
                  <TaxDayLimit/>
                </div>
              </div>
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
