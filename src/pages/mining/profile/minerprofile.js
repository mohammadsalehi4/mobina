/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Button } from 'reactstrap'
import { serverAddress } from "../../../address"
import Cookies from "js-cookie"
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import '@styles/react/pages/page-profile.scss'
import ProfileHeader from "./ProfileHeader"
import ProfileAbout from "./ProfileAbout"
import SavedMiners from "./SavedMiners"
// import './style.css'

const MinerProfile = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()

    const [data, setData] = useState(null)
    const [Browser, setBrowser] = useState('نامشخص')
    const [IP, setIP] = useState('نامشخص')
  
    useEffect(() => {
      dispatch({type:"SHOWNAVBAR"})
      dispatch({type:"SETWITCHPAGE", value:4})
    }, [])

    useEffect(async () => {
      const userIPAddress = window.location.hostname
      const userAgent = navigator.userAgent
      console.log(userIPAddress)

      if (userAgent.indexOf("Chrome") !== -1) {
        setBrowser('گوگل‌کروم')
      } else if (userAgent.indexOf("Firefox") !== -1) {
        setBrowser('فایرفاکس')
      } else if (userAgent.indexOf("Safari") !== -1) {
        setBrowser('سافاری')
      } else {
        setBrowser('نامشخص')
      }

      // const res = await axios.get("https://api.ipify.org/?format=json")
      // setIP(res.data.ip)

      axios.get(`${serverAddress}/accounts/user_profile/`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
        console.log(response.data.results[0])
        setData(response.data.results[0])
      })
      .catch((err) => {
          console.log(err)
          if (err.response.status === 403) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
          if (err.response.status === 401) {
            Cookies.set('refresh', '')
            Cookies.set('access', '')
            window.location.assign('/')
          }
          if (err.response.statusText === 'Unauthorized') {
              SetLoading(false)
              return toast.error('ناموفق', {
                  position: 'bottom-left'
              })
          } else {
              SetLoading(false)
              return toast.error('ناموفق', {
                  position: 'bottom-left'
              })
          }
          SetLoading(false)
      })

    }, [])
        
  return (
    <>
      {data !== null ? <div className="container-fluid">
          <Row id="MainProfileBox">
            <Col xl='1'></Col>
            <Col xl='10' style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto'}}>
              <Row>
                <Col sm='12'>
                  <ProfileHeader  ip={IP} Browser={Browser} data={data} />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 4, order: 1 }} sm={{ size: 12 }}>
                  <ProfileAbout data={data} />
                </Col>
                <Col lg={{ size: 8, order: 2 }} sm={{ size: 12 }}>
                  <SavedMiners/>
                </Col>
              </Row>
            </Col>
            <Col xl='1'></Col>
          </Row>
        </div> : <UILoader blocking={true} loader={<Spinner />}>
      </UILoader>
      }
    </>
  )
}

export default MinerProfile
