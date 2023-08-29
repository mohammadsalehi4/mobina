/* eslint-disable no-unused-vars */
// ** Table Columns
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'

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

    useEffect(() => {
        const getUsers = []
        SetLoading(true)
        axios.get(`${serverAddress}/accounts/users`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            SetLoading(false)
            if (response.data.length > 0) {
                setUsers(response.data)
            }
        })
        .catch((err) => {
            SetLoading(false)
            console.log(err)
        })
      }, [])

  return (
    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader>
        <CardTitle tag='h6'>لیست کاربران</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          pagination
          data={users}
          columns={basicColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>

    </Card>
  )
}

export default DataTablesBasic

