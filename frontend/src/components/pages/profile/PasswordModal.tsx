import React from 'react';
import {Button, Input, message, Modal, Space, Form} from 'antd';
import api from '../../../api/api';

interface PasswordModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isVisible, closeModal }) => {
  const changePassword = async (values: {password: string, confirm: string}) => {
    const { password } = values;
    try {
      await api.put('profile/', { user: { password } });
      message.success('Password updated successfully');
    } catch (error) {
      message.error('Failed to update password');
      console.error('Failed to update password:', error);
    }
  };

  return (
      <Modal
        title="Change Password"
        open={isVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form onFinish={changePassword}>
          <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true, message: 'Please enter your new password!' }]}
          >
            <Input.Password />
          </Form.Item>

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

          <Form.Item>
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <Button onClick={closeModal}>Cancel</Button>
                <Button type="primary" htmlType="submit">Change Password</Button>
              </Space>
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default PasswordModal;
