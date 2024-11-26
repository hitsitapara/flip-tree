import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Use the context for login

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      await login(values.username, values.password);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert
          message={error}
          type='error'
          className='mb-4'
        />
      )}
      <Form
        name='login'
        layout='vertical'
        onFinish={handleSubmit}
        className='max-w-md mx-auto'
      >
        <Form.Item
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input
            type='text'
            placeholder='Enter your username'
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder='Enter your password' />
        </Form.Item>
        <div className='flex flex-row space-x-5'>
          <Button
            type='primary'
            htmlType='submit'
            block
            loading={loading}
          >
            Login
          </Button>
          <Button
            type='default'
            block
            onClick={() => {
              navigate('/sign-up');
            }}
          >
            Register
          </Button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
