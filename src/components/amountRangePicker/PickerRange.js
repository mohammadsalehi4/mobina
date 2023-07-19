/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react'
import { UncontrolledPopover, PopoverBody, Label, Input  } from 'reactstrap'
import './style.css'
const AmountPickerRange = (props) => {
  // ** State
  const [MinValue, SetMinValue] = useState(0)
  const [MaxValue, SetMaxValue] = useState(0)
  const [showText, SetShowText] = useState('بدون محدودیت...')
  const changeMin = () => {
    SetMinValue(document.getElementById(`GetStartAmountValue${props.usekey}`).value)
  }
  const changeMax = () => {
    SetMaxValue(document.getElementById(`GetEndAmountValue${props.usekey}`).value)
  }

  useEffect(() => {
    let text = ''

    if ((MinValue === 0 && MaxValue === 0) || (!MinValue && !MaxValue)) {
      text = "بدون محدودیت..."
      SetShowText('بدون محدودیت...')
    } else {
      if (MinValue !== 0) {
        text = `${text  } از ${MinValue} ${props.symbole}`
      }
      if (MaxValue !== 0) {
        text = `${text  }تا ${MaxValue} ${props.symbole}`
      }
    }
    SetShowText(text)
  }, [, MinValue, MaxValue])

  return (
    <Fragment style={{display:"inline-block"}} className='demo-inline-spacing'>
      <Label className='form-label' for='range-picker' >
        {props.title}
      </Label>
      <Input value={showText} trigger='legacy' color='primary' outline id='popLegacy'/>
      <UncontrolledPopover placement='top' target='popLegacy'>
        <PopoverBody>
          <Label style={{float:"right"}} className='mt-1 mb-1'>از</Label>
          <Input onChange={changeMin} id={`GetStartAmountValue${props.usekey}`} placeholder={MinValue} type='number'/>
          <Label style={{float:"right"}} className='mt-1 mb-1'>تا</Label>
          <Input onChange={changeMax} id={`GetEndAmountValue${props.usekey}`} placeholder={MaxValue} type='number'/>
        </PopoverBody>
      </UncontrolledPopover>
    </Fragment>

  )
}

export default AmountPickerRange
