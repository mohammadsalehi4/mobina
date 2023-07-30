import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { InputGroup, Input, Button } from 'reactstrap'
import Entityfilters from '../../components/entities/filters'
import EntityList from '../../components/entities/entityList'
const Entities = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:2})
    }, [])
    return (
        <div className='container-fluid mt-3'>
            <div className='row' style={{background:"rgb(240,240,240)", borderRadius:"8px"}}>
                <div className='col-lg-3 p-3'>
                    <div className='bg-white p-2' style={{borderRadius:"8px", height:"100vh"}}>

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
                                <EntityList/>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='col-lg-9 p-3'>
                    <div className='bg-white p-2' style={{borderRadius:"8px", height:"100vh"}}>
                        1111
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Entities
