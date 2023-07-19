import NiceAddress2 from '../niceAddress2/niceAddress'
const data = [
  {
    col1:"تراکنش",
    col2:5,
    col3:2
  },
  {
    col1:"دریافت شده",
    col2:0.193556,
    col3:0.001785
  },
  {
    col1:"ارسال شده",
    col2:0.125855,
    col3:0.09
  },
  {
    col1:"برآیند",
    col2:0.067701
  }

]
export const basicColumns = [
  {
    name: 'اطلاعات',
    sortable: false,
    maxWidth: '130px',
    selector: row => row.col1
    
  },
  {
    name: 'مجموع',
    sortable: false,
    maxWidth: '130px',
    selector: row => row.col2
    
  },
  {
    name: 'انتخاب شده',
    sortable: false,
    maxWidth: '130px',
    selector: row => row.col3
  }
]
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

const WalletDetailTopTable = () => {
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

export default WalletDetailTopTable
