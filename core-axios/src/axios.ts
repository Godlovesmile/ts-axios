import Axios from './core/Axios'
import { extend } from './helpers/utils'
import { AxiosInstance, AxiosRequestConfig } from './types'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  // 由于这里 TypeScript 不能正确推断 instance 的类型，我们把它断言成 AxiosInstance 类型
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
