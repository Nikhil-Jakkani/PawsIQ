import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  FaShoppingCart, 
  FaSearch, 
  FaFilter, 
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaDownload,
  FaCheck,
  FaTimes,
  FaClock,
  FaExclamationTriangle,
  FaBoxes,
  FaTags,
  FaPercent,
  FaImage,
  FaStore,
  FaChartLine,
  FaWarehouse,
  FaArrowRight
} from 'react-icons/fa';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);

  // Sample product stats
  const productStats = {
    totalProducts: 2847,
    activeListings: 2650,
    outOfStock: 47,
    pendingApproval: 23,
    lowStock: 89,
    featuredProducts: 156
  };

  // Sample products data
  const productsData = [
    {
      id: 'PRD001',
      name: 'Premium Dog Food - Chicken & Rice',
      category: 'Food',
      seller: 'PetNutrition Plus',
      price: 45.99,
      originalPrice: 52.99,
      stock: 150,
      lowStockThreshold: 20,
      sold: 89,
      status: 'Active',
      featured: true,
      rating: 4.8,
      reviews: 156
    },
    {
      id: 'PRD002',
      name: 'Interactive Cat Toy Set',
      category: 'Toys',
      seller: 'PlayTime Pets',
      price: 24.99,
      originalPrice: 24.99,
      stock: 85,
      lowStockThreshold: 15,
      sold: 234,
      status: 'Active',
      featured: false,
      rating: 4.6,
      reviews: 89
    },
    {
      id: 'PRD003',
      name: 'Orthopedic Dog Bed - Large',
      category: 'Bedding',
      seller: 'ComfortPaws',
      price: 89.99,
      originalPrice: 109.99,
      stock: 0,
      lowStockThreshold: 5,
      sold: 67,
      status: 'Out of Stock',
      featured: true,
      rating: 4.9,
      reviews: 43
    }
  ];

  // Filter products
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || product.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesStatus = filterStatus === 'all' || product.status.toLowerCase().replace(' ', '') === filterStatus.toLowerCase().replace(' ', '');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': { bg: 'bg-green-100', text: 'text-green-800', icon: FaCheck },
      'Out of Stock': { bg: 'bg-red-100', text: 'text-red-800', icon: FaExclamationTriangle },
      'Pending Approval': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FaClock },
      'Inactive': { bg: 'bg-gray-100', text: 'text-gray-800', icon: FaTimes }
    };
    
    const config = statusConfig[status] || statusConfig['Active'];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="mr-1" />
        {status}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FaShoppingCart className="text-indigo-600 text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
            </div>
            <p className="text-gray-500 mt-1">Add, edit, and manage marketplace products</p>
          </div>
          <div className="flex gap-3">
            <Link 
              to="/marketplace"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              View Marketplace <FaArrowRight />
            </Link>
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              onClick={() => setShowProductModal(true)}
            >
              <FaPlus /> Add Product
            </button>
          </div>
        </div>

        {/* Product Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-xl font-bold text-gray-800">{productStats.totalProducts}</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <FaBoxes className="text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Listings</p>
                <p className="text-xl font-bold text-green-600">{productStats.activeListings}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <FaStore className="text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                <p className="text-xl font-bold text-red-600">{productStats.outOfStock}</p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <FaExclamationTriangle className="text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Approval</p>
                <p className="text-xl font-bold text-yellow-600">{productStats.pendingApproval}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <FaClock className="text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-xl font-bold text-orange-600">{productStats.lowStock}</p>
              </div>
              <div className="bg-orange-100 p-2 rounded-full">
                <FaWarehouse className="text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Featured</p>
                <p className="text-xl font-bold text-purple-600">{productStats.featuredProducts}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <FaTags className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setShowProductModal(true)}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            >
              <div className="bg-indigo-100 p-3 rounded-full">
                <FaPlus className="text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Add Product</h3>
                <p className="text-sm text-gray-500">Add new product to marketplace</p>
              </div>
            </button>
            
            <button 
              onClick={() => alert('Bulk updating inventory...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
            >
              <div className="bg-green-100 p-3 rounded-full">
                <FaWarehouse className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Update Inventory</h3>
                <p className="text-sm text-gray-500">Bulk update stock levels</p>
              </div>
            </button>
            
            <button 
              onClick={() => alert('Applying promotional pricing...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
            >
              <div className="bg-purple-100 p-3 rounded-full">
                <FaPercent className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Set Promotions</h3>
                <p className="text-sm text-gray-500">Apply promotional pricing</p>
              </div>
            </button>
            
            <button 
              onClick={() => alert('Generating product report...')}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
            >
              <div className="bg-blue-100 p-3 rounded-full">
                <FaChartLine className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Product Report</h3>
                <p className="text-sm text-gray-500">Generate performance report</p>
              </div>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, sellers, categories..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="food">Food</option>
                <option value="toys">Toys</option>
                <option value="bedding">Bedding</option>
                <option value="hygiene">Hygiene</option>
                <option value="electronics">Electronics</option>
                <option value="grooming">Grooming</option>
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="outofstock">Out of Stock</option>
                <option value="pendingapproval">Pending Approval</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <FaImage className="text-gray-400 text-4xl" />
                </div>
                {product.featured && (
                  <span className="absolute top-2 left-2 inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
                <div className="absolute top-2 right-2">
                  {getStatusBadge(product.status)}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                </div>
                
                <div className="text-sm text-gray-500 mb-2">
                  <p>Category: {product.category}</p>
                  <p>Seller: {product.seller}</p>
                  <p>ID: #{product.id}</p>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-800">${product.price}</span>
                    {product.originalPrice !== product.price && (
                      <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    ⭐ {product.rating} ({product.reviews})
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <span className={`font-medium ${product.stock <= product.lowStockThreshold ? 'text-red-600' : 'text-gray-700'}`}>
                      Stock: {product.stock}
                    </span>
                    <span className="text-gray-500 ml-2">Sold: {product.sold}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Viewing product ${product.id}`)}
                    className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => alert(`Editing product ${product.id}`)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => alert(`Managing inventory for ${product.id}`)}
                    className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                    title="Manage Inventory"
                  >
                    <FaWarehouse />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Product</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">Select Category</option>
                      <option value="food">Food</option>
                      <option value="toys">Toys</option>
                      <option value="bedding">Bedding</option>
                      <option value="hygiene">Hygiene</option>
                      <option value="electronics">Electronics</option>
                      <option value="grooming">Grooming</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0.00"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select Seller</option>
                    <option value="PetNutrition Plus">PetNutrition Plus</option>
                    <option value="PlayTime Pets">PlayTime Pets</option>
                    <option value="ComfortPaws">ComfortPaws</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                    placeholder="Enter product description..."
                  ></textarea>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                      Featured Product
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="active"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      defaultChecked
                    />
                    <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                      Active Status
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Product added successfully!');
                    setShowProductModal(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductManagement;