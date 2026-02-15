import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PortalLayout from '@/components/layout/PortalLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    product_name: '',
    quantity: '',
    unit_price: '',
    notes: ''
  });

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders`, { headers });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        quantity: parseInt(formData.quantity),
        unit_price: parseFloat(formData.unit_price)
      };

      if (editingOrder) {
        await axios.patch(`${API}/orders/${editingOrder.id}`, data, { headers });
        toast.success('Order updated successfully');
      } else {
        await axios.post(`${API}/orders`, data, { headers });
        toast.success('Order created successfully');
      }
      
      setDialogOpen(false);
      setEditingOrder(null);
      setFormData({ product_name: '', quantity: '', unit_price: '', notes: '' });
      fetchOrders();
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('Failed to save order');
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      product_name: order.product_name,
      quantity: order.quantity.toString(),
      unit_price: order.unit_price.toString(),
      notes: order.notes || ''
    });
    setDialogOpen(true);
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    
    try {
      await axios.delete(`${API}/orders/${orderId}`, { headers });
      toast.success('Order deleted successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`${API}/orders/${orderId}`, { status: newStatus }, { headers });
      toast.success('Status updated');
      fetchOrders();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

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

  const filteredOrders = orders.filter(order =>
    order.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalLayout>
      <div className="space-y-6" data-testid="portal-orders">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
            <p className="text-slate-600">Manage and track your orders</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingOrder(null);
              setFormData({ product_name: '', quantity: '', unit_price: '', notes: '' });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700" data-testid="create-order-btn">
                <Plus className="w-4 h-4 mr-2" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingOrder ? 'Edit Order' : 'Create New Order'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="order-form">
                <div>
                  <Label htmlFor="product_name">Product Name *</Label>
                  <Input
                    id="product_name"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    className="mt-1"
                    data-testid="order-product-input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="100"
                      required
                      min="1"
                      className="mt-1"
                      data-testid="order-quantity-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit_price">Unit Price ($) *</Label>
                    <Input
                      id="unit_price"
                      name="unit_price"
                      type="number"
                      step="0.01"
                      value={formData.unit_price}
                      onChange={handleChange}
                      placeholder="10.00"
                      required
                      min="0"
                      className="mt-1"
                      data-testid="order-price-input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Additional notes..."
                    className="mt-1"
                    rows={3}
                    data-testid="order-notes-input"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" data-testid="order-submit-btn">
                    {editingOrder ? 'Update Order' : 'Create Order'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="orders-search-input"
          />
        </div>

        {/* Orders Table */}
        <Card className="dashboard-card" data-testid="orders-table-card">
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="spinner"></div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-20 text-slate-500" data-testid="no-orders">
                <p className="mb-4">No orders found</p>
                <Button onClick={() => setDialogOpen(true)}>Create Your First Order</Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Order ID</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Product</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Quantity</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Unit Price</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Total</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr key={order.id} className="border-b last:border-0 table-row-hover" data-testid={`order-table-row-${index}`}>
                        <td className="py-4 px-6">
                          <span className="mono text-sm text-slate-600">{order.id.slice(0, 8)}...</span>
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-900">{order.product_name}</td>
                        <td className="py-4 px-6 text-slate-600">{order.quantity}</td>
                        <td className="py-4 px-6 text-slate-600">${order.unit_price.toFixed(2)}</td>
                        <td className="py-4 px-6 font-semibold">${order.total_price.toLocaleString()}</td>
                        <td className="py-4 px-6">
                          <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                            <SelectTrigger className="w-32 h-8" data-testid={`order-status-${index}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(order)}
                              data-testid={`edit-order-${index}`}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDelete(order.id)}
                              data-testid={`delete-order-${index}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
};

export default Orders;
