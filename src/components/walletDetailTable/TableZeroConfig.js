import NiceAddress2 from '../niceAddress2/niceAddress'
const data = [
  {
    date:"2023/12/03",
    year:"2023",
    month:"12",
    day:"03",
    hour:"13",
    minute:"23",
    time:"13:23",
    address:"dsyafdsjgfuasdguysdjgfskdjgfjsdjksdgfjaksdgfa",
    amount:2.90038,
    mode:"in"

  },
  {
    date:"2021/08/13",
    year:"2021",
    month:"08",
    day:"13",
    hour:"16",
    minute:"36",
    time:"16:36",
    address:"dsyafdsjgfuasdguysdjgfskdjgfjsdjksdgfjaksdgfa",
    amount:1.41,
    mode:"out"

  }

]
export const basicColumns = [
  {
    name: 'تاریخ',
    sortable: true,
    maxWidth: '130px',
    selector: row => Number(row.year + row.month + row.day + row.hour + row.minute),
    cell: row => {
      return (
        <div>
          <small>{`${row.year  }/${  row.month  }/${  row.day}` }</small><br/>
          <small>{`${row.hour  }:${  row.day  }`}</small>
        </div>
      )
    }
  },
  {
    name: 'حجم',
    sortable: true,
    maxWidth: '40px',
    selector: row => row.amount,
    cell: row => {
      if (row.mode === "out") {
        return (
          <p style={{color:"red", marginTop:"15px"}}>{row.amount}</p>
        )
      }
      if (row.mode === "in") {
        return (
          <p style={{color:"green", marginTop:"15px"}}>{row.amount}</p>
        )
      }
    }
  },
  {
    name: 'تراکنش',
    sortable: false,
    maxWidth: '220px',
    cell: row => {
      return (
        <div>
          <NiceAddress2 text={row.address} number={8}/>
          <input type='checkbox' style={{marginRight:"10px", width:"15px", height:"15px"}}></input>
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
