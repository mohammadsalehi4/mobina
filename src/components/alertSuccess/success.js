import React from 'react'
import { Alert } from 'reactstrap'
import { Check } from 'react-feather'

const Success = (props) => {
  return (
    <Alert color='success' style={{margin:"5px", padding:"0px"}}>
    <div className='alert-body'>
        <Check style={{borderWidth:"1px", borderStyle:"solid", borderRadius:"50%", padding:"2px", marginLeft:"5px"}}/>{props.text}
    </div>
  </Alert>
  )
}

export default Success
