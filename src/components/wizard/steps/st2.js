/* eslint-disable multiline-ternary */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect } from 'react'

import Select from 'react-select'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { selectThemeColors } from '@utils'

import { Label, Row, Col, Form, Input, Button } from 'reactstrap'

import '@styles/react/libs/react-select/_react-select.scss'

const St2 = ({ stepper, type }) => {
  const States = useSelector(state => state)

  useEffect(() => {
    
  }, [])

  return (
    <Fragment>
      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Col xl={4} md={6}>

          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-3'>
        <button style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => stepper.previous()}>
            <ArrowRight size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowRight>
            <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
          </button>
          <button style={{background:"#01153a", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => stepper.next()}>
            <span className='align-middle d-sm-inline-block d-none'>بعدی</span>
            <ArrowLeft size={14} className='align-middle ms-sm-25 ms-0 me-1'></ArrowLeft>
          </button>
        </div>
      </Form>
    </Fragment>
  )
}

export default St2
