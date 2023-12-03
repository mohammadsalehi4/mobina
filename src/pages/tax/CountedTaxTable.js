/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-duplicate-imports */
import React, {useState, useEffect} from 'react'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle } from 'reactstrap'
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import { digitsEnToFa } from 'persian-tools'
import { WriteNumber } from '../../processors/PersianWriteNumber'

const CountedTaxTable = (props) => {
    const [open, setOpen] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [data, setdata] = useState([])

    useEffect(() => { 
      if (props.data) {
        const getData = []
        console.log(props.data)
        for (let i = 0; i < props.data.transactions.length; i++) {
          getData.push(
            {
              date:props.data.transactions[i].date,
              hash:props.data.transactions[i].hash,
              amount:props.data.transactions[i].volume,
              usd:props.data.transactions[i].dollar_price,
              irr:props.data.transactions[i].rial_price
            }
          )
        }
        setdata(getData)
      }
    }, [props.data])

    const basicColumns = [
        {
          name: 'تراکنش',
          maxWidth: '250px',
          minWidth: '250px',
          cell: row => {
            return (
              <NiceAddress2 text={row.hash} number={6}/>
            )
          }

        },
        {
            name: 'تاریخ',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            selector: row => row.date,
            cell: row => digitsEnToFa(row.date)
          },
          {
            name: 'حجم مبادله',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            selector: row => row.amount,
            cell: row => WriteNumber(row.amount)
          },
          {
            name: 'ارزش (دلار)',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            selector: row => row.usd,
            cell: row => WriteNumber(row.usd)
          },
          {
            name: 'ارزش (ریال)',
            sortable: true,
            maxWidth: '150px',
            minWidth: '150px',
            selector: row => row.irr,
            cell: row => WriteNumber(row.irr)
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
      {
        data.length > 0 ?
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
      :
        <p style={{textAlign:'center'}}>بدون اطلاعات</p>
      }

    </div>

  )
}

export default CountedTaxTable
