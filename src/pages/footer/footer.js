import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { serverAddress } from '../../address'
const Footer = () => {

    const [version, SetVersion] = useState(0)
    useEffect(() => {
        axios.get(`${serverAddress}/explorer/backendversion`)
        .then((response) => {
            SetVersion(response.data.version_api.substring(2))
        })
    }, [])
    
    return (
        <div style={{textAlign:'center', color:'rgb(200,200,200)', position:'absolute', width:'100%', bottom:'0px'}}>
            <span>
                ساخته شده توسط تیم پنتا
            </span>
            <span style={{fontSize:'18px', marginTop:'4px'}} className='me-1 ms-2'>©</span>
            <span>{version} </span>
        </div>
    )
}

export default Footer