/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import './tax.css'
import DataTableWithButtons from '../../components/collapseableTable/TableExpandable'
import { Input, Label } from 'reactstrap'
import { useParams } from "react-router-dom"
import { MainSiteOrange } from '../../../public/colors'

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
    <div id='Tax' className='container-fluid'>
        {
            mode === 0 ?
                <div class="row main_row1">
                    <div class="col-lg-3">
                    </div>
                    <div class="col-lg-6 middleBox" id='hamoniKeBayadBiadBala' style={{marginTop:"160px"}}>
                        <h3 style={{ display:"block", textAlign:"center", color:"#497979"}}> شناسه تراکنش را به کمک <span class="vazir" style={{color:MainSiteOrange}}>پنتا</span> جست و جو کنید!</h3>
                        <form onSubmit={checkinput}>
                            <Input type='text' id='trAddressValue' class="form-control vazir m-auto bg-white" placeholder='شناسه تراکنش' style={{backgroundColor:"white"}}/>
                        </form>
                    </div>
                    <div class="col-lg-3">
                    </div>
                </div>
            :
            null
        }

        {
        mode === 1 ?
            <div className='row mt-3' >
                <div className='col-lg-0'>
                </div>
                <div className='col-lg-12'>
                    <DataTableWithButtons trAddress={address}/>
                </div>
                <div className='col-lg-0'>
                </div>
            </div>
        :
            null
        }
    </div>
  )
}

export default Tax