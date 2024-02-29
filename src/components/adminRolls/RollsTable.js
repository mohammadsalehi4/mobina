/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef, useEffect } from 'react'
import AddNewModal from './AddNewModal'
import EditRoll from './EditRoll'
import ShowRoll from './ShowRoll'
import { useDispatch, useSelector } from 'react-redux'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { ChevronDown, Edit3, Trash2, Eye, Plus} from 'react-feather'
import {
  Row,
  Col,
  Card,
  Input,
  CardTitle,
  CardHeader,
  UncontrolledTooltip,
  Button, Modal, ModalBody, ModalFooter 
} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import LocalLoading from '../localLoading/localLoading'
import LoadingButton from '../loadinButton/LoadingButton'

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const RollsTable = () => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const [modal, setModal] = useState(false)
  const [Edit, setEdit] = useState(false)
  const [Show, setShow] = useState(false)
  const [number, SetNumber] = useState(0)
  const [modal1, setModal1] = useState(null)
  const [DeleteItem, setDeleteItem] = useState(null)
  const [Loading, setLoading] = useState(false)


  const handleModal = () => setModal(!modal)
  const handleEdit = () => {
    alert('run')
    setEdit(!Edit)
  }
  const handleShow = () => setShow(!Show)

  const DeleteRole = (index) => {
    dispatch({type:"CustomLoading", value:true})
    setLoading(true)
    axios.delete(`${serverAddress}/accounts/role/${index}`, 
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
    setLoading(false)
        if (response.status === 202) {
          dispatch({type:"CustomLoading", value:false})
          dispatch({type:"beLoad", value:!(States.beLoad)})
          dispatch({type:"rollsBeload", value:!(States.rollsBeload)})
          setModal1(null)
        }

      })
      .catch((err) => {
    setLoading(false)
    dispatch({type:"CustomLoading", value:false})
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
    const [Rolls, SetRolls] = useState([
      {
        access:[]
      },
      {
        access:[]
      }
    ])
    useEffect(() => {
      if (States.rollsLoading === 2) {
        dispatch({type:"LOADINGEFFECT", value:true})
        setLoading(true)
        axios.get(`${serverAddress}/accounts/role/`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
          console.log(response.data)
        setLoading(false)
        dispatch({type:"LOADINGEFFECT", value:false})
            if (response.data.results.length > 0) {
                const array = response.data.results
                array.sort((a, b) => ((a['id'] > b['id']) ? 1 : ((b['id'] > a['id']) ? -1 : 0)))
                SetRolls(array)
            }
        })
        .catch((err) => {
        setLoading(false)
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
        })
      }

    }, [States.rollsLoading, States.rollsBeload])

    const [data, SetData] = useState([])

    useEffect(() => {
      SetData(Rolls)
    }, [Rolls])

  return (
    <Fragment>
      <Card style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4' style={{width:'100%'}}>لیست نقش ها
            <ion-icon size={18} onClick={ () => { 
              dispatch({type:"beLoad", value:!(States.beLoad)})
            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-6px'}} className='ms-2' name="refresh-circle-outline"></ion-icon>
          </CardTitle>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <Col className='d-flex align-items-center justify-content-end mt-2 mb-2' md='6' sm='12'>
            <div className='d-flex mt-md-0 mt-1'>
              <button style={{background:MainSiteyellow, color:"white", border:"none", padding:"8px 16px", borderRadius:"8px"}} className='ms-3' color='primary' onClick={handleModal}>
                <span className='align-middle'>افزودن نقش</span>
              </button>
            </div>
          </Col>
        </Row>
        {
          Loading ?
            <LocalLoading/>
          :
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
        }

      </Card>

      <AddNewModal AllRoles={Rolls} Roles={Rolls[number - 1]} open={modal} handleModal={handleModal} number={number} />
      <EditRoll AllRoles={Rolls} Roles={Rolls[number - 1]} open={Edit} handleModal={handleEdit} number={number} />
      <ShowRoll AllRoles={Rolls} Roles={Rolls[number - 1]} open={Show} handleModal={handleShow} number={number} />
      
      <Modal
          isOpen={modal1 === 4}
          toggle={ () => { setModal1(null) } }
          className='modal-dialog-centered'
          modalClassName={'modal-danger'}
        >
          <ModalBody>
            آیا برای حذف نقش مطمئن هستید؟
          </ModalBody>
          <ModalFooter>

            <Button color={'primary'} style={{height:'37px'}} onClick={() => {
                DeleteRole(DeleteItem)
            }}>
              {
                Loading ? 
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

export default RollsTable
