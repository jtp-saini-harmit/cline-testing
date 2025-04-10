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
  const { isLoggedIn, user, addToCart: contextAddToCart, addToWishlist: contextAddToWishlist } = useAppContext();

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
      contextAddToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
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
    
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description
    };
    
    try {
      // First update frontend state for immediate feedback
      contextAddToWishlist(item);
      
      // Then update backend
      await addToWishlist(user.id, item);
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      alert('Failed to add product to wishlist');
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
