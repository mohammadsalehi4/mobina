/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React from 'react'
import {Card} from 'reactstrap'
const NetworkSelection = (props) => {

    const data = [
        {
            Symbol:'ETH',
            PName:'اتریوم',
            image:'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029'
        },
        {
            Symbol:'BSC',
            PName:'بایننس‌اسمارت‌چین',
            image:'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=029'
        },
        {
            Symbol:'ETH',
            PName:'اتریوم',
            image:'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029'
        },
        {
            Symbol:'MATIC',
            PName:'متیک',
            image:'https://cryptologos.cc/logos/polygon-matic-logo.png?v=029'
        },
        {
            Symbol:'BTC',
            PName:'بیت‌کوین',
            image:'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029'
        },
        {
            Symbol:'BCH',
            PName:'بیت‌کوین‌کش',
            image:'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=029'
        },
        {
            Symbol:'TRX',
            PName:'ترون',
            image:'https://cryptologos.cc/logos/tron-trx-logo.png?v=029'
        },
        {
            Symbol:'DOGE',
            PName:'دوج‌کوین',
            image:'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=029'
        }
    ]

    return (
        <Card>
            {
                props.networks.map((network, index) => {
                    
                    return (
                      <a href={`/${props.type}/${data.find(item => item.Symbol === network).Symbol}/${props.address}`} style={{color:'inherit'}}>
                        <div className='m-1 p-2 selectNetworkBox' style={{borderRadius:'8px', transition:'0.2s', textAlign:'right'}}>
                            <span>
                            {data.find(item => item.Symbol === network).Symbol} - {data.find(item => item.Symbol === network).PName}
                            </span>
                            <img src={data.find(item => item.Symbol === network).image} style={{width:'20px', float:'left'}} />
                        </div>
                      </a>
                    )
                })
            }
        </Card>
    )
}

export default NetworkSelection