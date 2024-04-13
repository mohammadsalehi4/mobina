import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'



const LinearChart = () => {

    const [difficultyChart, setDifficultyChart] = useState([])
    const [hasrateChart, setHasrateChart] = useState([])
    const [hashrateMAChart, setHashrateMAChart] = useState([])
    const [timeChartHashrate, setTimeChartHashrate] = useState([])
    const [timeChartDifficults, setTimeChartDifficults] = useState([])

    useEffect(() => {
        const request = async () => {
            const { data } = await axios.get('https://mempool.space/api/v1/mining/hashrate/1y')

            const difficults = data.difficulty.map(item => parseFloat((item.difficulty / 10 ** 12 + 10).toFixed(2)))
            setDifficultyChart(difficults)

            const hashrate = data.hashrates.map(item => parseFloat((item.avgHashrate / 10 ** 18).toFixed(0)))
            setHasrateChart(hashrate)

            const calculateMovingAverage = (data, windowSize) => {
                let movingAverages = [];

                for (let i = 0; i <= data.length - windowSize; i++) {
                    let sum = 0;
                    for (let j = i; j < i + windowSize; j++) {
                        sum += data[j];
                    }
                    movingAverages.push(sum / windowSize);
                }

                return movingAverages;
            }

            const hashrateMA = data.hashrates.map(item => parseFloat((item.avgHashrate / 10 ** 18).toFixed(0)))

            const calMovingAverages = calculateMovingAverage(hashrateMA, 15)

            const movingAverages = calMovingAverages.map(item => parseFloat(item.toFixed(0)))

            setHashrateMAChart(movingAverages)




            const difficultsTims = data.difficulty.map(item => {
                const dateDifficult = new Date(item.time * 1000)
                // const monthsFa = {
                //     0: "ژانویه",
                //     1: "فوریه",
                //     2: "مارس",
                //     3: "آوریل",
                //     4: "می",
                //     5: "ژوئن",
                //     6: "ژوئیه",
                //     7: "اوت",
                //     8: "سپتامبر",
                //     9: "اکتبر",
                //     10: "نوامبر",
                //     11: "دسامبر"
                // };
                // const monthName = monthsFa[dateDifficult.getMonth()];
                let formattedDateDifficult = null
                formattedDateDifficult = `${dateDifficult.getFullYear()}  ${dateDifficult.getMonth()}  ${dateDifficult.getDate()}`;
                return formattedDateDifficult
            })
            setTimeChartDifficults(difficultsTims)



            const chartTime = data.hashrates.map(item => {
                const date = new Date(item.timestamp * 1000)
                const monthsFa = {
                    0: "ژانویه",
                    1: "فوریه",
                    2: "مارس",
                    3: "آوریل",
                    4: "می",
                    5: "ژوئن",
                    6: "ژوئیه",
                    7: "اوت",
                    8: "سپتامبر",
                    9: "اکتبر",
                    10: "نوامبر",
                    11: "دسامبر"
                };
                const monthName = monthsFa[date.getMonth()];
                let formattedDate = null
                formattedDate = `${monthName} ${date.getDate()}`;
                return formattedDate
            })
            setTimeChartHashrate(chartTime)

        }
        request()
        const interval = setInterval(() => {
            request()
        }, 60000);
        return () => clearInterval(interval);

    }, [])




    Highcharts.setOptions({
        lang: {
            resetZoom: "بازنشانی زوم", // تنظیم متن دکمه ریست زوم به فارسی
        },
        legend:{
            useHTML:true
        },
        tooltip:{
            useHTML:true,
        }
    });


    const options = {
        chart: {
            zoomType: 'x', // امکان بزرگنمایی بر روی محور x
            panning: true,
            style: {
                // fontFamily: 'IRANSans',
                fontSize: 18,
            },
            resetZoomButton:{ // تنضیمات دکمه ریست
                theme:{
                    style:{
                        direction:'ltr'
                    }
                }
            }
        },
        tooltip: {
            // فعال‌سازی نمایش مشترک تولتیپ‌ها
            shared: true,
        },
        credits: {
            enabled: false // حذف اعتبار سایت Highcharts
        },
        legend: {
            enabled: true, // حذف راهنما (legend)
        },
        accessibility: {
            enabled: false // غیرفعال کردن ویژگی دسترسی
        },
        title: {
            text: '',
        },
        yAxis: [{
            labels: {
                formatter: function () {
                    // به مقدار هر برچسب واحد 'EH/s' اضافه می‌کنیم
                    return this.value + ' EH/s';
                },

                style: {
                    fontWeight: 600, // تنظیم سایز فونت برای برچسب‌های محور y
                    fontSize: 14,
                    // fontFamily: 'IRANSans',
                    color: '#9f9f9f',
                    direction: 'ltr'
                }
            },
            title: {
                text: '',
            },
            tickInterval: 100,
        }, {
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    // به مقدار هر برچسب واحد 'EH/s' اضافه می‌کنیم
                    return this.value + ' T';
                },
                style: {
                    fontWeight: 600, // تنظیم سایز فونت برای برچسب‌های محور y
                    fontSize: 14,
                    // fontFamily: 'IRANSans',
                    color: '#9f9f9f',
                    direction: 'ltr'
                }
            },
            tickInterval: 10,
            // min: 0, // حداقل مقدار محور y
            // max: 10,
            opposite: true
        }],
        xAxis: [{//time hashrattype: 'datetime', // تعیین نوع محور x به 'datetime' برای کار با تاریخ‌ها
            categories: timeChartHashrate,
            visible: true, // فقط تاریخ اول دیده می‌شود
            labels: {
                style: {
                    fontWeight: 600, // تنظیم سایز فونت برای برچسب‌های محور y
                    fontSize: 14,
                    // fontFamily: 'IRANSans',
                    color: '#9f9f9f',
                    direction: 'ltr'
                }
            },
        }, { // time difficulty
            categories: timeChartDifficults,
            opposite: true,
            visible: false, // این محور X نمایش داده نمی‌شود، ولی داده‌های خط قرمز از آن استفاده می‌کنند
        }],
        series: [
            { // difficulty
                name: 'Difficulty',
                data: difficultyChart,
                yAxis: 1, // نشون میده برای ستون سمت چپ
                xAxis: 1, // نشون میده تارخ جداگانه داره
                color: '#FB1E7B',
                step: true,
                zIndex: '1',
                marker: {
                    enabled: false,  // حذف نقاط روی خطوط
                    overflow: 'justify',
                },
                tooltip: {
                    // فرمت تولتیپ برای خط hashrate(MA)
                    pointFormatter: function () {
                        // const date = new Date(this.x); // تبدیل رشته تاریخ به شیء تاریخ
                        // const year = date.getFullYear(); // استخراج سال از شیء تاریخ
                        return `<span style="color:${this.series.color}">\u25CF</span> ${this.series.name}: <b>${this.y} T</b><br/>`;
                    },
                    valueDecimals: 2,
                },
            },
            {
                name: 'Hashrate',// چون این مقدار  yAxis نداره به صورت پیش فرض با ستون سمت راسته
                data: hasrateChart,
                // color: '#5fa8d3',
                yAxis: 0,
                xAxis: 0,
                color: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        // [0, Highcharts.getOptions().colors[1]], // آبی در بالا
                        // [1, Highcharts.getOptions().colors[2]]  // قرمز در پایین
                        [0, '#f85e00'], //  بالا
                        [1, '#04e184']  //  پایین 
                    ]
                },
                tooltip: {
                    // فرمت تولتیپ برای خط hashrate(MA)
                    pointFormatter: function () {
                        return `<span style="color:${this.series.color}">\u25CF</span> ${this.series.name}: <b>${this.y} EH/s</b><br/>`;
                    },
                },
            }, {//hashrate(MA)
                name: 'Hashrate(MA)',// چون این مقدار  yAxis نداره به صورت پیش فرض با ستون سمت راسته
                data: hashrateMAChart,
                // color: '#3a0ca3',
                yAxis: 0,
                xAxis: 0,
                color: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                        // [0, Highcharts.getOptions().colors[1]], // آبی در بالا
                        // [1, Highcharts.getOptions().colors[2]]  // قرمز در پایین
                        // [0, '#b81702'], //  بالا
                        // [1, '#ffbf00']  //  پایین
                        [0, '#ff0000'],
                        [1, '#0000ff']
                    ]
                },
                tooltip: {
                    // فرمت تولتیپ برای خط hashrate(MA)
                    pointFormatter: function () {
                        return `<span style="color:${this.series.color}">\u25CF</span> ${this.series.name}: <b>${this.y} EH/s</b><br/>`;
                    },
                },
            }],
    };





    return (
        <div style={{ direction: 'none !important' }}>
            <Card>
                <CardContent>
                    <p className='header-item'>هش‌ریت و سختی شبکه بیت‌کوین</p>
                    <div className='p-4'>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    )

};

export default LinearChart;
