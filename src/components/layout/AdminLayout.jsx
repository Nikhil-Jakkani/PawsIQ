import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { FaPaw } from 'react-icons/fa';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-72 relative">
        <Header />
        <main className="p-8 mt-20 overflow-y-auto max-h-[calc(100vh-5rem)] rounded-tl-3xl bg-indigo-50/50">
          {/* Decorative paw prints */}
          <div className="absolute top-24 right-8 opacity-5">
            <FaPaw className="text-indigo-900 w-24 h-24 transform rotate-12" />
          </div>
          <div className="absolute bottom-8 left-12 opacity-5">
            <FaPaw className="text-indigo-900 w-16 h-16 transform -rotate-12" />
          </div>
          
          {/* Content container with subtle shadow */}
          <div className="relative z-10 bg-white rounded-2xl shadow-sm p-6 min-h-[calc(100vh-10rem)]">
            <Outlet />
          </div>
          
          {/* Footer with cute paw prints */}
          <div className="mt-6 text-center text-sm text-indigo-400 flex items-center justify-center gap-2">
            <FaPaw className="w-3 h-3 transform rotate-12" />
            <span>PawsIQ Admin Dashboard</span>
            <FaPaw className="w-3 h-3 transform -rotate-12" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;