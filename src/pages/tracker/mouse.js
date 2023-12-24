/* eslint-disable no-tabs */
import React from 'react'
import { MousePointer, Paperclip } from 'react-feather'
import { useSelector, useDispatch } from "react-redux"

const Mouse = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()
    
  return (
    <div id='Mouse'>
        <Paperclip
            size={12}
            style={{
                fontWeight:'100'
            }}
            stroke={
                States.mouseMode ? 'black' : 'gray'
            }
            onClick={ 
                () => {
                    dispatch({type:"mouseMode", value:true})
                }
            }
        />
        <MousePointer
            style={{
                marginLeft:'12px'
            }}
            stroke={
                 !States.mouseMode ? 'black' : 'gray'
            }
            onClick={ 
                () => {
                    dispatch({type:"mouseMode", value:false})
                }
            }
        />
    </div>
  )
}

export default Mouse
