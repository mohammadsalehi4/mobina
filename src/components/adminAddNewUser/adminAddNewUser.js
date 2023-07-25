import React, {useState} from 'react'
import {  Row, Col, Input, Form, Label } from 'reactstrap'
import { MainSiteOrange } from '../../../public/colors'
import CreatableSelect from 'react-select/creatable'
import toast from 'react-hot-toast'

const AdminAddNewUser = () => {
    const [inputValue, setInputValue] = useState('')
    const [inputLastValue, setInputLastValue] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)

    const customStyles = {
        singleValue: (provided) => ({
          ...provided,
          color: 'rgb(120,120,120)'
        })
      }

    const handleSelectChange = (newValue) => {
      setSelectedOption(newValue)
    }

    const handleInputChange = (event) => {
      const value = event.target.value
      const persianRegex = /^[\u0600-\u06FF\s]+$/
  
      if (persianRegex.test(value) || value === '') {
        setInputValue(value)
      }
    }

    const handleInputLastChange = (event) => {
      const value = event.target.value
      const persianRegex = /^[\u0600-\u06FF\s]+$/
  
      if (persianRegex.test(value) || value === '') {
        setInputLastValue(value)
      }
    }

    const [inputUsernameValue, setInputUsernameValue] = useState('')

    const handleInputUsernameChange = (event) => {
      const value = event.target.value
      const englishRegex = /^[a-zA-Z0-9]+$/
  
      if (englishRegex.test(value) || value === '') {
        setInputUsernameValue(value)
      }
    }

    const handleSubmit = (event) => {
      const value = document.getElementById('AdminAddUserEmailInput').value
      const Numbervalue = document.getElementById('AdminAddUserPhoneNumber').value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const phoneRegex = /^09[0-9]{9}$/

      event.preventDefault()
      if (emailRegex.test(value)) {
        if (phoneRegex.test(Numbervalue)) {
            if (selectedOption !== null) {
                alert('ok')
            } else {
                toast.error('لطفا نقش کاربر را مشخص کنید.', {
                    position: 'bottom-left'
                })
            }
        } else {
            toast.error('لطفا شماره موبایل را به درستی وارد کنید.', {
                position: 'bottom-left'
            })
        }
      } else {
            toast.error('لطفا ایمیل را به درستی وارد کنید.', {
                position: 'bottom-left'
            })
      }
    }
  return (
        <form onSubmit={(event) => { handleSubmit(event) }}>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='nameMulti'>
                نام
              </Label>
              <Input  value={inputValue} onChange={handleInputChange} type='text' name='name' id='nameMulti' placeholder='نام...' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                نام خانوادگی
              </Label>
              <Input  value={inputLastValue} onChange={handleInputLastChange} type='text' name='lastname' id='lastNameMulti' placeholder='نام خانوادگی...' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                نام کاربری
              </Label>
              <Input  value={inputUsernameValue} onChange={handleInputUsernameChange} type='text' name='city' id='cityMulti' placeholder='نام کاربری...' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
                <Label className='form-label'>
                    نقش
                </Label>
                <CreatableSelect 
                    value={selectedOption}
                    onChange={handleSelectChange}
                    styles={customStyles}
                    options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' }
                    ]}
                    id='AdminAddUserRollSelect' 
                />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='AdminAddUserEmailInput'>
                ایمیل
              </Label>
              <Input id="AdminAddUserEmailInput" type='text' name='company' placeholder='example@example.com' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='AdminAddUserPhoneNumber'>
                شماره همراه
              </Label>
              <Input type='text' name='Email' id='AdminAddUserPhoneNumber' placeholder='09121234567' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='CountryMulti'>
                رمز عبور
              </Label>
              <Input type='text' name='country' id='CountryMulti' placeholder='رمز عبور...' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                
              </Label>
              <div style={{textAlign:"left"}}>
                <button style={{border:"none", float:"left", background:MainSiteOrange, color:"white", padding:"6px 16px", borderRadius:"6px", marginTop:"4px"}}>افزودن</button>
              </div>
            </Col>
          </Row>
        </form>
  )
}

export default AdminAddNewUser
