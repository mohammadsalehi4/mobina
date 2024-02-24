/* eslint-disable no-unused-expressions */
/* eslint-disable brace-style */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** React Imports
// ** Third Party Components
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import { CornerUpRight } from 'react-feather'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import LocalLoading from '../../../components/localLoading/localLoading'
import './style.css'
const GoalOverview = props => {

  const [hash_power_usage, Sethash_power_usage] = useState(null)
  const [address_transaction_sum, Setaddress_transaction_sum] = useState(null)
  const [network_hash_power_sum, Setnetwork_hash_power_sum] = useState(null)
  const [network_coinbase_sum, Setnetwork_coinbase_sum] = useState(null)
  const [power, Setpower] = useState(null)
  const [Logo, SetLogo] = useState(null)
  const [Name, SetName] = useState(null)
  const [UsePower, SetUsePower] = useState(null)
  const [Calculate, SetCalculate] = useState(0)
  const [Devices, SetDevices] = useState([])
  const [Transactions, SetTransactions] = useState([])
  const [Addresses, SetAddresses] = useState([])

  const [Loading, SetLoading] = useState(true)

  const options = {
      chart: {
        sparkline: {
          enabled: true
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1
        }
      },
      colors: Calculate <= 50 ? ['red'] : (Calculate > 50 && Calculate <= 70) ? ['#da973e'] : Calculate > 70 ? ['#27c1a7'] : null,
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '77%'
          },
          track: {
            background: '#ebe9f1',
            strokeWidth: '50%'
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              color: '#5e5873',
              fontFamily: 'Montserrat',
              fontSize: '2.86rem',
              fontWeight: '600'
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [props.success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      grid: {
        padding: {
          bottom: 30
        }
      }
    },
    series = [Calculate]

    useEffect(() => {
      if (props.id !== undefined) {
      console.log(props.id)
      axios.get(`${serverAddress}/miners/calculate/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
            console.log('response')
            console.log(response)
            if (response.status === 200) {
              Sethash_power_usage(response.data.hash_power_usage)
              Setaddress_transaction_sum(response.data.address_transaction_sum)
              Setnetwork_hash_power_sum(response.data.network_hash_power_sum)
              Setnetwork_coinbase_sum(response.data.network_coinbase_sum)
              Setpower(response.data.power)
              SetLogo(response.data.miner.logo)
              SetTransactions(response.data.transactions)
              SetAddresses(response.data.addresses)
              SetDevices(response.data.devices)
              SetName(response.data.miner.name_brand_persian)
              if (response.data.electricity_supply === "fossil_fuel_power_plant") {
                SetUsePower('نیروگاه سوخت فسیلی')
              } else if (response.data.electricity_supply === "green_power_plant_inside") {
                SetUsePower('نیروگاه برق سبز داخل')
              } else if (response.data.electricity_supply === "nationalـpowerـgrid") {
                SetUsePower('شبکه برق سراسری')
              }
              const getNumber = (((response.data.hash_power_usage) / (response.data.network_hash_power_sum)) / ((response.data.address_transaction_sum) / (response.data.network_coinbase_sum)))
              console.log('getNumber')
              console.log(getNumber)
              if ((getNumber >= 0 && getNumber <= 100)) { SetCalculate(Math.floor(getNumber * 100)) } else if (getNumber === Infinity) { SetCalculate(0) } else { SetCalculate(0) }
              SetLoading(false)
            }
        })
        .catch((err) => {
            console.log(err)
            SetLoading(false)
        })
      }

    }, [, props.id])

  return (
    <>
      {
        Loading ? 
          <div className='mt-5'>
            <LocalLoading/>
          </div>
        :
          <Card className='mt-3'>
          <CardBody className='p-0'>
            <div className='container-fluid'>
              <Row>
                <Col sm={4} style={{textAlign:'right'}}>
                  <div>
                    <div>
                      <img src={Logo} style={{width:'48px', height:"48px", marginLeft:'8px', borderRadius:'8px'}}/>
                    </div>
                    <div>
                      <h6 style={{fontSize:'18px'}} className='mt-3'>بررسی عملکرد استخراج </h6>
                      <p style={{marginTop:'-12px'}}>{Name !== null ? Name : 'بدون نام'}</p>
                    </div>
                  </div>
    
                  <h6 >پیش‌فرض های محاسبه:</h6>

                  <p style={{fontSize:'12px', marginTop:'0px'}}>تامین برق با نیروگاه سوخت فسیلی</p>

                  <p style={{fontSize:'12px', marginTop:'-12px'}}>
                    <span  className='defaultCalculatingValuesMiner'>
                      {Devices.length} دستگاه فعال
                    </span>
                  </p>

                  <p style={{fontSize:'12px', marginTop:'-12px'}}>
                    <span className='defaultCalculatingValuesMiner'>{Addresses.length} آدرس پاداش</span>
                  </p>

                  <p style={{fontSize:'12px', marginTop:'-12px'}}>
                    <span className='defaultCalculatingValuesMiner'>
                      {Transactions.length} تراکنش ورودی
                    </span>
                  </p>

                </Col>  
                <Col sm={4} style={{textAlign:'right', fontSize:'12px'}}>
                  <h6 >موارد محاسبه شده:</h6>
                
                  <div style={{textAlign:'right'}} className='mt-2'>
                    <div style={{display:'inline-block'}}>
                      <CornerUpRight size={33} style={{color:"red", background:"rgb(240,200,200)", marginLeft:"4px", marginTop:"-24px", padding:'4px', borderRadius:'8px'}} />
                    </div>
                    <div style={{display:'inline-block'}}>
                      <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'هش ریت اسمی مرکز استخراج'}</p>
                      <div style={{direction:"ltr", textAlign:"right", marginTop:'-16px'}} className={` amountOption`}>
                        {hash_power_usage}
                        <small> {'TH'}</small>
                      </div>
                    </div>
                  </div>
    
                  <div style={{textAlign:'right'}} className='mt-2'>
                    <div style={{display:'inline-block'}}>
                      <CornerUpRight size={33} style={{color:"red", background:"rgb(240,200,200)", marginLeft:"4px", marginTop:"-24px", padding:'4px', borderRadius:'8px'}} />
                    </div>
                    <div style={{display:'inline-block'}}>
                      <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'پاداش دریافتی مرکز'}</p>
                      <div style={{direction:"ltr", textAlign:"right", marginTop:'-16px'}} className={` amountOption`}>
                        {address_transaction_sum}
                        <small> {'BTC'}</small>
                      </div>
                    </div>
                  </div>
    
                  <div style={{textAlign:'right'}} className='mt-2'>
                    <div style={{display:'inline-block'}}>
                      <CornerUpRight size={33} style={{color:"red", background:"rgb(240,200,200)", marginLeft:"4px", marginTop:"-24px", padding:'4px', borderRadius:'8px'}} />
                    </div>
                    <div style={{display:'inline-block'}}>
                      <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'هش ریت شبکه بیت‌کوین'}</p>
                      <div style={{direction:"ltr", textAlign:"right", marginTop:'-16px'}} className={` amountOption`}>
                        {network_hash_power_sum}
                        <small> {'TH'}</small>
                      </div>
                    </div>
                  </div>
    
                  <div style={{textAlign:'right'}} className='mt-2'>
                    <div style={{display:'inline-block'}}>
                      <CornerUpRight size={33} style={{color:"red", background:"rgb(240,200,200)", marginLeft:"4px", marginTop:"-24px", padding:'4px', borderRadius:'8px'}} />
                    </div>
                    <div style={{display:'inline-block'}}>
                      <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'پاداش اعطایی شبکه بیت‌کوین'}</p>
                      <div style={{direction:"ltr", textAlign:"right", marginTop:'-16px'}} className={` amountOption`}>
                        {network_coinbase_sum}
                        <small> {'BTC'}</small>
                      </div>
                    </div>
                  </div>
    
                  <div style={{textAlign:'right'}} className='mt-2'>
                    <div style={{display:'inline-block'}}>
                      <CornerUpRight size={33} style={{color:"red", background:"rgb(240,200,200)", marginLeft:"4px", marginTop:"-24px", padding:'4px', borderRadius:'8px'}} />
                    </div>
                    <div style={{display:'inline-block'}}>
                      <p style={{display:"inline-block", color:"rgb(150,150,150)", textAlign:'right'}} className='transaction-title'>{'برق مصرفی اسمی'}</p>
                      <div style={{direction:"ltr", textAlign:"right", marginTop:'-16px'}} className={` amountOption`}>
                        {power}
                        <small> {'kwh'}</small>
                      </div>
                    </div>
                  </div>
    
                </Col>
                <Col sm={4}>
                  <Chart options={options} series={series} type='radialBar' height={245} />
                  <small style={{display:"inline-block", color:"rgb(150,150,150)"}}>
                    میزان تناسب پاداش قطعی دریافت شده با توان اسمی اعلام شده توسط استخراج کننده
                  </small>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      }

    <hr/>
    </>

  )
}
export default GoalOverview
