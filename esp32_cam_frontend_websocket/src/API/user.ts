// src/API/user.ts

import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${API_BASE_URL}/api/user-profile/`;

export const getUserProfile = async (token: string) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (data: any, token: string) => {
    try {
        const response = await axios.put(API_URL, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
