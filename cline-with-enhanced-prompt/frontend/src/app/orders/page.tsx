'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { useAppContext } from '../../lib/AppContext';
import { getUserOrders } from '../../lib/api';

interface Order {
  id: string;
  userId: string;
  items: any[];
  address: string;
  total: number;
  status: string;
  createdAt: string;
}

const OrdersPage: React.FC = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userOrders = await getUserOrders(user.id);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <h1>Orders</h1>
        <p>Please log in to view your orders.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-item">
            <h2>Order #{order.id}</h2>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>Shipping Address: {order.address}</p>
          </div>
        ))
      )}
    </Layout>
  );
};

export default OrdersPage;
