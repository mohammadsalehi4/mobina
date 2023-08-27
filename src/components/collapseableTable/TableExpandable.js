/* eslint-disable prefer-template */
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

import './style.css'

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const data = [
  {
    address:"bc1qa33q7cplz54zcm66huuv9e8vuct98mzadzvg",
    totalAmount:0.785563,
    buyPrice:"12,356.25",
    timeLength:180,
    tax:"1,806,505,220"
  },
  {
    address:"bc1qlc6yxdvkpem4uv0y5s86rc8wn4ehpfzpu647c5",
    totalAmount:0.147489,
    buyPrice:"25,878.23",
    timeLength:180,
    tax:"46,001,840"
  },
  {
    address:"bc1q93d8x6q5ywlccwzsgq3aeshupex7vxpngc8s",
    totalAmount:1.336698,
    buyPrice:"35,693.02",
    timeLength:180,
    tax:"0"
  }

]

const underData = [
  {
    utxo:"a239763a0395f3a7c0d5a139333fac53445fca8a30381deb7b0f98f6aa7b1627",
    assets:0.336987,
    buyTime:"1401/07/07",
    buyPrice:"12,356.25",
    holdingPeriod:180,
    applyPercentage:30,
    tax:"774,945,830"
  },
  {
    utxo:"fecafd75051baea32322fc74930a91f8ad8174e2a2e5d6e562537f1d0883d230",
    assets:0.448576,
    buyTime:"1401/07/07",
    buyPrice:"12,356.25",
    holdingPeriod:180,
    applyPercentage:30,
    tax:"1,031,559,390"
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
    name: <p style={{marginBottom:"0px"}}>مجموع دارایی (BTC)<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
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
    name: <p style={{marginBottom:"0px"}}>میانگین قیمت خرید (USD)<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '230px',
    selector: row => row.buyPrice,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.buyPrice)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>میانگین مدت نگهداری (روز)<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '250px',
    selector: row => row.timeLength,
    cell: row => {
      return (
        <p style={{marginBottom:"-3px"}}>{digitsEnToFa(row.timeLength)}</p>
      )
    }
  },
  {
    name: <p style={{marginBottom:"0px"}}>مالیات (ريال)<ion-icon title='توضیحات' style={{fontSize:"10px", color:"rgb(130,130,130)", borderRadius:"50%", marginRight:"4px", marginBottom:"-3px", borderStyle:"solid", borderWidth:"1px" }} name="help-outline"></ion-icon></p>,
    sortable: true,
    minWidth: '180px',
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
import { ChevronDown, Calendar, Info, BarChart2, AlertTriangle } from 'react-feather'
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
import { MainSiteGray, MainSiteGreen, MainSiteLightGreen, MainSiteOrange, MainSiteLightOrange, MainSiteyellow } from '../../../public/colors'

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

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-8' id='taxTitleTableRight'>
              <h6 style={{float:"right"}}>مالیات محاسبه شده تراکنش</h6>
            </div>
            <div className='col-sm-4' id='taxTitleTableLeft'>
              <UncontrolledButtonDropdown style={{ direction:"ltr"}}>
                <DropdownToggle color={MainSiteLightOrange} style={{borderRadius:"6px", background:MainSiteOrange, borderColor:MainSiteOrange, borderStyle:"solid", borderWidth:"1px", color:"white", borderRadius:"6px", marginBottom:"10px", marginTop:"-10px"}}>
                  <span className='align-middle ms-50'>دریافت</span>
                  <ion-icon name="download-outline"></ion-icon>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem className='w-100 '>
                    <span className='align-middle ms-50'>Excel</span>
                  </DropdownItem>
                  <DropdownItem className='w-100 '>
                    <span className='align-middle ms-50'>PDF</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </div>
        </div>

        <div style={{height:"1px", width:"100%", display:"block", background:"rgb(220,220,220)"}}></div>
        <div style={{ width:"100%", float:"left", marginTop:"10px"}}>
            <div className='container-fluid'>
              <div className='row'>

                <div className='col-lg-4 mt-3'>
                    <div className='col-12'>
                      <p style={{color:"rgb(160,160,160)"}}>شناسه تراکنش</p>
                    </div>
                    <div className='col-12' style={{marginTop:"-16px"}}>
                      <Info size={15} style={{marginTop:"-4px", marginLeft:"4px", color:"rgb(160,160,160)"}} />
                      <NiceAddress2 text="asdhaskdhakldkjaghkldfjshgkldsfgkjsdfhgklfdgkljhdfklgdfgsfdg" number={8}/>
                    </div>

                    <div className='col-12 mt-3'>
                      <p style={{color:"rgb(160,160,160)"}}>تاریخ تراکنش</p>
                    </div>
                    <div className='col-12' style={{marginTop:"-16px"}}>
                      <Calendar size={15} style={{marginTop:"-4px", marginLeft:"4px", color:"rgb(160,160,160)"}}/>
                      <span>{digitsEnToFa("1400/02/03")}</span>
                    </div>
                </div>


                <div className='col-lg-4 mt-3'>
                    <div className='col-12'>
                      <p style={{color:"rgb(160,160,160)"}}>قیمت فروش (USD)</p>
                    </div>
                    <div className='col-12' style={{marginTop:"-16px"}}>
                      <BarChart2 size={15} style={{marginTop:"-4px", marginLeft:"4px", color:"rgb(160,160,160)"}}/>
                      <span>{digitsEnToFa("28,000")}</span>
                    </div>

                    <div className='col-12 mt-3'>
                      <p style={{color:"rgb(160,160,160)"}}>نوع ارز</p>
                    </div>
                    <div className='col-12' style={{marginTop:"-16px"}}>
                      <AlertTriangle size={15} style={{marginTop:"-4px", marginLeft:"4px", color:"rgb(160,160,160)"}}/>
                      <span>بیت کوین</span>
                    </div>
                </div>


                <div className='col-lg-4 mt-3'>

                  <div className='col-12'>
                    <span style={{color:"rgb(160,160,160)"}}>قیمت دلار (ریال)</span>
                  </div>
                  <div className='col-6'>
                    <Input type='number' placeholder='قیمت...'/>
                  </div>

                  <div className='col-12 mt-3'>
                    <p style={{color:"rgb(160,160,160)"}}>تاریخ اعمال محاسبات</p>
                  </div>
                  <div className='col-6' style={{marginTop:"-16px"}}>
                    <Input type='date' placeholder='' style={{color:"rgb(200,200,200)"}}/>
                  </div>

                  <div className='row mt-1'>

                    <div className='col-6' style={{textAlign:"left"}}>
                    </div>
                    <div className='col-6'>

                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col-lg-10'>
                </div>
                <div className='col-lg-2' style={{textAlign:"left"}}>
                  <button style={{ background:MainSiteyellow, borderColor:MainSiteyellow, borderStyle:"solid", color:"white", borderRadius:"6px", padding:"7px 12px" }} outline>
                    بروزرسانی
                    <ion-icon style={{marginBottom:"-4px", marginRight:"8px"}} name="refresh-outline"></ion-icon>  
                  </button>
                </div>
              </div>
            </div>
        </div>
        <div style={{height:"1px", width:"100%", display:"block", background:"rgb(220,220,220)", marginTop:"25px"}}></div>
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
