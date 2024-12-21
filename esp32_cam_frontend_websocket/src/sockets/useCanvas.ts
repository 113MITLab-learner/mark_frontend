// src/hooks/useCanvas.ts
import { useEffect, useRef } from 'react';

export const useCanvas = (imageSrc: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && imageSrc) {
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
      };
    }
  }, [imageSrc]);

  return canvasRef;
};
