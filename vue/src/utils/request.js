import axios from 'axios';
import { Message } from 'element-ui';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['L-TOKEN'] = 'mocktoken';
    const { data = {}} = config;
    const { requestConfig = {}} = data;
    if (config.data && config.data.requestConfig) {
      delete config.data.requestConfig;
    }
    config.requestConfig = { ...(config.requestConfig || {}), ...requestConfig };
    console.log(`<<<<<< request ${config.url}`, config.method, config.data);
    return config;
  },
  error => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 兼容文件下载
    if (response.config.responseType === 'blob') {
      return response;
    }
    console.log(`>>>>>> response ${response.config.url}`, {
      data: response.data,
      status: response.status
    });

    const requestConfig = response.config.requestConfig || {};
    const res = response.data;
    if (res.code !== 0) {
      if (!requestConfig.isHandleSelf || res.code === -1) {
        Message({
          message: res.message || 'Error系统错误',
          type: 'error'
        });
      }
      // if (requestConfig && requestConfig.isHandleSelf && res.code !== -1) {
      //   return [res, null];
      // }
      return [res, res.data];
    } else {
      return [null, res.data];
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error'
    });
    return [error, null];
  }
);

export default service;
