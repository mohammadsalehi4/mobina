/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import Cases from './cases'
import Settings from './settings'
import Notes from './notes'
import Addresses from './addresses'
import Transactions from './transactions'
import Visualizations from './visualizations'
import Trackings from './trackings'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { serverAddress } from '../../../address'
import LocalLoading from '../../localLoading/localLoading'
const SingleCase = () => {
    const dispatch = useDispatch()

    const { uuid } = useParams()

    const [Data, SetData] = useState(null)
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

  useEffect(() => {
    axios.get(`${serverAddress}/case/management/${uuid}`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
        SetData(response.data)
        console.log('response.data')
        console.log(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
      
  return (
        Data !== null ? 
        <div className='container-fluid mt-2'
        style={{
            textAlign: 'center', 
            maxWidth: '1280px', 
            marginLeft: 'auto', 
            marginRight: 'auto'
          }}
        >
    
            <div className='row' style={{textAlign:'right'}}>
                <div className='col-xl-6 mt-3'>
                    <Cases Data={Data}/>
                </div>
                <div className='col-xl-6 mt-3'>
                    <Notes Data={Data}/>
                </div>
            </div>
            <div className='row' style={{textAlign:'right'}}>
                <div className='col-lg-12 mt-3'>
                    <Addresses Data={Data}/>
                </div>
            </div>
            <div className='row' style={{textAlign:'right'}}>
                <div className='col-lg-6 mt-3'>
                    <Transactions Data={Data}/>
                </div>
                <div className='col-lg-6 mt-3'>
                    <Visualizations Data={Data}/>
                </div>
            </div>
        </div>
    :
    <div className='container-fluid mt-5'
    style={{
        textAlign: 'center', 
        maxWidth: '1280px', 
        marginLeft: 'auto', 
        marginRight: 'auto'
      }}
    >
        <LocalLoading/>
    </div>
  )
}

export default SingleCase
