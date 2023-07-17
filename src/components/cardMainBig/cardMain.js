/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col } from 'reactstrap'
// ** Images
import img1 from '@src/assets/images/slider/04.jpg'
import img2 from '@src/assets/images/slider/03.jpg'
const CardMain = () => {
  return (
    <div id='cardMain' style={{background:"white", width:"100%"}}>
        <CardImg src={img1} style={{height:"33%", borderRadius:"10px"}} />
        <CardBody className='p-3'>
            <h5>عنوان خبر</h5>
            <p>
                در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود.
                این یک متن تستی جهت نمایش بلاگ است.
            </p>
            <Button className='mt-2 mb-3' style={{float:"left"}} outline>مشاهده خبر</Button>
        </CardBody>
    </div>

  )
}

export default CardMain
