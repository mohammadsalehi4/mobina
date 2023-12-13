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
import { ArrowRight, DownloadCloud, Edit2 } from 'react-feather'
import axios from 'axios'
import { Calendar, CalendarProvider } from "zaman"
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { MainSiteGreen } from '../../../public/colors'
import { WriteNumber } from '../../processors/PersianWriteNumber'
import { digitsEnToFa } from 'persian-tools'
const ShowLastTaxes = ({ stepper }) => {
    const [currentPage, setCurrentPage] = useState(0)

    const getLink = (id) => {
        const url = id
        window.open(url, '_blank') 
    }

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
            maxWidth: '200px',
            minWidth: '200px',
            cell: row => digitsEnToFa(row.date)
        },
        {
          name: 'تاریخ شروع',
          sortable: true,
          maxWidth: '200px',
          minWidth: '200px',
          cell: row => digitsEnToFa(row.startDate)
        },
        {
          name: 'تاریخ پایان',
          sortable: true,
          maxWidth: '200px',
          minWidth: '200px',
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
            name: 'دریافت جزئیات',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            cell: row => {
                return (
                    <a href={row.download_link} target="_blank" style={{cursor:'pointer', color:'inherit'}}>
                        <DownloadCloud />
                    </a>
                )
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
        axios.get(`${serverAddress}/taxing/operation/`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            if (response.status === 200) {
                const getData = []
                for (let i = 0; i < response.data.length; i++) {
                    getData.push({
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
    <Card className='m-0 TaxAllTables ' style={{boxShadow:'none', overflowX:'hidden'}} id='ShowLastTaxes'>
    <CardHeader style={{ margin:'0px', paddingBottom:'0px', paddingTop:'16px'}}>
      <h5>مالیات های محاسبه شده</h5>
      <button style={{background:MainSiteGreen, color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px", float:'right'}} className='btn-next' onClick={() => {
          stepper.next()
        }}>
        <Edit2 size={15} className='ms-1'/>    
        <span className='align-middle d-sm-inline-block d-none'>
            مالیات جدید
        </span>
      </button>
    </CardHeader>
    <CardBody style={{textAlign:'left', boxShadow:'none'}}>
        <Row>
          <Col className='mt-3' style={{textAlign:'right'}}>
            <div style={{}}>

            </div>
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
          </Col>
 
        </Row>
    </CardBody>
</Card>
  )
}

export default ShowLastTaxes
