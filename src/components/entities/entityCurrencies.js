// ** Reactstrap Imports
import { ListGroup, ListGroupItem } from 'reactstrap'
import { digitsEnToFa } from 'persian-tools'

const EntityCurrencies = () => {
  return (
    <ListGroup style={{width:"100%", padding:"0px"}}>
      <ListGroupItem style={{width:"100%", background:"rgb(240,240,240)"}}>
        <div className='row' style={{marginTop:"5px", marginBottom:"6px"}}>
            <div className='col-4'>
                نوع ارز
            </div>
            <div className='col-4'>
                تراکنش ها
            </div>
            <div className='col-4'>
                آدرس ها
            </div>
        </div>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
      <div className='row'>
            <div style={{color:"blue"}} className='col-4'>
                BTC
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
        </div>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
      <div className='row'>
            <div style={{color:"blue"}} className='col-4'>
                ECH
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
        </div>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
      <div className='row'>
            <div style={{color:"blue"}} className='col-4'>
                ETH
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
        </div>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
      <div className='row'>
            <div style={{color:"blue"}} className='col-4'>
                ETC
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
        </div>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
      <div className='row'>
            <div style={{color:"blue"}} className='col-4'>
                LTC
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
            <div className='col-4'>
                {digitsEnToFa(1212)}
            </div>
        </div>
      </ListGroupItem>
    </ListGroup>
  )
}
export default EntityCurrencies

