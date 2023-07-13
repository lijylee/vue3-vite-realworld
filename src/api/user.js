import request from '@/utils/request';

const login = user => {
  return request.post('/users/login', {
    'user': user
  });
};

const register = async (user) => {
  return request.post('/users', {
    'user': user
  });
};
export {
  login,
  register
};