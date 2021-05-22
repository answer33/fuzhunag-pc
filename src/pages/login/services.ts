import request from '@/utils/request';

/**
 * 退出登录
 */
export const logout = () => {
  return request('/cps-app/api/pc/logout', { method: 'post' });
};

/**
 * 手机号登录接口
 * @param data
 */
export const phoneLogin = (data) => {
  return request('/cps-app/api/pc/phoneLogin', { data, method: 'post' });
};

/**
 *
 * @param data 获取短信验证码
 */
export const sms = (data) => {
  return request('/cps-app/api/pc/sms', { data, method: 'post' });
};
