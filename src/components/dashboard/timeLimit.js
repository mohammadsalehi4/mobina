/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import {  useState, useEffect } from 'react'
import {
  Input,
  Label,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import {Filter, ChevronDown} from 'react-feather'
import { digitsEnToFa } from 'persian-tools'
import { Calendar, CalendarProvider, DatePicker } from "zaman"
import moment from 'jalali-moment'
import './style.css'


const getMyTime = (index) => {
  const date = new Date(index)
  let month
  let day
  let hour
  let minute

  if (String(Number(date.getMonth())).length === 1) {
    month = `0${date.getMonth()}`
  } else {
    month = date.getMonth()
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

function dateToMilliseconds(dateTimeStr) {
  const date = new Date(dateTimeStr)
  return date.getTime()
}

const TimeLimit = (props) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()

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

  const [ShowTitle, SetShowTitle] = useState(0)
  return (
    <UncontrolledButtonDropdown id='TaxLimit' style={{float:"left", width:"100%", height:"100%"}}>
      <DropdownToggle color='secondary' id='TaxLimitButton' outline>
        <span  className='align-middle' style={{direction:"ltr"}}>
          {
            ShowTitle === 0 ?
              <div>
                <Filter size={14} style={{marginLeft:"8px"}} />
                محدوده زمانی
              </div>
            :
            digitsEnToFa(ShowTitle)
          }
        </span>
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
                  SetStartTime(dateToMilliseconds(date))
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
                  SetEndTime(dateToMilliseconds(date))
                  document.getElementById('toLimitTime').style.display = 'none'
                }}
              />
            </CalendarProvider>
          </div>

          <span style={{fontSize:"12px", float:"right", color:"blue", cursor:"pointer"}} className='m-1' onClick={() => { SetStartTime(0), SetEndTime(0) }}>حذف محدودیت</span>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}

export default TimeLimit
