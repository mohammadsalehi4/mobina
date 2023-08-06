/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import {
  Input,
  Label,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'
import { useDispatch } from "react-redux"
// import DatePicker from "react-multi-date-picker"
// import persian from "react-date-object/calendars/persian"
// import persian_fa from "react-date-object/locales/persian_fa"

const TimeLimit = (props) => {

  const dispatch = useDispatch()
  
  const [min, SetMin] = useState(0)
  const [max, SetMax] = useState(0)
  const [title, SetTitle] = useState('محدوده زمانی')

  useEffect(() => {
    let text = ''
    if (min !== 0) {
      text = `${text  } از ${min} روز`
    }
    if (max !== 0) {
      text = `${text  } تا ${max} روز`
    }
    if (text === '' || (min === 0 && max === 0)) {
      text = 'محدوده زمانی'
    }
    SetTitle(text)
  }, [, min, max])

  const setMin = () => {
    SetMin(Number(document.getElementById('GetStartDayValue').value))
    dispatch({type:"SETSTARTTIME", value:min})
  }
  const setMax = () => {
    SetMax(Number(document.getElementById('GetEndDayValue').value))
    dispatch({type:"SETENDTIME", value:max})
  }
  return (
    <UncontrolledButtonDropdown id='TaxLimit' style={{float:"left", width:"100%"}}>
    <DropdownToggle color='secondary' id='TaxLimitButton' outline>
      <span  className='align-middle ms-50'>{title}</span>
    </DropdownToggle>
    <DropdownMenu style={{padding:"5px 10px"}}>
        <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
        {/* <DatePicker
            calendar={persian}
            locale={persian_fa}
            placeholder='بدون محدودیت'
            calendarPosition="bottom-right"
            style={{
              height:"40px"
            }}
        /> */}
        <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
        {/* <DatePicker
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            placeholder='بدون محدودیت'
            style={{
              height:"40px"
            }}
        /> */}

    </DropdownMenu>
  </UncontrolledButtonDropdown>

  )
}

export default TimeLimit
