import './style.css'
export let data
// eslint-disable-next-line prefer-const
data = [
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:false,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:false,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:false,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:false,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:false,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
    Fee:0.004,
    inNumber:12,
    outNumber:43
  },
  {
    address:"adsyfusdfuasdgifusgduifyasgdiugdf",
    mode:true,
    BTCAmount:4.354,
    Date:'12/3/2021',
    Time:'14:30',
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
    name: 'تاریخ',
    sortable: true,
    maxWidth: '120px',
    minWidth: '120px',
    selector: row => (
        <div>
          <p style={{marginTop:"10px"}}>{row.Date}</p>
          <p style={{marginTop:"-20px", marginBottom:"-2px"}}>{row.Time}</p>
        </div>
      )
  },
  {
    name: 'آدرس',
    minWidth: '270px',
    selector: row => (
      <div className='d-flex align-items-end '>
        <div className='user-info text-truncate'>
          <span className='d-block text-truncate ms-0'>{row.address}</span>
        </div>

      </div>
    )
  },
  {
    name: '',
    minWidth: '30px',
    selector: row =>  (
      
        row.mode ? <div className='d-flex align-items-end '>
          <ion-icon name="arrow-forward-outline" className="mb-1" id="inkouft"></ion-icon>
        </div> : <div className='d-flex align-items-end '>
          <ion-icon name="arrow-back-outline" className="mb-1" id="outkouft"></ion-icon>
        </div>
      

    )
  },
  // {
  //   name: '',
  //   allowOverflow: true,
  //   width:"20px",
  //   cell: () => {
  //     return (
  //       <div style={{cursor:"pointer", direction:"ltr"}} >
  //         <ion-icon style={{color:"blue", direction:"ltr"}} name="copy-outline"></ion-icon>
  //       </div>
  //     )
  //   }
  // },

  {
    name: 'حجم تراکنش',
    sortable: true,
    minWidth: '120px',
    selector: row => (
        row.BTCAmount
    )
  },


  {
    name: 'هزینه تراکنش',
    sortable: true,
    minWidth: '130px',
    maxWidth: '130px',
    selector: row => row.Fee
  }
]

export default ExpandableTable
