/* eslint-disable prefer-const */
/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {  useState, useEffect } from 'react'
import {
  Input,
  Label,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
  UncontrolledTooltip
} from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import {Filter, XCircle, X} from 'react-feather'
import { digitsEnToFa } from 'persian-tools'
import { Calendar, CalendarProvider, DatePicker } from "zaman"
import moment from 'jalali-moment'
import './style.css'


function getMyTime(millis) {
  const date = new Date(millis)

  const year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if (month > 12) {
    month  = 12
  } else if (month < 1) {
      month = 1
  }

  if (day > 31) {
      day  = 31
  } else if (day < 1) {
      day = 1
  }

  console.log({
    year,
    month,
    day,
    hour,
    minute,
    second
  })

  return {
    year,
    month,
    day,
    hour,
    minute,
    second
  }
}

function dateToMilliseconds(dateTimeStr) {
  let date = new Date(dateTimeStr)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

function convertToEndOfDayMilliseconds(dateString) {
  let date = new Date(dateString)
  date.setHours(23, 59, 59, 999)
  return date.getTime()
}


const TimeLimit = (props) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [startTime, SetStartTime] = useState(0)
  const [endTime, SetEndTime] = useState(0)
  const [startText, SetStartText] = useState('')
  const [endText, SetEndText] = useState('')
  const [Mode, SetMode] = useState('en')

  useEffect(() => {
    dispatch({type:"SETSTARTTIME", value:startTime})
    dispatch({type:"SETENDTIME", value:endTime})
  }, [startTime, endTime])

  useEffect(() => {
    if (States.starttime !== 0) {
      if (States.jalaliCalendar) {
        const first = `${getMyTime(States.starttime).year}/${Number(getMyTime(States.starttime).month) + 1}/${getMyTime(States.starttime).day}`
        SetStartText(moment(first, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
      } else {
        SetStartText(`${getMyTime(States.starttime).year}/${Number(getMyTime(States.starttime).month) + 1}/${getMyTime(States.starttime).day}`)
      }
    } else {
      SetStartText('')
    }

    if (States.endtime !== 0) {
      if (States.jalaliCalendar) {
        const first = `${getMyTime(States.endtime).year}/${Number(getMyTime(States.endtime).month) + 1}/${getMyTime(States.endtime).day}`
        SetEndText(moment(first, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
      } else {
        SetEndText(`${getMyTime(States.endtime).year}/${Number(getMyTime(States.endtime).month) + 1}/${getMyTime(States.endtime).day}`)
      }
    } else { SetEndText('') }
  }, [States.starttime, States.endtime, States.jalaliCalendar])

  useEffect(() => {
    let text = ''
    if (States.starttime === 0 && States.endtime === 0) {
      SetShowTitle(0)
    } else {
      if (States.starttime !== 0) {
        text = `${text  } از ${startText}`
      }
      if (States.endtime !== 0) {
        text = `${text  } تا ${endText}`
      }
      SetShowTitle(text)
    }
  }, [startText, endText, States.jalaliCalendar])

  useEffect(() => {
    if (States.jalaliCalendar) {
      SetMode('fa')
    } else {
      SetMode('en')
    }
  }, [States.jalaliCalendar])

  function handleToggleClick(event) {
    if (event.target.closest('.NotAlignMiddle')) {
        toggle()
    }
  }

  function handleSpanClick(event) {
      // event.stopPropagation()
  }

  const [ShowTitle, SetShowTitle] = useState(0)
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} tag='span' className='researcherLimits' id='TaxLimit'>
      <DropdownToggle onClick={(event) => (handleToggleClick(event))}  tag={'a'}  id='TaxLimitButton' >
        {
          ShowTitle === 0 ?
          <button type="button" class="btn btn-outline" style={{boxShadow:'none', borderWidth:'1px', borderStyle:'solid', borderColor:'gray'}}> <Filter size={14} style={{marginLeft:"8px"}} />محدوده زمان</button>
          :
          <>
          <button type="button" class="btn btn-outline" style={{boxShadow:'none', borderWidth:'1px', borderStyle:'solid', borderColor:'gray'}}>{digitsEnToFa(ShowTitle)}<XCircle id='DeleteTimeLimitBox22' size={14} onClick={() => (SetStartTime(0), SetEndTime(0), handleSpanClick)} className='NotAlignMiddle'  style={{marginRight:"8px"}} /></button>
            <UncontrolledTooltip placement='top' target='DeleteTimeLimitBox22'>
              حذف محدودیت زمان
            </UncontrolledTooltip>
          </>
        }
      </DropdownToggle>


      <DropdownMenu style={{padding:"5px 10px", width:"220px", height:"165px", zIndex:'1'}} >
          <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
          <Input id={`GetStartAmountValue`}  type='text' value={startText} 
            autocomplete="off"
            onClick={() => { 
              document.getElementById('fromLimitTime').style.display = 'block' 
              document.getElementById('toLimitTime').style.display = 'none' 
            }}/>
          <div id='fromLimitTime' style={{position:"absolute", display:"none"}}>
            <CalendarProvider locale={Mode}>
              <Calendar
                onChange={(date) => {
                  if (date.value !== undefined) {
                    SetStartTime(dateToMilliseconds(date.value))
                  } else {
                    SetStartTime(dateToMilliseconds(date))
                  }
                  document.getElementById('fromLimitTime').style.display = 'none'
                }}
              />
            </CalendarProvider>
          </div>
          <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
          <Input id={`GetStartAmountValue`}  type='text' value={endText} 
          autocomplete="off"
          onClick={() => {
              document.getElementById('toLimitTime').style.display = 'block' 
              document.getElementById('fromLimitTime').style.display = 'none' 
          }}/>
          <div id='toLimitTime' style={{position:"absolute", display:"none"}}>
            <CalendarProvider locale={Mode}>
              <Calendar
              size={1}
                onChange={(date) => {
                  if (date.value !== undefined) {
                    SetEndTime(convertToEndOfDayMilliseconds(date.value))
                  } else {
                    SetEndTime(convertToEndOfDayMilliseconds(date))
                  }
                  document.getElementById('toLimitTime').style.display = 'none'
                }}
              />
            </CalendarProvider>
          </div>
          <span style={{fontSize:"12px", float:"right", color:"blue", cursor:"pointer"}} className='m-1' onClick={() => { SetStartTime(0), SetEndTime(0) }}>حذف محدودیت</span>
      </DropdownMenu>
    </Dropdown>
  )
}

export default TimeLimit
