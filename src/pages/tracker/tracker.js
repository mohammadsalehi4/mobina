/* eslint-disable no-mixed-operators */
/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
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
import Mouse from './mouse'
//processors
import { UTXOTransaction } from '../../processors/UTXOTransaction'
import { UTXOAddress } from '../../processors/UTXOAddress'
import { AccountBaseTransaction } from '../../processors/AccountBaseTransaction'
import { AccountBaseAddress } from '../../processors/AccountBaseAddress'
import { BSCTransaction } from '../../processors/BSCTransaction'
import { BSCAddress } from '../../processors/BSCAddress'

const Tracker = () => {
    const { hash } = useParams()
    const { id } = useParams()
    const { network } = useParams()

    const [IsShow, SetIsShow] = useState(false)
    const [Loading, SetLoading] = useState(false)
    const [GraphName, SetGraphName] = useState('')
    const [GraphDescription, SetGraphDescription] = useState('')

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

    //processors
    const UTXOAdd = (data) => {
        console.log('tracker')
        console.log(data)

        let getEntity

        try {
            if (data.label) {
                getEntity = data.label
            } else if (data.entity !== null && data.entity !== undefined) {
                getEntity = data.entity.name
            } else {
                getEntity = false
            }
        } catch (error) {
            getEntity = false
        }

        const mainAddress = {
            address: data.address,
            symbole : data.symbole,
            Label:getEntity,
            inputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole: '',
                    valueInDollar:0
                }
            ],
            outputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole : '',
                    valueInDollar:0
                }
            ]
        }
        const inputAddress = {
            address : '',
            symbole : '',
            inputs : [],
            outputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole: '',
                    valueInDollar:0
                }
            ],
            Label:false
        }
        const outputAddress = {
            address : '',
            symbole: '',
            inputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole : '',
                    valueInDollar:0
                }
            ],
            outputs : [],
            Label:false
        }

        let inputCheck = false
        let outputCheck = false

        if (data.inputs.length > 0) {
            mainAddress.inputs[0].hash = data.inputs[0].hash
            mainAddress.inputs[0].value = parseFloat(data.inputs[0].value.toFixed(5))
            mainAddress.inputs[0].timeStamp = data.inputs[0].timestamp
            mainAddress.inputs[0].symbole = data.symbole
            mainAddress.inputs[0].valueInDollar = parseFloat(data.inputs[0].ValueInDollar.toFixed(5))

            let InputEntity
            try {
                if (data.inputs[0].sender[0].label) {
                    InputEntity = data.inputs[0].sender[0].label
                } else if (data.inputs[0].sender[0].entity !== null &&  data.inputs[0].sender[0].entity !== undefined) {
                    InputEntity = data.inputs[0].sender[0].entity.name
                } else {
                    InputEntity = false
                }
            } catch (error) {
                InputEntity = false
            }

            if (data.inputs[0].sender.length > 0) {
                inputAddress.address = data.inputs[0].sender[0].address
                inputAddress.symbole = data.inputs[0].sender[0].symbole
                inputAddress.Label = InputEntity
                inputAddress.outputs[0].hash = data.inputs[0].hash
                inputAddress.outputs[0].value = parseFloat(data.inputs[0].sender[0].value.toFixed(5))
                inputAddress.outputs[0].timeStamp = data.inputs[0].timestamp
                inputAddress.outputs[0].symbole = data.inputs[0].sender[0].symbole
                inputAddress.outputs[0].valueInDollar = parseFloat(data.inputs[0].sender[0].ValueInDollar.toFixed(5))
    
                inputCheck = true
            }

        }

        if (data.outputs.length > 0) {
            mainAddress.outputs[0].hash = data.outputs[0].hash
            mainAddress.outputs[0].value = parseFloat(data.outputs[0].value.toFixed(5))
            mainAddress.outputs[0].timeStamp = data.outputs[0].timestamp
            mainAddress.outputs[0].symbole = data.symbole
            mainAddress.outputs[0].valueInDollar = parseFloat(data.outputs[0].ValueInDollar.toFixed(5))

            let OutputEntity
            try {
                if (data.outputs[0].reciver[0].label) {
                    OutputEntity = data.outputs[0].reciver[0].label
                } else if (data.outputs[0].reciver[0].entity !== null &&  data.outputs[0].reciver[0].entity !== undefined) {
                    OutputEntity =  data.outputs[0].reciver[0].entity.name
                } else {
                    OutputEntity = false
                }
            } catch (error) {
                OutputEntity = false
            }

            if (data.outputs[0].reciver.length > 0) {
                outputAddress.address = data.outputs[0].reciver[0].address
                outputAddress.symbole = data.outputs[0].reciver[0].symbole
                outputAddress.Label = OutputEntity
                outputAddress.inputs[0].hash = data.outputs[0].hash
                outputAddress.inputs[0].value = parseFloat(data.outputs[0].reciver[0].value.toFixed(5))
                outputAddress.inputs[0].timeStamp = data.outputs[0].timestamp
                outputAddress.inputs[0].symbole = data.outputs[0].reciver[0].symbole
                outputAddress.inputs[0].valueInDollar = parseFloat(data.outputs[0].reciver[0].ValueInDollar.toFixed(5))
    
                outputCheck = true
            }

        }

        if (inputCheck && outputCheck) {
            return (
                [
                    mainAddress,
                    inputAddress,
                    outputAddress
                ]
            )
        } else if (inputCheck && !outputCheck) {
            return (
                [
                    {
                        address: mainAddress.address,
                        symbole: mainAddress.symbole,
                        Label: mainAddress.Label,
                        inputs:[
                            {
                                hash:mainAddress.inputs[0].hash,
                                value:mainAddress.inputs[0].value,
                                timeStamp:mainAddress.inputs[0].timeStamp,
                                symbole: mainAddress.inputs[0].symbole,
                                valueInDollar:mainAddress.inputs[0].valueInDollar
                            }
                        ],
                        outputs:[]
                    },
                    inputAddress
                ]
            )
        } else if (!inputCheck && outputCheck) {
            return (
                [
                    {
                        address: mainAddress.address,
                        symbole: mainAddress.symbole,
                        Label: mainAddress.Label,
                        inputs:[],
                        outputs:[
                            {
                                hash:mainAddress.outputs[0].hash,
                                value:mainAddress.outputs[0].value,
                                timeStamp:mainAddress.outputs[0].timeStamp,
                                symbole: mainAddress.outputs[0].symbole,
                                valueInDollar:mainAddress.outputs[0].valueInDollar
                            }
                        ]
                    },
                    outputAddress
                ]
            )
        } else {
            return (
                [
                    {
                        address: mainAddress.address,
                        symbole: mainAddress.symbole,
                        Label: mainAddress.Label,
                        inputs:[],
                        outputs:[]
                    }
                ]
            )
        }
    }
    const UTXOTr = (data) => {
        console.log('tracker')
        console.log(data)
        const LeftAddress = {
            address: data.outputs[0].address,
            symbole : data.symbole,
            Label : data.Label,
            inputs : [
                {
                    hash:data.hash,
                    value:parseFloat(data.outputs[0].value.toFixed(5)),
                    timeStamp:data.time,
                    symbole: data.symbole,
                    valueInDollar:parseFloat(data.outputs[0].valueInDollar.toFixed(5))
                }
            ],
            outputs : []
        }
        const RightAddress = {
            address : data.inputs[0].address,
            symbole : data.symbole,
            Label : data.Label,
            inputs : [],
            outputs : [
                {
                    hash:data.hash,
                    value:parseFloat(data.inputs[0].value.toFixed(5)),
                    timeStamp:data.time,
                    symbole: data.symbole,
                    valueInDollar:parseFloat(data.inputs[0].valueInDollar.toFixed(5))
                }
            ]
        }

        return (
            [
                LeftAddress,
                RightAddress
            ]
        )
    }
    const AccountAdd = (data) => {
        console.log('tracker')
        console.log(data)

        const mainAddress = {
            address: '',
            symbole : '',
            Label:false,
            inputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole: '',
                    valueInDollar:0
                }
            ],
            outputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole : '',
                    valueInDollar:0
                }
            ]
        }
        const inputAddress = {
            address : '',
            symbole : '',
            Label:false,
            inputs : [],
            outputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole: '',
                    valueInDollar:0
                }
            ]
        }
        const outputAddress = {
            address : '',
            symbole: '',
            Label:false,
            inputs : [
                {
                    hash:null,
                    value:0,
                    timeStamp:0,
                    symbole : '',
                    valueInDollar:0
                }
            ],
            outputs : []
        }


        mainAddress.address = data.address
        mainAddress.symbole = data.symbole
        let getEntity
        try {
            if (data.Label) {
                getEntity = data.Label
            } else if (data.entity !== null && data.entity !== undefined) {
                getEntity = data.entity.name
            } else {
                getEntity = false
            }
        } catch (error) {
            getEntity = false
        }

        mainAddress.Label = getEntity

        let inputCheck = false
        let outputCheck = false

        if (data.inputs.length > 0) {
            mainAddress.inputs[0].hash = data.inputs[0].hash
            mainAddress.inputs[0].value = parseFloat(data.inputs[0].value.toFixed(5))
            mainAddress.inputs[0].timeStamp = data.inputs[0].timestamp
            mainAddress.inputs[0].symbole = data.inputs[0].symbole
            mainAddress.inputs[0].valueInDollar = parseFloat((data.inputs[0].ValueInDollar).toFixed(5))

            inputAddress.address = data.inputs[0].address
            inputAddress.symbole = data.inputs[0].symbole

            let InputEntity
            try {
                if (data.inputs[0].Label) {
                    InputEntity = data.inputs[0].Label
                } else if (data.inputs[0].entity !== null && data.inputs[0].entity !== undefined) {
                    InputEntity = data.inputs[0].entity.name
                } else {
                    InputEntity = false
                }
            } catch (error) {
                InputEntity = false
            }

            inputAddress.Label = InputEntity
            inputAddress.outputs[0].hash = data.inputs[0].hash
            inputAddress.outputs[0].value = parseFloat(data.inputs[0].value.toFixed(5))
            inputAddress.outputs[0].timeStamp = data.inputs[0].timestamp
            inputAddress.outputs[0].symbole = data.inputs[0].symbole
            inputAddress.outputs[0].valueInDollar = parseFloat((data.inputs[0].ValueInDollar).toFixed(5))

            inputCheck = true
        }

        if (data.outputs.length > 0) {
            mainAddress.outputs[0].hash = data.outputs[0].hash
            mainAddress.outputs[0].value = parseFloat(data.outputs[0].value.toFixed(5))
            mainAddress.outputs[0].timeStamp = data.outputs[0].timestamp
            mainAddress.outputs[0].symbole = data.outputs[0].symbole
            mainAddress.outputs[0].valueInDollar = parseFloat(data.outputs[0].ValueInDollar.toFixed(5))

            let OutputEntity
            try {
                if (data.outputs[0].Label) {
                    OutputEntity = data.outputs[0].Label
                } else if (data.outputs[0].entity !== null && data.outputs[0].entity !== undefined) {
                    OutputEntity = data.outputs[0].entity.name
                } else {
                    OutputEntity = false
                }
            } catch (error) {
                OutputEntity = false
            }

            outputAddress.address = data.outputs[0].address
            outputAddress.symbole = data.outputs[0].symbole
            outputAddress.Label = data.outputs[0].Label
            outputAddress.inputs[0].hash = data.outputs[0].hash
            outputAddress.inputs[0].value = parseFloat(data.outputs[0].value.toFixed(5))
            outputAddress.inputs[0].timeStamp = data.outputs[0].timestamp
            outputAddress.inputs[0].symbole = data.outputs[0].symbole
            outputAddress.inputs[0].valueInDollar = parseFloat(data.outputs[0].ValueInDollar.toFixed(5))

            outputCheck = true
        }

        if (inputCheck && outputCheck) {
            return (
                [
                    mainAddress,
                    inputAddress,
                    outputAddress
                ]
            )
        } else if (inputCheck && !outputCheck) {
            return (
                [
                    {
                        address: mainAddress.address,
                        symbole: mainAddress.symbole,
                        Label: mainAddress.Label,
                        inputs:[
                            {
                                hash:mainAddress.inputs[0].hash,
                                value:mainAddress.inputs[0].value,
                                timeStamp:mainAddress.inputs[0].timeStamp,
                                symbole: mainAddress.inputs[0].symbole,
                                valueInDollar:mainAddress.inputs[0].valueInDollar
                            }
                        ],
                        outputs:[]
                    },
                    inputAddress
                ]
            )
        } else if (!inputCheck && outputCheck) {
            return (
                [
                    {
                        address: mainAddress.address,
                        symbole: mainAddress.symbole,
                        Label: mainAddress.Label,
                        inputs:[],
                        outputs:[
                            {
                                hash:mainAddress.outputs[0].hash,
                                value:mainAddress.outputs[0].value,
                                timeStamp:mainAddress.outputs[0].timeStamp,
                                symbole: mainAddress.outputs[0].symbole,
                                valueInDollar:mainAddress.outputs[0].valueInDollar
                            }
                        ]
                    },
                    outputAddress
                ]
            )
        } else {
            return (
                [
                    {
                        address: mainAddress.address,
                        symbole: mainAddress.symbole,
                        Label: mainAddress.Label,
                        inputs:[],
                        outputs:[]
                    }
                ]
            )
        }
    }
    const AccountTr = (data) => {
        console.log('tracker')
        console.log(data)
        const LeftAddress = {
            address: data.to,
            symbole : data.symbole,
            Label : data.ToLabel,
            inputs : [
                {
                    hash:data.hash,
                    value:parseFloat(data.value.toFixed(5)),
                    timeStamp:data.timestamp,
                    symbole: data.symbole,
                    valueInDollar:parseFloat(data.valueInDollar.toFixed(5))
                }
            ],
            outputs : []
        }
        const RightAddress = {
            address : data.from,
            symbole : data.value,
            Label : data.FromLabel,
            inputs : [],
            outputs : [
                {
                    hash:data.hash,
                    value:parseFloat(data.value.toFixed(5)),
                    timeStamp:data.timestamp,
                    symbole: data.symbole,
                    valueInDollar:parseFloat(data.valueInDollar.toFixed(5))
                }
            ]
        }

        return (
            [
                LeftAddress,
                RightAddress
            ]
        )

    }

    //load new graph
    useEffect(() => {
        if (hash !== undefined) {
            SetLoading(true)
            axios.get(`${serverAddress}/explorer/search/?query=${hash}&network=${network}`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
                console.log(response)
                try {
                    if (response.data.query === 'address') {
                        if (network === 'ETH') {
                            dispatch({type:"Network", value:'ETH'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:AccountAdd(AccountBaseAddress(response.data.data, hash, 'ETH', 1000000000000000000))})
                            dispatch({type:"positionX", value:0})
                            SetIsShow(true)
                        } else if (network === 'BTC') {
                            dispatch({type:"Network", value:'BTC'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:UTXOAdd(UTXOAddress(response.data.data, hash, 'BTC', 100000000))})
                            dispatch({type:"positionX", value:0})
                            SetIsShow(true)
                        } else if (network === 'LTC') {
                            dispatch({type:"Network", value:'LTC'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:UTXOAdd(UTXOAddress(response.data.data, hash, 'LTC', 1))})
                            dispatch({type:"positionX", value:0})
                            SetIsShow(true)
                        } else if (network === 'BSC') {
                            dispatch({type:"Network", value:'BSC'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:AccountAdd(BSCAddress(response.data.data, hash, 'BSC', 1000000000000000000))})
                            dispatch({type:"positionX", value:0})
                            SetIsShow(true)
                        } else if (network === 'BCH') {
                            dispatch({type:"Network", value:'BCH'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:UTXOAdd(UTXOAddress(response.data.data, hash, 'BCH', 1))})
                            dispatch({type:"positionX", value:0})
                            SetIsShow(true)
                        }
                    } else if (response.data.query === 'transaction') {
                        if (network === 'ETH') {
                            dispatch({type:"Network", value:'ETH'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:AccountTr(AccountBaseTransaction(response.data.data, 'ETH', 1000000000000000000))})
                            dispatch({type:"positionX", value:320})
                            SetIsShow(true)
                        } else if (network === 'BTC') {
                            dispatch({type:"Network", value:'BTC'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:UTXOTr(UTXOTransaction(response.data.data, 'BTC', 100000000))})
                            dispatch({type:"positionX", value:320})
                            SetIsShow(true)
                        } else if (network === 'LTC') {
                            dispatch({type:"Network", value:'LTC'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:UTXOTr(UTXOTransaction(response.data.data, 'LTC', 1))})
                            dispatch({type:"positionX", value:320})
                            SetIsShow(true)
                        } else if (network === 'BSC') {
                            dispatch({type:"Network", value:'BSC'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:AccountTr(BSCTransaction(response.data.data, 'BSC', 1000000000000000000))})
                            dispatch({type:"positionX", value:320})
                            SetIsShow(true)
                        } else if (network === 'BCH') {
                            dispatch({type:"Network", value:'BCH'})
                            SetLoading(false)
                            dispatch({type:"GRAPHDATA", value:UTXOTr(UTXOTransaction(response.data.data, 'BCH', 1))})
                            dispatch({type:"positionX", value:320})
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
                    } else {}
                } catch (error) {}
                if (err.response.status === 403) {
                    Cookies.set('refresh', '')
                    Cookies.set('access', '')
                    window.location.assign('/')
                } else if (err.response.status === 404) {
                    return toast.error('سرور قطع می‌باشد!', {
                        position: 'bottom-left'
                    })
                } else if (err.response.status >= 500) {
                    return toast.error('سرور قطع می‌باشد!', {
                        position: 'bottom-left'
                    })
                } else {
                    return toast.error('خطا در دریافت اطلاعات از سرور!', {
                        position: 'bottom-left'
                    })
                }
            })
        }
    }, [])

    //load saved graph
    useEffect(() => {
        if (id !== undefined) {
            SetLoading(true)
            axios.get(`${serverAddress}/tracing/graph/`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get('access')}`
              }
            })
            .then((response) => {
                SetLoading(false)

                let GraphData = null
                let Scale 
                let positionX 
                let positionY 
                let NodesPosition 
                let Network 
                let networkName 
                let SavedPositions
                let edgesColors

                for (let i = 0; i < response.data.results.length; i++) {
                    if (response.data.results[i].id === Number(id)) {
                        GraphData = response.data.results[i].value.GraphData
                        Network = response.data.results[i].value.Network
                        Scale = response.data.results[i].value.Scale
                        positionX = response.data.results[i].value.positionX
                        positionY = response.data.results[i].value.positionY
                        NodesPosition = response.data.results[i].value.NodesPosition
                        networkName = response.data.results[i].value.networkName
                        SavedPositions = response.data.results[i].value.SavedPositions
                        edgesColors = response.data.results[i].value.edgesColors
                        SetGraphName(response.data.results[i].value.GraphName)
                        SetGraphDescription(response.data.results[i].value.GraphDescription)
                    }
                }
                if (response.data.results.length > 0 && GraphData !== null) {
                    dispatch({type:"GraphData", value:GraphData})
                    dispatch({type:"Scale", value:Scale})
                    dispatch({type:"positionX", value:positionX})
                    dispatch({type:"positionY", value:positionY})
                    dispatch({type:"NodesPosition", value:NodesPosition})
                    dispatch({type:"Network", value:Network})
                    dispatch({type:"SavedPositions", value:SavedPositions})
                    dispatch({type:"edgesColors", value:edgesColors})

                    SetIsShow(true)
                } else {
                    return toast.error('خطا در دریافت اطلاعات', {
                        position: 'bottom-left'
                    })
                }
            })
            .catch((err) => {
                SetLoading(false)
                console.log(err)
                if (err.response.status === 403) {
                    Cookies.set('refresh', '')
                    Cookies.set('access', '')
                    window.location.assign('/')
                  }
                  if (err.response.status === 401) {
                    Cookies.set('refresh', '')
                    Cookies.set('access', '')
                    window.location.assign('/')
                  }
              return toast.error('خطا در دریافت اطلاعات', {
                position: 'bottom-left'
              })
            })
        }
    }, [])

    return (
        <UILoader blocking={Loading} loader={<Spinner />}>
            <div id='TransactionPage'>
                {/* <TopGuide/> */}
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

                <VisualizationDetail hash={hash} GraphName={GraphName} GraphDescription={GraphDescription}/>
                <Guide/>
                <Mouse/>
            </div>
        </UILoader>
    )
}
export default Tracker