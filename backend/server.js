import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

const AdminRegistration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [accessCodeInfo, setAccessCodeInfo] = useState(null);
  const [accessCodeValidating, setAccessCodeValidating] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const navigate = useNavigate();

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  // Validate access code
  const validateAccessCode = async (code) => {
    if (!code || code.trim().length === 0) {
      setAccessCodeInfo(null);
      return;
    }

    setAccessCodeValidating(true);
    try {
      const response = await fetch(`http://localhost:5000/api/access-codes/validate/${code.trim()}`);
      const data = await response.json();

      if (response.ok && data.valid) {
        setAccessCodeInfo({
          code: data.code,
          description: data.description,
          remainingUses: data.remainingUses,
          valid: true
        });
      } else {
        setAccessCodeInfo({
          code: code.trim().toUpperCase(),
          valid: false,
          message: data.message || 'Invalid access code'
        });
      }
    } catch (error) {
      console.error('Error validating access code:', error);
      setAccessCodeInfo({
        code: code.trim().toUpperCase(),
        valid: false,
        message: 'Unable to validate access code'
      });
    } finally {
      setAccessCodeValidating(false);
    }
  };

  // Debounced access code validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (accessCode.trim()) {
        validateAccessCode(accessCode);
      } else {
        setAccessCodeInfo(null);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [accessCode]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!firstName || !lastName || !username || !password || !confirmPassword || !accessCode) {
      showToast('All fields are required', 'error');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      setLoading(false);
      return;
    }

    // Check access code validity
    if (!accessCodeInfo || !accessCodeInfo.valid) {
      showToast('Please enter a valid access code', 'error');
      setLoading(false);
      return;
    }

    if (accessCodeValidating) {
      showToast('Please wait while validating access code', 'error');
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          username, 
          password, 
          accessCode 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        const successMessage = data.accessCodeUsed 
          ? `Registration successful! Used access code: ${data.accessCodeUsed.code}${data.accessCodeUsed.description ? ` (${data.accessCodeUsed.description})` : ''}`
          : 'Registration successful!';
        showToast(successMessage, 'success');
        setTimeout(() => {
          navigate('/admin');
        }, 1500);
      } else {
        showToast(data.message || 'Registration failed', 'error');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      showToast('Unable to connect to server. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col relative">
      {/* Watercolor decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-75"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-150"></div>
      
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
      
      {/* Header Navigation */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-pink-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 py-2 px-6 rounded-xl font-semibold text-sm hover:from-pink-400 hover:to-purple-400 transition-all duration-200 shadow-sm"
          >
            ← Back to Login
          </button>
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Pastel Ebooks
            </h1>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">Join as an ebook administrator</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 pl-11 bg-white/50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200 placeholder-gray-400"
                    placeholder="First name"
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
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200 placeholder-gray-400"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

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
                  placeholder="Choose a username"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                    placeholder="Min. 6 characters"
                    required
                    minLength={6}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all duration-200 placeholder-gray-400"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-2">
                Access Code
              </label>
              <div className="relative">
                <input
                  id="accessCode"
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className={`w-full px-4 py-3 pl-11 bg-white/50 border rounded-xl focus:ring-2 focus:border-pink-300 transition-all duration-200 placeholder-gray-400 ${
                    accessCodeValidating 
                      ? 'border-amber-300 focus:ring-amber-200'
                      : accessCodeInfo?.valid 
                        ? 'border-emerald-300 focus:ring-emerald-200'
                        : accessCodeInfo?.valid === false
                          ? 'border-rose-300 focus:ring-rose-200'
                          : 'border-pink-200 focus:ring-pink-200'
                  }`}
                  placeholder="Enter access code"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                
                {accessCodeValidating && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-400"></div>
                  </div>
                )}
                {accessCodeInfo?.valid && !accessCodeValidating && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                {accessCodeInfo?.valid === false && !accessCodeValidating && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="h-4 w-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Access Code Information */}
              {accessCodeInfo && (
                <div className={`mt-2 p-3 rounded-xl text-sm border ${
                  accessCodeInfo.valid 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-rose-50 border-rose-200 text-rose-700'
                }`}>
                  {accessCodeInfo.valid ? (
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Valid Access Code
                      </div>
                      <div className="text-xs mt-1 space-y-1">
                        {accessCodeInfo.description && (
                          <div>Description: {accessCodeInfo.description}</div>
                        )}
                        <div>Remaining uses: {accessCodeInfo.remainingUses}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="font-medium flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {accessCodeInfo.message}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-xl font-semibold text-lg bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 hover:from-pink-400 hover:to-purple-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                'Create Admin Account'
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Already have an account?{' '}
              <button
                onClick={handleBack}
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                Back to Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistration;