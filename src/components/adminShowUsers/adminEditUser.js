/* eslint-disable multiline-ternary */
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


const EditUser = ({ open, handleModal, Roles, number, AllRoles }) => {
  const dispatch = useDispatch()
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />
  const [showData, SetshowData] = useState([])
  const [AllData, SetAllData] = useState([])
  const [accesses, SetAccesses] = useState([])

  const submit = (event) => {
      dispatch({type:"LOADINGEFFECT", value:true})
  }

  const [showThisData, SetThisData] = useState([])

  //Errors
  const [NameErr, SetNameErr] = useState(false)
  const [NameErrText, SetNameErrText] = useState('')
  const [LastnameErr, SetLastNameErr] = useState(false)
  const [LastnameErrText, SetLastNameErrText] = useState('')
  const [EmailErr, SetEmailErr] = useState(false)
  const [EmailErrText, SetEmailErrText] = useState('')
  const [RollErr, SetRollErr] = useState(false)
  const [RollErrText, SetRollErrText] = useState('')
  const [UsernameErr, SetUsernameErr] = useState(false)
  const [UsernameErrText, SetUsernameErrText] = useState('')
  const [NumberErr, SetNumberErr] = useState(false)
  const [NumberErrText, SetNumberErrText] = useState('')

  const [inputValue, setInputValue] = useState('')
  const [inputLastValue, setInputLastValue] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [inputUsernameValue, setInputUsernameValue] = useState('')
  const [IsOpenOptionsMenu, setIsOpenOptionsMenu] = useState(false)

  const numberHandler = () => {
    const inputNumberElement = document.getElementById('AdminAddUserPhoneNumber2')
    const phoneRegex = /^09[0-9]{9}$/
    if (!(phoneRegex.test(inputNumberElement.value))) {
      SetNumberErr(true)
      SetNumberErrText('شماره مورد نظر را به درستی وارد کنید!')
    } else {
      SetNumberErr(false)
      SetNumberErrText('')
    }
  }

  const EmailHandler = () => {
    const inputEmailElement = document.getElementById('AdminAddUserEmailInput2')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!(emailRegex.test(inputEmailElement.value))) {
      SetEmailErr(true)
      SetEmailErrText('ایمیل مورد نظر را به درستی وارد کنید!')
    } else {
      SetEmailErr(false)
      SetEmailErrText('')
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value
    const persianRegex = /^[\u0600-\u06FF\s]+$/

    if (persianRegex.test(value) || value === '') {
      setInputValue(value)
      SetNameErr(false)
      SetNameErrText('')
    } else {
      SetNameErr(true)
      SetNameErrText('نام کاربر باید تنها از حروف فارسی تشکیل شده باشد!')
    }
  }

  const handleInputLastChange = (event) => {
    const value = event.target.value
    const persianRegex = /^[\u0600-\u06FF\s]+$/

    if (persianRegex.test(value) || value === '') {
      setInputLastValue(value)
      SetLastNameErr(false)
      SetLastNameErrText('')
    } else {
      SetLastNameErr(true)
      SetLastNameErrText('نام خانوادگی کاربر باید تنها از حروف فارسی تشکیل شده باشد!')
    }
  }

  const handleInputUsernameChange = (event) => {
    const value = event.target.value
    const englishRegex = /^[a-zA-Z0-9]+$/

    if (englishRegex.test(value) || value === '') {
      setInputUsernameValue(value)
      SetUsernameErr(false)
      SetUsernameErrText('')
    } else {
      SetUsernameErr(true)
      SetUsernameErrText('نام کاربری کاربر باید تنها از حروف و اعداد انگلیسی تشکیل شده باشد!')
    }
  }

  function handleSelectionChange() {
    const selectedValue = document.getElementById('Roll_select_Options2').value
    if (Number(selectedValue) === 0) {
      SetRollErr(true)
      SetRollErrText('نقش را به درستی وارد کنید.')
      setSelectedOption(null)
    } else {
      SetRollErr(false)
      setSelectedOption(String(selectedValue))
    }
  }

  //get Roles
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
        <h5 className='modal-title'>ویرایش کاربر</h5>
        <Label className='form-label' for='full-name'>
           کاربر مورد نظر خود را ویرایش کنید.
        </Label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1 mt-3'>
          <div>
            <div className='row'>
              <Label className='form-label' for='full-name' style={{ fontSize:"12px"}}>
                نام
              </Label>
              <Input  value={inputValue} type='text' style={{borderRadius:'4px', borderStyle:'solid'}} id='NameAddUserAdmin' onChange={handleInputChange}/>
              {
                NameErr ? 
                  <small style={{color:"red"}} id='NameErrTag'>
                    {NameErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                نام خانوادگی
              </Label>
              <Input value={inputLastValue} onChange={handleInputLastChange} type='text' style={{borderRadius:'4px', borderStyle:'solid'}} id='lastNameMulti'/>
              {
                LastnameErr ?
                  <small style={{color:"red" }} id='LastNameErrTag'>
                    {LastnameErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                نام کاربری
              </Label>
              <Input value={inputUsernameValue} onChange={handleInputUsernameChange} type='text' style={{borderRadius:'4px', borderStyle:'solid'}} id="AdminAddUserUsernameInput"/>
              {
                UsernameErr ?
                  <small style={{color:"red"}} id='UsernameErrTag'>
                    {UsernameErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                ایمیل
              </Label>
              <Input onBlur={EmailHandler} id="AdminAddUserEmailInput2" type='text' style={{borderRadius:'4px', borderStyle:'solid'}}/>
              {
                EmailErr ? 
                  <small style={{color:"red"}} id='EmailErrTag'>
                    {EmailErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                شماره همراه
              </Label>
              <Input onBlur={numberHandler} id='AdminAddUserPhoneNumber2' type='text' style={{borderRadius:'4px', borderStyle:'solid'}}/>
              {
                NumberErr ?
                  <small style={{color:"red"}} id='NumberErrTag'>
                    {NumberErrText}
                  </small>
                :
                  null
              }

              <Label className='form-label mt-3' for='full-name' style={{ fontSize:"12px"}}>
                نقش
              </Label>

              <select onChange={handleSelectionChange} class="form-select" id='Roll_select_Options2' aria-label="Default select example">
                <option value="0">انتخاب نقش</option>
                {
                  Rolls.map((item, index) => {
                    return (
                      <option key={index} value={`${item.id}`}>{item.name}</option>
                    )
                  })
                }
                
              </select >
              {
                RollErr ? 
                  <small style={{color:"red"}} id='RollErrTag'>
                    {RollErrText}
                  </small>
                :
                  null
              }
            </div>
          </div>
        </div>
        <div style={{textAlign:"left"}} className='mt-3'>
          <button onClick={(event) => { submit(event) }} style={{ color:"white", background:MainSiteOrange, border:"none", padding:"8px 16px", borderRadius:"8px"}} color='secondary'  outline>
            <span className='align-middle'>ویرایش کاربر</span>
          </button>
        </div>


      </ModalBody>
    </Modal>
  )
}

export default EditUser
