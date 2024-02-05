/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import './tax.css'
import { Card, CardHeader, Row, CardBody, Col } from 'reactstrap'
import { Input, Label, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { JalaliCalendar } from '../../processors/jalaliCalendar'
import { useState, useEffect } from 'react'
import { Edit, DownloadCloud, Edit2 } from 'react-feather'
import axios from 'axios'
import { Calendar, CalendarProvider } from "zaman"
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { MainSiteGreen } from '../../../public/colors'
import { WriteNumber } from '../../processors/PersianWriteNumber'
import { digitsEnToFa } from 'persian-tools'
import { useDispatch } from 'react-redux'
import LocalLoading from '../../components/localLoading/localLoading'
const ShowLastTaxes = ({ stepper }) => {
    const [currentPage, setCurrentPage] = useState(0)
    const [Loading, setLoading] = useState(0)
    const dispatch = useDispatch()

  useEffect(() => {
    try {
        const access = Cookies.get('access')
        const decoded = jwt.decode(access)
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime || !decoded || decoded === '') {
            window.location.assign('/')
        } else {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
        }
    } catch {
    }
  }, [])

  useEffect(() => {
      dispatch({type:"SHOWNAVBAR"})
      dispatch({type:"SETWITCHPAGE", value:4})
  }, [])

    const basicColumns = [
        {
            name: 'نام کسب و کار',
            sortable: true,
            maxWidth: '200px',
            minWidth: '200px',
            cell: row => row.name
        },
        {
            name: 'تاریخ محاسبه',
            sortable: true,
            maxWidth: '130px',
            minWidth: '130px',
            cell: row => digitsEnToFa(row.date)
        },
        {
          name: 'تاریخ شروع',
          sortable: true,
          maxWidth: '120px',
          minWidth: '120px',
          cell: row => digitsEnToFa(row.startDate)
        },
        {
          name: 'تاریخ پایان',
          sortable: true,
          maxWidth: '120px',
          minWidth: '120px',
          cell: row => digitsEnToFa(row.endDate)
        },
        {
            name: 'مبلغ مالیات',
            sortable: true,
            maxWidth: '200px',
            minWidth: '200px',
            cell: row => WriteNumber(row.amount)
        },
        {
          name: 'وضعیت',
          sortable: true,
          maxWidth: '140px',
          minWidth: '140px',
          cell: row => {
            if (row.state === 'Done' || row.state === 'dont_have_tax') {
              return (
                <span style={{fontSize:"12px", background:"rgb(191, 255, 176)", color:"green", padding:"2px 6px", borderRadius:"10px"}}>محاسبه شده</span>
              )
            } else if (row.state === 'Ready_for_forgiveness') {
              return (
                <span style={{fontSize:"12px", background:"rgb(154, 196, 255)", color:"blue", padding:"2px 6px", borderRadius:"10px"}}>محاسبه بخشش</span>
              )
            } else if (row.state === 'in_progress') {
              return (
                <span style={{fontSize:"12px", background:"rgb(241, 239, 120)", color:"yellow", padding:"2px 6px", borderRadius:"10px"}}>درحال محاسبه</span>
              )
            }
          }
        },
        {
            name: 'عملیات',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            cell: row => {
              if (row.state !== 'Ready_for_forgiveness' && row.state !== 'in_progress') {
                return (
                  <a href={row.download_link} target="_blank" style={{cursor:'pointer', color:'inherit'}}>
                    <DownloadCloud />
                  </a>
                )
              } else {
                return (
                  <a href={`/tax/management/${row.id}/${row.state}`} target="_blank" style={{cursor:'pointer', color:'inherit'}}>
                    <Edit />
                  </a>
                )
              }

            }
        }
    ]
    const [data, SetData] = useState([])
    const handlePagination = page => {
        setCurrentPage(page.selected)
      }
      const CustomPagination = () => (
        <ReactPaginate
          nextLabel=''
          breakLabel='...'
          previousLabel=''
          pageRangeDisplayed={2}
          forcePage={(currentPage)}
          marginPagesDisplayed={2}
          activeClassName='active'
          pageClassName='page-item'
          breakClassName='page-item'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          breakLinkClassName='page-link'
          previousLinkClassName='page-link'
          nextClassName='page-item next-item'
          previousClassName='page-item prev-item'
          pageCount={Math.ceil(data.length / 5) || 1}
          onPageChange={page => handlePagination(page)}
          containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-3'
        />
      )
        
      //get data
      useEffect(() => {
        setLoading(true)
        axios.get(`${serverAddress}/taxing/operation/`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
          setLoading(false)
            if (response.status === 200) {
                const getData = []
                console.log(response.data)
                for (let i = 0; i < response.data.length; i++) {
                  
                    getData.push({
                        state:response.data[i].state,
                        name:response.data[i].bussiness,
                        date:`${JalaliCalendar(response.data[i].created_date).year}/${JalaliCalendar(response.data[i].created_date).month}/${JalaliCalendar(response.data[i].created_date).day}`,
                        startDate:`${JalaliCalendar(response.data[i].start_date_of_calculations).year}/${JalaliCalendar(response.data[i].start_date_of_calculations).month}/${JalaliCalendar(response.data[i].start_date_of_calculations).day}`,
                        endDate:`${JalaliCalendar(response.data[i].end_date_of_calculations).year}/${JalaliCalendar(response.data[i].end_date_of_calculations).month}/${JalaliCalendar(response.data[i].end_date_of_calculations).day}`,
                        amount:Number(response.data[i].final_tax),
                        id:response.data[i].id,
                        download_link:response.data[i].download_link
                    })
                }
                
                SetData(getData)
            }
        })
        .catch((err) => {
          setLoading(false)
          if (err.response.status === 403) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
          if (err.response.status === 401) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
        })
      }, [])
      
  return (
    <div className='container-fluid mt-4'>
      <Row>
        <Col xl={{size:1}} lg={{size:1}} md={{size:0}}>
        </Col>
        <Col xl={{size:10}} lg={{size:10}} md={{size:12}} style={{textAlign:'center', padding:'0px', background:'none', boxShadow:'none', overflow:'revert-layer', maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto'}}>
          <Card className='m-0 TaxAllTables ' style={{boxShadow:'none', overflowX:'hidden'}} id='ShowLastTaxes'>
            <CardHeader style={{ margin:'0px', paddingBottom:'0px', paddingTop:'16px'}}>
              <h5>مالیات های محاسبه شده</h5>
              <a href='/tax/management'>
                <button style={{background:MainSiteGreen, color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px", float:'right'}} className='btn-next'>
                  <Edit2 size={15} className='ms-1'/>    
                  <span className='align-middle d-sm-inline-block d-none'>
                      مالیات جدید
                  </span>
                </button>
              </a>

            </CardHeader>
            <CardBody style={{textAlign:'left', boxShadow:'none'}}>
                <Row>
                  <Col className='mt-3' style={{textAlign:'right'}}>
                    <div style={{}}>

                    </div>
                    {
                      Loading ? 
                      <LocalLoading/>
                      :
                      data.length === 0 ? 
                      <p style={{textAlign:'center'}}>
                        بدون مالیات محاسبه شده
                      </p>
                      :
                      <DataTable
                          
                        noHeader
                        pagination
                        paginationPerPage={5}
                        data={data}
                        columns={basicColumns}
                        className='react-dataTable mt-3 TaxDataTable'
                        sortIcon={<ChevronDown size={10} />}
                        paginationComponent={CustomPagination}
                        paginationDefaultPage={currentPage + 1}
                    />
                    }

                  </Col>
        
                </Row>
            </CardBody>
          </Card>
        </Col>
        <Col xl={{size:1}} lg={{size:1}} md={{size:0}}>
        </Col>
      </Row>
    </div>
    
  )
}

export default ShowLastTaxes
