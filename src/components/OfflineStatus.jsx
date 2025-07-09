import React, { useState, useEffect } from 'react';
import { FiWifiOff, FiWifi } from 'react-icons/fi';

const OfflineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white p-3 text-center animate-slide-down">
      <div className="flex items-center justify-center gap-2">
        <FiWifiOff className="text-lg" />
        <span className="font-medium">
          You're offline. Some features may not be available.
        </span>
      </div>
    </div>
  );
};

export default OfflineStatus;