import React, {useEffect} from 'react'
import './switch.css'
import { useDispatch } from "react-redux"
// eslint-disable-next-line no-duplicate-imports
import { useSelector } from "react-redux"

function countSpecificObjects(array, key, value) {
    return array.filter(item => item[key] === value).length
}

const TokenSwitch = (props) => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        document.getElementById('coin').style.borderBottomLeftRadius = "5px"
        document.getElementById('coin').style.borderTopLeftRadius = "5px"
        document.getElementById(`token`).style.borderTopRightRadius = "5px"
        document.getElementById(`token`).style.borderBottomRightRadius = "5px"
        document.getElementById(`coin`).className = 'option even selected'
        document.getElementById(`coin`).style.background = props.color
        document.getElementById(`coin`).style.borderColor = props.color
        dispatch({type:'TOKENTYPE', value:'coin'})
    }, [])

    const changeOption = (index) => {
        for (let i = 0; i < 2; i++) {
            document.getElementById(`coin`).className = 'option even'
            document.getElementById(`coin`).style.background = 'white'
            document.getElementById(`coin`).style.borderColor = "rgb(155, 155, 155)"

            document.getElementById(`token`).className = 'option even'
            document.getElementById(`token`).style.background = 'white'
            document.getElementById(`token`).style.borderColor = "rgb(155, 155, 155)"
        }
        document.getElementById(index).className = 'option even selected'
        document.getElementById(index).style.background = props.color
        document.getElementById(index).style.borderColor = props.color
        dispatch({type:'TOKENTYPE', value:index})
    }
  return (
    <div id='CalandarSwitch' style={{marginTop:"", minWidth:"30%", float:"left"}}>
        <div  className={`option even`} onClick={() => { changeOption('coin') }} id={`coin`} style={{minWidth:"100px"}}>
            <p>
                تراکنش‌ها 
                <span> ({countSpecificObjects(props.transactions, 'Type', 'coin')})</span>
            </p>
        </div>
        <div  className={`option even`} onClick={() => { changeOption('token') }} id={`token`} style={{minWidth:"100px"}}>
            <p>
                توکن‌ها
                <span> ({countSpecificObjects(props.transactions, 'Type', 'token')})</span>
            </p>
        </div>
    </div>
  )
}

export default TokenSwitch