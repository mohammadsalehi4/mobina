/* eslint-disable no-unused-vars */
// ** React Imports
import { Fragment, useState } from 'react'
import Switch from '../../switch/switch'
// ** Icons Imports
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import Select from 'react-select'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Label, Row, Col, Input, Form, Button } from 'reactstrap'
import MyModal from '../../../components/alertModal/Modal'
import { selectThemeColors } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
const St3 = ({ stepper, type }) => {
  const dispatch = useDispatch()
  const countryOptions = [
    { value: 'گزینه یک', label: 'گزینه یک' },
    { value: 'گزینه دو', label: 'گزینه دو' }
  ]
  const [selectedDate, setSelectedDate] = useState(null)
  const [check1, SetCheck1] = useState(false)
  const [check2, SetCheck2] = useState(true)
  const [check3, SetCheck3] = useState(false)
  const submit = () => {
    dispatch({type:"SETBASICMODAL", value:true})
  }
  return (
    <Fragment>
      <div className='content-header'>
      </div>
      <MyModal/>

      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`address-${type}`}>
              نام دستگاه
            </Label>
            <Input
              type='text'
              id={`address-${type}`}
              name={`address-${type}`}
              placeholder='نام دستگاه...'
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`landmark-${type}`}>
              تعداد
            </Label>
            <Input type='number' defaultValue={1} name={`landmark-${type}`} id={`landmark-${type}`} />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`pincode-${type}`}>
              لیست IP
            </Label>
            <Input type='text' name={`pincode-${type}`} id={`pincode-${type}`} placeholder='لیست IP...' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`city-${type}`}>
              توان هش
            </Label>
            <Input type='number' name={`city-${type}`} id={`city-${type}`} placeholder='توان هش...' />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`powerUse-${type}`}>
              برق مصرفی
            </Label>
            <Input type='number' name={`powerUse-${type}`} id={`powerUse-${type}`} placeholder='برق مصرفی...' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`inp1-${type}`}>
              استخر
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`inp1-${type}`}
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              defaultValue={countryOptions[0]}
            />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`inp2-${type}`}>
              لیست آدرس پاداش
            </Label>
            <Input type='number' name={`inp2-${type}`} id={`inp2-${type}`} placeholder='لیست آدرس پاداش' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`inp1-${type}`}>
              شبکه
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`inp1-${type}`}
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              defaultValue={countryOptions[0]}
            />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`inp3-${type}`}>
              تاریخ شروع فعالیت
            </Label>
            <Input type='date' name={`inp3-${type}`} id={`inp3-${type}`} />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`inp4-${type}`}>
              ساعت کار در ماه
            </Label>
            <Input type='number' name={`inp4-${type}`} id={`inp4-${type}`} placeholder='ساعت کار در ماه...' />
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-3'>
          <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => stepper.previous()}>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowRight>
            <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
          </button>
          <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} type='submit' className='btn-next' onClick={() => { submit() }}>
            <span className='align-middle d-sm-inline-block d-none'>اتمام</span>
            <Check size={14} className='align-middle ms-sm-25 ms-0 me-1'></Check>
          </button>
        </div>
      </Form>
    </Fragment>
  )
}

export default St3
