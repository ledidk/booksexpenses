import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BooksView } from './components/BooksView';
import { CategoriesView } from './components/CategoriesView';
import { ReportsView } from './components/ReportsView';
import { DataImport } from './components/DataImport';
import { Book, Category } from './types';
import { sampleBooks, sampleCategories } from './data/sampleData';

export type View = 'dashboard' | 'books' | 'categories' | 'reports' | 'import';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Initialize with sample data
    setBooks(sampleBooks);
    setCategories(sampleCategories);
  }, []);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
    };
    setBooks(prev => [...prev, newBook]);
  };

  const updateBook = (id: string, book: Omit<Book, 'id'>) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...book, id } : b));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, category: Omit<Category, 'id'>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...category, id } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard books={books} categories={categories} />;
      case 'books':
        return (
          <BooksView
            books={books}
            categories={categories}
            onAddBook={addBook}
            onUpdateBook={updateBook}
            onDeleteBook={deleteBook}
          />
        );
      case 'categories':
        return (
          <CategoriesView
            categories={categories}
            onAddCategory={addCategory}
            onUpdateCategory={updateCategory}
            onDeleteCategory={deleteCategory}
          />
        );
      case 'reports':
        return <ReportsView books={books} categories={categories} />;
      case 'import':
        return <DataImport onImportBooks={setBooks} onImportCategories={setCategories} />;
      default:
        return <Dashboard books={books} categories={categories} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-64">
          <div className="p-6">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;