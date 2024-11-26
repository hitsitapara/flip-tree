import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, Typography } from 'antd';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const { Title } = Typography;

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  images: string[];
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center mt-20'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div className='p-5'>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
            key={product.id}
          >
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductListingPage;
