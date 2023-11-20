/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import './tax.css'
import { Card, CardHeader, Row, CardBody, Col } from 'reactstrap'
import { Input, Label, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { JalaliCalendar } from '../../processors/jalaliCalendar'
import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import axios from 'axios'
import { Calendar, CalendarProvider } from "zaman"


const TaxTable = ({ stepper }) => {
  const [Startmodal, setStartModal] = useState(false)
  const handleStartModal = () => setStartModal(!Startmodal)

  const [Endmodal, setEndModal] = useState(false)
  const handleEndModal = () => setEndModal(!Endmodal)

  const [Tokens, SetTokens] = useState([])
  const [Networks, SetNetworks] = useState(
    [    
      {
        name:'Ethereum',
        id:1,
        contract_address:'0x73bFE136fEba2c73F441605752b2B8CAAB6843Ec',
        symbol:'ETH'
      },
      {
        name:'Bitcoin',
        contract_address:'0x73bFE136fEba2c73F441605752b2B8CAAB6843Ec',
        symbol:'BTC',
        id:2
      },
      {
        name:'Bitcoin Cash',
        id:3,
        contract_address:'0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf',
        symbol:'BCH'
      },
      {
        name:'Binance Smart Chain',
        contract_address:'0x095418A82BC2439703b69fbE1210824F2247D77c',
        symbol:'BNB',
        id:4
      },
      {
        name:'Litecoin',
        contract_address:'0x4338665cbb7b2485a8855a139b75d5e34ab0db94.',
        symbol:'LTC',
        id:5
      }
    ]
  )

  useEffect(() => {
    const GetTokens = []
    axios.get(`${serverAddress}/explorer/tokens/`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        for (let i = 0; i < response.data.results.length; i++) {
          GetTokens.push(
            {
              name:response.data.results[i].name,
              contract_address:response.data.results[i].contract_address,
              symbol:response.data.results[i].symbol,
              id:response.data.results[i].id,
              network:response.data.results[i].network
            }
          )
        }
        SetTokens(GetTokens)
      }
    })
    .catch((err) => {

    })
  }, [])

  document.addEventListener('click', function(event) {
    const myElement = document.getElementById('endTaxBox') // المنتی که نمی‌خواهید روی آن عملی انجام شود
    const clickedInside = myElement.contains(event.target)
  
    if (!clickedInside) {
      setEndModal(false)
    }
  })

  document.addEventListener('click', function(event) {
    const myElement = document.getElementById('startTaxBox') // المنتی که نمی‌خواهید روی آن عملی انجام شود
    const clickedInside = myElement.contains(event.target)
  
    if (!clickedInside) {
      setStartModal(false)
    }
  })

  const [startTime, SetStartTime] = useState(0)
  const [EndTime, SetEndTime] = useState(0)

  const check = () => {
    let Valid = true

    const JobName = document.getElementById('JobName').value
    const SelectedNetwork = document.getElementById('Network_select_Options').value
    const SelectedToken = document.getElementById('Token_select_Options').value
    const GardeshZarib = document.getElementById('GardeshZarib').value
    const USDIRR = document.getElementById('USDIRR').value
    const Sood = document.getElementById('Sood').value
    const InCome = document.getElementById('InCome').checked
    const OutCome = document.getElementById('OutCome').checked
    const NewStartdate = new Date(startTime).setHours(0, 0, 0, 0)
    const NewEnddate = new Date(EndTime).setHours(23, 59, 59, 59)

    if (JobName === '') {
      Valid = false
      document.getElementById('JobName').style.borderColor = 'red'
    }
    if (SelectedNetwork === '0') {
      Valid = false
      document.getElementById('Network_select_Options').style.borderColor = 'red'
    }
    if (SelectedToken === '0') {
      Valid = false
      document.getElementById('Token_select_Options').style.borderColor = 'red'
    }
    if (GardeshZarib === '') {
      Valid = false
      document.getElementById('GardeshZarib').style.borderColor = 'red'
    }
    if (USDIRR === '') {
      Valid = false
      document.getElementById('USDIRR').style.borderColor = 'red'
    }
    if (Sood === '') {
      Valid = false
      document.getElementById('Sood').style.borderColor = 'red'
    }
    if (startTime === 0) {
      Valid = false
      document.getElementById('StartTaxPeriod').style.borderColor = 'red'
    }
    if (EndTime === 0) {
      Valid = false
      document.getElementById('EndTaxPeriod').style.borderColor = 'red'
    }
    
    if (!InCome && !OutCome) {
      Valid = false
      document.getElementById('TaxTrMode').style.color = 'red'
    }

    if (!Valid) {
      console.log('error')
    } else {
      stepper.next()
    }

    console.log(
      {
        JobName,
        SelectedNetwork,
        SelectedToken,
        GardeshZarib,
        USDIRR,
        Sood,
        InCome,
        OutCome,
        NewStartdate,
        NewEnddate
      }
    )
  }

  return (
    <Card className='m-0 ' style={{boxShadow:'none'}}>
    <CardHeader style={{ margin:'0px', paddingBottom:'0px', paddingTop:'16px'}}>
        <h5>محاسبه مالیات</h5>
    </CardHeader>
    <CardBody style={{textAlign:'left', boxShadow:'none'}}>
        <Row>
          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='JobName'>نام کسب و کار</Label>
            <Input id='JobName' placeholder='نام کسب و کار'/>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='Network_select_Options'>انتخاب شبکه</Label>
            <select class="form-select" id='Network_select_Options' aria-label="Default select example">
              <option selected value="0">انتخاب شبکه</option>
              {
                Networks.map((item, index) => {
                  return (
                    <option key={index} value={`${item.id}`}>{item.name}</option>
                  )
                })
              }
            </select>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='Token_select_Options'>انتخاب توکن</Label>
            <select class="form-select" id='Token_select_Options' aria-label="Default select example">
              <option selected value="0">انتخاب توکن</option>
              {
                Tokens.map((item, index) => {
                  return (
                    <option style={{fontSize:'12px'}} key={index} value={`${item.id}`}>{item.contract_address} | {item.name}<small></small></option>
                  )
                })
              }
            </select>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='GardeshZarib'>ضریب گردش اعمالی</Label>
            <Input id='GardeshZarib' type='number'/>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='USDIRR'>نرخ برابری ریال-دلار (ریال)</Label>
            <Input id='USDIRR' type='number' placeholder='ریال'/>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='Sood'>درصد سود صرافی (درصد)</Label>
            <Input id='Sood' type='number' placeholder='درصد'/>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='JobName' className='mt-1'>شروع دوره زمانی</Label>
            <Dropdown isOpen={Startmodal}  tag='div' className='dropdown-cart nav-item'  id='startTaxBox'>
            <DropdownToggle onClick={(event) => (handleStartModal())}  id='StartTaxPeriod' tag='div' outline style={{width:'100%', textAlign:'right', borderColor:'rgb(215,215,215)', borderWidth:'1px', borderStyle:'solid', borderRadius:'6px', padding:'7px 16px', marginTop:'-1px', cursor:'pointer'}}>
                {
                  startTime !== 0 ? 
                  `${JalaliCalendar(startTime).year}/${JalaliCalendar(startTime).month}/${JalaliCalendar(startTime).day}`
                  :
                  <span>انتخاب نشده</span>
                }
              </DropdownToggle>
              <DropdownMenu end tag='ul' className='dropdown-menu-media dropdown-cart mt-0' style={{minWidth:'260px', zIndex:111111111111111}} >
                <div id='newTaxStartTime'>
                  <CalendarProvider locale={'fa'}>
                    <Calendar
                      onChange={(date) => {
                        SetStartTime(date)
                        setStartModal(false)
                      }}
                    />
                  </CalendarProvider>
                </div>
              </DropdownMenu>
            </Dropdown>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
          <Label for='JobName' className='mt-1'>پایان دوره زمانی</Label>
            <Dropdown isOpen={Endmodal}  tag='div' className='dropdown-cart nav-item' id='endTaxBox'>
            <DropdownToggle onClick={(event) => (handleEndModal())} tag='div' id='EndTaxPeriod' outline style={{width:'100%', textAlign:'right', borderColor:'rgb(215,215,215)', borderWidth:'1px', borderStyle:'solid', borderRadius:'6px', padding:'7px 16px', marginTop:'-1px', cursor:'pointer'}}>
            {
              EndTime !== 0 ? 
              `${JalaliCalendar(EndTime).year}/${JalaliCalendar(EndTime).month}/${JalaliCalendar(EndTime).day}`
              :
              <span>انتخاب نشده</span>
            }
            {/* {String(`${JalaliCalendar(EndTime).year}/${JalaliCalendar(EndTime).month}/${JalaliCalendar(EndTime).day}`)} */}
            
            </DropdownToggle>
              <DropdownMenu end tag='ul' className='dropdown-menu-media dropdown-cart mt-0' >
                <div id='newTaxEndTime'>
                  <CalendarProvider locale={'fa'}>
                    <Calendar
                      onChange={(date) => {
                        SetEndTime(date)
                        setEndModal(false)
                      }}
                    />
                  </CalendarProvider>
                </div>
              </DropdownMenu>
            </Dropdown>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label style={{display:'block'}} id='TaxTrMode'>نوع تراکنش ها</Label>
                <Input id='InCome' type='checkbox'  className=''/>
                <Label for='InCome'  className=' me-1'>واریز</Label>

                <Input id='OutCome' type='checkbox'  className=' me-5'/>
                <Label for='OutCome'  className=' me-1'>برداشت</Label>
          </Col>
        </Row>
        
        <Row className='mt-3'>
          <Col>
            <button disabled style={{background:"gray", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px", float:'right'}} className='btn-next' onClick={() => {
              stepper.previous()
            }}>
              <ArrowRight size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowRight>
              <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
            </button>
            <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => {
              check()
              
            }}>
              <span className='align-middle d-sm-inline-block d-none'>بعدی</span>
              <ArrowLeft size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowLeft>
            </button>
          </Col>
        </Row>

    </CardBody>

</Card>
  )
}

export default TaxTable
