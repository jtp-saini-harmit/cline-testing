import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProduct, addToCart as apiAddToCart, addToWishlist as apiAddToWishlist } from '../lib/api';
import { useAppContext } from '../lib/AppContext';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

const ProductDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const { isLoggedIn, user, addToCart, addToWishlist } = useAppContext();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await fetchProduct(id);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isLoggedIn || !user || !product) {
      alert('Please log in to add items to your cart.');
      return;
    }
    try {
      await apiAddToCart(user.id, product.id, 1);
      const cartItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      };
      addToCart(cartItem);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const handleAddToWishlist = async () => {
    if (!isLoggedIn || !user || !product) {
      alert('Please log in to add items to your wishlist.');
      return;
    }
    try {
      await apiAddToWishlist(user.id, product.id);
      addToWishlist(product);
      alert('Product added to wishlist successfully!');
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      alert('Failed to add product to wishlist. Please try again.');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="description">{product.description}</p>
      <div className="product-actions">
        <button onClick={handleAddToCart}>Add to Cart</button>
        {isLoggedIn && (
          <button onClick={handleAddToWishlist}>Add to Wishlist</button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
