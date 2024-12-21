// src/components/Controls.tsx
import React from 'react';
import './Controls.css';

interface ControlsProps {
  frequency: number;
  setFrequencyInput: (value: number) => void;
  handleFrequencyChange: () => void;
  handleToggleImageDisplay: () => void;
  isImageDisplayOn: boolean;
  handleToggleDetection: () => void;
  isDetectionOn: boolean;
  handleTakePhoto: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  frequency,
  setFrequencyInput,
  handleFrequencyChange,
  handleToggleImageDisplay,
  isImageDisplayOn,
  handleToggleDetection,
  isDetectionOn,
  handleTakePhoto
}) => {
  return (
    <div className="controls">
      <div className="toggle-buttons">
        <button
          onClick={handleToggleImageDisplay}
          className={isImageDisplayOn ? 'btn-green' : 'btn-red'}
        >
          {isImageDisplayOn ? '關閉影像顯示' : '開啟影像顯示'}
        </button>

        <button
          onClick={handleToggleDetection}
          className={isDetectionOn ? 'btn-green' : 'btn-red'}
        >
          {isDetectionOn ? '關閉 Mediapipe 偵測' : '開啟 Mediapipe 偵測'}
        </button>
      </div>
      
      <div className="frequency-photo">
        <div className="frequency-control">
          <label htmlFor="frequency">調整頻率 (秒): </label>
          <input
            type="number"
            id="frequency"
            min="0.1"
            step="0.1"
            value={frequency}
            onChange={(e) => setFrequencyInput(parseFloat(e.target.value))}
          />
          <button onClick={handleFrequencyChange}>設置頻率</button>
        </div>
        <button onClick={handleTakePhoto} disabled={!isImageDisplayOn} className="btn-photo">
          拍照
        </button>
      </div>
    </div>
  );
};

export default Controls;
