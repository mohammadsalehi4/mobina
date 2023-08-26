// ** Table Columns
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
        selector: row => row.full_name
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
        selector: row => row.PhoneNumber
    }
]

const data = [
    {
        id:1,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:2,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:3,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:4,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:5,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:6,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:7,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:8,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:9,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:10,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:11,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:12,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:13,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:14,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:15,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:16,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:17,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:18,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:19,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:20,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:2222,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:21,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:22,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:23,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:24,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:25,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:26,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:27,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:28,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    },
    {
        id:29,
        full_name:"mohammad",
        email:"mohammad@gmail.com",
        PhoneNumber:"09166366715"
    }
]

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

const DataTablesBasic = () => {
  return (
    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader>
        <CardTitle tag='h6'>لیست کاربران</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          pagination
          data={data}
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

