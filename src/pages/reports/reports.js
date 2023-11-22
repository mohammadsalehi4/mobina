/* eslint-disable prefer-const */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import CardMain from '../../components/cardMainBig/cardMain'
import CardSubMain from '../../components/cardSubMain/cardsubmain'
import CardNews from '../../components/cardNews/cardnews'
import './reports.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import { serverAddress } from '../../address'
const Reports = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()

    function sortArrayOfObjects(arr) {
        let array = arr
        for (let i = 0; i < array.length; i++) {
            for (let j = i; j < array.length; j++) {
                if (array[i].id < array[j].id) {
                    const a = array[j]
                    array[j] = array[i]
                    array[i] = a
                }
            }
        }
        return array
    }

    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:5})
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

  const [data, SetData] = useState([])

  useEffect(() => {
    axios.get(`${serverAddress}/reports/`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
        if (response.status === 200) {
            let getData = []
            for (let i = 0; i < response.data.results.length; i++) {
                getData.push(
                    {
                        title:response.data.results[i].title,
                        description:response.data.results[i].summary,
                        img:response.data.results[i].image,
                        id:response.data.results[i].id
                    }
                )
            }
            const newData = sortArrayOfObjects(getData)
            SetData(newData)
        }
    })
    .catch((err) => {
        try {
          if (err.response.status === 401) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
        } catch (error) {}
    })
  }, [])

    return (
        <div className='container-fluid bg-white pt-2' id='Reports'>
            {
                data.length > 0 ?
                    <div className='row'>
                        <div className='col-lg-6 bg-white h-100 p-0'>
                            <CardMain data={data[0]}/>
                        </div>
                        <div className='col-lg-6'>
                            {
                                data.length > 1 ?
                                <div className='row'>
                                    <div className='col-lg-12 p-0'>
                                        <CardSubMain data={data[1]}/>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {
                                data.length > 2 ?
                                <div className='row'>
                                    <div className='col-lg-12 p-0'>
                                        <CardSubMain data={data[2]}/>
                                    </div>
                                </div>
                                :
                                null
                            }
                            {
                                data.length > 3 ?
                                <div className='row'>
                                    <div className='col-lg-12 p-0'>
                                        <CardSubMain data={data[3]}/>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>
                :
                null
            }
            <div className='row mt-5'>
                <h4 id='lastNewsTitle'>
                    آخرین اخبار
                </h4>
            </div>
            {
                data.length > 4 ? 
                <div className='row mt-2 mb-1'>
                    {
                        data.map((item, index) => {
                            if (index >= 4) {
                                return (
                                    <div className='col-lg-4'>
                                        <CardNews data={item}/>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                : 
                null
            }

        </div>
    )
}

export default Reports
