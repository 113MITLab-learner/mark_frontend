// src/API/camera.ts

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/take-photo/';  // 根據實際 API 路徑調整

export const takePhoto = async (imageBase64: string, token: string) => {
    try {
        const response = await axios.post(API_URL, 
            { image: imageBase64 },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
