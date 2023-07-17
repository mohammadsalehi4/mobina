/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col } from 'reactstrap'
// ** Images
import img2 from '@src/assets/images/slider/03.jpg'

const CardSubMain = () => {
  return (
    <div id='cardSubMain' className='container-fluid' style={{ width:"100%"}}>
        <div className='row'>
            <div className='col-6'>
                <CardImg src={img2} style={{width:"100%", borderRadius:"5px"}} />
            </div>
            <div className='col-6 p-2'>
                <h6>
                    عنوان خبر
                </h6>
                <small style={{display:"block"}}>
                    در این بخش یک توضیح کوتاه چند جمله ای درباره خبر انجام می شود.
                    این یک متن تستی جهت نمایش بلاگ است.
                </small>
            </div>
        </div>
    </div>

  )
}

export default CardSubMain
