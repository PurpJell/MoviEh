import React from 'react';
import {Form, Input, Button, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {IAuth} from '../../types';
import PathConstants from '../../routes/PathConstants';

interface AuthFormProps {
  type: 'login' | 'register';
  onFinish: (values: IAuth) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({type, onFinish}) => {
  const handleFinish = (values: IAuth) => {
    onFinish({username: values.username, password: values.password});
  };

  return (
    <Form onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="username"
        label="Username"
        rules={[{required: true, message: 'Please enter your username!'}]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{required: true, message: 'Please enter your password!'}]}>
        <Input.Password />
      </Form.Item>
      {type === 'register' && (
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {required: true, message: 'Please confirm your password!'},
            ({getFieldValue}) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {type === 'login' ? 'Log in' : 'Register'}
        </Button>
      </Form.Item>
      <Typography.Text style={{display: 'block', textAlign: 'center'}}>
        {type === 'login' ? 'No account? ' : 'Already have an account? '}
        <Link
          to={type === 'login' ? PathConstants.REGISTER : PathConstants.LOGIN}>
          {type === 'login' ? 'Register' : 'Log in'}
        </Link>
      </Typography.Text>
    </Form>
  );
};

export default AuthForm;
