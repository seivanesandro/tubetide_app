import axios from 'axios';
const API_URL = process.env.REACT_APP_TUBETIDE_API_URL;
const API_KEY = process.env.REACT_APP_TUBETIDE_API_KEY;

export default axios.create({
  baseURL: API_URL,
  params: { key: API_KEY },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});