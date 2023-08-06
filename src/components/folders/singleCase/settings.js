import React from 'react'
import { Label, Input } from 'reactstrap'
const Settings = () => {
  return (
    <div className='container-fluid' style={{borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)", minHeight:"100%"}}>
    <p style={{fontWeight:"bold"}} className='mt-1'>تنظیمات اعلان</p>
    <div className='row'>
      <div className='col-8'>
        <input type='checkbox' style={{width:"15px", height:"15px", marginTop:"10px"}}/>
        <label className='me-1'> حداقل تغییرات <small>(BTC)</small></label>
      </div>
      <div className='col-4' style={{textAlign:"left"}}>
        <Input id='minBTCChange' type='text'   value={digitsEnToFa("10")}/>
      </div>
    </div>
    <div className='row mt-1'>
      <div className='col-8'>
        <input type='checkbox' style={{width:"15px", height:"15px", marginTop:"10px"}}/>
        <label className='me-1'> حداقل تغییرات <small>(USD)</small></label>
      </div>
      <div className='col-4' style={{textAlign:"left"}}>
        <Input id='minUSDChange' type='text'  value={digitsEnToFa("280,000")}/>
      </div>
    </div>
    <div className='row mt-1'>
      <div className='col-8'>
        <input type='checkbox' style={{width:"15px", height:"15px", marginTop:"10px"}}/>
        <label className='me-1'> حداقل ریسک <small>(درصد)</small></label>
      </div>
      <div className='col-4' style={{textAlign:"left"}}>
        <Input id='minRisk' type='text' value={digitsEnToFa("50")} />
      </div>
    </div>
    <div className='row mt-1'>
      <div className='col-12'>
        <input type='checkbox' style={{width:"15px", height:"15px", marginTop:"10px"}}/>
        <label className='me-1'>دریافت ایمیل اطلاع رسانی به</label><br/>
        <label className='me-3' style={{fontWeight:"bold"}}>info@company.ir</label>
      </div>
    </div>
  </div>
  )
}

export default Settings
