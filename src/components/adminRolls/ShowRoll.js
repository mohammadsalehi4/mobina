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
const ShowRoll = ({ open, handleModal, number, AllRoles }) => {
  const dispatch = useDispatch()

  const [showData, SetshowData] = useState([])

  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  useEffect(() => {
    try {
        SetshowData(AllRoles.find(item => item.id === number).access)
    } catch (error) {
        
    }
  }, [number])


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
        <h5 className='modal-title'>مشاهده نقش</h5>
        <Label className='form-label' for='full-name'>
           نقش خود را مشاهده کنید.
        </Label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1 mt-3'>
          <Label className='form-label' for='full-name' style={{fontWeight:"bolder", fontSize:"16px"}}>
            دسترسی های نقش
          </Label>
          <div>
            <div className='row  mt-3'>

              {
                showData.map((item, index) => {
                  return (
                    <div className='col-12' key={index}>
                      <label>{item.name}</label>
                    </div>
                  )
                })
              }

            </div>
          </div>
        </div>


      </ModalBody>
    </Modal>
  )
}

export default ShowRoll
