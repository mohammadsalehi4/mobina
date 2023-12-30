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
import CardAction from '@components/card-actions'
import { digitsEnToFa } from 'persian-tools'
import { useSelector, useDispatch } from "react-redux"
import { CardBody, CardHeader, Row, Col, Table, Label, Modal, ModalBody, ModalFooter, Button, Input, InputGroup, InputGroupText } from 'reactstrap'
import Cookies from 'js-cookie'
import axios from 'axios'
import { serverAddress } from '../../address'
import toast from 'react-hot-toast'
import LoadingButton from '../../components/loadinButton/LoadingButton'
import { useParams } from "react-router-dom"
import { Trash2 } from 'react-feather'

const VisualizationDetail = (props) => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)
  
  const [ Address , SetAddress] = useState(false)
  const [ ColorType , SetColorType] = useState('red')
  const [ OpenSaveBox , SetOpenSaveBox] = useState(false)
  const [ Loading , SetLoading] = useState(false)
  const [ Name , SetName] = useState(props.GraphName)
  const [ Description , SetDescription] = useState(props.GraphDescription)
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
            }
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
            }
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
  return (
    <div id="visualizationDetail">
    <Fragment>
      <Row >
        <Col md='12' sm='12' id='visualisationDetailCol'>
          <CardAction 
          title={BoxTitle} 
          actions='collapse' onClick='collapse' 
          >
          <CardBody className='pt-2'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  {/* <form onSubmit={ (event) => { 
                    event.preventDefault()
                    window.location.assign(`/tracker/${document.getElementById('MainDashboardInputBox').value}`) 
                  }}>
                    <InputGroup id='MainDashboardInputGroup' className='input-group-merge m-0 mb-3' style={{direction:'ltr', borderColor:'red', width:'100%'}}>
                      <InputGroupText id='MainDashboardInputSymbole' onClick={ () => { window.location.assign(`/tracker/${document.getElementById('MainDashboardInputBox').value}`) } }>
                          <Search size={16} />
                      </InputGroupText>
                      <Input id='MainDashboardInputBox' placeholder='آدرس یا شناسه تراکنش' />
                    </InputGroup>
                  </form> */}
                </div>
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
                    className='ms-1' name='kuft' defaultChecked style={{borderColor:'red', backgroundColor:'red'}} />

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
                    type='radio' className='ms-1' name='kuft' style={{borderColor:'orange', backgroundColor:'orange'}}  />

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
                    type='radio' className='ms-1' name='kuft' style={{borderColor:'blue', backgroundColor:'blue'}}  />

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
                    type='radio' className='ms-1' name='kuft' style={{borderColor:'purple', backgroundColor:'purple'}}  />

                    <Trash2 onClick={ () => { dispatch({type:"deleteColor", value:!States.deleteColor}) } } size={18} style={{cursor:'pointer'}} />
                  </div>

                </div>
              </div>
              <hr/>
              <div className='row'>
                <div className='col-md-12'>
                  <Button.Ripple outline color='secondary' onClick={ () => { SetOpenSaveBox(!OpenSaveBox) } } className="p-2">
                    <ion-icon onClick={ () => { SetOpenSaveBox(!OpenSaveBox) } } title={'ذخیره'} style={{fontSize:'20px', marginLeft:'12px', cursor:'pointer', color:'gray'}} name="save-outline"></ion-icon>
                    <span className='align-middle ms-25' style={{color:'gray', fontSize:'13px'}}>ذخیره</span>
                  </Button.Ripple>
                  {/* <p style={{display:"inline-block"}}>ذخیره گراف</p> */}
                  {/* <ion-icon onClick={ () => { SetOpenSaveBox(!OpenSaveBox) } } title={'ذخیره'} style={{fontSize:'20px', marginRight:'12px', marginBottom:'-4px', cursor:'pointer'}} name="save-outline"></ion-icon> */}
                </div>
              </div>

            </div>
          </CardBody>
        </CardAction>
        </Col>
      </Row>
    </Fragment>

    <Modal
      isOpen={OpenSaveBox}
      className='modal-dialog-centered'
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
        color={'warning'} style={{height:'37px', width:'80px'}}>
          {
            Loading ? 
              <LoadingButton/>
            :
            <span>ذخیره</span>
          }
        </Button>
        <Button onClick={ () => { SetOpenSaveBox(false) } } color={'danger'} style={{height:'37px', width:'80px'}}>
          بازگشت
        </Button>
      </ModalFooter>
    </Modal>
    </div>
    
  )
}

export default VisualizationDetail