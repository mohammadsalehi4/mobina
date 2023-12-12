/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, Trash2 } from 'react-feather'
import NiceAddress2 from '../niceAddress2/niceAddress'
import './style.css'
import {Row, Col} from 'reactstrap'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../address'
import LocalLoading from '../localLoading/localLoading'
const AddressList = (props) => {

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

  const [Data, SetData] = useState([])
  const [Loading, SetLoading] = useState(false)

  useEffect(() => {
    if (true) {
      SetLoading(true)
      const id = props.data.uuid
      axios.get(`${serverAddress}/entity/addresses/${id}/`, 
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
      SetLoading(false)

          if (response.status === 200) {
            const getData = []
            for (let i = 0; i < response.data.addresses.length; i++) {
              getData.push(
                {
                  address:response.data.addresses[i].address,
                  network:response.data.addresses[i].network
                }
              )
            }
            SetData(getData)
          }
      })
      .catch((err) => {
          setLoading(false)
          console.log(err)
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
    }
  }, [props.data])

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
          {
            Loading ? 
            <LocalLoading/>
            : Data.length === 0 ? 
            <p style={{textAlign:'center'}}>
              بدون آدرس
            </p>
            :
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
          }

        </Col>
      </Row>
    </div>
  )
}

export default AddressList
