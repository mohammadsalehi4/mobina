/* eslint-disable no-var */
/* eslint-disable semi */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux'
import './tax.css'
import { Input, Label, InputGroup, Card, Row, Col, CardHeader } from 'reactstrap'
import { MainSiteOrange } from '../../../public/colors'
import Cookies from 'js-cookie'
import DataTable from 'react-data-table-component'
import { Edit2, CreditCard, AlignRight, List } from 'react-feather'
import { Calendar } from '../../processors/Calendar'
import { JalaliCalendar } from '../../processors/jalaliCalendar'
import TaxTable from './taxTable'
import IncreaseTax from './increaseTax'
import ShowTaxResult from './showTaxResult'
import Wizard from '@components/wizard'
import ShowLastTaxes from './ShowLastTaxes'
import LoadingTax from './LoadingTax'
import { useParams } from "react-router-dom"
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import axios from 'axios'
import { serverAddress } from '../../address'
// ** Steps
const Tax = () => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const wizardRef = useRef()
  const [stepper, setStepper] = useState(null)
  const [Loading, setLoading] = useState(true)
  const { id } = useParams()
  const { state } = useParams()

  useEffect(() => {
      dispatch({type:"SHOWNAVBAR"})
      dispatch({type:"SETWITCHPAGE", value:4})
  }, [])

    const steps = [

      {
        id: 'step1',
        title: 'ورود اطلاعات',
        subtitle: 'اطلاعات کسب و کار',
        icon: <Edit2 />,
        content: <TaxTable stepper={stepper} type='wizard-modern'  style={{marginLeft:"5px"}} />
      },
      {
        id: 'step2',
        title: 'انجام محاسبات',
        subtitle: 'محاسبات تراکنش‌ها',
        icon: <Edit2 />,
        content: <LoadingTax stepper={stepper} type='wizard-modern'  style={{marginLeft:"5px"}} />
      },
      {
        id: 'step3',
        title: 'بخشش های مالیاتی',
        subtitle: 'میزان و درصد بخشش',
        icon: <CreditCard />,
        content: <IncreaseTax stepper={stepper} type='wizard-modern' />
      },
      {
        id: 'step4',
        title: 'مشاهده نتیجه',
        subtitle: 'نتیجه مالیات کسب و کار',
        icon: <AlignRight />,
        content: <ShowTaxResult stepper={stepper} type='wizard-modern' />
      }
    ]


  return (
      <div id='Tax' className='container-fluid'>
          <Row style={{}} className=''>
              <Col xl={{size:1}} lg={{size:1}} md={{size:0}}>
              </Col>

              <Col xl={{size:10}} lg={{size:10}} md={{size:12}} style={{textAlign:'center', padding:'0px', background:'none', boxShadow:'none', overflow:'revert-layer', maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto'}}  id='centerTaxBox'>
                
                <Wizard
                  type='horizonal'
                  ref={ref}
                  steps={steps}
                  options={{
                    linear: true
                  }}
                  instance={el => setStepper(el)}
                />
              </Col>


              <Col xl={{size:1}} lg={{size:1}} md={{size:0}}>
              </Col>
          </Row>
      </div>

  )
}

export default Tax