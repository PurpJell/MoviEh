import React from 'react';
import {Card, message, Typography} from 'antd';
import AuthForm from './../../common/AuthForm';
import {IAuth} from '../../../types';
import api from '../../../api/api';
import PathConstants from '../../../routes/PathConstants';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../../AuthContext';

const {Title} = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useAuth();

  const handleLogin = async (authData: IAuth) => {
    try {
      await api.post('login/', authData);
      message.success('Successfully registered!');
      setIsAuthenticated(true);
      navigate(PathConstants.HOME);
    } catch (error) {
      message.error('Failed to login: check your credentials');
      console.error('Failed to login:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <Card title={<Title level={2}>Log in</Title>} style={{width: 300}}>
        <AuthForm type="login" onFinish={handleLogin} />
      </Card>
    </div>
  );
};

export default LoginPage;
