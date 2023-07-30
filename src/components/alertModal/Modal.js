/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap'
import Error from '../../components/alertError/error'
import Success from '../../components/alertSuccess/success'
import Warning from '../../components/alertWarning/warning'
// import ModalGraph from '../AlertModalGraph/modalGraph'
import { useDispatch, useSelector } from 'react-redux'
const MyModal = () => {
    const [basicModal, setBasicModal] = useState(false)
    const dispatch = useDispatch()
    const States = useSelector(state => state)
  return (
    <div id='ModalAlert' className='basic-modal'>
        <Modal isOpen={States.basicModal} toggle={() => dispatch({type:"SETBASICMODAL", value:false})}>
            <ModalHeader>پردازش ماینر</ModalHeader>
            <ModalBody>
                <Success text={"تایید مسیر های دریافت پاداش اعلامی"}/>
                <Error text="عدم انطباق با توان پردازشی اعلامی"/>
                <Warning text="اطلاعات ناکافی برای صحت سنجی الگوی مصرف انرژی"/>
                {/* <ModalGraph text1="Via BTC" text2="Abr Pardazesh"/> */}
            </ModalBody>
            <ModalFooter>
                <button style={{background:"#2f4f4f", color:"#dcdcdc", border:"none", borderRadius:"8px", padding:"7px 18px"}} onClick={() => dispatch({type:"SETBASICMODAL", value:false})}>
                    تایید
                </button>
            </ModalFooter>
        </Modal>
    </div>
  )
}

export default MyModal
