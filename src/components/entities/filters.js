// ** Third Party Components
import Cleave from 'cleave.js/react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Form, Label, Input, Button, Row, Col } from 'reactstrap'

const Entityfilters = () => {
  return (
    <Card className='card-payment mt-3' style={{background:"rgb(240,240,240)", boxShadow:"none"}}>
      <CardBody>
        <Form className='form' onSubmit={e => e.preventDefault()}>
          <Row>
            <Col sm='6' className='mb-2'>
              <Label className='form-label' for='payment-expiry'>
                ریسک، %
              </Label>
              <Cleave
                className='form-control'
                placeholder='انتخاب بازه'
                options={{ date: true, delimiter: '/', datePattern: ['Y', 'm'] }}
                id='payment-expiry'
              />
            </Col>
            <Col sm='6' className='mb-2'>
              <Label className='form-label' for='payment-cvv'>
                پشتیبانی از ارز
              </Label>
              <Input type='number' placeholder='پشتیبانی از ارز' id='payment-cvv' />
            </Col>
            <Col sm='12' className='mb-2'>
              <Label className='form-label' for='payment-input-name'>
                ارز
              </Label>
              <Input placeholder='انتخاب نوع ارز' id='payment-input-name' />
            </Col>
            <Col sm='12' className='mb-2'>
              <Label className='form-label' for='payment-input-name'>
                کشور
              </Label>
              <Input placeholder='انتخاب کشور' id='payment-input-name' />
            </Col>
            <Col sm='12' className='mb-2'>
              <Label className='form-label' for='payment-input-name'>
                نوع
              </Label>
              <Input placeholder='انتخاب نوع موجودیت' id='payment-input-name' />
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default Entityfilters
