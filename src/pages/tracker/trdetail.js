// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'
import CardAction from '@components/card-actions'

// ** Icons Imports
import { RotateCw } from 'react-feather'

// ** Reactstrap Imports
import { CardBody, CardText, Row, Col, Table } from 'reactstrap'


const TrDetail = () => {
  return (

    <CardAction
    title='جزئیات تراکنش'
    actions='reload'
    endReload={endLoading => {
        setTimeout(() => endLoading(), 2000)
    }}
    >
    <CardBody className='pt-0'>
        <p>hello</p>
        <CardText>
        To create a re-loadable card pass prop <code>actions='reload'</code> and pass prop{' '}
        <code>endReload</code> to end the loading.
        </CardText>
        <CardText className='mb-0'>
        Click on <RotateCw size={15} /> to see card refresh in action
        </CardText>
    </CardBody>
    </CardAction>
       

  )
}
export default TrDetail
