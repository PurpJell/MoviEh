import React from 'react';
import {Avatar, Dropdown} from 'antd';
import {useAuth} from '../../AuthContext';
import api from '../../api/api';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';

const UserMenu: React.FC = () => {
  const {setIsAuthenticated} = useAuth();

  const handleLogout = async () => {
    try {
      await api.get('logout/');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to logout:');
      console.error(error);
    }
  };

  const menuItems = [
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
