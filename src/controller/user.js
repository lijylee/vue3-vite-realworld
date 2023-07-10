import request from '../utils/request';

const login = async (user) => {
  try {
    const response = await request.post('/users/login', {
      'user': user
    });
    console.log({ response });
    if (response.status === 200) {
      const user = response.data.user;
      return {
        successLogin: true,
        user: user
      };
    }
  } catch (error) {
    console.log(error);
  }
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