import request from '@/utils/request';

const login = user => {
  return request.post('/users/login', {
    'user': user
  });
};

const register = user => {
  return request.post('/users', {
    'user': user
  });
};

const updateUser = user => {
  return request.put('/user', {
    'user': user
  });
};

export {
  login,
  register,
  updateUser
};