// src/API/imageDisplay.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const toggleImageDisplay = async (action: 'on' | 'off', token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/toggle_image_display/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to toggle image display');
    }
  
    return response.json();
  };
  