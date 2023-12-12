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
  const States = useSelector(state => state)
  const dispatch = useDispatch()

    const [data, SetData] = useState([])
    const [Loading, SetLoading] = useState([])

    useEffect(() => {
      if (States.rollsLoading === 6) {
        SetLoading(true)
        axios.get(`${serverAddress}/taxing/operation/?panel=admin`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
        SetLoading(false)
        if (response.status === 200) {
            const getData = []
            console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
              getData.push(
                {
                  JobName:response.data[i].bussiness,
                  date:response.data[i].created_date,
                  price:Number(response.data[i].final_calcualation_price),
                  link:response.data[i].download_link,
                  forgiveness_precentage:Number(response.data[i].forgiveness_precentage),
                  forgiveness_mount:Number(response.data[i].forgiveness_mount)
                }
              )
            }
            SetData(getData)
          }
        })
        .catch((err) => {
        SetLoading(false)
        dispatch({type:"CustomLoading", value:false})
            console.log(err)
            if (err.response.status === 403) {
              Cookies.set('refresh', '')
              Cookies.set('access', '')
              window.location.assign('/')
            }
            if (err.response.status === 401) {
              Cookies.set('refresh', '')
              Cookies.set('access', '')
              window.location.assign('/')
            }
        })
      }
    }, [, States.rollsLoading, States.TaxBeload])

    const columns = [
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>نام کسب و کار</p>,
          minWidth: '150px',
          maxWidth: '150px',
          selector: row => row.JobName
        },
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>تاریخ</p>,
          minWidth: '250px',
          maxWidth: '250px',
          sortable:true,
          selector: row => digitsEnToFa(row.date)
        },
        {
            name: <p style={{marginTop:"15px", margin:"0px"}}>مبلغ (ریال)</p>,
            minWidth: '250px',
            maxWidth: '250px',
            sortable:true,
            selector: row => WriteNumber(row.price)
        },
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>بخشش (ریال)</p>,
          minWidth: '150px',
          maxWidth: '150px',
          sortable:true,
          selector: row => WriteNumber(row.forgiveness_mount)
        },
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>بخشش (درصد)</p>,
          minWidth: '150px',
          maxWidth: '150px',
          sortable:true,
          selector: row => WriteNumber(row.forgiveness_precentage)
        },
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>دریافت جزئیات</p>,
          minWidth: '200px',
          maxWidth: '200px',
          cell: row => (
            <a style={{cursor:'pointer', color:'inherit'}} href={row.link} target='blank' 
            onClick={ () => {
              // const url = row.link
              // window.open(url, '_blank') 
              alert(row.link)
            } }
            >
                <DownloadCloud />
            </a>
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
              dispatch({type:"TaxBeload", value:!States.TaxBeload})

            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-6px'}} className='ms-2' name="refresh-circle-outline"></ion-icon>
            </CardTitle>
        </CardHeader>
            {
              Loading ? 
                <LocalLoading/>
              :
                <DataTable
                noHeader
                columns={columns}
                className='react-dataTable'
                data={data}
              />
            }

    </Card >
  )
}

export default AdminTax
