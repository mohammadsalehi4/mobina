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
import { Card, CardHeader, CardTitle, Modal, ModalBody, ModalFooter, Button  } from 'reactstrap'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { RecognizeNetwork } from '../../processors/recognizeNetwork'
import NiceAddress from '../../components/niceAddress/niceAddress'
import LoadingButton from '../../components/loadinButton/LoadingButton'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const TagAddresses = () => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const [data, SetData] = useState([])
  const [isEmpty, SetIsEmpty] = useState(false)
  const [DeleteId, SetDeleteId] = useState(null)
  const [OpenDeleteBox, SetOpenDeleteBox] = useState(false)
  const [Loading, SetLoading] = useState(false)

  const basicColumns = [
    {
      name: 'آدرس',
      sortable: true,
      maxWidth: '180px',
      minWidth: '180px',
      selector: row => (<NiceAddress text={row.address} number={6}/>)
    },
    {
      name: 'تگ',
      sortable: true,
      maxWidth: '120px',
      minWidth: '120px',
      selector: row => row.tag
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
          <Trash2 size={20} style={{cursor:'pointer'}} onClick={ () => { SetDeleteId(row.id), SetOpenDeleteBox(true) } }/>
        )
      }
    }
  ]


  useEffect(() => {
    axios.get(`${serverAddress}/address-labels/tag`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
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
          tag:response.data.results[i].tag,
          is_wallet:response.data.results[i].is_wallet,
          id:response.data.results[i].id
        })
      }
      SetData(getResults)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [, States.ProfileTag])

  const deleteTag = () => {
    SetLoading(true)
    axios.delete(`${serverAddress}/address-labels/tag/${DeleteId}/`,
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
        dispatch({type:"ProfileTag", value:!States.ProfileTag})
        return toast.success('با موفقیت حذف شد', {
          position: 'bottom-left'
        })
      }
    })
    .catch((err) => {
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
            تگ های ذخیره شده
          </h6>
        </div>     
        {
          !isEmpty ? 
            <DataTable
              noHeader
              data={data}
              columns={basicColumns}
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
            />
        :
        <p style={{textAlign:'center'}}>بدون تگ ذخیره شده</p>
        }      

      </Card>
      <Modal
        isOpen={OpenDeleteBox}
        className='modal-dialog-centered'
        toggle={ () => { SetOpenDeleteBox(false) } }

        modalClassName={'modal-danger'}
      >
        <ModalBody>
          <h6>آیا با حذف برچسب مورد نظر موافق هستید؟</h6>            
        </ModalBody>
        <ModalFooter>

          <Button color={'danger'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteTag() } }>
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
export default TagAddresses
