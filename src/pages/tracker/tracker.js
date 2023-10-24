/* eslint-disable no-mixed-operators */
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
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { useParams } from "react-router-dom"
import { serverAddress } from '../../address'
import axios from 'axios'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import toast from 'react-hot-toast'

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
                //validation
                if (typeof (array[i].hash) === 'string' && typeof (array[i].value) === 'string' && typeof (array[i].to.address) === 'string' && typeof (array[i].timestamp) === 'number') {
                    outputs.push({
                        hash:array[i].hash,
                        value:parseFloat((Number(array[i].value) / 1000000000000000000).toFixed(5)).toString(),
                        timeStamp:array[i].timestamp,
                        symbole:'ETH',
                        address:array[i].to.address,
                        valueInDollar:array[i].valueInDollar
                    })
                } else {
                    console.log(`there is an Error for ${array[i]}`)
                }
            } 
            if (array[i].to.address.toLowerCase() === hash.toLowerCase()) {
                 //validation
                if (typeof (array[i].hash) === 'string' && typeof (array[i].value) === 'string' && typeof (array[i].from.address) === 'string' && typeof (array[i].timestamp) === 'number') {
                    inputs.push({
                        hash:array[i].hash,
                        value:parseFloat((Number(array[i].value) / 1000000000000000000).toFixed(5)).toString(),
                        timeStamp:array[i].timestamp,
                        symbole:'ETH',
                        address:array[i].from.address,
                        valueInDollar:array[i].valueInDollar
                    })
                } else {
                    console.log(`there is an Error for ${array[i]}`)
                }
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
                            valueInDollar:inputs[0].valueInDollar,
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
                            symbole:'ETH',
                            valueInDollar:outputs[0].valueInDollar
                        }
                    ],
                    outputs:[]

                }
            ]
        )
    }

    const EthereumTransaction = (array, hash) => {
        if (typeof (array.from.address) === 'string' && typeof (array.hash) === 'string' && typeof (array.timestamp) === 'number' && (typeof (array.value) === 'number' || typeof (array.value) === 'string')) {
            dispatch({type:"positionX", value:(-330)})
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
        } else {
            return toast.error('خطا در دریافت اطلاعات تراکنش', {
                position: 'bottom-left'
            })
        }
    }

    const UTXOAddress = (array, address, symbole, decimal) => {

        const mainAddress = {
            address,
            symbole,
            inputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole,
                    valueInDollar:0
                }
            ],
            outputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole,
                    valueInDollar:0
                }
            ]
        }

        const inputAddress = {
            address : '',
            symbole,
            inputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole,
                    valueInDollar:0
                }
            ],
            outputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole,
                    valueInDollar:0
                }
            ]
        }

        const outputAddress = {
            address : '',
            symbole,
            inputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole,
                    valueInDollar:0
                }
            ],
            outputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole,
                    valueInDollar:0
                }
            ]
        }

        let inputHash = null
        let outputHash = null

        // main input transaction
        for (let i = 0; i < array.length; i++) {
            const hash = array[i].hash
            const time = array[i].time
            for (let j = 0; j < array[i].outputs.length; j++) {
                if ((array[i].outputs[j].address.address).toUpperCase() === address.toUpperCase()) {
                    for (let k = 0; k < array[i].outputs.length; k++) {
                        if ((array[i].outputs[k].address.address).toUpperCase() === address.toUpperCase()) {
                            if (hash.toUpperCase() !== (mainAddress.inputs[0].hash)) {
                                mainAddress.inputs[0].hash = hash
                                mainAddress.inputs[0].value = Number(array[i].outputs[k].value) / decimal
                                mainAddress.inputs[0].timeStamp = time
                                mainAddress.inputs[0].valueInDollar = Number(array[i].outputs[k].ValueInDollar)
                            } else {
                                mainAddress.inputs[0].value = mainAddress.inputs[0].value + (Number(array[i].outputs[k].value) / decimal)
                                mainAddress.inputs[0].valueInDollar = mainAddress.inputs[0].valueInDollar + Number(array[i].outputs[k].ValueInDollar)
                            }
                        }
                    }
                    inputHash = hash
                    j = array[i].outputs.length + 1
                }
            }
            if (inputHash !== null) {
                i = array.length + 1
            }
        }

        // main output transaction
        for (let i = 0; i < array.length; i++) {
            const hash = array[i].hash
            const time = array[i].time
            for (let j = 0; j < array[i].inputs.length; j++) {
                if (((array[i].inputs[j].coin.address.address).toUpperCase() === address.toUpperCase()) && (array[i].hash).toUpperCase() !== inputHash.toUpperCase()) {
                    for (let k = 0; k < array[i].inputs.length; k++) {
                        if (((array[i].inputs[k].coin.address.address).toUpperCase() === address.toUpperCase())) {
                            if (hash.toUpperCase() !== mainAddress.outputs[0].hash) {
                                mainAddress.outputs[0].hash = hash
                                mainAddress.outputs[0].value = Number(array[i].inputs[k].coin.value) / decimal
                                mainAddress.outputs[0].timeStamp = time
                                mainAddress.outputs[0].valueInDollar = Number(array[i].inputs[k].coin.ValueInDollar)
                            } else {
                                mainAddress.outputs[0].value = mainAddress.outputs[0].value + Number(array[i].inputs[k].coin.value) / decimal
                                mainAddress.outputs[0].valueInDollar = mainAddress.outputs[0].valueInDollar + Number(array[i].inputs[k].coin.ValueInDollar)
                            }
                        }
                    }
                    outputHash = hash
                    j = array[i].inputs.length + 1
                }
            }
            if (outputHash !== null) {
                i = array.length + 1
            }
        }

        // inputAddress output transaction
        for (let i = 0; i < array.length; i++) {
            const hash = array[i].hash
            const time = array[i].time
            if (array[i].hash === inputHash) {
                for (let j = 0; j < array[i].inputs.length; j++) {
                    if ((array[i].inputs[j].coin.address.address).toUpperCase() !== address.toUpperCase()) {
                        const thisAddress = array[i].inputs[j].coin.address.address
                        for (let k = 0; k < array[i].inputs.length; k++) {
                            if ((array[i].inputs[k].coin.address.address).toUpperCase() === thisAddress.toUpperCase()) {
                                if (inputAddress.address === '') {
                                    inputAddress.outputs[0].hash = hash
                                    inputAddress.outputs[0].value = Number(array[i].inputs[k].coin.value) / decimal
                                    inputAddress.outputs[0].timeStamp = time
                                    inputAddress.outputs[0].valueInDollar = Number(array[i].inputs[k].coin.ValueInDollar)
                                    inputAddress.address = thisAddress
                                } else {
                                    inputAddress.outputs[0].value = inputAddress.outputs[0].value + Number(array[i].inputs[k].coin.value) / decimal
                                    inputAddress.outputs[0].valueInDollar = inputAddress.outputs[0].valueInDollar + Number(array[i].inputs[k].coin.ValueInDollar)
                                }
                            }
                        }
                        j = array[i].inputs.length + 1
                    }
                }
            }
        }

        // outputAddress input transaction
        for (let i = 0; i < array.length; i++) {
            const hash = array[i].hash
            const time = array[i].time
            if (array[i].hash === outputHash) {
                for (let j = 0; j < array[i].outputs.length; j++) {
                    if (((array[i].outputs[j].address.address).toUpperCase() !== address.toUpperCase()) && (array[i].outputs[j].address.address).toUpperCase() !== inputAddress.address.toUpperCase()) {
                        const thisAddress = array[i].outputs[j].address.address
                        for (let k = 0; k < array[i].outputs.length; k++) {
                            if (((array[i].outputs[k].address.address).toUpperCase() === thisAddress.toUpperCase())) {
                                if (outputAddress.address === '') {
                                    outputAddress.inputs[0].hash = hash
                                    outputAddress.inputs[0].value = Number(array[i].outputs[k].value) / decimal
                                    outputAddress.inputs[0].timeStamp = time
                                    outputAddress.inputs[0].valueInDollar = Number(array[i].outputs[k].ValueInDollar)
                                    outputAddress.address = thisAddress
                                } else {
                                    outputAddress.inputs[0].value = outputAddress.inputs[0].value + Number(array[i].outputs[k].value) / decimal
                                    outputAddress.inputs[0].valueInDollar = outputAddress.inputs[0].valueInDollar + Number(array[i].outputs[k].ValueInDollar)
                                }
                            }
                        }
                        j = array[i].outputs.length + 1
                    }
                }
            }
        }

        if ((inputHash === null || inputAddress.address === '') && outputHash !== null) {
            return ([
                {
                    address:mainAddress.address,
                    symbole:mainAddress.symbole,
                    outputs:mainAddress.outputs,
                    inputs:[]
                },
                {
                    address:outputAddress.address,
                    symbole:outputAddress.symbole,
                    outputs:[],
                    inputs:outputAddress.inputs
                }
            ])
        } else if ((outputHash === null || outputAddress === '') && inputHash !== null) {
            return ([
                {
                    address:mainAddress.address,
                    symbole:mainAddress.symbole,
                    outputs:[],
                    inputs:mainAddress.outputs
                },
                {
                    address:inputAddress.address,
                    symbole:inputAddress.symbole,
                    outputs:inputAddress.outputs,
                    inputs:[]
                }
            ])
        } else if ((outputHash === null || outputAddress === '') && (inputHash === null || inputAddress.address === '')) {
            return (
                [
                    {
                        address:mainAddress.address,
                        symbole:mainAddress.symbole,
                        outputs:[],
                        inputs:[]
                    }
                ]
            )
        } else {
            return ([
                {
                    address:mainAddress.address,
                    symbole:mainAddress.symbole,
                    outputs:mainAddress.outputs,
                    inputs:mainAddress.inputs
                },
                {
                    address:outputAddress.address,
                    symbole:outputAddress.symbole,
                    outputs:[],
                    inputs:outputAddress.inputs
                },
                {
                    address:inputAddress.address,
                    symbole:inputAddress.symbole,
                    outputs:inputAddress.outputs,
                    inputs:[]
                }
            ])
        }
 
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
                        } else if (response.data.network === 'BTC') {
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:UTXOAddress(response.data.data.result, hash, 'BTC', 100000000)})
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
                    console.log(error)
                    return toast.error('خطا در دریافت اطلاعات', {
                        position: 'bottom-left'
                    })
                }
            })
            .catch((err) => {
                SetLoading(false)
                try {
                    if (err.response.statusText === 'Unauthorized') {
                        Cookies.set('refresh', '')
                        Cookies.set('access', '')
                        window.location.assign('/')
                    } else {
                        return toast.error('خطا در دریافت اطلاعات', {
                            position: 'bottom-left'
                        })
                    }
                } catch (error) {
                    return toast.error('خطا در دریافت اطلاعات', {
                        position: 'bottom-left'
                    })
                }
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