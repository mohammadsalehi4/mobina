/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
// import { useParams } from "react-router-dom"
import './tracker.css'
import FuckingGraph from '../graph/graph'
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

    const EthereumAddress = (array, hash) => {
        const address = hash
        const symbole = 'ETH'
        let inputs = []
        let outputs = []
        for (let i = 0; i < array.length; i++) {
            if (array[i].from.address.toLowerCase() === hash.toLowerCase()) {
                outputs.push({
                    hash:array[i].hash,
                    value:parseFloat((Number(array[i].value) / 1000000000000000000).toFixed(5)).toString(),
                    timeStamp:array[i].timestamp,
                    symbole:'ETH',
                    address:array[i].to.address
                })
            } 
            if (array[i].to.address.toLowerCase() === hash.toLowerCase()) {
                inputs.push({
                    hash:array[i].hash,
                    value:parseFloat((Number(array[i].value) / 1000000000000000000).toFixed(5)).toString(),
                    timeStamp:array[i].timestamp,
                    symbole:'ETH',
                    address:array[i].from.address
                })
            }
        }

        inputs = [inputs[0]]
        outputs = [outputs[0]]

        return (
            [
                {
                    address,
                    symbole,
                    inputs,
                    outputs
                },
                {
                    address:String(inputs[0].address),
                    symbole:"ETH",
                    inputs:[],
                    outputs:[
                        {
                            hash:inputs[0].hash,
                            value:inputs[0].value,
                            timeStamp:inputs[0].timeStamp,
                            symbole:'ETH'
                        }
                    ]

                },
                {
                    address:String(outputs[0].address),
                    symbole:"ETH",
                    inputs:[
                        {
                            hash:outputs[0].hash,
                            value:outputs[0].value,
                            timeStamp:outputs[0].timeStamp,
                            symbole:'ETH'
                        }
                    ],
                    outputs:[]

                }
            ]
        )
    }

    const EthereumTransaction = (array, hash) => {
        return (
            [
                { 
                    address:String(array.from.address),
                    symbole:"ETH",
                    inputs:[],
                    outputs:[
                        {
                            hash:array.hash,
                            value:parseFloat((Number(array.value) / 1000000000000000000).toFixed(5)).toString(),
                            timeStamp:array.timestamp,
                            symbole:'ETH'
                        }
                    ]
                },
                {
                    address:String(array.to.address),
                    symbole:"ETH",
                    inputs:[
                        {
                            hash:array.hash,
                            value:parseFloat((Number(array.value) / 1000000000000000000).toFixed(5)).toString(),
                            timeStamp:array.timestamp,
                            symbole:'ETH'
                        }
                    ],
                    outputs:[]
                }
            ]
        )
    }

    useEffect(() => {
        if (hash !== undefined) {
            SetLoading(true)
            axios.get(`${serverAddress}/explorer/search/?query=${hash}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
                try {
                    if (response.data.query === 'address') {
                        if (response.data.network === 'ETH') {
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:EthereumAddress(response.data.data.result, hash)})
                            SetIsShow(true)
                        }
                    } else if (response.data.query === 'transaction') {
                        if (response.data.network === 'ETH') {
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:EthereumTransaction(response.data.data, hash)})
                            SetIsShow(true)
                        }
                    }
                } catch (error) {
                    
                }

            })
            .catch((err) => {
                 SetLoading(false)
                 console.log(err)
            })
        }
    }, [])

    return (
        <UILoader blocking={Loading} loader={<Spinner />}>
            <div id='TransactionPage'>
                {/* <TopGuide/> */}
                <InputGroup style={{width:'50%', marginRight:'25%', marginTop:'25px'}}>
                    <Input defaultValue={'0xf9BCc0e756F0a8A6ac3EEc744e8BDB19a488E131'} type='text' id='trackerInput' class="form-control vazir m-0 bg-white" placeholder='آدرس کیف پول' style={{borderTopRightRadius:'8px', borderBottomRightRadius:'8px', marginTop:'0px', backgroundColor:"white", width:"80%", borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}/>
                    <InputGroupText  onClick={ (event) => { onSubmit(event) } } style={{marginTop:"0px", borderTopLeftRadius:"8px", borderBottomLeftRadius:"8px", borderTopRightRadius:"0px", borderBottomRightRadius:"0px", height:"40px", cursor:"pointer"}}>
                        <Search size={20} />
                    </InputGroupText>
                    </InputGroup>
                    {
                        IsShow ? 
                            <FuckingGraph/>
                        :
                            null
                    }
                {
                    States.showWalletData ? <CurrencyDetail/> : null
                }
                {
                    States.showTransactionData ? <TransactionDetail1/> : null
                }
                <VisualizationDetail/>
                <Guide/>
            </div>
        </UILoader>

    )
}
export default Tracker