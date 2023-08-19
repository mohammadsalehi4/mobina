import React, {useEffect} from 'react'
import './switch.css'
import { useDispatch } from "react-redux"
// eslint-disable-next-line no-duplicate-imports
import { useSelector } from "react-redux"
const CalendarSwitch = (props) => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        document.getElementById('option0').style.borderBottomLeftRadius = "5px"
        document.getElementById('option0').style.borderTopLeftRadius = "5px"
        document.getElementById(`option${props.options.length - 1}`).style.borderTopRightRadius = "5px"
        document.getElementById(`option${props.options.length - 1}`).style.borderBottomRightRadius = "5px"
        document.getElementById(`option${0}`).className = 'option even selected'
        document.getElementById(`option${0}`).style.background = props.color
        document.getElementById(`option${0}`).style.borderColor = props.color
        dispatch({type:'JALALICALENDAR', value:0})
    }, [])

    const changeOption = (index) => {
        for (let i = 0; i < props.options.length; i++) {
            document.getElementById(`option${i}`).className = 'option even'
            document.getElementById(`option${i}`).style.background = 'white'
            document.getElementById(`option${i}`).style.borderColor = "rgb(155, 155, 155)"
        }
        document.getElementById(`option${index}`).className = 'option even selected'
        document.getElementById(`option${index}`).style.background = props.color
        document.getElementById(`option${index}`).style.borderColor = props.color
        dispatch({type:'JALALICALENDAR', value:index})
    }
  return (
    <div id='CalandarSwitch' style={{marginTop:"-8px", minWidth:"30%"}}>
        {
            props.options.map((item, index) => {
                return (
                    <div key={index} className={`option even`} onClick={() => { changeOption(index) }} id={`option${index}`} style={{width:"50%", minWidth:"50px"}}>
                        <p>{item}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default CalendarSwitch