const axios = require('axios');

const { fbApiBaseUrl, fbPageAccessToken } = process.env;

function sendNotification(method, url, params) {
  const options = {
    url,
    baseURL: fbApiBaseUrl,
    method,
  };
  options.params = {};
  Object.keys(params).forEach((key) => {
    options[key] = params[key];
  });
  options.params.access_token = fbPageAccessToken;
  return axios(options);
}

async function request(method, url, params, retry = 0) {
  try {
    return await sendNotification(method, url, params);
  } catch (error) {
    if (error && retry < 3) {
      return request(method, url, params, retry + 1);
    }
    return error;
  }
}

module.exports = { request };
