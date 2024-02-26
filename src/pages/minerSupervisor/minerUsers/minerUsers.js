/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** Table Columns
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Row, Col} from 'reactstrap'
import LocalLoading from '../../../components/localLoading/localLoading'
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'

const MinerUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:7})
    }, [])

    const basicColumns = [
        {
            name: 'نام برند',
            sortable: true,
            maxWidth: '120px',
            minWidth: '120px',
            selector: row => row.BrandName
        },
        {
            name: 'نام استخراج‌کننده',
            sortable: true,
            maxWidth: '170px',
            minWidth: '170px',
            selector: row => row.name
        },
        {
            name: 'ایمیل',
            sortable: true,
            minWidth: '270px',
            maxWidth: '270px',
            selector: row => row.Email
        },
        {
            name: 'شماره تلفن',
            sortable: true,
            minWidth: '160px',
            maxWidth: '160px',
            selector: row => row.phoneNumber
        },
        {
          name: 'وبسایت',
          minWidth: '150px',
          maxWidth: '150px',
          selector: row => (
            row.website
          )
        }
    ]

    const [Data, SetData] = useState([])
    const [Loading, SetLoading] = useState(false)

    useEffect(() => {
        SetLoading(true)
        axios.get(`${serverAddress}/miners/operation/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
        SetLoading(false)
        console.log('response')
        console.log(response)
          if (response.status === 200) {
            const getData = []
            for (let i = 0; i < response.data.results.length; i++) {
                getData.push(
                    {
                        BrandName:response.data.results[i].name_brand,
                        name:`${response.data.results[i].interface_fname} ${response.data.results[i].interface_lname}`,
                        phoneNumber: response.data.results[i].interface_phone_number,
                        Email: response.data.results[i].email,
                        website: response.data.results[i].website
                    }
                )
            }
            SetData(getData)
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
    }, [])

    return (
        <div className='container-fluid mt-5'>
            <Row>
                <Col  xl={{size:1}} lg={{size:0}} md={{size:0}}></Col>
                <Col  
                 xl={{size:10}} lg={{size:10}} md={{size:12}}                
                    style={{
                      textAlign: 'center', 
                      maxWidth: '1280px', 
                      marginLeft: 'auto', 
                      marginRight: 'auto'
                    }}>
                    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)", textAlign:'right'}}>
                        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                        <CardTitle tag='h6' style={{width:'100%'}}>
                            لیست استخراج کننده‌ها
                                {/* <ion-icon size={18} onClick={ () => { 
                            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-6px'}} className='ms-2' name="refresh-circle-outline"></ion-icon> */}
                        </CardTitle>
                        </CardHeader>

                        {
                        
                        Loading ? 
                        <div className='mt-5'>
                            <LocalLoading/> 
                        </div>
                        : 
                            Data.length > 0 ?
                            <div className='react-dataTable'>
                            <DataTable
                                noHeader
                                data={Data}
                                columns={basicColumns}
                                className='react-dataTable'
                            />
                            </div>
                            :
                            <p style={{textAlign:'center'}} className='mt-3'>بدون اطلاعات ثبت شده</p>
                        }
                
                    </Card>
                </Col>
                <Col xl={{size:1}} lg={{size:0}} md={{size:0}}></Col>
            </Row>
        </div>

    )
}

export default MinerUsers
