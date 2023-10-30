import { Server, Hexagon } from 'react-feather'

import { Alert, CardImg, Navbar } from 'reactstrap'

const ProfileHeader = ({ data }) => {
  return (
    <div className='profile-header mb-2' style={{overflowX:'hidden', margin:'0px', padding:'0px'}}>
      <CardImg src={data.coverImg} alt='User Profile Image' top />
        <Navbar container={false} className=' w-100' expand='md' light>
          <div className='row' style={{ width:'100%'}}>

            <div className='col-md-2' >
              <div className='profile-img' id='profileImageDiv' style={{marginTop:'-32px', width:'80%', textAlign:'right', background:'white', padding:'6px', borderRadius:'8px', marginRight:'16px', display:'inline-block'}}>
                <img className='rounded img-fluid' src={data.avatar} alt='Card image' />
              </div>
            </div>

            <div className='col-md-8' id='profileHeaderInfos'>
              <p style={{color:'gray', fontWeight:'bold'}} className='profileHeaderSpan2'>نام و نام خانوادگی</p>
              <p style={{color:'gray'}}>
                <span className='profileHeaderSpan'>
                  <Hexagon className='ms-2' />
                  مرورگر فایرفاکس
                </span>
                <span className='me-4 profileHeaderSpan'>
                  <Server className='ms-2' />
                  آیپی  192.168.1.1
                </span>
               </p>
            </div>

            <div className='col-md-2'>
              <br/>
              <Alert color='primary' style={{textAlign:'center'}} id='ProfileHeaderRoll'>
                ادمین سیستم
              </Alert>
            </div>
             
          </div>
 
        </Navbar>
    </div>
  )
}

export default ProfileHeader
