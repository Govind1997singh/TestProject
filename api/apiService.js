import axios from 'axios';

const API_BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const fetchEvents = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events-listing`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
