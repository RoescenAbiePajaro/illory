import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Sample books data - in real app, this would come from your backend
  const sampleBooks = [
    {
      id: 1,
      title: "The Watercolor Journey",
      author: "Jane Smith",
      illustrator: "John Artist",
      coverImage: "/covers/book1.jpg",
      pages: ["/pages/book1-1.jpg", "/pages/book1-2.jpg", "/pages/book1-3.jpg"],
      link: "https://example.com/book1"
    }
  ];

  const handleAdminLogin = () => {
    navigate("/admin");
  };

  const openBook = (book) => {
    setSelectedBook(book);
    setCurrentPage(0);
  };

  const closeBook = () => {
    setSelectedBook(null);
    setCurrentPage(0);
  };

  const nextPage = () => {
    if (selectedBook && currentPage < selectedBook.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Ilory
          </h1>
          <button
            onClick={handleAdminLogin}
            className="bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 py-2 px-6 rounded-xl font-semibold hover:from-pink-400 hover:to-purple-400 transition-all"
          >
            Admin Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Illustrated Story
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of beautifully illustrated ebooks with watercolor pastel artwork
          </p>
        </div>

        {/* Book Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sampleBooks.map((book) => (
            <div 
              key={book.id} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => openBook(book)}
            >
              <div className="aspect-[970/1220] bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                {book.coverImage ? (
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">📚</div>
                    <p className="text-sm">No Cover</p>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{book.title}</h3>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Book Reader Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">{selectedBook.title}</h3>
              <button
                onClick={closeBook}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 flex items-center justify-center">
              <div className="relative">
                <img
                  src={selectedBook.pages[currentPage]}
                  alt={`Page ${currentPage + 1}`}
                  className="max-h-[70vh] max-w-full object-contain rounded-lg"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white disabled:opacity-30 transition-all"
                >
                  ←
                </button>
                
                <button
                  onClick={nextPage}
                  disabled={currentPage === selectedBook.pages.length - 1}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white disabled:opacity-30 transition-all"
                >
                  →
                </button>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {selectedBook.pages.length}
              </span>
              {selectedBook.link && (
                <a
                  href={selectedBook.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-300 to-purple-300 text-gray-800 px-6 py-2 rounded-xl font-semibold hover:from-pink-400 hover:to-purple-400 transition-all"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}