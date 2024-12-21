// src/components/LoginForm.tsx
import React from 'react';
import './LoginForm.css';

interface LoginFormProps {
  isRegistering: boolean;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  handleLogin: () => void;
  handleRegister: () => void;
  toggleRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  isRegistering,
  username,
  setUsername,
  password,
  setPassword,
  email,
  setEmail,
  handleLogin,
  handleRegister,
  toggleRegister
}) => {
  return (
    <div className="login-form">
      <form>
        <label>
          用戶名:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="輸入用戶名"
          />
        </label>
        <label>
          密碼:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="輸入密碼"
          />
        </label>
        {isRegistering && (
          <label>
            電子郵件:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="輸入電子郵件"
            />
          </label>
        )}
        {isRegistering ? (
          <button type="button" onClick={handleRegister}>
            註冊
          </button>
        ) : (
          <button type="button" onClick={handleLogin}>
            登入
          </button>
        )}
        <button type="button" onClick={toggleRegister} className="toggle-btn">
          {isRegistering ? '已有帳號? 登入' : '還沒有帳號? 註冊'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
