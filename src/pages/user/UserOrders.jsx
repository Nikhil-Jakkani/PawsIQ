import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaSearch, FaFilter, FaEye, FaShoppingCart, FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaChevronDown, FaChevronUp, FaStar, FaFileInvoice, FaShippingFast } from 'react-icons/fa';
import UserLayout from '../../components/layout/UserLayout';

const UserOrders = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTimeframe, setFilterTimeframe] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock order data
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-11-28',
      total: 79.98,
      items: [
        {
          id: 1,
          name: 'Premium Dog Food',
          price: 49.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 2,
          name: 'Interactive Cat Toy',
          price: 19.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1526336179256-1347bdb255ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: 3,
          name: 'Pet Grooming Brush',
          price: 10.00,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ],
      status: 'delivered',
      trackingNumber: 'TRK-987654321',
      deliveryDate: '2023-12-02',
      paymentMethod: 'Credit Card (**** 1234)'
    },
    {
      id: 'ORD-12346',
      date: '2023-12-05',
      total: 89.99,
      items: [
        {
          id: 8,
          name: 'Automatic Pet Feeder',
          price: 89.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1585090163844-8398079e540a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ],
      status: 'shipped',
      trackingNumber: 'TRK-987654322',
      estimatedDelivery: '2023-12-10',
      paymentMethod: 'PayPal'
    },
    {
      id: 'ORD-12347',
      date: '2023-12-08',
      total: 39.99,
      items: [
        {
          id: 9,
          name: 'Calming Dog Jacket',
          price: 39.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ],
      status: 'processing',
      estimatedShipping: '2023-12-10',
      paymentMethod: 'Credit Card (**** 5678)'
    },
    {
      id: 'ORD-12348',
      date: '2023-11-15',
      total: 24.99,
      items: [
        {
          id: 5,
          name: 'Natural Cat Litter',
          price: 24.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1563398216289-4e5e877a816d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        }
      ],
      status: 'cancelled',
      cancellationReason: 'Customer requested cancellation',
      paymentMethod: 'Credit Card (**** 9012)'
    }
  ];
  
  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    const orderDate = new Date(order.date);
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
    const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 60)); // 90 days total
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 3)); // 6 months total
    
    const matchesTimeframe = 
      filterTimeframe === 'all' || 
      (filterTimeframe === '30days' && orderDate >= thirtyDaysAgo) ||
      (filterTimeframe === '90days' && orderDate >= ninetyDaysAgo) ||
      (filterTimeframe === '6months' && orderDate >= sixMonthsAgo);
    
    return matchesSearch && matchesStatus && matchesTimeframe;
  });
  
  // Get status badge styling and icon
  const getStatusBadge = (status) => {
    switch(status) {
      case 'processing':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          icon: <FaBox className="text-blue-500" />
        };
      case 'shipped':
        return {
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          icon: <FaTruck className="text-purple-500" />
        };
      case 'delivered':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: <FaCheckCircle className="text-green-500" />
        };
      case 'cancelled':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: <FaTimesCircle className="text-red-500" />
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: <FaExclamationCircle className="text-gray-500" />
        };
    }
  };
  
  // Status filter options
  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];
  
  // Timeframe filter options
  const timeframeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: '6months', label: 'Last 6 Months' }
  ];
  
  // Toggle order details
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const toggleOrderDetails = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };
  
  return (
    <UserLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaClipboardList className="text-indigo-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            </div>
            <p className="text-gray-500 mt-1">Track and manage your orders</p>
          </div>
          <button 
            onClick={() => navigate('/user/marketplace')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaShoppingCart />
            Continue Shopping
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <FaFilter className="text-gray-500" />
                <span>Filters</span>
                {showFilters ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Period
                </label>
                <select
                  value={filterTimeframe}
                  onChange={(e) => setFilterTimeframe(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {timeframeOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end justify-end">
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterTimeframe('all');
                  }}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Order List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map(order => {
              const statusBadge = getStatusBadge(order.status);
              const orderDate = new Date(order.date);
              const isExpanded = expandedOrderId === order.id;
              
              return (
                <div 
                  key={order.id} 
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div 
                    className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${statusBadge.bgColor}`}>
                        {statusBadge.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-gray-800">{order.id}</h3>
                          <div className={`px-3 py-1 rounded-full ${statusBadge.bgColor} ${statusBadge.textColor} text-xs font-medium flex items-center gap-1`}>
                            {statusBadge.icon}
                            <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {orderDate.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-gray-600 text-sm">Total</p>
                        <p className="font-bold text-gray-800">${order.total.toFixed(2)}</p>
                      </div>
                      <button className="text-indigo-600">
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                    </div>
                  </div>
                  
                  {/* Order Details (Expanded) */}
                  {isExpanded && (
                    <div className="border-t border-gray-200">
                      {/* Order Items */}
                      <div className="p-4">
                        <h4 className="font-medium text-gray-800 mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map(item => (
                            <div key={item.id} className="flex items-center gap-3">
                              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-800">{item.name}</h5>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                                  <p className="font-medium text-gray-800">${item.price.toFixed(2)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Order Details */}
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Shipping Information</h4>
                            <div className="space-y-1 text-sm">
                              {order.status === 'shipped' && (
                                <>
                                  <p className="flex items-center gap-2">
                                    <FaTruck className="text-indigo-500" />
                                    <span className="text-gray-600">Tracking Number: {order.trackingNumber}</span>
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <FaShippingFast className="text-indigo-500" />
                                    <span className="text-gray-600">
                                      Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                    </span>
                                  </p>
                                </>
                              )}
                              
                              {order.status === 'delivered' && (
                                <>
                                  <p className="flex items-center gap-2">
                                    <FaTruck className="text-indigo-500" />
                                    <span className="text-gray-600">Tracking Number: {order.trackingNumber}</span>
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" />
                                    <span className="text-gray-600">
                                      Delivered on: {new Date(order.deliveryDate).toLocaleDateString()}
                                    </span>
                                  </p>
                                </>
                              )}
                              
                              {order.status === 'processing' && (
                                <p className="flex items-center gap-2">
                                  <FaBox className="text-indigo-500" />
                                  <span className="text-gray-600">
                                    Estimated Shipping: {new Date(order.estimatedShipping).toLocaleDateString()}
                                  </span>
                                </p>
                              )}
                              
                              {order.status === 'cancelled' && (
                                <p className="flex items-center gap-2">
                                  <FaTimesCircle className="text-red-500" />
                                  <span className="text-gray-600">
                                    Reason: {order.cancellationReason}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Payment Information</h4>
                            <div className="space-y-1 text-sm">
                              <p className="flex items-center gap-2">
                                <FaFileInvoice className="text-indigo-500" />
                                <span className="text-gray-600">Payment Method: {order.paymentMethod}</span>
                              </p>
                              <p className="flex items-center gap-2">
                                <FaClipboardList className="text-indigo-500" />
                                <span className="text-gray-600">Order Total: ${order.total.toFixed(2)}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="p-4 border-t border-gray-200 flex flex-wrap gap-2 justify-end">
                        <button 
                          onClick={() => navigate(`/user/orders/${order.id}`)}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
                        >
                          <FaEye />
                          View Details
                        </button>
                        
                        {order.status === 'delivered' && (
                          <button 
                            onClick={() => navigate(`/user/orders/${order.id}/review`)}
                            className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors flex items-center gap-1"
                          >
                            <FaStar />
                            Write Review
                          </button>
                        )}
                        
                        {order.status === 'processing' && (
                          <button 
                            onClick={() => alert(`Order ${order.id} has been cancelled.`)}
                            className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors flex items-center gap-1"
                          >
                            <FaTimesCircle />
                            Cancel Order
                          </button>
                        )}
                        
                        {(order.status === 'shipped' || order.status === 'delivered') && (
                          <button 
                            onClick={() => window.open(`https://track.carrier.com/${order.trackingNumber}`, '_blank')}
                            className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-colors flex items-center gap-1"
                          >
                            <FaTruck />
                            Track Shipment
                          </button>
                        )}
                        
                        <button 
                          onClick={() => navigate(`/user/orders/${order.id}/reorder`)}
                          className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center gap-1"
                        >
                          <FaShoppingCart />
                          Reorder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaClipboardList className="text-indigo-600 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' || filterTimeframe !== 'all'
                ? "No orders match your search criteria. Try adjusting your filters."
                : "You haven't placed any orders yet. Start shopping to see your orders here!"}
            </p>
            <button 
              onClick={() => navigate('/user/marketplace')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors"
            >
              <FaShoppingCart />
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserOrders;