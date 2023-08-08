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
import { useDispatch } from "react-redux"
import {Filter, ChevronDown} from 'react-feather'
const AmountLimit = (props) => {

	const dispatch = useDispatch()

  const [min, SetMin] = useState(0)
  const [max, SetMax] = useState(0)
  const [title, SetTitle] = useState('محدوده حجمی')
  
  useEffect(() => {
    let text = ''
    if (min !== 0) {
      text = `${text  } از ${min} ETH`
    }
    if (max !== 0) {
      text = `${text  } تا ${max} ETH`
    }
    if (text === '' || (min === 0 && max === 0)) {
      text = 'محدوده حجمی'
    }
    SetTitle(text)
  }, [, min, max])

  const setMin = () => {
    SetMin(Number(document.getElementById('GetStartAmountValue').value))
    dispatch({type:"SETSTARTAMOUNT", value:min})
  }
  const setMax = () => {
    SetMax(Number(document.getElementById('GetEndAmountValue').value))
    dispatch({type:"SETENDAMOUNT", value:max})
  }
  return (
    <UncontrolledButtonDropdown id='TaxLimit' style={{float:"left", width:"100%"}}>
    <DropdownToggle color='secondary' id='TaxLimitButton' outline>
      <span  className='align-middle ms-50'>
        <Filter size={14} style={{marginLeft:"8px"}} />
        {title}
        <ChevronDown size={15} style={{marginRight:"8px"}} />
      </span>
    </DropdownToggle>
    <DropdownMenu style={{padding:"5px 10px"}}>
        <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
        <Input placeholder={min} onChange={setMin} id={`GetStartAmountValue`}  type='number'/>
        <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
        <Input placeholder={max}  onChange={setMax} id={`GetEndAmountValue`} type='number'/>
    </DropdownMenu>
  </UncontrolledButtonDropdown>

  )
}

export default AmountLimit
