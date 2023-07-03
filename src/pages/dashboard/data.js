import NiceAddress from "../../components/niceAddress/niceAddress"
export let data
// eslint-disable-next-line prefer-const
data = [
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdfgauisdygfisdgfiusygf",
    BTCAmount:4.354,
    USDAmount:129288,
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
        <div style={{cursor:"pointer", direction:"ltr"}} >
          <ion-icon style={{color:"blue", direction:"ltr"}} name="copy-outline"></ion-icon>
        </div>
      )
    }
  },
  {
    name: 'آدرس',
    minWidth: '220px',
    selector: row => (
      <div className='d-flex align-items-end '>
        <div className='user-info text-truncate'>
          <NiceAddress text={row.address} number={8} start={5}/>
        </div>
      </div>
    )
  },
  {
    name: 'حجم تراکنش(BTC)',
    sortable: true,
    minWidth: '150px',
    selector: row => row.BTCAmount
  },
  {
    name: 'حجم تراکنش(USD)',
    sortable: true,
    minWidth: '150px',
    selector: row => row.USDAmount
  },
  {
    name: 'هزینه تراکنش',
    sortable: true,
    minWidth: '150px',
    selector: row => row.Fee
  },
  {
    name: 'تعداد ورودی',
    sortable: true,
    minWidth: '50px',
    selector: row => row.inNumber
  },
  {
    name: 'تعداد خروجی',
    sortable: true,
    minWidth: '90px',
    selector: row => row.outNumber
  }
]

export default ExpandableTable
