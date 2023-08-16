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
  UncontrolledButtonDropdown
} from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import {Filter, ChevronDown} from 'react-feather'
import { digitsEnToFa } from 'persian-tools'
const AmountLimit = (props) => {
  const States = useSelector(state => state)
	const dispatch = useDispatch()

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
      text = `${text  } اتریوم`
      SetShowTitle(text)
    }
  }, [States.startAmount, States.endAmount])

  useEffect(() => {
    dispatch({type:"SETSTARTAMOUNT", value:min})
    dispatch({type:"SETENDAMOUNT", value:max})
    if (min === 0) {
      document.getElementById('GetStartAmountValue').value = ''
    } 
    if (max === 0) {
      document.getElementById('GetEndAmountValue').value = ''
    }
  }, [min, max])

  const setMin = () => {
    SetMin(Number(document.getElementById('GetStartAmountValue').value))
  }

  const setMax = () => {
    SetMax(Number(document.getElementById('GetEndAmountValue').value))
  }

  return (
    <UncontrolledButtonDropdown id='TaxLimit' style={{float:"left", width:"100%", height:"100%"}}>
      <DropdownToggle color='secondary' id='TaxLimitButton' outline>
        <span  className='align-middle ms-50'>
          {
            ShowTitle === 0 ?
            <div>
              <Filter size={14} style={{marginLeft:"8px"}} />
              محدوده حجم
            </div>
            :
            digitsEnToFa(ShowTitle)
          }
        </span>
      </DropdownToggle>
      <DropdownMenu style={{padding:"5px 10px"}}>
          <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
          <Input placeholder={min} onChange={setMin} id={`GetStartAmountValue`}  type='number'/>
          <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
          <Input placeholder={max}  onChange={setMax} id={`GetEndAmountValue`} type='number'/>
          <span style={{fontSize:"12px", float:"right", color:"blue", cursor:"pointer"}} className='m-1' onClick={() => { SetMin(0), SetMax(0) }}>حذف محدودیت</span>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}

export default AmountLimit
