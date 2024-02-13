/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-vars */
import { ChevronDown, Trash2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, CardHeader, Input, Modal, ModalBody, ModalFooter, Button} from 'reactstrap'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const SavedMiners = () => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const [data, SetData] = useState([
    {
      
    }
  ])

  const basicColumns = [
    {
      name: 'توضیحات',
      maxWidth: '310px',
      minWidth: '310px',
      selector: row => row.description
    }
  ]

  useEffect(() => {
    axios.get(`${serverAddress}/miners/operation/`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      
    })
    .catch((err) => {
      
    })
  }, [, States.ProfileGraph])

  return (
    <Card className='post'> 
      <div>
        <h6 className='mt-3 pe-3 pt-2 pb-2'>
          دستگاه‌های ذخیره شده
        </h6>
      </div> 
      {
        data.length > 0 ? 
          <DataTable
            noHeader
            data={data}
            columns={basicColumns}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
          />
        :
          <p style={{textAlign:'center'}}>بدون دستگاه ذخیره شده</p>
      }
      <Modal
        isOpen={false}
        className='modal-dialog-centered'
        // toggle={ () => { SetOpenDeleteBox(false) } }

        modalClassName={'modal-danger'}
      >
        <ModalBody>
                     
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </Modal>
    </Card>
  )
}
export default SavedMiners
