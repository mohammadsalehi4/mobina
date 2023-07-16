// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Label } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'

const AmountPickerRange = () => {
  // ** State
  const [picker, setPicker] = useState('')
  return (
    <Fragment>
      <Label className='form-label' for='range-picker'>
        محدودیت حجم
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
  )
}

export default AmountPickerRange
