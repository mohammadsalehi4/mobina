// ** Table Columns
const data = [
  {
    
  }
]
export const basicColumns = [
  {
    name: ' ',
    sortable: true,
    maxWidth: '10px',
    cell: () => {
      return (
        <div>
          <input type='checkbox'></input>
        </div>
      )
    }
  },
  {
    name: 'تاریخ',
    sortable: true,
    maxWidth: '30px',
    cell: row => {
      return (
        <div>
          <p>{row.date}</p>
        </div>
      )
    }
  },
  {
    name: 'آدرس',
    sortable: true,
    maxWidth: '30px',
    selector: row => row.email
  },
  {
    name: 'حجم',
    sortable: true,
    maxWidth: '30px',
    selector: row => row.post
  }
]
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'


const DataTablesBasic = () => {
  return (
    <Card className='overflow-hidden'>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          data={data}
          columns={basicColumns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default DataTablesBasic
