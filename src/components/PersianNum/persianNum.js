/* eslint-disable brace-style */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React from 'react'

const PersianNum = (props) => {
    const s = props.text
    let a = ''
    // با استفاده از حلقه for
    for (let i = 0; i < s.length; i++) {
      if (s[i] === 1) {
        a = `${a}۱`
      }
      else if (s[i] === 2) {
        a = `${a}۲`
      }
      else if (s[i] === 3) {
        a = `${a}۳`
      }
      else if (s[i] === 4) {
        a = `${a}۴`
      }
      else if (s[i] === 5) {
        a = `${a}۵`
      }
      else if (s[i] === 6) {
        a = `${a}۶`
      }
      else if (s[i] === 7) {
        a = `${a}۷`
      }
      else if (s[i] === 8) {
        a = `${a}۸`
      }
      else if (s[i] === 9) {
        a = `${a}۹`
      }
      else if (s[i] === 0) {
        a = `${a}۰`
      }
    }
  return (<p>{a}</p>)
}

export default PersianNum