import React, { useState } from 'react';
import { FiLogOut, FiBook, FiUsers, FiUpload, FiImage } from 'react-icons/fi';
import Toast from './Toast';

export default function AdminDashboard({ onLogout, userData }) {
  const [activeNav, setActiveNav] = useState('books');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [books, setBooks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Book form state
  const [bookForm, setBookForm] = useState({
    title: '',
    illustrator: '',
    author: '',
    description: '',
    coverImage: null,
    pages: [],
    link: ''
  });

  const showToastMessage = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'cover') {
        setBookForm(prev => ({ ...prev, coverImage: file }));
      } else {
        setBookForm(prev => ({ 
          ...prev, 
          pages: [...prev.pages, file] 
        }));
      }
    }
  };

  const handleSubmitBook = async (e) => {
    e.preventDefault();
    // Here you would typically upload to your server
    showToastMessage('Book added successfully!', 'success');
    setBookForm({
      title: '',
      illustrator: '',
      author: '',
      description: '',
      coverImage: null,
      pages: [],
      link: ''
    });
  };

  const BookManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Book Management</h2>
        <button className="bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 px-4 py-2 rounded-xl font-semibold hover:from-pink-400 hover:to-purple-400 transition-all">
          Add New Book
        </button>
      </div>

      <form onSubmit={handleSubmitBook} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Book Title</label>
            <input
              type="text"
              value={bookForm.title}
              onChange={(e) => setBookForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
              placeholder="Enter book title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
            <input
              type="text"
              value={bookForm.author}
              onChange={(e) => setBookForm(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
              placeholder="Enter author name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Illustrator Name</label>
          <input
            type="text"
            value={bookForm.illustrator}
            onChange={(e) => setBookForm(prev => ({ ...prev, illustrator: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
            placeholder="Enter illustrator name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={bookForm.description}
            onChange={(e) => setBookForm(prev => ({ ...prev, description: e.target.value }))}
            rows="4"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
            placeholder="Enter book description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">External Link</label>
          <input
            type="url"
            value={bookForm.link}
            onChange={(e) => setBookForm(prev => ({ ...prev, link: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all"
            placeholder="https://example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image (970x1220)
            </label>
            <div className="border-2 border-dashed border-pink-200 rounded-xl p-6 text-center hover:border-pink-300 transition-colors">
              <FiImage className="mx-auto text-3xl text-pink-300 mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload cover image</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'cover')}
                className="hidden"
                id="cover-upload"
              />
              <label
                htmlFor="cover-upload"
                className="cursor-pointer bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 px-4 py-2 rounded-lg font-semibold inline-block hover:from-pink-400 hover:to-purple-400 transition-all"
              >
                Choose File
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Pages
            </label>
            <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center hover:border-blue-300 transition-colors">
              <FiUpload className="mx-auto text-3xl text-blue-300 mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload book pages</p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, 'pages')}
                className="hidden"
                id="pages-upload"
              />
              <label
                htmlFor="pages-upload"
                className="cursor-pointer bg-gradient-to-r from-blue-300 to-cyan-300 text-gray-800 px-4 py-2 rounded-lg font-semibold inline-block hover:from-blue-400 hover:to-cyan-400 transition-all"
              >
                Choose Files
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-300 to-emerald-300 text-gray-800 py-3 rounded-xl font-semibold hover:from-green-400 hover:to-emerald-400 transition-all"
        >
          Add Book to Library
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Ebook Admin
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveNav('books')}
            className={`flex items-center w-full p-3 rounded-xl transition-all ${
              activeNav === 'books' 
                ? 'bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 border border-pink-200' 
                : 'hover:bg-white/50 text-gray-600'
            }`}
          >
            <FiBook className="mr-3" />
            <span>Book Management</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-300 to-pink-300 text-gray-800 rounded-xl font-semibold hover:from-rose-400 hover:to-pink-400 transition-all"
          >
            <FiLogOut size={16} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <BookManagement />

        {showToast && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        )}
      </main>
    </div>
  );
}