import React, {useEffect} from 'react'
import './switch.css'
import { useDispatch } from "react-redux"
// eslint-disable-next-line no-duplicate-imports
import { useSelector } from "react-redux"
const Switch = (props) => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        document.getElementById('option0').style.borderBottomRightRadius = "5px"
        document.getElementById('option0').style.borderTopRightRadius = "5px"
        document.getElementById(`option${props.options.length - 1}`).style.borderTopLeftRadius = "5px"
        document.getElementById(`option${props.options.length - 1}`).style.borderBottomLeftRadius = "5px"
        document.getElementById(`option${0}`).className = 'option even selected'
        dispatch({type:props.specialProps, value:0})
    }, [])

    const changeOption = (index) => {
        for (let i = 0; i < props.options.length; i++) {
            document.getElementById(`option${i}`).className = 'option even'
        }
        document.getElementById(`option${index}`).className = 'option even selected'
        dispatch({type:props.specialProps, value:index})
    }
  return (
    <div id='switch2'>
        {
            props.options.map((item, index) => {
                return (
                    <div key={index} className={`option even`} onClick={() => { changeOption(index) }} id={`option${index}`} >
                        <p>{item}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Switch