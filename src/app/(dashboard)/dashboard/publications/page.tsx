'use client';
import React, { useState, useRef } from 'react';
import { Download, Type, ImagePlus, Layout, Trash2, Plus, BookOpen, Save, ArrowLeft, Edit, Eye, FileText } from 'lucide-react';

interface Element {
  id: number;
  type: string;
  x: number;
  y: number;
  width: number | string;
  height: number | string;
  content: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  color?: string;
}

interface Page {
  id: number;
  elements: Element[];
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

const CreatorPage = () => {
  const [view, setView] = useState<'library' | 'editor'>('library');
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
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [draggedElement, setDraggedElement] = useState<Element | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools = [
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'image', icon: ImagePlus, label: 'Image' },
    { id: 'layout', icon: Layout, label: 'Layout' },
  ];

  const layouts = [
    { id: 'title', label: 'Title', template: { type: 'text', content: 'Chapter Title', fontSize: 32, fontWeight: 'bold', x: 50, y: 100 } },
    { id: 'body', label: 'Body Text', template: { type: 'text', content: 'Your story text goes here...', fontSize: 16, x: 50, y: 200 } },
    { id: 'caption', label: 'Caption', template: { type: 'text', content: 'Image caption', fontSize: 12, fontStyle: 'italic', x: 50, y: 400 } },
  ];

