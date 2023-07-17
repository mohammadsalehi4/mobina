/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col } from 'reactstrap'
// ** Images
import img2 from '@src/assets/images/slider/09.jpg'

const CardNews = (props) => {
  return (
    <Card id='CardNews' style={{cursor:"pointer"}}>
    <CardImg top src={img2} alt='Card cap' />
    <CardBody>
      <CardTitle tag='h4'>{props.data.title}</CardTitle>
      <p>              
        {props.data.description}
      </p>
      <Button color='primary' outline>
        ادامه
      </Button>
    </CardBody>
    </Card>

  )
}

export default CardNews