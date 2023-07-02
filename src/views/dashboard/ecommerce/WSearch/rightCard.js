// ** React Imports
import { Fragment } from 'react'
import './walletdetail.css'
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
    <Fragment>
          <Card className='mt-4 mb-1' id='rightCard1'>
            <CardBody>
              <CardTitle tag='h4'>آدرس بیت کوین</CardTitle>
              <CardSubtitle className='text-muted mb-1'><ion-icon name="copy-outline"></ion-icon> dsfasdiashasbd,bfam,sdbf,dkfisdifasdkfgasdjkgdfgf</CardSubtitle>
              <CardText id='showOwner'>
                مالک
                <button>نمایش مالک</button>
              </CardText>

              <button href='/' onClick={e => e.preventDefault()} id='cardLink' className='cardLink1'>
                نمایش آدرس <ion-icon name="git-compare-outline"></ion-icon>
              </button>
              <button href='/' onClick={e => e.preventDefault()} id='cardLink' className='cardLink2'>
                گزارش آدرس <ion-icon name="git-compare-outline"></ion-icon>
              </button>
            </CardBody>
          </Card>
    </Fragment>
  )
}

export default CardContentTypes
