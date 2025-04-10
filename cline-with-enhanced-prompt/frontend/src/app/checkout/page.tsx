'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { useAppContext } from '../../lib/AppContext';
import { placeOrder } from '../../lib/api';

const CheckoutPage: React.FC = () => {
  const { cart, user, removeFromCart } = useAppContext();
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to complete your purchase.');
      return;
    }

    setIsProcessing(true);
    try {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await placeOrder(user.id, cart, address, total);
      alert('Order placed successfully! Redirecting to your orders...');
      // Clear the cart
      cart.forEach(item => removeFromCart(item.productId));
      router.push('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <h1>Checkout</h1>
      <form onSubmit={handleCheckout}>
        <h2>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.productId}>
            <p>{item.name} - Quantity: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <h3>Total: ${total.toFixed(2)}</h3>
        <h2>Shipping Information</h2>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </Layout>
  );
};

export default CheckoutPage;
