import axios from 'axios';
import { Message, Loading } from 'element-ui';

let loadingInit = null;

(function() {
  axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
  // axios.defaults.baseURL = 'https://springhua.top:3000/';
  axios.defaults.timeout = '20s';
  axios.defaults.withCredentials = true;
  axios.defaults.headers['Content-type'] = 'application/json, chartset=UTF-8';
  axios.defaults.headers.author = '';

  axios.interceptors.request.use(config => {
    config.withCredentials = false;
    config.headers['token'] = window.sessionStorage.getItem('token') || '';
    return config;
  });

  axios.interceptors.response.use(response => {
    if (loadingInit) {
      loadingInit.close();
      loadingInit = null;
    }
    if (response.status === 200) {
      // if (response.data.code === 0) {
      //   Message({type: 'error', message: `${response.data.errorMsg}`});
      //   return Promise.reject(response.data);
      // } else {
      //   return Promise.resolve(response.data);
      // }
      return Promise.resolve(response.data);
    } else if (response.status === 404) {
      Message({type: 'error', message: `请求地址 ${response.config.url} 错误，请检查请求地址！`});
      return Promise.reject(response.data);
    } else if (response.status === 500 || response.status === 5002 || response.status === 503) {
      Message({type: 'error', message: `网络故障，请稍后再试！`});
      return Promise.reject(response.data);
    }
    return Promise.resolve(response);
  });
})();

const get = ({url, params = {}, config = {}}) => {
  let str = '';
  Object.keys(params).forEach((key, index) => {
    if (index < Object.keys(params).length && Object.keys(params).length !== 0) {
      if (params[key] || params[key] === 0) str += `${key}=${params[key]}&`;
    } else if (Object.keys(params).length !== 0) {
      if (params[key] || params[key] === 0) str += `${key}=${params[key]}`;
    }
    // str += `s{key}=${params[key]}`;
  });
  let configData = Object.assign({
    url: str && str !== '' ? `${url}?${str}` : url,
    method: 'get'
  }, config);
  // console.log(config.isLoading, config.isLoading.indexOf('false') > -1);
  if (config.isLoading !== false) {
    loadingInit = Loading.service({
      background: 'rgba(100, 100, 100, .5)'
    });
  }
  return new Promise((resolve, reject) => {
    axios(configData).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
};

const post = (url, data = {}, config = {}) => {
  let configData = Object.assign({
    url: url,
    method: 'post'
  }, data);
  if (config.isLoading !== false) {
    loadingInit = Loading.service({
      background: 'rgba(100, 100, 100, .5)'
    });
  }
  if (config['headers']) configData['headers'] = config['headers'];
  
  return new Promise((resolve, reject) => {
    axios(configData).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
};

export default {
  get,
  post
};