  const createNewBook = () => {
    const newBook: Book = {
      id: Date.now(),
      title: 'Untitled Book',
      status: 'draft',
      pages: [
        { id: Date.now(), elements: [] },
        { id: Date.now() + 1, elements: [] },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setBooks([...books, newBook]);
    setCurrentBook(newBook);
    setView('editor');
  };

  const editBook = (book: Book) => {
    setCurrentBook(book);
    setCurrentPageIndex(0);
    setView('editor');
  };

  const deleteBook = (bookId: number) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(b => b.id !== bookId));
    }
  };

  const saveBook = () => {
    if (!currentBook) return;
    const updatedBooks = books.map(b => 
      b.id === currentBook.id 
        ? { ...currentBook, updatedAt: new Date().toISOString() }
        : b
    );
    setBooks(updatedBooks);
    alert('Book saved! 💾');
  };

  const publishBook = () => {
    if (!currentBook) return;
    const updatedBook = { ...currentBook, status: 'published' as const, updatedAt: new Date().toISOString() };
    const updatedBooks = books.map(b => b.id === currentBook.id ? updatedBook : b);
    setBooks(updatedBooks);
    setCurrentBook(updatedBook);
    alert('Book published successfully! 🎉');
  };

  const addElement = (type: string, template: any = {}) => {
    if (!currentBook) return;
    
    const newElement: Element = {
      id: Date.now(),
      type,
      x: template.x || 100,
      y: template.y || 100,
      width: template.width || 200,
      height: template.height || (type === 'image' ? 150 : 'auto'),
      content: template.content || (type === 'text' ? 'New Text' : ''),
      fontSize: template.fontSize || 16,
      fontWeight: template.fontWeight || 'normal',
      fontStyle: template.fontStyle || 'normal',
      color: template.color || '#000000',
      ...template
    };

    const updatedPages = [...currentBook.pages];
    updatedPages[currentPageIndex].elements.push(newElement);
    setCurrentBook({ ...currentBook, pages: updatedPages });
    setSelectedElement(newElement.id);
  };

  const handleToolClick = (toolId: string) => {
    setSelectedTool(toolId);
    if (toolId === 'text') {
      addElement('text');
    } else if (toolId === 'image') {
      fileInputRef.current?.click();
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        addElement('image', { content: event.target.result, width: 300, height: 200 });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateElement = (elementId: number, updates: any) => {
    if (!currentBook) return;
    
    const updatedPages = [...currentBook.pages];
    const page = updatedPages[currentPageIndex];
    const elementIndex = page.elements.findIndex(el => el.id === elementId);
    if (elementIndex !== -1) {
      page.elements[elementIndex] = { ...page.elements[elementIndex], ...updates };
      setCurrentBook({ ...currentBook, pages: updatedPages });
    }
  };

  const deleteElement = (elementId: number) => {
    if (!currentBook) return;
    
    const updatedPages = [...currentBook.pages];
    updatedPages[currentPageIndex].elements = updatedPages[currentPageIndex].elements.filter(
      el => el.id !== elementId
    );
    setCurrentBook({ ...currentBook, pages: updatedPages });
    setSelectedElement(null);
  };

  const handleDragStart = (e: any, element: Element) => {
    setDraggedElement(element);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: any, pageIndex: number) => {
    e.preventDefault();
    if (!draggedElement) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateElement(draggedElement.id, { x, y });
    setDraggedElement(null);
  };

  const addPage = () => {
    if (!currentBook) return;
    const updatedPages = [...currentBook.pages, { id: Date.now(), elements: [] }];
    setCurrentBook({ ...currentBook, pages: updatedPages });
  };

  const exportBook = () => {
    if (!currentBook) return;
    const blob = new Blob([JSON.stringify(currentBook, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentBook.title}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderPage = (page: Page, pageIndex: number) => {
    const isActive = pageIndex === currentPageIndex || pageIndex === currentPageIndex + 1;
    
    return (
      <div
        key={page.id}
        className={`relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${
          isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-50'
        }`}
        style={{ width: '400px', height: '550px' }}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, pageIndex)}
        onClick={() => setCurrentPageIndex(pageIndex)}
      >
        <div className="absolute bottom-4 right-4 font-bold text-black text-sm px-2 py-1 bg-yellow-300 border-2 border-black">
          {pageIndex + 1}
        </div>

        {page.elements.map((element) => (
          <div
            key={element.id}
            draggable
            onDragStart={(e) => handleDragStart(e, element)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedElement(element.id);
              setCurrentPageIndex(pageIndex);
            }}
            className={`absolute cursor-move ${
              selectedElement === element.id ? 'ring-4 ring-yellow-300' : ''
            }`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
            }}
          >
            {element.type === 'text' && (
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateElement(element.id, { content: e.target.textContent })}
                style={{
                  fontSize: element.fontSize,
                  fontWeight: element.fontWeight,
                  fontStyle: element.fontStyle,
                  color: element.color,
                  outline: 'none',
                }}
                className="whitespace-pre-wrap font-bold"
              >
                {element.content}
              </div>
            )}
            {element.type === 'image' && (
              <img
                src={element.content}
                alt="Book content"
                className="w-full h-full object-cover border-4 border-black"
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const filteredBooks = filterStatus === 'all' 
    ? books 
    : books.filter(b => b.status === filterStatus);

  if (view === 'library') {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-black mb-4 bg-yellow-300 inline-block px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              MY BOOKS
            </h1>
            <p className="text-lg font-bold mt-4">Create, edit, and publish your books</p>
          </div>

          {/* Filters and Create Button */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-3">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-6 py-3 border-4 border-black font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
                  filterStatus === 'all' ? 'bg-black text-white' : 'bg-white'
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setFilterStatus('draft')}
                className={`px-6 py-3 border-4 border-black font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
                  filterStatus === 'draft' ? 'bg-black text-white' : 'bg-white'
                }`}
              >
                DRAFTS
              </button>
              <button
                onClick={() => setFilterStatus('published')}
                className={`px-6 py-3 border-4 border-black font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
                  filterStatus === 'published' ? 'bg-black text-white' : 'bg-white'
                }`}
              >
                PUBLISHED
              </button>
            </div>

            <button
              onClick={createNewBook}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-300 border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <Plus className="w-6 h-6" />
              NEW BOOK
            </button>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 transition-all hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                {/* Book Cover Preview */}
                <div className="w-full h-48 bg-gray-100 border-4 border-black mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16" />
                </div>

                {/* Book Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-black mb-2">{book.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
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
                  <p className="text-xs font-bold text-gray-600">
                    Updated: {new Date(book.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => editBook(book)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold hover:bg-yellow-300 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    EDIT
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="px-4 py-2 bg-white border-4 border-black font-bold hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl font-black mb-4">NO BOOKS FOUND</p>
              <p className="text-lg font-bold text-gray-600 mb-6">
                {filterStatus === 'all' 
                  ? 'Create your first book to get started!'
                  : `No ${filterStatus} books yet.`}
              </p>
              <button
                onClick={createNewBook}
                className="px-6 py-3 bg-yellow-300 border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                CREATE NEW BOOK
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Editor View
  const currentElement = currentBook?.pages[currentPageIndex]?.elements.find(
    el => el.id === selectedElement
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar - Tools */}
      <div className="w-64 bg-white border-r-4 border-black p-4 overflow-y-auto">
        <button
          onClick={() => {
            saveBook();
            setView('library');
          }}
          className="w-full flex items-center gap-2 mb-4 px-4 py-2 bg-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          BACK
        </button>

        <h2 className="text-2xl font-black mb-6 flex items-center gap-2 bg-yellow-300 p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <BookOpen className="w-6 h-6" />
          CREATOR
        </h2>

        {/* Book Title Editor */}
        <div className="mb-6">
          <label className="text-xs font-black uppercase block mb-2">Book Title</label>
          <input
            type="text"
            value={currentBook?.title || ''}
            onChange={(e) => currentBook && setCurrentBook({ ...currentBook, title: e.target.value })}
            className="w-full px-3 py-2 border-4 border-black font-bold"
          />
        </div>

        {/* Tools */}
        <div className="mb-6">
          <h3 className="text-sm font-black mb-3 uppercase tracking-wider">Tools</h3>
          <div className="space-y-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className={`w-full flex items-center gap-2 px-4 py-3 border-4 border-black font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${
                  selectedTool === tool.id
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                <tool.icon className="w-5 h-5" />
                {tool.label}
              </button>
            ))}
          </div>
        </div>

        {/* Layouts */}
        {selectedTool === 'layout' && (
          <div className="mb-6">
            <h3 className="text-sm font-black mb-3 uppercase tracking-wider">Layouts</h3>
            <div className="space-y-3">
              {layouts.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => addElement('text', layout.template)}
                  className="w-full px-4 py-3 bg-white border-4 border-black font-bold text-left hover:bg-yellow-300 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {layout.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Element Properties */}
        {currentElement && (
          <div className="mb-6 p-4 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black uppercase tracking-wider">Properties</h3>
              <button
                onClick={() => deleteElement(currentElement.id)}
                className="p-2 bg-white border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            {currentElement.type === 'text' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-black uppercase block mb-1">Font Size</label>
                  <input
                    type="number"
                    value={currentElement.fontSize}
                    onChange={(e) => updateElement(currentElement.id, { fontSize: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border-4 border-black font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black uppercase block mb-1">Color</label>
                  <input
                    type="color"
                    value={currentElement.color}
                    onChange={(e) => updateElement(currentElement.id, { color: e.target.value })}
                    className="w-full h-10 border-4 border-black"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateElement(currentElement.id, { 
                      fontWeight: currentElement.fontWeight === 'bold' ? 'normal' : 'bold' 
                    })}
                    className={`flex-1 px-3 py-2 border-4 border-black font-black ${
                      currentElement.fontWeight === 'bold' ? 'bg-black text-white' : 'bg-white'
                    }`}
                  >
                    B
                  </button>
                  <button
                    onClick={() => updateElement(currentElement.id, { 
                      fontStyle: currentElement.fontStyle === 'italic' ? 'normal' : 'italic' 
                    })}
                    className={`flex-1 px-3 py-2 border-4 border-black font-black italic ${
                      currentElement.fontStyle === 'italic' ? 'bg-black text-white' : 'bg-white'
                    }`}
                  >
                    I
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Main Canvas - Book Pages */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b-4 border-black p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 2))}
              disabled={currentPageIndex === 0}
              className="px-4 py-2 bg-white border-4 border-black font-bold disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:translate-x-0 disabled:translate-y-0"
            >
              PREV
            </button>
            <span className="text-sm font-black px-4 py-2 bg-yellow-300 border-4 border-black">
              {currentPageIndex + 1}-{Math.min(currentPageIndex + 2, currentBook?.pages.length || 0)}
            </span>
            <button
              onClick={() => setCurrentPageIndex(Math.min((currentBook?.pages.length || 0) - 2, currentPageIndex + 2))}
              disabled={currentPageIndex >= (currentBook?.pages.length || 0) - 2}
              className="px-4 py-2 bg-white border-4 border-black font-bold disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:translate-x-0 disabled:translate-y-0"
            >
              NEXT
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={addPage}
              className="flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <Plus className="w-5 h-5" />
              ADD PAGE
            </button>
            <button
              onClick={saveBook}
              className="flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <Save className="w-5 h-5" />
              SAVE
            </button>
            <button
              onClick={exportBook}
              className="flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <Download className="w-5 h-5" />
              EXPORT
            </button>
            <button
              onClick={publishBook}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-300 border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <Eye className="w-5 h-5" />
              PUBLISH
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center gap-8 p-8 overflow-auto bg-gray-100">
          <div className="flex gap-8">
            {currentBook && renderPage(currentBook.pages[currentPageIndex], currentPageIndex)}
            {currentBook && currentBook.pages[currentPageIndex + 1] && renderPage(currentBook.pages[currentPageIndex + 1], currentPageIndex + 1)}
          </div>
        </div>

        {/* Page Thumbnails */}
        <div className="bg-white border-t-4 border-black p-4 flex gap-3 overflow-x-auto">
          {currentBook?.pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentPageIndex(index)}
              className={`flex-shrink-0 w-16 h-20 border-4 border-black font-black text-sm transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                index === currentPageIndex || index === currentPageIndex + 1
                  ? 'bg-yellow-300'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorPage;