/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef } from 'react'
import { digitsEnToFa } from 'persian-tools'
import AddNewModal from './AddNewModal'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Trash2, FileText, File, Grid, Copy, Plus, MoreVertical } from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  CardTitle,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import LoadingButton from '../loadinButton/LoadingButton'
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const data = [
  {
    name:"کیس کلاهبرداری",
    currency:"BTC",
    Amount:"31.2931291",
    mode:"green",
    notifs:"متعادل",
    LastChangeTime:"13:29",
    LastChangeDate:'1403-02-03',
    Status:"open",
    AddressNumber:3,
    TransactionNumber:4,
    GraphNumber:5
  },
  {
    name:"کیس کلاهبرداری",
    currency:"BTC",
    Amount:"31.2931291",
    mode:"green",
    notifs:"متعادل",
    LastChangeTime:"13:29",
    LastChangeDate:'1403-02-03',
    Status:"open",
    AddressNumber:3,
    TransactionNumber:4,
    GraphNumber:5
  },
  {
    name:"کیس کلاهبرداری",
    currency:"BTC",
    Amount:"31.2931291",
    mode:"green",
    notifs:"متعادل",
    LastChangeTime:"13:29",
    LastChangeDate:'1403-02-03',
    Status:"open",
    AddressNumber:3,
    TransactionNumber:4,
    GraphNumber:5
  }
]

const MainFolderTable = () => {
  const [modal, setModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [DeleteBox, SetDeleteBox] = useState(false)
  const [DeleteLoading, SetDeleteLoading] = useState(false)
  const handleModal = () => setModal(!modal)

  const columns = [
    {
        minWidth: '30px',
        maxWidth: '30px',
        cell: () => (
            <a href='/case' style={{marginRight:"10px", marginTop:"5px", cursor:"pointer"}}>
                <ion-icon style={{marginRight:"-25px", fontSize:"120px", width:"20px", height:"20px", background:"rgb(240,240,240)", padding:"5px", borderRadius:"8px"}}  name="briefcase-outline"></ion-icon>
            </a>
        )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>نام</p>,
      minWidth: '200px',
      maxWidth: '200px',
      sortable: row => row.name,
      cell: row => (
        <div className='d-flex'>
          <div className='user-info text-truncate ms-1'>
            <span className='d-block fw-bold text-truncate'>{row.name}</span>
          </div>
        </div>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>شبکه‌ها</p>,
    sortable: true,
    minWidth: '100px',
    maxWidth: '100px',
    selector: row => row.currency,
    cell: row => (
      <p style={{marginTop:"15px", margin:"0px"}}>
          {row.currency}
      </p>
    )
  },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تعداد آدرس‌ها</p>,
      minWidth: '130px',
      maxWidth: '130px',
      sortable: row => row.name,
      cell: row => (
        <div className='d-flex'>
          <div className='user-info text-truncate ms-1'>
            <span className='d-block fw-bold text-truncate'>{row.AddressNumber}</span>
          </div>
        </div>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تعداد تراکنش‌ها</p>,
      minWidth: '130px',
      maxWidth: '130px',
      sortable: row => row.name,
      cell: row => (
        <div className='d-flex'>
          <div className='user-info text-truncate ms-1'>
            <span className='d-block fw-bold text-truncate'>{row.TransactionNumber}</span>
          </div>
        </div>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تعداد گراف‌ها</p>,
      minWidth: '130px',
      maxWidth: '130px',
      sortable: row => row.name,
      cell: row => (
        <div className='d-flex'>
          <div className='user-info text-truncate ms-1'>
            <span className='d-block fw-bold text-truncate'>{row.GraphNumber}</span>
          </div>
        </div>
      )
    },

    {
        name: 'آخرین تغییرات',
        sortable: true,
        minWidth: '150px',
        maxWidth: '150px',
        selector: row => row.age,
        cell: row => (
          <div className='d-flex'>
            <div className='user-info text-truncate ms-1' style={{textAlign:'left'}}>
              <span className='d-block fw-bold text-truncate'>{row.LastChangeDate}</span>
              <span className='d-block fw-bold text-truncate'>{row.LastChangeTime}</span>
            </div>
          </div>
        )
      },

    {
      name: 'وضعیت',
      minWidth: '120px',
      maxWidth: '120px',
      sortable: row => row.Status.title,
      cell: row => {
        return (
                row.Status === "done" ?
                    <span style={{fontSize:"12px", background:"rgb(255, 176, 176)", color:"red", padding:"2px 6px", borderRadius:"10px"}}>بسته</span>
                :
                    row.Status === "ongoing" ?
                        <span style={{fontSize:"12px", background:"rgb(176, 204, 255)", color:"blue", padding:"2px 6px", borderRadius:"10px"}}>در حال بررسی</span>
                    :
                        row.Status === "open" ?
                            <span style={{fontSize:"12px", background:"rgb(191, 255, 176)", color:"green", padding:"2px 16px", borderRadius:"10px"}}>باز</span>
                        :
                            <span style={{fontSize:"12px", background:"rgb(191, 255, 176)", color:"green", padding:"2px 6px", borderRadius:"10px"}}>نمیدونم</span>
        )
      }
    },
    {
        name: 'عملیات',
        sortable: true,
        minWidth: '120px',
        maxWidth: '120px',
        cell: row => (
          <Trash2 style={{cursor:'pointer'}} onClick={ () => { SetDeleteBox(true) } }/>
        )
      }
  ]

  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    const status = {
      1: { title: 'Current', color: 'light-primary' },
      2: { title: 'Professional', color: 'light-success' },
      3: { title: 'Rejected', color: 'light-danger' },
      4: { title: 'Resigned', color: 'light-warning' },
      5: { title: 'Applied', color: 'light-info' }
    }

    if (value.length) {
      updatedData = data.filter(item => {
        const startsWith =
          item.full_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.post.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase()) ||
          item.age.toLowerCase().startsWith(value.toLowerCase()) ||
          item.salary.toLowerCase().startsWith(value.toLowerCase()) ||
          item.start_date.toLowerCase().startsWith(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.full_name.toLowerCase().includes(value.toLowerCase()) ||
          item.post.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()) ||
          item.age.toLowerCase().includes(value.toLowerCase()) ||
          item.salary.toLowerCase().includes(value.toLowerCase()) ||
          item.start_date.toLowerCase().includes(value.toLowerCase()) ||
          status[item.status].title.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <Fragment>
      <Card 
        style={{
          textAlign: 'center', 
          maxWidth: '1280px', 
          marginLeft: 'auto', 
          marginRight: 'auto'
        }}
      >
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>لیست پرونده ها</CardTitle>
          <button style={{background:MainSiteOrange, color:"white", border:"none", padding:"8px 16px", borderRadius:"8px"}} className='ms-2' color='primary' onClick={handleModal}>
            <span className='align-middle ms-50'>افزودن مورد جدید</span>
            <Plus size={15}/>
          </button>
        </CardHeader>

        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            selectableRows
            columns={columns}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            selectableRowsComponent={BootstrapCheckbox}
            data={searchValue.length ? filteredData : data}
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
          <h6>آیا از حذف پرونده مورد نظر اطمینان دارید؟</h6>
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

export default MainFolderTable
