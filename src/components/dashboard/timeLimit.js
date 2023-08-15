/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import {
  Input,
  Label,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import {Filter, ChevronDown} from 'react-feather'

// import DatePicker from "react-multi-date-picker"
// import persian from "react-date-object/calendars/persian"
// import persian_fa from "react-date-object/locales/persian_fa"

const TimeLimit = (props) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  
  const [min, SetMin] = useState(0)
  const [max, SetMax] = useState(0)
  const [StartPlaceHolder, SetStartPlaceHolder] = useState('0')
  const [EndPlaceHolder, SetEndPlaceHolder] = useState('0')
  const [ShowTitle, SetShowTitle] = useState(0)

  useEffect(() => {
    if (States.starttime === 0 && States.endtime === 0) {
      SetShowTitle(0)
    } else {
      let text = ''
      if (States.starttime !== 0) {
        text = (`${getMyTime(States.starttime).day}/${getMyTime(States.starttime).month}/${getMyTime(States.starttime).year}`)
      }
      if (States.endtime !== 0) {
        text = ` ${ text  } تا ${getMyTime(States.endtime).day}/${getMyTime(States.endtime).month}/${getMyTime(States.endtime).year} `
      } else {
        text = `از ${ text  }`
      }
      SetShowTitle(text)
    }
  }, [States.starttime, States.endtime])

  const getMyTime = (index) => {
    const date = new Date(index)
    let month
    let day
    let hour
    let minute

    if (String(Number(date.getMonth()) + 1).length === 1) {
      month = `0${date.getMonth() + 1}`
    } else {
      month = date.getMonth() + 1
    }

    if (String(date.getDate()).length === 1) {
      day = `0${date.getDate()}`
    } else {
      day = date.getDate()
    }

    if (String(date.getHours()).length === 1) {
      hour = `0${date.getHours()}`
    } else {
      hour = date.getHours()
    }

    if (String(date.getMinutes()).length === 1) {
      minute = `0${date.getMinutes()}`
    } else {
      minute = date.getMinutes()
    }

    return ({
      year:date.getFullYear(),
      month,
      day,
      hour,
      minute
    })
  }

  useEffect(() => {
    const StartDate = Date.parse(new Date(min))
    const EndDate = Date.parse(new Date(max))
    dispatch({type:"SETSTARTTIME", value:StartDate})
    dispatch({type:"SETENDTIME", value:EndDate})
  }, [min, max])

  const setMin = () => {
    SetMin((document.getElementById('GetStartTimeValue').value))
  }
  const setMax = () => {
    SetMax((document.getElementById('GetEndTimeValue').value))
  }

  useEffect(() => {
    if (States.starttime === 0) {
      SetStartPlaceHolder('0')
    } else {
      SetStartPlaceHolder(`${getMyTime(States.starttime).year}-${getMyTime(States.starttime).month}-${getMyTime(States.starttime).day}`)
    }

    if (States.endtime === 0) {
      SetEndPlaceHolder('0')
    } else {
      SetEndPlaceHolder(`${getMyTime(States.endtime).year}-${getMyTime(States.endtime).month}-${getMyTime(States.endtime).day}`)
    }
  }, [States.starttime, States.endtime])

  return (
    <UncontrolledButtonDropdown id='TaxLimit' style={{float:"left", width:"100%"}}>
    <DropdownToggle color='secondary' id='TaxLimitButton' outline>
      <span  className='align-middle'>
        {
          ShowTitle === 0 ?
            <div>
              <Filter size={14} style={{marginLeft:"8px"}} />
                محدوده زمانی
            </div>
          :
            ShowTitle
        }
      </span>
    </DropdownToggle>
    <DropdownMenu style={{padding:"5px 10px"}}>
        <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
        <Input style={{width:"100%"}} defaultValue={StartPlaceHolder} onChange={setMin} id={`GetStartTimeValue`} type='date'/>
        <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
        <Input style={{width:"100%"}}  defaultValue={EndPlaceHolder} onChange={setMax} id={`GetEndTimeValue`} type='date'/>
        <span style={{fontSize:"12px", float:"right", color:"blue", cursor:"pointer"}} className='m-1' onClick={() => { SetMin(0), SetMax(0) }}>حذف محدودیت</span>
    </DropdownMenu>
  </UncontrolledButtonDropdown>

  )
}

export default TimeLimit
