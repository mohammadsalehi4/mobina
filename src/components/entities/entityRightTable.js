/* eslint-disable no-duplicate-imports */
import { Box, ShoppingCart, DollarSign, Slash } from 'react-feather'
// ** Table Columns
const data = [
    {
        name:"آریان کوین",
        type:{
            risk:20,
            icon:<Box  width={20} height={16}/>,
            color:"green"
        }
    },
    {
        name:"سبد آریان کوین",
        type:{
            risk:16,
            icon:<ShoppingCart  width={20} height={16}/>,
            color:"green"
        }
    },
    {
        name:"ارز آریان کوین",
        type:{
            risk:60,
            icon:<DollarSign  width={20} height={16}/>,

            color:"red"
        }
    },
    {
        name:"تحریم شده ها",
        type:{
            risk:100,
            icon:<Slash  width={20} height={16}/>,
            color:"red"
        }
    }
  ]
  export const basicColumns = [
    {
      name: <p style={{marginTop:"15px"}}>نام موجودیت</p>,
      sortable: true,
      maxWidth: '300px',
      selector: row => row.name
    },
    {
      name: <p style={{marginTop:"15px"}}>نوع</p>,
      sortable: true,
      maxWidth: '30px',
      selector: row => row.type.risk,
      cell: row => {
        return (
          <div >
            <p style={{ marginBottom:"0px", borderColor:row.type.color, borderWidth:"2px", borderStyle:"solid", borderRadius:"50%", padding:"2px 4px", fontSize:"10px"}}>{row.type.icon}</p>
          </div>
        )
      }
    }
  ]
  // ** Third Party Components
  import { ChevronDown } from 'react-feather'
  import DataTable from 'react-data-table-component'
  
  // ** Reactstrap Imports
  import { Card, CardHeader, CardTitle } from 'reactstrap'
  
  
  const EntityTable = () => {
    return (
      <Card className='overflow-hidden' style={{boxShadow:"none"}}>
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
  
  export default EntityTable
  