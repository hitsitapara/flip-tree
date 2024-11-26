import React, { useState } from 'react';
import { Card, Button, InputNumber } from 'antd';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  images,
  category,
}) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (user) {
      await addToCart([{ id, quantity }], user.id);
      alert('Product added to cart successfully!');
      navigate('/cart');
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <Card
      hoverable
      className='max-w-sm mx-auto p-4'
      cover={
        <img
          alt={title}
          src={images[0]}
          className='h-60 object-contain'
        />
      }
    >
      <Card.Meta
        title={title}
        description={
          <div>
            <p>Category: {category}</p>
            <p className='font-semibold'>Price: ${price.toFixed(2)}</p>
          </div>
        }
      />
      <div className='mt-2 flex items-center'>
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => setQuantity(value || 1)}
          className='w-1.2 mr-2'
        />
        <Button
          type='primary'
          onClick={handleAddToCart}
          className='w-1/2'
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
