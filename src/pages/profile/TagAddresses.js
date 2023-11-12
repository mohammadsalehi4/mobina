/* eslint-disable multiline-ternary */
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable space-infix-ops */
/* eslint-disable no-unused-vars */
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle } from 'reactstrap'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { RecognizeNetwork } from '../../processors/recognizeNetwork'
import NiceAddress from '../../components/niceAddress/niceAddress'
const basicColumns = [
  {
    name: 'آدرس',
    sortable: true,
    maxWidth: '200px',
    minWidth: '200px',
    selector: row => (<NiceAddress text={row.address} number={6}/>)
  },
  {
    name: 'تگ',
    sortable: true,
    maxWidth: '130px',
    minWidth: '130px',
    selector: row => row.tag
  },
  {
    name: 'شبکه',
    sortable: true,
    maxWidth: '130px',
    minWidth: '130px',
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
  }
]

const TagAddresses = () => {
  const [data, SetData] = useState([])
  const [isEmpty, SetIsEmpty] = useState(false)
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
          is_wallet:response.data.results[i].is_wallet
        })
      }
      SetData(getResults)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return (
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
  )
}
export default TagAddresses
