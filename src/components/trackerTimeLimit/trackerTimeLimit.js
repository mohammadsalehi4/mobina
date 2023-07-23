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
const TrackerTimeLimit = (props) => {

  return (
    <UncontrolledButtonDropdown id='TaxLimit' style={{float:"left", width:"100%"}}>
      <DropdownToggle color='secondary' id='TaxLimitButton' outline>
        <span className='align-middle ms-50'>محدوده زمانی</span>
      </DropdownToggle>
      <DropdownMenu style={{padding:"5px 10px"}}>
        <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
        <Input  id={`AmountGetStartAmountValue`}  type='date'/>
        <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
        <Input  id={`AmountGetEndAmountValue`} type='date'/>
      </DropdownMenu>
    </UncontrolledButtonDropdown>

  )
}

export default TrackerTimeLimit