import React, {useEffect, useState} from 'react'
// import { useParams } from "react-router-dom"
import './tracker.css'
import GraphDraw from '../graph/graph'
import CurrencyDetail from './CurrencyDetail'
import { useSelector, useDispatch } from "react-redux"

const Tracker = () => {
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
            <GraphDraw address="address"/>
            {
                States.showTransactionData ? <CurrencyDetail/> : null
            }
        </div>
    )
}
export default Tracker