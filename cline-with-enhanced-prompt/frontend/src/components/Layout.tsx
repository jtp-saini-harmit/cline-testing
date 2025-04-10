import React from 'react';
import Link from 'next/link';
import { AppProvider, useAppContext } from '../lib/AppContext';
import Auth from './Auth';
import Cart from './Cart';
import Wishlist from './Wishlist';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="container">
      <header>
        <Link href="/">
          <h1>Our Ecommerce Store</h1>
        </Link>
        <nav>
          <Link href="/">Home</Link>
          {isLoggedIn && <Link href="/orders">Orders</Link>}
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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AppProvider>
      <LayoutContent>{children}</LayoutContent>
    </AppProvider>
  );
};

export default Layout;
