import React, { useState } from 'react';
import { Book, Category } from '../types';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface DataImportProps {
  onImportBooks: (books: Book[]) => void;
  onImportCategories: (categories: Category[]) => void;
}

export const DataImport: React.FC<DataImportProps> = ({
  onImportBooks,
  onImportCategories,
}) => {
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'books' | 'categories') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportStatus('processing');
    setImportMessage('Processing file...');

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error('File must contain at least a header row and one data row');
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

      if (type === 'books') {
        const requiredHeaders = ['title', 'author', 'publishingdate', 'categoryid', 'distributionexpense'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        
        if (missingHeaders.length > 0) {
          throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
        }

        const books: Book[] = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim());
          const book: any = {};
          
          headers.forEach((header, i) => {
            book[header] = values[i] || '';
          });

          return {
            id: `imported-${Date.now()}-${index}`,
            title: book.title,
            author: book.author,
            publishingDate: book.publishingdate,
            categoryId: book.categoryid,
            distributionExpense: parseFloat(book.distributionexpense) || 0,
            isbn: book.isbn || '',
            description: book.description || '',
          };
        });

        onImportBooks(books);
        setImportMessage(`Successfully imported ${books.length} books`);
      } else {
        const requiredHeaders = ['name', 'color'];
        const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
        
        if (missingHeaders.length > 0) {
          throw new Error(`Missing required headers: ${missingHeaders.join(', ')}`);
        }

        const categories: Category[] = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim());
          const category: any = {};
          
          headers.forEach((header, i) => {
            category[header] = values[i] || '';
          });

          return {
            id: `imported-${Date.now()}-${index}`,
            name: category.name,
            description: category.description || '',
            color: category.color || '#2563eb',
          };
        });

        onImportCategories(categories);
        setImportMessage(`Successfully imported ${categories.length} categories`);
      }

      setImportStatus('success');
    } catch (error) {
      setImportStatus('error');
      setImportMessage(error instanceof Error ? error.message : 'Import failed');
    }

    // Clear the input
    event.target.value = '';
  };

  const downloadTemplate = (type: 'books' | 'categories') => {
    let csvContent = '';
    
    if (type === 'books') {
      csvContent = [
        'title,author,publishingdate,categoryid,distributionexpense,isbn,description',
        'Sample Book Title,John Doe,2024-01-15,cat1,125.50,978-3-16-148410-0,A sample book description',
        'Another Book,Jane Smith,2024-02-20,cat2,89.75,978-0-123456-78-9,Another sample description'
      ].join('\n');
    } else {
      csvContent = [
        'name,description,color',
        'Business Analytics,Books about business and analytics,#2563eb',
        'Python Programming,Python development and programming,#059669',
        'Data Science,Data analysis and machine learning,#dc2626'
      ].join('\n');
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Import</h1>
        <p className="text-gray-600">Import books and categories from CSV files</p>
      </div>

      {/* Import Status */}
      {importStatus !== 'idle' && (
        <div className={`rounded-md p-4 ${
          importStatus === 'processing' ? 'bg-blue-50 border border-blue-200' :
          importStatus === 'success' ? 'bg-green-50 border border-green-200' :
          'bg-red-50 border border-red-200'
        }`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {importStatus === 'processing' && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              )}
              {importStatus === 'success' && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              {importStatus === 'error' && (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm ${
                importStatus === 'processing' ? 'text-blue-800' :
                importStatus === 'success' ? 'text-green-800' :
                'text-red-800'
              }`}>
                {importMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Import Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Books Import */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Import Books</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Upload a CSV file containing book information. Required columns: title, author, publishingdate, categoryid, distributionexpense.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => downloadTemplate('books')}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Download Template
            </button>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 font-medium">
                  Click to upload books CSV
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e, 'books')}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">CSV files only</p>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p className="font-medium">Required columns:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>title - Book title</li>
              <li>author - Author name</li>
              <li>publishingdate - Date in YYYY-MM-DD format</li>
              <li>categoryid - Category identifier</li>
              <li>distributionexpense - Expense amount (number)</li>
            </ul>
          </div>
        </div>

        {/* Categories Import */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Import Categories</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Upload a CSV file containing category information. Required columns: name, color.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => downloadTemplate('categories')}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Download Template
            </button>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer">
                <span className="text-green-600 hover:text-green-700 font-medium">
                  Click to upload categories CSV
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e, 'categories')}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">CSV files only</p>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p className="font-medium">Required columns:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>name - Category name</li>
              <li>color - Hex color code (e.g., #2563eb)</li>
              <li>description - Optional description</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">Import Instructions</h4>
        <div className="text-blue-800 space-y-2">
          <p>1. Download the template files to see the required format</p>
          <p>2. Prepare your data in CSV format with the required columns</p>
          <p>3. Make sure category IDs in the books file match existing category IDs</p>
          <p>4. Dates should be in YYYY-MM-DD format</p>
          <p>5. Expenses should be numeric values without currency symbols</p>
          <p>6. Import categories first if you're importing both types of data</p>
        </div>
      </div>
    </div>
  );
};