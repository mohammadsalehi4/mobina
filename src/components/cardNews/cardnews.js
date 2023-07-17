/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col } from 'reactstrap'
// ** Images
import img2 from '@src/assets/images/slider/09.jpg'

const CardNews = () => {
  return (
    <Card id='CardNews' style={{cursor:"pointer"}}>
    <CardImg top src={img2} alt='Card cap' />
    <CardBody>
      <CardTitle tag='h4'>عنوان خبر</CardTitle>
      <p>
        این یک متن چند جمله ای جهت نمایش بخش گزارش های پنل است.
        در این قسمت یک توضیح دو یا سه جمله ای درباره خبر مورد نظر قرار می گیرد.
      </p>
      <Button color='primary' outline>
        ادامه
      </Button>
    </CardBody>
    </Card>

  )
}

export default CardNews