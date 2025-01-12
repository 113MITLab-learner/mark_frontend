// src/API/photo.ts
import axios from 'axios';

const API_URL = 'http://172.20.10.5:20000/api/delete-photo/';

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
