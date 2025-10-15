import axios from 'axios';
import { get, post } from './apiBase';

function setHeader() {
  const _headers = {
    headers: {
      'Content-Type': 'application/json',
      'api-version': 'v1',
    },
  };
  return _headers;
}

export const callPostAPI = async (url, params) => {
  let res;
  console.log('API POST Request:', `${process.env.BASE_API_URL}${url}`, params);
  
  await axios
    .post(`${process.env.BASE_API_URL}${url}`, params, setHeader())
    .then((result) => {
      console.log('API POST Response:', result.data);
      const response = result.data;
      if (response._status) {
        res = {
          status: true,
          data: response['_data'],
          message: response['_message'],
        };
      } else {
        res = {
          status: false,
          data: {},
          message: response['_message'],
        };
      }
    })
    .catch((err) => {
      console.error('API POST Error:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText,
        headers: err.response?.headers,
        url: `${process.env.BASE_API_URL}${url}`,
        requestData: params
      });
      console.error('Full error object:', JSON.stringify({
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      }, null, 2));
      
      // Extract more detailed error message
      let errorMessage = 'An error occurred';
      if (err.response?.data?._message) {
        errorMessage = err.response.data._message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 422) {
        errorMessage = `Request failed with status code 422. ${err.response?.data?.errors ? JSON.stringify(err.response.data.errors) : 'Please check your input data.'}`;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      res = {
        status: false,
        data: err.response?.data || {},
        message: errorMessage,
      };
    });
  return res;
};

export const callAPI = (method, url, params, cb) => {
  console.log(`API ${method} Request:`, `${process.env.BASE_API_URL}${url}`, params);
  
  if (method == 'GET') {
    get(
      url,
      {
        params: params,
        paramsSerializer: (params) => {
          let result = '';
          Object.keys(params).forEach((key) => {
            result += `${key}=${encodeURIComponent(params[key])}&`;
          });
          return result.substr(0, result.length - 1);
        },
      },
      (response, err) => {
        try {
          console.log('API GET Response:', response);
          let res;
          if (err) {
            console.error('API GET Error:', err);
            res = {
              status: false,
              data: {},
              message: err.response?.data?._message || err.message || 'An error occurred',
            };
          } else if (response._status) {
            res = {
              status: true,
              data: response['_data'],
              message: response['_message'],
            };
          } else {
            res = {
              status: false,
              data: {},
              message: response['_message'],
            };
          }
          cb(res);
        } catch (err) {
          console.error('API GET Processing Error:', err);
          cb({
            status: false,
            data: {},
            message: 'An unexpected error occurred',
          });
        }
      }
    );
  } else {
    post(url, params, (response, err) => {
      try {
        console.log('API POST Response:', response);
        let res;
        if (err) {
          console.error('API POST Error:', err);
          res = {
            status: false,
            data: {},
            message: err.response?.data?._message || err.message || 'An error occurred',
          };
        } else if (response._status) {
          res = {
            status: true,
            data: response['_data'],
            message: response['_message'],
          };
        } else {
          res = {
            status: false,
            data: {},
            message: response['_message'],
          };
        }
        cb(res);
      } catch (err) {
        console.error('API POST Processing Error:', err);
        cb({
          status: false,
          data: {},
          message: 'An unexpected error occurred',
        });
      }
    });
  }
};



