import React, { useEffect } from 'react'

const LoadingButton = () => {
  useEffect(() => {
    setInterval(() => {
      const a = document.getElementById('LoadinDiv3').style.background
      document.getElementById('LoadinDiv3').style.background = document.getElementById('LoadinDiv2').style.background
      document.getElementById('LoadinDiv2').style.background = document.getElementById('LoadinDiv1').style.background
      document.getElementById('LoadinDiv1').style.background = a
    }, 200)
  }, [])
  return (
    <p style={{display:'inline-block', padding:'0px', margin:'0px', height:'16px', marginTop:'-8px'}}>
        <div className='p-0 m-0' id='LoadinDiv1' style={{width:'8px', transition:'0.5s', height:'8px', borderRadius:'50%', background:'rgb(100,100,100)', display:'inline-block'}}></div>
        <div className='p-0 m-0' id='LoadinDiv2' style={{width:'8px', transition:'0.5s', height:'8px', borderRadius:'50%', background:'rgb(150,150,150)', display:'inline-block'}}></div>
        <div className='p-0 m-0' id='LoadinDiv3' style={{width:'8px', transition:'0.5s', height:'8px', borderRadius:'50%', background:'rgb(200,200,200)', display:'inline-block'}}></div>
    </p>
  )
}

export default LoadingButton
