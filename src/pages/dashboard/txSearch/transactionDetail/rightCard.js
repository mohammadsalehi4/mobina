// ** React Imports
import { Fragment } from 'react'
import './transactionDetail.css'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardImg,
  CardLink,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem
} from 'reactstrap'

// ** Images

const CardContentTypes = () => {
  return (
    <Fragment id='rightOutCard'>
          <Card className='mt-3 mb-1' id='rightCard'>
            <CardBody>
              <CardTitle tag='h4'><img src='../../images/bitcoin.png'/> تراکنش بیت کوین  </CardTitle>
              <CardSubtitle className='text-muted mb-1'><ion-icon name="copy-outline"></ion-icon> dsfasdiashasbd,bfam,sdbf,dkfisdifasdkfgasdjkgdfgf</CardSubtitle>
              <CardText>
                بلاک
              </CardText>
              <CardText id='cardBlockNumber'>
                244909
              </CardText>
              <CardLink href='/' onClick={e => e.preventDefault()} id='cardLink'>
                ترسیم گر <ion-icon name="git-compare-outline"></ion-icon>
              </CardLink>
            </CardBody>
          </Card>
    </Fragment>
  )
}

export default CardContentTypes
