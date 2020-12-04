import Axios from './core/Axios'
import { extend } from './helpers/utils'
import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  // 由于这里 TypeScript 不能正确推断 instance 的类型，我们把它断言成 AxiosInstance 类型
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios
