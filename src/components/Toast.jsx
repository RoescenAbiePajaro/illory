import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getToastStyles = () => {
    const baseStyles = "fixed top-6 right-6 z-50 max-w-sm p-4 rounded-2xl shadow-lg border backdrop-blur-sm transition-all duration-300 transform";
    
    const typeStyles = {
      success: "bg-emerald-50 border-emerald-200 text-emerald-800",
      error: "bg-rose-50 border-rose-200 text-rose-800",
      warning: "bg-amber-50 border-amber-200 text-amber-800",
      info: "bg-sky-50 border-sky-200 text-sky-800"
    };

    return `${baseStyles} ${typeStyles[type]}`;
  };

  const getIcon = () => {
    const icons = {
      success: "✓",
      error: "✕",
      warning: "⚠",
      info: "ℹ"
    };
    return icons[type];
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center space-x-3">
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-white bg-opacity-50 text-sm font-bold">
          {getIcon()}
        </span>
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-30 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;