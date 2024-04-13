/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import { digitsEnToFa } from 'persian-tools'
import DataTable from 'react-data-table-component'
import NiceAddress2 from '../../niceAddress2/niceAddress'
import { ChevronDown, Trash2 } from 'react-feather'
import {
  Modal,
  ModalBody,
  Card,
  ModalFooter,
  CardTitle,
  CardHeader,
  Button
} from 'reactstrap'
import { MainSiteOrange } from '../../../../public/colors'
import { JalaliCalendar } from '../../../processors/jalaliCalendar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'

const Addresses = (props) => {

  const [DeleteBox, SetDeleteBox] = useState(false)
  const [DeleteId, SetDeleteId] = useState(false)
  const [DeleteLoading, SetDeleteLoading] = useState(false)
  const [data, SetData] = useState([])

  useEffect(() => {
    if (props.Data.addresses.length > 0) {
      SetData(props.Data.addresses)
    }
  }, [props.Data.addresses.length])

  const columns = [

    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>آدرس</p>,
      minWidth: '250px',
      maxWidth: '250px',
      sortable: row => row.address_hash,
      cell: row => (
        <div className='d-flex mt-1'>
            <span className='d-block fw-bold text-truncate'>{<NiceAddress2 text={row.address_hash} number={8} />}</span>
        </div>
      )
    },
    {
      name: 'ریسک',
      sortable: true,
      minWidth: '100px',
      maxWidth: '100px',
      selector: row => row.age,
      cell: row => (
        <p style={{marginTop:"15px", margin:"0px", direction:"ltr"}}>
            <ion-icon style={{color:MainSiteOrange}} name="flash"></ion-icon>
            
            {digitsEnToFa(`${row.risk}%`)}
        </p>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>شبکه</p>,
      sortable: true,
      minWidth: '120px',
      maxWidth: '120px',
      selector: row => row.network,
      cell: row => (
        <small>{row.network}</small>

      )
    },
  
    {
        name: <p style={{marginTop:"15px", margin:"0px"}}>موجودی</p>,
        sortable: true,
        minWidth: '200px',
        maxWidth: '200px',
        selector: row => row.asset_volume,
        cell: row => (
          <p style={{marginTop:"15px", margin:"0px", direction:"ltr"}}>
              {digitsEnToFa(Number(row.asset_volume).toFixed(5))} <small>{row.network}</small>
          </p>
        )
    },
      {
        name: 'مالک',
        sortable: true,
        minWidth: '150px',
        maxWidth: '150px',
        selector: row => row.owner_name,
        cell: row => (
            <p style={{marginTop:"15px", margin:"0px", direction:"ltr", color:"blue"}}>
                {row.owner_name}
            </p>
        )
      },
      {
        name: <p style={{marginTop:"15px", margin:"0px"}}>تاریخ افزودن</p>,
        minWidth: '140px',
        maxWidth: '140px',
        sortable: row => row.full_name,
        cell: row => (
          <div className='d-flex'>
            <div className='user-info text-truncate ms-1'>
              <span className='d-block fw-bold text-truncate'>{digitsEnToFa(`${JalaliCalendar(new Date(row.date_created).getTime()).year}-${JalaliCalendar(new Date(row.date_created).getTime()).month}-${JalaliCalendar(new Date(row.date_created).getTime()).day}`)}</span>
              <small>{digitsEnToFa(`${JalaliCalendar(new Date(row.date_created).getTime()).hour}:${JalaliCalendar(new Date(row.date_created).getTime()).minute}`)}</small>
            </div>
          </div>
        )
      },
    {
        name: <p style={{marginTop:"15px", margin:"0px"}}>عملیات</p>,
        sortable: true,
        minWidth: '120px',
        maxWidth: '120px',
        cell: row => (
          <Trash2 onClick={ () => { SetDeleteId(row.id), SetDeleteBox(true) }} style={{cursor:'pointer'}}/>
        )
      }
  ]

  const deleteAddress = () => {
    SetDeleteLoading(true)
    axios.delete(`${serverAddress}/case/address-list/${DeleteId}`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
        if (response.status === 204) {
          window.location.reload()
        }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <Fragment>
      <Card style={{minHeight:"100%", borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>لیست آدرس ها</CardTitle>
        </CardHeader>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          {
            data.length > 0 ?
              <DataTable
                noHeader
                columns={columns}
                className='react-dataTable'
                direction='ltr'
                sortIcon={<ChevronDown size={10} />}
                data={data}
              />
          :
            <p style={{textAlign:'center'}} className='pt-5'>بدون آدرس ذخیره شده</p>
          }

        </div>
      </Card>

      <Modal
        isOpen={DeleteBox}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => SetDeleteBox(false)}
      >
        <ModalBody>
          <h6>آیا از حذف آدرس مورد نظر اطمینان دارید؟</h6>
        </ModalBody>
        <ModalFooter>

          <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteAddress() } }>
          {
              DeleteLoading ? 
              <LoadingButton/>
              :
              <span>
                حذف
              </span>
            }
          </Button>
        </ModalFooter>
      </Modal>

    </Fragment>
  )
}

export default Addresses
