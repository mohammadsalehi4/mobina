import NiceAddress2 from '../niceAddress2/niceAddress'
import { digitsEnToFa } from 'persian-tools'

const data = [
  {
    col1:"تراکنش",
    col2:5,
    col3:2
  },
  {
    col1:"دریافت شده",
    col2:5420,
    col3:500
  },
  {
    col1:"ارسال شده",
    col2:3524,
    col3:2520
  },
  {
    col1:"برآیند",
    col2:1896
  }

]
export const basicColumns = [
  {
    name: 'اطلاعات (USD)',
    sortable: false,
    maxWidth: '130px',
    selector: row => (row.col1)
    
  },
  {
    name: 'مجموع',
    sortable: false,
    maxWidth: '130px',
    selector: row => digitsEnToFa(row.col2)
    
  },
  {
    name: 'انتخاب شده',
    sortable: false,
    maxWidth: '130px',
    selector: row => digitsEnToFa(row.col3)
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
