/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef } from 'react'
import { digitsEnToFa } from 'persian-tools'
import DataTable from 'react-data-table-component'
import NiceAddress2 from '../../niceAddress2/niceAddress'
import { ChevronDown, Share, Printer, FileText, File, Trash2, Copy, Plus, MoreVertical } from 'react-feather'
import {
  Row,
  Button,
  Card,
  Input,
  CardTitle,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter, Badge,
  UncontrolledDropdown
} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../../public/colors'

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const data = [
  {
    Address:"تحقیق و بررسی 1",
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
    Address:"تحقیق و بررسی 2",
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
    Address:"تحقیق و بررسی 3",
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

const Visualizations = () => {

  const [DeleteBox, SetDeleteBox] = useState(false)
  const [DeleteLoading, SetDeleteLoading] = useState(false)

  const columns = [
    {
      minWidth: '90px',
      maxWidth: '90px',
      selector: row => <ion-icon style={{background:"rgb(230,230,230)", padding:"8px", borderRadius:"4px", cursor:"pointer", fontSize:"18px", marginTop:"6px"}} name="git-network-outline"></ion-icon>
  
    },
      {
        name: <p style={{marginTop:"15px", margin:"0px"}}>نام</p>,
        minWidth: '130px',
        maxWidth: '130px',
        selector: row => digitsEnToFa(row.Address)
      },
      {
        name: 'ارز',
        sortable: true,
        minWidth: '60px',
        maxWidth: '60px',
        selector: row => row.currency
      },
      {
        name: <p style={{marginTop:"15px", margin:"0px"}}>توضیحات</p>,
        sortable: true,
        minWidth: '200px',
        maxWidth: '200px',
        selector: row => row.Amount,
        cell: row => (
          <span style={{fontSize:"12px", background:"rgb(191, 255, 176)", color:"green", padding:"2px 16px", borderRadius:"10px"}}>آماده بررسی</span>
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
          <CardTitle tag='h4'>ردیابی ها</CardTitle>
        </CardHeader>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            columns={columns}
            className='react-dataTable'
            direction='ltr'
            sortIcon={<ChevronDown size={10} />}
            selectableRowsComponent={BootstrapCheckbox}
            data={ data}
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
          <h6>آیا از حذف گراف ترسیم‌شده مورد نظر اطمینان دارید؟</h6>
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

export default Visualizations

