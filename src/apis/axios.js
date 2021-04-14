import axios from 'axios';
import VueRouter from './../router';
import { Message, Loading } from 'element-ui';

let loadingInit = null;
let requestNum = 0;
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
      return successDone(response.data);
    }
  }, error => {
    if (loadingInit) {
      loadingInit.close();
      loadingInit = null;
    }
    // console.log(error.response);
    if (error.response.status === 401) {
      return fail401Done(error.response);
    } else if (error.response.status === 404) {
      Message({type: 'error', message: `请求地址 ${error.response.config.url} 错误，请检查请求地址！`});
      return Promise.reject(error.response);
    } else if (error.response.status === 404) {
      Message({type: 'error', message: `网络故障，请稍后再试！`});
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error.response);
    }
    
  });
})();

const successDone = (data) => {
  if (data.code === 0) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(data);
  }
};

const fail401Done = async () => {
  requestNum++;
  if (requestNum > 3) {
    VueRouter.push('/login');
    return Promise.reject();
  }
  let result = await axios({url: '/test/200'}).catch(() => {
    VueRouter.push('/login');
  });
  if (result.code === 0) {
    await axios({url: '/test/401'}).catch(() => {
      VueRouter.push('/login');
    });
  } else {
    VueRouter.push('/login');
  }
  // axios({url: '/test/200'}).then(res => {
  //   axios({url: '/string'}).then(res => {

  //   }).catch(error => {
      
  //   });
  // });
};

// const get = async ({url, params = {}, config = {}, num = 0}) => {
const get = async ({url, params = {}, config = {}}) => {
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
  // return new Promise((resolve, reject) => {
  return new Promise((resolve) => {
    return axios(configData).then(res => {
      resolve(res);
    }).catch(() => {
      // axiosFn(configData, reject, num);
      // axios(configData, reject, num).then(res => {

      // }).catch(error => {
      //   reject(error);
      // });
      // reject(error);
    });
  });
};

// const axiosFn = async (configData, reject, num) => {
//   num++;
//   axios({url: '/test/200'}).then(res => {
//     if (num < 2) {
//       axiosFn(configData, reject, num);
//     } else {
//       reject(res);
//     }
//   }, error => {
//     if (num < 4) {
//       axiosFn(configData, reject, num);
//     } else {
//       reject(error);
//     }
//   }).catch(error => {
//     reject(error);
//   });
// };

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
