import { Server, Hexagon } from 'react-feather'

import { Alert, CardImg, Navbar, Col, Row } from 'reactstrap'

const ProfileHeader = ({ data }) => {
  return (
    <div className='profile-header mb-2' style={{overflow:'hidden', margin:'0px', padding:'0px', borderRadius:'4px'}}>
        <CardImg src={data.coverImg} alt='User Profile Image' top />
        <Navbar container={false} className=' w-100' expand='md' light>
          <div className='container-fluid'>
            <Row className='row' style={{ width:'100%'}}>

              <Col xl='2' lg='2' md='3'>
                <div className='profile-img' id='profileImageDiv' style={{marginTop:'-32px', textAlign:'right', background:'white', padding:'6px', borderRadius:'8px', display:'inline-block'}}>
                  <img className='rounded img-fluid' src={data.avatar} alt='Card image' />
                </div>
              </Col>

              <Col xl='6' lg='8' md='6' sm='12' id='profileHeaderInfos'>
                <p style={{color:'gray', fontWeight:'bold'}} className='profileHeaderSpan2 mt-3'>نام و نام خانوادگی</p>
                <p style={{color:'gray'}}>
                  <span className='profileHeaderSpan'>
                    <Hexagon className='ms-2' />
                    مرورگر فایرفاکس
                  </span>
                  <span className='profileHeaderSpan profileHeaderSpan3'>
                    <Server className='ms-2' />
                    آیپی  192.168.1.1
                  </span>
                </p>
              </Col>

              <Col xl='4' lg='2' md='3' id='profileRoleAlert'>
                <br/>
                <Alert color='primary' style={{textAlign:'center', display:'inline-block'}} id='ProfileHeaderRoll'>
                  ادمین سیستم
                </Alert>
              </Col>
              
            </Row>
          </div>
        </Navbar>
    </div>
  )
}

export default ProfileHeader
