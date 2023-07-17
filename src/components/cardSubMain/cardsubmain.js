/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col } from 'reactstrap'
// ** Images
import img2 from '@src/assets/images/slider/03.jpg'

const CardSubMain = (props) => {
  return (
    <div id='cardSubMain' className='container-fluid' style={{ width:"100%"}}>
        <div className='row'>
            <div className='col-6'>
                <CardImg src={img2} style={{width:"100%", borderRadius:"5px"}} />
            </div>
            <div className='col-6 p-2'>
                <h6>
                    {props.data.title}
                </h6>
                <small style={{display:"block"}}>              
                    {props.data.description}
                </small>
            </div>
        </div>
    </div>

  )
}

export default CardSubMain
