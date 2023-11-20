/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import './tax.css'
import { Card, CardHeader, Row, CardBody, Col } from 'reactstrap'
import { Input, Label, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import { WriteNumber } from '../../processors/PersianWriteNumber'

const IncreaseTax = ({ stepper }) => {
  return (
    <Card className='m-0 ' style={{boxShadow:'none'}}>
        <CardHeader style={{ margin:'0px', paddingBottom:'0px', paddingTop:'16px'}}>
            <h5>بخشش های مالیاتی</h5>
        </CardHeader>
        <CardBody style={{textAlign:'left', boxShadow:'none'}}>
            <Row>
                <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
                    <Label for='TaxCount'>مالیات محاسبه شده (ریال)</Label>
                    <Input id='TaxCount' placeholder='نام کسب و کار' disabled value={WriteNumber(45000000)}/>
                </Col>
            </Row>
            <Row>
                <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
                    <Label for='percent'>درصد بخشش (درصد)</Label>
                    <Input id='percent' placeholder='درصد' />
                </Col>
                <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
                    <Label for='IncAmount'>مبلغ بخشش (ریال)</Label>
                    <Input id='IncAmount' placeholder='ریال' />
                </Col>
            </Row>
            <Row>
                <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
                    <Label for='finalTax'>مالیات نهایی</Label>
                    <Input id='finalTax' placeholder='درصد' value={WriteNumber(40000000)} disabled/>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col>
                    <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px", float:'right'}} className='btn-next' onClick={() => {
                        stepper.previous()
                        }}>
                        <ArrowRight size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowRight>
                        <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
                    </button>
                    <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => {
                        stepper.next()
                        }}>
                        <span className='align-middle d-sm-inline-block d-none'>بعدی</span>
                        <ArrowLeft size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowLeft>
                    </button>
                </Col>
            </Row>
        </CardBody>

    </Card>
  )
}

export default IncreaseTax
