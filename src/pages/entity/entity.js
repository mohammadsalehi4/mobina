/* eslint-disable no-unused-vars */
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Entity = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:8})
    }, [])

  return (
    <div>Entity</div>
  )
}

export default Entity