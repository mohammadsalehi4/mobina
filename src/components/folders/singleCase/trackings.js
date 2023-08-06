/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef } from 'react'
import { digitsEnToFa } from 'persian-tools'
import DataTable from 'react-data-table-component'
import NiceAddress2 from '../../niceAddress2/niceAddress'
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
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../../public/colors'

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const data = [
  {
    Address:"ردیابی پول",
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
    Address:"تحقیق اول",
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
  }
]

const columns = [
    {
      minWidth: '70px',
      maxWidth: '70px',
      selector: row => <ion-icon style={{background:"rgb(230,230,230)", padding:"8px", borderRadius:"4px", cursor:"pointer", fontSize:"18px", marginTop:"6px"}} name="analytics-outline"></ion-icon>

    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>نام</p>,
      minWidth: '110px',
      maxWidth: '110px',
      selector: row => row.Address
    },
    {
      name: 'ارز',
      sortable: true,
      minWidth: '60px',
      maxWidth: '60px',
      selector: row => row.currency
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>نوع</p>,
      sortable: true,
      minWidth: '70px',
      maxWidth: '70px',
      selector: row => "آدرس"

    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>آیتم ها</p>,
      sortable: true,
      minWidth: '80px',
      maxWidth: '80px',
      selector: row => digitsEnToFa(2)
    },
    {
        name: <p style={{marginTop:"15px", margin:"0px"}}>زمان ایجاد</p>,
        sortable: true,
        minWidth: '100px',
        maxWidth: '100px',
        selector: row => row.Changes,
        cell: row => (
          <div>
          <p style={{marginTop:"15px", margin:"0px", direction:"ltr"}}>
              {digitsEnToFa(row.LastChangeDate)} 
          </p>
          <p style={{marginTop:"15px", margin:"0px", direction:"ltr"}}>
              {digitsEnToFa(row.LastChangeTime)} 
          </p>
          </div>
        )
    },
      {
        name: 'ایجاد شده توسط',
        sortable: true,
        minWidth: '140px',
        maxWidth: '140px',
        selector: row => row.age,
        cell: row => (
          <p style={{marginTop:"15px", margin:"0px", direction:"ltr", background:MainSiteyellow, color:"white", borderRadius:"50%", padding:"5px", marginRight:"20px"}}>
              {row.MadeWith}
          </p>
        )
      },
    {
        sortable: true,
        minWidth: '20px',
        maxWidth: '20px',
        cell: row => (
            <UncontrolledDropdown>
            <DropdownToggle className='pe-1' tag='span' style={{cursor:"pointer"}}>
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end style={{zIndex:12}}>
              <DropdownItem tag='a' href='/' className='w-100'>
                <span className='align-middle ms-50'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100'>
                <span className='align-middle ms-50'>Archive</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100'>
                <span className='align-middle ms-50'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
      }
]

const Trackings = () => {
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
      <Card style={{minHeight:"100%", borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>پی‌گردی ها</CardTitle>
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
              <button style={{background:MainSiteOrange, color:"white", border:"none", padding:"8px 16px", borderRadius:"8px"}} color='primary' onClick={handleModal}>
                <span className='align-middle ms-50'>افزودن مورد جدید</span>
                <Plus size={15} />
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
            direction='ltr'
            sortIcon={<ChevronDown size={10} />}
            selectableRowsComponent={BootstrapCheckbox}
            data={searchValue.length ? filteredData : data}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default Trackings

