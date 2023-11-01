/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Button } from 'reactstrap'
import ProfileAbout from './ProfileAbout'
import LabelAddresses from './LabelAddresses'
import TagAddresses from "./TagAddresses"
import SavedGraph from "./SavedGraph"
import ProfileHeader from './ProfileHeader'
import '@styles/react/pages/page-profile.scss'
import './style.css'

const Profile = () => {
    const States = useSelector(state => state)
    const dispatch = useDispatch()

    const [data, setData] = useState(null)
  
    useEffect(() => {
      axios.get('/profile/data').then(response => setData(response.data))
    }, [])


    useEffect(() => {
      dispatch({type:"SHOWNAVBAR"})
      dispatch({type:"SETWITCHPAGE", value:7})
    }, [])
        
  return (
    <>
      {data !== null ? (
        <div className="container-fluid">
          <Row id="MainProfileBox">
            <Col xl='2'></Col>
            <Col xl='8'>
              <Row>
                <Col sm='12'>
                  <ProfileHeader data={data.header} />
                </Col>
              </Row>
              <Row>
                <Col lg={{ size: 4, order: 1 }} sm={{ size: 12 }}>
                  <ProfileAbout data={data.userAbout} />
                </Col>
                <Col lg={{ size: 8, order: 2 }} sm={{ size: 12 }}>
                  <LabelAddresses data={data.post} />
                  <TagAddresses data={data.post} />
                  <SavedGraph data={data.post} />
                </Col>
              </Row>
            </Col>
            <Col xl='2'></Col>
          </Row>
        </div>
      ) : null}
    </>
  )
}

export default Profile
