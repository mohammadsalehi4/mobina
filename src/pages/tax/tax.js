/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import './tax.css'
import DataTableWithButtons from '../../components/collapseableTable/TableExpandable'
import DataTableWithButtons1 from '../../views/tables/data-tables/basic/TableWithButtons'
import { Input } from 'reactstrap'
import { useParams } from "react-router-dom"

const Tax = () => {
    const { txid } = useParams()
    const dispatch = useDispatch()
    const [mode, setMode] = useState(0)
    const [address, setAddress] = useState('')
    useEffect(() => {
        if (txid) {
            setMode(1)
        }
    }, [])

    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:4})
    }, [])

    const checkinput = () => {
        if (document.getElementById('trAddressValue').value !== '') {
            setAddress(document.getElementById('trAddressValue').value)
            setMode(1)
        } else {
            setAddress('')
            setMode(0)
        }
    }

    useEffect(() => {

    }, [mode])

  return (
    <div id='Tax' className='container-fluid mt-5'>
                {
                    mode === 0 ?
                        <div className='row'>
                            <div className='col-lg-3'>
                            </div>
                            <div className='col-lg-6 mt-5'>
                                <form onSubmit={checkinput}>
                                    <h3 style={{ display:"block", textAlign:"center", color:"#497979"}}> شناسه تراکنش را به کمک <span class="vazir" style={{color:"#2f4f4f"}}>پنتا</span> جست و جو کنید!</h3><br/>
                                    <Input id='trAddressValue' type='text'  class="form-control vazir m-auto bg-white" placeholder='شناسه تراکنش' style={{backgroundColor:"white", height:"50px", borderRadius:"8px"}}/>
                                </form>
                            </div>
                            <div className='col-lg-3'>
                            </div>
                        </div>
                    :
                    null
                }

            {
            mode === 1 ?
                <div className='row mt-5'>
                    <div className='col-lg-1'>
                    </div>
                    <div className='col-lg-10'>
                        <DataTableWithButtons trAddress={address}/>
                    </div>
                    <div className='col-lg-1'>
                    </div>
                </div>
            :
                null
            }
    </div>
  )
}

export default Tax