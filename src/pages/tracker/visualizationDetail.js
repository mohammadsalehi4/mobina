/* eslint-disable array-bracket-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import './tracker.css'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import SelectReact from '../../views/forms/form-elements/select/SelectReact'
// ** Custom Components
import CardAction from '@components/card-actions'


// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Icons Imports
import { ChevronDown, RotateCw, X } from 'react-feather'

// ** Reactstrap Imports
import { CardBody, CardText, Row, Col, Table, Label } from 'reactstrap'

// ** Icons Imports
import Select from 'react-select'
import { selectThemeColors } from '@utils'
const colourOptions = [
  { value: 'BTC', label: 'BTC' },
  { value: 'USD', label: 'USD' },
  { value: 'IRR', label: 'IRR' }
]

const VisualizationDetail = () => {
  const [ used , SetUsed] = useState(8)
  return (
    <div id="visualizationDetail">
    <Fragment>
      <Row>
        <Col md='12' sm='12'>
          <CardAction title='جزئیات نمایش' actions='collapse' >
          <CardBody className='pt-0'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <p style={{display:"inline-block", marginLeft:"20px"}}>آدرس </p>
                  <NiceAddress2 text={"asdjasdlaskdjlasjdlkasjdaslkdjlasdjl"} number={8}/>
                </div>
                <hr/>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <p style={{display:"inline-block", marginLeft:"20px"}}>تعداد آیتم ها</p>
                  <small>{used} از 200</small>
                </div>
                <hr/>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <p style={{ marginLeft:"20px"}}>تنظیمات</p>
                  <div className='row'>
                    <div className='col-md-12'>
                    <small>نمایش مقادیر</small>
                    <FormControlLabel control={<Switch defaultChecked/>} style={{float:"left"}}/>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                    <small>نمایش زمان</small>
                    <FormControlLabel control={<Switch defaultChecked />} style={{float:"left"}}/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12 mb-2'>
                      <small>نمایش بر اساس</small>
                      <div style={{float:"left", width:"100px",height:"50px"}}>
                        <Select
                          theme={selectThemeColors}
                          className='react-select'
                          classNamePrefix='select'
                          defaultValue={colourOptions[0]}
                          options={colourOptions}
                          isClearable={false}
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr/>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <p style={{display:"inline-block"}}>جهت حرکت</p>
                  <div style={{display:"inline-block", float:"left"}}>
                  <svg style={{background:"rgb(240,240,240)", padding:"2px", marginLeft:"20px", borderRadius:"5px", cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-move-right" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M11 12h10" />
                      <path d="M18 9l3 3l-3 3" />
                      <path d="M7 12a2 2 0 1 1 -4 0a2 2 0 0 1 4 0z" />
                    </svg>
                    <svg style={{background:"rgb(240,240,240)", padding:"2px", borderRadius:"5px", cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-move-left" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M13 12h-10" />
                      <path d="M6 15l-3 -3l3 -3" />
                      <path d="M17 12a2 2 0 1 1 4 0a2 2 0 0 1 -4 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </CardAction>
        </Col>
      </Row>
    </Fragment>
    </div>
    
  )
}

export default VisualizationDetail