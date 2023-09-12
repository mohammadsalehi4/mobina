// ** React Imports
import { Fragment } from 'react'
import { digitsEnToFa } from 'persian-tools'
import NiceAddress2 from '../../../../components/niceAddress2/niceAddress'
import {ArrowDownCircle, ArrowUpCircle, AlertOctagon, Calendar} from 'react-feather'
import './transactiondetail.css'
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  UncontrolledTooltip
} from 'reactstrap'
import { MainSiteOrange, MainSiteyellow } from '../../../../../public/colors'

// ** Images

const CardContentTypes = (props) => {
  const renderTransactions = () => {
    return (
      <div>

        <div className='row mt-3'>
          <div className='col-12'>
            <ion-icon id="copyAddressTr" name="copy-outline" style={{marginLeft:"5px", marginBottom:"-3px", cursor:"pointer"}}></ion-icon>
            <UncontrolledTooltip placement='top' target="copyAddressTr">
                کپی آدرس
              </UncontrolledTooltip>
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
          <button href='/' onClick={e => e.preventDefault()} className='cardLink225' id='cardLink15' style={{background:MainSiteOrange}}>
            انتقال به ردیابی <ion-icon name="git-compare-outline"></ion-icon>
          </button>
          <UncontrolledTooltip placement='top' target={`cardLink15`}>
                          در نسخه دمو قابل انجام نیست!
          </UncontrolledTooltip>
          <button href='/' onClick={e => e.preventDefault()} className='cardLink225' id='cardLink25' style={{background:MainSiteyellow}}>
            افزودن به پرونده <ion-icon name="alert-circle-outline"></ion-icon>
          </button>
          <UncontrolledTooltip placement='top' target={`cardLink25`}>
                          در نسخه دمو قابل انجام نیست!
          </UncontrolledTooltip>
          </div>
        </div>

      </div>
    )
  }
  return (
    <Card className='card-transaction' id='leftCard1' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", height:"100%"}}>
      <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
        <CardTitle tag='h4' style={{width:"100%"}}>
        <img src={`../images/${props.data.image}`} style={{width:"25px"}}/> تراکنش {props.data.name}  
        </CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions()}</CardBody>
    </Card>
  )
}

export default CardContentTypes
