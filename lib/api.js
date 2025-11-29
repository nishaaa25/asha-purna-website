import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'api-version': 'v1',
  },
});

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

// Generic API call function
export async function apiCall(method, endpoint, data = null, params = null) {
  try {
    const config = {
      method,
      url: endpoint,
      ...(data && { data }),
      ...(params && { params }),
    };

    const response = await apiClient(config);
    
    // Handle your API's response format
    if (response.data._status) {
      return {
        status: true,
        data: response.data._data,
        message: response.data._message,
      };
    } else {
      return {
        status: false,
        data: {},
        message: response.data._message,
      };
    }
  } catch (error) {
    return {
      status: false,
      data: {},
      message: error.response?.data?.message || error.message,
    };
  }
}

// Convenience methods
export const api = {
  get: (endpoint, params) => apiCall('GET', endpoint, null, params),
  post: (endpoint, data) => apiCall('POST', endpoint, data),
  put: (endpoint, data) => apiCall('PUT', endpoint, data),
  patch: (endpoint, data) => apiCall('PATCH', endpoint, data),
  delete: (endpoint) => apiCall('DELETE', endpoint),
};