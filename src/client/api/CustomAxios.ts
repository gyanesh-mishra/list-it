import axios from 'axios';

/*
CustomAxios helps implement interceptors at the request level
before it even reaches any of the handlers.

Currently if the server returns any error codes over 500, we retry the request every 2 seconds
until success or MAX_RETRIES has been reached.

// TODO: Implement axios-retry library once the custom config is fixed.
Alternatively, Implement custom exponential back-off once the custom config flags are fixed.
Instead of using the request header hack. https://github.com/axios/axios/issues/2203
*/

const MAX_RETRIES = 5;

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

    // If the request has failed check if it's the first failure, if not, note the failure count.
    // Store the count in the request header
    const originalRequest = config;
    const current_retry_count =
      originalRequest.headers.retry_count === undefined ? 1 : originalRequest.headers.retry_count + 1;
    originalRequest.headers.retry_count = current_retry_count;

    // If the request has been re-tried more than the max set number, stop retrying and reject the promise.
    let retry = current_retry_count >= MAX_RETRIES ? false : true;
    if (status >= 500 && retry) {
      return sleepRequest(2000, originalRequest);
    } else {
      return Promise.reject(error);
    }
  },
);

export default instance;
