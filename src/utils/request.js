import axios from 'axios'
import {
    Toast
} from 'mint-ui'
// import store from '@/store'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的 base_url
    // timeout: 5000 // request timeout
    timeout: 50000 // request timeout
})

// axios request interceptor
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config
}, function (error) {
    console.log(error); // for debug
    // Do something with request error
    return Promise.reject(error)
})

// axios response interceptor
service.interceptors.response.use(function (response) {
    // Do something with response data
    return response
}, function (error) {
    console.log('err' + error) // for debug
    Toast({
        message: error.message,
        duration: 5 * 1000
    })
    // Do something with response error
    return Promise.reject(error)
})

export default service
