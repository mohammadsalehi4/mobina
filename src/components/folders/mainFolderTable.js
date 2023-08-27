/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef } from 'react'
import { digitsEnToFa } from 'persian-tools'
import AddNewModal from './AddNewModal'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, MoreVertical } from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle, Badge,
  UncontrolledDropdown
} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../public/colors'

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
    Changes:"+9.27839201",
    mode:"green",
    risk:"80",
    MadeWith:"م‌ص",
    notifs:"متعادل",
    LastChangeDate:"1402/02/03",
    LastChangeTime:"13:29",
    Status:"open"
  },
  {
    name:"پرونده آریان کوین",
    currency:"ETH",
    Amount:"980.11231",
    Changes:"-122.39201",
    mode:"red",
    risk:"30",
    MadeWith:"س‌ق",
    notifs:"متعادل",
    LastChangeDate:"1400/12/04",
    LastChangeTime:"19:34",
    Status:"done"
  },
  {
    name:"پرونده خیلی مهم",
    currency:"BNB",
    Amount:"18,567.2619",
    Changes:"+1,200.3602",
    mode:"green",
    risk:"50",
    MadeWith:"ک‌ت",
    notifs:"متعادل",
    LastChangeDate:"1402/02/03",
    LastChangeTime:"13:29",
    Status:"done"
  }
]

const status = {
    1: { title: 'Current', color: 'light-primary' },
    2: { title: 'Professional', color: 'light-success' },
    3: { title: 'Rejected', color: 'light-danger' },
    4: { title: 'Resigned', color: 'light-warning' },
    5: { title: 'Applied', color: 'light-info' }
  }
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
      minWidth: '170px',
      maxWidth: '170px',
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
        name: <p style={{marginTop:"15px", margin:"0px"}}>نوع ارز</p>,
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
      name: <p style={{marginTop:"15px", margin:"0px"}}>دارایی</p>,
      sortable: true,
      minWidth: '200px',
      maxWidth: '200px',
      selector: row => row.Amount,
      cell: row => (
        <p style={{marginTop:"15px", margin:"0px", direction:"ltr"}}>
            {digitsEnToFa(row.Amount)} <small>{row.currency}</small>
        </p>
      )
    },
  
    {
        name: <p style={{marginTop:"15px", margin:"0px"}}>تغییرات ({digitsEnToFa(24)} ساعت)</p>,
        sortable: true,
        minWidth: '200px',
        maxWidth: '200px',
        selector: row => row.Changes,
        cell: row => (
          <p style={{marginTop:"15px", margin:"0px", direction:"ltr", color:row.mode}}>
              {digitsEnToFa(row.Changes)} <small>{row.currency}</small>
          </p>
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
        name: 'ساخته شده توسط',
        sortable: true,
        minWidth: '150px',
        maxWidth: '150px',
        selector: row => row.age,
        cell: row => (
          <p style={{marginTop:"15px", margin:"0px", direction:"ltr", background:MainSiteyellow, color:"white", borderRadius:"50%", padding:"5px", marginRight:"30px"}}>
              {row.MadeWith}
          </p>
        )
      },
      {
        name: 'اعلامیه',
        sortable: true,
        minWidth: '100px',
        maxWidth: '100px',
        selector: row => row.age,
        cell: row => (
            <p style={{marginTop:"15px", margin:"0px", direction:"ltr"}}>
                {row.notifs}
            </p>
        )
      },
      {
        name: <p style={{marginTop:"15px", margin:"0px"}}>آخرین تغییر</p>,
        minWidth: '120px',
        maxWidth: '120px',
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
      name: 'وضعیت',
      minWidth: '180px',
      maxWidth: '180px',
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
        sortable: true,
        minWidth: '40px',
        maxWidth: '40px',
        cell: row => (
          <UncontrolledDropdown style={{direction:"ltr"}}>
            <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' style={{border:"none", marginRight:"-40px"}}>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href='/'>
                <span className='align-middle'>باز</span>
              </DropdownItem>
              <DropdownItem href='/'>
                <span className='align-middle'>بسته</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
      }
  ]

const MainFolderTable = () => {
  const [modal, setModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const handleModal = () => setModal(!modal)

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
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>لیست پرونده ها</CardTitle>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-start mt-1' md='6' sm='12'>
            <Input
              className='dataTable-filter mb-50'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              placeholder='جست و جو...'
              onChange={handleFilter}
            />
          </Col>
          <Col className='d-flex align-items-center justify-content-end mt-2 mb-2' md='6' sm='12'>
            <div className='d-flex mt-md-0 mt-1'>
              <button style={{background:MainSiteOrange, color:"white", border:"none", padding:"8px 16px", borderRadius:"8px"}} className='ms-2' color='primary' onClick={handleModal}>
                <span className='align-middle ms-50'>افزودن مورد جدید</span>
                <Plus size={15}/>
              </button>
              <button style={{ color:"white", background:MainSiteyellow, border:"none", padding:"8px 16px", borderRadius:"8px"}} color='secondary'  outline  onClick={() => downloadCSV(data)}>
                <span className='align-middle ms-50'>دریافت</span>
                <Share size={15}/>
              </button>
            </div>
          </Col>
        </Row>
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
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  )
}

export default MainFolderTable
