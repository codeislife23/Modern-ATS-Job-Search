import React from 'react';
import { Search, MapPin, Briefcase, Moon, Sun } from 'lucide-react';
import JobSearchForm from './components/JobSearchForm';
import { sites } from './data/sites';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    } flex items-center justify-center p-4`}>
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full ${
          isDark ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800'
        } shadow-lg hover:scale-110 transition-transform`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Search className={`w-8 h-8 ${isDark ? 'text-red-500' : 'text-indigo-600'}`} />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ATS Job Search
            </h1>
          </div>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Search across multiple ATS platforms in one click
          </p>
        </div>

        <JobSearchForm sites={sites} isDark={isDark} />
        
        <footer className="mt-8 text-center text-sm">
          <div className={`flex items-center justify-center gap-4 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Search by location</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>Multiple ATS platforms</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;