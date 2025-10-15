import axios from 'axios';

function setHeader() {
  const _headers = {
    headers: {
      'Content-Type': 'application/json',
      'api-version': 'v1',
    },
  };
  return _headers;
}

export function get(url, params, cb) {
  console.log('GET Request to:', `${process.env.BASE_API_URL}${url}`);
  axios
    .get(`${process.env.BASE_API_URL}${url}`, params, setHeader())
    .then((response) => {
      console.log('GET Response:', response.data);
      cb(response['data'], null);
    })
    .catch((err) => {
      console.error('GET Error:', err);
      cb({}, err);
    });
}

export function post(url, params, cb) {
  console.log('POST Request to:', `${process.env.BASE_API_URL}${url}`);
  axios
    .post(`${process.env.BASE_API_URL}${url}`, params, setHeader())
    .then((response) => {
      console.log('POST Response:', response.data);
      cb(response['data'], null);
    })
    .catch((err) => {
      console.error('POST Error:', err);
      cb(null, err);
    });
}



