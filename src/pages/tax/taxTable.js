/* eslint-disable prefer-const */
/* eslint-disable no-duplicate-imports */
/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import './tax.css'
import { Card, CardHeader, Row, CardBody, Col, Modal,
  ModalBody,
  ModalFooter,
  Button } from 'reactstrap'
import { Input, Label, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { JalaliCalendar } from '../../processors/jalaliCalendar'
import { MiladiCalendar } from '../../processors/MiladiCalendar'
import { useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'react-feather'
import axios from 'axios'
import { Calendar, CalendarProvider } from "zaman"
import { useDispatch, useSelector } from 'react-redux'
import LoadingButton from '../../components/loadinButton/LoadingButton'
import toast from 'react-hot-toast'

function GetMillisecond (time) {
  const date = new Date(time)
  
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  return {
      year,
      month,
      day,
      hour,
      minute,
      second
  }
}

const TaxTable = ({ stepper }) => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const [Tokens, SetTokens] = useState([])
  const [CalendarType, SetCalendarType] = useState(false)
  const [Loading, SetLoading] = useState(false)
  const [NetworkId, SetNetworkId] = useState(0)
  const [FiltredTokens, SetFiltredTokens] = useState([])
  const [Networks, SetNetworks] = useState(
    [    
      {
        name:'Ethereum',
        id:4,
        contract_address:'0x73bFE136fEba2c73F441605752b2B8CAAB6843Ec',
        symbol:'ETH'
      },
      {
        name:'Bitcoin',
        contract_address:'0x73bFE136fEba2c73F441605752b2B8CAAB6843Ec',
        symbol:'BTC',
        id:1
      },
      {
        name:'Bitcoin Cash',
        id:2,
        contract_address:'0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf',
        symbol:'BCH'
      },
      {
        name:'Binance Smart Chain',
        contract_address:'0x095418A82BC2439703b69fbE1210824F2247D77c',
        symbol:'BNB',
        id:5
      },
      {
        name:'Litecoin',
        contract_address:'0x4338665cbb7b2485a8855a139b75d5e34ab0db94.',
        symbol:'LTC',
        id:3
      }
    ]
  )

  useEffect(() => {
    const fld = []
    for (let i = 0; i < Tokens.length; i++) {
      if (Number(Tokens[i].network) === Number(NetworkId)) {
        fld.push(Tokens[i])
      }
    }
    SetFiltredTokens(fld)
  }, [NetworkId])

  useEffect(() => {
    const GetTokens = []
    axios.get(`${serverAddress}/explorer/assets/`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
    console.log(response)
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
    })
  }, [])

  const [startTime, SetStartTime] = useState(0)
  const [EndTime, SetEndTime] = useState(0)
  const [StartTimeShowModal, setStartTimeShowModal] = useState(false)
  const [EndTimeShowModal, setEndTimeShowModal] = useState(false)

  const check = () => {
    let Valid = true

    const JobName = document.getElementById('JobName').value
    const walletAddress = document.getElementById('walletAddress').value
    const SelectedNetwork = document.getElementById('Network_select_Options').value
    const SelectedToken = document.getElementById('Token_select_Options').value
    const GardeshZarib = document.getElementById('GardeshZarib').value
    const TaxPercent = document.getElementById('TaxPercent').value
    const USDIRR = document.getElementById('USDIRR').value
    const Sood = document.getElementById('Sood').value
    let radios = document.getElementsByName('transferType')
    let type 
    let typeCheck = false
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            type = radios[i].value
            typeCheck = true
            console.log('type')
            console.log(type)
        }
    }
    const NewStartdate = new Date(startTime)
    const NewEnddate = new Date(EndTime)

    if (JobName === '') {
      Valid = false
      document.getElementById('JobName').style.borderColor = 'red'
    }
    if (walletAddress === '') {
      Valid = false
      document.getElementById('walletAddress').style.borderColor = 'red'
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
    if (TaxPercent === '') {
      Valid = false
      document.getElementById('TaxPercent').style.borderColor = 'red'
    }
    if (startTime === 0) {
      Valid = false
      document.getElementById('StartTaxPeriod').style.borderColor = 'red'
    }
    if (EndTime === 0) {
      Valid = false
      document.getElementById('EndTaxPeriod').style.borderColor = 'red'
    } 
    if (!typeCheck) {
      Valid = false
      document.getElementById('TaxTrMode').style.color = 'red'
    }

    const lastStartData = `${GetMillisecond(NewStartdate).year}-${GetMillisecond(NewStartdate).month}-${GetMillisecond(NewStartdate).day}`
    const lastEndtData = `${GetMillisecond(NewEnddate).year}-${GetMillisecond(NewEnddate).month}-${GetMillisecond(NewEnddate).day}`

    const bodyFormData = new FormData()

    bodyFormData.append('bussiness', JobName)
    bodyFormData.append('wallet_address', walletAddress)
    bodyFormData.append('start_date_of_calculations', lastStartData)
    bodyFormData.append('end_date_of_calculations', lastEndtData)
    bodyFormData.append('type', type)
    bodyFormData.append('applied_circulation_coefficient', GardeshZarib)
    bodyFormData.append('rial_price', USDIRR)
    bodyFormData.append('asset', SelectedToken)
    bodyFormData.append('network', SelectedNetwork)
    bodyFormData.append('precentage_profit_exchange', Sood)
    bodyFormData.append('precentage_tax_income', TaxPercent)
    bodyFormData.append('forgiveness_precentage', 0)
    bodyFormData.append('forgiveness_mount', 0)

    if (Valid) {
      SetLoading(true)

      axios.post(`${serverAddress}/taxing/operation/`, 
      bodyFormData,
      {
          headers: {
              Authorization: `Bearer ${Cookies.get('access')}`, 
              'Content-Type': 'multipart/form-data'
          }
      })
      .then((response) => {
        SetLoading(false)
        if (response.status === 201) {
          console.log(response.data)
          dispatch({type:"taxAmount", value:Number(response.data.price_without_forgiveness)})
          dispatch({type:"taxId", value:Number(response.data.id)})
          stepper.next()
        }
      })
      .catch((err) => {
        SetLoading(false)
        console.log(err)
        if (err.response.status === 403) {
          Cookies.set('refresh', '')
          Cookies.set('access', '')
          window.location.assign('/')
        } else if (err.response.status === 401) {
          Cookies.set('refresh', '')
          Cookies.set('access', '')
          window.location.assign('/')
        } else {
          return toast.error('ناموفق در پردازش', {
            position: 'bottom-left'
          })
        }
      })
    }
  }

  const checkCalendar = () => {
    let value
    const radios = document.getElementsByName('calendarType')
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        value = radios[i].value
      }
    }
    if (value === 'shamsi') {
      SetCalendarType(false)
    } else {
      SetCalendarType(true)
    }
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
            <Input id='JobName' onChange={ () => { document.getElementById('JobName').style.borderColor = 'rgb(220,220,220)' } } placeholder='نام کسب و کار'/>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='walletAddress'>آدرس کیف پول</Label>
            <Input id='walletAddress' placeholder='آدرس کیف پول'  onChange={ () => { document.getElementById('walletAddress').style.borderColor = 'rgb(220,220,220)' } }/>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='Network_select_Options'>انتخاب شبکه</Label>
            <select class="form-select" id='Network_select_Options'  onChange={ () => { document.getElementById('Network_select_Options').style.borderColor = 'rgb(220,220,220)', SetNetworkId(event.target.value) } } aria-label="Default select example" >
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
            <select class="form-select" id='Token_select_Options' onChange={ () => { document.getElementById('Token_select_Options').style.borderColor = 'rgb(220,220,220)' } } aria-label="Default select example">
              <option selected value="0">انتخاب توکن</option>
              {
                FiltredTokens.map((item, index) => {
                  return (
                    <option style={{fontSize:'15px'}} key={index} value={`${item.id}`}>{item.name}</option>
                  )
                })
              }
            </select>
          </Col>

          <Col xl='12' lg='12' className='mt-3' style={{textAlign:'right'}}>
            <Label style={{display:'block'}} id='TaxTrMode'>نوع تراکنش ها</Label>
            <Input type='radio' name='transferType'  id='deposit'  onChange={ () => { document.getElementById('TaxTrMode').style.color = 'rgb(100,100,100)' } } value='deposit'/>
            <Label for='deposit'  className=' me-1'>واریز</Label>
            <Input type='radio' name='transferType' id='withdraw'  value='withdraw' className='me-5'  onChange={ () => { document.getElementById('withdraw').style.color = 'rgb(100,100,100)' } }/>
            <Label for='withdraw'  className=' me-1'>برداشت</Label>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='GardeshZarib'>ضریب گردش اعمالی</Label>
            <Input id='GardeshZarib' type='number'  onChange={ () => { document.getElementById('GardeshZarib').style.borderColor = 'rgb(220,220,220)' } }/>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='USDIRR'>نرخ برابری ریال-دلار (ریال)</Label>
            <Input id='USDIRR' type='number' placeholder='ریال'  onChange={ () => { document.getElementById('USDIRR').style.borderColor = 'rgb(220,220,220)' } }/>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='Sood'>درصد سود صرافی (درصد)</Label>
            <Input id='Sood' type='number' placeholder='درصد'  onChange={ () => { document.getElementById('Sood').style.borderColor = 'rgb(220,220,220)' } }/>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label for='TaxPercent'>درصد مالیات بر درآمد (درصد)</Label>
            <Input id='TaxPercent' type='number' placeholder='درصد'  onChange={ () => { document.getElementById('TaxPercent').style.borderColor = 'rgb(220,220,220)' } }/>
          </Col>

          <Col xl='12' lg='12' className='mt-3' style={{textAlign:'right'}}>
            <Label style={{display:'block'}}>نوع تاریخ ورودی</Label>
            <Input onChange={() => { checkCalendar() }} type='radio' name='calendarType' defaultChecked value='shamsi'/>
            <Label className=' me-1'>شمسی</Label>
            <Input onChange={() => { checkCalendar() }} type='radio' name='calendarType' value='miladi' className='me-5'/>
            <Label className=' me-1'>میلادی</Label>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
            <Label className='mt-1'>شروع دوره زمانی</Label>
            <div onClick={(event) => (setStartTimeShowModal(true))} id='StartTaxPeriod' tag='div' outline style={{width:'100%', textAlign:'right', borderColor:'rgb(215,215,215)', borderWidth:'1px', borderStyle:'solid', borderRadius:'6px', padding:'7px 16px', marginTop:'-1px', cursor:'pointer'}}>
                {
                  startTime !== 0 ? 
                    !CalendarType ? 
                      `${JalaliCalendar(startTime).year}/${JalaliCalendar(startTime).month}/${JalaliCalendar(startTime).day}`
                    :
                      `${MiladiCalendar(startTime).year}/${MiladiCalendar(startTime).month}/${MiladiCalendar(startTime).day}`
                  :
                  <span>انتخاب نشده</span>
                }
              </div>
          </Col>

          <Col xl='6' lg='6' className='mt-3' style={{textAlign:'right'}}>
          <Label  className='mt-1'>پایان دوره زمانی</Label>
            <div onClick={(event) => (setEndTimeShowModal(true))}  id='EndTaxPeriod' outline style={{width:'100%', textAlign:'right', borderColor:'rgb(215,215,215)', borderWidth:'1px', borderStyle:'solid', borderRadius:'6px', padding:'7px 16px', marginTop:'-1px', cursor:'pointer'}}>
              {
                EndTime !== 0 ? 
                  !CalendarType ? 
                    `${JalaliCalendar(EndTime).year}/${JalaliCalendar(EndTime).month}/${JalaliCalendar(EndTime).day}`
                  :
                    `${MiladiCalendar(EndTime).year}/${MiladiCalendar(EndTime).month}/${MiladiCalendar(EndTime).day}`
                :
                <span>انتخاب نشده</span>
              }
            </div>
          </Col>

        </Row>
        
        <Row className='mt-3'>
          <Col>
            <a href='/tax/list'>
              <button  style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px", float:'right'}} className='btn-next'>
                <ArrowRight size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowRight>
                <span className='align-middle d-sm-inline-block d-none'>قبلی</span>
              </button>
            </a>

            <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} className='btn-next' onClick={() => {
              check()
              
            }}>
              {
                Loading ? 
                <LoadingButton/>
                :
                <>
                  <span className='align-middle d-sm-inline-block d-none'>بعدی</span>
                  <ArrowLeft size={14} className='align-middle ms-sm-25 ms-1 me-0'></ArrowLeft>
                </>
              }
            </button>
          </Col>
        </Row>

    </CardBody>

    <Modal
      isOpen={StartTimeShowModal}
      className='modal-dialog-centered'
      modalClassName={'modal-danger'}
      toggle={() => setStartTimeShowModal(!StartTimeShowModal)}
      style={{maxWidth:'370px'}}
    >
      <ModalBody>
        <h6>
          انتخاب زمان شروع
        </h6>
        {
          CalendarType ? 
          <CalendarProvider locale={'en'} >
            <Calendar
              onChange={(date) => {
                document.getElementById('StartTaxPeriod').style.borderColor = 'rgb(220,220,220)'
                SetStartTime(date)
                setStartTimeShowModal(false)
              }}
            />
          </CalendarProvider>
          
        :
        <CalendarProvider locale={'fa'} >
          <Calendar
            onChange={(date) => {
              document.getElementById('StartTaxPeriod').style.borderColor = 'rgb(220,220,220)'
              SetStartTime(date)
              setStartTimeShowModal(false)
            }}
          />
        </CalendarProvider>
        }
  
      </ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={ () => { setStartTimeShowModal(false) } }>
          بستن
        </Button>
      </ModalFooter>
    </Modal>

    <Modal
      isOpen={EndTimeShowModal}
      className='modal-dialog-centered'
      modalClassName={'modal-danger'}
      toggle={() => setEndTimeShowModal(!EndTimeShowModal)}
      style={{maxWidth:'370px'}}
    >
      <ModalBody>
        <h6>
          انتخاب زمان اتمام
        </h6>
        {
          CalendarType ? 
          <CalendarProvider locale={'en'} >
            <Calendar
              onChange={(date) => {
                document.getElementById('StartTaxPeriod').style.borderColor = 'rgb(220,220,220)'
                SetEndTime(date)
                setEndTimeShowModal(false)
              }}
            />
          </CalendarProvider>
        :
        <CalendarProvider locale={'fa'} >
          <Calendar
            onChange={(date) => {
              document.getElementById('StartTaxPeriod').style.borderColor = 'rgb(220,220,220)'
              SetEndTime(date)
              setEndTimeShowModal(false)
            }}
          />
        </CalendarProvider>
        }
      </ModalBody>
      <ModalFooter>
        <Button color='danger' onClick={ () => { setEndTimeShowModal(false) } }>
          بستن
        </Button>
      </ModalFooter>
    </Modal>

</Card>
  )
}

export default TaxTable
