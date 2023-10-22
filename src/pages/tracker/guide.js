import React from 'react'
import { useSelector, useDispatch } from "react-redux"

const Guide = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()

  return (
    <div id='Guide'>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-help-circle" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 16v.01" />
            <path d="M12 13a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-exclamation-circle" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 9v4" />
            <path d="M12 16v.01" />
        </svg>
        <svg
            onClick={ 
                () => {
                    let scale = States.Scale
                    scale = scale * 1.1
                    dispatch({type:"Scale", value:scale})
                }
            }
        xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M9 12l6 0" />
            <path d="M12 9l0 6" />
        </svg>
        <svg 
            onClick={ 
                () => {
                    let scale = States.Scale
                    scale = scale * 0.9
                    dispatch({type:"Scale", value:scale})
                }
            }
        xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-minus" viewBox="0 0 24 24" stroke-width="1" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M9 12l6 0" />
        </svg>
    </div>
  )
}

export default Guide