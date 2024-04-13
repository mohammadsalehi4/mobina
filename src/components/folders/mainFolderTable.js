/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { digitsEnToFa } from 'persian-tools'
import AddNewModal from './AddNewModal'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Trash2, FileText, File, Grid, Copy, Plus, PlusCircle } from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  CardTitle,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import LoadingButton from '../loadinButton/LoadingButton'
import { JalaliCalendar } from '../../processors/jalaliCalendar'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../address'
import LocalLoading from '../localLoading/localLoading'
import toast from 'react-hot-toast'
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const MainFolderTable = (props) => {
  const [DeleteBox, SetDeleteBox] = useState(false)
  const [AddBox, SetAddBox] = useState(false)
  const [DeleteId, SetDeleteId] = useState(false)
  const [DeleteLoading, SetDeleteLoading] = useState(false)
  const [AddLoading, SetAddLoading] = useState(false)
  const [data, SetData] = useState([])
  const [Reload, SetReload] = useState(false)
  const [Loading, SetLoading] = useState(false)

  const columns = [
    {
        minWidth: '50px',
        maxWidth: '50px',
        cell: row => (
            <a href={`/case/${row.id}`} style={{marginRight:"20px", marginTop:"5px", cursor:"pointer"}}>
                <ion-icon style={{marginRight:"-25px", fontSize:"120px", width:"20px", height:"20px", background:"rgb(240,240,240)", padding:"5px", borderRadius:"8px"}}  name="briefcase-outline"></ion-icon>
            </a>
        )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>نام</p>,
      minWidth: '200px',
      maxWidth: '200px',
      sortable: row => row.name,
      cell: row => (
        <div className='d-flex'>
          <div className='user-info text-truncate ms-1'>
            <span className='d-block text-truncate'>{row.name}</span>
          </div>
        </div>
      )
    },
  //   {
  //     name: <p style={{marginTop:"15px", margin:"0px"}}>شبکه‌ها</p>,
  //   sortable: true,
  //   minWidth: '100px',
  //   maxWidth: '100px',
  //   selector: row => row.currency,
  //   cell: row => (
  //     <p style={{marginTop:"15px", margin:"0px"}}>
  //         {row.currency}
  //     </p>
  //   )
  // },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تعداد آدرس‌ها</p>,
      minWidth: '130px',
      maxWidth: '130px',
      sortable: row => row.name,
      cell: row => (
        <div className='d-flex'>
          <div className='user-info text-truncate ms-1'>
            <span className='d-block text-truncate'>{row.len_of_address === 0 ? 'بدون آدرس' : digitsEnToFa(row.len_of_address)}</span>
          </div>
        </div>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تعداد تراکنش‌ها</p>,
      minWidth: '130px',
      maxWidth: '130px',
      sortable: row => row.name,
      cell: row => (
        <div className='d-flex'>
          <div className='user-info text-truncate ms-1'>
            <span className='d-block text-truncate'>{row.len_of_transaction === 0 ? 'بدون تراکنش' : digitsEnToFa(row.len_of_transaction)}</span>
          </div>
        </div>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تعداد گراف‌ها</p>,
      minWidth: '130px',
      maxWidth: '130px',
      sortable: row => row.name,
      cell: row => (
        <div className='d-flex'>
          <div className='user-info text-truncate ms-1'>
            <span className='d-block text-truncate'>{row.len_of_graph === 0 ? 'بدون گراف' : digitsEnToFa(row.len_of_graph)}</span>
          </div>
        </div>
      )
    },

    {
        name: 'آخرین تغییرات',
        sortable: true,
        minWidth: '150px',
        maxWidth: '150px',
        selector: row => row.last_modified,
        cell: row => (
          <div className='d-flex'>
            <div className='user-info text-truncate ms-1' style={{textAlign:'left'}}>
              <span className='d-block text-truncate'>{digitsEnToFa(`${JalaliCalendar(new Date(row.last_modified).getTime()).year}-${JalaliCalendar(new Date(row.last_modified).getTime()).month}-${JalaliCalendar(new Date(row.last_modified).getTime()).day}`)}</span>
              <span className='d-block text-truncate'>{digitsEnToFa(`${JalaliCalendar(new Date(row.last_modified).getTime()).hour}:${JalaliCalendar(new Date(row.last_modified).getTime()).minute}`)}</span>
            </div>
          </div>
        )
      },

    {
      name: 'وضعیت',
      minWidth: '120px',
      maxWidth: '120px',
      sortable: row => row.status,
      cell: row => {
        return (
                row.status === "done" ?
                    <span style={{fontSize:"12px", background:"rgb(255, 176, 176)", color:"red", padding:"2px 6px", borderRadius:"10px"}}>بسته</span>
                :
                    row.status === "ongoing" ?
                        <span style={{fontSize:"12px", background:"rgb(176, 204, 255)", color:"blue", padding:"2px 6px", borderRadius:"10px"}}>در حال بررسی</span>
                    :
                        row.status === "open" ?
                            <span style={{fontSize:"12px", background:"rgb(191, 255, 176)", color:"green", padding:"2px 16px", borderRadius:"10px"}}>باز</span>
                        :
                            <span style={{fontSize:"12px", background:"rgb(191, 255, 176)", color:"green", padding:"2px 6px", borderRadius:"10px"}}>نمیدونم</span>
        )
      }
    },
    {
        name: 'عملیات',
        sortable: true,
        minWidth: '120px',
        maxWidth: '120px',
        cell: row => (
          <Trash2 style={{cursor:'pointer'}} onClick={ () => { SetDeleteId(row.id), SetDeleteBox(true) } }/>
        )
      }
  ]

  useEffect(() => {
    SetLoading(true)
    axios.get(`${serverAddress}/case/management/`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      SetLoading(false)
      SetData(response.data)
    })
    .catch((err) => {
      SetLoading(false)
      console.log(err)
    })
  }, [, Reload])

  const deleteCase = () => {
    SetDeleteLoading(true)
    axios.delete(`${serverAddress}/case/management/${DeleteId}`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      SetDeleteLoading(false)
      SetDeleteBox(false)
      if (response.status === 204) {
        SetReload(!Reload)
      }
    })
    .catch((err) => {
      SetDeleteBox(false)
      SetDeleteLoading(false)
      SetLoading(false)
      console.log(err)
    })
  }

  const AddCase = () => {
    const Title = document.getElementById('AddCaseTitle').value
    const Note = document.getElementById('AddCaseNote').value

    SetAddLoading(true)

    axios.post(`${serverAddress}/case/management/`, 
    {
      name:Title,
      note_detail:Note
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      if (response.status === 201) {
        SetAddLoading(false)
        SetAddBox(false)
        SetReload(!Reload)
        return toast.success('پرونده با موفقیت ساخته شد', {
          position: 'bottom-left'
        })
      }
    })
    .catch((err) => {
      SetAddLoading(false)
      console.log(err)
    })
  }

  return (
    <Fragment>
      <Card 
        style={{
          textAlign: 'center', 
          maxWidth: '1280px', 
          marginLeft: 'auto', 
          marginRight: 'auto'
        }}
      >
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>لیست پرونده ها</CardTitle>
            <PlusCircle style={{cursor:'pointer'}} onClick={ () => { SetAddBox(true) } } />
        </CardHeader>

        <div className='react-dataTable react-dataTable-selectable-rows'>
          {
            Loading ? 
              <div className='mt-5'>
                <LocalLoading/>
              </div>
            :
              data.length !== 0 ? 
    
                  <DataTable
                    noHeader
                    columns={columns}
                    className='react-dataTable'
                    data={data}
                  />
              :
                <p style={{textAlign:'center'}} className='mt-3'>بدون پرونده ذخیره شده</p>
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
          <h6>آیا از حذف پرونده مورد نظر اطمینان دارید؟</h6>
        </ModalBody>
        <ModalFooter>

          <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteCase() } }>
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

      <Modal
        isOpen={AddBox}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => SetAddBox(false)}
      >
        <ModalBody>
          <h6>افزودن پرونده جدید</h6>
          <Input placeholder='عنوان' id='AddCaseTitle'/>
          <br/>
          <Input type='textarea' placeholder='جزئیات' id='AddCaseNote'/>
        </ModalBody>
        <ModalFooter>

          <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { AddCase() } }>
            {
              AddLoading ? 
              <LoadingButton/>
              :
              <span>
                افزودن
              </span>
            }
          </Button>
        </ModalFooter>
      </Modal>

    </Fragment>
  )
}

export default MainFolderTable
