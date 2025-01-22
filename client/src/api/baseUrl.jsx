import axios from 'axios';
import { message } from 'antd';

const api = axios.create({

  baseURL: 'http://13.49.68.136:8080/api/v1',

  headers: {
    'Content-Type': 'application/json',
     Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default api;