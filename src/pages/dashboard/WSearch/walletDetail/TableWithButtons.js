/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef, useEffect } from 'react'
import './style.css'
import Pickers from '../../../../views/forms/form-elements/datepicker'
import AmountLimit from '../../../../components/dashboard/amountLimit'
import TimeLimit from '../../../../components/dashboard/timeLimit'
import DataTable from 'react-data-table-component'
import NiceAddress from '../../../../components/niceAddress/niceAddress'
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
import { MainSiteGray, MainSiteGreen } from '../../../../../public/colors'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))


const DataTableWithButtons = (props) => {

  const columns = [
    {
      name: 'تاریخ',
      sortable: true,
      maxWidth: '120px',
      minWidth: '120px',
      selector: row => (
          <div>
            <p style={{marginTop:"10px"}}>{digitsEnToFa(row.Date)}</p>
            <p style={{marginTop:"-20px", marginBottom:"-2px"}}>{digitsEnToFa(row.Time)}</p>
          </div>
        )
    },
    {
      name: 'شناسه تراکنش',
      minWidth: '270px',
      selector: row => (
        <div className='d-flex align-items-end '>
          <div className='user-info text-truncate'>
            <span className='d-block text-truncate ms-0' style={{marginBottom:"-10px"}}>
              <NiceAddress  text={row.address} number={8}/>
            </span>
          </div>
  
        </div>
      )
    },
    {
      name: '',
      minWidth: '30px',
      selector: row =>  (
        
          row.mode ? <div className='d-flex align-items-end '>
            <ion-icon name="arrow-forward-outline" className="mb-1" id="inkouft"></ion-icon>
          </div> : <div className='d-flex align-items-end '>
            <ion-icon name="arrow-back-outline" className="mb-1" id="outkouft"></ion-icon>
          </div>
        
  
      )
    },
    {
      name: `حجم تراکنش (${props.data.symbole})`,
      sortable: true,
      minWidth: '120px',
      selector: row => (
        digitsEnToFa(row.BTCAmount)
      )
    },
    {
      name: `کارمزد (${props.data.symbole}) `,
      sortable: true,
      minWidth: '130px',
      maxWidth: '130px',
      selector: row => digitsEnToFa(row.Fee)
    }
  ]

  const [numberOfShow, SetNumberofShow] = useState(0)
  const [showData, SetShowData] = useState([])
  let filteredData = []
  useEffect(() => {
    const a = 5 * (numberOfShow + 1)
    filteredData = []
    for (let i = 0; i < a; i++) {
      if (props.data.LastTransactions[i]) {
        filteredData.push(props.data.LastTransactions[i])
        if (filteredData.length === props.data.LastTransactions.length) {
          document.getElementById('PaginationButton').style.color = MainSiteGray
        }
      }
    }
    SetShowData(filteredData)
    console.log(filteredData)
    console.log(props.data.LastTransactions)
  }, [, numberOfShow])

  return (
    <Fragment>
      <Card  style={{boxShadow:"none", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom' id="mainTable">
          <CardTitle tag='h3' id="CardTitle">آخرین تراکنش ها<img src={props.data.image} style={{ marginTop:"-10px", float:"left"}}/></CardTitle>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-3'>
                <TimeLimit/>
              </div>
              <div className='col-lg-3'>
                <AmountLimit/>
              </div>
              <div className='col-lg-3'>
              </div>
              <div className='col-lg-3'>
              </div>
            </div>
          </div>

        </CardHeader>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            columns={columns}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            selectableRowsComponent={BootstrapCheckbox}
            data={ showData}
          />
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-4'>
            </div>
            <div className='col-lg-4 mt-3 mb-3'>
              <button id='PaginationButton' onClick={() => { SetNumberofShow(numberOfShow + 1) }} style={{width:"100%", borderWidth:"1px", borderColor:MainSiteGray, borderStyle:"solid"}} type="button" class="btn">نمایش بیشتر...</button>
            </div>
            <div className='col-lg-4'>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  )
}

export default DataTableWithButtons
