import axios from 'axios';

(function() {
  axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
  axios.defaults.timeout = '20s';
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post['Content-type'] = 'application/json, chartset=UTF-8';
  axios.defaults.headers.author = '';

  axios.interceptors.request.use(config => {
    config.withCredentials = false;
    config.headers['token'] = window.sessionStorage.getItem('token') || 'abcd';
    return config;
  });

  axios.interceptors.response.use(response => {

    return Promise.resolve(response);
  });
})();

const get = (url, config = {}) => {
  let configData = Object.assign({
    url: url,
    method: 'get'
  }, config);
  return new Promise((resolve, reject) => {
    axios(configData).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
};

export default {
  get
};
