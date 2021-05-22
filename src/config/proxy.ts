const API_HOST = process.env.API_HOST || 'dev';

const baseUrl = {
  dev: 'http://120.77.250.198:8888',
};

//代理请求路径前缀
const urlPrefix = ['/cps-app'];

const proxyVal = {
  target: baseUrl[API_HOST],
  changeOrigin: true,
};

let main = {};
urlPrefix.forEach((item) => {
  main[item] = proxyVal;
});
export default {
  ...main,
};
