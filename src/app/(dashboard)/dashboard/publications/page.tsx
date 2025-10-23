'use client';
import React, { useState } from 'react';
import { BookOpen, Edit, Trash2, FileText, Eye } from 'lucide-react';

interface Page {
  id: number;
  elements: any[];
}

interface Book {
  id: number;
  title: string;
  status: 'draft' | 'published';
  pages: Page[];
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
}

const BooksLibrary = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: 'My First Story',
      status: 'draft',
      pages: [
        { id: 1, elements: [] },
        { id: 2, elements: [] },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Adventure Tales',
      status: 'published',
      pages: [
        { id: 1, elements: [] },
        { id: 2, elements: [] },
        { id: 3, elements: [] },
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 3,
      title: 'The Magic Forest',
      status: 'draft',
      pages: [
        { id: 1, elements: [] },
        { id: 2, elements: [] },
        { id: 3, elements: [] },
        { id: 4, elements: [] },
      ],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: 4,
      title: 'Space Explorers',
      status: 'published',
      pages: [
        { id: 1, elements: [] },
        { id: 2, elements: [] },
      ],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      updatedAt: new Date(Date.now() - 259200000).toISOString(),
    },
  ]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');

  const deleteBook = (bookId: number) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(b => b.id !== bookId));
    }
  };

  const editBook = (book: Book) => {
    alert(`Opening editor for: ${book.title}`);
  };

  const viewBook = (book: Book) => {
    alert(`Viewing: ${book.title}`);
  };

  const filteredBooks = filterStatus === 'all' 
    ? books 
    : books.filter(b => b.status === filterStatus);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-black mb-4 bg-yellow-300 inline-block px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            MY BOOKS
          </h1>
          <p className="text-lg font-bold mt-4">View, edit, and manage your book collection</p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-6 py-3 border-4 border-black font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
              filterStatus === 'all' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            ALL ({books.length})
          </button>
          <button
            onClick={() => setFilterStatus('draft')}
            className={`px-6 py-3 border-4 border-black font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
              filterStatus === 'draft' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            DRAFTS ({books.filter(b => b.status === 'draft').length})
          </button>
          <button
            onClick={() => setFilterStatus('published')}
            className={`px-6 py-3 border-4 border-black font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
              filterStatus === 'published' ? 'bg-black text-white' : 'bg-white'
            }`}
          >
            PUBLISHED ({books.filter(b => b.status === 'published').length})
          </button>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1"
            >
              {/* Book Cover Preview */}
              <div className="w-full h-56 bg-gradient-to-br from-yellow-100 to-yellow-300 border-b-4 border-black flex items-center justify-center">
                <BookOpen className="w-20 h-20" />
              </div>

              {/* Book Info */}
              <div className="p-4">
                <h3 className="text-xl font-black mb-2 truncate">{book.title}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 border-2 border-black font-bold text-xs ${
                    book.status === 'published' ? 'bg-yellow-300' : 'bg-white'
                  }`}>
                    {book.status.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {book.pages.length} pages
                  </span>
                </div>
                
                <p className="text-xs font-bold text-gray-600 mb-4">
                  Updated: {new Date(book.updatedAt).toLocaleDateString()}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => viewBook(book)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white border-4 border-black font-bold hover:bg-yellow-300 transition-colors"
                    title="View Book"
                  >
                    <Eye className="w-4 h-4" />
                    VIEW
                  </button>
                  <button
                    onClick={() => editBook(book)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white border-4 border-black font-bold hover:bg-yellow-300 transition-colors"
                    title="Edit Book"
                  >
                    <Edit className="w-4 h-4" />
                    EDIT
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="px-3 py-2 bg-white border-4 border-black font-bold hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete Book"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl font-black mb-4">NO BOOKS FOUND</p>
            <p className="text-lg font-bold text-gray-600">
              {filterStatus === 'all' 
                ? 'No books available.'
                : `No ${filterStatus} books yet.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksLibrary;