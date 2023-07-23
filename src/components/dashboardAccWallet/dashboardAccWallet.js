/* eslint-disable no-unused-vars */
import React, {useState, Fragment} from 'react'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import { Card, CardBody, Tooltip, CardText } from 'reactstrap'

const DashboardAccWallet = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false)
    return (
        <div className='col-lg-6 mt-2' style={{padding:"30px"}}>
            <Card className='mb-4'>
                <CardBody>
                    <CardText>
                        <div className='row'>
                        <div className='col-12'>
                            <h6>کیف پول ورودی</h6>
                        </div>
                        </div>
                        <div className='row'>
                        <div className='col-4'>
                            آدرس
                        </div>
                        <div className='col-8' style={{textAlign:"left"}}>
                            <NiceAddress2 text={props.data.address} number={8}/>
                        </div>
                        </div>
                        <div className='row mt-3'>
                        <div className='col-4'>
                            ریسک
                        </div>
                        <div className='col-8' style={{textAlign:"left"}}>
                            <p>{props.data.RiskScore}%</p>
                        </div>
                        </div>
                        <div className='row'>
                        <div className='col-4'>
                            حجم
                        </div>
                        <div className='col-8' style={{textAlign:"left"}}>
                            <p style={{direction:"ltr"}}>{props.data.BTCAmount}<small> {props.symbole}</small></p>
                        </div>
                        </div>
                        <div className='row'>
                        <div className='col-4'>
                            مالک
                        </div>
                        <div className='col-8' style={{textAlign:"left"}}>
                        <Fragment>
                            <ion-icon id='ControlledExample' style={{fontSize:"25px", cursor:"pointer"}} name="eye-outline"></ion-icon>
                            <Tooltip
                            placement='top'
                            isOpen={tooltipOpen}
                            target='ControlledExample'
                            toggle={() => setTooltipOpen(!tooltipOpen)}
                            >
                            مشاهده مالک
                            </Tooltip>
                        </Fragment>
                        </div>
                        </div>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    )
}

export default DashboardAccWallet
