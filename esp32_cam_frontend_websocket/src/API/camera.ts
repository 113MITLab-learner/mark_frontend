// src/API/camera.ts

import axios from 'axios';

const API_URL = 'http://172.20.10.5:20000/api/take-photo/';  

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
