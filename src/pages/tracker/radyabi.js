/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { InputGroup, Input, InputGroupText, Row, Col, Card} from 'reactstrap'
import { Search } from 'react-feather'
import { MainSiteyellow } from '../../../public/colors'
import { serverAddress } from '../../address'
import axios from 'axios'
import Cookies from 'js-cookie'
import './radyabi.css'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import toast from 'react-hot-toast'

const Radyabi = () => {

    const [SelectToken, SetSelectToken] = useState(0)
    const [Network, SetNetwork] = useState('')
    const [Loading, SetLoading] = useState(0)

    const submit = (event) => {

        event.preventDefault()
        const hash = document.getElementById('MainDashboardInputBox').value
        document.getElementById('MainDashboardInputBox').blur()
        SetLoading(true)
        axios.get(`${serverAddress}/explorer/search/?query=${hash}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            SetLoading(false)
            if (response.data.network.length === 1) {
                SetNetwork(response.data.network[0])
            } else {
                if (response.data.network[0] === 'ETH' || response.data.network[0] === 'BSC') {
                    SetSelectToken(1)
                } else if (response.data.network[0] === 'BTC' || response.data.network[0] === 'BCH') {
                    SetSelectToken(2)
                }
            }
        })
        .catch((err) => {
          SetLoading(false)
          console.log(err)
          try {
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
          } catch (error) {}
          try {
            if (err.response.data.detail === 'Not found.') {
              return toast.error('آدرس مورد نظر یافت نشد.', {
                position: 'bottom-left'
              })
            }
          } catch (error) {}
        })
    }

    useEffect(() => {
        if (Network !== '') {
            window.location.assign(`/tracker/${Network}/${document.getElementById('MainDashboardInputBox').value}`)
        }
    }, [Network])

  return (
    <UILoader  blocking={Loading} loader={<Spinner />}  id="loadingElement" style={{height:"100vh", zIndex:"1000000000000000"}}>
    <div style={{width:'100%', marginTop:'160px'}} id='radyabi'>
        <div className='container-fluid'>
            <Row>
                <Col xl={{size:1}} lg={{size:1}} md={{size:0}}></Col>
                <Col xl={{size:10}} lg={{size:10}} md={{size:12}}>
                    <Row>
                        <Col xl={{size:3}} lg={{size:2}} md={{size:1}} sm={{size:0}}></Col>
                        <Col xl={{size:6}} lg={{size:8}} md={{size:10}} sm={{size:12}} style={{textAlign:'center'}}>
                            <h4 style={{color:'#01153a'}}>
                                آدرس یا شناسه تراکنش خود را به کمک
                                <span style={{color:MainSiteyellow}}> پنتا </span> 
                                جست‌وجو کنید!
                            </h4>
                            <form onSubmit={ (event) => { submit(event) } }>
                                <InputGroup id='MainDashboardInputGroup' className='input-group-merge mb-2' style={{direction:'ltr', borderColor:'red', width:'100%'}}>
                                    <InputGroupText  id='MainDashboardInputSymbole' onClick={(event) => { submit(event) }}>
                                        <Search size={16} />
                                    </InputGroupText>
                                    <Input id='MainDashboardInputBox' placeholder='آدرس یا شناسه تراکنش...' />
                                </InputGroup>
                            </form>

                            <p class="vazir"  style={{display:'inline-block', width:'100%', textAlign:'right'}}>
                                نمونه کاوش:
                                <span onClick={() => {
                                    document.getElementById("MainDashboardInputBox").focus()
                                    document.getElementById('MainDashboardInputBox').value = 'bc1qjqnv9f8jkp6xvwhz90dunzwygw90uha26g6uvn' 
                                }} style={{display:'inline-block', marginLeft:'12px', marginRight:'12px', cursor:'pointer'}}>
                                    <ion-icon name="file-tray-stacked-outline"></ion-icon>
                                    {' '}
                                    <p  style={{display:'inline-block'}}> آدرس </p>
                                </span>
                                <span onClick={() => {
                                    document.getElementById("MainDashboardInputBox").focus()
                                    document.getElementById('MainDashboardInputBox').value = '0x489057fdf61b55137b632d68ee538cabde91e1ddb51d188c07c78927342b64b2'
                                }} style={{display:'inline-block', cursor:'pointer'}} >
                                    <ion-icon name="git-compare-outline"></ion-icon>
                                    {' '}
                                    <p  style={{display:'inline-block'}}> تراکنش </p>
                                </span>
                            </p>

                            {
                                SelectToken === 1 ? 
                                <Card>
                                    <div onClick={ () => { SetNetwork('ETH') } } className='m-1 p-2 selectNetworkBox' style={{borderRadius:'8px', transition:'0.2s', textAlign:'right'}}>
                                        <span>
                                            ETH - اتریوم
                                        </span>
                                        <img src='https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029' style={{width:'20px', float:'left'}} />
                                    </div>

                                    <div onClick={ () => { SetNetwork('BSC') } } className='m-1 p-2 selectNetworkBox' style={{borderRadius:'8px', transition:'0.2s', textAlign:'right'}}>
                                        <span>
                                            BSC - بایننس اسمارت چین
                                        </span>
                                        <img src='https://cryptologos.cc/logos/bnb-bnb-logo.png?v=029' style={{width:'20px', float:'left'}} />
                                    </div>
                                </Card>
                                :
                                SelectToken === 2 ? 
                                    <Card>
                                        <div onClick={ () => { SetNetwork('BTC') } } className='m-1 p-2 selectNetworkBox' style={{borderRadius:'8px', transition:'0.2s', textAlign:'right'}}>
                                            <span>
                                                BTC - بیت‌کوین
                                            </span>
                                            <img src='https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029' style={{width:'20px', float:'left'}} />
                                        </div>

                                        <div onClick={ () => { SetNetwork('BCH') } } className='m-1 p-2 selectNetworkBox' style={{borderRadius:'8px', transition:'0.2s', textAlign:'right'}}>
                                            <span>
                                                BCH - بیت‌کوین کش
                                            </span>
                                            <img src='https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=029' style={{width:'20px', float:'left'}} />
                                        </div>
                                    </Card>
                                :
                                null
                            }
                        </Col>
                        <Col></Col>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </div>

    </div>
    </UILoader>

  )
}

export default Radyabi
