/* eslint-disable prefer-const */
/* eslint-disable comma-spacing */
/* eslint-disable no-duplicate-imports */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** Table Columns
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit3 } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, Input, CardTitle,CardHeader, Row, Col, ModalHeader} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import {Button, Modal, ModalBody, ModalFooter}  from 'reactstrap'
import LocalLoading from '../localLoading/localLoading'
import toast from 'react-hot-toast'
const AdminPrices = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()

    const [Data, SetData] = useState([])
    const [ShowGapModal, SetShowGapModal] = useState(false)
    const [Loading, SetLoading] = useState(false)
    const [Gap, SetGap] = useState(
      {
        days:[]
      }
    )
    useEffect(() => {
        if (States.rollsLoading === 5) {
          SetData([])
            axios.get(`${serverAddress}/explorer/status-price-service/`, 
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
                const getData = response.data.results
                const mainData = []
                for (let i = 0; i < getData.length; i++) {
                    mainData.push({
                        network:getData[i].network,
                        token:getData[i].symbol,
                        from:getData[i].history_from,
                        to:getData[i].history_end,
                        noGap:getData[i].gap.status,
                        days:getData[i].gap.days
                    })
                }
                SetData(mainData)
            })
            .catch((err) => {
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

    }, [, States.rollsLoading, States.PriceBeload])
    const basicColumns = [
        {
          name: 'شبکه',
          maxWidth: '100px',
          minWidth: '100px',
          selector: row => row.network

        },
        {
          name: 'توکن',
          maxWidth: '100px',
          minWidth: '100px',
          selector: row => row.token
        },
        {
          name: 'زمان شروع',
          maxWidth: '250px',
          minWidth: '250px',
          selector: row => row.from
        },
        {
          name: 'زمان اتمام',
          maxWidth: '250px',
          minWidth: '250px',
          selector: row => row.to
        },
        {
          name: 'بدون حفره',
          maxWidth: '180px',
          minWidth: '180px',
          cell: row => {
            if (row.noGap) {
                return (
                    <ion-icon style={{fontSize:'24px', color:'green'}} name="checkmark-outline"></ion-icon>
                )
            } else {
                return (
                    <ion-icon style={{fontSize:'24px', color:'red'}} name="close-outline"></ion-icon>
                )
            }
          }
        },
        {
          name: 'نمایش',
          sortable: true,
          maxWidth: '180px',
          minWidth: '180px',
          cell: row => {
            return (
              <div style={{width:'100px'}}>
                <ion-icon style={{fontSize:'28px', cursor:'pointer'}} name="eye-outline" onClick={ () => {
                    SetShowGapModal(true)
                    SetGap(row)
                    console.log(Gap)
                } }></ion-icon>
              </div>
            )
          }
        }
    ]

    const setPrice = (time,price,symbol) => {

      if (price === '') {
        alert('قیمت را وارد کنید.')
      } else {
        SetLoading(true)
        axios.post(`${serverAddress}/explorer/price/`, 
        {
          price:Number(price),
          symbol,
          date:time
        },
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('access')}`, 
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            SetLoading(false)
            console.log(response)  
            if (response.status === 201) {
              let getGap = Gap
              let editedData = getGap.days
              let index = editedData.findIndex(obj => obj === time)
              if (index !== -1) {
                editedData.splice(index, 1)
              }
              getGap.days = editedData
              SetGap(getGap)
              if (Gap.days.length === 0) {
                const myData = Data
                myData.find(item => item.token === symbol).noGap = true
                SetData(myData)
              }
              return toast.success('قیمت با موفقیت ثبت شد.', {
                position: 'bottom-left'
              })
            }            
        })
        .catch((err) => {
            SetLoading(false)
            console.log(err)
            dispatch({type:"LOADINGEFFECT", value:false})
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
            return toast.error('خطا در پردازش', {
              position: 'bottom-left'
            })
        })
      }
    }

    return (
        <div className='react-dataTable'>
            {
                Data.length === 0 ?
                    <LocalLoading/>
                :

                    <Card className='overflow-hidden mt-4' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
                      <CardHeader>
                          <CardTitle tag='h6' className='m-2' style={{width:'100%'}}>
                              <h5 style={{display:'inline-block'}}>
                                قیمت های ثبت شده
                              </h5>   
                              <ion-icon size={18} onClick={ () => { 
                                dispatch({type:"PriceBeload", value:!States.PriceBeload})
                              }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-6px'}} className='ms-2' name="refresh-circle-outline"></ion-icon>
                          </CardTitle>
                      </CardHeader>
              
                      <DataTable
                        noHeader
                        data={Data}
                        columns={basicColumns}
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10} />}
                    />
                  </Card >

            }
            <Modal
            isOpen={ShowGapModal}
            className='modal-dialog-centered'
            modalClassName={'modal-danger'}
            toggle={ () => { SetShowGapModal(false) } }
            >
            <ModalBody>
                <h6>
                    لیست حفره ها
                </h6>
                {
                    (Gap.days).length > 0 ?
                    
                    <div>
                        {
                          Loading ? 
                          <LocalLoading/>
                          : 
                          Gap.days.map((item, index) => {
                            return (
                              <form onSubmit={ () => { setPrice(item, document.getElementById(`InputTokenPrice${index}`).value, Gap.token) } }>
                                <span key={index} style={{display:"block"}}>
                                  {item}
                                </span>
                                <Input className='mb-3' style={{display:'inline-block', width:'80%'}} id={`InputTokenPrice${index}`}/>
                                <Button  style={{display:'inline-block', marginRight:'8px'}} color='warning' onClick={ () => { setPrice(item, document.getElementById(`InputTokenPrice${index}`).value, Gap.token) } }>ثبت</Button>
                              </form>

                            )
                          })
                        }
                    </div>
                    :
                    <p>بدون حفره</p>
                }
            </ModalBody>
            <ModalFooter>
                <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={ () => (SetShowGapModal(false)) }>
                بسته
                </Button>
            </ModalFooter>
            </Modal>
        </div>
    )
}

export default AdminPrices
