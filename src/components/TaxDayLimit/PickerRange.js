/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  UncontrolledPopover, PopoverBody, 
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap'
import './style.css'
const TaxDayLimit = (props) => {
  const [min, SetMin] = useState(0)
  const [max, SetMax] = useState(0)
  const [title, SetTitle] = useState('محدوده نگهداری')

  useEffect(() => {
    let text = ''
    if (min !== 0) {
      text = `${text  } از ${min} روز`
    }
    if (max !== 0) {
      text = `${text  } تا ${max} روز`
    }
    if (text === '' || (min === 0 && max === 0)) {
      text = 'محدوده نگهداری'
    }
    SetTitle(text)
  }, [, min, max])

  const setMin = () => {
    SetMin(Number(document.getElementById('GetStartDayValue').value))
  }
  const setMax = () => {
    SetMax(Number(document.getElementById('GetEndDayValue').value))
  }
  return (
    <UncontrolledButtonDropdown id='TaxLimit' style={{float:"left", width:"100%"}}>
    <DropdownToggle color='secondary' id='TaxLimitButton' outline>
      <span  className='align-middle ms-50'>{title}</span>
    </DropdownToggle>
    <DropdownMenu style={{padding:"5px 10px"}}>
        <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
        <Input placeholder={min} onChange={setMin} id={`GetStartDayValue`}  type='number'/>
        <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
        <Input placeholder={max}  onChange={setMax} id={`GetEndDayValue`} type='number'/>
    </DropdownMenu>
  </UncontrolledButtonDropdown>

  )
}

export default TaxDayLimit
