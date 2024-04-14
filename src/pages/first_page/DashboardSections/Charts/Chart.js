import React, { useEffect , useState } from 'react'
import axios from 'axios'


import './Chart.css'
import { Row, Col } from 'reactstrap'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'


// import PieChart from './PieChart/PieChart'
// import LinearChart from './LinearChart/LinearChart'


const Chart = () => {

  const [pool, setPool] = useState([])
  const [hashrateDifficulty, setHashrateDifficulty] = useState([])



  useEffect(() => {
    const request = async () => {
      const { data } = await axios.get('https://mempool.space/api/v1/mining/pools/1w')
      setPool(data)
    }
    request()

    const requestLinearGraph = async () => {
      const { data } = await axios.get('https://mempool.space/api/v1/mining/hashrate/1y')
      setHashrateDifficulty(data)
    }
    requestLinearGraph()

  }, [])


  let poolsCount = null
  let poolsLuck = (pool.blockCount / 10.08).toFixed(2)
  if (pool.pools) poolsCount = pool.pools.length

  let hashrate = (hashrateDifficulty.currentHashrate / 10 ** 18).toFixed(1)
  let difficulty = (hashrateDifficulty.currentDifficulty / 10 ** 12).toFixed(2)



  const Blocks1w = pool.blockCount

  return (
    <div className='mt-3 '>

      <Row className='mb-3 g-3'>
        <Col xs={6} lg={2} className='col-custom' >
          <Card className='chart-item'>
            <CardContent>
              <div>

                <div className='box-icon' style={{ backgroundColor: '#FAE0DA' }}>

                  <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="5 -6 30 70" style={{ color: '#E76F51' }}>
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M24.037 42.5V22.658m0 19.842L7.029 34.104a.203.203 0 0 1-.114-.182v-19.88M24.037 42.5l16.935-8.396a.203.203 0 0 0 .113-.182v-19.88m-17.048 8.616L6.915 14.043m17.122 8.615l17.048-8.615m-34.17 0l17.03-8.521a.203.203 0 0 1 .183 0l16.957 8.52m-5.408 8.387l2.492-1.192a.203.203 0 0 0 .116-.183v-2.421a.203.203 0 0 0-.298-.18l-2.492 1.302a.203.203 0 0 0-.11.18v2.31c0 .15.157.249.292.184m-2.012 3.105l-2.449 1.26a.203.203 0 0 0-.11.181v2.38c0 .15.16.249.295.18l2.449-1.242a.203.203 0 0 0 .11-.181v-2.397a.203.203 0 0 0-.295-.18Zm-4.05 11.188V34.38c0-.151-.16-.25-.295-.181l-2.382 1.208a.203.203 0 0 0-.112.181v2.336c0 .151.16.25.295.182l2.382-1.201a.203.203 0 0 0 .112-.182m-11.25 0V34.26c0-.155.166-.253.301-.178l2.405 1.322a.203.203 0 0 1 .105.178v2.342c0 .151-.16.25-.294.182l-2.405-1.202a.203.203 0 0 1-.112-.182M10.1 18.454l2.462 1.3a.203.203 0 0 1 .108.18v2.31c0 .15-.156.248-.291.183l-2.463-1.19a.203.203 0 0 1-.115-.182v-2.42c0-.154.163-.252.298-.18m13.95-3.037l2.359-1.196a.203.203 0 0 0-.001-.364l-2.358-1.179a.203.203 0 0 0-.184.001l-2.29 1.18a.203.203 0 0 0 0 .36l2.289 1.197c.058.03.127.03.186 0"></path>
                  </svg>

                </div>
                <p className='chart-title pt-3'> شانس استخرها </p>
              </div>

              <p className='fs-2'>{poolsLuck} <span className='chart-text-span'>درصد</span></p>
            </CardContent>
          </Card>
        </Col>

        <Col xs={6} lg={2} className='col-custom' >
          <Card className='chart-item'>
            <CardContent>
              <div>

                <div className='box-icon' style={{ backgroundColor: '#FDECDF' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="1 -1 24 24" style={{ color: '#f4a261' }}>
                    <path fill="none" stroke="currentColor" strokeLinejoin="round" d="M12 21v-8m0 8l-6.162-4.402c-.411-.293-.616-.44-.727-.655C5 15.728 5 15.475 5 14.971V8m7 13l6.163-4.402c.41-.293.615-.44.726-.655c.111-.215.111-.468.111-.972V8m-7 5L5 8m7 5l7-5M5 8l5.838-4.17c.56-.4.842-.601 1.162-.601c.32 0 .601.2 1.162.601L19 8"></path>
                  </svg>

                </div>
                <p className='chart-title pt-3'style={{padding:'4.5px 0'}}>بلاک‌ها (1 هفته)</p>
              </div>
              <p className='fs-2'>{Blocks1w}</p>
            </CardContent>
          </Card>
        </Col>

        <Col xs={6} lg={2} className='col-custom' >
          <Card className='chart-item'>
            <CardContent>
              <div>

                <div className='box-icon' style={{ backgroundColor: '#FAF3DF' }}>

                  <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="8 -10 30 100" style={{ fill: '#E9C46A', stroke: '#E9C46A', }}>
                    <path d="M45.08,38a3.008,3.008,0,0,0,2.279-1.05l2.887-3.372A3.952,3.952,0,0,0,52,34a4.017,4.017,0,1,0-3.277-1.718l-2.88,3.364A1.024,1.024,0,0,1,45.08,36H35V33h7a3,3,0,0,0,3-3V27.858a4,4,0,1,0-2,0V30a1,1,0,0,1-1,1H35V18a1.993,1.993,0,0,0,1.722-1H54.136a1.853,1.853,0,0,0,1.72-1.147,1.881,1.881,0,0,0-.413-2.054C49.569,7.933,39.534,7.128,36.731,7.017A1.993,1.993,0,0,0,35,6V3a3,3,0,0,0-3-3H28a3,3,0,0,0-3,3V6a1.993,1.993,0,0,0-1.731,1.017c-2.8.111-12.838.916-18.712,6.782a1.879,1.879,0,0,0-.413,2.054A1.855,1.855,0,0,0,5.865,17H23.278A1.993,1.993,0,0,0,25,18V31H18a1,1,0,0,1-1-1V27.858a4,4,0,1,0-2,0V30a3,3,0,0,0,3,3h7v3H14.92a1.017,1.017,0,0,1-.76-.351l-2.883-3.367a4.1,4.1,0,1,0-1.524,1.3l2.89,3.375A3.008,3.008,0,0,0,14.92,38H25v3H14.92a3.012,3.012,0,0,0-2.28,1.05L9.753,45.422A3.944,3.944,0,0,0,8,45a4.017,4.017,0,1,0,3.277,1.718l2.88-3.364A1.021,1.021,0,0,1,14.92,43H25v3H18a3,3,0,0,0-3,3v2.142a4,4,0,1,0,2,0V49a1,1,0,0,1,1-1h7v9a3,3,0,0,0,3,3h4a3,3,0,0,0,3-3V48h7a1,1,0,0,1,1,1v2.142a4,4,0,1,0,2,0V49a3,3,0,0,0-3-3H35V43H45.08a1.02,1.02,0,0,1,.76.351l2.883,3.367a4.093,4.093,0,1,0,1.523-1.3l-2.89-3.375A3,3,0,0,0,45.08,41H35V38ZM52,28a2,2,0,1,1-2,2A2,2,0,0,1,52,28ZM42,24a2,2,0,1,1,2,2A2,2,0,0,1,42,24ZM23,9.038V15H6.19C11.316,10.1,20.062,9.2,23,9.038ZM14,24a2,2,0,1,1,2,2A2,2,0,0,1,14,24ZM6,30a2,2,0,1,1,2,2A2,2,0,0,1,6,30ZM8,51a2,2,0,1,1,2-2A2,2,0,0,1,8,51Zm10,4a2,2,0,1,1-2-2A2,2,0,0,1,18,55Zm28,0a2,2,0,1,1-2-2A2,2,0,0,1,46,55Zm8-6a2,2,0,1,1-2-2A2,2,0,0,1,54,49ZM37,15V9.038C39.939,9.2,48.685,10.1,53.811,15ZM27,3a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6H27ZM25,8H35l0,8H25Zm8,49a1,1,0,0,1-1,1H28a1,1,0,0,1-1-1V18h6Z" />
                  </svg>

                </div>
                <p className='chart-title pt-3' style={{padding:'4px 0'}}>تعداد استخرها</p>
              </div>

              <p className='fs-2'>{poolsCount}</p>
            </CardContent>
          </Card>
        </Col>

        <Col xs={6} lg={2} className='col-custom' >
          <Card className='chart-item'>
            <CardContent className='body-item'>
              <div>

                <div className='box-icon' style={{ backgroundColor: '#C9ECE8' }}>

                  <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" id="Layer_1" height="75" viewBox="-180 -20 328 328" width="75" data-name="Layer 1">
                    <path fill="#2A9D8F" d="m64 18a52 52 0 0 0 -36.78 88.76 2 2 0 0 0 1.42.59 2 2 0 0 0 1.41-.59l7.86-7.85a2 2 0 1 0 -2.82-2.83l-6.42 6.41a47.55 47.55 0 0 1 -12.62-30.49h9.06a2 2 0 0 0 0-4h-9.06a47.82 47.82 0 0 1 12.64-30.48l6.4 6.4a2 2 0 0 0 1.41.58 2 2 0 0 0 1.42-3.41l-6.4-6.4a47.82 47.82 0 0 1 30.48-12.64v9.06a2 2 0 0 0 4 0v-9.06a47.82 47.82 0 0 1 30.48 12.64l-6.4 6.4a2 2 0 0 0 1.42 3.41 2 2 0 0 0 1.41-.58l6.4-6.4a47.82 47.82 0 0 1 12.69 30.48h-9.06a2 2 0 1 0 0 4h9.06a47.61 47.61 0 0 1 -12.61 30.48l-6.43-6.4a2 2 0 1 0 -2.82 2.84l7.86 7.83a2 2 0 0 0 2.82 0 52 52 0 0 0 -36.82-88.75z" />
                    <path fill="#2A9D8F" d="m73 100h-12l7.2-9.6a2 2 0 0 0 -3.2-2.4l-9.6 12.8a2 2 0 0 0 1.6 3.2h12l-7.2 9.6a2 2 0 0 0 3.2 2.4l9.6-12.8a2 2 0 0 0 -1.6-3.2z" />
                    <path fill="#2A9D8F" d="m80.59 50.59-9.65 9.64a12 12 0 1 0 2.83 2.83l9.64-9.65a2 2 0 0 0 -2.82-2.82zm-16.59 27.41a8 8 0 1 1 8-8 8 8 0 0 1 -8 8z" /></svg>

                </div>
                <p className='chart-title pt-3'>هش ریت</p>
              </div>

              <p className='fs-2'>{hashrate} <span className='chart-text-span hashrate-text'>اگزاهش/ثانیه</span> </p>
            </CardContent>
          </Card>
        </Col>

        <Col xs={12} lg={2} className='col-custom' >
          <Card className='chart-item'>
            <CardContent className='body-item'>
              <div>


                <div className='box-icon' style={{ backgroundColor: '#C5D6DD' }}>

                  <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="250 -150 20 1050">
                    <defs
                      id="defs4705"><clipPath
                        clipPathUnits="userSpaceOnUse"
                        id="clipPath4715"><path
                          d="M 0,512 H 512 V 0 H 0 Z"
                          id="path4713" /></clipPath></defs><g
                            id="g4707"
                            transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)"><g
                              id="g4709"><g
                                id="g4711"
                                clipPath="url(#clipPath4715)"><g
                                  id="g4717"
                                  transform="translate(7.5,63.6128)"><path
                              d="M 0,0 497,144.291"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4719" /></g><g
                                id="g4721"
                                transform="translate(459.3774,413.416)"><path
                              d="m 0,0 c 27.704,-24.944 45.123,-61.089 45.123,-101.303 0,-75.262 -61.013,-136.274 -136.275,-136.274 -75.262,0 -136.274,61.012 -136.274,136.274 0,75.262 61.012,136.274 136.274,136.274 22.715,0 44.131,-5.557 62.964,-15.387"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4723" /></g><g
                                id="g4725"
                                transform="translate(79.645,231.9517)"><path
                              d="m 0,0 25.732,77.196 c 3.875,11.625 14.036,20.025 26.182,21.644 l 100.393,13.386 V 88.177 L 56.113,64.129"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4727" /></g><g
                                id="g4729"
                                transform="translate(143.7744,264.0161)"><path
                              d="M 0,0 -14.526,-44.949"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4731" /></g><g
                                id="g4733"
                                transform="translate(79.645,231.9517)"><path
                              d="M 0,0 V 0 C -4.709,-18.943 6.731,-38.141 25.632,-43.016 L 67.449,-53.799 41.769,-132.8"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4735" /></g><g
                                id="g4737"
                                transform="translate(79.645,231.9517)"><path
                              d="m 0,0 84.034,-24.744 c 13.384,-3.941 20.616,-18.407 15.738,-31.478 L 85.73,-93.843"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4739" /></g><g
                                id="g4741"
                                transform="translate(134.0361,128.9678)"><path
                              d="m 0,0 26.536,6.424 c 8.3,2.01 16.718,-2.84 19.144,-11.027 l 2.634,-8.89"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4743" /></g><g
                                id="g4745"
                                transform="translate(42.1953,102.4165)"><path
                              d="m 0,0 26.536,6.424 c 8.3,2.01 16.718,-2.839 19.144,-11.027 l 2.634,-8.89"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4747" /></g><g
                                id="g4749"
                                transform="translate(79.272,232.0664)"><path
                              d="M 0,0 -48.891,-160.451"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4751" /></g><g
                                id="g4753"
                                transform="translate(105.2769,188.936)"><path
                              d="M 0,0 -33.048,-79.12"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4755" /></g><g
                                id="g4757"
                                transform="translate(141.3203,376.4868)"><path
                              d="m 0,0 c -1.749,-8.68 3.87,-17.134 12.549,-18.883 8.68,-1.75 17.135,3.869 18.884,12.549 C 33.182,2.346 27.563,10.8 18.884,12.549 10.204,14.298 1.75,8.68 0,0 Z"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4759" /></g><g
                                id="g4761"
                                transform="translate(159.6665,332.0298)"><path
                              d="M 0,0 4.788,-26.551"
                              style={{ fill: 'none', stroke: '#264653', strokeWidth: '15', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10', strokeDasharray: 'none', strokeOpacity: '1' }}
                              id="path4763" /></g></g></g></g>
                  </svg>

                </div>

                <p className='chart-title pt-3'>سختی</p>
              </div>

              <p className='fs-2'>{difficulty} <span className='chart-text-span'>ترا</span> </p>
            </CardContent>
          </Card>
        </Col>

      </Row>

      {/* <Row className='g-3' style={{ paddingBottom: '100px'}}>

        <Col xl={6}>
          {<LinearChart />}
        </Col>

        <Col xl={6}>
          <PieChart />
        </Col>


      </Row> */}

    </div>
  )
}

export default Chart