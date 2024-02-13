// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'
import { AlertOctagon, AlertCircle, User, Mail, Phone } from 'react-feather'
const ProfileAbout = (props) => {
  return (
    <Card>
      <CardBody>
        <h5 className='mb-75 ProfileAboutHeadTitle'>مشخصات</h5>

        <div className='mt-3'>
          <h6 className='mb-50 ProfileAboutTitle'>
            <AlertCircle size={15} style={{marginLeft:'4px'}} />
            نام:
          </h6>
          <CardText className='ProfileAboutTitle'>{props.data.first_name}</CardText>
        </div>

        <div className='mt-3'>
          <h6 className='mb-50 ProfileAboutTitle'>
            <AlertOctagon size={15} style={{marginLeft:'4px'}}/>
            نام خانوادگی:
          </h6>
          <CardText className='ProfileAboutTitle'>{props.data.last_name}</CardText>
        </div>

        <div className='mt-3'>
          <h6 className='mb-50 ProfileAboutTitle'>
            <User size={15} style={{marginLeft:'4px'}}/>
            نام کاربری:

          </h6>
          <CardText className='ProfileAboutTitle'>{props.data.username}</CardText>
        </div>

        <div className='mt-3'>
          <h6 className='mb-50 ProfileAboutTitle'>
            <Mail size={15} style={{marginLeft:'4px'}} />
            ایمیل:</h6>
          <CardText className='ProfileAboutTitle'>{props.data.email}</CardText>
        </div>

        <div className='mt-3'>
          <h6 className='mb-50 ProfileAboutTitle'>
            <Phone size={15} style={{marginLeft:'4px'}} />
            شماره همراه:</h6>
          <CardText className='ProfileAboutTitle'>{props.data.phone_number}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
