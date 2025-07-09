import React, { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
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
  FaUserCheck,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaImage,
  FaCogs,
  FaStore,
  FaUsers,
  FaChartLine,
  FaWarehouse
} from 'react-icons/fa';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample marketplace stats
  const marketplaceStats = {
    totalProducts: 2847,
    activeListings: 2650,
    outOfStock: 47,
    pendingApproval: 23,
    totalSellers: 156,
    pendingSellerApprovals: 8
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
      reviews: 156,
      image: '/api/placeholder/100/100'
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
      reviews: 89,
      image: '/api/placeholder/100/100'
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
      reviews: 43,
      image: '/api/placeholder/100/100'
    },
    {
      id: 'PRD004',
      name: 'Natural Cat Litter - 20lb',
      category: 'Hygiene',
      seller: 'EcoClean',
      price: 18.99,
      originalPrice: 18.99,
      stock: 200,
      lowStockThreshold: 30,
      sold: 345,
      status: 'Active',
      featured: false,
      rating: 4.4,
      reviews: 278,
      image: '/api/placeholder/100/100'
    },
    {
      id: 'PRD005',
      name: 'GPS Pet Tracker Collar',
      category: 'Electronics',
      seller: 'TechPets',
      price: 79.99,
      originalPrice: 79.99,
      stock: 45,
      lowStockThreshold: 10,
      sold: 12,
      status: 'Pending Approval',
      featured: false,
      rating: 0,
      reviews: 0,
      image: '/api/placeholder/100/100'
    },
    {
      id: 'PRD006',
      name: 'Grooming Kit Professional',
      category: 'Grooming',
      seller: 'GroomMaster',
      price: 129.99,
      originalPrice: 149.99,
      stock: 25,
      lowStockThreshold: 5,
      sold: 38,
      status: 'Active',
      featured: true,
      rating: 4.7,
      reviews: 52,
      image: '/api/placeholder/100/100'
    }
  ];

  // Sample seller accounts
  const sellersData = [
    {
      id: 'SLR001',
      name: 'PetNutrition Plus',
      email: 'info@petnutritionplus.com',
      status: 'Approved',
      products: 45,
      totalSales: 15670.50,
      rating: 4.8,
      joinDate: '2023-08-15'
    },
    {
      id: 'SLR002',
      name: 'PlayTime Pets',
      email: 'contact@playtimepets.com',
      status: 'Approved',
      products: 23,
      totalSales: 8940.25,
      rating: 4.6,
      joinDate: '2023-09-22'
    },
    {
      id: 'SLR003',
      name: 'NewPetSupplier',
      email: 'hello@newpetsupplier.com',
      status: 'Pending Approval',
      products: 0,
      totalSales: 0,
      rating: 0,
      joinDate: '2024-01-10'
    }
  ];

  // Filter and sort products
  const filteredAndSortedProducts = productsData
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || product.category.toLowerCase() === filterCategory.toLowerCase();
      const matchesStatus = filterStatus === 'all' || product.status.toLowerCase().replace(' ', '') === filterStatus.toLowerCase().replace(' ', '');
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'price') {
        comparison = a.price - b.price;
      } else if (sortField === 'stock') {
        comparison = a.stock - b.stock;
      } else if (sortField === 'sold') {
        comparison = a.sold - b.sold;
      } else if (sortField === 'rating') {
        comparison = a.rating - b.rating;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Handle sort click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    return sortDirection === 'asc' ? <FaSortUp className="ml-1 text-indigo-600" /> : <FaSortDown className="ml-1 text-indigo-600" />;
  };

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

  // Handle product actions
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      console.log('Deleting product:', productId);
      alert('Product deleted successfully!');
    }
  };

  const handleApplyDiscount = (product) => {
    setSelectedProduct(product);
    setShowDiscountModal(true);
  };

  const handleManageInventory = (product) => {
    setSelectedProduct(product);
    setShowInventoryModal(true);
  };

  const handleApproveSeller = (sellerId) => {
    if (window.confirm('Approve this seller account?')) {
      console.log('Approving seller:', sellerId);
      alert('Seller account approved successfully!');
    }
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
              <h1 className="text-2xl font-bold text-gray-800">Marketplace & Inventory Management</h1>
            </div>
            <p className="text-gray-500 mt-1">Manage products, services, inventory, and seller accounts</p>
          </div>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => {
                // Export products report
                const headers = ['Product ID', 'Name', 'Category', 'Seller', 'Price', 'Stock', 'Sold', 'Status', 'Rating'];
                const csvRows = [headers];
                
                filteredAndSortedProducts.forEach(product => {
                  csvRows.push([
                    product.id,
                    product.name,
                    product.category,
                    product.seller,
                    `$${product.price}`,
                    product.stock,
                    product.sold,
                    product.status,
                    product.rating
                  ]);
                });
                
                const csvString = csvRows.map(row => row.join(',')).join('\n');
                const blob = new Blob([csvString], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.setAttribute('hidden', '');
                a.setAttribute('href', url);
                a.setAttribute('download', `marketplace-report-${new Date().toISOString().split('T')[0]}.csv`);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <FaDownload /> Export Report
            </button>
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700 transition-colors"
              onClick={() => setShowSellerModal(true)}
            >
              <FaUserCheck /> Manage Sellers
            </button>
            <button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              onClick={() => {
                setSelectedProduct(null);
                setShowProductModal(true);
              }}
            >
              <FaPlus /> Add Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-xl font-bold text-gray-800">{marketplaceStats.totalProducts}</p>
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
                <p className="text-xl font-bold text-green-600">{marketplaceStats.activeListings}</p>
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
                <p className="text-xl font-bold text-red-600">{marketplaceStats.outOfStock}</p>
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
                <p className="text-xl font-bold text-yellow-600">{marketplaceStats.pendingApproval}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <FaClock className="text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sellers</p>
                <p className="text-xl font-bold text-blue-600">{marketplaceStats.totalSellers}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <FaUsers className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Seller Approvals</p>
                <p className="text-xl font-bold text-purple-600">{marketplaceStats.pendingSellerApprovals}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <FaUserCheck className="text-purple-600" />
              </div>
            </div>
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

            {/* Bulk Actions */}
            {selectedProducts.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (window.confirm(`Apply bulk discount to ${selectedProducts.length} products?`)) {
                      alert(`Bulk discount applied to ${selectedProducts.length} products!`);
                    }
                  }}
                  className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
                >
                  Apply Discount ({selectedProducts.length})
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Update inventory for ${selectedProducts.length} products?`)) {
                      alert(`Inventory updated for ${selectedProducts.length} products!`);
                    }
                  }}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                >
                  Update Stock
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts(filteredAndSortedProducts.map(p => p.id));
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Details
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Price
                      {getSortIcon('price')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('stock')}
                  >
                    <div className="flex items-center">
                      Inventory
                      {getSortIcon('stock')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('sold')}
                  >
                    <div className="flex items-center">
                      Performance
                      {getSortIcon('sold')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product.id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                          }
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                            <FaImage className="text-gray-400" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">#{product.id}</div>
                          {product.featured && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.category}</div>
                      <div className="text-sm text-gray-500">{product.seller}</div>
                      <div className="flex items-center text-xs text-gray-400">
                        ⭐ {product.rating} ({product.reviews} reviews)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${product.price}</div>
                      {product.originalPrice !== product.price && (
                        <div className="text-xs text-gray-400 line-through">${product.originalPrice}</div>
                      )}
                      {product.originalPrice !== product.price && (
                        <div className="text-xs text-red-600">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${product.stock <= product.lowStockThreshold ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.stock} units
                      </div>
                      {product.stock <= product.lowStockThreshold && product.stock > 0 && (
                        <div className="text-xs text-orange-600">Low Stock</div>
                      )}
                      {product.stock === 0 && (
                        <div className="text-xs text-red-600">Out of Stock</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.sold} sold</div>
                      <div className="flex items-center text-xs text-gray-400">
                        <FaChartLine className="mr-1" />
                        Rating: {product.rating}/5
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            alert(`Product Details:\n\nID: ${product.id}\nName: ${product.name}\nCategory: ${product.category}\nSeller: ${product.seller}\nPrice: $${product.price}\nStock: ${product.stock}\nSold: ${product.sold}\nRating: ${product.rating}/5 (${product.reviews} reviews)\nStatus: ${product.status}`);
                          }}
                          className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                          title="Edit Product"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleManageInventory(product)}
                          className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                          title="Manage Inventory"
                        >
                          <FaWarehouse />
                        </button>
                        <button
                          onClick={() => handleApplyDiscount(product)}
                          className="text-purple-600 hover:text-purple-900 p-1 hover:bg-purple-50 rounded"
                          title="Apply Discount"
                        >
                          <FaPercent />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                          title="Delete Product"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue={selectedProduct?.name || ''}
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
                      defaultValue={selectedProduct?.price || ''}
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue={selectedProduct?.originalPrice || ''}
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
                      defaultValue={selectedProduct?.stock || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      defaultValue={selectedProduct?.lowStockThreshold || '10'}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Select Seller</option>
                    {sellersData.filter(s => s.status === 'Approved').map(seller => (
                      <option key={seller.id} value={seller.name}>{seller.name}</option>
                    ))}
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
                      defaultChecked={selectedProduct?.featured || false}
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
                      defaultChecked={selectedProduct?.status === 'Active'}
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
                    alert(`Product ${selectedProduct ? 'updated' : 'added'} successfully!`);
                    setShowProductModal(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  {selectedProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Discount Modal */}
        {showDiscountModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Apply Promotional Discount</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <p className="text-sm text-gray-600">{selectedProduct.name}</p>
                  <p className="text-sm text-gray-500">Current Price: ${selectedProduct.price}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter discount value"
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowDiscountModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(`Promotional discount applied to ${selectedProduct.name}!`);
                    setShowDiscountModal(false);
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Apply Discount
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Modal */}
        {showInventoryModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Manage Inventory</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                  <p className="text-sm text-gray-600">{selectedProduct.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                  <p className="text-lg font-semibold text-gray-800">{selectedProduct.stock} units</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="add">Add Stock</option>
                    <option value="remove">Remove Stock</option>
                    <option value="set">Set Stock Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter quantity"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Low Stock Threshold</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue={selectedProduct.lowStockThreshold}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Adjustment</label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="2"
                    placeholder="Enter reason for inventory adjustment..."
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowInventoryModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert(`Inventory updated for ${selectedProduct.name}!`);
                    setShowInventoryModal(false);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Update Inventory
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Seller Management Modal */}
        {showSellerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Seller Account Management</h3>
                <button
                  onClick={() => setShowSellerModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seller
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Products
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sales
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sellersData.map((seller) => (
                      <tr key={seller.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                          <div className="text-sm text-gray-500">{seller.email}</div>
                          <div className="text-xs text-gray-400">Joined: {seller.joinDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(seller.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{seller.products} products</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${seller.totalSales.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{seller.rating > 0 ? `⭐ ${seller.rating}` : 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            {seller.status === 'Pending Approval' && (
                              <button
                                onClick={() => handleApproveSeller(seller.id)}
                                className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                                title="Approve Seller"
                              >
                                <FaCheck />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                alert(`Seller Details:\n\nID: ${seller.id}\nName: ${seller.name}\nEmail: ${seller.email}\nStatus: ${seller.status}\nProducts: ${seller.products}\nTotal Sales: $${seller.totalSales}\nRating: ${seller.rating}/5\nJoin Date: ${seller.joinDate}`);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Suspend seller account: ${seller.name}?`)) {
                                  alert(`Seller ${seller.name} has been suspended.`);
                                }
                              }}
                              className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                              title="Suspend Seller"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Marketplace;