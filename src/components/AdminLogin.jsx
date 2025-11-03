import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');
  const [toastType, setToastType] = useState('error');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showErrorToast = (message) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setShowToast(false);

    // Basic validation
    if (!username.trim() || !password) {
      showErrorToast('Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token and admin data
      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      
      // Redirect to admin dashboard
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      showErrorToast(error.message || 'An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/admin-registration');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col relative">
      {/* Watercolor decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-75"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-150"></div>
      
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)} 
        />
      )}
      
      {/* Header Navigation */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 py-2 px-6 rounded-xl font-semibold text-sm hover:from-pink-400 hover:to-purple-400 transition-all duration-200 shadow-sm"
          >
            ← Back to Home
          </button>
          <div className="flex-1 flex justify-center">
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl p-8 w-full max-w-md shadow-lg">
          {/* Decorative header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Admin Login
            </h2>
            <p className="text-gray-600 mt-2">Access your ebook dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 pl-11 bg-white/50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your username"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-11 bg-white/50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200 placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-xl font-semibold text-lg bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 hover:from-pink-400 hover:to-purple-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  'Login to Dashboard'
                )}
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/80 text-gray-500">or</span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleRegister}
                className="w-full flex justify-center py-3 px-6 border-2 border-pink-200 rounded-xl font-semibold text-lg text-pink-600 bg-white/50 hover:bg-pink-50 hover:border-pink-300 transition-all duration-200"
              >
                Create New Account
              </button>
            </div>
          </form>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Secure admin access to manage your ebook collection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;