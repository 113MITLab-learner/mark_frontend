// src/API/detection.ts

export const toggleDetection = async (action: 'on' | 'off', token: string) => {
    const response = await fetch('http://localhost:8000/api/toggle_detection/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to toggle detection');
    }
  
    return response.json();
  };
  