/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect, forwardRef } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import {
  Card,
  Input,
  CardTitle,
  CardHeader
} from 'reactstrap'
import { MainSiteGray } from '../../../../../../public/colors'
import NiceAddress from '../../../../../components/niceAddress/niceAddress'
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))
let data = [
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.8325,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.8325,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.8325,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.8325,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.8325,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.8325,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  }
]

const columns = [
  {
    name: '',
    allowOverflow: true,
    width:"20px",
    cell: () => {
      return (
        <div style={{cursor:"pointer", padding:"2px", background:"rgb(238,238,238)", borderRadius:"8px", padding:"2px 6px"}} >
          <ion-icon name="chevron-back-outline" id="qq112"></ion-icon>
        </div>
      )
    }
  },
  {
    name: 'آدرس',
    minWidth: '140px',
    maxWidth:"140px",
    selector: row => (
      <div className='d-flex mt-2 align-items-end '>
        <div className='user-info text-truncate'>
          <NiceAddress text={row.address} number={4}/>
        </div>
      </div>
    )
  },
  {
    name: 'ریسک',
    sortable: true,
    minWidth: '90px',
    maxWidth:'90px',
    selector: row => digitsEnToFa(row.RiskScore)
    },
    {
    name: 'حجم',
    sortable: true,
    minWidth: '50px',
    maxWidth:'180px',
    selector: row => digitsEnToFa(row.BTCAmount)
  },

  {
    name: 'مالک',
    maxWidth: '50px',
    cell: () => {
      return (
          // <button style={{background:"white", margin:"none", borderColor:"rgb(200,200,200)", color:"rgb(100,100,100)", borderStyle:"solid", borderRadius:"5px"}}>نمایش</button>
        <svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="-700 0 1200 500">
          <path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
          <circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="24"/>
        </svg>
      )
    }
  }
]

const LeftDataTableWithButtons = () => {

  const [numberOfShow, SetNumberofShow] = useState(0)
  const [showData, SetShowData] = useState([])
  let filteredData = []
  useEffect(() => {
    const a = 5 * (numberOfShow + 1)
    filteredData = []
    for (let i = 0; i < a; i++) {
      if (data[i]) {
        filteredData.push(data[i])
        if (filteredData.length === data.length) {
          document.getElementById('LeftPaginationButton').style.color = MainSiteGray
        }
      }
    }
    SetShowData(filteredData)
    console.log(filteredData)
    console.log(data)
  }, [, numberOfShow])

  return (
    <Fragment >
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom' id="mainTable">
          <CardTitle tag='h3' id="CardTitle">کیف های خروجی</CardTitle>
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
            <div className='col-md-2'>
            </div>
            <div className='col-md-8 mt-3 mb-3'>
              <button id='LeftPaginationButton' onClick={() => { SetNumberofShow(numberOfShow + 1) }} style={{width:"100%", borderWidth:"1px", borderColor:MainSiteGray, borderStyle:"solid"}} type="button" class="btn">نمایش بیشتر...</button>
            </div>
            <div className='col-md-2'>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  )
}

export default LeftDataTableWithButtons
