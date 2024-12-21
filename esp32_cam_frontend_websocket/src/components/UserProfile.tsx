// src/components/UserProfile.tsx
import React from 'react';
import './UserProfile.css';

interface UserProfileProps {
  profile: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <div className="user-profile">
      <h2>用戶資料</h2>
      <p><strong>用戶名:</strong> {profile.username}</p>
      <p><strong>電子郵件:</strong> {profile.email}</p>
      {/* 如有其他用戶資料，可在此添加 */}
    </div>
  );
};

export default UserProfile;
