import React, { useEffect, useState } from 'react'
import axios from 'axios'


import { Col, Row } from 'reactstrap'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import './RewardStats.css'
import { digitsEnToFa } from 'persian-tools'

const RewardStats = () => {

    const [reward, setReward] = useState([])
    const [BTCprice, setBTCpric] = useState([])


    useEffect(() => {

        const now = new Date()
        const timestamp = Math.floor(now.getTime() / 1000)
        const url = `https://api.pantachain.com/explorer/price-service/?symbol=BTC&date=${timestamp}`
        const requestPrice = async () => {
            const { data } = await axios.get(url)
            const price = data.price.toFixed()
            setBTCpric(price)
        }
        requestPrice()

        const request = async () => {
            const { data } = await axios.get('https://mempool.space/api/v1/mining/reward-stats/144')
            setReward(data)

        }
        request()
        const interval = setInterval(() => {
            request();
        }, 60000); // Update every 60 seconds

        return () => clearInterval(interval);
    }, [])
    


    const total_blocks_mined = reward.endBlock - reward.startBlock + 1

    const calculateAvgTxFee = Math.round(reward.totalFee / reward.totalTx) / 1000
    const avgTxFee = calculateAvgTxFee

    const calculateAvgTxFeeUSD = ((reward.totalFee / reward.totalTx) * BTCprice) * 10000000
    const avgTxFeeUSD = calculateAvgTxFeeUSD.toLocaleString('fa-IR')
    const avgTxFeeUSDShow = avgTxFeeUSD.slice(0, 4)

    const calculateAvgBlockFees = reward.totalFee / (reward.endBlock - reward.startBlock + 1) / 100000000
    const avgBlockFees = calculateAvgBlockFees.toFixed(3)

    const calculateAvgBlockFeesUSD = ((reward.totalFee / total_blocks_mined) * BTCprice) * 10000000
    const avgBlockFeesUSD = calculateAvgBlockFeesUSD.toLocaleString('fa-IR')
    const avgBlockFeesUSDShow = avgBlockFeesUSD.slice(0, 6)

    const calculateMinersReward = reward.totalReward / 100000000
    const minersReward = calculateMinersReward.toFixed(2)

    const calculateMinersRewardUSD = (calculateMinersReward * BTCprice).toLocaleString('fa-IR')
    const minersRewardUSD = calculateMinersRewardUSD.slice(0, 10)



    return (
        <div className='mt-3'>
            <div>
                <Row className='g-3'>

                    <Col lg={6} xl={4}>
                        <Card>
                            <CardContent className='body-item'>
                                <p className='circle' style={{ background: '#e76f51' }}></p>
                                <div className='border-body-text'>
                                    <p className=' header-item'>پاداش ماینر ها</p>
                                    <p className='fs-1 text-body-item'> {digitsEnToFa(minersReward)} <span className='text-span'>بیت کویین</span></p>
                                    <p className='price py-1'> {digitsEnToFa(minersRewardUSD)} دلار</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Col>

                    <Col lg={6} xl={4}>
                        <Card>
                            <CardContent className='body-item'>
                                <p className='circle' style={{ background: '#f4a261' }}></p>
                                <div className='border-body-text'>
                                    <p className=' header-item'> میانگین هزینه های بلوک </p>
                                    <p className='fs-1 text-body-item'>{digitsEnToFa(avgBlockFees)} <span className='text-span text-start'>بیت کویین / بلاک</span> </p>
                                    <p className='price py-1'> {digitsEnToFa(avgBlockFeesUSDShow)} دلار</p>
                                </div>

                            </CardContent>
                        </Card>
                    </Col>


                    <Col lg={12} xl={4}>
                        <Card>
                            <CardContent className='body-item'>
                                <p className='circle' style={{ background: '#e9c46a' }}></p>
                                <div className='border-body-text'>
                                    <p className=' header-item'>میانگین هزینه تراکنش</p>
                                    <p className='fs-1 text-body-item'>{digitsEnToFa(avgTxFee)}k  <span className='text-span'>ساتوشی/تراکنش</span>   </p>
                                    <p className='price py-1'> {digitsEnToFa(avgTxFeeUSDShow)} دلار</p>
                                </div>

                            </CardContent>
                        </Card>
                    </Col>


                </Row>
            </div>
        </div>

    )
}

export default RewardStats