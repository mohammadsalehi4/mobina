/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Trash2 } from 'react-feather'
import NiceAddress2 from '../niceAddress2/niceAddress'
import './style.css'
import {Row, Col} from 'reactstrap'
const AddressList = () => {

  const basicColumns = [
    {
        name: 'آدرس',
        sortable: true,
        maxWidth: '300px',
        minWidth: '300px',
        selector: row => row.address,
        cell: row => {
          return (
            <NiceAddress2 text={row.address} number={6} />
          )
        }
    },
    {
        name: 'شبکه',
        sortable: true,
        maxWidth: '100px',
        minWidth: '100px',
        selector: row => row.network
    },
    {
        name: 'عملیات',
        sortable: true,
        minWidth: '100px',
        maxWidth: '100px',
        cell: row => {
          return (
            <Trash2 size={18} style={{cursor:'pointer'}} />
          )
        }
    }
  ]

  const [Data, SetData] = useState([
    {
      address:'aaaaaaaaaaaaaaabbbbbbbbbbbbbbbb',
      network:'btc'
    }
  ])

  //pagination
  const [currentPage, setCurrentPage] = useState(0)
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
      pageCount={Math.ceil(Data.length / 10) || 1}
      onPageChange={page => handlePagination(page)}
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-3'
    />
  )
  
  return (
    <div id='AddressList' className='container-fluid'>
      <Row>
        <Col>
          <h6>
            لیست آدرس ها
          </h6>
          <DataTable
            noHeader
            data={Data}
            columns={basicColumns}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            pagination
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
        </Col>
      </Row>
    </div>
  )
}

export default AddressList
