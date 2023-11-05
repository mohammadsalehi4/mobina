/* eslint-disable no-unused-vars */
import React from 'react'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, UncontrolledTooltip } from 'reactstrap'

const AdminReports = () => {
  const columns = [
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>وضعیت</p>,
      minWidth: '100px',
      maxWidth: '100px',
      cell: row => {
        if (row.status) {
          return (
            <>
              <ion-icon id={`reportStatus${row.id}`} style={{fontSize:'24px', color:'green'}} name="checkmark-outline"></ion-icon>
              <UncontrolledTooltip placement='top' target={`reportStatus${row.id}`}>
                منتشر شده
              </UncontrolledTooltip>
            </>
          )
        } else {
          return (
            <>
              <ion-icon id={`reportStatus${row.id}`} style={{fontSize:'24px', color:'orange'}} name="arrow-undo-outline"></ion-icon>
              <UncontrolledTooltip placement='top' target={`reportStatus${row.id}`}>
                پیش‌نویس
              </UncontrolledTooltip>
            </>
          )
        }
      }
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تاریخ انتشار</p>,
      minWidth: '150px',
      maxWidth: '150px',
      selector: row => row.date
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>عنوان</p>,
      minWidth: '500px',
      maxWidth: '500px',
      cell: row => (
        <p className='mt-3'>
          {row.title}
        </p>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>نویسنده</p>,
      minWidth: '180px',
      maxWidth: '180px',
      selector: row => row.writer
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>عملیات</p>,
      minWidth: '200px',
      maxWidth: '200px',
      cell: () => (
        <div>
          <ion-icon style={{fontSize:'24px'}} name="eye-outline"></ion-icon>
          <ion-icon style={{fontSize:'24px'}} name="create-outline"></ion-icon>
          <ion-icon style={{fontSize:'24px'}} name="trash-outline"></ion-icon>
        </div>
      )
    }
  ]
  const data = [
    {
      id:1,
      status:false,
      date:'2023-06-14',
      title:'مروری بر تاریخچه پروژه‌های کلاهبرداری رمز ارزها در ایران',
      writer:'محمد صالحی'
    }
  ]
  return (
    <Card className='overflow-hidden mt-4' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader>
        <CardTitle tag='h6' style={{width:'100%'}}>لیست گزارش‌‌ها</CardTitle>
      </CardHeader>
      <DataTable
        noHeader
        columns={columns}
        className='react-dataTable'
        data={data}
      />
    </Card >
  )
}

export default AdminReports
