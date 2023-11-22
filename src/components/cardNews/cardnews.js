/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col } from 'reactstrap'
// ** Images
import img2 from '@src/assets/images/slider/09.jpg'

const CardNews = (props) => {
  return (
    <a style={{color:'inherit'}} href={`/reports/${props.data.id}`}>
      <Card id='CardNews' style={{cursor:"pointer"}}>
      <CardImg top  src={`${props.data.img}`} alt='Card cap' />
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
    </a>
 

  )
}

export default CardNews