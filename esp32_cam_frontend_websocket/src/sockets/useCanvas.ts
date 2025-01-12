// src/sockets/useCanvas.ts
import { useEffect, useRef } from 'react';

export const useCanvas = (imageSrc: string | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return;
    }

    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };

      image.onerror = (error) => {
        console.error('圖片加載失敗:', error);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
    } else {
      // 如果 imageSrc 為 null，清空畫布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [imageSrc]);

  return canvasRef;
};
