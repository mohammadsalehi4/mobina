/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import MainFolderTable from '../../components/folders/mainFolderTable'
import Cookies from 'js-cookie'

const Folders = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:6})
    }, [])

    useEffect(() => {
        try {
          const access = Cookies.get('access')
          const decoded = jwt.decode(access)
          const currentTime = Date.now() / 1000
          if (decoded.exp > currentTime) {
          } else {
            window.location.assign('/')
          }
        } catch {
          window.location.assign('/')
        }
      }, [])

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 mt-4'>
                <MainFolderTable/>
            </div>
        </div>
    </div>
  )
}

export default Folders
