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
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

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

const TrackerTimeLimit = (props) => {
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
    dispatch({type:"StartFilterTime", value:startTime})
    dispatch({type:"EndFilterTime", value:endTime})
  }, [startTime, endTime])

  useEffect(() => {
    if (States.StartFilterTime !== 0) {
      // if (States.jalaliCalendar) {
      //   const first = `${getMyTime(States.StartFilterTime).year}/${Number(getMyTime(States.StartFilterTime).month) + 1}/${getMyTime(States.StartFilterTime).day}`
      //   SetStartText(moment(first, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
      // } else {
      //   SetStartText(`${getMyTime(States.StartFilterTime).year}/${Number(getMyTime(States.StartFilterTime).month) + 1}/${getMyTime(States.StartFilterTime).day}`)
      // }
      SetStartText(`${getMyTime(States.StartFilterTime).year}/${Number(getMyTime(States.StartFilterTime).month) + 1}/${getMyTime(States.StartFilterTime).day}`)
    } else {
      SetStartText('')
    }

    if (States.EndFilterTime !== 0) {
      // if (States.jalaliCalendar) {
      //   const first = `${getMyTime(States.EndFilterTime).year}/${Number(getMyTime(States.EndFilterTime).month) + 1}/${getMyTime(States.EndFilterTime).day}`
      //   SetEndText(moment(first, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))
      // } else {
      //   SetEndText(`${getMyTime(States.EndFilterTime).year}/${Number(getMyTime(States.EndFilterTime).month) + 1}/${getMyTime(States.EndFilterTime).day}`)
      // }
      SetEndText(`${getMyTime(States.EndFilterTime).year}/${Number(getMyTime(States.EndFilterTime).month) + 1}/${getMyTime(States.EndFilterTime).day}`)
    } else { SetEndText('') }
  }, [States.StartFilterTime, States.EndFilterTime, States.jalaliCalendar])

  useEffect(() => {
    let text = ''
    if (States.StartFilterTime === 0 && States.EndFilterTime === 0) {
      SetShowTitle(0)
    } else {
      if (States.StartFilterTime !== 0 && States.EndFilterTime === 0) {
        text = `${text  } از ${startText}`
      } else if (States.StartFilterTime === 0 && States.EndFilterTime !== 0) {
        text = `${text  } تا ${endText}`
      } else {
        text = `${text  } ${startText}`
        text = `${text  } تا ${endText}`
      }

      SetShowTitle(text)
    }
  }, [startText, endText, States.jalaliCalendar])

  // useEffect(() => {
  //   if (States.jalaliCalendar) {
  //     SetMode('fa')
  //   } else {
  //     SetMode('en')
  //   }
  // }, [States.jalaliCalendar])

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
    <Dropdown  isOpen={dropdownOpen} toggle={toggle}  style={{display:'inline-block', width:'100%'}}>
      <DropdownToggle onClick={(event) => (handleToggleClick(event))} color='secondary' id='TaxLimitButton' outline style={{width:'100%', height:'40px'}}>
          <span className='align-middle' style={{direction:"ltr", fontSize:'13px'}}>
              {
                  ShowTitle === 0 ?
                      <div>
                          محدوده زمانی
                      </div>
                  :
                      <div>
                          {digitsEnToFa(ShowTitle)}
                      </div>
              }
          </span>
          {
            ShowTitle !== 0 ?
            <>
            <span onClick={() => (SetStartTime(0), SetEndTime(0), handleSpanClick)} id='DeleteTimeLimitBox' className='NotAlignMiddle' style={{ cursor:'pointer', textAlign:'center', float:"left"}}>
                <X size={15} style={{ marginTop:'2px'}} />
            </span>
            <UncontrolledTooltip placement='top' target='DeleteTimeLimitBox'>
              حذف محدودیت زمان
            </UncontrolledTooltip>
            </>

            :
            null
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
                  SetEndTime(convertToEndOfDayMilliseconds(date))
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

export default TrackerTimeLimit