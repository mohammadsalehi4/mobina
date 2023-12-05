/* eslint-disable no-unused-vars */
import axios from 'axios'
import Cookies from 'js-cookie'
import { serverAddress } from '../address'

export function SearchNetwork (address) {
    axios.get(`${serverAddress}/explorer/search/?query=${address}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
        return (response)
    })
    .catch((err) => {
        return err
    })
}

export function GetNetworkData (address, network) {
    axios.get(`${serverAddress}/explorer/search/?query=${address}&network=${network}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access')}`
      }
    })
    .then((response) => {
        if (response.status === 200) {
            return (response)
        }
    })
    .catch((err) => {
        return err
    })
}