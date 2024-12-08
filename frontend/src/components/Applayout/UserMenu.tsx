import React from 'react';
import {Avatar, Dropdown} from 'antd';
import {useAuth} from '../../AuthContext';
import api from '../../api/api';
import {LogoutOutlined, ProfileOutlined, UserOutlined} from '@ant-design/icons';
import PathConstants from '../../routes/PathConstants';
import {useNavigate} from 'react-router-dom';

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useAuth();

  const handleLogout = async () => {
    try {
      await api.get('logout/');
      setIsAuthenticated(false);
      navigate(PathConstants.HOME);
    } catch (error) {
      console.error('Failed to logout:');
      console.error(error);
    }
  };

  const menuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <ProfileOutlined />,
      onClick: () => {
        navigate(PathConstants.PROFILE);
      },
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      style: {color: 'red'},
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown
      menu={{items: menuItems}}
      trigger={['hover']}
      overlayStyle={{minWidth: '10vw'}}>
      <div
        style={{
          cursor: 'pointer',
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}>
        <Avatar
          style={{
            backgroundColor: '#1677ff',
          }}
          icon={<UserOutlined />}
          size="large"
        />
      </div>
    </Dropdown>
  );
};

export default UserMenu;
