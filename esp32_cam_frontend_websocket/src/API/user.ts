// src/API/user.ts

import axios from 'axios';

const API_URL = 'http://172.20.10.5:20000/api/user-profile/';

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
