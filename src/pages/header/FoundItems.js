/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
// ** React Imports
import { useEffect, useState } from 'react'
import './searchStyle.css'
// ** Third Party Components
import axios from 'axios'
import { serverAddress } from '../../address'
import Cookies from 'js-cookie'
import { Input, Card,  InputGroup, InputGroupText } from 'reactstrap'
import Autocomplete from './autocomplete'
import { Search, X } from 'react-feather'
import Description from './autocomplete/description'
import LocalLoading from '../../components/localLoading/localLoading'
const FoundItems = (props) => {

  const [IsSearching, SetIsSearching] = useState(false)
  const [SearchCompleted, SetSearchCompleted] = useState(false)
  const [ReportsFound, SetReportsFound] = useState([])
  const [tagsFound, SettagsFound] = useState([])
  const [labelsFound, SetlabelsFound] = useState([])
  const [graphsFound, SetgraphsFound] = useState([])
  const [NetworkFound, SetNetworkFound] = useState([])
  const [Value, SetValue] = useState('')

  useEffect(() => {
    if (props.isOpen) {
      document.getElementById('MainSearchInputBox').focus()
    }
  }, [props.isOpen])

  useEffect(() => {
    if (SearchCompleted) {
      document.getElementById('MainSearchInputBox').blur()
    }
  }, [SearchCompleted])

  const searchSubmit = (event) => {
    event.preventDefault()
    SetReportsFound([])
    SettagsFound([])
    SetlabelsFound([])
    SetgraphsFound([])
    SetNetworkFound([])

    SetIsSearching(true)
    const searchItem = document.getElementById('MainSearchInputBox').value
    axios.get(`${serverAddress}/search/?search=${searchItem}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
      console.log('response.data')
      console.log(response.data)
      SetIsSearching(false)
      const getNetworks = []
      const getReports = []
      const gettags = []
      const getlabels = []
      const getgraphs = []

      if (response.data.hash !== null) {
        for (let i = 0; i < response.data.hash.networks.length; i++) {
          getNetworks.push(
            {
              network:response.data.hash.networks[i],
              query:response.data.hash.query
            }
          )
        }
      }

      if (response.data.reports !== null) {
        for (let i = 0; i < response.data.reports.length; i++) {
          getReports.push(
            {
              id:response.data.reports[i].id,
              title:response.data.reports[i].title
            }
          )
        }
      }

      if (response.data.tags !== null) {
        for (let i = 0; i < response.data.tags.length; i++) {
          gettags.push(
            {
              id:response.data.tags[i].id,
              title:response.data.tags[i].tag,
              address:response.data.tags[i].address,
              network:response.data.tags[i].network,
              tag:response.data.tags[i].tag
            }
          )
        }
      }

      if (response.data.labels !== null) {
        for (let i = 0; i < response.data.labels.length; i++) {
          getlabels.push(
            {
              id:response.data.labels[i].id,
              title:response.data.labels[i].label,
              address:response.data.labels[i].address,
              network:response.data.labels[i].network,
              label:response.data.labels[i].label
            }
          )
        }
      }

      if (response.data.graphs !== null) {
        for (let i = 0; i < response.data.graphs.length; i++) {
          getgraphs.push(
            {
              id:response.data.graphs[i].id,
              title:response.data.graphs[i].title,
              network:response.data.graphs[i].value.Network
            }
          )
        }
      }

      SetgraphsFound(getgraphs)
      SetReportsFound(getReports)
      SettagsFound(gettags)
      SetlabelsFound(getlabels)
      SetNetworkFound(getNetworks)
      SetValue(document.getElementById('MainSearchInputBox').value)
      console.log(getgraphs)
      SetSearchCompleted(true)

    })
    .catch((err) => {
      SetIsSearching(false)
      console.log(err)
      try {
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
      } catch (error) {}
      try {
        if (err.response.data.detail === 'Not found.') {
          return toast.error('آدرس مورد نظر یافت نشد.', {
            position: 'bottom-left'
          })
        }
      } catch (error) {}
    })

  }

  return (
    <div style={{}} id='searchBoxDiv'>
      <form onSubmit={ (event) => { searchSubmit(event) }} style={{ margin:'0px'}}>
        <InputGroup id='MainSearchInputGroup' className='input-group-merge mb-2' style={{direction:'ltr', width:'100%'}}>
          <InputGroupText id='MainSearchInputSymbole'>
              <X size={16} />
          </InputGroupText>
          <Input id='MainSearchInputBox' placeholder='جست‌وجو...' />
          <InputGroupText id='MainSearchInputSymbole' onClick={ (event) => { searchSubmit(event) }}>
              <Search size={24} />
          </InputGroupText>
        </InputGroup>
      </form>
      {
        IsSearching ? 
        <div className='mt-5'>
          <LocalLoading/>
        </div>
        :
          <>
            {
              SearchCompleted  ?
                <Autocomplete SearchCompleted={SearchCompleted} value={Value} ReportsFound={ReportsFound} tagsFound={tagsFound} labelsFound={labelsFound} graphsFound={graphsFound} NetworkFound={NetworkFound}/>
              :
                <Description/>
            }
          </>
      }

    </div>
  )
}

export default FoundItems

