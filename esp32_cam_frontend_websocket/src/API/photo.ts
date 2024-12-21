// src/API/photo.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/delete-photo/';  // 根據實際 API 路徑調整

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
