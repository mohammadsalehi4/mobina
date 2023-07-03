import './style.css'
export let data
// eslint-disable-next-line prefer-const
data = [
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:4.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    RiskScore:2,
    BTCAmount:2.83,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  }
]

const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='fw-bold'>City:</span> {data.city}
      </p>
      <p>
        <span className='fw-bold'>Experience:</span> {data.experience}
      </p>
      <p className='m-0'>
        <span className='fw-bold'>Post:</span> {data.post}
      </p>
    </div>
  )
}

export const columns = [
  {
    name: '',
    allowOverflow: true,
    width:"20px",
    cell: () => {
      return (
        <div style={{cursor:"pointer", padding:"2px", background:"rgb(245,245,245)", borderRadius:"8px", padding:"2px 6px"}} >
          <ion-icon name="chevron-back-outline" id="qq112"></ion-icon>
        </div>
      )
    }
  },

  {
    name: 'آدرس',
    minWidth: '100px',
    maxWidth:"130px",
    selector: row => (
      <div className='d-flex align-items-end '>
        <div className='user-info text-truncate'>
          <span className='d-block text-truncate ms-0'  style={{direction:"ltr"}}>{row.address}</span>
        </div>
      </div>
    )
  },
  {
    name: 'ریسک',
    sortable: true,
    maxWidth:'120px',
    selector: row => row.RiskScore
    },
    {
    name: 'حجم',
    sortable: true,
    minWidth: '50px',
    maxWidth:'80px',
    selector: row => row.BTCAmount
  },

  {
    name: 'مالک',
    sortable: true,
    maxWidth: '50px',
    cell: () => {
      return (
          <button style={{background:"white", margin:"none", borderColor:"rgb(200,200,200)", color:"rgb(100,100,100)", borderStyle:"solid", borderRadius:"5px"}}>نمایش</button>
      )
    }
  }
 
]

export default ExpandableTable
