import React from 'react'
import {Card, Row, Col} from 'reactstrap'
import {FileText, FileMinus, Info, GitMerge, Tag, Bookmark, GitCommit} from 'react-feather'
const Description = () => {
  return (
    <Card style={{boxShadow:'none'}} className='mt-3 p-3'>
      <div className='container-fluid'>
        <Row>
            <Col sm='6'>
                <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)'}}>گزارش‌ها</h6>
                <p>
                    <FileText size={16} style={{marginLeft:'8px'}} />
                    محتوای گزارش</p>
                <p>
                    <FileMinus size={16} style={{marginLeft:'8px'}}  />
                    عنوان گزارش</p>
            </Col>
            <Col sm='6'>
                <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)'}}>کاوشگر</h6>
                <p>
                    <Bookmark size={16} style={{marginLeft:'8px'}}/>
                    برچسب آدرس‌ها</p>
                <p>
                    <Tag size={16} style={{marginLeft:'8px'}} />
                    تگ آدرس‌ها</p>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col sm='6'>
                <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)'}}>شبکه‌ها</h6>
                <p>
                    <Info size={16} style={{marginLeft:'8px'}} />
                    نمایش اطلاعات</p>
                <p>
                    <GitMerge size={16} style={{marginLeft:'8px'}} />
                    نمایش گراف</p>
            </Col>
            <Col sm='6'>
                <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)'}}>گراف‌ها</h6>
                <p>
                    <GitCommit size={16} style={{marginLeft:'8px'}} />
                    عنوان گراف</p>
            </Col>
        </Row>
      </div>
    </Card>
  )
}

export default Description
