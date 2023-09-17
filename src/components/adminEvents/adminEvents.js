/* eslint-disable no-unused-vars */
import React from 'react'
import DataTable from 'react-data-table-component'

const AdminEvents = () => {
  const columns = [
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>نقش</p>,
      minWidth: '300px',
      maxWidth: '300px',
      sortable: row => row.name,
      cell: row => (<p>sss</p>)
    }
  ]
  const data = []
  return (
    <DataTable
    noHeader
    columns={columns}
    className='react-dataTable'
    data={data}
  />
  )
}

export default AdminEvents
