/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
// import { useParams } from "react-router-dom"
import './tracker.css'
import GraphDraw from '../graph/graph'
import CurrencyDetail from './CurrencyDetail'
import TransactionDetail1 from './TransactionDetail'
import VisualizationDetail from './visualizationDetail'
import Guide from './guide'
import TopGuide from './topGuide'
import { useSelector, useDispatch } from "react-redux"
import Cookies from 'js-cookie'
import { Search } from 'react-feather'
import { Label, Input, InputGroup, InputGroupText } from 'reactstrap'
import { useParams } from "react-router-dom"
import { serverAddress } from '../../address'
import axios from 'axios'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'

const Tracker = () => {
    const { hash } = useParams()

    const [Data, SetData] = useState([])
    const [IsShow, SetIsShow] = useState(false)
    const [Loading, SetLoading] = useState(false)

    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:2})
    }, [])
    const [] = useState(false)
    const States = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:2})
    }, [])

    //login check
    useEffect(() => {
        try {
            const access = Cookies.get('access')
            const decoded = jwt.decode(access)
            const currentTime = Date.now() / 1000
            if (decoded.exp < currentTime || !decoded || decoded === '') {
                window.location.assign('/')
            } else {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
            }
        } catch {
        }
    }, [])

    const onSubmit = (event) => {
        const inputValue = (document.getElementById("trackerInput").value)
        event.preventDefault()
        window.location.assign(`/tracker/${inputValue}`)
    }

    const EtereumAddress = (array, hash) => {
        const address = hash
        const symbole = 'ETH'
        let inputs = []
        let outputs = []
        for (let i = 0; i < array.length; i++) {
            if (array[i].from.address.toLowerCase() === hash.toLowerCase()) {
                outputs.push({
                    hash:array[i].blockHash,
                    value:parseFloat((Number(array[i].value) / 1000000000000000000).toFixed(5)).toString(),
                    timeStamp:array[i].timestamp,
                    symbole:'ETH'
                })
            } 
            if (array[i].to.address.toLowerCase() === hash.toLowerCase()) {
                inputs.push({
                    hash:array[i].blockHash,
                    value:parseFloat((Number(array[i].value) / 1000000000000000000).toFixed(5)).toString(),
                    timeStamp:array[i].timestamp,
                    symbole:'ETH'
                })
            }
        }

        inputs = [inputs[0]]
        outputs = [outputs[0]]
        console.log({
            inputs,
            outputs,
            address,
            symbole
        })
        return (
            {
                inputs,
                outputs,
                address,
                symbole
            }
        )

    }

    useEffect(() => {
        if (hash !== undefined) {
            SetLoading(true)
            axios.get(`${serverAddress}/explorer/address?address=${hash}&network=ETH&page_size=50&offset=1`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
                SetLoading(false)
                dispatch({type:"GRAPHDATA", value:[EtereumAddress(response.data.result, hash)]})
                SetIsShow(true)
            })
            .catch((err) => {
                 SetLoading(false)
                 console.log(err)
            })
        }
    }, [])

    useEffect(() => {
        console.log(States.GraphData)
    }, [States.GraphData])

    return (
        <UILoader blocking={Loading} loader={<Spinner />}>
            <div id='TransactionPage'>
                {/* <TopGuide/> */}
                <InputGroup style={{width:'50%', marginRight:'25%', marginTop:'25px'}}>
                    <Input defaultValue={'0x775f3Bc4a2fF115a5cb5a5Eef93E4aB1D3A91f93'} type='text' id='trackerInput' class="form-control vazir m-0 bg-white" placeholder='آدرس کیف پول' style={{borderTopRightRadius:'8px', borderBottomRightRadius:'8px', marginTop:'0px', backgroundColor:"white", width:"80%", borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}/>
                    <InputGroupText  onClick={ (event) => { onSubmit(event) } } style={{marginTop:"0px", borderTopLeftRadius:"8px", borderBottomLeftRadius:"8px", borderTopRightRadius:"0px", borderBottomRightRadius:"0px", height:"40px", cursor:"pointer"}}>
                        <Search size={20} />
                    </InputGroupText>
                    </InputGroup>
                    {
                        IsShow ? 
                            <GraphDraw/>
                        :
                            null
                    }

                {
                    States.showWalletData ? <CurrencyDetail/> : null
                }
                {
                    States.showTransactionData ? <TransactionDetail1/> : null
                }
                {/* <VisualizationDetail/> */}
                <Guide/>
            </div>
        </UILoader>

    )
}
export default Tracker