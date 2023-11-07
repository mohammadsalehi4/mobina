/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, UncontrolledTooltip } from 'reactstrap'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import LocalLoading from '../localLoading/localLoading'

const AdminReports = () => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const columns = [
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>وضعیت</p>,
      minWidth: '80px',
      maxWidth: '80px',
      cell: row => {
        if (row.status === "انتشار یافته") {
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
                پیش نویس
              </UncontrolledTooltip>
            </>
          )
        }
      }
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تاریخ انتشار</p>,
      minWidth: '250px',
      maxWidth: '250px',
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
      minWidth: '140px',
      maxWidth: '140px',
      selector: row => row.writer
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>عملیات</p>,
      minWidth: '200px',
      maxWidth: '200px',
      cell: row => (
        <div>
          <ion-icon style={{fontSize:'24px', cursor:'pointer'}} name="eye-outline" id={`showReportIcon${row.id}`}></ion-icon>
          <UncontrolledTooltip placement='top' target={`showReportIcon${row.id}`}>
              مشاهده
          </UncontrolledTooltip>
          <ion-icon style={{fontSize:'24px', cursor:'pointer', marginRight:'16px'}} name="create-outline" id={`editReportIcon${row.id}`}></ion-icon>
          <UncontrolledTooltip placement='top' target={`editReportIcon${row.id}`}>
              ویرایش
          </UncontrolledTooltip>
          <ion-icon style={{fontSize:'24px', cursor:'pointer', marginRight:'16px'}} name="trash-outline" id={`deleteReportIcon${row.id}`}></ion-icon>
          <UncontrolledTooltip placement='top' target={`deleteReportIcon${row.id}`}>
              حذف
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

  const [data, SetData] = useState([])

  useEffect(() => {
    SetData([])
    axios.get(`${serverAddress}/reports/panel-reports/`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      const a = []
      for (let i = 0; i < response.data.results.length; i++) {
        a.push(
          {
            id:i,
            status: response.data.results[i].publication_status,
            date:response.data.results[i].latest_update,
            title:response.data.results[i].title,
            writer:response.data.results[i].author
          }
        )
      }
      SetData(a)
    })
    .catch((err) => {
      console.log(err)
    }
  )
  }, [, States.beLoad])

  return (
    <Card className='overflow-hidden mt-4' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader>
        <CardTitle tag='h6' style={{width:'100%'}}>
          لیست گزارش‌‌ها
          <ion-icon size={18} onClick={ () => { 
              dispatch({type:"beLoad", value:!(States.beLoad)})
            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-6px'}} className='ms-2' name="refresh-circle-outline"></ion-icon>  
        </CardTitle>
        
      </CardHeader>
      {
        data.length > 0 ?
        <DataTable
          noHeader
          columns={columns}
          className='react-dataTable'
          data={data}
        />
      :
      <LocalLoading/>
      }

    </Card >
  )
}

export default AdminReports
