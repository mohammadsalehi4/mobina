/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import MainFolderTable from '../../components/folders/mainFolderTable'
import Cookies from 'js-cookie'
import axios from 'axios'
import { serverAddress } from '../../address'
import LocalLoading from '../../components/localLoading/localLoading'
const Folders = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:6})
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

  const [Loading, SetLoading] = useState(false)
  const [Data, SetData] = useState([])

  useEffect(() => {
    SetLoading(true)
    axios.get(`${serverAddress}/case/management/`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      SetLoading(false)
      SetData(response.data)
    })
    .catch((err) => {
      SetLoading(false)
      console.log(err)
    })
  }, [])

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-12 mt-4'>
                {
                    Loading ? 
                     <LocalLoading/>
                    :
                     <MainFolderTable data={Data}/>
                }
            </div>
        </div>
    </div>
  )
}

export default Folders
