// src/API/register.ts

import axios from 'axios';

export const register = async (username: string, password: string, email: string): Promise<void> => {
  try {
    const response = await axios.post('http://172.20.10.5:20000/api/register/', {
      username,
      password,
      email,
    });
    console.log(response.data.message);
  } catch (error) {
    throw new Error('註冊失敗，請檢查輸入信息');
  }
};