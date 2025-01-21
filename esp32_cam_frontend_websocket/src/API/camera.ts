// src/API/camera.ts

import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${API_BASE_URL}/api/take-photo/`;  

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
