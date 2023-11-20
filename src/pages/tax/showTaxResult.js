/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import './tax.css'
import { Card, CardHeader, Row, CardBody, Col } from 'reactstrap'
import { Input, Label, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import { WriteNumber } from '../../processors/PersianWriteNumber'
import CountedTaxTable from './CountedTaxTable'
const ShowTaxResult = ({ stepper }) => {
  return (
        <Card className='m-0 ' style={{boxShadow:'none', maxWidth:'100%'}} id='ShowTaxResult'>
            <CardHeader style={{ margin:'0px', paddingBottom:'0px', paddingTop:'16px'}}>
                <h5>بخشش های مالیاتی</h5>
            </CardHeader>
            <CardBody style={{textAlign:'left', boxShadow:'none'}}>
                <Row>
                    <Col xl='6' className='mt-3' style={{textAlign:'right'}}>
                        <Label for='TaxCount'>مبلغ قابل پرداخت (ریال)</Label>
                        <Input id='TaxCount' placeholder='نام کسب و کار' disabled value={WriteNumber(45000000)}/>
                    </Col>
                    <Col xl='6' className='mt-3' style={{textAlign:'left'}}>
                        <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => {
                            
                            }}>
                            <span className='align-middle d-sm-inline-block d-none'>دریافت</span>
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col className='mt-3' style={{textAlign:'right'}}>
                        <CountedTaxTable/>
                    </Col>

                </Row>

            </CardBody>
    
        </Card>
  )
}

export default ShowTaxResult
