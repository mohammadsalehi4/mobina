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
import ReactPaginate from 'react-paginate'
import moment from 'jalali-moment'
import { useSelector, useDispatch } from "react-redux"

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

function formatNumber(num, index) {
  num = parseFloat(num.toFixed(index))

  const parts = num.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  if (parts[1]) {
      parts[1] = parts[1].replace(/0+$/, '')
  }

  return parts.join(".")
}

const LeftDataTableWithButtons = (props) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()

  const columns = [
    {
      name: '',
      allowOverflow: true,
      width:"10px",
      maxWidth:"10px",
      cell: () => {
        return (
          <div  style={{background:"#dcdcdc", padding:"2px 4px", borderRadius:"6px", cursor:"pointer"}} >
            <ion-icon style={{marginBottom:"-3px", marginRight:"-2px"}} name="chevron-forward-outline"></ion-icon>
          </div>
        )
      }
    },
    {
      name: 'آدرس',
      minWidth: '200px',
      maxWidth:"200px",
      selector: row => (
        <div className='d-flex align-items-end ' style={{cursor:"pointer"}}>
          <div className='user-info text-truncate'
          onClick={() => { 
            document.getElementById('transactionValue').value = `${row.address.address}` 
            document.getElementById('MainSubmitBotton').click()
          }}
          >
            <NiceAddress text={row.address} number={6}/>
          </div>
        </div>
      )
    },
    // {
    //   name: 'ریسک',
    //   sortable: true,
    //   minWidth: '80px',
    //   maxWidth:'80px',
    //   selector: row => digitsEnToFa(row.RiskScore)
    //   },
      {
      name: `حجم (${props.data.symbole})`,
      sortable: true,
      minWidth: '50px',
      maxWidth:'180px',
      selector: row => digitsEnToFa(formatNumber(row.BTCAmount, 5))
    },
  
    {
      name: 'مالک',
      maxWidth: '90px',
      minWidth: '90px',
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

  const [numberOfShow, SetNumberofShow] = useState(0)
  const [showData, SetShowData] = useState([])
  let filteredData = []
  useEffect(() => {
    filteredData = []
    for (let i = 0; i < props.data.outputData.length; i++) {
      if (props.data.outputData[i]) {
        filteredData.push(props.data.outputData[i])
      }
    }
    SetShowData(filteredData)
  }, [, numberOfShow, props.data.outputData.length])

    const LoadMore = () => {
      let getPage = States.TransactionOutputPagination
      getPage = getPage + 1
      dispatch({type:"TransactionOutputPagination", value:getPage})
    }

  return (
    <Fragment >
      <Card style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", height:"100%"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom' id="mainTable">
          <CardTitle tag='h3' id="CardTitle">کیف های خروجی</CardTitle>
        </CardHeader>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            columns={columns}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            data={ showData}
          />
        </div>
        <div style={{textAlign:'center'}}>
          <Card onClick={LoadMore} style={{borderColor:'gray', borderWidth:'1px', borderStyle:'solid', width:'200px', cursor:'pointer', margin:'8px 0px', marginLeft:'auto', marginRight:'auto', height:'40px', transition:'0s'}} 
            className = 'p-2'
            // className = {!Loading ? 'p-2' : 'p-2 pt-3'}
          >
            <span>
              نمایش بیشتر
            </span>
          </Card>
        </div>
      </Card>
    </Fragment>
  )
}

export default LeftDataTableWithButtons
