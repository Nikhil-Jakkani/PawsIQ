import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { FaCreditCard } from 'react-icons/fa';

const Transactions = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <FaCreditCard className="text-indigo-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Transactions & Payments</h1>
            <p className="text-gray-500">Manage financial transactions and payment processing</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-indigo-100">
          <div className="text-center py-12">
            <FaCreditCard className="text-indigo-300 text-6xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Transaction Management</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              This page will contain transaction and payment management features including payment processing,
              refunds, transaction history, and financial reporting.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;