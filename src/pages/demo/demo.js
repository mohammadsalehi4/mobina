import React from 'react'

const Demo = () => {
  return (
    <div className='container-fluid' style={{ height:"100vh"}}>
        <div className='row'>
          <div className='col-md-4'>

          </div>
          <div className='col-md-4 mt-5' style={{textAlign:"center"}}>
            <h4 style={{}}>
              در نسخه دمو قابل نمایش نیست!
            </h4>
            <p>
              در این نسخه از برنامه، نمیتوانید این صفحه را مشاهده کنید.
            </p>
            <button onClick={ () => { window.location.assign('/researcher') } } style={{padding:"8px 24px", color:"white", background:"#2f4f4f", border:"none", borderRadius:"8px"}}>
              بازگشت به صفحه اصلی
            </button>
            <img src='../../../public/images/demo.png' style={{width:"100%", marginTop:"50px"}}/>
          </div>
          <div className='col-md-4'>

          </div>
        </div>
    </div>
  )
}

export default Demo
