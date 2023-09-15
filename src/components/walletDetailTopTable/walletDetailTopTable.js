import NiceAddress2 from '../niceAddress2/niceAddress'
import { digitsEnToFa } from 'persian-tools'


// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'
import { useEffect, useState } from 'react'
const WalletDetailTopTable = (props) => {
  const [inCome, SetInCome] = useState(0)
  const [OutCome, SetOutCome] = useState(0)
  useEffect(() => {
    let a = 0
    for (let i = 0; i < props.data.in.length; i++) {
      a = a + (props.data.in[i].amount)
    }
    let b = 0
    for (let i = 0; i < props.data.out.length; i++) {
      b = b + (props.data.out[i].amount)
    }
    SetInCome(a)
    SetOutCome(b)
  }, [, props.data])

  const data = [
    {
      col1:"تراکنش",
      col2:props.data.in.length + props.data.out.length,
      col3:props.data.in.length + props.data.out.length
    },
    {
      col1:"دریافت شده",
      col2:String(inCome),
      col3:String(inCome)
    },
    {
      col1:"ارسال شده",
      col2:String(OutCome),
      col3:String(OutCome)
    },
    {
      col1:"برآیند",
      col2:String(inCome - OutCome)
    }
  
  ]
  const basicColumns = [
    {
      name: 'اطلاعات (BTC)',
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
