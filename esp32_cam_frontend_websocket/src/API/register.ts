// src/API/register.ts

import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (username: string, password: string, email: string): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register/`, {
      username,
      password,
      email,
    });
    console.log(response.data.message);
  } catch (error) {
    throw new Error('註冊失敗，請檢查輸入信息');
  }
};