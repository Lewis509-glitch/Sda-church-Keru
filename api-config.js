// API Configuration
// This file determines the base URL for API calls based on the environment

const getApiBaseUrl = () => {
  // In development, use localhost if running locally
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3000';
  }
  
  // In production, use the same origin
  return window.location.origin;
};

const API_BASE_URL = getApiBaseUrl();

// Utility function to make API calls with proper headers
const makeApiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const authToken = localStorage.getItem('authToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
