import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { Input, Button } from 'reactstrap'
import Entityfilters from '../../components/entities/filters'
import EntityTable from '../../components/entities/entityRightTable'
import EntityList from '../../components/entities/entityList'
import EntityDynamicList from '../../components/entities/entityDynamicList'
import EntityCurrencies from '../../components/entities/entityCurrencies'
import { MainSiteOrange } from '../../../public/colors'
import './entities.css'
const Entities = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:2})
    }, [])
    return (
        <div className='container-fluid mt-3'>
            <div className='row' style={{background:"rgb(240,240,240)", borderRadius:"8px"}}>
                <div className='col-lg-3 p-3' style={{}}>
                    <div className='bg-white p-2' style={{borderRadius:"8px", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
                        <h5 className='me-1 mt-1'>موجودیت ها <small style={{color:"gray"}}>(44787)</small></h5>
                        <hr/>
                        <div className='row'>
                            <div className='col-8'>
                                <Input placeholder='جست و جو...' style={{width:"100%", display:"inline-block"}}></Input>
                            </div>
                            <div className='col-4' style={{textAlign:"left"}}>
                                <Button.Ripple color='warning' style={{maxWidth:"100%"}}>
                                    <span className='align-middle' style={{}}>فیلترها</span>
                                </Button.Ripple>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <Entityfilters/>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <EntityTable/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-lg-9 p-3'>
                    <div className='bg-white p-2' style={{borderRadius:"8px", minHeight:"100vh", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
                        <div className='container-fluid'>
                            <div className='row'>
                                <h4>آریان کوین</h4>
                            </div>
                            <div className='row mb-2' id='entitiesMenu'>
                                <div className='col-lg-8'>
                                    <span className='pb-2 EnMenuOption' style={{ cursor:"pointer", borderBottomStyle:"solid", borderBottomColor:MainSiteOrange, borderWidth:"3px"}}> نمای کلی </span>
                                    <span className='EnMenuOption' style={{ cursor:"pointer"}}> اطلاعات ثبت </span>
                                    <span className='EnMenuOption' style={{ cursor:"pointer"}}> ارتباطات </span>
                                    <span className='EnMenuOption' style={{ cursor:"pointer"}}> دارایی های پشتیبانی شده </span>
                                </div>
                                <div className='col-lg-4 showInResearcher'>
                                    <span style={{background:"rgb(240,240,240)", borderRadius:"8px", cursor:"pointer"}}>مشاهده در کاوشگر</span>
                                </div>  
                            </div>
                            <hr style={{marginTop:"2px"}}/>
                            
                            <div className='row'>
                                <div className='col-12'>
                                    <EntityList/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6 mt-3'>
                                    <EntityDynamicList/>
                                </div>
                                <div className='col-lg-6 mt-3'>
                                    <EntityCurrencies/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Entities
