import request from '../utils/request';

const login = user => {
  return request.post('/users/login', {
    'user': user
  });
  // try {
  //   const response = await request.post('/users/login', {
  //     'user': user
  //   });
  //   if (response.status === 200) {
  //     return {
  //       successLogin: true,
  //       data: response.data.user
  //     };
  //   } else {
  //     return {
  //       successLogin: false,
  //       data: response.data.errors
  //     };
  //   }
  // } catch (error) {
  //   throw error;
  // }
};

const register = async (user) => {
  try {
    const response = await request.post('/users', {
      'user': user
    });
    console.log({ response });
    if (response.status === 200) {
      const user = response.data.user;
      return {
        successRegister: true,
        user
      };
    }
  } catch (error) {
    console.log(error);
  }
};
export {
  login,
  register
};