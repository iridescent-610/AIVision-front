import axios from 'axios'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_AIX_API,
  timeout: 5000 // request timeout
})
// console.log('haha122', process.env, process.env.VUE_APP_AIX_API)
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // config.headers['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMyJ9.V2VBViKI4Mx_wGxqfWBtxuKmZa_UVTMpR5Mc4H7K5ok' // store.getters.token // 'JWT ' + store.getters.token  //
      config.headers['Authorization'] = 'JWT ' + store.getters.token
      // console.log('JWT ' + store.getters.token)
      // config.headers['Content-Type'] = 'application/json'   // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk4NTI5OTk2LCJqdGkiOiJhMzczYWY2ODgzMzU0MGVlYTgyMGVmOTkwYWUwODA2NiIsInVzZXJfaWQiOjEzfQ.8S9u97Pv-uuKfd76n9FPhI54o6gpEG-MfPmJJDc4Pf0
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(undefined, function (error) {
  // if error response status is 401, it means the request was invalid due to expired access token
  if (error.config && error.response && error.response.status === 401) {
    console.log('interceptors.response')
    console.log(error.config)
    store.commit("removeAuth")
    store.commit("setIsDialogOpen", true)
    store.commit('setDialogContent', "登录过期，请重新登录")
  }
  return Promise.reject(error);
})

export default service