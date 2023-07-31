// ** Reactstrap Imports
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Box, ShoppingCart, DollarSign, Slash } from 'react-feather'
import { digitsEnToFa } from 'persian-tools'
const EntityDynamicList = () => {
  return (
    <ListGroup style={{width:"100%", padding:"0px"}}>
      <ListGroupItem style={{width:"100%", background:"rgb(240,240,240)"}}>
        <span style={{float:"right", marginBottom:"-10px"}}>
            <p style={{marginTop:"4px"}}>
                نوع موجودیت
            </p>
        </span>
        <span style={{float:"left"}}>
            صرافی دارای مجوز
            <p style={{display:"inline-block", marginRight:"10px", marginBottom:"0px", borderColor:"green", borderWidth:"2px", borderStyle:"solid", borderRadius:"50%", padding:"2px 4px", fontSize:"10px"}}><Box width={20} height={16}/></p>
        </span>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
        <span style={{float:"right"}}>وضعیت</span>
        <span style={{float:"left", color:"green"}}>فعال</span>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
        <span style={{float:"right"}}>دوره عملیاتی</span>
        <span style={{float:"left"}}>از {digitsEnToFa(1401)}</span>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
        <span style={{float:"right"}}>زیرساخت</span>
        <span style={{float:"left"}}>آدرس های شخصی</span>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
        <span style={{float:"right"}}>پشتیبانی از فیات</span>
        <span style={{float:"left"}}>بله</span>
      </ListGroupItem>
      <ListGroupItem style={{width:"100%"}}>
        <span style={{float:"right"}}>پشتیبانی از ارز اختصاصی</span>
        <span style={{float:"left"}}>بله</span>
      </ListGroupItem>
    </ListGroup>
  )
}
export default EntityDynamicList

