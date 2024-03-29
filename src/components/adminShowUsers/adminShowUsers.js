/* eslint-disable no-unused-expressions */
/* eslint-disable no-duplicate-imports */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** Table Columns
import { useState, useEffect } from 'react'
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit3, X } from 'react-feather'
import EditUser from './adminEditUser'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Row, Col} from 'reactstrap'
import LocalLoading from '../localLoading/localLoading'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../public/colors'
import { 
  TabPane,
  NavItem,
Input, InputGroup, InputGroupText} from 'reactstrap'
import './style.css'
const DataTablesBasic = () => {
    const [users, setUsers] = useState([])
    const [number, SetNumber] = useState(1)
    const [IsSearch, setIsSearch] = useState(false)
    const [SearchNumber, setSearchNumber] = useState(0)
    const [SearchedData, SetSearchedData] = useState([])
    const [Loading, SetLoading] = useState(false)

    const dispatch = useDispatch()

    const [Edit, setEdit] = useState(false)
    const handleEdit = () => setEdit(!Edit)
    const States = useSelector(state => state)

    const basicColumns = [
      {
          name: 'آی‌دی',
          sortable: true,
          maxWidth: '90px',
          minWidth: '90px',
          selector: row => row.id
      },
      {
          name: 'نام کاربری',
          sortable: true,
          maxWidth: '170px',
          minWidth: '170px',
          selector: row => row.username
      },
      {
          name: 'ایمیل',
          sortable: true,
          minWidth: '270px',
          maxWidth: '270px',
          selector: row => row.email
      },
      {
          name: 'شماره تلفن',
          sortable: true,
          minWidth: '160px',
          maxWidth: '160px',
          selector: row => row.phone_number
      },
      {
        name: 'نقش',
        minWidth: '150px',
        maxWidth: '150px',
        selector: row => (
          row.role
        )
      },
      {
        name: 'ویرایش',
        minWidth: '90px',
        maxWidth: '90px',
        cell: row => (
          <Edit3 onClick={() => { 
            handleEdit()
            SetNumber(row.id)
           }}  size={25} style={{marginLeft:'8px', color:'rgb(160,160,160)', cursor:'pointer'}}/>
        )
      }
    ]

    useEffect(() => {
      if (States.rollsLoading === 1) {
        let getUsers = []
        dispatch({type:"CustomLoading", value:true})
        axios.get(`${serverAddress}/accounts/users`, 
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('access')}`
          }
        })
        .then((response) => {
          console.log(response)
            if (response.data.results.length > 0) {
                getUsers = response.data.results
                axios.get(`${serverAddress}/accounts/role/`, 
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get('access')}`
                  }
                })
                .then((resp2) => {
                    if (resp2.data.results.length > 0) {
                        for (let i = 0; i < getUsers.length; i++) {
                          for (let j = 0; j < resp2.data.results.length; j++) {
                            if (String(getUsers[i].role) === String(resp2.data.results[j].id)) {
                              getUsers[i].role = resp2.data.results[j].name
                            }
                          }
                        }
                        setUsers(getUsers)
                    }
                    dispatch({type:"CustomLoading", value:false})
                })
                .catch((err) => {
                    dispatch({type:"CustomLoading", value:false})
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
            }
        })
        .catch((err) => {
            dispatch({type:"CustomLoading", value:false})
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
        }
      )
      }
    }, [, States.beLoad, States.rollsLoading])

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
        pageCount={Math.ceil(IsSearch ? SearchedData.length / 10 : users.length / 10) || 1}
        onPageChange={page => handlePagination(page)}
        containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-center pe-1 mt-3'
      />
    )

    
    const UserSearch = (check) => {
      const value = document.getElementById('UserSearch').value
      //form submit
      if (value.length >= 3) {
          if (check) {
              SetLoading(true)
              
              axios.get(`${serverAddress}/accounts/search-users/?search=${value}`, 
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get('access')}`
                }
              })
              .then((response) => {
              SetLoading(false)
              console.log(response)
  
                if (response.status === 200) {
                  let getData = []
                  getData = response.data
                  SetSearchedData(getData)
                }
              })
              .catch((err) => {
                console.log(err)
                  SetLoading(false)
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
  
          //onChange
          } else {
              SetLoading(true)
              axios.get(`${serverAddress}/accounts/search-users/?search=${value}`, 
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get('access')}`
                }
              })
              .then((response) => {
                  console.log(response)
              SetLoading(false)
              if (response.status === 200) {
                let getData = []
                getData = response.data
                SetSearchedData(getData)
              }
              })
              .catch((err) => {
                console.log(err)
                  SetLoading(false)
                
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
          }
          if (value.length !== 0) {
              setIsSearch(true)
          } else {
              setIsSearch(false)
              SetSearchedData([])
          }
      } else {
          setIsSearch(false)
          SetLoading(false)
          SetSearchedData([])
      }

  }

  useEffect(() => {
    if (States.rollsLoading === 1) {
        document.getElementById('UserSearch').focus()
    }
}, [States.rollsLoading])

  return (
    <Card className='overflow-hidden' style={{margin:"0px", boxShadow:"none", borderStyle:"solid", borderWidth:"1px", borderColor:"rgb(210,210,210)"}}>
      <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
        <CardTitle tag='h6' style={{width:'100%'}} id='userList'>لیست کاربران
              <ion-icon size={18} onClick={ () => { 
              dispatch({type:"beLoad", value:!(States.beLoad)})
            }} id="reLoadAdminPanelIcon" style={{float:'left', border:"none", padding:"8px 0px", borderRadius:"8px", fontSize:"25px", cursor:'pointer', transition: 'transform 0.3s', marginTop:'-3px'}} className='ms-2' name="refresh-circle-outline"></ion-icon>
              <form style={{float:'left', display:'inline-block', width:'200px', marginLeft:'16px'}} onSubmit={ (e) => { e.preventDefault(), UserSearch(true) }} >
                <InputGroup id='MainDashboardInputGroup' className='input-group-merge mb-2' style={{direction:'ltr', borderColor:'red', width:'100%'}}>
                    <InputGroupText id='MainDashboardInputSymbole' onClick={ () => {
                        document.getElementById('UserSearch').value = ''
                        UserSearch(false)
                    }}>
                        {
                            SearchNumber > 0 ?
                                <X size={16} />
                            :
                                null
                        }
                    </InputGroupText>
                    <Input placeholder='جست‌وجو' id='UserSearch' onChange={ (e) => { UserSearch(false), setSearchNumber(e.target.value.length) }} />
                </InputGroup>
            </form>
        </CardTitle>
      </CardHeader>
      {
        States.CustomLoading || Loading ? 
        <div className='mt-5'>
          <LocalLoading/> 
        </div>
        : 
          <div className='react-dataTable'>
            <DataTable
              noHeader
              data={IsSearch ? SearchedData : users}
              columns={basicColumns}
              paginationDefaultPage={currentPage + 1}
              paginationComponent={CustomPagination}
              pagination
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
            />
          </div>
      }
 

      <EditUser users={users.find(item => item.id === number)} open={Edit} handleModal={handleEdit}/>

    </Card>
  )
}

export default DataTablesBasic

