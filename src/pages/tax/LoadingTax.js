/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import './LoadingTax.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
const LoadingTax = ({ stepper }) => {
    const dispatch = useDispatch()
    const States = useSelector(state => state)
    
    useEffect(() => {
        console.log('stepper')
        console.log(stepper)
        if (stepper !== null) {
            if (stepper._currentIndex === 1) {
                const getData = setInterval(() => {
                    axios.get(`${serverAddress}/taxing/operation/${States.taxId}/`, 
                    {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('access')}`, 
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((response) => {
                        console.log('response')
                        console.log(response)
                      if (response.status === 200) {
                        if (response.data.state === 'in_progress') {
                            
                        } else if (response.data.state === 'Ready_for_forgiveness') {
                            clearInterval(getData)
                            stepper.next()
                        } else if (response.data.state === "dont_have_tax") {
                            clearInterval(getData)
                            stepper.next()
                        }
                      }
                    })
                    .catch((err) => {
                      
                    })
                }, 5000)
            }
        }
    }, [, stepper, States.taxLoading])

  return (
    <div id='LoadingTax' className='mt-5 mb-5'>
        <link href='//fonts.googleapis.com/css?family=Lato:900,400' rel='stylesheet' type='text/css'/>

        <div class="wrapper">
            <svg class="hourglass" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 206" preserveAspectRatio="none">
                <path class="middle" d="M120 0H0v206h120V0zM77.1 133.2C87.5 140.9 92 145 92 152.6V178H28v-25.4c0-7.6 4.5-11.7 14.9-19.4 6-4.5 13-9.6 17.1-17 4.1 7.4 11.1 12.6 17.1 17zM60 89.7c-4.1-7.3-11.1-12.5-17.1-17C32.5 65.1 28 61 28 53.4V28h64v25.4c0 7.6-4.5 11.7-14.9 19.4-6 4.4-13 9.6-17.1 16.9z"/>
                <path class="outer" d="M93.7 95.3c10.5-7.7 26.3-19.4 26.3-41.9V0H0v53.4c0 22.5 15.8 34.2 26.3 41.9 3 2.2 7.9 5.8 9 7.7-1.1 1.9-6 5.5-9 7.7C15.8 118.4 0 130.1 0 152.6V206h120v-53.4c0-22.5-15.8-34.2-26.3-41.9-3-2.2-7.9-5.8-9-7.7 1.1-2 6-5.5 9-7.7zM70.6 103c0 18 35.4 21.8 35.4 49.6V192H14v-39.4c0-27.9 35.4-31.6 35.4-49.6S14 81.2 14 53.4V14h92v39.4C106 81.2 70.6 85 70.6 103z"/>
            </svg>
        </div>
        <p>درحال انجام محاسبات مالیاتی</p>
    </div>
  )
}

export default LoadingTax
