// ** React Imports
import { Fragment } from 'react'
import { digitsEnToFa } from 'persian-tools'
import './transactionDetail.css'
// ** Reactstrap Imports
import {
  Card,
  CardLink,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle
} from 'reactstrap'
import { MainSiteOrange } from '../../../../../public/colors'

// ** Images

const CardContentTypes = (props) => {
  return (
    <Fragment id='rightOutCard'>
          <Card className='mt-3 mb-1' id='rightCard'>
            <CardBody>
              <CardTitle tag='h4'><img src='../../images/bitcoin.png'/> تراکنش بیت کوین  </CardTitle>
              <CardSubtitle className='text-muted mb-1'><ion-icon name="copy-outline"></ion-icon>{props.data.address}</CardSubtitle>
              <CardText>
                بلاک
              </CardText>
              <CardText id='cardBlockNumber'>
                {digitsEnToFa(props.data.blockNumber)}
              </CardText>
              <CardLink href='/' style={{background:MainSiteOrange, color:"white", borderColor:MainSiteOrange}} onClick={e => e.preventDefault()} id='cardLink'>
                ترسیم گر <ion-icon name="git-compare-outline"></ion-icon>
              </CardLink>
            </CardBody>
          </Card>
    </Fragment>
  )
}

export default CardContentTypes
