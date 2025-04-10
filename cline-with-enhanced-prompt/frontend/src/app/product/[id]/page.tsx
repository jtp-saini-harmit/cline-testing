'use client';

import React from 'react';
import Layout from '../../../components/Layout';
import ProductDetails from '../../../components/ProductDetails';

const ProductPage: React.FC = () => {
  return (
    <Layout>
      <div>
        <h1>Product Details</h1>
        <ProductDetails />
      </div>
    </Layout>
  );
};

export default ProductPage;
