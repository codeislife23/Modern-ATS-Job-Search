import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { Site } from '../types';
import SearchTips from './SearchTips';

interface JobSearchFormProps {
  sites: Site[];
  isDark: boolean;
}

export default function JobSearchForm({ sites, isDark }: JobSearchFormProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedSites, setSelectedSites] = useState<Record<string, boolean>>(
    Object.fromEntries(sites.map(site => [site.domain, false]))
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [showTips, setShowTips] = useState(false);

  const handleSiteToggle = (domain: string) => {
    setSelectedSites(prev => ({ ...prev, [domain]: !prev[domain] }));
  };

  const formatSearchQuery = (query: string, location: string) => {
    const formattedQuery = query.includes('"') || query.includes('AND') || query.includes('OR') || query.includes('NOT')
      ? query
      : `"${query}"`;
    
    const locationTerm = location ? `(${location} OR Remote)` : 'Remote';
    
    return `${formattedQuery} ${locationTerm}`;
  };

  const generateSearchUrls = () => {
    const baseQuery = formatSearchQuery(jobTitle, location);
    return Object.entries(selectedSites)
      .filter(([_, isSelected]) => isSelected)
      .map(([domain]) => {
        const encodedQuery = encodeURIComponent(`site:${domain} AND ${baseQuery}`);
        return `https://www.google.com/search?q=${encodedQuery}`;
      });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) {
      setErrorMessage('Please enter a job title');
      return;
    }
    
    const urls = generateSearchUrls();
    if (urls.length === 0) {
      setErrorMessage('Please select at least one site to search');
      return;
    }

    setErrorMessage('');
    urls.forEach((url, index) => {
      setTimeout(() => window.open(url, '_blank'), index * 300);
    });
  };

  return (
    <form onSubmit={handleSearch} className={`${
      isDark ? 'bg-gray-800' : 'bg-white'
    } rounded-xl shadow-xl p-6 space-y-6 transition-colors duration-200`}>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="jobTitle" className={`block text-sm font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Job Title
            </label>
            <button
              type="button"
              onClick={() => setShowTips(!showTips)}
              className={`${
                isDark ? 'text-red-400 hover:text-red-300' : 'text-indigo-600 hover:text-indigo-700'
              } flex items-center gap-1 text-sm`}
            >
              <Info className="w-4 h-4" />
              Search Tips
            </button>
          </div>
          {showTips && <SearchTips isDark={isDark} />}
          <input
            id="jobTitle"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder='e.g. "Frontend Developer" AND (React OR Vue) NOT WordPress'
            className={`w-full px-4 py-2 rounded-lg transition-colors ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
            } border focus:ring-2`}
          />
        </div>

        <div>
          <label htmlFor="location" className={`block text-sm font-medium mb-1 ${
            isDark ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Location (optional)
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Remote, New York, SF Bay Area"
            className={`w-full px-4 py-2 rounded-lg transition-colors ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500'
                : 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500'
            } border focus:ring-2`}
          />
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-3 ${
          isDark ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Select ATS Platforms
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sites.map((site) => (
            <label
              key={site.domain}
              className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                isDark
                  ? selectedSites[site.domain]
                    ? 'border-red-500 bg-gray-700'
                    : 'border-gray-600 hover:border-red-400'
                  : selectedSites[site.domain]
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedSites[site.domain]}
                onChange={() => handleSiteToggle(site.domain)}
                className={`h-4 w-4 rounded transition-colors ${
                  isDark
                    ? 'text-red-500 border-gray-600 focus:ring-red-500'
                    : 'text-indigo-600 border-gray-300 focus:ring-indigo-500'
                }`}
              />
              <span className={`ml-2 text-sm ${
                isDark ? 'text-gray-200' : 'text-gray-900'
              }`}>
                {site.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm text-center">{errorMessage}</div>
      )}

      <button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg transition-colors ${
          isDark
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isDark ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
        }`}
      >
        <Search className="w-5 h-5" />
        Search Jobs
      </button>
    </form>
  );
}