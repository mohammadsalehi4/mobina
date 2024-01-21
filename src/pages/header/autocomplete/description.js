import React from 'react'
import {Card, Row, Col} from 'reactstrap'
import {FileText, FileMinus, Info, GitMerge, Tag, Bookmark, GitCommit} from 'react-feather'
const Description = () => {
  return (
    <Card style={{boxShadow:'none'}} className='mt-3 p-3'>
      <div className='container-fluid'>
        <Row>
            <Col sm='6'>
                <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)'}}>شبکه‌ها</h6>
                <p>
                    <span>
                        <ion-icon name="locate-outline" style={{fontSize:'18px', marginLeft:'6px', marginBottom:'-3px'}}></ion-icon>
                    </span>
                    <span>
                    اطلاعات تراکنش یا آدرس
                    </span>    
                </p>
                <p>
                    <span>
                        <GitMerge size={16} style={{marginLeft:'8px'}}/>
                    </span>
                    <span>
                    نمایش گراف
                    </span>    
                </p>
            </Col>
            <Col sm='6'>
                <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)'}}>کاوشگر</h6>
                <p>
                    <Bookmark size={16} style={{marginLeft:'8px'}}/>
                    برچسب ها</p>
                <p>
                    <Tag size={16} style={{marginLeft:'8px'}} />
                    تگ ها</p>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col sm='6'>
                <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)'}}>گزارش‌ها</h6>
                <p>
                    <FileText size={16} style={{marginLeft:'8px'}} />
                    عنوان و محتوای گزارش‌ها</p>
            </Col>
            <Col sm='6'>
                <h6 style={{fontSize:'13px', fontWeight:'100', color:'rgb(180,180,180)'}}>گراف‌ها</h6>
                <p>
                    <GitCommit size={16} style={{marginLeft:'8px'}} />
                    گراف‌های ذخیره شده</p>
            </Col>
        </Row>
      </div>
    </Card>
  )
}

export default Description
