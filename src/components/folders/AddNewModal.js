/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { ArrowRight, X, Check} from 'react-feather'
import { Modal, Input, Label, ModalHeader, ModalBody } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
const countryOptions = [
  { value: 'BTC', label: 'BTC' },
  { value: 'گزینه دو', label: 'گزینه دو' }
]
import { digitsEnToFa } from 'persian-tools'
const AddNewModal = ({ open, handleModal }) => {

  const submit = (event) => {
    const name = document.getElementById('full-name').value
    if (name === '') {
      document.getElementById('nameErrLabel').style.display = "block"
      document.getElementById('full-name').style.borderColor = "red"
    } else {
      handleModal(event)
    }
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
        <h5 className='modal-title'>ساخت مورد جدید</h5>
        <Label className='form-label' for='full-name'>
            مورد جدید بسازید و تنظیمات اعلان را مشخص کنید.
        </Label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
           ارز
            <small style={{color:"red"}}>*</small>
          </Label>
          <Select
              theme={selectThemeColors}
              isClearable={false}
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              defaultValue={countryOptions[0]}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            نام پرونده
            <small style={{color:"red"}}>*</small>
          </Label>
          <Input id='full-name' />
          <Label className='form-label' style={{color:"red", display:"none"}} id='nameErrLabel'>
            نام پرونده نباید خالی باشد!
          </Label>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='full-name'>
            یادداشت
          </Label>
          <Input type='textarea' name='text' id='exampleText' rows='3'/>
        </div>
        <div className='mb-1 mt-3'>
          <Label className='form-label' for='full-name' style={{fontWeight:"bolder", fontSize:"16px"}}>
            تنظیمات اعلان
          </Label>
          <div>
            <div className='row'>
              <div className='col-8'>
                <input type='checkbox' style={{width:"15px", height:"15px", marginTop:"10px"}}/>
                <label className='me-1'> حداقل تغییرات <small>(BTC)</small></label>
              </div>
              <div className='col-4' style={{textAlign:"left"}}>
                <Input id='minBTCChange' type='text'   value={digitsEnToFa("10")}/>
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-8'>
                <input type='checkbox' style={{width:"15px", height:"15px", marginTop:"10px"}}/>
                <label className='me-1'> حداقل تغییرات <small>(USD)</small></label>
              </div>
              <div className='col-4' style={{textAlign:"left"}}>
                <Input id='minUSDChange' type='text'  value={digitsEnToFa("280,000")}/>
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-8'>
                <input type='checkbox' style={{width:"15px", height:"15px", marginTop:"10px"}}/>
                <label className='me-1'> حداقل ریسک <small>(درصد)</small></label>
              </div>
              <div className='col-4' style={{textAlign:"left"}}>
                <Input id='minRisk' type='text' value={digitsEnToFa("50")} />
              </div>
            </div>
            <div className='row mt-1'>
              <div className='col-12'>
                <input type='checkbox' style={{width:"15px", height:"15px", marginTop:"10px"}}/>
                <label className='me-1'>دریافت ایمیل اطلاع رسانی به</label><br/>
                <label className='me-3' style={{fontWeight:"bold"}}>info@company.ir</label>
              </div>
            </div>
          </div>
        </div>
        <div style={{textAlign:"left"}}>
          <button onClick={(event) => { submit(event) }} style={{ color:"white", background:MainSiteOrange, border:"none", padding:"8px 16px", borderRadius:"8px"}} color='secondary'  outline>
            <span className='align-middle'>ایجاد پرونده</span>
          </button>
        </div>


      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
