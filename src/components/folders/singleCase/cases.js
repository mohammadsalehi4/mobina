import React from 'react'
import {Edit, Info} from 'react-feather' 
import { MainSiteGray, MainSiteOrange } from '../../../../public/colors'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { digitsEnToFa } from 'persian-tools'
const countryOptions = [
  { value: '۴ مشتری', label: '۴ مشتری' },
  { value: 'گزینه دو', label: 'گزینه دو' }
]
const Cases = () => {
  return (
    <div className='container-fluid' style={{borderRadius:"8px", background:"white", borderStyle:"solid", borderWidth:"2px", borderColor:"rgb(210,210,210)"}}>
        <div className='row mt-1'>
          <div className='col-6'>
            <p style={{fontWeight:"bold"}}>پرونده بیت کوین</p>
          </div>
          <div className='col-6' style={{textAlign:"left"}}>
            <small  style={{color:'rgb(150,150,150)'}}>ساخته شده در {digitsEnToFa("1402/02/03")}</small>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <p style={{fontWeight:"bold"}}>
              پرونده خیلی مهم
              <Edit style={{marginRight:"8px", cursor:"pointer"}}/>
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>

            <div className='row'>
              <div className='col-6'>
                <p>
                  لینک شده توسط
                  <Info style={{ marginRight:"4px", color:"rgb(150,150,150)"}} size={15} />
                </p>
              </div>
              <div className='col-6'>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  defaultValue={countryOptions[0]}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>آدرس ها</p>
              </div>
              <div className='col-6'>
                <p>{digitsEnToFa(7)}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>تراکنش ها</p>
              </div>
              <div className='col-6'>
                <p>{digitsEnToFa(3)}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>کاوش ها</p>
              </div>
              <div className='col-6'>
                <p>{digitsEnToFa(2)}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>ترسیم شده</p>
              </div>
              <div className='col-6'>
                <p>{digitsEnToFa(3)}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>
                  میانگین ریسک
                  <Info style={{ marginRight:"4px", color:"rgb(150,150,150)"}} size={15} />
                </p>
              </div>
              <div className='col-6'>
                <p style={{color:"green"}}>
                  {digitsEnToFa("20%")}
                </p>
              </div>
            </div>

          </div>


          <div className='col-lg-6'>

            <div className='row'>
              <div className='col-6'>
                <p>
                  آخرین تغییر
                  <Info style={{ marginRight:"4px", color:"rgb(150,150,150)"}} size={15} />
                </p>
              </div>
              <div className='col-6'>
                <small className='ms-1'>{digitsEnToFa("13:50 1402/04/12 ")}</small>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>ساخته شده توسط</p>
              </div>
              <div className='col-6'>
                <p>من</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>
                  مجموع
                  <small> (BTC)</small>
                  <Info style={{ marginRight:"4px", color:"rgb(150,150,150)"}} size={15} />
                </p>
              </div>
              <div className='col-6'>
                <p>{digitsEnToFa("19.120039")}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>
                  تغییرات روز
                  <small> (BTC)</small>
                </p>
              </div>
              <div className='col-6'>
                <p style={{color:"green"}}>{digitsEnToFa("9.271910+")}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>
                  مجموع
                  <small> (USD)</small>
                  <Info style={{ marginRight:"4px", color:"rgb(150,150,150)"}} size={15} />
                </p>
              </div>
              <div className='col-6'>
                <p>{digitsEnToFa("279,920.790")}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <p>
                  تغییرات روز
                  <small> (USD)</small>
                </p>
              </div>
              <div className='col-6'>
                <p style={{color:"green"}}>{digitsEnToFa("33,190.891+")}</p>
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}

export default Cases
