import { config } from 'process'
import { AxiosPromise, AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helpers/buildUrl'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

// 创建文件入口
function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = tranformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function tranformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
