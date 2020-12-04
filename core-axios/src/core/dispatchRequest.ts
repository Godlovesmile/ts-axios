import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types/index'
import xhr from './xhr'
import { buildURL } from '../helpers/buildUrl'
// import { transformRequest, transformResponse } from '../helpers/data'
import { flattenHeaders, processHeaders } from '../helpers/headers'
import tranformData from './tranformData'

// 创建文件入口
// function axios(config: AxiosRequestConfig): AxiosPromise {
//   processConfig(config)
//   // return xhr(config)
//   return xhr(config).then(res => {
//     return transformResponeseData(res)
//   })
// }
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 发送请求前检查配置的cancelToken是否有效, 如果已经使用过, 直接抛出异常
  thorwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponeseData(res)
  })
}

function thorwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  // config.headers = tranformHeaders(config)
  // config.data = transformRequestData(config)
  config.data = tranformData(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// function tranformHeaders(config: AxiosRequestConfig) {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

function transformResponeseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data)
  res.data = tranformData(res.data, res.headers, res.config.transformResponse)
  return res
}

// export default axios
