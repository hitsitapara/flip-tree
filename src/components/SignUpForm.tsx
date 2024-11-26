import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpForm: React.FC = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (values: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await register(
        values.firstName,
        values.lastName,
        values.username,
        values.email,
        values.password,
      );
      setSuccess('Registration successful! You can now log in.');
    } catch (err) {
      setError('Registration failed. Please try again.');
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
      {success && (
        <Alert
          message={success}
          type='success'
          className='mb-4'
        />
      )}
      <Form
        name='register'
        layout='vertical'
        onFinish={handleSubmit}
        className='max-w-md mx-auto'
      >
        <Form.Item
          label='First Name'
          name='firstName'
          rules={[{ required: true, message: 'Please enter your first name!' }]}
        >
          <Input
            type='text'
            placeholder='Enter your first name'
          />
        </Form.Item>

        <Form.Item
          label='Last Name'
          name='lastName'
          rules={[{ required: true, message: 'Please enter your last name!' }]}
        >
          <Input
            type='text'
            placeholder='Enter your last name'
          />
        </Form.Item>

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
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input
            type='email'
            placeholder='Enter your email'
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
            Register
          </Button>
          <Button
            type='default'
            block
            onClick={() => {
              navigate('/sign-in');
            }}
          >
            Login
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
