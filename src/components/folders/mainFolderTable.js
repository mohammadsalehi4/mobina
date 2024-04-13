/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { digitsEnToFa } from 'persian-tools'
import AddNewModal from './AddNewModal'
import DataTable from 'react-data-table-component'
import { ChevronDown, Share, Trash2, FileText, File, Grid, Copy, Plus, MoreVertical } from 'react-feather'
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
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const MainFolderTable = (props) => {
  const [modal, setModal] = useState(false)
  const [DeleteBox, SetDeleteBox] = useState(false)
  const [DeleteLoading, SetDeleteLoading] = useState(false)
  const [data, SetData] = useState([])
  const handleModal = () => setModal(!modal)

  const columns = [
    {
        minWidth: '30px',
        maxWidth: '30px',
        cell: () => (
            <a href='/case' style={{marginRight:"10px", marginTop:"5px", cursor:"pointer"}}>
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
            <span className='d-block fw-bold text-truncate'>{row.name}</span>
          </div>
        </div>
      )
    },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>شبکه‌ها</p>,
    sortable: true,
    minWidth: '100px',
    maxWidth: '100px',
    selector: row => row.currency,
    cell: row => (
      <p style={{marginTop:"15px", margin:"0px"}}>
          {row.currency}
      </p>
    )
  },
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>تعداد آدرس‌ها</p>,
      minWidth: '130px',
      maxWidth: '130px',
      sortable: row => row.name,
      cell: row => (
        <div className='d-flex'>
          <div className='user-info text-truncate ms-1'>
            <span className='d-block fw-bold text-truncate'>{row.AddressNumber}</span>
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
            <span className='d-block fw-bold text-truncate'>{row.TransactionNumber}</span>
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
            <span className='d-block fw-bold text-truncate'>{row.GraphNumber}</span>
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
              <span className='d-block fw-bold text-truncate'>{Date(row.last_modified).year}</span>
              {/* <span className='d-block fw-bold text-truncate'>{row.last_modified}</span> */}
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
          <Trash2 style={{cursor:'pointer'}} onClick={ () => { SetDeleteBox(true) } }/>
        )
      }
  ]

  useEffect(() => {
    if (props.data.length > 0) {
      SetData(props.data)
      console.log(props.data)
    }
  }, [props.data.length])

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
          <button style={{background:MainSiteOrange, color:"white", border:"none", padding:"8px 16px", borderRadius:"8px"}} className='ms-2' color='primary' onClick={handleModal}>
            <span className='align-middle ms-50'>افزودن مورد جدید</span>
            <Plus size={15}/>
          </button>
        </CardHeader>

        <div className='react-dataTable react-dataTable-selectable-rows'>
          {
            data.length !== 0 ? 
            <DataTable
            noHeader
            selectableRows
            columns={columns}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            selectableRowsComponent={BootstrapCheckbox}
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

          <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteLabel() } }>
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

export default MainFolderTable
