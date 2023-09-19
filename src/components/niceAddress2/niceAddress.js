/* eslint-disable no-unused-vars */
import React from 'react'
import './style.css'
import { MainSiteGreen, MainSiteLightGreen, MainSiteOrange, MainSitePurple, MainSiteRed } from '../../../public/colors'
const NiceAddress2 = (props) => {
    const text = props.text
    const firstEightChars = text.substring(0, props.number)
    const lastEightChars = text.substring(text.length - props.number)
    

    return (
        // <p>{firstEightChars + lastEightChars}</p>
        <a href={`/researcher/${props.text}`} style={{textDecoration:'none', color:'rgb(111,107,125)'}} id='niceAddress3'>
            {`${firstEightChars} `}
            <div style={{display:"inline-block"}}>
                <div style={{width:"8px", height:"8px", background:MainSiteLightGreen, borderRadius:"50%", display:"inline-block", transition:"0.1s linear"}}></div>
                <div style={{width:"8px", height:"8px", background:MainSitePurple, borderRadius:"50%", display:"inline-block", transition:"0.2s linear"}}></div>
                <div style={{width:"8px", height:"8px", background:MainSiteRed, borderRadius:"50%", display:"inline-block", transition:"0.3s linear"}}></div>
            </div>
            {` ${lastEightChars}`}
        </a>
    )
}

export default NiceAddress2