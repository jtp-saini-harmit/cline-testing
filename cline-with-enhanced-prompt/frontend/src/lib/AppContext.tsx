import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getUserInfo, fetchCart as apiFetchCart, fetchWishlist as apiFetchWishlist } from './api';

interface User {
  id: string;
  username: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface AppContextType {
  isLoggedIn: boolean;
  user: User | null;
  cart: CartItem[];
  wishlist: WishlistItem[];
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      getUserInfo(storedUserId)
        .then((userData) => {
          setUser(userData);
          setIsLoggedIn(true);
          return Promise.all([apiFetchCart(storedUserId), apiFetchWishlist(storedUserId)]);
        })
        .then(([cartData, wishlistData]) => {
          setCart(cartData.items);
          setWishlist(wishlistData);
        })
        .catch((error) => {
          console.error('Error fetching user info, cart, or wishlist:', error);
          localStorage.removeItem('userId');
        });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await apiLogin(username, password);
      setUser({ id: data.userId, username: data.username });
      setIsLoggedIn(true);
      localStorage.setItem('userId', data.userId);
      const [cartData, wishlistData] = await Promise.all([
        apiFetchCart(data.userId),
        apiFetchWishlist(data.userId)
      ]);
      setCart(cartData.items);
      setWishlist(wishlistData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const data = await apiRegister(username, password);
      setUser({ id: data.userId, username: data.username });
      setIsLoggedIn(true);
      localStorage.setItem('userId', data.userId);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      setIsLoggedIn(false);
      setCart([]);
      setWishlist([]);
      localStorage.removeItem('userId');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.productId === item.productId);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const addToWishlist = async (item: WishlistItem) => {
    if (user) {
      try {
        const updatedWishlist = await apiFetchWishlist(user.id);
        setWishlist(updatedWishlist);
      } catch (error) {
        console.error('Error adding item to wishlist:', error);
      }
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (user) {
      try {
        const updatedWishlist = await apiFetchWishlist(user.id);
        setWishlist(updatedWishlist);
      } catch (error) {
        console.error('Error removing item from wishlist:', error);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        user,
        cart,
        wishlist,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
