// ** React Imports
import { Fragment } from 'react'
import { digitsEnToFa } from 'persian-tools'
import NiceAddress2 from '../../../../components/niceAddress2/niceAddress'
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
              <CardSubtitle className='text-muted mb-1'><ion-icon name="copy-outline" style={{marginLeft:"5px", marginBottom:"-3px"}}></ion-icon>
                <NiceAddress2 text={props.data.address} number={8}/>
              </CardSubtitle>
              <CardText>
                بلاک
              </CardText>
              <CardText id='cardBlockNumber'>
                {digitsEnToFa(props.data.blockNumber)}
              </CardText>
              <CardLink href='/' style={{background:MainSiteOrange, color:"white", borderColor:MainSiteOrange}} onClick={e => e.preventDefault()} id='cardLink'>
                ردیابی <ion-icon name="git-compare-outline"></ion-icon>
              </CardLink>
            </CardBody>
          </Card>
    </Fragment>
  )
}

export default CardContentTypes
