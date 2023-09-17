/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { ArrowRight, X, Check} from 'react-feather'
import { Modal, Input, Label, ModalHeader, ModalBody } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { digitsEnToFa } from 'persian-tools'
import { CheckBox } from '@mui/icons-material'


const EditRoll = ({ open, handleModal, Roles, number, AllRoles }) => {
  const dispatch = useDispatch()
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [showData, SetshowData] = useState([])
  const [AllData, SetAllData] = useState([])
  const [accesses, SetAccesses] = useState([])

  const submit = (event) => {

      dispatch({type:"LOADINGEFFECT", value:true})
      axios.put(`${serverAddress}/accounts/role/${number}/`, 
      {
        accesses
      },
      {
          headers: {
              Authorization: `Bearer ${Cookies.get('access')}`, 
              'Content-Type': 'application/json'
          }
      })
      .then((response) => {
          dispatch({type:"LOADINGEFFECT", value:false})
          window.location.assign('/admin')          
      })
      .catch((err) => {
        console.log(err)
          dispatch({type:"LOADINGEFFECT", value:false})
      })
      handleModal(event)
  }

  const [showThisData, SetThisData] = useState([])

  useEffect(() => {
    try {
      SetAllData(AllRoles[1].access)
      SetshowData(Roles.access)
    } catch (error) {}
  }, [Roles, AllRoles])

  useEffect(() => {
    const myData = []
    for (let i = 0; i < AllData.length; i++) {
      const userFound = showData.find(item => item.name === AllData[i].name)
      if (!userFound) {
        myData.push(AllData[i])
      }
    }
    SetThisData(myData)
  }, [showData, AllData])

  const addAccess = (item) => {
    const getAccess = accesses
    getAccess.push({
      name:item
    })
    SetAccesses(getAccess)
    console.log(accesses)
  }

  const deleteAccess = (myitem) => {
    const filteredArray = accesses.filter(item => item.name !== myitem)
    SetAccesses(filteredArray)
    console.log(accesses)

  }

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
        <h5 className='modal-title'>ویرایش نقش</h5>
        <Label className='form-label' for='full-name'>
           نقش خود را ویرایش کنید.
        </Label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1 mt-3'>
          <Label className='form-label' for='full-name' style={{fontWeight:"bolder", fontSize:"16px"}}>
            دسترسی های نقش
          </Label>
          <div>
            <div className='row'>
              {
                AllData.map((item, index) => {
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
            <span className='align-middle'>ویرایش نقش</span>
          </button>
        </div>


      </ModalBody>
    </Modal>
  )
}

export default EditRoll
