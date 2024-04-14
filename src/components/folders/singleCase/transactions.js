/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import { digitsEnToFa } from 'persian-tools'
import DataTable from 'react-data-table-component'
import NiceAddress2 from '../../niceAddress2/niceAddress'
import { ChevronDown, Share, Printer, FileText, File, Trash2, Copy, Plus, MoreVertical } from 'react-feather'
import {
  Button,
  Modal,
  Card,
  ModalBody,
  CardTitle,
  CardHeader,
  ModalFooter,
  DropdownItem,
  DropdownToggle, Badge,
  UncontrolledDropdown
} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../../public/colors'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'
import { JalaliCalendar } from '../../../processors/jalaliCalendar'
import LoadingButton from '../../loadinButton/LoadingButton'
const data = [
  {
    Address:"5407317937e50337c72187b13d14eca1e2f77e439436c616e64d128dcd4dc721",
    currency:"BTC",
    Amount:"31.293122591",
    USDAmount:"853,256.760",
    Changes:"+9.27839201",
    mode:"green",
    risk:"80",
    MadeWith:"م‌ص",
    notifs:"آریان‌کوین",
    LastChangeDate:"1402/02/03",
    LastChangeTime:"13:29",
    Status:"open"
  },
  {
    Address:"7139435a5e59418d6264a4ef6daffbfa393125779265bf7fe9420efb16954e8a",
    currency:"BTC",
    Amount:"31.293122591",
    USDAmount:"853,256.760",
    Changes:"-122.39201",
    mode:"red",
    risk:"30",
    MadeWith:"س‌ق",
    notifs:"آریان‌کوین",
    LastChangeDate:"1400/12/04",
    LastChangeTime:"19:34",
    Status:"done"
  },
  {
    Address:"f5d8ee39a430901c91a5917b9f2dc19d6d1a0e9cea205b009ca73dd04470b9a6",
    currency:"BTC",
    Amount:"31.293122591",
    USDAmount:"853,256.760",
    Changes:"+1,200.3602",
    mode:"green",
    risk:"50",
    MadeWith:"ک‌ت",
    notifs:"آریان‌کوین",
    LastChangeDate:"1402/02/03",
    LastChangeTime:"13:29",
    Status:"ongoing"
  }
]

const Transactions = (props) => {
  const [DeleteBox, SetDeleteBox] = useState(false)
  const [DeleteId, SetDeleteId] = useState(false)
  const [DeleteLoading, SetDeleteLoading] = useState(false)
  const [data, SetData] = useState([])

  const columns = [

    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>آدرس</p>,
      minWidth: '200px',
      maxWidth: '200px',
      sortable: row => row.hash,
      cell: row => (
        <div className='d-flex mt-1'>
            <span className='d-block fw-bold text-truncate'>{<NiceAddress2 text={row.hash} number={8} />}</span>
        </div>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>حجم تراکنش</p>,
      sortable: true,
      minWidth: '150px',
      maxWidth: '150px',
      selector: row => row.volume,
      cell: row => (
        <div>
        <p style={{marginTop:"15px", margin:"0px", direction:"ltr"}}>
            {digitsEnToFa(Number(row.volume).toFixed(5))} <small>{row.network_symbol}</small>
        </p>
        </div>

      )
    },
      {
        name: <p style={{marginTop:"15px", margin:"0px"}}>تاریخ افزودن</p>,
        minWidth: '120px',
        maxWidth: '120px',
        sortable: row => row.full_name,
        cell: row => (
          <div className='d-flex'>
            <div className='user-info text-truncate ms-1'>
              <span className='d-block fw-bold text-truncate'>{digitsEnToFa(`${JalaliCalendar(new Date(row.date_created).getTime()).year}-${JalaliCalendar(new Date(row.date_created).getTime()).month}-${JalaliCalendar(new Date(row.date_created).getTime()).day}`)}</span>
              <small>{digitsEnToFa(`${JalaliCalendar(new Date(row.date_created).getTime()).hour}:${JalaliCalendar(new Date(row.date_created).getTime()).minute}`)}</small>
            </div>
          </div>
        )
      },
      {
        name: <p style={{marginTop:"15px", margin:"0px"}}>عملیات</p>,
        sortable: true,
        minWidth: '120px',
        maxWidth: '120px',
        cell: row => (
          <Trash2 onClick={ () => { SetDeleteId(row.id), SetDeleteBox(true) }} style={{cursor:'pointer'}}/>
        )
      }
]

useEffect(() => {
  if (props.Data.transactions.length > 0) {
    SetData(props.Data.transactions)
  }
}, [props.Data.transactions.length])

const deleteTransaction = () => {
  SetDeleteLoading(true)
  axios.delete(`${serverAddress}/case/transaction-list/${DeleteId}`, 
  {
    headers: {
      Authorization: `Bearer ${Cookies.get('access')}`
    }
  })
  .then((response) => {
      if (response.status === 204) {
        window.location.reload()
      }
  })
  .catch((err) => {
    console.log(err)
  })
}

  return (
    <Fragment>
      <Card style={{minHeight:"100%", borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>لیست تراکنش ها</CardTitle>
        </CardHeader>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          {
            data.length > 0 ?
              <DataTable
                noHeader
                columns={columns}
                className='react-dataTable'
                direction='ltr'
                sortIcon={<ChevronDown size={10} />}
                data={data}
              />
          :
            <p style={{textAlign:'center'}} className='pt-5'>بدون تراکنش ذخیره شده</p>
          }

        </div>
      </Card>

      <Modal
        isOpen={DeleteBox}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => SetDeleteBox(false)}
      >
        <ModalBody>
          <h6>آیا از حذف تراکنش مورد نظر اطمینان دارید؟</h6>
        </ModalBody>
        <ModalFooter>

          <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteTransaction() } }>
          {
              DeleteLoading ? 
              <LoadingButton/>
              :
              <span>
                حذف
              </span>
            }
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default Transactions
