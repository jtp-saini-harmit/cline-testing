import React from 'react';
import { removeFromWishlist as apiRemoveFromWishlist, fetchWishlist as apiFetchWishlist } from '../lib/api';
import { useAppContext } from '../lib/AppContext';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

const Wishlist: React.FC = () => {
  const { isLoggedIn, user, wishlist, removeFromWishlist, setWishlist } = useAppContext();

  const handleRemoveItem = async (productId: string) => {
    if (!user) return;
    try {
      // Update state first for immediate feedback
      removeFromWishlist(productId);
      // Then sync with backend
      await apiRemoveFromWishlist(user.id, productId);
    } catch (error) {
      console.error('Error removing wishlist item:', error);
      alert('Failed to remove item from wishlist');
      // Refresh wishlist state to restore the item
      const updatedWishlist = await apiFetchWishlist(user.id);
      setWishlist(updatedWishlist || []);
    }
  };

  if (!isLoggedIn) {
    return <div>Please log in to view your wishlist.</div>;
  }

  const wishlistItems = Array.isArray(wishlist) ? wishlist : [];

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlistItems.map((item: WishlistItem) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>{item.description}</p>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
