// src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { useWebSocket } from './sockets/useWebSocket';
import { useCanvas } from './sockets/useCanvas';
import { setFrequency } from './API/frequency';
import { login } from './API/login';
import { register } from './API/register';
import { toggleImageDisplay } from './API/imageDisplay';
import { toggleDetection } from './API/detection';
import { takePhoto } from './API/camera';
import { getUserProfile } from './API/user';
import PhotoGallery from './PhotoGallery';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Controls from './components/Controls';
import UserProfile from './components/UserProfile';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [frequency, setFrequencyInput] = useState<number>(0.3);
  const [token, setToken] = useState<string | null>(null);
  const [isImageDisplayOn, setIsImageDisplayOn] = useState<boolean>(true);
  const [isDetectionOn, setIsDetectionOn] = useState<boolean>(true);
  const [profile, setProfile] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const imageSrc = useWebSocket('ws://localhost:8000/ws/handrecognition/');
  const canvasRef = useCanvas(isLoggedIn && isImageDisplayOn ? imageSrc : null);

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      localStorage.setItem('access_token', response.access);
      setToken(response.access);
      setIsLoggedIn(true);
      console.log('登入成功');
    } catch (error) {
      console.error('登入失敗:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await register(username, password, email);
      console.log('註冊成功，請登入');
      setIsRegistering(false);
    } catch (error) {
      console.error('註冊失敗:', error);
    }
  };

  const handleFrequencyChange = async () => {
    if (frequency > 0) {
      try {
        await setFrequency(frequency, token!);
        console.log(`偵測頻率已設為 ${frequency} 秒`);
      } catch (error) {
        console.error('設置頻率時發生錯誤:', error);
      }
    } else {
      console.error('頻率值必須為正數');
    }
  };

  const handleToggleImageDisplay = async () => {
    const action = isImageDisplayOn ? 'off' : 'on';
    try {
      const response = await toggleImageDisplay(action, token!);
      setIsImageDisplayOn(response.is_display_on);
      console.log(`影像顯示已 ${response.is_display_on ? '開啟' : '關閉'}`);
    } catch (error) {
      console.error('控制影像顯示時發生錯誤:', error);
    }
  };

  const handleToggleDetection = async () => {
    const action = isDetectionOn ? 'off' : 'on';
    try {
      const response = await toggleDetection(action, token!);
      setIsDetectionOn(response.is_detection_on);
      console.log(`Mediapipe 偵測已 ${response.is_detection_on ? '開啟' : '關閉'}`);
    } catch (error) {
      console.error('控制 Mediapipe 偵測時發生錯誤:', error);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const canvas = document.getElementById('outputCanvas') as HTMLCanvasElement;
      if (!canvas) {
        console.error('找不到 outputCanvas 元素');
        return;
      }
      const imageBase64 = canvas.toDataURL('image/jpeg');
      const response = await takePhoto(imageBase64, token!);
      console.log(response.message);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('拍照失敗:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const data = await getUserProfile(token!);
      setProfile(data);
    } catch (error) {
      console.error('獲取用戶資料失敗:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchUserProfile();
    }
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return (
      <div className="App">
        <Header title={isRegistering ? '註冊新帳號' : '請先登入'} />
        <LoginForm
          isRegistering={isRegistering}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          toggleRegister={() => setIsRegistering(!isRegistering)}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Header title="✨ ESP32-CAM 即時影像與手部辨識 ✨" />
      
      {/* 顯示用戶資料 */}
      {profile && <UserProfile profile={profile} />}
      
      <Controls
        frequency={frequency}
        setFrequencyInput={setFrequencyInput}
        handleFrequencyChange={handleFrequencyChange}
        handleToggleImageDisplay={handleToggleImageDisplay}
        isImageDisplayOn={isImageDisplayOn}
        handleToggleDetection={handleToggleDetection}
        isDetectionOn={isDetectionOn}
        handleTakePhoto={handleTakePhoto}
      />
      
      {/* 顯示畫布 */}
      {isImageDisplayOn && <canvas ref={canvasRef} id="outputCanvas" className="output-canvas"></canvas>}
      
      {/* 使用 PhotoGallery 來顯示照片 */}
      <PhotoGallery token={token!} refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default App;
