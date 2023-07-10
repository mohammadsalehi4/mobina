/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable no-duplicate-imports */
// ** React Imports
import { Fragment } from 'react'
import Switch from '../../miningSwitch/switch'
// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'

const St1 = ({ stepper, type }) => {
  const States = useSelector(state => state)
  const submit = () => {
    if (document.getElementById(`name-${type}`).value !== '') {
      if (document.getElementById(`lastname-${type}`).value !== '') {
        if (document.getElementById(`code-${type}`).value !== '') {
          if (document.getElementById(`mobileNumber-${type}`).value !== '') {
            if (document.getElementById(`Email-${type}`).value !== '') {
              stepper.next()

            }
          }
        }
      }
    }
  }
  return (
    <Fragment>
      <div className='content-header'>
        <Switch options = {['حقوقی', 'حقیقی']} specialProps="miningMode"/>
      </div>
      <br/>
      <Form onSubmit={e => e.preventDefault()} style={{marginRight:"0px", marginTop:"20px"}}>
        <Row>
          <Col md='6' className='mb-1'>
            {
              States.miningMode === 0 ? 
                <Label className='form-label' for={`name-${type}`}>
                  نام رابط
                </Label> : <Label className='form-label' for={`name-${type}`}>
                  نام
                </Label>
            }

            <Input required={true} type='text' name={`name-${type}`} id={`name-${type}`} placeholder='نام...' />
          </Col>
          <Col md='6' className='mb-1'>

            {
              States.miningMode === 0 ? 
                <Label className='form-label' for={`lastname-${type}`}>
                  نام خانوادگی رابط
                </Label> 
                :             
                <Label className='form-label' for={`lastname-${type}`}>
                  نام خانوادگی
                </Label>
            }
            <Input
              type='lastname'
              name={`lastname-${type}`}
              id={`lastname-${type}`}
              placeholder='نام خانوادگی...'
              aria-label='john.doe'
              required={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`code-${type}`}>
              کد ملی
            </Label>
            <Input required={true} type='number' name={`code-${type}`} id={`code-${type}`} placeholder='1234567890' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`mobileNumber-${type}`}>
              شماره همراه
            </Label> 
            <Input
              type='number'
              name={`mobileNumber-${type}`}
              id={`mobileNumber-${type}`}
              placeholder='09121234567'
              aria-label='john.doe'
              required={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            {
              States.miningMode === 0 ? 
                <Label className='form-label' for={`Email-${type}`}>
                  ایمیل سازمان
                </Label> : <Label className='form-label' for={`Email-${type}`}>
                  ایمیل
                </Label>
            }

            <Input required={true} type='text' name={`Email-${type}`} id={`Email-${type}`} placeholder='example@example.com' />
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-3'>
        <button disabled style={{background:"#dcdcdc", color:"white", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => stepper.next()}>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowRight>
            <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
          </button>
          <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={submit}>
            <span className='align-middle d-sm-inline-block d-none'>بعدی</span>
            <ArrowLeft size={14} className='align-middle ms-sm-25 ms-0 me-1'></ArrowLeft>
          </button>
        </div>
      </Form>
    </Fragment>
  )
}

export default St1
