import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProducts, addToCart, addToWishlist } from '../lib/api';
import { useAppContext } from '../lib/AppContext';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { isLoggedIn, user, cart, setCart, wishlist, setWishlist } = useAppContext();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    if (!isLoggedIn || !user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    try {
      await addToCart(user.id, product.id, 1);
      setCart([...cart, { ...product, quantity: 1 }]);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const handleAddToWishlist = async (product: Product) => {
    if (!isLoggedIn || !user) {
      alert('Please log in to add items to your wishlist.');
      return;
    }
    try {
      await addToWishlist(user.id, product.id);
      setWishlist([...wishlist, product]);
      alert('Product added to wishlist successfully!');
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      alert('Failed to add product to wishlist. Please try again.');
    }
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <Link href={`/product/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>
          {isLoggedIn && (
            <div className="product-actions">
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <button onClick={() => handleAddToWishlist(product)}>Add to Wishlist</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
