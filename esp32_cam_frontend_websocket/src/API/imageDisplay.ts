// src/API/imageDisplay.ts

export const toggleImageDisplay = async (action: 'on' | 'off', token: string) => {
    const response = await fetch('http://localhost:8000/api/toggle_image_display/', {
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
  