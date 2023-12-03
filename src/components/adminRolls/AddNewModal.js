/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { ArrowRight, X, Check} from 'react-feather'
import { Modal, Input, Label, ModalHeader, ModalBody } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import { useDispatch, useSelector } from 'react-redux'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoadingButton from '../loadinButton/LoadingButton'

const AddNewModal = ({ open, handleModal, Roles, number, AllRoles }) => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const [showData, SetShowData] = useState([])
  const [accesses, SetAccesses] = useState([])
  const [Loading, SetLoading] = useState(false)

  const submit = (event) => {
    const name = document.getElementById('full-name').value
    SetLoading(true)
    if (name === '') {
      document.getElementById('nameErrLabel').style.display = "block"
      document.getElementById('full-name').style.borderColor = "red"
    } else {
      axios.post(`${serverAddress}/accounts/role/`, 
      {
          role : {
            name: document.getElementById('full-name').value
          },
          accesses
      },
      {
          headers: {
              Authorization: `Bearer ${Cookies.get('access')}`, 
              'Content-Type': 'application/json'
          }
      })
      .then((response) => {
        SetLoading(false)
        if (response.status === 201) {
            dispatch({type:"CustomLoading", value:false})
            dispatch({type:"rollsBeload", value:!States.rollsBeload})
            dispatch({type:"rollsLoading", value:2})

            handleModal(event)
          }
      })
      .catch((err) => {
        console.log(err)
        SetLoading(false)

          dispatch({type:"CustomLoading", value:false})
          if (err.response.status === 403) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
      })
    }
  }

  useEffect(() => {
    try {
      SetShowData(AllRoles[1].access)
    } catch (error) {
      
    }
  }, [AllRoles])

  const addAccess = (item) => {
    const getAccess = accesses
    getAccess.push({
      name:item
    })
    SetAccesses(getAccess)
  }

  const deleteAccess = (myitem) => {
    const filteredArray = accesses.filter(item => item.name !== myitem)
    SetAccesses(filteredArray)
  }

  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      className='sidebar-sm m-0'
      toggle={ handleModal}
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
      style={{margin:"0px"}}
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>ساخت نقش جدید</h5>
        <Label className='form-label' for='full-name'>
            نقش جدید بسازید.
        </Label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            نام نقش
            <small style={{color:"red"}}>*</small>
          </Label>
          <Input id='full-name' />
          <Label className='form-label' style={{color:"red", display:"none"}} id='nameErrLabel'>
            نام نقش نباید خالی باشد!
          </Label>
        </div>
        <div className='mb-1 mt-3'>
          <Label className='form-label' for='full-name' style={{fontWeight:"bolder", fontSize:"16px"}}>
            دسترسی های نقش
          </Label>
          <div>
            <div className='row'>

              {
                showData.map((item, index) => {
                  return (
                    <div className='col-12' key={index}>
                      <input type='checkbox' style={{width:"15px", height:"15px", marginTop:"0px"}} id={`AddRoleCheckbox${index}`} onChange={ () => { 
                        if (document.getElementById(`AddRoleCheckbox${index}`).checked) {
                          addAccess(item.name)
                        } else {
                          deleteAccess(item.name)
                        }
                      } }/>
                      <label className='me-3'>{item.name}</label>
                    </div>
                  )
                })
              }

            </div>
          </div>
        </div>
        <div style={{textAlign:"left"}}>

          <button onClick={(event) => { submit(event) }} style={{ color:"white", background:MainSiteOrange, border:"none", padding:"8px 16px", borderRadius:"8px"}} color='secondary'  outline>
            
            {
              Loading ? 
                <LoadingButton/>
              :
                <span className='align-middle'>ایجاد نقش</span>

            }
              
          </button>
        </div>


      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
