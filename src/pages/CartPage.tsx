import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Spin, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const { Title, Text } = Typography;

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice, fetchCart } =
    useCart();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (isAuthenticated && user) {
      fetchCart(user.id).finally(() => setLoading(false));
    }
  }, [user, isAuthenticated]);

  if (loading) {
    return (
      <div className='flex items-center justify-center mt-20'>
        <Spin size='large' />
      </div>
    );
  }

  const handleRemove = async(id: number) => {
   await removeFromCart(id);
    alert('Product removed from cart successfully!');
  };

  return (
    <div className='p-5'>
      <Title level={2}>Your Cart</Title>
      {cart.carts.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (

          <div className='flex flex-row flex-wrap'>
            {cart.carts.map((item) =>
              item.products.map((product) => (
                <Card
                  className='flex justify-around flex-col m-4 w-40'
                  hoverable
                  cover={
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                    />
                  }
                  actions={[
                    <Button
                      type='link'
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <Title level={4}>{product.title}</Title>
                  <Text>Price: ₹{product.price}</Text>
                  <br />
                  <Text>Quantity: {product.quantity}</Text>
                </Card>
              )),
            )}
          </div>

      )}
    </div>
  );
};

export default CartPage;
