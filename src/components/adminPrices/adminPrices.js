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
import { Card, CardHeader, CardTitle, Row, Col, ModalHeader} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import {Button, Modal, ModalBody, ModalFooter}  from 'reactstrap'
import LocalLoading from '../localLoading/localLoading'
const AdminPrices = () => {
    const States = useSelector(state => state)

    const [Data, SetData] = useState([])
    const [ShowGapModal, SetShowGapModal] = useState(false)
    const [Gap, SetGap] = useState(['ssssss', 'aaaaaaaaaa'])
    useEffect(() => {
        if (States.rollsLoading === 5) {
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
    
            })
        }

    }, [, States.rollsLoading])
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
                    SetGap(row.days)
                } }></ion-icon>
              </div>
            )
          }
        }
    ]

    return (
        <div className='react-dataTable'>
            {
                Data.length === 0 ?
                    <LocalLoading/>
                :
                    <DataTable
                        noHeader
                        data={Data}
                        columns={basicColumns}
                        className='react-dataTable mt-3'
                        sortIcon={<ChevronDown size={10} />}
                    />
            }
            <Modal
            isOpen={ShowGapModal}
            className='modal-dialog-centered'
            modalClassName={'modal-danger'}
            >
            <ModalBody>
                <h6>
                    لیست حفره ها
                </h6>
                {
                    Gap.length > 0 ?
                    <div>
                        {
                            Gap.map((item, index) => {
                                return (
                                    <p key={index}>
                                        {item}
                                    </p>
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
