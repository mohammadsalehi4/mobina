/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import DataTable from 'react-data-table-component'
import { ChevronDown, Download, X } from 'react-feather'
import React, { useState, forwardRef, useEffect } from 'react'
import {
    Card,
    Modal,
    CardTitle,
    CardHeader,
    UncontrolledTooltip,
    ModalBody,
    ModalFooter,
    Button
  } from 'reactstrap'
import { digitsEnToFa } from 'persian-tools'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../address'
import { RecognizeNetwork } from '../../processors/recognizeNetwork'
import LoadingButton from '../loadinButton/LoadingButton'
import toast from 'react-hot-toast'

const ShowAssets = () => {

    const [data, SetData] = useState([])
    const [DeleteBox, SetDeleteBox] = useState(false)
    const [DeleteId, SetDeleteId] = useState(0)
    const [deleteLoading, SetDeleteLoading] = useState(false)
    const columns = [
        {
            name: 'نماد',
            minWidth: '100px',
            maxWidth: '100px',
            sortable: true,
            selector: row => row.symbol
        },
        {
            name: 'نام',
            minWidth: '160px',
            maxWidth: '160px',
            sortable: true,
            selector: row => row.persian_name
        },
        {
            name: 'نام انگلیسی',
            minWidth: '160px',
            maxWidth: '160px',
            sortable: true,
            selector: row => row.name
        },
        {
            name: 'لوگو',
            minWidth: '120px',
            maxWidth: '120px',
            sortable: true,
            cell : row => (
                <img src={row.image} style={{width:'30px'}} />
            )
        },
        {
            name: 'دسیمال',
            minWidth: '120px',
            maxWidth: '120px',
            sortable: true,
            selector: row => row.decimal_number
        },
        {
            name: 'شبکه',
            minWidth: '120px',
            maxWidth: '120px',
            sortable: true,
            selector: row => row.network,
            cell : row => (
                <span>
                    {
                        RecognizeNetwork(row.network)
                    }
                </span>
            )
        },
        {
            name: 'عملیات',
            minWidth: '120px',
            maxWidth: '120px',
            sortable: true,
            cell : row => (
                <>
                    <ion-icon style={{fontSize:'24px', cursor:'pointer', marginRight:'16px'}} name="create-outline" id={`editReportIcon${row.id}`}></ion-icon>
                    <UncontrolledTooltip placement='top' target={`editReportIcon${row.id}`}>
                        ویرایش
                    </UncontrolledTooltip>

                    <ion-icon style={{fontSize:'24px', cursor:'pointer', marginRight:'16px'}} name="trash-outline" id={`deleteReportIcon${row.id}`} 
                        onClick = {
                        () => {
                            SetDeleteId(row.id)
                            SetDeleteBox(true)
                        }
                        }
                    ></ion-icon>
                    <UncontrolledTooltip placement='top' target={`deleteReportIcon${row.id}`}>
                        حذف
                    </UncontrolledTooltip>
                </>
            )
        }
    ]

    useEffect(() => {
        axios.get(`${serverAddress}/explorer/assets`, 
            {
                headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    const getData = []
                    for (let i = 0; i < response.data.results.length; i++) {
                        getData.push(
                            {
                                id: response.data.results[i].id,
                                symbol: response.data.results[i].symbol,
                                persian_name: response.data.results[i].persian_name,
                                name:  response.data.results[i].name,
                                color: response.data.results[i].color,
                                image: response.data.results[i].image,
                                decimal_number: response.data.results[i].decimal_number,
                                contract_address: response.data.results[i].contract_address,
                                network: response.data.results[i].network
                            }
                        )
                    }
                    SetData(getData)
                }
            })
            .catch((err) => {
                setLoading(false)
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
    }, [])

    const deleteSelectedAsset = () => {
        console.log(DeleteId)
        SetDeleteLoading(true)
        axios.delete(`${serverAddress}/explorer/assets/${DeleteId}`, 
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
            }
        })
        .then((response) => {
            SetDeleteLoading(false)
            SetDeleteBox(false)
            return toast.success('دارایی با موفقیت حذف شد', {
                position: 'bottom-left'
            })
        })
        .catch((err) => {
            console.log(err)
            SetDeleteLoading(false)
            if (err.response.status === 403) {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
            } else if (err.response.status === 401) {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
            } else {
                return toast.error('خطا در حذف دارایی', {
                    position: 'bottom-left'
                })
            }
        })
    }

    return (
        <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h6' style={{width:'100%'}}>لیست دارایی‌ها
          </CardTitle>
        </CardHeader>
          <div className='react-dataTable'>
            <DataTable
                noHeader
                data={data}
                columns={columns}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
            />
          </div>
          <Modal
            isOpen={DeleteBox}
            className='modal-dialog-centered'
            toggle={ () => { SetDeleteBox(false) } }
            modalClassName={'modal-danger'}
          >
          <ModalBody>
            <h6>حذف دارایی</h6>

            <p>آیا برای حذف دارایی انتخاب‌ شده مطمئن هستید؟</p>

          </ModalBody>
          <ModalFooter>
            <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteSelectedAsset() }}>
                {
                    !deleteLoading ? 
                    <span>
                        حذف
                    </span>
                    :
                    <LoadingButton/>
                }
            </Button>
          </ModalFooter>
        </Modal>
      </Card>
    )
}

export default ShowAssets
