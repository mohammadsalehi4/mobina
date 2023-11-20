/* eslint-disable no-unused-vars */
/* eslint-disable no-duplicate-imports */
import React, {useState, useEffect} from 'react'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle } from 'reactstrap'
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import ReactPaginate from 'react-paginate'

const CountedTaxTable = () => {
    const [open, setOpen] = useState('')
    const [currentPage, setCurrentPage] = useState(0)

    const data = [
        {
            hash:'ssssssss'
        },
        {
            hash:'ssssssss'
        },
        {
            hash:'ssssssss'
        },       
        {
            hash:'ssssssss'
        },       
        {
            hash:'ssssssss'
        },       
        {
            hash:'ssssssss'
        },       
        {
            hash:'ssssssss'
        },       
        {
            hash:'ssssssss'
        },       
        {
            hash:'ssssssss'
        },       
        {
            hash:'ssssssss'
        }
    ]
    const basicColumns = [
        {
          name: 'تراکنش',
          sortable: true,
          maxWidth: '250px',
          minWidth: '250px',
          cell: row => row.hash
        },
        {
            name: 'تاریخ',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            cell: row => row.hash
          },
          {
            name: 'حجم مبادله',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            cell: row => row.hash
          },
          {
            name: 'ارزش (دلار)',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            cell: row => row.hash
          },
          {
            name: 'ارزش (ریال)',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            cell: row => row.hash
          }
    ]

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
  return (
    <div  style={{borderRadius:'8px', marginTop:'80px', borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}} id='CountedTaxTable'>
      <h6 style={{margin:'24px 32px'}}>تراکنش های محاسبه شده</h6>
      <DataTable
        noHeader
        pagination
        paginationPerPage={5}
        data={data}
        columns={basicColumns}
        className='react-dataTable mt-3'
        sortIcon={<ChevronDown size={10} />}
        paginationComponent={CustomPagination}
        paginationDefaultPage={currentPage + 1}
      />
    </div>

  )
}

export default CountedTaxTable
