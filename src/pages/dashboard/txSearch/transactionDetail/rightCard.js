// ** React Imports
import { Fragment } from 'react'
import { digitsEnToFa } from 'persian-tools'
import NiceAddress2 from '../../../../components/niceAddress2/niceAddress'
import {ArrowDownCircle, ArrowUpCircle, AlertOctagon, Calendar} from 'react-feather'
import './transactiondetail.css'
// ** Reactstrap Imports
import {
  Card,
  CardLink,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  CardSubtitle
} from 'reactstrap'
import { MainSiteOrange } from '../../../../../public/colors'

// ** Images

const CardContentTypes = (props) => {
  const renderTransactions = () => {
    return (
      <div>

        <div className='row mt-3'>
          <div className='col-12'>
            <ion-icon name="copy-outline" style={{marginLeft:"5px", marginBottom:"-3px", cursor:"pointer"}}></ion-icon>
            <NiceAddress2 text={props.data.address} number={8}/>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-12'>
              <p style={{display:"inline-block", color:"rgb(150,150,150)"}} className='transaction-title'>{'شماره بلاک'}</p>
              <div style={{direction:"ltr", textAlign:"right", marginTop:'-10px'}} className={` amountOption`}>
                {digitsEnToFa(props.data.blockNumber)}
                <AlertOctagon size={15} style={{color:"rgb(150,150,150)", marginLeft:"4px", marginTop:"-6px"}} />
              </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-12'>
              <CardLink href='/' style={{background:MainSiteOrange, color:"white", borderColor:MainSiteOrange, padding:"8px 16px", width:"50%", textAlign:"center", borderRadius:"8px"}} onClick={e => e.preventDefault()} id='cardLink'>
                ردیابی <ion-icon style={{marginBottom:"-4px"}} name="git-compare-outline"></ion-icon>
              </CardLink>
          </div>
        </div>

      </div>
    )
  }
  return (
    // <Fragment id='rightOutCard'>
    //       <Card id='rightCard' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", background:"white", minHeight:"90%"}}>
    //         <CardBody>
    //           <CardTitle tag='h4'><img src={props.data.image}/> تراکنش {props.data.name}  </CardTitle>
    //           <CardSubtitle className='text-muted mb-1'><ion-icon name="copy-outline" style={{marginLeft:"5px", marginBottom:"-3px"}}></ion-icon>
    //             <NiceAddress2 text={props.data.address} number={8}/>
    //           </CardSubtitle>
    //           <CardText>
    //             بلاک
    //           </CardText>
    //           <CardText id='cardBlockNumber'>
    //             {digitsEnToFa(props.data.blockNumber)}
    //           </CardText>
    //           <CardLink href='/' style={{background:MainSiteOrange, color:"white", borderColor:MainSiteOrange}} onClick={e => e.preventDefault()} id='cardLink'>
    //             ردیابی <ion-icon name="git-compare-outline"></ion-icon>
    //           </CardLink>
    //         </CardBody>
    //       </Card>
    // </Fragment>
    <Card className='card-transaction' id='leftCard1' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", height:"100%"}}>
      <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
        <CardTitle tag='h4' style={{width:"100%"}}>
        <img src={props.data.image} style={{width:"25px"}}/> تراکنش {props.data.name}  
        </CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardContentTypes
