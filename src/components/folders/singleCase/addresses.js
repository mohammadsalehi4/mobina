/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef } from 'react'
import { digitsEnToFa } from 'persian-tools'
import DataTable from 'react-data-table-component'
import NiceAddress2 from '../../niceAddress2/niceAddress'
import { ChevronDown, Share, Printer, Trash2, File, Grid, Copy, Plus, MoreVertical } from 'react-feather'
import {
  Modal,
  ModalBody,
  Card,
  ModalFooter,
  CardTitle,
  CardHeader,
  Button,
  DropdownItem,
  DropdownToggle, Badge,
  UncontrolledDropdown
} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../../public/colors'

const data = [
  {
    Address:"1Fw7wvVPhv5eioWQZ2if2zRUcHNdNBfu9r",
    currency:"BTC",
    Amount:"31.293122591",
    USDAmount:"853,256.760",
    Changes:"+1.27839201",
    USDChanges:"+34,120.145",
    mode:"green",
    risk:"80",
    MadeWith:"م‌ص",
    notifs:"آریان‌کوین",
    LastChangeDate:"1402/02/03",
    LastChangeTime:"13:29",
    Status:"open"
  },
  {
    Address:"16zy2qPQUm9ARnjnT7FhjXeoSc1eVCqngQ",
    currency:"BTC",
    Amount:"31.293122591",
    USDAmount:"853,256.760",
    Changes:"-0.12879009",
    USDChanges:"-3619.1079",
    mode:"red",
    risk:"30",
    MadeWith:"س‌ق",
    notifs:"آریان‌کوین",
    LastChangeDate:"1400/12/04",
    LastChangeTime:"19:34",
    Status:"done"
  },
  {
    Address:"bcsddsljflsdkfjlksd0dsf9dsd",
    currency:"BTC",
    Amount:"31.293122591",
    USDAmount:"853,256.760",
    Changes:"+0.671009",
    USDChanges:"+18,765.250",
    mode:"green",
    risk:"50",
    MadeWith:"ک‌ت",
    notifs:"آریان‌کوین",
    LastChangeDate:"1402/02/03",
    LastChangeTime:"13:29",
    Status:"ongoing"
  }
]

const Addresses = () => {

  const [DeleteBox, SetDeleteBox] = useState(false)
  const [DeleteLoading, SetDeleteLoading] = useState(false)

  const columns = [

    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>آدرس</p>,
      minWidth: '250px',
      maxWidth: '250px',
      sortable: row => row.Address,
      cell: row => (
        <div className='d-flex mt-1'>
            <span className='d-block fw-bold text-truncate'>{<NiceAddress2 text={row.Address} number={8} />}</span>
        </div>
      )
    },
    {
      name: 'ریسک',
      sortable: true,
      minWidth: '100px',
      maxWidth: '100px',
      selector: row => row.age,
      cell: row => (
        <p style={{marginTop:"15px", margin:"0px", direction:"ltr"}}>
            <ion-icon style={{color:MainSiteOrange}} name="flash"></ion-icon>
            
            {digitsEnToFa(`${row.risk}%`)}
        </p>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>شبکه</p>,
      sortable: true,
      minWidth: '120px',
      maxWidth: '120px',
      selector: row => row.Amount,
      cell: row => (
        <small>{row.currency}</small>

      )
    },
  
    {
        name: <p style={{marginTop:"15px", margin:"0px"}}>موجودی</p>,
        sortable: true,
        minWidth: '200px',
        maxWidth: '200px',
        selector: row => row.Changes,
        cell: row => (
          <p style={{marginTop:"15px", margin:"0px", direction:"ltr"}}>
              {digitsEnToFa(row.Changes)} <small>{row.currency}</small>
          </p>
        )
    },
      {
        name: 'مالک',
        sortable: true,
        minWidth: '150px',
        maxWidth: '150px',
        selector: row => row.age,
        cell: row => (
            <p style={{marginTop:"15px", margin:"0px", direction:"ltr", color:"blue"}}>
                {row.notifs}
            </p>
        )
      },
      {
        name: <p style={{marginTop:"15px", margin:"0px"}}>تاریخ افزودن</p>,
        minWidth: '140px',
        maxWidth: '140px',
        sortable: row => row.full_name,
        cell: row => (
          <div className='d-flex'>
            <div className='user-info text-truncate ms-1'>
              <span className='d-block fw-bold text-truncate'>{digitsEnToFa(row.LastChangeDate)}</span>
              <small>{digitsEnToFa(row.LastChangeTime)}</small>
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
          <Trash2 onClick={ () => { SetDeleteBox(true) }} style={{cursor:'pointer'}}/>
        )
      }
  ]

  return (
    <Fragment>
      <Card style={{minHeight:"100%", borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>لیست آدرس ها</CardTitle>
        </CardHeader>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            columns={columns}
            className='react-dataTable'
            direction='ltr'
            sortIcon={<ChevronDown size={10} />}
            data={data}
          />
        </div>
      </Card>

      <Modal
        isOpen={DeleteBox}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => SetDeleteBox(false)}
      >
        <ModalBody>
          <h6>آیا از حذف آدرس مورد نظر اطمینان دارید؟</h6>
        </ModalBody>
        <ModalFooter>

          <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteLabel() } }>
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

export default Addresses
