/* eslint-disable multiline-ternary */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
import { Fragment } from 'react'

import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectThemeColors } from '@utils'

import { Label, Row, Col, Form, Input, Button } from 'reactstrap'

import '@styles/react/libs/react-select/_react-select.scss'

const St2 = ({ stepper, type }) => {
  const States = useSelector(state => state)

  const countryOptions = [
    { value: 'گزینه یک', label: 'گزینه یک' },
    { value: 'گزینه دو', label: 'گزینه دو' }
  ]

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' }
  ]

  return (
    <Fragment>
      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`LicenceNumber-${type}`}>
              شماره مجوز
            </Label>
            <Input type='number' name='LicenceNumber' id={`LicenceNumber-${type}`} placeholder='شماره مجوز...' />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`last-name-${type}`}>
              شماره پروانه
            </Label>
            <Input type='text' name='last-name' id={`last-name-${type}`} placeholder='شماره پروانه' />
          </Col>
        </Row>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`country-${type}`}>
              تامین برق
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`country-${type}`}
              className='react-select'
              classNamePrefix='select'
              options={countryOptions}
              defaultValue={countryOptions[0]}
            />
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`last-name-${type}`}>
              شماره انشعاب برق
            </Label>
            <Input type='number' name='last-name' id={`last-name-${type}`} placeholder='شماره انشعاب...' />
          </Col>
        </Row>
        {
          States.miningMode === 0 ?
          <Row>
            <Col md='6' className='mb-1'>
              <Label className='form-label' for={`LicenceNumber-${type}`}>
                نام شرکت
              </Label>
              <Input type='number' name='LicenceNumber' id={`LicenceNumber-${type}`} placeholder='نام شرکت...' />
            </Col>
            <Col md='6' className='mb-1'>
              <Label className='form-label' for={`last-name-${type}`}>
                شماره ثبت شرکت
              </Label>
              <Input type='number' name='last-name' id={`last-name-${type}`} placeholder='شماره ثبت شرکت...' />
            </Col>
          </Row>
          :
          null
        }
          <Row>
            <Col md='12' className='mb-1'>
              <Label className='form-label' for={`LicenceNumber-${type}`}>
                آدرس
              </Label>
              <Input type='text' name='LicenceNumber' id={`LicenceNumber-${type}`} placeholder='آدرس...' />
            </Col>
          </Row>
          <Row>
            <Col md='6' className='mb-1'>
              <Label className='form-label' for={`LicenceNumber-${type}`}>
                کد پستی
              </Label>
              <Input type='number' name='LicenceNumber' id={`LicenceNumber-${type}`} placeholder='کد پستی...' />
            </Col>
          </Row>
        <div className='d-flex justify-content-between mt-3'>
        <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => stepper.previous()}>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowRight>
            <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
          </button>
          <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>بعدی</span>
            <ArrowLeft size={14} className='align-middle ms-sm-25 ms-0 me-1'></ArrowLeft>
          </button>
        </div>
      </Form>
    </Fragment>
  )
}

export default St2
