import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { BaseResponse, HttpErrorDetail } from '@/types/base'
import localStorage from './localStorage'

export const DEFAULT_TOKEN_INVALID_ERRNO = 100401
// export const DEFAULT_BASE_URL = 'http://localhost:7001'
export const DEFAULT_BASE_URL = 'http://10.178.102.20:7001'
export const DEFAULT_TOKEN_KEY = 'token'

const instanceMap = new Map<string, AxiosInstance>()
const apiPrefixMap = new Map<string, string>()

export class HttpError extends Error {
  detail: HttpErrorDetail

  constructor(detail: HttpErrorDetail) {
    super(detail.message)
    this.detail = detail
  }
}

const instance = axios.create({
  baseURL: DEFAULT_BASE_URL, // 配置devServer proxy时，这里不能配置
  timeout: 30000
})

instance.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem(DEFAULT_TOKEN_KEY)
  if (token) {
    if (!config.headers) {
      // @ts-ignore
      config.headers = {}
    }

    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, error => {
  return Promise.reject(error)
}) 

instance.interceptors.response.use((resp: AxiosResponse<BaseResponse<any>>) => {
  const httpCode = resp.status
  console.log('rawResp -> ', resp.status, resp.statusText)
  if (httpCode === 200) {
    const { errno, data, message } = resp.data
    if (errno === 0) {
      return data
    } else {
      return Promise.reject(new HttpError({ type: 'biz', errno, message: message || '' }))
    }

  } else {
    return Promise.reject(new HttpError({ type: 'http', httpCode, message: resp.statusText }))
  }
}, error => {
  return Promise.reject(new HttpError({ type: 'unknown', message: error.message }))
})

instanceMap.set('default', instance)
apiPrefixMap.set('default', '/api/v1')

export const getInstance = (key: string = 'default'): AxiosInstance => {
  const instance = instanceMap.get(key)
  if (!instance) {
    throw new Error('No axios instance of key: ' + key)
  }

  return instance
}

export const getApiPrefix = (key: string = 'default') => {
  return apiPrefixMap.get(key) + ''
}

export const genRedirectFormatStr = (pathname: string) => {
  return `from=${pathname}`
}
