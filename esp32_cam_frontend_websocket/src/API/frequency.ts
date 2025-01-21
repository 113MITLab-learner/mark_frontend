// src/API/frequency.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const setFrequency = async (frequency: number, token: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/set_frequency/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ frequency }),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('頻率設置成功:', data);
      } else {
        console.error('頻率設置失敗:', data.message);
      }
    } catch (error) {
      console.error('API 請求失敗:', error);
    }
  };