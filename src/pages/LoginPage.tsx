import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className='flex justify-center items-center nav-bar-height'>
      <div className='p-6 rounded-lg max-w-[400px] border w-full drop-shadow-md'>
        <h2 className='text-center mb-6'>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
