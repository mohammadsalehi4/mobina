import { Server, Hexagon } from 'react-feather'
import Avatar from "boring-avatars"
import { Alert, CardImg, Navbar, Col, Row } from 'reactstrap'
import Cookies from 'js-cookie'
const ProfileHeader = (props) => {
  return (
    <div className='profile-header mb-2' style={{overflow:'hidden', margin:'0px', padding:'0px', borderRadius:'4px'}}>
        <div src={"images/header-bg.png"} alt='User Profile Image' top style={{
            height:'200px', 
            opacity:'1',
            background:'rgb(47,79,79)',
            background:'linear-gradient(120deg, rgba(47,79,79,1) 0%, rgba(73,121,121,1) 48%, rgba(218,165,32,1) 100%)'
          }} />
        <Navbar container={false} className=' w-100' expand='md' light>
          <div className='container-fluid'>
            <Row className='row' style={{ width:'100%'}}>

              <Col xl='2' lg='2' md='3'>
                <div className='profile-img' id='profileImageDiv' style={{marginTop:'-32px', textAlign:'right', background:'white', padding:'6px', borderRadius:'8px', display:'inline-block'}}>
                  <Avatar
                    size={'100%'}
                    name="Maya Angelou"
                    variant="ring"
                    square={true}
                    colors={["#daa520", "#2f4f4f", "#daa520", "#2f4f4f", "#cdcd32"]}
                    style={{ borderRadius: '8px' }}
                  />
                </div>

              </Col>

              <Col xl='6' lg='8' md='6' sm='12' id='profileHeaderInfos'>
                <p style={{color:'gray', fontWeight:'bold'}} className='profileHeaderSpan2 mt-3'>{props.data.first_name} {props.data.last_name}</p>
                <p style={{color:'gray'}}>
                  <span className='profileHeaderSpan'>
                    <Hexagon className='ms-1' size={15} />
                    مرورگر {`${props.Browser}`}
                  </span>
                  <span className='profileHeaderSpan profileHeaderSpan3'>
                    <Server className='ms-1' size={15} />
                    آیپی  {`${props.ip}`}
                  </span>
                </p>
              </Col>

              <Col xl='4' lg='2' md='3' id='profileRoleAlert'>
                <br/>
                <Alert color='primary' style={{textAlign:'center', display:'inline-block'}} id='ProfileHeaderRoll'>
                  {Cookies.get('roll_name')}
                </Alert>
              </Col>
              
            </Row>
          </div>
        </Navbar>
    </div>
  )
}

export default ProfileHeader
