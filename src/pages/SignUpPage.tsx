import React from 'react';
import SignUpForm from '../components/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div className='flex justify-center items-center nav-bar-height'>
      <div className='p-6 rounded-lg max-w-[400px] border w-full drop-shadow-md'>
        <h2 className='text-center mb-6'>Register</h2>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
