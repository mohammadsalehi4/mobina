import React, { useEffect , useState } from 'react';
import axios from 'axios'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'


import * as echarts from 'echarts';
import { TooltipComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import ReactECharts from 'echarts-for-react'

echarts.use([TooltipComponent, PieChart, CanvasRenderer, LabelLayout]);

const PieChartc = () => {

  const [pieChart, setPieChart] = useState([])

  useEffect(() => {

    const request = async () => {
      const { data } = await axios.get('https://mempool.space/api/v1/mining/pools/1w')
      setPieChart(data)
    }

    request()

  }, []);


  let totalBlock = null
  let labels = null

  if (pieChart.pools) {

    totalBlock = pieChart.blockCount

    labels = pieChart.pools.map(item => {
      return { value: ((item.blockCount / totalBlock) * 100).toFixed(2), name: item.name }
    })

  }





  const option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // color: ['#b5179e', '#7209b7', '#1e4c83],
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['20%', '80%'],
        data: labels,
        alignTo: 'edge',
        edgeDistance: -30,
        top: '10px',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          }
        },
        label: {
          // alignTo: 'edge',
          edgeDistance: 40,
          color: '#9f9f9f',
          fontSize: '15px',
          lineHeight: 20,
        },
      },
    ]
  };





  return (
    <Card>
      <CardContent>
        <p className='header-item'>سهم استخراج استخرهای بیت‌کوین</p>
        <div className='py-4'>
          <ReactECharts option={option} style={{ width: '100%', height: '400px' }} />
        </div>
      </CardContent>
    </Card>

  )
};

export default PieChartc;

