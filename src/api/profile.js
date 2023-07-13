import request from '@/utils/request';
export const getProfile = username => {
  return request({
    method: 'get',
    url: `/profiles/${username}`
  });
};