'use client';

import { useState, useCallback } from 'react';
import { callAPI, callPostAPI } from '@/lib/helpers/apiService';
import { showErrorToast, showSuccessToast } from '@/lib/helpers/toastConfig';

/**
 * Custom hook for making API calls
 * @returns {Object} API utilities
 */
export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Make a GET request
   * @param {string} url - API endpoint
   * @param {Object} params - Query parameters
   * @param {Object} options - Additional options (showToast, successMessage, errorMessage)
   */
  const get = useCallback(async (url, params = {}, options = {}) => {
    setLoading(true);
    setError(null);

    return new Promise((resolve) => {
      callAPI('GET', url, params, (response) => {
        setLoading(false);
        if (response.status) {
          if (options.showToast && options.successMessage) {
            showSuccessToast(options.successMessage);
          }
          resolve(response);
        } else {
          setError(response.message);
          if (options.showToast) {
            showErrorToast(options.errorMessage || response.message || 'Something went wrong');
          }
          resolve(response);
        }
      });
    });
  }, []);

  /**
   * Make a POST request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} options - Additional options (showToast, successMessage, errorMessage)
   */
  const post = useCallback(async (url, data = {}, options = {}) => {
    setLoading(true);
    setError(null);

    return new Promise((resolve) => {
      callAPI('POST', url, data, (response) => {
        setLoading(false);
        if (response.status) {
          if (options.showToast && options.successMessage) {
            showSuccessToast(options.successMessage);
          }
          resolve(response);
        } else {
          setError(response.message);
          if (options.showToast) {
            showErrorToast(options.errorMessage || response.message || 'Something went wrong');
          }
          resolve(response);
        }
      });
    });
  }, []);

  /**
   * Make a POST request using async/await pattern
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   */
  const postAsync = useCallback(async (url, data = {}) => {
    setLoading(true);
    setError(null);

    const response = await callPostAPI(url, data);
    setLoading(false);

    if (!response.status) {
      setError(response.message);
    }

    return response;
  }, []);

  return {
    get,
    post,
    postAsync,
    loading,
    error,
  };
};



