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
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { RecognizeNetwork } from '../../processors/recognizeNetwork'
import NiceAddress from '../../components/niceAddress/niceAddress'
import toast from 'react-hot-toast'
import LoadingButton from '../../components/loadinButton/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'


const SavedGraph = () => {
  const dispatch = useDispatch()
  const States = useSelector(state => state)

  const [data, SetData] = useState([])
  const [isEmpty, SetIsEmpty] = useState(false)
  const [OpenDeleteBox, SetOpenDeleteBox] = useState(false)
  const [rowId, SetRowId] = useState(0)
  const [Loading, SetLoading] = useState(false)

  const basicColumns = [
    {
      name: 'نام',
      sortable: true,
      maxWidth: '170px',
      minWidth: '170px',
      selector: row => row.name,
      cell: row => {
        return (
          <a href={`/tracker/loadGraph/${row.networkName}/${row.id}`} style={{textDecoration:'none', color:'rgb(111,107,125)'}}>{row.name}</a>
        )
      }
    },
    {
      name: 'توضیحات',
      maxWidth: '310px',
      minWidth: '310px',
      selector: row => row.description
    },
    {
      name: 'آیتم ها',
      sortable: true,
      maxWidth: '100px',
      minWidth: '100px',
      selector: row => row.items
    },
    {
      name: 'عملیات',
      maxWidth: '100px',
      minWidth: '100px',
      cell: row => {
        return (
          <Trash2 onClick={ () => { 
            SetRowId(row.id),
            SetOpenDeleteBox(true)
          } } size={20} style={{cursor:'pointer'}} />
        )
      }
    }
  ]

  const deleteGraph = (id) => {
    SetLoading(true)
    axios.delete(`${serverAddress}/tracing/graph/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      SetLoading(false)
      if (response.status >= 200 && response.status < 300) {
        dispatch({type:"ProfileGraph", value:!States.ProfileGraph})
        return toast.success('با موفقیت حذف شد', {
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
      if (err.response.statusText === 'Unauthorized') {
          SetLoading(false)
          return toast.error('ناموفق', {
              position: 'bottom-left'
          })
        } else {
          SetLoading(false)
          return toast.error('ناموفق', {
              position: 'bottom-left'
          })
        }
    })
  }

  useEffect(() => {
    axios.get(`${serverAddress}/tracing/graph/`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      console.log(response)
      const getResults = []
      if (response.data.results.length === 0) {
        SetIsEmpty(true)
      } else {
        SetIsEmpty(false)
      }
      for (let i = 0; i < response.data.results.length; i++) {
        getResults.push({
          name:response.data.results[i].value.GraphName,
          description:response.data.results[i].value.GraphDescription,
          items:response.data.results[i].value.itemNumbers,
          id:response.data.results[i].id,
          networkName:response.data.results[i].value.networkName
        })
      }
      SetData(getResults)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [, States.ProfileGraph])

  return (
    <Card className='post'> 
      <div>
        <h6 className='mt-3 pe-3 pt-2 pb-2'>
          گراف های ذخیره شده
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
          <p style={{textAlign:'center'}}>بدون گراف ذخیره شده</p>
      }
      <Modal
        isOpen={OpenDeleteBox}
        className='modal-dialog-centered'
        toggle={ () => { SetOpenDeleteBox(false) } }

        modalClassName={'modal-danger'}
      >
        <ModalBody>
          <h6>آیا با حذف گراف مورد نظر موافق هستید؟</h6>            
        </ModalBody>
        <ModalFooter>
          <Button onClick={ () => { deleteGraph(rowId), SetOpenDeleteBox(false) } } color={'primary'} style={{height:'37px', width:'80px'}}>
            {
              Loading ? 
                <LoadingButton/>
              :
              <span>حذف</span>
            }
          </Button>

        </ModalFooter>
      </Modal>
    </Card>
  )
}
export default SavedGraph
