import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Users, TrendingUp, Clock, ArrowUpRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PortalLayout from '@/components/layout/PortalLayout';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Dashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [statsRes, ordersRes] = await Promise.all([
          axios.get(`${API}/dashboard/stats`, { headers }),
          axios.get(`${API}/orders`, { headers })
        ]);
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const statCards = [
    { title: 'Total Orders', value: stats?.total_orders || 0, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Total Suppliers', value: stats?.total_suppliers || 0, icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Total Value', value: `$${(stats?.total_value || 0).toLocaleString()}`, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Pending Orders', value: stats?.pending_orders || 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'badge-pending',
      processing: 'badge-processing',
      shipped: 'badge-shipped',
      completed: 'badge-completed',
      cancelled: 'badge-cancelled'
    };
    return styles[status] || 'badge-pending';
  };

  return (
    <PortalLayout>
      <div className="space-y-8" data-testid="portal-dashboard">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">Welcome back, {user?.contact_person}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/portal/orders">
              <Button className="bg-blue-600 hover:bg-blue-700" data-testid="new-order-btn">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <Card key={index} className="dashboard-card" data-testid={`stat-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                        <p className="dashboard-stat">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Orders */}
            <Card className="dashboard-card" data-testid="recent-orders-card">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
                <Link to="/portal/orders" className="text-blue-600 text-sm hover:underline flex items-center">
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No orders yet</p>
                    <Link to="/portal/orders">
                      <Button variant="outline" size="sm" className="mt-4">
                        Create Your First Order
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Order ID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Product</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Quantity</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Total</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order, index) => (
                          <tr key={order.id} className="border-b last:border-0 table-row-hover" data-testid={`order-row-${index}`}>
                            <td className="py-3 px-4">
                              <span className="mono text-sm">{order.id.slice(0, 8)}...</span>
                            </td>
                            <td className="py-3 px-4 font-medium text-slate-900">{order.product_name}</td>
                            <td className="py-3 px-4 text-slate-600">{order.quantity}</td>
                            <td className="py-3 px-4 font-medium">${order.total_price.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span className={`status-badge ${getStatusBadge(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="dashboard-card card-hover cursor-pointer" data-testid="quick-action-orders">
                <Link to="/portal/orders">
                  <CardContent className="p-6">
                    <Package className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-slate-900 mb-2">Manage Orders</h3>
                    <p className="text-sm text-slate-600">View and track all your orders</p>
                  </CardContent>
                </Link>
              </Card>
              <Card className="dashboard-card card-hover cursor-pointer" data-testid="quick-action-suppliers">
                <Link to="/portal/suppliers">
                  <CardContent className="p-6">
                    <Users className="w-10 h-10 text-green-600 mb-4" />
                    <h3 className="font-semibold text-slate-900 mb-2">Manage Suppliers</h3>
                    <p className="text-sm text-slate-600">View and manage your suppliers</p>
                  </CardContent>
                </Link>
              </Card>
              <Card className="dashboard-card card-hover cursor-pointer" data-testid="quick-action-quote">
                <Link to="/quote">
                  <CardContent className="p-6">
                    <TrendingUp className="w-10 h-10 text-purple-600 mb-4" />
                    <h3 className="font-semibold text-slate-900 mb-2">Request Quote</h3>
                    <p className="text-sm text-slate-600">Get a quote for new products</p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </>
        )}
      </div>
    </PortalLayout>
  );
};

export default Dashboard;
