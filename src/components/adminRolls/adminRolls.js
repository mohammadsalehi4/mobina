/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import MainFolderTable from '../../components/folders/mainFolderTable'
import RollsTable from './RollsTable'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
const AdminRolls = () => {
    const dispatch = useDispatch()
    const States = useSelector(state => state)
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:0})
    }, [])

  //login check
  useEffect(() => {
    try {
        const access = Cookies.get('access')
        const decoded = jwt.decode(access)
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime || !decoded || decoded === '') {
            window.location.assign('/')
        } else {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
        }
    } catch {
    }
  }, [])

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 mt-4'>
                <RollsTable/>
            </div>
        </div>
    </div>
  )
}

export default AdminRolls
