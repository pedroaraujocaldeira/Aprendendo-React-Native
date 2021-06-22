import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://dev.api.clin.digital/v1',
});

api.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('@AirBnbApp:token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    alert(err);
  }
});

export default api;
