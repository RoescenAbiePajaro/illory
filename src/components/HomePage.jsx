import React, { useState, useEffect, useRef } from "react";
import { sampleBooks } from "../data/sampleBooks";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const discoverRef = useRef(null);
  
  // Sample cover images for the carousel
  const coverImages = [
    "/1.jpg",
    "/7faf63e8-ed37-4167-8bc3-8354acbdca5f.jpg",
    "/a59dd5c2-4116-4d40-a47f-d9f5cae88698.jpg",
    "/covers/book1.jpg"
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coverImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [coverImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const scrollToDiscover = () => {
    discoverRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentBookPage, setCurrentBookPage] = useState(1);
  const booksPerPage = 8;

  // Calculate pagination
  const totalBooks = sampleBooks.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  const indexOfLastBook = currentBookPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sampleBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentBookPage(pageNumber);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Ilory
          </h1>
          {/* Admin login button removed */}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with Carousel */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Discover Illustrated Story
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore the collection of my illustrated ebooks 
          </p>
          
          {/* Arrow Down Button */}
          <button
            onClick={scrollToDiscover}
            className="mt-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 mx-auto"
            aria-label="Scroll to discover section"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          {/* Carousel - Cover Photo Style */}
          <div className="mt-8 relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <div 
              className="flex h-96 md:h-[500px] lg:h-[600px] transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {coverImages.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img 
                    src={image} 
                    alt={`Cover ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
              {coverImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-pink-400 scale-110' 
                      : 'bg-gray-400/60 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Optional: Previous/Next buttons for carousel */}
            <button
              onClick={() => goToSlide((currentSlide - 1 + coverImages.length) % coverImages.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
            >
              ‹
            </button>
            <button
              onClick={() => goToSlide((currentSlide + 1) % coverImages.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
            >
              ›
            </button>
          </div>
        </div>

        {/* Discover Section */}
        <div ref={discoverRef} className="pt-16 -mt-16"> {/* Anchor for scrolling */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Featured Books
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Browse through our collection of beautifully illustrated stories
            </p>
          </div>

          {/* Book List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
            {currentBooks.map((book) => (
              <div 
                key={book.id} 
                className="bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-700 hover:border-pink-500/50 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => openBook(book)}
              >
                <div className="aspect-[970/1220] bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {book.coverImage ? (
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📚</div>
                      <p className="text-sm">No Cover</p>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-white mb-2">{book.title}</h3>
                <p className="text-sm text-gray-400">by {book.author}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalBooks > 8 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(currentBookPage > 1 ? currentBookPage - 1 : 1)}
                  disabled={currentBookPage === 1}
                  className="px-4 py-2 border border-gray-700 rounded-l-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  if (
                    i === 0 ||
                    i === totalPages - 1 ||
                    (i >= currentBookPage - 2 && i <= currentBookPage)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 border-t border-b border-gray-700 ${currentBookPage === i + 1 ? 'bg-pink-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                      >
                        {i + 1}
                      </button>
                    );
                  }
                  return null;
                })}
                
                <button
                  onClick={() => paginate(currentBookPage < totalPages ? currentBookPage + 1 : totalPages)}
                  disabled={currentBookPage === totalPages}
                  className="px-4 py-2 border border-gray-700 rounded-r-lg bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Arrow Up Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 z-30"
        aria-label="Scroll to top"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      {/* Book Reader Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-800">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h3 className="text-xl font-semibold text-white">{selectedBook.title}</h3>
              <button
                onClick={closeBook}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
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
                  Download pdf
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}