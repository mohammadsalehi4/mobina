/* eslint-disable no-unused-vars */
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody, Label } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import { Fragment, useState } from 'react'
const Amount = () => {
  return (
    <div className='demo-inline-spacing'>
    <Fragment>
      <Label className='form-label' for='range-picker'>
        بازه زمانی
      </Label>
      <Flatpickr
        value={picker}
        id='range-picker'
        className='form-control'
        placeholder='بدون محدودیت'
        onChange={date => setPicker(date)}
        options={{
          mode: 'range',
          defaultDate: ['2000-01-01', '2023-12-30']
        }}
      />
    </Fragment>
    {/* <UncontrolledPopover placement='top' target='popLegacy'>
        <PopoverHeader>Legacy Trigger</PopoverHeader>
        <PopoverBody>
          Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap
          correctly supported click and focus, it had a hybrid which was very useful and has been brought back as
          trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while
          also closing when clicking outside the triggering element and popover itself.
        </PopoverBody>
      </UncontrolledPopover> */}
    </div>
  )
}

export default Amount
