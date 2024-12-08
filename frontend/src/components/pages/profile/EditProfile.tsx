import React, { useState, useEffect } from 'react';
import { IProfile } from '../../../types';
import api from '../../../api/api';
import { message, Button, Input, Typography, Space, Card, Row, Modal } from 'antd';
import { EditOutlined, LockOutlined, CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import PasswordModal from './PasswordModal';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../../../routes/PathConstants';
import { useAuth } from '../../../AuthContext';

const { Text } = Typography;

interface ProfilePageProps {
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
}

const EditProfile: React.FC<ProfilePageProps> = ({ profile, setProfile }) => {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useAuth();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState(profile?.username || '');
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    if (profile?.username) {
      setUsername(profile.username);
    }
  }, [profile]);

  const handleUsernameEdit = () => setIsEditingUsername(true);
  const handleUsernameCancel = () => {
    setIsEditingUsername(false);
    setUsername(profile?.username || '');
  };

  const handleUsernameChange = async () => {
    if (!username.trim()) {
      message.error('Username cannot be empty.');
      return;
    }
    try {
      await api.put('profile/', {user: {username}});
      message.success('Username updated successfully');
      setProfile((prevProfile) => ({ ...prevProfile, username } as IProfile));
      setIsEditingUsername(false);
    } catch (error) {
      message.error('Username is already taken');
      console.error('Failed to update username:', error);
    }
  };

  const openPasswordModal = () => setIsPasswordModalVisible(true);

  const handleDeleteAccount = async () => {
    try {
      await api.delete('profile/');
      message.success('Account deleted successfully');
      setProfile(null);
      navigate(PathConstants.HOME);
      setIsDeleteModalVisible(false);
      setIsAuthenticated(false);
    } catch (error) {
      message.error('Failed to delete account');
      console.error('Failed to delete account:', error);
    }
  };

  const showDeleteModal = () => setIsDeleteModalVisible(true);
  const closeDeleteModal = () => setIsDeleteModalVisible(false);

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Card
          style={{
            border: '1px solid #f0f0f0',
            borderRadius: '12px',
          }}
          hoverable
        >
          <Row justify="space-between" align="middle">
            <Text strong>Username:</Text>
            {isEditingUsername ? (
              <Space>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: '200px' }}
                  placeholder="Enter new username"
                  autoFocus
                />
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleUsernameChange}
                />
                <Button
                  icon={<CloseOutlined />}
                  onClick={handleUsernameCancel}
                />
              </Space>
            ) : (
              <Space>
                <Text>{username || 'Loading...'}</Text>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={handleUsernameEdit}
                >
                  Edit
                </Button>
              </Space>
            )}
          </Row>
        </Card>

        <Card
          style={{
            border: '1px solid #f0f0f0',
            borderRadius: '12px',
          }}
          hoverable
        >
          <Row justify="space-between" align="middle">
            <Text strong>Password:</Text>
            <Button
              type="primary"
              icon={<LockOutlined />}
              size="large"
              onClick={openPasswordModal}
            >
              Change Password
            </Button>
          </Row>
        </Card>

        <Card
          style={{
            border: '1px solid #f0f0f0',
            borderRadius: '12px',
            backgroundColor: '#fff1f0',
          }}
          hoverable
        >
          <Row justify="space-between" align="middle">
            <Text strong style={{ color: '#cf1322' }}>
              Danger Zone
            </Text>
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              size="large"
              onClick={showDeleteModal}
            >
              Delete Account
            </Button>
          </Row>
        </Card>
      </Space>

      <PasswordModal
        isVisible={isPasswordModalVisible}
        closeModal={() => setIsPasswordModalVisible(false)}
      />

      <Modal
        title="Confirm Account Deletion"
        open={isDeleteModalVisible}
        onOk={handleDeleteAccount}
        onCancel={closeDeleteModal}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <Text>
          Are you sure you want to delete your account? This action cannot be undone.
        </Text>
      </Modal>
    </div>
  );
};

export default EditProfile;
