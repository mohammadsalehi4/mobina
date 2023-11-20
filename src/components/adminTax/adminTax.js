/* eslint-disable no-duplicate-imports */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, UncontrolledTooltip, Row, Col, Label } from 'reactstrap'
import {Modal, ModalBody, ModalFooter, Input, Button}  from 'reactstrap'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import LocalLoading from '../localLoading/localLoading'
import { MainSiteOrange } from '../../../public/colors'
import LoadingButton from '../loadinButton/LoadingButton'
import toast from 'react-hot-toast'
import { DownloadCloud } from 'react-feather'
import { WriteNumber } from '../../processors/PersianWriteNumber'
import { digitsEnToFa } from 'persian-tools'

const AdminTax = () => {
    const [data, SetData] = useState([
        {
            user:'مامور مالیات',
            JobName:'آریان کوین',
            date:'1396/02/03',
            price:15000000000
        },
        {
          user:'مامور مالیات',
          JobName:'آریان کوین',
          date:'1396/02/03',
          price:15000000000
        },
        {
          user:'مامور مالیات',
          JobName:'آریان کوین',
          date:'1396/02/03',
          price:15000000000
        }
    ])
    const columns = [
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>کاربر</p>,
          minWidth: '250px',
          maxWidth: '250px',
          selector: row => row.user
        },
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>نام کسب و کار</p>,
          minWidth: '300px',
          maxWidth: '300px',
          selector: row => row.JobName
        },
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>تاریخ</p>,
          minWidth: '150px',
          maxWidth: '150px',
          sortable:true,
          selector: row => digitsEnToFa(row.date)
        },
        {
            name: <p style={{marginTop:"15px", margin:"0px"}}>مبلغ (ریال)</p>,
            minWidth: '150px',
            maxWidth: '150px',
            sortable:true,
            selector: row => WriteNumber(row.price)
        },
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>دریافت جزئیات</p>,
          minWidth: '200px',
          maxWidth: '200px',
          cell: row => (
            <div style={{cursor:'pointer'}}>
                <DownloadCloud />
            </div>
          )
        }
      ]
  return (
    <Card className='overflow-hidden mt-4' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader>
            <CardTitle tag='h6' className='m-2' style={{width:'100%'}}>
                <h5 style={{display:'inline-block'}}>
                  مالیات های محاسبه شده 
                </h5>   
                <ion-icon size={18} onClick={ () => { 
            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-6px'}} className='ms-2' name="refresh-circle-outline"></ion-icon>
            </CardTitle>
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

export default AdminTax
