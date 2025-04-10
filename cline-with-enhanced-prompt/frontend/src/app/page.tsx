'use client';

import React from 'react';
import './globals.css';
import Layout from '../components/Layout';
import ProductList from '../components/ProductList';
import ImageSlider from '../components/ImageSlider';

const dummyImages = [
  { src: 'https://source.unsplash.com/random/800x400?electronics', alt: 'Electronics' },
  { src: 'https://source.unsplash.com/random/800x400?smartphone', alt: 'Smartphone' },
  { src: 'https://source.unsplash.com/random/800x400?laptop', alt: 'Laptop' },
  { src: 'https://source.unsplash.com/random/800x400?headphones', alt: 'Headphones' },
  { src: 'https://source.unsplash.com/random/800x400?smartwatch', alt: 'Smartwatch' },
];

export default function Home() {
  return (
    <Layout>
      <div>
        <section className="hero">
          <ImageSlider images={dummyImages} />
        </section>
        <section className="products">
          <h2>Our Products</h2>
          <ProductList />
        </section>
      </div>
    </Layout>
  );
}
