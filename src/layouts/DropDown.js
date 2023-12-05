/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, Fragment, useState } from 'react'
import Cookies from 'js-cookie'
import { LogOut, Lock, User, ChevronLeft } from 'react-feather'
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Badge, Button, Input } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import {Modal, ModalBody, ModalFooter}  from 'reactstrap'
import toast from 'react-hot-toast'
import axios from 'axios'
import { serverAddress } from '../address'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import Avatar from "boring-avatars"
import LoadingButton from '../components/loadinButton/LoadingButton'
const DropDown = () => {
    const [Loading, SetLoading] = useState(false)

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [ChangePasswordModal, setChangePasswordModal] = useState(false)
    const dispatch = useDispatch()
    const store = useSelector(state => state.ecommerce)
    const toggle = () => setDropdownOpen(prevState => !prevState)

    const changePassword = () => {
        const oldPasswordField = document.getElementById('oldPasswordField').value
        const newPasswordField = document.getElementById('newPasswordField').value
        const duplicatedPasswordField = document.getElementById('duplicatedPasswordField').value
        SetLoading(true)
        if (newPasswordField === duplicatedPasswordField) {
            axios.put(`${serverAddress}/accounts/change_password/`, 
            {
                old_password:oldPasswordField,
                password:newPasswordField
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`, 
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                SetLoading(false)
                try {
                    if (response.data.Success === true) {
                        setChangePasswordModal(false)
                        return toast.success('رمز عبور با موفقیت تغییر کرد.', {
                            position: 'bottom-left'
                        })
                    }
                } catch (error) {}
            })
            .catch((err) => {
                SetLoading(false)
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
                try {
                    if (err.response.data.password[0] === "Password should have at least one uppercase letter.") {
                        return toast.error('رمز انتخاب شده باید حداقل یک حرف بزرگ داشته باشد.', {
                            position: 'bottom-left'
                        })
                    }
                } catch (error) {}
                try {
                    if (err.response.data.password[0] === "Password should have at least one symbolic character.") {
                        return toast.error('رمز انتخاب شده باید حداقل یک نماد داشته باشد.', {
                            position: 'bottom-left'
                        })
                    }
                } catch (error) {}
                try {
                    if (err.response.data.password[0] === "Password should have at least one lowercase letter.") {
                        return toast.error('رمز انتخاب شده باید حداقل از یک حرف کوچک تشکیل شده باشد.', {
                            position: 'bottom-left'
                        })
                    }
                } catch (error) {}
                try {
                    if (err.response.data.old_password.old_password === "Old password is not correct") {
                        return toast.error('رمز عبور قبلی خود را به درستی وارد کنید!', {
                            position: 'bottom-left'
                        })
                    }
                } catch (error) {}
                try {
                if (err.response.data.password[0] === "Password should be at least 8 characters.") {
                    return toast.error('رمز عبور باید حداقل از 8 کاراکتر تشکیل شده باشد.', {
                        position: 'bottom-left'
                    })
                }
                } catch (error) {}
                return toast.error('عدم ارتباط با سرور', {
                    position: 'bottom-left'
                })
            })
        } else {
            console.log(newPasswordField)
                SetLoading(false)
                console.log(duplicatedPasswordField)
            document.getElementById('newPasswordField').style.borderColor = 'red'
            document.getElementById('duplicatedPasswordField').style.borderColor = 'red'
            return toast.error('عدم تطابق رمز عبور های وارد شده', {
                position: 'bottom-left'
            })
        }
    }

  return (

    <Dropdown isOpen={dropdownOpen} toggle={toggle} tag='li' className='dropdown-cart nav-item me-25'>
      <DropdownToggle tag='a' className=' nav-link dropdown-toggle hide-arrow topHeaderIcon' style={{textAlign:'center'}}>    
        <ion-icon name="person-outline"></ion-icon>
      </DropdownToggle>
      <DropdownMenu end tag='ul' className='dropdown-menu-media dropdown-cart mt-0' style={{minWidth:'260px'}}>

        <li className='dropdown-menu-header p-2' style={{direction:'rtl', textAlign:'right'}}>
            <div className='row container-fluid pb-2' style={{borderBottomStyle:'solid', borderBottomColor:'rgb(220,220,220)', borderBottomWidth:'1px'}}>
                <div className='col-3' style={{ padding:'4px'}}>
                    {/* <svg viewBox="0 0 80 80" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                        <mask id=":r3j:" maskUnits="userSpaceOnUse" x="0" y="0" width="80" height="80">
                        <rect width="80" height="80" rx="160" fill="#FFFFFF"></rect>
                        </mask>
                        <g mask="url(#:r3j:)">
                        <rect width="80" height="80" fill="#ffb238"></rect>
                        <path 
                            filter="url(#prefix__filter0_f)" 
                            d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z" 
                            fill="#0a0310" 
                            transform="translate(2 -2) rotate(18 40 40) scale(1.5)">
                        </path>
                        <path 
                            filter="url(#prefix__filter0_f)" 
                            d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z" 
                            fill="#49007e" 
                            transform="translate(-7 7) rotate(-207 40 40) scale(1.5)" 
                            style={{ mixBlendMode: 'overlay' }}>
                        </path>
                        </g>
                        <defs>
                        <filter id="prefix__filter0_f" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                            <feGaussianBlur stdDeviation="7" result="effect1_foregroundBlur"></feGaussianBlur>
                        </filter>
                        </defs>
                    </svg> */}
                    <Avatar
                        size={'100%'}
                        name="Maya Angelou"
                        variant="ring"
                        square={false}
                        colors={["#daa520", "#2f4f4f", "#daa520", "#2f4f4f", "#cdcd32"]}
                        style={{ borderRadius: '8px' }}
                    />
                </div>
                <div className='col-9'>
                    <span style={{fontSize:'14px'}}>{Cookies.get('name')} {Cookies.get('lastname')}</span><br/>
                    <span style={{fontSize:'12px'}}>{Cookies.get('roll_name')}</span>
                </div>
            </div>
        </li>

        <a href='/profile' style={{textDecoration:'none', color:'rgb(120,120,120)'}}>
            <li className='dropdown-menu-header profileHeaderItem' style={{direction:'rtl', textAlign:'right', padding:'16px 8px'}}>
                <div className='container-fluid '>
                        <User />
                        <span style={{marginBottom:'-8px', marginRight:'8px'}}>مشاهده پروفایل</span>
                </div>
            </li>
        </a>

        <a>
            <li onClick={ () => { setChangePasswordModal(true), toggle() }} className='dropdown-menu-header profileHeaderItem' style={{direction:'rtl', textAlign:'right', padding:'16px 8px'}}>
                <div className='container-fluid '>
                        <Lock />
                        <span style={{marginBottom:'-8px', marginRight:'8px'}}>تغییر رمز عبور</span>
                </div>
            </li>
        </a>

        <a>
            <li 
                onClick={
                    () => {
                        Cookies.set('refresh', 0)
                        Cookies.set('access', 0) 
                        window.location.assign('/') 
                    }
                }
                className='dropdown-menu-header profileHeaderItem' style={{direction:'rtl', textAlign:'right', padding:'16px 8px'}}>
                <div className='container-fluid '>
                        <LogOut />
                        <span style={{marginBottom:'-8px', marginRight:'8px'}}>خروج از حساب کاربری</span>
                </div>
            </li>
        </a>
        <Modal
          isOpen={ChangePasswordModal}
          className='modal-dialog-centered'
          toggle={ () => { setChangePasswordModal(false) } }
          modalClassName={'modal-danger'}
        >
          <ModalBody>
            <h6>تغییر رمز عبور</h6>
            <span>رمز عبور قدیمی خود را وارد کنید!</span>
            <Input id='oldPasswordField' placeholder='رمز عبور قدیمی' type='password' className='mb-3'/>
            <span>رمز عبور جدید خود را وارد کنید!</span>
            <Input onClick={ () => (document.getElementById('newPasswordField').style.borderColor = 'rgb(200,200,200)')} id='newPasswordField' className='mb-3' placeholder='رمز عبور جدید' type='password'/>
            <span>رمز عبور انتخاب شده را دوباره وارد کنید!</span>
            <Input onClick={ () => (document.getElementById('duplicatedPasswordField').style.borderColor = 'rgb(200,200,200)')} id='duplicatedPasswordField' placeholder='تکرار رمز عبور جدید' type='password'/>
          </ModalBody>
          <ModalFooter>
            <Button color={'warning'} onClick={() => {
                setChangePasswordModal(false)
              }}>
              بازگشت
              
            </Button>
            <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={() => {
                changePassword()
            }}>
              {
                Loading ? 
                    <LoadingButton/>
                :
                'تغییر'
              }
            </Button>
          </ModalFooter>
        </Modal>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropDown
