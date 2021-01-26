import { parseHeaders } from '../helpers/headers'
import { AxiosRequestConfig, AxiosResponse } from '../types'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/buildUrl'
import cookie from '../helpers/cookie'
import { isFormData } from '../helpers/utils'

export default function xhr(config: AxiosRequestConfig): void {
  /*
    1. 创建 request 实例
    2. 执行 request.open 方法初始化
    3. 执行 configureRequest 配置 request 对象
    4. 执行 addEvents 给 request 添加事件处理函数
    5. 执行 processHeaders 处理请求 headers
    6. 执行 processCancel 处理请求取消逻辑
    7. 执行 request.send 方法发送请求
  */
  return new Promise((resolve, reject) => {
    // 1. 创建 request 实例
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      validateStatus
    } = config
    const request = new XMLHttpRequest()

    // 2. 执行 request.open 方法初始化
    console.log('=== url ===', url)
    request.open(method?.toUpperCase(), url, true)

    // 3. 执行 configureRequest 配置 request 对象
    configureRequest()

    // 4. 执行 addEvents 给 request 添加事件处理函数
    addEvents()

    // 5. 执行 processHeaders 处理请求 headers
    processHeaders()

    // 6. 执行 processCancel 处理请求取消逻辑
    processCancel()

    // 7. 执行 request.send 方法发送请求
    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        request.timeout = timeout
      }
      if (withCredentials) {
        request.withCredentials = true
      }
    }

    function addEvents() {
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4 || request.status === 0) return

        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData =
          responseType && responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        // resolve(response)
        handleResponse(response)
      }
      request.onerror = function handleError() {
        // reject(new Error('Network Error'))
        reject(
          createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
        )
      }
      request.ontimeout = function handleTimeout() {
        // reject(new Error(`Timeout of ${timeout} ms exceeded`))
        reject(
          createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
        )
      }
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders() {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel() {
      // 取消请求
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    function handleResponse(response: AxiosResponse) {
      if (!validateStatus || validateStatus(response.status)) {
        // if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed with status code ${response.status}`))
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
