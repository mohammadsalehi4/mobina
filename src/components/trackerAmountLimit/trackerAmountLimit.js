/* eslint-disable array-bracket-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable no-use-before-define */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-tabs */
/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import {
  Input,
  Label,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
  Dropdown
} from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import {Filter, XCircle, X} from 'react-feather'
import { digitsEnToFa } from 'persian-tools'

const TrackerAmountLimit = (props) => {
  const States = useSelector(state => state)
	const dispatch = useDispatch()
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  const [min, SetMin] = useState(0)
  const [max, SetMax] = useState(0)
  const [ShowTitle, SetShowTitle] = useState(0)

  useEffect(() => {
    let text = ''
    if (States.StartFilterAmount === 0 && States.EndFilterAmount === 0) {
      SetShowTitle(0)
    } else {
      if (States.StartFilterAmount !== 0) {
        text = `${text  } از ${States.StartFilterAmount}`
      }
      if (States.EndFilterAmount !== 0) {
        text = `${text  } تا ${States.EndFilterAmount}`
      }
      text = `${text  } واحد`
      SetShowTitle(text)
    }
  }, [States.StartFilterAmount, States.EndFilterAmount])

  useEffect(() => {
    dispatch({type:"StartFilterAmount", value:min})
    dispatch({type:"EndFilterAmount", value:max})
    if (min === 0) {
      document.getElementById('StartAmountValue').value = ''
    } 
    if (max === 0) {
      document.getElementById('EndAmountValue').value = ''
    }
  }, [min, max])

  const setMin = () => {
    SetMin(Number(document.getElementById('StartAmountValue').value))
  }

  const setMax = () => {
    SetMax(Number(document.getElementById('EndAmountValue').value))
  }

  function handleToggleClick(event) {
    if (event.target.closest('.NotAlignMiddle')) {
        toggle()
    }
  }

  function handleSpanClick(event) {
      // event.stopPropagation()
  }

  const SetAllInputOutput = (event) => {
    const modeValue = (event.target.value)
    dispatch({type:"All_Input_Output", value:modeValue})
  }

  const [optionChecked, SetoptionChecked] = useState(0)
  useEffect(() => {
    console.log('States.All_Input_Output')
    console.log(States.All_Input_Output)
    if (Number(States.All_Input_Output) === 0) {
      SetoptionChecked(0)
    } else if (Number(States.All_Input_Output) === 1) {
      SetoptionChecked(1)
    } else if (Number(States.All_Input_Output) === 2) {
      SetoptionChecked(2)
    }
  }, [ ,States.All_Input_Output])


  return (
    <Dropdown  isOpen={dropdownOpen} toggle={toggle}  style={{display:'inline-block', width:'100%'}}>
      <DropdownToggle onClick={(event) => (handleToggleClick(event))} color='secondary' id='TaxLimitButton' outline style={{width:'100%'}}>
        <span style={{direction:"ltr", fontSize:'13px'}} className='align-middle ms-50'>
          {
            ShowTitle === 0 ?
              <div style={{display:'inline-block'}}>
                محدوده حجم
              </div>
            :
              <div>
                {digitsEnToFa(ShowTitle)}
              </div>
          }
        </span>
        <span onClick={() => (SetMin(0), SetMax(0), handleSpanClick)} id='DeleteTimeLimitBox2' className='NotAlignMiddle' style={{ cursor:'pointer', textAlign:'center', float:"left", padding:'0px'}}>
              <X size={15} style={{ marginTop:'2px'}} />
          </span>
      </DropdownToggle>
      <UncontrolledTooltip placement='top' target='DeleteTimeLimitBox2'>
        حذف محدودیت حجم
      </UncontrolledTooltip>
      <DropdownMenu style={{padding:"5px 10px", zIndex:'1'}}>
          <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
          <Input placeholder={min} onChange={setMin} id={`StartAmountValue`}  type='number'/>
          <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
          <Input placeholder={max}  onChange={setMax} id={`EndAmountValue`} type='number'/>
          <div style={{display:'block', float:'right'}} className='mt-2'>
          <div>
            <Label>
              <Input
                type="radio"
                value={0}
                name="options"
                className='ms-1'
                id='graphShowAllOption'
                defaultChecked = {optionChecked === 0}
                onChange={SetAllInputOutput}
              />
              همه
            </Label>

            <Label className='me-2' style={{color:'green'}}>
              <Input
                type="radio"
                value={1}
                name="options"
                className='ms-1'
                id='graphShowInputOption'
                defaultChecked = {optionChecked === 1}
                onChange={SetAllInputOutput}
              />
              ورودی
            </Label>

            <Label className='me-2' style={{color:'red'}}>
              <Input
                type="radio"
                value={2}
                className='ms-1'
                name="options"
                id='graphShowOutputOption'
                defaultChecked = {optionChecked === 2}
                onChange={SetAllInputOutput}
              />
              خروجی
            </Label>
          </div>
        </div>
        <span style={{fontSize:"12px", float:"right", color:"#2f4f4f", cursor:"pointer", display:'block'}} className='m-1' onClick={() => { SetMin(0), SetMax(0) }}>حذف محدودیت</span>

      </DropdownMenu>
    </Dropdown>
  )
}

export default TrackerAmountLimit