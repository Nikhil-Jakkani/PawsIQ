import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaPlus, FaEdit, FaTrash, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UserRoles = () => {
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  
  // Sample data for roles
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full access to all features and settings',
      userCount: 3,
      permissions: {
        users: { view: true, create: true, edit: true, delete: true },
        providers: { view: true, create: true, edit: true, delete: true },
        pets: { view: true, create: true, edit: true, delete: true },
        appointments: { view: true, create: true, edit: true, delete: true },
        marketplace: { view: true, create: true, edit: true, delete: true },
        transactions: { view: true, create: true, edit: true, delete: true },
        content: { view: true, create: true, edit: true, delete: true },
        analytics: { view: true, create: true, edit: true, delete: true },
        notifications: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: true, edit: true, delete: true },
        security: { view: true, create: true, edit: true, delete: true },
        support: { view: true, create: true, edit: true, delete: true }
      }
    },
    {
      id: 2,
      name: 'Moderator',
      description: 'Can moderate content and manage users',
      userCount: 5,
      permissions: {
        users: { view: true, create: false, edit: true, delete: false },
        providers: { view: true, create: false, edit: true, delete: false },
        pets: { view: true, create: false, edit: true, delete: false },
        appointments: { view: true, create: true, edit: true, delete: false },
        marketplace: { view: true, create: false, edit: false, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        content: { view: true, create: true, edit: true, delete: true },
        analytics: { view: true, create: false, edit: false, delete: false },
        notifications: { view: true, create: true, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        security: { view: false, create: false, edit: false, delete: false },
        support: { view: true, create: true, edit: true, delete: false }
      }
    },
    {
      id: 3,
      name: 'Support Agent',
      description: 'Can handle support tickets and basic user management',
      userCount: 8,
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        providers: { view: true, create: false, edit: false, delete: false },
        pets: { view: true, create: false, edit: false, delete: false },
        appointments: { view: true, create: true, edit: true, delete: false },
        marketplace: { view: true, create: false, edit: false, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        content: { view: true, create: false, edit: false, delete: false },
        analytics: { view: false, create: false, edit: false, delete: false },
        notifications: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        security: { view: false, create: false, edit: false, delete: false },
        support: { view: true, create: true, edit: true, delete: false }
      }
    },
    {
      id: 4,
      name: 'Analyst',
      description: 'Can view analytics and reports',
      userCount: 2,
      permissions: {
        users: { view: true, create: false, edit: false, delete: false },
        providers: { view: true, create: false, edit: false, delete: false },
        pets: { view: true, create: false, edit: false, delete: false },
        appointments: { view: true, create: false, edit: false, delete: false },
        marketplace: { view: true, create: false, edit: false, delete: false },
        transactions: { view: true, create: false, edit: false, delete: false },
        content: { view: false, create: false, edit: false, delete: false },
        analytics: { view: true, create: true, edit: true, delete: true },
        notifications: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
        security: { view: false, create: false, edit: false, delete: false },
        support: { view: false, create: false, edit: false, delete: false }
      }
    }
  ]);

  // Permission categories
  const permissionCategories = [
    { id: 'users', label: 'User Management' },
    { id: 'providers', label: 'Provider Management' },
    { id: 'pets', label: 'Pet Profiles' },
    { id: 'appointments', label: 'Appointments & Bookings' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'transactions', label: 'Transactions & Payments' },
    { id: 'content', label: 'Content Moderation' },
    { id: 'analytics', label: 'Analytics & Reporting' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'settings', label: 'Settings' },
    { id: 'security', label: 'Security & Compliance' },
    { id: 'support', label: 'Customer Support' }
  ];

  // Permission actions
  const permissionActions = [
    { id: 'view', label: 'View' },
    { id: 'create', label: 'Create' },
    { id: 'edit', label: 'Edit' },
    { id: 'delete', label: 'Delete' }
  ];

  // Handle opening the edit role modal
  const handleEditRole = (role) => {
    setCurrentRole(role);
    setNewRoleName(role.name);
    setNewRoleDescription(role.description);
    setShowEditRoleModal(true);
  };

  // Handle saving a new role
  const handleSaveNewRole = () => {
    // Create default permissions (all false)
    const defaultPermissions = {};
    permissionCategories.forEach(category => {
      defaultPermissions[category.id] = {
        view: false,
        create: false,
        edit: false,
        delete: false
      };
    });

    // Create new role
    const newRole = {
      id: roles.length + 1,
      name: newRoleName,
      description: newRoleDescription,
      userCount: 0,
      permissions: defaultPermissions
    };

    setRoles([...roles, newRole]);
    setShowAddRoleModal(false);
    setNewRoleName('');
    setNewRoleDescription('');
  };

  // Handle updating a role
  const handleUpdateRole = () => {
    const updatedRoles = roles.map(role => {
      if (role.id === currentRole.id) {
        return {
          ...currentRole,
          name: newRoleName,
          description: newRoleDescription
        };
      }
      return role;
    });

    setRoles(updatedRoles);
    setShowEditRoleModal(false);
    setCurrentRole(null);
    setNewRoleName('');
    setNewRoleDescription('');
  };

  // Handle deleting a role
  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      const updatedRoles = roles.filter(role => role.id !== roleId);
      setRoles(updatedRoles);
    }
  };

  // Handle toggling a permission
  const handleTogglePermission = (roleId, category, action) => {
    const updatedRoles = roles.map(role => {
      if (role.id === roleId) {
        const updatedPermissions = { ...role.permissions };
        updatedPermissions[category][action] = !updatedPermissions[category][action];
        return { ...role, permissions: updatedPermissions };
      }
      return role;
    });

    setRoles(updatedRoles);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/users" className="text-gray-500 hover:text-indigo-600">
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">User Roles & Permissions</h1>
              <p className="text-gray-500">Manage roles and assign permissions</p>
            </div>
          </div>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-2 hover:bg-indigo-700 transition-colors"
            onClick={() => setShowAddRoleModal(true)}
          >
            <FaPlus /> Add New Role
          </button>
        </div>

        {/* Roles List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Available Roles</h2>
            <p className="text-sm text-gray-500 mt-1">Define roles and their permissions for staff members</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <FaUserShield className="text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{role.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{role.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{role.userCount} users</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900" 
                          title="Edit Role"
                          onClick={() => handleEditRole(role)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900" 
                          title="Delete Role"
                          onClick={() => handleDeleteRole(role.id)}
                          disabled={role.userCount > 0}
                          className={`${role.userCount > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-900'}`}
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

        {/* Permissions Matrix */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Permissions Matrix</h2>
            <p className="text-sm text-gray-500 mt-1">Configure detailed permissions for each role</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission Category</th>
                  {roles.map(role => (
                    <th key={role.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {role.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {permissionCategories.map((category) => (
                  <React.Fragment key={category.id}>
                    <tr className="bg-gray-50">
                      <td colSpan={roles.length + 1} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                        {category.label}
                      </td>
                    </tr>
                    {permissionActions.map(action => (
                      <tr key={`${category.id}-${action.id}`} className="hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm text-gray-500">
                          {action.label}
                        </td>
                        {roles.map(role => (
                          <td key={`${role.id}-${category.id}-${action.id}`} className="px-6 py-3 text-center">
                            <button
                              onClick={() => handleTogglePermission(role.id, category.id, action.id)}
                              className={`h-6 w-6 rounded-md flex items-center justify-center ${
                                role.permissions[category.id][action.id] 
                                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                  : 'bg-red-100 text-red-600 hover:bg-red-200'
                              }`}
                            >
                              {role.permissions[category.id][action.id] ? <FaCheck size={12} /> : <FaTimes size={12} />}
                            </button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Role</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  id="roleName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter role name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="roleDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="roleDescription"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter role description"
                  rows="3"
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowAddRoleModal(false);
                  setNewRoleName('');
                  setNewRoleDescription('');
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={handleSaveNewRole}
                disabled={!newRoleName.trim()}
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditRoleModal && currentRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Role</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="editRoleName" className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  id="editRoleName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter role name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="editRoleDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="editRoleDescription"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter role description"
                  rows="3"
                  value={newRoleDescription}
                  onChange={(e) => setNewRoleDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowEditRoleModal(false);
                  setCurrentRole(null);
                  setNewRoleName('');
                  setNewRoleDescription('');
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={handleUpdateRole}
                disabled={!newRoleName.trim()}
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserRoles;