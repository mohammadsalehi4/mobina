import React from 'react'
import { Alert } from 'reactstrap'
import { AlertTriangle } from 'react-feather'

const Warning = (props) => {
  return (
    <Alert color='warning' style={{margin:"5px", padding:"0px"}}>
        <div className='alert-body'>
          <AlertTriangle style={{ padding:"1px", marginLeft:"5px"}}/>{props.text}
        </div>
    </Alert>
  )
}

export default Warning
