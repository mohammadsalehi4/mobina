import React from 'react'
import { Edit3 } from 'react-feather'
import { Button, Input } from 'reactstrap'
const Notes = () => {
  return (
    <div className='container-fluid' style={{minHeight:"100%", borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
      <p style={{fontWeight:"bold"}} className='mt-1'>یادداشت ها</p>
      <span>
        یادداشت جدید  
        <Edit3 size={15} style={{marginRight:"4px", cursor:"pointer"}}/>
        <Input type='textarea' style={{minHeight:'80px'}}/>
        <Button className='mt-3 mb-3' color='primary'>ثبت یادداشت</Button>
      </span>
    </div>
  )
}

export default Notes
