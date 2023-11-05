import React from 'react'
import { Alert, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col } from 'reactstrap'

const TokenInformation = (props) => {
  return (
    <Row className='match-height' style={{height:'100%'}}>
      <Col lg='12' md='12'>
        <Card style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset'}}>
          <CardImg top src={`images/${props.TokenImage}`} style={{width:'20%', margin:'20px auto 0px auto'}} alt='Card cap' />
          <CardBody style={{marginBottom:'72px'}}>
            <CardTitle tag='h4'>{props.TokenTitle}</CardTitle>
            <CardText style={{textAlign:'right'}}>
              {props.TokenDescription}
            </CardText>
          </CardBody>
          <CardBody style={{textAlign:'left', position:'absolute', left:'0px', bottom:'0px'}} className='m-0'>
            <Alert color='primary' style={{display:'inline-block'}}>
                در حال توسعه
            </Alert>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default TokenInformation
