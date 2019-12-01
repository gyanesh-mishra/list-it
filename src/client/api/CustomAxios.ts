import axios from 'axios';

/*
CustomAxios helps implement interceptors at the request level
before it even reaches any of the handlers.

Currently if the server returns any error codes over 500, we retry the request every 2 seconds until success.

// TODO: Implement axios-retry library once the custom config is fixed.
Alternatively, Implement custom exponential back-off once the custom config flags are fixed.
*/

const instance = axios.create({});

const sleepRequest = (milliseconds, originalRequest) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(instance(originalRequest)), milliseconds);
  });
};

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status >= 500) {
      return sleepRequest(2000, originalRequest);
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;
