const LOGIN_TOKEN = 'access_token';
/**
 * 获取token
 */
const getToken = () => {
  return localStorage.getItem(LOGIN_TOKEN) || '';
};

/**
 * 设置登陆token
 * @param token 登陆token
 */
const setToken = (token) => {
  localStorage.setItem(LOGIN_TOKEN, token);
};

/**
 * 清除token
 */
const cleanToken = () => {
  localStorage.removeItem(LOGIN_TOKEN);
};

export { getToken, setToken, cleanToken };
