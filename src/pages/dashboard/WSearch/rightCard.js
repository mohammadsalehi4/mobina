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
import { MainSiteGreen, MainSiteOrange, MainSiteRed } from '../../../../public/colors'

// ** Images

const CardContentTypes = () => {
  return (
    <Fragment>
          <Card className='mt-4 mb-1' id='rightCard1'>
            <CardBody>
              <CardTitle tag='h4'>آدرس بیت کوین</CardTitle>
              <CardSubtitle className='text-muted mb-1'><ion-icon name="copy-outline"></ion-icon> sdbf,dkfisdifasdkfgasdjkgdfgf</CardSubtitle>
              <CardText id='showOwner' style={{background:MainSiteGreen}}>
                مالک
                <button style={{background:MainSiteOrange}}>نمایش مالک</button>
              </CardText>

              <button href='/' onClick={e => e.preventDefault()} id='cardLink' style={{borderColor:MainSiteOrange}} className='cardLink1'>
                نمایش <ion-icon name="git-compare-outline"></ion-icon>
              </button>
              <button href='/' onClick={e => e.preventDefault()} id='cardLink' style={{borderColor:MainSiteRed}} className='cardLink2'>
                گزارش <ion-icon name="alert-circle-outline"></ion-icon>
              </button>
            </CardBody>
          </Card>
    </Fragment>
  )
}

export default CardContentTypes
