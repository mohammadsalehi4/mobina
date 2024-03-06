/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-duplicate-imports */
import React, {useEffect, useState} from 'react'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, UncontrolledTooltip, Row, Col, Label } from 'reactstrap'
import {Modal, ModalBody, ModalFooter, Input, Button}  from 'reactstrap'
import axios from 'axios'
import { serverAddress } from '../../../address'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Calendar, CalendarProvider } from "zaman"
import { ChevronDown, Eye, Trash2 } from 'react-feather'
import GoalOverview from './GoalOverview'
const Minerefficienty = () => {
    const dispatch = useDispatch()
    const [data, SetData] = useState([])
    const [daleteBox, SetDeleteBox] = useState(false)
    const [deleteId, SetDeleteId] = useState(null)

    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:7})
    }, [])

    const columns = [
        {
            name: 'نام استخراج‌کننده',
            sortable: true,
            minWidth: '150px',
            maxWidth: '150px',
            selector: row => row.name
        },
        {
            name: 'تاریخ شروع',
            sortable: true,
            minWidth: '250px',
            maxWidth: '250px',
            selector: row => row.startDate
        },
        {
            name: 'تاریخ پایان',
            sortable: true,
            minWidth: '250px',
            maxWidth: '250px',
            selector: row => row.endDate
        },
        {
            name: 'وضعیت',
            sortable: true,
            minWidth: '150px',
            maxWidth: '150px',
            selector: row => row.status,
            cell: row => {
                if (row.status === 'calculated') {
                  return (
                    <span style={{fontSize:"12px", background:"rgb(191, 255, 176)", color:"green", padding:"2px 6px", borderRadius:"10px"}}>محاسبه شده</span>
                  )
                } else {
                  return (
                    <span style={{fontSize:"12px", background:"rgb(244, 192, 192)", color:"red", padding:"2px 6px", borderRadius:"10px"}}>درحال محاسبه</span>
                  )
                }
            }
        },
        {
            name: 'عملیات',
            sortable: true,
            minWidth: '150px',
            maxWidth: '150px',
            cell: (row) => {
                return (
                    <div>
                        <Trash2 style={{marginRight:'8px'}} size={20} onClick={ () => { SetDeleteId(row.data.id), SetDeleteBox(true) } }/>
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        axios.get(`${serverAddress}/miners/calculate/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            console.log('response')
            console.log(response)
            if (response.status === 200) {
                const getData = []
                for (let i = 0; i < response.data.results.length; i++) {
                    getData.push(
                        {
                            name: `${response.data.results[i].miner.interface_fname} ${response.data.results[i].miner.interface_lname}`,
                            startDate: response.data.results[i].start_date,
                            endDate: response.data.results[i].end_date,
                            status: response.data.results[i].status,
                            id: response.data.results[i].id,
                            data:response.data.results[i]
                        }
                    )
                }
                SetData(getData)
            }
        })
        .catch((err) => {
            
        })
    }, [])

    const deleteItem = () => {
        axios.delete(`${serverAddress}/miners/calculate/${deleteId}/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            if (response.status === 204) {
                SetDeleteBox(false)
                return toast.success('با موفقیت حذف شد', {
                    position: 'bottom-left'
                })
            }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const ExpandableTable = (e) => {
        return (
            <div className='expandable-content p-2'>
                <GoalOverview id={e.data.data.id}/>
            </div>
        )
    }

  return (
    <div className='container-fluid mt-3'
      style={{
        textAlign: 'center', 
        maxWidth: '1280px', 
        marginLeft: 'auto', 
        marginRight: 'auto'
      }}
    >
      <Card>
        <CardHeader>
            <CardTitle tag='h4'>محاسبات
            </CardTitle>
            <a href='/new_miner_calculate'>
              <Button color='primary' style={{float:'left'}}>محاسبه جدید</Button>
            </a>

        </CardHeader>
        <div className='react-dataTable'>
            <DataTable
            noHeader
            data={data}
            expandableRows
            columns={columns}
            expandOnRowClicked
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            expandableRowsComponent={ExpandableTable}
            />
        </div>
      </Card>

      <Modal
        isOpen={daleteBox}
        className='modal-dialog-centered'
        toggle={ () => { SetDeleteBox(false) } }

        modalClassName={'modal-danger'}
      >
        <ModalBody>
            <h6>آیا از حذف محاسبه مورد نظر اطمینان دارید؟</h6>
        </ModalBody>
        <ModalFooter>
            <Button color='primary' onClick={deleteItem}>حذف</Button>
        </ModalFooter>
      </Modal>

    </div>
  )
}

export default Minerefficienty