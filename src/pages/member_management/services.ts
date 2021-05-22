import request from '@/utils/request';

/**
 * 添加会员
 */
export const add = (data) => {
  return request('/cps-app/api/pc/cpsMember/add', { data, method: 'post' });
};

/**
 * 删除会员
 */
export const remove = (data) => {
  return request('/cps-app/api/pc/cpsMember/delete', {
    data,
    method: 'delete',
  });
};

/**
 * 编辑会员
 */
export const edit = (data) => {
  return request('/cps-app/api/pc/cpsMember/edit', {
    data,
    method: 'put',
  });
};

/**
 * 会员列表
 */
export const list = (params) => {
  return request('/cps-app/api/pc/cpsMember/list', {
    params,
  });
};

/**
 * 通过id查询会员
 */
export const queryById = (params) => {
  return request('/cps-app/api/pc/cpsMember/queryById', {
    params,
  });
};
