/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"


const Profile = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:7})
        }, [])
        
  return (
    <div>
      
    </div>
  )
}

export default Profile
