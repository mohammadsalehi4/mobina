// ** React Imports
import { useState } from 'react'

// ** Table columns & Expandable Data
const [data, SetData] = useState([])

const ExpandableTable = () => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='fw-bold'>City:</span> 
      </p>
      <p>
        <span className='fw-bold'>Experience:</span> 
      </p>
      <p className='m-0'>
        <span className='fw-bold'>Post:</span> 
      </p>
    </div>
  )
}

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

const columns = [
  {
    name: 'Email',
    sortable: true,
    minWidth: '250px',
    selector: row => row.email
  }
]

const DataTableWithButtons = () => {

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Expandable Row</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          selectableRows
          data={data}
          expandableRows
          columns={columns}
          expandOnRowClicked
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          expandableRowsComponent={ExpandableTable}
        />
      </div>
    </Card>
  )
}

export default DataTableWithButtons
