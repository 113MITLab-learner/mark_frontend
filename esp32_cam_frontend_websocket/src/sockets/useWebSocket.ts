// src/hooks/useWebSocket.ts
import { useEffect, useState } from 'react';

interface WebSocketData {
  image: string; // Base64 encoded image string
}

export const useWebSocket = (url: string) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket 連線已開啟');
    };

    ws.onmessage = (event) => {
      const data: WebSocketData = JSON.parse(event.data);
      setImageSrc(`data:image/jpeg;base64,${data.image}`);
    };

    ws.onclose = () => {
      console.log('WebSocket 連線已關閉');
    };

    ws.onerror = (error) => {
      console.error('WebSocket 錯誤:', error);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return imageSrc;
};
