/* eslint-disable array-bracket-newline */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import OwnerGraph from '../../components/ownerGraph/graph'
import OwnerList from '../../components/ownerList/ownerList'
import OwnerListRight from '../../components/ownerListRight/ownerList'
import Select from 'react-select'
import CardContentTypes from '../dashboard/WSearch/rightCard'
import CardTransactions from '../dashboard/WSearch/leftcard'
import OwnerTopBox from '../../components/ownerTopBox/ownerTopBox'
import { MainSiteLightOrange, MainSiteOrange } from '../../../public/colors'
const colourOptions = [
    { value: 'اتریوم- ETH', label: 'اتریوم- ETH' }
  ]

  const colourOptions1 = [
    { value: 'مستقیم', label: 'مستقیم' }
  ]
const Owner = () => {
    const data = {
        address:"bc1qyfjj7npyc863lqzqkenxt0ydhfqtfuermur8ph",
        name:"اتریوم",
        Total: "756.235",
        InCome: "293,238,986.910",
        OutCome: "293,238,230.675",
        TrNumber: 148525,
        FirstActivity: '1398/03/01',
        LastActivity: '1401/05/27',
        symbole:"ETH",
        risk:"25%",
        owner:"آریان کوین",
        ownerMode:"صرافی بدون مجوز رسمی",
        website:"www.ariancoin.com",
        image:'../images/ethereum.png',
        LastTransactions:[
          {
            address:"5be51c891894736a2992c08610ca5caf0daf95a192cc1ce4f3876fdeb58d2fe1",
            mode:true,
            BTCAmount:0.026119,
            Date:'1398/03/01',
            Time:'09:29',
            Fee:0.00042
          },
          {
            address:"a239763a0395f3a7c0d5a139333fac53445fca8a30381deb7b0f98f6aa7b1627",
            mode:true,
            BTCAmount:0.136021,
            Date:'1399/02/13',
            Time:'13:31',
            Fee:0.00037
          },
          {
            address:"fecafd75051baea32322fc74930a91f8ad8174e2a2e5d6e562537f1d0883d230",
            mode:true,
            BTCAmount:0.121145,
            Date:'1399/08/22',
            Time:'14:30',
            Fee:0.00045
          },
          {
            address:"9800d8144046c31797af57b20f82f956f0299a87f29e222b2abbd2915faa0ce6",
            mode:false,
            BTCAmount:0.283285,
            Date:'1400/03/17',
            Time:'12:20',
            Fee:0.00026
          },
          {
            address:"aa04082111a5fc05c9016bcd9f7563af20430219e24e0158f06c7d2317f5e346",
            mode:true,
            BTCAmount:0.258796,
            Date:'1400/03/19',
            Time:'18:49',
            Fee:0.00076
          },
          {
            address:"6b154ecab6e058c5ba1e5371bf7009a7a0bbaa735727286e7e0386720f55b99a",
            mode:false,
            BTCAmount:0.258796,
            Date:'1400/11/30',
            Time:'17:38',
            Fee:0.00025
          },
          {
            address:"f74b6119d89229efe2edc3cee7786d94c1631f35c3af55a2f44918d2547885e9",
            mode:true,
            BTCAmount:1.025879,
            Date:'1401/05/27',
            Time:'08:30',
            Fee:0.00067
          }
        ]
      }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type:"SHOWNAVBAR"})
        dispatch({type:"SETWITCHPAGE", value:2})
    }, [])
    return (
        <div id='Owner' className='container-fluid '>
            <div className='row mt-5 me-5 ms-5 bg-white'>
                <div className='col-2'>
                    <div style={{marginTop:"20px"}}>
                        <Select
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue={colourOptions[0]}
                            options={colourOptions}
                            isClearable={false}
                            styles={{marginBottom:"-20px"}}
                        />
                    </div>
                </div>
                <div className='col-1'>
 
                </div>
                <div className='col-lg-9'>
                    <div  style={{height:"60px", display:"inline-block", width:"100px", direction:"rtl", marginBottom:"-26px", marginTop:"26px"}}>
                        <a style={{paddingBottom:"3px", marginBottom:"-30px", borderBottomColor:MainSiteOrange, borderBottomStyle:"solid", borderWidth:"3px"}}>ارتباطات</a>
                    </div>

                    <div  style={{height:"60px", display:"inline-block", width:"100px", direction:"rtl", marginBottom:"-26px", marginTop:"26px"}}>
                        <a style={{marginBottom:"-30px"}}>آدرس ها</a>
                    </div>

                    <div  style={{height:"60px", display:"inline-block", width:"100px", direction:"rtl", marginBottom:"-26px", marginTop:"26px"}}>
                        <a style={{marginBottom:"-30px"}}>تراکنش ها</a>
                    </div>

                    <div  style={{height:"60px", display:"inline-block", width:"170px", direction:"rtl", marginBottom:"-26px", marginTop:"26px"}}>
                        <a style={{marginBottom:"-30px"}}>توکن های منتقل شده</a>
                    </div>

                    <div  style={{height:"60px", display:"inline-block", width:"100px", direction:"rtl", marginBottom:"-26px", marginTop:"26px"}}>
                        <a style={{marginBottom:"-30px"}}>نظرات</a>
                    </div>
                </div>
                
                
            </div>
            <div className='row  me-5 ms-5 bg-white p-3' style={{}}>
                <div className='col-lg-3' style={{}}>
                    <div style={{ marginTop:"-25px", marginRight:"-15px"}}>
                        <OwnerTopBox data={data}/>
                        <CardTransactions data={data}/>
                    </div>

                </div>
                <div className='col-lg-9 bg-white' style={{ borderWidth:"2px", borderColor:"rgb(200,200,200)", borderStyle:"solid", borderRadius:"8px"}}>
                    <div style={{position:"absolute", zIndex:4}} className='mt-4 me-2'>
                        <Select
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue={colourOptions[0]}
                            options={colourOptions}
                            isClearable={false}
                        />

                    </div>
                    <div style={{position:"absolute", zIndex:4, float:"left", left:"110px"}} className='mt-4 me-2'>
                        <Select
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue={colourOptions1[0]}
                            options={colourOptions1}
                            isClearable={false}
                        />

                    </div>

                    <h6 style={{position:"absolute", float:"left", left:"110px", top:"330px"}}>ارسال شده: 293,238,230.675 <small>ETH</small></h6>
                    <h6 style={{position:"absolute", top:"330px", marginRight:"10px"}}>دریافت شده: 293,238,986.910 <small>ETH</small></h6>

                    <OwnerListRight/>
                    {/* <OwnerGraph/> */}
                    <OwnerList/>
                </div>
            </div>
        </div>
    )
}

export default Owner
