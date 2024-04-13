import { useEffect , useState } from 'react'
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'

import './SlidBox.css'
import 'swiper/css';

const SlidBox = () => {
  const [slidBoxes ,setSlidBoxes] = useState([])


  useEffect(() => {
    const request = async () => {
      const { data } = await axios.get('https://mempool.space/api/v1/blocks')
      setSlidBoxes(data)
    }
    request();
    const interval = setInterval(() => {
      request();
    }, 60000); // Update every 60 seconds

    return () => clearInterval(interval);
  }, [])

  const boxes = slidBoxes.map((item) => {

    const medianFee = Math.round(item.extras.medianFee)
    const transaction = item.tx_count
    const feeRangeS = Math.round(item.extras.feeRange[0])
    const feeRangeE = Math.round(item.extras.feeRange[item.extras.feeRange.length - 1])
    const calculateBTC = item.extras.totalFees / 100000000
    const valueBTC = calculateBTC.toFixed(3)

    const currentTime = new Date();
    const blockTime = new Date(item.timestamp * 1000);
    const timeDiff = Math.floor((currentTime - blockTime) / 1000 / 60);

    let timeDisplay = '';

    if (timeDiff < 1) {
      timeDisplay = ' همین الان ';
    } else if (timeDiff >= 60) {
      const hours = Math.floor(timeDiff / 60);
      timeDisplay = `${hours} ساعت قبل`;
    } else {
      timeDisplay = `${timeDiff} دقیقه قبل `;
    }



    return (
      <SwiperSlide className='slid-box container block-animation' key={item.id}>
        <div>
          <div className="box3d">
            <a href='/' className='number-box'>{item.height}</a>

            <span className='median-fee'>   sat / vB  ~    {medianFee} </span>

            <span className='fee-range'>  {feeRangeS} - {feeRangeE} sat/vB </span>

            <span className='d-block'>{valueBTC} BTC</span>

            <span className='transaction'>{transaction} تراکنش  </span>

            <span className='d-block time'>{timeDisplay}</span>

            <Chip className='button' label={item.extras.pool.name} />

          </div>

        </div>
      </SwiperSlide>

    )
  })





  return (
    <div>
      <Card className='p-3 box-holder mt-3'>
        <Swiper
          slidesPerView={7}
          spaceBetween={10}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            240: {
              slidesPerView: 2,
              spaceBetween: 130,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // وقتی عرض صفحه بین 640 و 768 پیکسل است
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            // وقتی عرض صفحه بیش از 768 پیکسل است
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }}
          className='slid-boxs'
        >
          {boxes}
        </Swiper>
        <div style={{position:'absolute' , bottom:'10px' , right:'8px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 6H3m18 0l-4 4m4-4l-4-4M3 18h18M3 18l4 4m-4-4l4-4"></path>
          </svg>
        </div>
      </Card>
    </div>

  )
}

export default SlidBox
