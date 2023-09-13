/* eslint-disable no-unused-vars */
// ** Table Columns
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'

const basicColumns = [
    {
        name: 'آی‌دی',
        sortable: true,
        maxWidth: '100px',
        selector: row => row.id
    },
    {
        name: 'نام کاربری',
        sortable: true,
        minWidth: '225px',
        selector: row => row.username
    },
    {
        name: 'ایمیل',
        sortable: true,
        minWidth: '310px',
        selector: row => row.email
    },
    {
        name: 'شماره تلفن',
        sortable: true,
        minWidth: '250px',
        selector: row => row.phone_number
    }
]


// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

const DataTablesBasic = () => {
    const [users, setUsers] = useState([])
    const [Loading, SetLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const getUsers = []
        SetLoading(true)
        dispatch({type:"LOADINGEFFECT", value:true})
        axios.get(`${serverAddress}/accounts/users`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            dispatch({type:"LOADINGEFFECT", value:false})
            SetLoading(false)
            if (response.data.length > 0) {
                setUsers(response.data)
            }
        })
        .catch((err) => {
            dispatch({type:"LOADINGEFFECT", value:false})
            try {
              if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
              }
            } catch (error) {}
            SetLoading(false)
        })
      }, [])

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
        pageCount={Math.ceil(users.length / 10) || 1}
        onPageChange={page => handlePagination(page)}
        containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-3'
      />
    )

  return (
    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader>
        <CardTitle tag='h6'>لیست کاربران</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          data={users}
          columns={basicColumns}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          pagination
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>

    </Card>
  )
}

export default DataTablesBasic

