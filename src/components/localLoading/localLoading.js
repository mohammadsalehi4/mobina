import React from 'react'
import { Spinner } from 'reactstrap'

const LocalLoading = () => {
  return (
    <div style={{textAlign:'center', width:'100%', height:'100px'}}>
        <Spinner style={{
          margin:'auto auto'
        }} />
        <p>درحال دریافت اطلاعات...</p>
    </div>
  )
}

export default LocalLoading
