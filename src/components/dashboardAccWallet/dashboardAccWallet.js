/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

import { Fragment, useState, forwardRef, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import NiceAddress from '../../components/niceAddress/niceAddress'
import { ChevronDown, Download } from 'react-feather'
import { digitsEnToFa } from 'persian-tools'
import moment from 'jalali-moment'
import ReactPaginate from 'react-paginate'
import {
  Card,
  Input,
  CardTitle,
  CardHeader
} from 'reactstrap'

import { MainSiteGray } from '../../../public/colors'
import { useSelector } from "react-redux"

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const DashboardAccWallet = (props) => {
  const States = useSelector(state => state)
  const [showData, SetShowData] = useState([])

  useEffect(() => {
    console.log(props.data)
  }, [props.data])

  const getMyTime=(index) => {
    
    const date = new Date(index*1000)
    let month
    let day
    let hour
    let minute

    if (String(Number(date.getMonth())+1).length === 1) {
      month = `0${date.getMonth() + 1}`
    } else {
      month = date.getMonth() + 1
    }

    if (String(date.getDate()).length === 1) {
      day = `0${date.getDate()}`
    } else {
      day = date.getDate()
    }

    if (String(date.getHours()).length === 1) {
      hour = `0${date.getHours()}`
    } else {
      hour = date.getHours()
    }

    if (String(date.getMinutes()).length === 1) {
      minute = `0${date.getMinutes()}`
    } else {
      minute = date.getMinutes()
    }

    return ({
      year:date.getFullYear(),
      month,
      day,
      hour,
      minute
    })
  }

  const columns = [
    {
      name: 'مبدا',
      minWidth: '250px',      
      maxWidth: '250px',
      selector: row => (
        <div className='d-flex align-items-end ' style={{cursor:"pointer"}}>
          <div className='user-info text-truncate'>
            <span className='d-block text-truncate ms-0' style={{}}
            onClick={() => { 
              document.getElementById('transactionValue').value = `${row.from}` 
              document.getElementById('MainSubmitBotton').click()
            }}>
              <NiceAddress  text={row.from} number={8}/>
            </span>
          </div>
        </div>
      )
    },
    {
      name: 'مقصد',
      minWidth: '250px',      
      maxWidth: '250px',
      selector: row => (
        <div className='d-flex align-items-end ' style={{cursor:"pointer"}}>
          <div className='user-info text-truncate'>
            <span className='d-block text-truncate ms-0' style={{}}
            onClick={() => { 
              document.getElementById('transactionValue').value = `${row.to}` 
              document.getElementById('MainSubmitBotton').click()
            }}>
              <NiceAddress  text={row.to} number={8}/>
            </span>
          </div>
        </div>
      )
    },
    {
      name: 'نوع ارز',
      minWidth: '170px',
      maxWidth: '170px',
      sortable: true,
      selector: row => row.currencyType,
      cell: row =>  {
        if (row.currencyType === 'USDT') {
          return (
            <div style={{direction:"ltr"}}>
              <img style={{width:"30px", marginTop:"-4px"}} src={`https://cryptologos.cc/logos/tether-usdt-logo.png?v=026`}/>
              <span className='ms-1'>{row.currencyType}</span>
            </div>
          )
        } else {
          return (
            <div style={{direction:"ltr"}}>
              <img style={{width:"30px", marginTop:"-4px"}} src={`../../images/${row.currencyType}.png`}/>
              <span className='ms-1'>{row.currencyType}</span>
            </div>
          )
        }
      }
    },
    {
      name: `حجم تراکنش`,
      sortable: true,
      minWidth: '220px',
      maxWidth: '220px',
      selector: row => (row.amount),
      cell: row => {
        return (
          <div style={{direction:"ltr"}}>
            <span className='ms-1'>
              {digitsEnToFa(`${String(parseFloat(Number(row.amount).toFixed(5)).toString())} `)}  
              <small>{row.currencyType}</small>
            </span>
          </div>
        )
      }
    }
  ]

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
      pageCount={Math.ceil(showData.length / 10) || 1}
      onPageChange={page => handlePagination(page)}
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-3'
    />
  )

  return (
    <Fragment>
      <Card style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom' id="mainTable">
          <CardTitle className='mb-2' tag='h3' id="CardTitle">
            <div className='row'>
              <div className='col-sm-6 mt-2'>
                جا‌به‌جایی ها
              </div>
            </div>
          </CardTitle>
        </CardHeader>

        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            columns={columns}
            paginationDefaultPage={currentPage + 1}
            paginationComponent={CustomPagination}
            pagination
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            selectableRowsComponent={BootstrapCheckbox}
            data={ props.data}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default DashboardAccWallet
