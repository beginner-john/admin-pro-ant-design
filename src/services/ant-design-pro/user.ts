// @ts-ignore
/* eslint-disable */
import { request } from 'umi';


/** 获取用户列表 GET /api/users */
export async function userList(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.UserList>('/api/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建用户 POST /api/users */
export async function addUser(options?: { [key: string]: any }) {
  return request<API.UserList>('/api/users', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 修改用户 PUT /api/users */
export async function updateUser(options?: { [key: string]: any }) {
  return request<API.UserList>('/api/users', {
    method: 'PUT',
    ...(options || {}),
  });
}


/** 删除用户 DELETE /api/users */
export async function removeUser(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/users', {
    method: 'DELETE',
    ...(options || {}),
  });
}
