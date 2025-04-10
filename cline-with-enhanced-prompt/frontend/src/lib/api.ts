import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchCart = async (userId: string) => {
  const response = await api.get(`/cart/${userId}`);
  return response.data;
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  const response = await api.post(`/cart/${userId}/add`, { productId, quantity });
  return response.data;
};

export const updateCartItem = async (userId: string, productId: string, quantity: number) => {
  const response = await api.put(`/cart/${userId}/update/${productId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (userId: string, productId: string) => {
  const response = await api.delete(`/cart/${userId}/remove/${productId}`);
  return response.data;
};

export const fetchWishlist = async (userId: string) => {
  const response = await api.get(`/wishlist/${userId}`);
  return response.data;
};

export const addToWishlist = async (userId: string, product: { id: string; name: string; price: number; description: string }) => {
  const response = await api.post(`/wishlist/${userId}/add`, product);
  return response.data;
};

export const removeFromWishlist = async (userId: string, productId: string) => {
  const response = await api.delete(`/wishlist/${userId}/remove/${productId}`);
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getUserInfo = async (userId: string) => {
  const response = await api.get(`/auth/user/${userId}`);
  return response.data;
};

export const placeOrder = async (userId: string, items: any[], address: string, total: number) => {
  const response = await api.post('/orders', { userId, items, address, total });
  return response.data;
};

export const getUserOrders = async (userId: string) => {
  const response = await api.get(`/orders/${userId}`);
  return response.data;
};

export const resetLocalStorage = async () => {
  const response = await api.post('/reset');
  return response.data;
};

export default api;
