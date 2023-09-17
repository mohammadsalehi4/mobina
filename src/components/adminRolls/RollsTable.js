/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { digitsEnToFa } from 'persian-tools'
import AddNewModal from './AddNewModal'
import EditRoll from './EditRoll'
import ShowRoll from './ShowRoll'
import { useDispatch, useSelector } from 'react-redux'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { ChevronDown, Menu, Edit3, FileText, Trash2, Eye, Delete, Plus, MoreVertical } from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle, Badge,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Button, Modal, ModalHeader, ModalBody, ModalFooter 
} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../public/colors'

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const RollsTable = () => {
  const dispatch = useDispatch()

  const [modal, setModal] = useState(false)
  const [Edit, setEdit] = useState(false)
  const [Show, setShow] = useState(false)
  const [number, SetNumber] = useState(0)
  const [modal1, setModal1] = useState(null)
  const [DeleteItem, setDeleteItem] = useState(null)


  const handleModal = () => setModal(!modal)
  const handleEdit = () => setEdit(!Edit)
  const handleShow = () => setShow(!Show)

  const DeleteRole = (index) => {
    dispatch({type:"LOADINGEFFECT", value:true})
    axios.delete(`${serverAddress}/accounts/role/${index}`, 
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
          dispatch({type:"LOADINGEFFECT", value:false})
          if (response.data.message === 'successfully delete') {
            window.location.assign('/admin')
          }
      })
      .catch((err) => {
        dispatch({type:"LOADINGEFFECT", value:false})
      })
  }

  const columns = [
    {
      name: <p style={{marginTop:"15px", margin:"0px"}}>نقش</p>,
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
      name: 'توضیحات',
      minWidth: '750px',
      maxWidth: '750px',
      cell: row => ('این نقش توسط ادمین جهت ایجاد دسترسی های مختلف به قسمت های مختلف سایت ایجاد شده است.')
    },
    {
      name: 'عملیات',
      minWidth: '160px',
      maxWidth: '160px',
      cell: row => (
        <div>
          <div id={`ShowRoleDetails${row.id}`} style={{display:'inline-block', cursor:'pointer'}} onClick={() => { handleShow(), SetNumber(row.id) }}>
            <Eye size={25} style={{marginLeft:'8px', color:'rgb(160,160,160)'}}/>
          </div>
          <UncontrolledTooltip placement='right' target={`ShowRoleDetails${row.id}`}>
            مشاهده جزئیات نقش
          </UncontrolledTooltip>
          <div id={`EditRoleDetail${row.id}`} style={{display:'inline-block', marginRight:'8px', cursor:'pointer'}} onClick={() => { handleEdit(), SetNumber(row.id) }}>
            <Edit3 size={25} style={{marginLeft:'8px', color:'rgb(160,160,160)'}}/>
          </div>
          <UncontrolledTooltip placement='top' target={`EditRoleDetail${row.id}`}>
            ویرایش نقش
          </UncontrolledTooltip>
          <div id={`DeleteRole${row.id}`} style={{display:'inline-block', marginRight:'8px', cursor:'pointer'}} onClick={() => { setDeleteItem(row.id), setModal1(4) }}>
            <Trash2 size={25} style={{marginLeft:'8px', color:'rgb(160,160,160)'}}/>
          </div>
          <UncontrolledTooltip placement='left' target={`DeleteRole${row.id}`}>
            حذف نقش
          </UncontrolledTooltip>
        </div>
      )
    }
  ]

    //Rolls
    const [Rolls, SetRolls] = useState([])
    useEffect(() => {
      dispatch({type:"LOADINGEFFECT", value:true})
      axios.get(`${serverAddress}/accounts/role/`, 
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
          dispatch({type:"LOADINGEFFECT", value:false})
          if (response.data.length > 0) {
              SetRolls(response.data)
          }
      })
      .catch((err) => {
          dispatch({type:"LOADINGEFFECT", value:false})
          try {
            if (err.response.data.detail === 'Token is expired' || err.response.statusText === "Unauthorized") {
              Cookies.set('refresh', '')
              Cookies.set('access', '')
              window.location.assign('/')
            }
          } catch (error) {}
      })
    }, [])

    const [data, SetData] = useState([])

    useEffect(() => {
      SetData(Rolls)
    }, [Rolls])

  return (
    <Fragment>
      <Card style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>لیست نقش ها</CardTitle>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-2 mb-2' md='6' sm='12'>
            <div className='d-flex mt-md-0 mt-1'>
              <button style={{background:MainSiteOrange, color:"white", border:"none", padding:"8px 16px", borderRadius:"8px"}} className='ms-2' color='primary' onClick={handleModal}>
                <span className='align-middle ms-50'>افزودن نقش جدید</span>
                <Plus size={15}/>
              </button>
            </div>
          </Col>
        </Row>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            columns={columns}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            selectableRowsComponent={BootstrapCheckbox}
            data={data}
          />
        </div>
      </Card>
      <AddNewModal AllRoles={Rolls} Roles={Rolls[number - 1]} open={modal} handleModal={handleModal} number={number} />
      <EditRoll AllRoles={Rolls} Roles={Rolls[number - 1]} open={Edit} handleModal={handleEdit} number={number} />
      <ShowRoll AllRoles={Rolls} Roles={Rolls[number - 1]} open={Show} handleModal={handleShow} number={number} />
      <Modal
          isOpen={modal1 === 4}
          className='modal-dialog-centered'
          modalClassName={'modal-danger'}
        >
          <ModalBody>
            آیا برای حذف نقش مطمئن هستید؟
          </ModalBody>
          <ModalFooter>
            <Button color={'warning'} onClick={() => {
                setModal1(null)              
              }}>
              بازگشت
            </Button>
            <Button color={'danger'} onClick={() => {
                DeleteRole(DeleteItem)
                setModal1(null)              
            }}>
              حذف
            </Button>
          </ModalFooter>
        </Modal>
    </Fragment>
  )
}

export default RollsTable
