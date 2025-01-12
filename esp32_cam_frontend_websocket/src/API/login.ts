// src/API/login.ts

import axios from 'axios';

interface LoginResponse {
  refresh: string;
  access: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('http://172.20.10.5:20000/api/login/', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('登入失敗，請檢查您的帳號和密碼是否正確');
  }
};
