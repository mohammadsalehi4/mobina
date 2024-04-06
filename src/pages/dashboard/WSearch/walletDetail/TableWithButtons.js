/* eslint-disable multiline-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef, useEffect } from 'react'
import './style.css'
import AmountLimit from '../../../../components/dashboard/amountLimit'
import TimeLimit from '../../../../components/dashboard/timeLimit'
import DataTable from 'react-data-table-component'
import NiceAddress from '../../../../components/niceAddress/niceAddress'
import { ChevronDown, Download, X } from 'react-feather'
import { digitsEnToFa } from 'persian-tools'
import TokenSwitch from '../../../../components/dashboard/TokenSwitch/switch'
import moment from 'jalali-moment'
import ReactPaginate from 'react-paginate'
import {
  Card,
  Input,
  CardTitle,
  CardHeader,
  UncontrolledTooltip,
  Row,
  Col
} from 'reactstrap'

import { MainSiteGray } from '../../../../../public/colors'
import { useSelector, useDispatch } from "react-redux"
// ** Bootstrap Checkbox Component
import LoadingButton from '../../../../components/loadinButton/LoadingButton'
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))
import toast from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../../address'

import { UTXO_Address } from '../../../../newProcessors/UTXO_Address'
import { Account_Address } from '../../../../newProcessors/Account_Address'


const UTXOAdd =(getData, symbol) => {
    
  let data=[]
  for (let i=0; i<getData.inputs.length; i++) {

    let timeStamp=getData.inputs[i].timestamp
    let from = 'test'
    let to = getData.address
    let gasUsed = getData.inputs[i].fee
    let gasPrice = 1
    let value = Number(getData.inputs[i].value)
    let hash = getData.inputs[i].hash

    if (typeof (timeStamp) !== 'number') {
      throw new Error('timestamp Error')
    }

    if (typeof (from) !== 'string' && from !== null) {
      throw new Error('from Error')
    }

    if (typeof (to) !== 'string' && to !== null) {
      throw new Error('to Error')
    }

    if (typeof (value) !== 'number') {
      throw new Error('value Error')
    }

    if (typeof (hash) !== 'string') {
      throw new Error('hash Error')
    }

    data.push({
      timeStamp,
      from,
      to,
      gasUsed,
      gasPrice,
      value,
      hash,
      currencyType:`${symbol}`,
      Logo:`${symbol}.png`,
      image:`${symbol}.png`,
      Type:`coin`
    })
  }

  for (let i=0; i<getData.outputs.length; i++) {

    let timeStamp=getData.outputs[i].timestamp
    let from = getData.address
    let to = 'test'
    let gasUsed = getData.outputs[i].fee
    let gasPrice = 1
    let value = Number(getData.outputs[i].value)
    let hash = getData.outputs[i].hash

    if (typeof (timeStamp) !== 'number') {
      throw new Error('timestamp Error')
    }

    if (typeof (from) !== 'string' && from !== null) {
      throw new Error('from Error')
    }

    if (typeof (to) !== 'string' && to !== null) {
      throw new Error('to Error')
    }

    if (typeof (value) !== 'number') {
      throw new Error('value Error')
    }

    if (typeof (hash) !== 'string') {
      throw new Error('hash Error')
    }

    data.push({
      timeStamp,
      from,
      to,
      gasUsed,
      gasPrice,
      value,
      hash,
      currencyType:`${symbol}`,
      Logo:`${symbol}.png`,
      image:`${symbol}.png`,
      Type:"coin"
    })
  }

  return data
}

const AccountBaseAdd =(getData, symbol) => {
  let data = []
  for (let i = 0; i < getData.inputs.length; i++) {
    data.push({
      timeStamp:getData.inputs[i].timestamp,
      from:getData.inputs[i].address,
      to:getData.address,
      gasUsed:getData.inputs[i].fee,
      gasPrice:1,
      value:(Number(getData.inputs[i].value)),
      hash:getData.inputs[i].hash,
      currencyType:`${symbol}`,
      Logo:`${symbol}.png`,
      Type:`coin`
    })
  }

  for (let i = 0; i < getData.outputs.length; i++) {
    data.push({
      timeStamp:getData.outputs[i].timestamp,
      from:getData.address,
      to:getData.outputs[i].address,
      gasUsed:getData.outputs[i].fee,
      gasPrice:1,
      value:(Number(getData.outputs[i].value)),
      hash:getData.outputs[i].hash,
      currencyType:`${symbol}`,
      Logo:`${symbol}.png`,
      Type:"coin"
    })
  }

  for (let i = 0; i < getData.logs.inputs.length; i++) {
    data.push({
      timeStamp:getData.logs.inputs[i].timestamp,
      from:getData.logs.inputs[i].address,
      to:getData.address,
      gasUsed:getData.logs.inputs[i].fee,
      gasPrice:1,
      value:(Number(getData.logs.inputs[i].value)),
      hash:getData.logs.inputs[i].hash,
      currencyType:getData.logs.inputs[i].symbole,
      Logo:`${getData.logs.inputs[i].symbole}.png`,
      Type:"token"
    })
  }

  for (let i = 0; i < getData.logs.outputs.length; i++) {
    data.push({
      timeStamp:getData.logs.outputs[i].timestamp,
      from:getData.address,
      to:getData.logs.outputs[i].address,
      gasUsed:getData.logs.outputs[i].fee,
      gasPrice:1,
      value:(Number(getData.logs.outputs[i].value)),
      hash:getData.logs.outputs[i].hash,
      currencyType:getData.logs.outputs[i].symbole,
      Logo:`${getData.logs.outputs[i].symbole}.png`,
      Type:"token"
    })
  }

  return data
}

const DataTableWithButtons = (props) => {
  const States = useSelector(state => state)
  const dispatch = useDispatch()

  const [numberOfShow, SetNumberofShow] = useState(0)
  const [showData, SetShowData] = useState([])
  const [NoNumberData, SetNoNumberData] = useState([])
  const [DownloadData, SetDownloadData] = useState([])
  const [Loading, SetLoading] = useState(false)
  const [Pagination, SetPagination] = useState(1)

  const getMyTime=(index) => {
    
    const date = new Date(index*1000)
    let month
    let day
    let hour
    let minute

    if (String(Number(date.getMonth())+1).length === 1) {
      month = `0${date.getMonth() + 1}`
    } else {
      month = date.getMonth() + 1
    }

    if (String(date.getDate()).length === 1) {
      day = `0${date.getDate()}`
    } else {
      day = date.getDate()
    }

    if (String(date.getHours()).length === 1) {
      hour = `0${date.getHours()}`
    } else {
      hour = date.getHours()
    }

    if (String(date.getMinutes()).length === 1) {
      minute = `0${date.getMinutes()}`
    } else {
      minute = date.getMinutes()
    }

    return ({
      year:date.getFullYear(),
      month,
      day,
      hour,
      minute
    })
  }

  const columns = [
    {
      name: 'تاریخ',
      sortable: true,
      maxWidth: '160px',
      minWidth: '160px',
      selector: row => row.Date,
      cell:row => {
        return (
          <div>
            {
              States.jalaliCalendar ? 
                <p style={{marginTop:"20px"}}>{digitsEnToFa(getMyTime(row.Date).hour+':'+getMyTime(row.Date).minute+' - '+moment(getMyTime(row.Date).year+'-'+getMyTime(row.Date).month+'-'+getMyTime(row.Date).day, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'))}</p>
              :
                <p style={{marginTop:"20px"}}>{digitsEnToFa(getMyTime(row.Date).hour+':'+getMyTime(row.Date).minute+' - '+getMyTime(row.Date).year+'/'+getMyTime(row.Date).month+'/'+getMyTime(row.Date).day)}</p>
            }
          </div>
        )
      }
    },
    {
      name: 'شناسه تراکنش',
      minWidth: '210px',
      selector: row => (
        <div className='d-flex align-items-end ' style={{cursor:"pointer"}}>
          <div className='user-info text-truncate'>
            <span className='d-block text-truncate ms-0' style={{}}
            onClick={() => { 
              document.getElementById('transactionValue').value = `${row.address}` 
              document.getElementById('MainSubmitBotton').click()
            }}>
              <NiceAddress  text={row.address} number={8}/>
            </span>
          </div>
        </div>
      )
    },
    {
      name: 'نوع',
      minWidth: '120px',
      maxWidth: '120px',
      sortable: true,
      selector: row => row.mode,
      cell: row =>  (
        
          row.mode ? <div className='d-flex align-items-end '>
            <ion-icon name="arrow-forward-outline" className="mb-1" id="inkouft"></ion-icon>
          </div> : <div className='d-flex align-items-end '>
            <ion-icon name="arrow-back-outline" className="mb-1" id="outkouft"></ion-icon>
          </div>
      )
    },
    {
      name: `نوع ارز`,
      sortable: true,
      minWidth: '120px',
      maxWidth: '120px',
      selector: row => (row.currencyType),
      cell: row => {
        if (row.currencyType === 'USDT') {
          console.log(row.currencyType)
          return (
            <div style={{direction:"ltr"}}>
              <img style={{width:"30px", marginTop:"-4px"}} src={`https://cryptologos.cc/logos/tether-usdt-logo.png?v=026`}/>
              <span className='ms-1'>{row.currencyType}</span>
            </div>
          )
        } else {
          return (
            <div style={{direction:"ltr"}}>
              <img style={{width:"30px", marginTop:"-4px"}} src={`../../images/${row.currencyType}.png`}/>
              <span className='ms-1'>{row.currencyType}</span>
            </div>
          )
        }

      }
    },
    {
      name: `حجم تراکنش`,
      sortable: true,
      minWidth: '120px',
      selector: row => row.BTCAmount,
      cell: row => {
        return (
          <div style={{direction:"ltr"}}>
            <span>
              {digitsEnToFa(`${String(parseFloat(Number(row.BTCAmount).toFixed(5)).toString())} `)}
            </span>

            <small style={{fontSize:"10px"}}>
              {row.currencyType}
            </small>
          </div>
        )
      }
    },
    {
      name: `کارمزد (${props.data.symbole}) `,
      sortable: true,
      minWidth: '130px',
      maxWidth: '130px',
      selector: row => { 
        if (Number(row.fee === 0)) {
          return digitsEnToFa('0')
        } else {
          return digitsEnToFa(Math.abs(Number(row.Fee)))
        }
      }
    }
  ]

  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(DownloadData[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = `${props.data.address}.csv`

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  useEffect(() => {
    const myData=[]
    if (NoNumberData.length > 0) {
      for (let i = 0; i < NoNumberData.length; i++) {
        let date=''
        let mode='in'
        if (States.jalaliCalendar) {
          date=(moment(getMyTime(NoNumberData[i].Date).year+'-'+getMyTime(NoNumberData[i].Date).month+'-'+getMyTime(NoNumberData[i].Date).day, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')+' '+getMyTime(NoNumberData[i].Date).hour+':'+getMyTime(NoNumberData[i].Date).minute)
        } else {
          date=(getMyTime(NoNumberData[i].Date).year+'/'+getMyTime(NoNumberData[i].Date).month+'/'+getMyTime(NoNumberData[i].Date).day)+' '+getMyTime(NoNumberData[i].Date).hour+':'+getMyTime(NoNumberData[i].Date).minute
        }
        if (NoNumberData[i].mode) { mode='in' } else { mode='out' }
        
        myData.push({
          hash:NoNumberData[i].address,
          Mode:mode,
          Amount:NoNumberData[i].BTCAmount,
          Time:date,
          Fee:NoNumberData[i].Fee,
          symbole:NoNumberData[i].currencyType
        })
      }
      SetDownloadData(myData)
    } else {
      SetDownloadData('empty')
    }
  }, [NoNumberData])

  //filters
  let filteredData = []
  useEffect(() => {
    const a = 5 * (numberOfShow + 1)

    let filteredData2=[]
    for (let i = 0; i < props.transactions.length; i++) {
      if (States.startAmount > 0) {
        if (props.transactions[i].BTCAmount > States.startAmount) {
          filteredData2.push(props.transactions[i])
        }
      } else {
        filteredData2.push(props.transactions[i])
      }
    }

    let filteredData3=[]
    for (let i = 0; i < filteredData2.length; i++) {
      if (States.endAmount > 0) {
        if (filteredData2[i].BTCAmount < States.endAmount) {
          filteredData3.push(filteredData2[i])
        }
      } else {
        filteredData3.push(filteredData2[i])
      }
    }

    let filteredData4=[]
    for (let i = 0; i < filteredData3.length; i++) {
      if (States.starttime !== 0) {
        if ((filteredData3[i].Date)*1000 >= States.starttime) {
          filteredData4.push(filteredData3[i])
        }
      } else {
        filteredData4.push(filteredData3[i])
      }
    }

    let filteredData5=[]
    for (let i = 0; i < filteredData4.length; i++) {
      if (States.endtime !== 0) {
        if ((filteredData4[i].Date)*1000 <= States.endtime) {
          filteredData5.push(filteredData4[i])
        }
      } else {
        filteredData5.push(filteredData4[i])
      }
    }

    let filteredData6=[]
    for (let i = 0; i < filteredData5.length; i++) {
      if ((filteredData5[i].Type) === States.TokenType) {
        filteredData6.push(filteredData5[i])
      }
    }

    SetNoNumberData(filteredData6)

    filteredData = []
    for (let i = 0; i < filteredData6.length; i++) {
      if (filteredData6[i]) {
        filteredData.push(filteredData6[i])
      }
    }

    SetShowData(filteredData)
  }, [, numberOfShow, props.transactions, States.startAmount, States.endAmount, States.starttime, States.endtime, States.TokenType])
  
  //pagination
  const [currentPage, setCurrentPage] = useState(0)
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }
  const CustomPagination = () => (
    
    <ReactPaginate
      nextLabel=''
      breakLabel='...'
      previousLabel=''
      pageRangeDisplayed={2}
      forcePage={(currentPage)}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      pageCount={Math.ceil(showData.length / 10) || 1}
      onPageChange={page => handlePagination(page)}
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-3'
    />
  )

  const LoadMore = () => {

    SetLoading(!Loading)
    const newPagination = Pagination + 1
    SetPagination(newPagination)

    const getFromApi = () => {
      axios.get(`${serverAddress}/explorer/search/?query=${props.data.address}&network=${props.Token}&page_number=${newPagination}&page_size=10`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
        SetLoading(false)
        if (response.status === 200) {
          console.log('response')
          console.log(response)
          if (props.Token === 'BTC' || props.Token === 'LTC' || props.Token === 'BCH') {
            const getData = UTXO_Address(props.data.address, response.data.data, props.Token, 1)
            if (!getData.isError) {
              const newData = UTXOAdd(getData, props.Token)
              dispatch({type:"paginationData", value:newData})
              dispatch({type:"LoadMore", value:!States.LoadMore})
            } else {
              console.log(getData)
            }
          } else if (props.Token === 'ETH' || props.Token === 'BSC') {
            const getData = Account_Address(response.data.data, props.data.address, props.Token, 1)
            if (!getData.isError) {
              const newData = AccountBaseAdd(getData, props.Token)
              dispatch({type:"paginationData", value:newData})
              dispatch({type:"LoadMore", value:!States.LoadMore})
            } else {
              console.log(getData)
            }
          }

        } else if (response.status === 404) {

          return toast.error('تراکنش دیگری وجود ندارد.', {
            position: 'bottom-left'
          })
        }
        console.log(response)
      })
      .catch((err) => {
        SetLoading(false)
        console.log('err')
        console.log(err)
        if (err.response.status === 404) {
          return toast.error('تراکنش دیگری وجود ندارد.', {
            position: 'bottom-left'
          })
        } else {
          return toast.error('خطا در پردازش', {
            position: 'bottom-left'
          })
        }
      })
    }

    getFromApi()
  }

  const LoadMore2 = () => {
    let getPage = States.AddressPagination
    getPage = getPage + 1
    dispatch({type:"AddressPagination", value:getPage})
  }

  return (
    <Fragment>
      <Card style={{boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom' id="mainTable">
          <CardTitle className='mb-2' tag='h3' id="CardTitle">
            <div className='row' style={{textAlign:'right'}}>
              <div className='col-sm-6 mt-2'>
                آخرین تراکنش‌ها
              </div>
              <div className='col-sm-6 mt-2 hamoniKeMahdudiatDare3'>
                <TokenSwitch color={props.data.color} transactions={props.transactions}/>
              </div>
            </div>
          </CardTitle>
          <div style={{width:"100%"}}>
            <div className='row'>
              <div className='col-12 hamoniKeMahdudiatDare hamoniKeMahdudiatDare2' style={{textAlign:'right'}}>
                <div className='exploreLimitBox exploreTimeLimitBox'>
                  <TimeLimit/>
                </div>

                <div className='exploreLimitBox exploreAmountLimitBox'>
                  <AmountLimit name={props.data.name}/>
                </div>

                <div className='exploreLimitBox exploreDownloadBox'>
                  <Download id='AddressDownloadIcon' style={{cursor:"pointer", marginTop:"12px"}} onClick={() => { downloadCSV(DownloadData) }} />
                  <UncontrolledTooltip placement='top' target='AddressDownloadIcon'>
                    دریافت
                  </UncontrolledTooltip>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            columns={columns}
            // paginationDefaultPage={currentPage + 1}
            // paginationComponent={CustomPagination}
            // pagination
            // sortIcon={<ChevronDown size={10} />}
            // selectableRowsComponent={BootstrapCheckbox}
            className='react-dataTable'
            data={ showData }
          />
        </div>
        <div style={{textAlign:'center'}}>
          <Card onClick={LoadMore2} style={{borderColor:'gray', borderWidth:'1px', borderStyle:'solid', width:'200px', cursor:'pointer', margin:'8px 0px', marginLeft:'auto', marginRight:'auto', height:'40px', transition:'0s'}} 
            className = {!Loading ? 'p-2' : 'p-2 pt-3'}
          >
            {
              Loading ? 
                <LoadingButton/>
              :
                <span>
                  نمایش بیشتر
                </span>
            }
          </Card>
        </div>
      </Card>
    </Fragment>
  )
}

export default DataTableWithButtons
