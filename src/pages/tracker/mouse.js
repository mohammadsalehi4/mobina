/* eslint-disable no-tabs */
import React from 'react'
import { MousePointer, Move, DownloadCloud } from 'react-feather'
import { useSelector, useDispatch } from "react-redux"

const Mouse = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()
    
  return (
    <div id='Mouse'>
        <MousePointer
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
        <Move
        
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
        <DownloadCloud 
                style={{
                    marginLeft:'12px'
                }}

                onClick={ 
                    () => {
                        if (States.downloadGraph !== null) {
                            dispatch({type:"downloadGraph", value:!States.downloadGraph})
                        } else {
                            dispatch({type:"downloadGraph", value:false})
                        }
                    }
                }
        />
    </div>
  )
}

export default Mouse
