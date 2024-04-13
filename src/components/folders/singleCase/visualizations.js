/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import { Fragment, useState, forwardRef, useEffect } from 'react'
import { digitsEnToFa } from 'persian-tools'
import DataTable from 'react-data-table-component'
import NiceAddress2 from '../../niceAddress2/niceAddress'
import { ChevronDown, Share, Printer, FileText, File, Trash2, Copy, Plus, MoreVertical } from 'react-feather'
import {
  Row,
  Button,
  Card,
  Input,
  CardTitle,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter, Badge,
  UncontrolledDropdown
} from 'reactstrap'
import { MainSiteLightGreen, MainSiteOrange, MainSiteyellow } from '../../../../public/colors'
import Cookies from 'js-cookie'
import { serverAddress } from '../../../address'
import { JalaliCalendar } from '../../../processors/jalaliCalendar'
import LoadingButton from '../../loadinButton/LoadingButton'
import axios from 'axios'
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const Visualizations = (props) => {

  const [DeleteBox, SetDeleteBox] = useState(false)
  const [DeleteId, SetDeleteId] = useState(false)
  const [DeleteLoading, SetDeleteLoading] = useState(false)
  const [data, SetData] = useState([])
  const columns = [
    {
      minWidth: '90px',
      maxWidth: '90px',
      selector: row => <ion-icon style={{background:"rgb(230,230,230)", padding:"8px", borderRadius:"4px", cursor:"pointer", fontSize:"18px", marginTop:"6px"}} name="git-network-outline"></ion-icon>
  
    },
      {
        name: <p style={{marginTop:"15px", margin:"0px"}}>نام</p>,
        minWidth: '130px',
        maxWidth: '130px',
        selector: row => digitsEnToFa(row.graph_detail.GraphName)
      },
      {
        name: 'ارز',
        sortable: true,
        minWidth: '60px',
        maxWidth: '60px',
        selector: row => row.graph_detail.networkName
      },
      {
        name: <p style={{marginTop:"15px", margin:"0px"}}>توضیحات</p>,
        sortable: true,
        minWidth: '200px',
        maxWidth: '200px',
        selector: row => row.Amount,
        cell: row => (
          <span style={{fontSize:"12px", background:"rgb(191, 255, 176)", color:"green", padding:"2px 16px", borderRadius:"10px"}}>{row.graph_detail.GraphDescription}</span>
        )
      },
        {
          name: <p style={{marginTop:"15px", margin:"0px"}}>عملیات</p>,
          sortable: true,
          minWidth: '120px',
          maxWidth: '120px',
          cell: row => (
              <Trash2 onClick={ () => { SetDeleteId(row.id), SetDeleteBox(true) }} style={{cursor:'pointer'}}/>
          )
        }
  ]

  useEffect(() => {
    if (props.Data.graphs.length > 0) {
      SetData(props.Data.graphs)
    }
  }, [props.Data.graphs.length])

  const deleteGraph = () => {
    SetDeleteLoading(true)
    axios.delete(`${serverAddress}/case/graph-list/${DeleteId}`, 
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      console.log(response)
        if (response.status === 204) {
          window.location.reload()
        }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <Fragment>
      <Card style={{minHeight:"100%", borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>ردیابی ها</CardTitle>
        </CardHeader>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          {
            data.length !== 0 ?
            <DataTable
            noHeader
            columns={columns}
            className='react-dataTable'
            direction='ltr'
            sortIcon={<ChevronDown size={10} />}
            selectableRowsComponent={BootstrapCheckbox}
            data={ data}
          />
          :
          <p style={{textAlign:'center'}} className='pt-5'>بدون گراف ذخیره شده</p>
          }

        </div>
      </Card>

      <Modal
        isOpen={DeleteBox}
        className='modal-dialog-centered'
        modalClassName={'modal-danger'}
        toggle={() => SetDeleteBox(false)}
      >
        <ModalBody>
          <h6>آیا از حذف گراف ترسیم‌شده مورد نظر اطمینان دارید؟</h6>
        </ModalBody>
        <ModalFooter>

          <Button color={'primary'} style={{height:'37px', width:'80px'}} onClick={ () => { deleteGraph() } }>
          {
              DeleteLoading ? 
              <LoadingButton/>
              :
              <span>
                حذف
              </span>
            }
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default Visualizations

