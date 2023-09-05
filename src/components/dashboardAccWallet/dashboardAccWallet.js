/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, {useState, Fragment} from 'react'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import { Card, CardBody, Tooltip, CardText, CardHeader, CardTitle } from 'reactstrap'
import { digitsEnToFa } from 'persian-tools'
import { useSelector } from "react-redux"
import {ArrowDownCircle, ArrowUpCircle, AlertOctagon, Calendar} from 'react-feather'
function formatNumber(num) {
  num = parseFloat(num.toFixed(5))
  const parts = num.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if (parts[1]) {
      parts[1] = parts[1].replace(/0+$/, '')
  }
  return parts.join(".")
}
const DashboardAccWallet = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false)

    const renderTransactions = () => {
        const States = useSelector(state => state)
        return (
          <>
            <div className='row mt-3'>
              <div className='col-4'>
                آدرس
              </div>
              <div className='col-8' style={{ textAlign: "left" }} onClick={() => { 
                document.getElementById('transactionValue').value = `${props.data.address}` 
                document.getElementById('MainSubmitBotton').click()
              }}>
                <NiceAddress2 text={props.data.address} number={8} />
              </div>
            </div><div className='row mt-3'>
              <div className='col-4'>
                ریسک
              </div>
              <div className='col-8' style={{ textAlign: "left" }}>
                <p>{props.data.RiskScore}</p>
              </div>
            </div><div className='row'>
              <div className='col-4'>
                حجم
              </div>
              <div className='col-8' style={{ textAlign: "left" }}>
                <p style={{ direction: "ltr" }}>{digitsEnToFa(formatNumber(props.data.BTCAmount))}<small> {props.symbole}</small></p>
              </div>
            </div><div className='row'>
              <div className='col-4'>
                مالک
              </div>
              <div className='col-8' style={{ textAlign: "left" }}>
                <Fragment>
                  <ion-icon id={`ControlledExample${props.mode}`} style={{ fontSize: "25px", cursor: "pointer" }} name="eye-outline"></ion-icon>
                  <Tooltip
                    placement='top'
                    isOpen={tooltipOpen}
                    target={`ControlledExample${props.mode}`}
                    toggle={() => setTooltipOpen(!tooltipOpen)}
                  >
                    مشاهده مالک
                  </Tooltip>
                </Fragment>
              </div>
            </div>
          </>
        )
      }

    return (
      <Card className='card-transaction' id='leftCard1' style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", minHeight:"100%"}}>
        <CardHeader  style={{borderBottomStyle:"solid", borderWidth:"2px", borderColor:"rgb(240,240,240)", padding:"15px 24px"}}>
          <CardTitle tag='h4' style={{width:"100%"}}>
            {props.title}
          </CardTitle>
        </CardHeader>
        <CardBody>{renderTransactions()}</CardBody>
      </Card>
    )
}

export default DashboardAccWallet
