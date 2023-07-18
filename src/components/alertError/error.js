import React from 'react'
import { Alert } from 'reactstrap'
import { X } from 'react-feather'
const Error = (props) => {
  return (
    <Alert color='danger' style={{margin:"5px", padding:"0px"}}>
        <div className='alert-body'>
        <X style={{borderWidth:"1px", borderStyle:"solid", borderRadius:"50%", padding:"2px", marginLeft:"5px"}}/>{props.text}
        </div>
    </Alert>
  )
}

export default Error
