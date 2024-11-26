import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProductListingPage from './pages/ProductListPage';
import SignUpPage from './pages/SignUpPage';
function App() {
  const { getCurrentLoginUser, isAuthenticated } = useAuth();
  useEffect(() => {
    getCurrentLoginUser();
  }, [isAuthenticated]);
  return (
    <div className='h-screen'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<ProductListingPage />}
        />
        <Route
          path='/sign-up'
          element={<SignUpPage />}
        />
        <Route
          path='/sign-in'
          element={<LoginPage />}
        />
        <Route
          path='/cart'
          element={<CartPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
