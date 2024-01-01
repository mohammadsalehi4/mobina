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
import { Card, CardHeader, CardTitle, Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { RecognizeNetwork } from '../../processors/recognizeNetwork'
import NiceAddress from '../../components/niceAddress/niceAddress'
import LoadingButton from '../../components/loadinButton/LoadingButton'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const LabelAddresses = () => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const [data, SetData] = useState([])
  const [isEmpty, SetIsEmpty] = useState(false)
  const [DeleteId, SetDeleteId] = useState(null)
  const [OpenDeleteBox, SetOpenDeleteBox] = useState(false)
  const [Loading, SetLoading] = useState(false)
  useEffect(() => {
    axios.get(`${serverAddress}/address-labels/label`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      console.log(response.data)
      const getResults = []
      if (response.data.results.length === 0) {
        SetIsEmpty(true)
      } else {
        SetIsEmpty(false)
      }
      for (let i = 0; i < response.data.results.length; i++) {
        getResults.push({
          network:RecognizeNetwork(response.data.results[i].network),
          address:response.data.results[i].address,
          label:response.data.results[i].label,
          is_wallet:response.data.results[i].is_wallet,
          id:response.data.results[i].id
        })
      }
      SetData(getResults)
    })
    .catch((err) => {
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
  }, [, States.ProfileLabel])

  const basicColumns = [
    {
      name: 'آدرس',
      sortable: true,
      maxWidth: '180px',
      minWidth: '180px',
      selector: row => (<NiceAddress text={row.address} number={6}/>)
    },
    {
      name: 'برچسب',
      sortable: true,
      maxWidth: '120px',
      minWidth: '120px',
      selector: row => row.label
    },
    {
      name: 'شبکه',
      sortable: true,
      maxWidth: '150px',
      minWidth: '150px',
      selector: row => (row.network)
    },
    {
      name: 'نوع',
      sortable: true,
      maxWidth: '130px',
      minWidth: '130px',
      cell: row => {
        if (row.is_wallet) {
          return ('آدرس کیف پول')
        } else {
          return ('هش تراکنش')
        }
      }
    },
    {
      name: 'عملیات',
      sortable: true,
      maxWidth: '100px',
      minWidth: '100px',
      cell: row => {
        return (
          <Trash2 size={20} style={{cursor:'pointer'}} onClick={ () => { SetDeleteId(row.id), SetOpenDeleteBox(true) } } />
        )
      }
    }
  ]

  const deleteLabel = () => {
    SetLoading(true)
    axios.delete(`${serverAddress}/address-labels/label/${DeleteId}/`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      console.log(response)
      SetLoading(false)
      if (response.status === 200) {
        SetOpenDeleteBox(false)

        dispatch({type:"ProfileLabel", value:!States.ProfileLabel})
        return toast.success('با موفقیت حذف شد', {
          position: 'bottom-left'
        })
      }
    })
    .catch((err) => {
      SetLoading(false)
      return toast.error('ناموفق', {
        position: 'bottom-left'
      })
    })
  }

  return (
    <>
      <Card className='post'> 
        <div>
          <h6 className='mt-3 pe-3 pt-2 pb-2'>
            برچسب های ذخیره شده
          </h6>
        </div>   
        {
          !isEmpty ? 
            data.length > 0 ? 
            <DataTable
              noHeader
              data={data}
              columns={basicColumns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
            />
            :
            <p style={{textAlign:'center'}}>بدون برچسب ذخیره شده</p>
        :
        <p style={{textAlign:'center'}}>بدون برچسب ذخیره شده</p>
        }        

      </Card>
      <Modal
        isOpen={OpenDeleteBox}
        toggle={ () => { SetOpenDeleteBox(false) } }
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
      >
        <ModalBody>
          <h6>آیا با حذف برچسب مورد نظر موافق هستید؟</h6>            
        </ModalBody>
        <ModalFooter>

          <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteLabel() } }>
            {
              Loading ? 
                <LoadingButton/>
              :
              <span>حذف</span>
            }
          </Button>
          <Button onClick={ () => { SetOpenDeleteBox(false) } } color={'warning'} style={{height:'37px', width:'80px'}}>
            بازگشت
          </Button>
        </ModalFooter>
      </Modal>
    </>

  )
}
export default LabelAddresses
