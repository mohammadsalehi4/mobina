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
const AmountLimit = (props) => {
  const States = useSelector(state => state)
	const dispatch = useDispatch()
  const toggle = () => setDropdownOpen(prevState => !prevState)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  const [min, SetMin] = useState(0)
  const [max, SetMax] = useState(0)
  const [ShowTitle, SetShowTitle] = useState(0)

  useEffect(() => {
    let text = ''
    if (States.startAmount === 0 && States.endAmount === 0) {
      SetShowTitle(0)
    } else {
      if (States.startAmount !== 0) {
        text = `${text  } از ${States.startAmount}`
      }
      if (States.endAmount !== 0) {
        text = `${text  } تا ${States.endAmount}`
      }
      text = `${text  } واحد`
      SetShowTitle(text)
    }
  }, [States.startAmount, States.endAmount])

  useEffect(() => {
    dispatch({type:"SETSTARTAMOUNT", value:min})
    dispatch({type:"SETENDAMOUNT", value:max})
    if (min === 0) {
      document.getElementById('GetStartAmountValue1').value = ''
    } 
    if (max === 0) {
      document.getElementById('GetEndAmountValue1').value = ''
    }
  }, [min, max])

  const setMin = () => {
    SetMin(Number(document.getElementById('GetStartAmountValue1').value))
  }

  const setMax = () => {
    SetMax(Number(document.getElementById('GetEndAmountValue1').value))
  }

  function handleToggleClick(event) {
    if (event.target.closest('.NotAlignMiddle')) {
        toggle()
    }
  }

  function handleSpanClick(event) {
      // event.stopPropagation()
  }

  return (
    <Dropdown  isOpen={dropdownOpen} toggle={toggle} id='TaxLimit' className='researcherLimits ResearcherAmountLimit' style={{display:'inline-block'}}>
      <DropdownToggle onClick={(event) => (handleToggleClick(event))} color='secondary' id='TaxLimitButton' outline>
        <span  className='align-middle ms-50'>
          {
            ShowTitle === 0 ?
              <div style={{display:'inline-block'}}>
                <Filter size={14} style={{marginLeft:"8px"}} />
                محدوده حجم
              </div>
            :
              <div>
                {digitsEnToFa(ShowTitle)}
              </div>
          }
        </span>
        <span onClick={() => (SetMin(0), SetMax(0), handleSpanClick)} id='DeleteTimeLimitBox2' className='NotAlignMiddle' style={{ cursor:'pointer', textAlign:'center', float:"left"}}>
              <X size={15} style={{ marginTop:'2px'}} />
          </span>
      </DropdownToggle>
      <UncontrolledTooltip placement='top' target='DeleteTimeLimitBox2'>
        حذف محدودیت حجم
      </UncontrolledTooltip>
      <DropdownMenu style={{padding:"5px 10px", zIndex:'1'}}>
          <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
          <Input placeholder={min} onChange={setMin} id={`GetStartAmountValue1`}  type='number'/>
          <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
          <Input placeholder={max}  onChange={setMax} id={`GetEndAmountValue1`} type='number'/>
          <span style={{fontSize:"12px", float:"right", color:"blue", cursor:"pointer"}} className='m-1' onClick={() => { SetMin(0), SetMax(0) }}>حذف محدودیت</span>
      </DropdownMenu>
    </Dropdown>
  )
}

export default AmountLimit
