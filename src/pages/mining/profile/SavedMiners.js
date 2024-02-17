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
import { Card, CardHeader, CardTitle, Modal, ModalBody, ModalFooter, Button} from 'reactstrap'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const SavedMiners = (props) => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const [data, SetData] = useState([])

  const basicColumns = [
    {
      name: 'دستگاه',
      maxWidth: '180px',
      minWidth: '180px',
      selector: row => row.device_name
    },
    {
      name: 'استخر',
      maxWidth: '150px',
      minWidth: '150px',
      selector: row => row.pool
    },
    {
      name: 'قدرت',
      maxWidth: '100px',
      minWidth: '100px',
      selector: row => row.power
    },
    {
      name: 'ساعت کار روزانه',
      maxWidth: '150px',
      minWidth: '150px',
      selector: row => row.daily_working_hours
    },
    {
      name: 'وضعیت',
      maxWidth: '120px',
      minWidth: '120px',
      selector: row => row.status,
      cell: row => {
        if (row.status === 'active') {
          return (
              <span style={{fontSize:"12px", background:"rgb(191, 255, 176)", color:"green", padding:"2px 6px", borderRadius:"10px"}}>فعال</span>
          )
        } else {
          return (
            <span style={{fontSize:"12px", background:"rgb(244, 192, 192)", color:"red", padding:"2px 6px", borderRadius:"10px"}}>غیر فعال</span>
          )
        }

      }
    }
  ]

  useEffect(() => {
    axios.get(`${serverAddress}/miners/extraction-halde/?UUID=${props.uuid}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      const getDevice = []
      for (let i = 0; i < response.data.results.length; i++) {
        getDevice.push(
          {
            device_name:response.data.results[i].device.device_name,
            pool:response.data.results[i].pool,
            status:response.data.results[i].status,
            power:response.data.results[i].power,
            daily_working_hours:response.data.results[i].daily_working_hours
          }
        )
      }
      SetData(getDevice)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [, States.ProfileGraph])

  return (
    <Card className='post'> 
      <div>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h6' style={{width:'100%'}}>
        دستگاه‌های ذخیره شده
        <a href={`/miner/${props.uuid}`}>
          <Button color='primary' style={{float:'left'}}>افزودن دستگاه</Button>
        </a>
          
        </CardTitle>
        
      </CardHeader>
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
