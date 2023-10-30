// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'
import { AlertOctagon, AlertCircle, User, Mail, Phone } from 'react-feather'
const ProfileAbout = () => {
  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>مشخصات</h5>

        <div className='mt-3'>
          <h6 className='mb-50'>
            <AlertCircle size={15} style={{marginLeft:'4px'}} />
            نام:
          </h6>
          <CardText>محمد</CardText>
        </div>

        <div className='mt-3'>
          <h6 className='mb-50'>
            <AlertOctagon size={15} style={{marginLeft:'4px'}}/>
            نام خانوادگی:
          </h6>
          <CardText>صالحی</CardText>
        </div>

        <div className='mt-3'>
          <h6 className='mb-50'>
            <User size={15} style={{marginLeft:'4px'}}/>
            نام کاربری:

          </h6>
          <CardText>msalehi79</CardText>
        </div>

        <div className='mt-3'>
          <h6 className='mb-50'>
            <Mail size={15} style={{marginLeft:'4px'}} />
            ایمیل:</h6>
          <CardText>mohammad7979salehi@gmail.com</CardText>
        </div>

        <div className='mt-3'>
          <h6 className='mb-50'>
            <Phone size={15} style={{marginLeft:'4px'}} />
            شماره همراه:</h6>
          <CardText>09166366715</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
