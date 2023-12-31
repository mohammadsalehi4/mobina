/* eslint-disable no-unused-vars */
import React from 'react'

const DevelopCalendar = () => {
    const persianData = [
        {
            month:'فروردین',
            days:31,
            number:1
        },
        {
            month:'اردیبهشت',
            days:31,
            number:2
        },
        {
            month:'خرداد',
            days:31,
            number:3
        },
        {
            month:'تیر',
            days:31,
            number:4
        },
        {
            month:'مرداد',
            days:31,
            number:5
        },
        {
            month:'شهریور',
            days:31,
            number:6
        },
        {
            month:'مهر',
            days:30,
            number:7
        },
        {
            month:'آبان',
            days:30,
            number:8
        },
        {
            month:'آذر',
            days:30,
            number:9
        },
        {
            month:'دی',
            days:30,
            number:10
        },
        {
            month:'بهمن',
            days:30,
            number:11
        },
        {
            month:'اسفند',
            days:29,
            number:12
        }
    ]
  return (
    <div>
        <select class="form-select" aria-label="Default select example" >
            <option selected value="0">سال</option>
            {
                persianData.map((item, index) => {
                    return (
                        <option key={index} value={`${item.number}`}>{item.month}</option>
                    )
                })
            }
        </select>
        <select class="form-select" aria-label="Default select example" >
            <option selected value="0">ماه</option>
            {
                persianData.map((item, index) => {
                    return (
                        <option key={index} value={`${item.number}`}>{item.month}</option>
                    )
                })
            }
        </select>
        <select class="form-select" aria-label="Default select example" >
            <option selected value="0">روز</option>
            {
                persianData.map((item, index) => {
                    return (
                        <option key={index} value={`${item.number}`}>{item.month}</option>
                    )
                })
            }
        </select>
    </div>
  )
}

export default DevelopCalendar
