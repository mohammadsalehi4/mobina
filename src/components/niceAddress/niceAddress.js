/* eslint-disable no-unused-vars */
import React from 'react'
import './style.css'
import { serverAddress } from '../../address'
import { MainSiteGreen, MainSiteLightGreen, MainSiteOrange, MainSiteRed, MainSiteyellow } from '../../../public/colors'
const NiceAddress = (props) => {
    const text = props.text
    const firstEightChars = text.substring(0, props.number)
    const lastEightChars = text.substring(text.length - props.number)
    
    if (props.text !== 'coin base') {
        return (
            <a id='niceAddress' href={`/researcher/${props.text}`} style={{textDecoration:'none', color:'rgb(111,107,125)'}}>
                {`${firstEightChars} `}
                <div style={{display:"inline-block"}}>
                    <div style={{width:"8px", height:"8px", background:MainSiteLightGreen, borderRadius:"50%", display:"inline-block", transition:"0.1s linear"}}></div>
                    <div style={{width:"8px", height:"8px", background:MainSiteGreen, borderRadius:"50%", display:"inline-block", transition:"0.2s linear"}}></div>
                    <div style={{width:"8px", height:"8px", background:MainSiteRed, borderRadius:"50%", display:"inline-block", transition:"0.3s linear"}}></div>
                </div>
                {` ${lastEightChars}`}
            </a>
        )
    } else {
        return (
            <a id='niceAddress' style={{textDecoration:'none', color:'rgb(111,107,125)'}}>
                {`${text} `}
            </a>
        )
    }

}

export default NiceAddress