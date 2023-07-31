/* eslint-disable no-duplicate-imports */
import { Box, ShoppingCart, DollarSign, Slash } from 'react-feather'
// ** Table Columns
const data = [
    {
        name:"aryancoin.com",
        text:"سایت اصلی"
    }
  ]
  export const basicColumns = [
    {
      name: 'آدرس وبسایت',
      sortable: true,
      maxWidth: '300px',
      selector: row => row.name,
      cell: row => {
        return (
          <a href={`https://${row.name}`}>{row.name}</a>
        )
      }
    },
    {
      name: 'عنوان',
      sortable: true,
      minWidth: '200px',
      selector: row => row.text
    }
  ]
  // ** Third Party Components
  import { ChevronDown } from 'react-feather'
  import DataTable from 'react-data-table-component'
  
  // ** Reactstrap Imports
  import { Card } from 'reactstrap'
  
  
  const EntityList = () => {
    return (
      <Card className='overflow-hidden' style={{boxShadow:"none", borderWidth:"1px", borderStyle:"solid", borderColor:"rgb(240,240,240)", boxSizing:"border-box"}}>
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
  
  export default EntityList
  