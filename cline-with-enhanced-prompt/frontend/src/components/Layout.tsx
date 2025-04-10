import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../lib/AppContext';
import { resetLocalStorage } from '../lib/api';
import Auth from './Auth';
import Cart from './Cart';
import Wishlist from './Wishlist';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn, logout, user } = useAppContext();
  const router = useRouter();

  const handleReset = async () => {
    try {
      await resetLocalStorage();
      if (isLoggedIn) {
        await logout();
      }
      router.refresh();
      alert('Data reset successfully.');
    } catch (error) {
      console.error('Error resetting data:', error);
      alert('Failed to reset data');
    }
  };

  return (
    <div className="container">
      <header>
        <Link href="/">
          <h1>Our Ecommerce Store</h1>
        </Link>
        <nav>
          <Link href="/">Home</Link>
          {isLoggedIn && <Link href="/orders">Orders</Link>}
          <button onClick={handleReset} style={{ marginLeft: '1rem' }}>
            Reset Data
          </button>
        </nav>
        <Auth />
      </header>
      <div className="main-content">
        <main>{children}</main>
        <aside>
          <section className="cart">
            <h2>Your Cart</h2>
            <Cart />
          </section>
          <section className="wishlist">
            <h2>Your Wishlist</h2>
            <Wishlist />
          </section>
        </aside>
      </div>
      <footer>
        <p>&copy; 2025 Our Ecommerce Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
