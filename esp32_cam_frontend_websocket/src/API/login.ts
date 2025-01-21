// src/API/login.ts

import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginResponse {
  refresh: string;
  access: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/login/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('登入失敗，請檢查您的帳號和密碼是否正確');
  }
};
