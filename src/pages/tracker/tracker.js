/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
// import { useParams } from "react-router-dom"
import './tracker.css'
// import GraphDraw from '../graph/graph'
import CurrencyDetail from './CurrencyDetail'
import TransactionDetail1 from './TransactionDetail'
import VisualizationDetail from './visualizationDetail'
import Guide from './guide'
import TopGuide from './topGuide'
import { useSelector, useDispatch } from "react-redux"

const Tracker = () => {
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:2})
      }, [])
    // const {transactionAddress} = useParams()
    const [] = useState(false)
    const States = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:2})
    }, [])
    return (
        <div id='TransactionPage'>
            <TopGuide/>
            {/* <GraphDraw address="address"/> */}
            {
                States.showWalletData ? <CurrencyDetail/> : null
            }
            {
                States.showTransactionData ? <TransactionDetail1/> : null
            }
            <VisualizationDetail/>
            <Guide/>
        </div>
    )
}
export default Tracker