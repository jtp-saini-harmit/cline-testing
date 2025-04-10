import React from 'react';
import { updateCartItem, removeFromCart as apiRemoveFromCart } from '../lib/api';
import { useAppContext } from '../lib/AppContext';
import Link from 'next/link';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { isLoggedIn, user, cart, updateCartItemQuantity, removeFromCart } = useAppContext();

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (!user) return;
    try {
      await updateCartItem(user.id, productId, newQuantity);
      updateCartItemQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!user) return;
    try {
      await apiRemoveFromCart(user.id, productId);
      removeFromCart(productId);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item: CartItem) => (
            <div key={item.productId}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
              <button onClick={() => handleUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))}>-</button>
              <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          {isLoggedIn ? (
            <Link href="/checkout">
              <button>Proceed to Checkout</button>
            </Link>
          ) : (
            <p>Please log in to checkout.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
