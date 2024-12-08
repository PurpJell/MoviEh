import React, { useEffect, useState } from 'react';
import { IProfile } from '../../../types';
import api from '../../../api/api';
import { message, Typography, Space } from 'antd';
import Preferences from './Preferences';
import EditProfile from './EditProfile';

const { Title } = Typography;

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get<IProfile>('profile/');
        setProfile(response.data);
      } catch (error) {
        message.error('Failed to fetch profile');
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div
      style={{
        padding: '2%',
      }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Edit Profile
      </Title>
      <EditProfile profile={profile} setProfile={setProfile} />

      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={4}>Preferences</Title>
      </Space>
      <Preferences preferences={profile?.preferences || {}} />
    </div>
  );
};

export default ProfilePage;
