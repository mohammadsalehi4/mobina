import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const FirstPage = () => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type:"SHOWNAVBAR"})
    dispatch({type:"SETWITCHPAGE", value:9})
  }, [])

  return (
    <div>FirstPage</div>
  )
}

export default FirstPage