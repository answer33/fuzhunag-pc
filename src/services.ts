import request from '@/utils/request';

/**
 * 查询用户拥有的菜单权限和按钮权限
 */
export const getUserPermissionByToken = () => {
  return request('/cps-app/api/pc/getUserPermissionByToken');
};
