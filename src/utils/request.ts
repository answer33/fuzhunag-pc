import { message as Message } from 'antd';
import axios from 'axios';
import { getToken, cleanToken } from './token';

Message.config({
  duration: 2,
  maxCount: 1,
});

const TIMEOUT = 10000;

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '未登录或登录失效,请重新登录',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '404-请求链接不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  100000: '服务故障，请稍后重试',
  no_login: '登录超时或未登录状态',
  unknown: '未知错误',
};

export default function request(url: string, opt?: Record<string, any>) {
  const cookie = getToken();
  const defaultOptions = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      post: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      'X-Access-Token': cookie,
    },
    timeout: TIMEOUT,
  };
  opt = opt ? Object.assign({}, defaultOptions, opt) : defaultOptions;
  return axios(url, opt)
    .then((response) => {
      let { status, data } = response;
      if (data.success) {
        return data.result;
      } else {
        Message.error(data.message);
        throw data;
      }
    })
    .catch((err) => {
      let { message, response } = err;
      let status;
      if (response) status = response.status;
      const { data } = response;
      if (data.code == 401) {
        Message.error('token过期，请重新登陆');
        reLogin();
      } else if (codeMessage[status]) {
        Message.error(codeMessage[status]);
      } else if (message) {
        Message.error(message);
      } else {
        Message.error('服务器发生错误，请检查服务器。');
      }
      throw err;
    });
}

export function reLogin() {
  cleanToken();
  window.location.replace('/login');
}
