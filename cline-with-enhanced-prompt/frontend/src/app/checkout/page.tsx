'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { AppProvider, useAppContext } from '../../lib/AppContext';
import { placeOrder } from '../../lib/api';

const CheckoutPageContent: React.FC = () => {
  const { cart, user, updateCartItemQuantity } = useAppContext();
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
      alert('Order placed successfully!');
      // Clear the cart
      cart.forEach(item => updateCartItemQuantity(item.productId, 0));
      router.push('/');
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

const CheckoutPage: React.FC = () => (
  <AppProvider>
    <CheckoutPageContent />
  </AppProvider>
);

export default CheckoutPage;
