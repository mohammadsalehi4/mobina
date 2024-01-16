/* eslint-disable no-unused-expressions */
/* eslint-disable multiline-ternary */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './style.css' // فرض بر این است که استایل‌های شما در این فایل قرار دارند
import {Card, Alert} from 'reactstrap'
import {FileText, FileMinus, Info, GitMerge, Tag, Bookmark, GitCommit} from 'react-feather'
const KeyboardNavigatableLinks = (props) => {

  const [activeLink, setActiveLink] = useState(0)
  
  const [reportsNumber, setreportsNumber] = useState(0)
  const [labelsNumber, setlabelsNumber] = useState(0)
  const [tagsNumber, settagsNumber] = useState(0)
  const [graphsNumber, setgraphsNumber] = useState(0)
  const [networksNumber, setnetworksNumber] = useState(0)

  const [allLink, SetAllLink] = useState([])

  const NetRec = (index) => {
    if (index === 1 || index === 'BTC') {
      return (
        {
          network:'BTC',
          name:'بیت‌کوین',
          logo:'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029'
        }
      )
    } else if (index === 2 || index === 'BCH') {
      return (
        {
          network:'BCH',
          name:'بیت‌کوین کش',
          logo:'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png?v=029'
        }
      )
    } else if (index === 3 || index === 'LTC') {
      return (
        {
          network:'LTC',
          name:'لایت‌کوین',
          logo:'https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=029'
        }
      )
    } else if (index === 4 || index === 'ETH') {
      return (
        {
          network:'ETH',
          name:'اتریوم',
          logo:'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=029'
        }
      )
    } else if (index === 5 || index === 'BSC') {
      return (
        {
          network:'BSC',
          name:'بایننس اسمارت چین',
          logo:'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=029'
        }
      )
    }
  }

  useEffect(() => {

    console.log('props')
    console.log(props)

    const getLink = []
    let id = 0
    setreportsNumber(props.ReportsFound.length)
    for (let i = 0; i < props.ReportsFound.length; i++) {
      getLink.push(
        {
          title:props.ReportsFound[i].title,
          type:'reports',
          href:`/reports/${props.ReportsFound[i].id}`,
          id
        }
      )
      id++
    }
    settagsNumber(props.tagsFound.length)
    for (let i = 0; i < props.tagsFound.length; i++) {
      getLink.push(
        {
          title:props.tagsFound[i].address,
          type:'tags',
          href:`/researcher/${NetRec(props.tagsFound[i].network).network}/${props.tagsFound[i].address}`,
          id
        }
      )
      id++
    }
    setlabelsNumber(props.labelsFound.length)
    for (let i = 0; i < props.labelsFound.length; i++) {
      getLink.push(
        {
          title:props.labelsFound[i].address,
          type:'labels',
          href:`/researcher/${NetRec(props.labelsFound[i].network).network}/${props.labelsFound[i].address}`,
          id
        }
      )
      id++
    }
    setgraphsNumber(props.graphsFound.length)
    for (let i = 0; i < props.graphsFound.length; i++) {
      getLink.push(
        {
          title:props.graphsFound[i].title,
          type:'graphs',
          href:`/tracker/loadGraph/${(props.graphsFound[i].network)}/${props.graphsFound[i].id}`,
          id
        }
      )
      id++
    }
    setnetworksNumber(props.NetworkFound.length * 2)
    for (let i = 0; i < props.NetworkFound.length; i++) {
      let NTitle

      getLink.push(
        {
          title: `نمایش اطلاعات در شبکه ${props.NetworkFound[i].network}`,
          type:'networks',
          href:`/researcher/${(props.NetworkFound[i].network)}/${props.value}`,
          id,
          data:NetRec(props.NetworkFound[i].network),
          query:props.NetworkFound[i].query,
          mode:'researcher'
        }
      )

      getLink.push(
        {
          title: `نمایش گراف در شبکه ${props.NetworkFound[i].network}`,
          type:'networks',
          href:`/tracker/${(props.NetworkFound[i].network)}/${props.value}`,
          id : id + 1,
          data:NetRec(props.NetworkFound[i].network),
          query:props.NetworkFound[i].query,
          mode:'tracker'
        }
      )

      id++
    }
    SetAllLink(getLink)
  }, [, props])

  const handleKeyDown = (e) => {
    if (e.keyCode === 40) { // کلید پایین
      setActiveLink((prevActiveLink) => (prevActiveLink + 1) % allLink.length)
    } else if (e.keyCode === 38) { // کلید بالا
      setActiveLink((prevActiveLink) => (prevActiveLink - 1 + allLink.length) % allLink.length)
    } else if (e.keyCode === 13) { // کلید Enter
      window.location.href = allLink[activeLink].href
    }
  }

  const handleMouseEnter = (index) => {
    setActiveLink(index)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeLink])

  return (
   <Card className='mt-3' style={{boxShadow:'none', borderRadius:'0px'}}>
      {
        reportsNumber > 0 ?
        <h6  style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)', marginTop:'16px'}} className='pe-3'>گزارش‌ها</h6>
        :
        null
      }
      {allLink.map((link, index) => {
        if (link.type === 'reports') {
          return (
            <a 
              key={link.id} 
              href={link.href} 
              style={{padding:'8px'}}
              className={index === activeLink ? 'active searchItemLink' : 'searchItemLink'}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <FileText size={16} style={{marginLeft:'8px'}} />
              {link.title}
            </a>
          )
          
        }
      })}
      {
        tagsNumber > 0 ?
        <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)', marginTop:'16px'}} className='pe-3'>تگ‌ها</h6>
        :
        null
      }
      {allLink.map((link, index) => {
        if (link.type === 'tags') {
          return (
            <a 
              key={link.id} 
              href={link.href} 
              style={{padding:'8px', fontSize:'13px'}}
              className={index === activeLink ? 'active searchItemLink' : 'searchItemLink'}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <Tag size={16} style={{marginLeft:'8px'}} />
              {link.title}
            </a>
          )
        }
      })}
      {
        labelsNumber > 0 ?
        <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)', marginTop:'16px'}} className='pe-3'>برچسب‌ها</h6>
        :
        null
      }
      {allLink.map((link, index) => {
        if (link.type === 'labels') {
          return (
            <a 
              key={link.id} 
              href={link.href} 
              style={{padding:'8px', fontSize:'13px'}}
              className={index === activeLink ? 'active searchItemLink' : 'searchItemLink'}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <Bookmark size={16} style={{marginLeft:'8px'}}/>
              {link.title}
            </a>
          )
        }
      })}
      {
        graphsNumber > 0 ?
        <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)', marginTop:'16px'}} className='pe-3'>گراف‌ها</h6>
        :
        null
      }
      {allLink.map((link, index) => {
        if (link.type === 'graphs') {
          return (
            <a 
              key={link.id} 
              href={link.href} 
              style={{padding:'8px'}}
              className={index === activeLink ? 'active searchItemLink' : 'searchItemLink'}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <GitMerge size={16} style={{marginLeft:'8px'}} />
              {link.title}
            </a>
          )
        }
      })}
      {
        networksNumber > 0 ?
        <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)', marginTop:'16px'}} className='pe-3'>شبکه‌ها</h6>
        :
        null
      }
      {allLink.map((link, index) => {
        if (link.type === 'networks') {
          return (
            <a 
              key={link.id} 
              href={link.href} 
              style={{padding:'8px'}}
              className={index === activeLink ? 'active searchItemLink' : 'searchItemLink'}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <img src={link.data.logo} style={{width:'20px', marginLeft:'8px'}} />
              <span>{link.query === 'address' ? 'آدرس' : 'تراکنش'} </span>
              <span>{link.data.name} </span>
              <span>{link.data.network} </span>
              {
                link.mode === 'researcher' ? 
                <Alert color='warning' style={{display:'inline-block', padding:'2px 4px', fontSize:'12px', margin:'0px', borderRadius:'20px', float:'left'}}>{'کاوشگر'}</Alert>
                :
                <Alert color='primary' style={{display:'inline-block', padding:'2px 4px', fontSize:'12px', margin:'0px', borderRadius:'20px', float:'left'}}>{'ردیابی'}</Alert>
              }
            </a>
          )
        }
      })}
    </Card>
  )
}

export default KeyboardNavigatableLinks
