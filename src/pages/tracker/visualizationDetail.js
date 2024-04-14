/* eslint-disable object-shorthand */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable multiline-ternary */
/* eslint-disable array-bracket-spacing */
/* eslint-disable comma-spacing */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import './tracker.css'
import NiceAddress2 from '../../components/niceAddress2/niceAddress'
import CardAction2 from '@components/card-actions/index2'
import { digitsEnToFa } from 'persian-tools'
import { useSelector, useDispatch } from "react-redux"
import { CardBody, CardHeader, Row, Col, Table, Label, Modal, ModalBody, ModalFooter, Button, Input, InputGroup, InputGroupText } from 'reactstrap'
import Cookies from 'js-cookie'
import axios from 'axios'
import { serverAddress } from '../../address'
import toast from 'react-hot-toast'
import LoadingButton from '../../components/loadinButton/LoadingButton'
import { useParams } from "react-router-dom"
import { Trash2, Folder } from 'react-feather'
import Chip from '@mui/material/Chip'

const VisualizationDetail = (props) => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)
  
  const [ Address , SetAddress] = useState(false)
  const [ ColorType , SetColorType] = useState('red')
  const [ OpenSaveBox , SetOpenSaveBox] = useState(false)
  const [ Loading , SetLoading] = useState(false)
  const [ Name , SetName] = useState(props.GraphName)
  const [ Description , SetDescription] = useState(props.GraphDescription)
  const [SelectedCase, setSelectedCase] = useState(false)
  const [CaseModal, setCaseModal] = useState(false)
  const [CaseList, setAddCaseList] = useState(false)

  const { id } = useParams()
  const { network } = useParams()

  useEffect(() => {
    SetName(props.GraphName)
    SetDescription(props.GraphDescription)
  }, [,props.GraphName, props.GraphDescription])

  const saveGraph = () => {
    const GraphData = States.GraphData
    const Scale = States.Scale
    const positionX = States.positionX
    const positionY = States.positionY
    const NodesPosition = States.NodesPosition
    const itemNumbers = States.itemNumbers
    const Network = States.Network
    const networkName = network
    const SavedPositions = States.SavedPositions
    const edgesColors = States.edgesColors
    let GraphName
    let GraphDescription

    GraphName = document.getElementById('GraphName').value
    GraphDescription = document.getElementById('GraphDescription').value

    if (GraphName !== '' || id !== undefined) {
      if (GraphData.length > 0) {
        if (id !== undefined) {
          SetLoading(true)
          //Error Done
          axios.put(`${serverAddress}/tracing/graph/${Number(id)}/`, 
          {
            value:{
              GraphName,
              Network,
              GraphDescription,
              itemNumbers,
              GraphData,
              Scale,
              positionX,
              positionY,
              NodesPosition:States.NodesPosition,
              networkName,
              SavedPositions,
              edgesColors
            },
            title:GraphName
          },
          {headers: {Authorization: `Bearer ${Cookies.get('access')}`}})
          .then((response) => {
            SetLoading(false)
            //adad daghigh set she
            if (response.status === 200) {
              SetOpenSaveBox(false)
              window.location.assign(`/tracker/loadGraph/${networkName}/${response.data.id}`)
              return toast.success('با موفقیت ذخیره شد.', {
                position: 'bottom-left'
              })
              
            } else {
              return toast.error('ناموفق', {
                position: 'bottom-left'
              })
            }
          })
          .catch((err) => {
            SetLoading(false)
            console.log('err.response')
            console.log(err.response)
            try {
              if (err.response.status === 403) {
                Cookies.set('refresh', '0')
                Cookies.set('access', '0')
                window.location.assign('/')
              } else if (err.response.status === 401) {
                Cookies.set('refresh', '0')
                Cookies.set('access', '0')
                window.location.assign('/')
              } else {
                return toast.error('ناموفق', {
                  position: 'bottom-left'
                })
              }
            } catch (error) {
              return toast.error('ناموفق', {
                position: 'bottom-left'
              })
            }
          })
        } else {
          SetLoading(false)
          //Error Done
          axios.post(`${serverAddress}/tracing/graph/`, 
          {
            value:{
              GraphName,
              GraphDescription,
              itemNumbers,
              GraphData,
              Scale,
              positionX,
              positionY,
              NodesPosition,
              Network,
              networkName,
              SavedPositions,
              edgesColors
            },
            title:GraphName
          },
          {headers: {Authorization: `Bearer ${Cookies.get('access')}`}})
          .then((response) => {
            console.log(response)
            SetLoading(false)
            if (response.status === 201) {
              SetOpenSaveBox(false)
              window.location.assign(`/tracker/loadGraph/${networkName}/${response.data.id}`)
            } else {
              return toast.error('ناموفق', {
                position: 'bottom-left'
              })
            }
          })
          .catch((err) => {
            SetLoading(false)
            console.log(err.response.status)
            try {
              if (err.response.status === 403) {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
                return toast.error('دوباره به حساب کاربری وارد شوید.', {
                  position: 'bottom-left'
                })
              } else if (err.response.status === 401) {
                Cookies.set('refresh', '')
                Cookies.set('access', '')
                window.location.assign('/')
                return toast.error('دوباره به حساب کاربری وارد شوید.', {
                  position: 'bottom-left'
                })
              } else {
                return toast.error('ناموفق', {
                  position: 'bottom-left'
                })
              }
            } catch (error) {
              return toast.error('ناموفق', {
                position: 'bottom-left'
              })
            }
          })
        }
      } else {
        return toast.error('گراف رسم نشده است.', {
          position: 'bottom-left'
        })
      }
    } else {
      return toast.error('عنوان گراف نباید خالی باشد.', {
        position: 'bottom-left'
      })
    }
  }

  let BoxTitle
  if (id === undefined) {
    BoxTitle = 'نمایش گراف'
  } else {
    BoxTitle = `${Name}`
  }

  useEffect(() => {
    if (props.hash !== undefined) {
      SetAddress(props.hash)
    } else { SetAddress(false) }
  }, [,props.hash])

    //case
    useEffect(() => {
      axios.get(`${serverAddress}/case/management/`, 
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('access')}`
        }
      })
      .then((response) => {
          setAddCaseList(response.data)
          console.log('response.data')
          console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [])

  const [LastCaseSelected, SetLastCaseSelected] = useState(false)
  const [LastCaseId, SetLastCaseId] = useState(null)
  const handleCase = () => {
    SetLastCaseSelected(false)
    setSelectedCase(false)
  }

  return (
    <div id="visualizationDetail">
    <Fragment>
      <Row >
        <Col md='12' sm='12' id='visualisationDetailCol'>
          <CardAction2 
          title={BoxTitle} 
          actions='collapse' onClick='collapse' 
          >
          <CardBody className='pt-2'>
            <div className='container-fluid'>
              <div className='row'>
                <hr/>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <p style={{display:"inline-block", marginLeft:"20px"}}>تعداد آیتم ها</p>
                  {
                    States.itemNumbers === 0 ? 
                    <small> ۰ از {digitsEnToFa(500)}</small>
                    :
                    <small>{digitsEnToFa(States.itemNumbers)} از {digitsEnToFa(500)}</small>
                  }
                </div>
                <hr/>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <p style={{ marginLeft:"20px"}}>تنظیمات</p>

                  <div className='row'>
                    <div className='col-md-12'>
                    <small>نمایش مقادیر</small>
                    <FormControlLabel control={<Switch defaultChecked
                      onChange={ (event) => {
                        dispatch({type:"showValues", value:(event.target.checked)})
                      }}
                    />} style={{float:"left"}}/>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                    <small>نمایش زمان</small>
                    <FormControlLabel control={<Switch
                      onChange={ (event) => {
                        dispatch({type:"showTime", value:(event.target.checked)})
                      }}
                    />} style={{float:"left"}}/>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                    <small>نمایش قیمت دلاری</small>
                    <FormControlLabel control={<Switch
                      onChange={ (event) => {
                        dispatch({type:"showDollar", value:(event.target.checked)})
                      }}
                    />} style={{float:"left"}}/>
                    </div>
                  </div>

                </div>
                <hr/>
              </div>


              <div className='row'>
                <div className='col-md-12'>
                  <h6 style={{display:'inline-block'}}>رنگ</h6>
                  <div style={{display:'inline-block', float:'left'}}>
                    <Input
                      onClick={ () => {
                          if (ColorType === 'red') {
                            dispatch({type:"graphAddColor", value:!States.graphAddColor})
                          }
                      } } 
                      onChange={
                        () => {
                          dispatch({type:"ColorType", value:'red'})
                          dispatch({type:"UpdateColorType", value:!States.UpdateColorType})
                          SetColorType('red')
                        }
                      }
                      type='radio' 
                      className='ms-1' name='kuft' defaultChecked style={{borderColor:'red', backgroundColor:'red'}} 
                    />

                    <Input
                      onClick={ () => {
                          if (ColorType === 'orange') {
                            dispatch({type:"graphAddColor", value:!States.graphAddColor})
                          }
                      } }  
                      onChange={
                        () => {
                          dispatch({type:"ColorType", value:'orange'})
                          dispatch({type:"UpdateColorType", value:!States.UpdateColorType})
                          SetColorType('orange')
                        }
                      }
                      type='radio' className='ms-1' name='kuft' style={{borderColor:'orange', backgroundColor:'orange'}}  
                    />

                    <Input
                      onClick={ () => {
                          if (ColorType === 'blue') {
                            dispatch({type:"graphAddColor", value:!States.graphAddColor})
                          }
                      } }  
                      onChange={
                        () => {
                          dispatch({type:"ColorType", value:'blue'})
                          dispatch({type:"UpdateColorType", value:!States.UpdateColorType})
                          SetColorType('blue')
                        }
                      }
                      type='radio' className='ms-1' name='kuft' style={{borderColor:'blue', backgroundColor:'blue'}} 
                    />

                    <Input
                      onClick={ () => {
                          if (ColorType === 'purple') {
                            dispatch({type:"graphAddColor", value:!States.graphAddColor})
                          }
                      } }  
                      onChange={
                        () => {
                          dispatch({type:"ColorType", value:'purple'})
                          dispatch({type:"UpdateColorType", value:!States.UpdateColorType})
                          SetColorType('purple')
                        }
                      }
                      type='radio' className='ms-1' name='kuft' style={{borderColor:'purple', backgroundColor:'purple'}}  
                    />

                    <Trash2 onClick={ () => { dispatch({type:"deleteColor", value:!States.deleteColor}) } } size={18} style={{cursor:'pointer'}} />
                  </div>

                </div>
              </div>
              <hr/>
              <div className='row'>
                {
                  id !== undefined ? 
                  <div className='col-md-12'>
                  <Button.Ripple outline color='secondary' onClick={ () => { setCaseModal(!CaseModal) } } className="p-2">
                    <Folder size={18} onClick={ () => { setCaseModal(!OpenSaveBox) } } title={'ذخیره'} style={{fontSize:'15px', marginLeft:'12px', cursor:'pointer', color:'gray'}} name="save-outline"/>
                    <span className='align-middle ms-25' style={{color:'gray', fontSize:'13px'}}>افزودن به پرونده</span>
                  </Button.Ripple>
                </div>
                :
                null
                }

                <div className='col-md-6'>
                  <Button.Ripple outline color='secondary' onClick={ () => { SetOpenSaveBox(!OpenSaveBox) } } className="p-2 mt-3">
                    <ion-icon onClick={ () => { SetOpenSaveBox(!OpenSaveBox) } } title={'ذخیره'} style={{fontSize:'20px', marginLeft:'12px', cursor:'pointer', color:'gray'}} name="save-outline"></ion-icon>
                    <span className='align-middle ms-25' style={{color:'gray', fontSize:'13px'}}>ذخیره</span>
                  </Button.Ripple>
                </div>

              </div>

            </div>
          </CardBody>
        </CardAction2>
        </Col>
      </Row>
    </Fragment>

    <Modal
      isOpen={OpenSaveBox}
      className='modal-dialog-centered'
      toggle={ () => { SetOpenSaveBox(false) } }
      modalClassName={'modal-danger'}
    >
      <ModalBody>
        {
          id === undefined ?
          <>
            <h6>ذخیره گراف</h6>
            <Input placeholder='عنوان گراف' id='GraphName'/>
            <Input
              id='GraphDescription'
              type='textarea'
              name='text'
              className='mt-3'
              placeholder='توضیحات'
              style={{ minHeight: '100px' }}
            />
          </>
          :
          <>
            <h6>ذخیره گراف</h6>
            <Input placeholder='عنوان گراف' defaultValue={Name} id='GraphName'/>
            <Input
              id='GraphDescription'
              type='textarea'
              name='text'
              defaultValue={Description} 
              className='mt-3'
              placeholder='توضیحات'
              style={{ minHeight: '100px' }}
            />
          </>
        }

      </ModalBody>
      <ModalFooter>

        <Button onClick={ () => {
          SetName(document.getElementById('GraphName').value)
          SetDescription(document.getElementById('GraphDescription').value)
          saveGraph()
        }} 
        color={'primary'} style={{height:'37px', width:'80px'}}>
          {
            Loading ? 
              <LoadingButton/>
            :
            <span>ذخیره</span>
          }
        </Button>

      </ModalFooter>
    </Modal>

      {/* پرونده */}
      <Modal
        isOpen={CaseModal}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => setCaseModal(!CaseModal)}
        
      >
        <ModalBody>
          <h6>پرونده مورد نظر خود را بسازید یا از لیست زیر انتخاب کنید.</h6>
          {
            !LastCaseSelected ? 
              <form onSubmit={ (e) => {
                e.preventDefault()
                if (LastCaseSelected) {
                  GetTag(SelectedCase)
                } else {
                  GetTag(document.getElementById('CreateNewTagInput').value)
                }
                SetLastCaseSelected(false)
                setCaseModal(false)   
              } }>
                <Input id='CreateNewCaseInput' placeholder='نام پرونده' />
                <Input id='CreateNewCaseNote' type='textarea' className='mt-3' placeholder='توضیحات'/>
              </form>
            :
              <Chip label={SelectedCase} onDelete={handleCase} style={{direction:'ltr'}} />
          }
          {
            CaseList === false ? 
              <p>در حال دریافت اطلاعات...</p>
            :
            CaseList.length === 0 ? 
              <p>بدون پرونده ذخیره شده</p>
            :
              <>
                <p className='mt-3'>
                  لیست پرونده های ساخته شده
                </p>
                {
                  CaseList.map((item, index) => {
                    return (
                      <div style={{ marginTop:'4px'}}>
                        <Chip label={item.name} style={{direction:'ltr', cursor:'pointer'}} onClick={ () => { SetLastCaseSelected(true), setSelectedCase(item.name), SetLastCaseId(item.id) } }/>
                      </div>
                    )
                  })
                }
              </>

          }
        </ModalBody>
        <ModalFooter>

          <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { 
            if (LastCaseSelected) {
                axios.post(serverAddress + "/case/graph-list/", 
                {
                    graph_detail: {
                      id:id,
                      network:network,
                      name:Name,
                      Description:Description
                    },
                    case: LastCaseId
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('access')}`
                    }
                }
              )
              .then((response) => {
                  console.log(response)
                  if (response.status === 201) {
                    return toast.success('به پرونده افزوده شد', {
                      position: 'bottom-left'
                    })
                  }
              })
              .catch((err) => {
                  console.log(err)
                  return toast.error('خطا در پردازش', {
                    position: 'bottom-left'
                  })
              })
            } else {
              axios.post(`${serverAddress}/case/management/`, 
              {
                name:document.getElementById('CreateNewCaseInput').value,
                note_detail:document.getElementById('CreateNewCaseNote').value
              },
              {
                headers: {
                  Authorization: `Bearer ${Cookies.get('access')}`
                }
              })
              .then((response) => {
                if (response.status === 201) {
                  console.log(response)
                  console.log(
                    {
                      graph_detail: {
                        id:id,
                        network:network,
                        name:Name,
                        Description:Description
                      },
                      case: response.data.id
                  }
                  )
                  axios.post(serverAddress + "/case/graph-list/", 
                  {
                      graph_detail: {
                        id:id,
                        network:network,
                        name:Name,
                        Description:Description
                      },
                      case: response.data.id
                  },
                  {
                      headers: {
                          Authorization: `Bearer ${Cookies.get('access')}`
                      }
                  }
                )
                .then((response2) => {
                    console.log(response2)
                    if (response2.status === 201) {
                      return toast.success('به پرونده افزوده شد', {
                        position: 'bottom-left'
                      })
                    }
                })
                .catch((err) => {
                    console.log(err)
                    return toast.error('خطا در پردازش', {
                      position: 'bottom-left'
                    })
                })
                }
              })
              .catch((err) => {
                SetAddLoading(false)
                console.log(err)
              })
            }
            SetLastCaseSelected(false)
            setCaseModal(false) 
          } }>
            {
              Loading ? 
              <LoadingButton/>
              :
              <span>
            افزودن
              </span>
            }
          </Button>
        </ModalFooter>
      </Modal>
    </div>
    
  )
}

export default VisualizationDetail