// src/API/photo.ts
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${API_BASE_URL}/api/delete-photo/`;

export const deletePhoto = async (photoId: number, token: string) => {
    try {
        const response = await axios.delete(`${API_URL}${photoId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || '刪除照片失敗');
    }
};
