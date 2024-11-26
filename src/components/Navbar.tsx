import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Cookies from 'js-cookie';
const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, getCurrentLoginUser } =
    useAuth();
  const navigate = useNavigate();

  return (
    <nav className='bg-blue-600 text-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <button
            className='flex items-center'
            onClick={() => {
              navigate('/');
            }}
          >
            <span className='text-xl font-bold'>MyApp</span>
          </button>
          <div className='flex space-x-6 items-center'>
            <a
              href='/'
              className='text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium'
            >
              Home
            </a>
            {isAuthenticated && (
              <a
                href='/cart'
                className='text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium'
              >
                Cart
              </a>
            )}
          </div>
          <div className='flex items-center space-x-4'>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  Cookies.remove('accessToken');
                  Cookies.remove('refreshToken');
                  setIsAuthenticated(false);
                  getCurrentLoginUser();
                }}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/sign-in');
                  }}
                  className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
                >
                  Log In
                </button>
                <button
                  className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md'
                  onClick={() => {
                    navigate('/sign-up');
                  }}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
