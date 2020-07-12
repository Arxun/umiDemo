import axios from "axios"
import {
  notification
} from "antd"

const API = axios.create()

API.defaults.timeout =  5000

// API.defaults.withCredentials = true    //跨域请求时是否需要凭证

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问时被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {

    return response
  }
  const errorText = typeof response.status === "string" ? "未知错误 " : codeMessage[response.status] || response.statusText
  notification.error({
    message: `请求错误${response.status}`,
    description: errorText,
  })
  return null
}

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    API.get(url, {
      params,
    }).then(res => {
      // checkStatus(res)
      resolve(res)
    }).catch(err => {
      if (err.response) {
        checkStatus(err.response)
      }
      reject(err)
    })
  })
}

export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    API.post(url, {
      params,
    }).then(res => {
      resolve(res)
    }).catch(err => {
      if (err.response) {
        checkStatus(err.response)
      }
      reject(err)
    })
  })
}

API.interceptors.request.use(config => {
  console.log(config, config.url, "axios请求拦截器")
  return config
})
