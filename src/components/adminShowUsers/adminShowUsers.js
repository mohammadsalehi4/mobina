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
        maxWidth: '90px',
        minWidth: '90px',
        selector: row => row.id
    },
    {
        name: 'نام کاربری',
        sortable: true,
        maxWidth: '220px',
        minWidth: '220px',
        selector: row => row.username
    },
    {
        name: 'ایمیل',
        sortable: true,
        minWidth: '270px',
        maxWidth: '270px',
        selector: row => row.email
    },
    {
        name: 'شماره تلفن',
        sortable: true,
        minWidth: '160px',
        maxWidth: '160px',
        selector: row => row.phone_number
    },
    {
      name: 'نقش',
      minWidth: '180px',
      maxWidth: '180px',
      selector: row => (
        row.role
      )
    }
]


// ** Third Party Components
import { ChevronDown, MoreVertical, Edit, Trash } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle} from 'reactstrap'

const DataTablesBasic = () => {
    const [users, setUsers] = useState([])
    const [Rolls, SetRolls] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        let getUsers = []
        dispatch({type:"LOADINGEFFECT2", value:true})
        axios.get(`${serverAddress}/accounts/users`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            if (response.data.length > 0) {
                getUsers = response.data
                axios.get(`${serverAddress}/accounts/role/`, 
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                  }
                })
                .then((resp2) => {
                    if (resp2.data.length > 0) {
                        SetRolls(resp2.data)
                        for (let i = 0; i < getUsers.length; i++) {
                          for (let j = 0; j < resp2.data.length; j++) {
                            if (String(getUsers[i].role) === String(resp2.data[j].id)) {
                              getUsers[i].role = resp2.data[j].name
                            }
                          }
                        }
                        setUsers(getUsers)
                    }
                    dispatch({type:"LOADINGEFFECT2", value:false})
                })
                .catch((err) => {
                    dispatch({type:"LOADINGEFFECT2", value:false})
                    try {
                      if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
                        Cookies.set('refresh', '')
                        Cookies.set('access', '')
                        window.location.assign('/')
                      }
                    } catch (error) {}
                })
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

