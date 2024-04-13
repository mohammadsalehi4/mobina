import React, { useEffect, useState } from 'react'
import {Edit, Info} from 'react-feather' 
import { digitsEnToFa } from 'persian-tools'
import { JalaliCalendar } from '../../../processors/jalaliCalendar'
const Cases = (props) => {
  const [Risk, SetRisk] = useState(0)

  useEffect(() => {
    let sum = 0
    for (let i = 0; i < props.Data.addresses.length; i++) {
      sum = sum + props.Data.addresses[i].risk
    }
    sum = sum / props.Data.addresses.length
    SetRisk(sum)
  }, [props.Data.addresses.length])

  return (
    <div className='container-fluid' style={{borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
        <div className='row mt-3'>
          <div className='col-6'>
            <p style={{fontWeight:"bold", fontSize:'18px'}}>
              {props.Data.case_info.name}
              <Edit style={{marginRight:"8px", cursor:"pointer"}}/>
            </p>
          </div>
          <div className='col-6' style={{textAlign:"left"}}>
            <small  style={{color:'rgb(150,150,150)'}}>ساخته شده در {digitsEnToFa(`${JalaliCalendar(new Date(props.Data.case_info.created_time).getTime()).day}-${JalaliCalendar(new Date(props.Data.case_info.created_time).getTime()).month}-${JalaliCalendar(new Date(props.Data.case_info.created_time).getTime()).year}`)}</small>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>

            <div className='row'>
              <div className='col-6'>
                <p>آدرس ها</p>
              </div>
              <div className='col-6'>
                <p>{((props.Data.addresses.length))}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>تراکنش ها</p>
              </div>
              <div className='col-6'>
                <p>{(props.Data.transactions.length)}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>ترسیم شده</p>
              </div>
              <div className='col-6'>
                <p>{(props.Data.graphs.length)}</p>
              </div>
            </div>

          </div>


          <div className='col-lg-6'>

            <div className='row'>
              <div className='col-6'>
                <p>
                  آخرین تغییر
                  <Info style={{ marginRight:"4px", color:"rgb(150,150,150)"}} size={15} />
                </p>
              </div>
              <div className='col-6'>
              <span className='d-block text-truncate'>{digitsEnToFa(`${JalaliCalendar(new Date(props.Data.case_info.modified_time).getTime()).hour}:${JalaliCalendar(new Date(props.Data.case_info.modified_time).getTime()).minute} ${JalaliCalendar(new Date(props.Data.case_info.modified_time).getTime()).year}-${JalaliCalendar(new Date(props.Data.case_info.modified_time).getTime()).month}-${JalaliCalendar(new Date(props.Data.case_info.modified_time).getTime()).day} `)}</span>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>ساخته شده توسط</p>
              </div>
              <div className='col-6'>
                <p>{props.Data.case_info.user}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>
                  میانگین ریسک
                  <Info style={{ marginRight:"4px", color:"rgb(150,150,150)"}} size={15} />
                </p>
              </div>
              <div className='col-6'>
                <p style={{color:"green"}}>
                  {Risk !== 0 ? digitsEnToFa(Risk) : 'بدون ریسک'}
                </p>
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}

export default Cases
