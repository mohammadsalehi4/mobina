import React from 'react'
import { Edit3 } from 'react-feather'
import { Button, Input } from 'reactstrap'
const Notes = (props) => {
  return (
    <div className='container-fluid' style={{minHeight:"100%", borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
      <p style={{fontWeight:"bold"}} className='mt-1'>یادداشت ها</p>
      <span>
        <Input type='textarea' style={{minHeight:'80px'}} rows="1" defaultValue={props.Data.case_info.note_detail}/>
        <Button className='mt-2 mb-1' color='primary' style={{float:'left'}}>ثبت یادداشت</Button>
      </span>
    </div>
  )
}

export default Notes
