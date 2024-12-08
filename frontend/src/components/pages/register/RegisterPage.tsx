import React from 'react';
import {Card, message, Typography} from 'antd';
import AuthForm from './../../common/AuthForm';
import {IAuth} from '../../../types';
import api from '../../../api/api';
import {useNavigate} from 'react-router-dom';
import PathConstants from '../../../routes/PathConstants';

const {Title} = Typography;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const handleRegister = async (authData: IAuth) => {
    try {
      await api.post('register/', {user: authData});
      message.success('Successfully registered!');
      navigate(PathConstants.LOGIN);
    } catch (error) {
      message.error('Failed to register: try different username');
      console.error('Failed to register:', error);
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
      <Card title={<Title level={2}>Register</Title>} style={{width: 300}}>
        <AuthForm type="register" onFinish={handleRegister} />
      </Card>
    </div>
  );
};

export default RegisterPage;
