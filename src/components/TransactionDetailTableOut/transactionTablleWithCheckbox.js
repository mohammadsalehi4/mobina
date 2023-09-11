/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'
import NiceAddress2 from '../niceAddress2/niceAddress'
import { digitsEnToFa } from 'persian-tools'


import DataTable from 'react-data-table-component'

import {
  Card,
  Input
} from 'reactstrap'

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const TransactionTablleWithCheckbox2 = (props) => {
  const [data, SetData] = useState([])

  useEffect(() => {
    const a = []
    for (let i = 0; i < props.data.out.length; i++) {
      a.push({
        address:props.data.out[i].address,
        amount:props.data.out[i].amount
      })
    }
    SetData(a)
  }, [, props.data])

  const columns = [
    {
      name: 'آدرس های خروجی',
      sortable: false,
      minWidth: '300px',
      selector: row => row.address,
      cell: row => {
        return (
          <NiceAddress2 text={row.address} number={12}/>
        )
      }
    },
    {
      name: 'مقدار',
      sortable: true,
      minWidth: '100px',
      selector: row => digitsEnToFa(parseFloat((row.amount).toFixed(5)).toString())
    }
  ]

  return (
    <Fragment>
      <Card>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            selectableRows
            columns={columns}
            className='react-dataTable'
            selectableRowsComponent={BootstrapCheckbox}
            data={data}
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default TransactionTablleWithCheckbox2
