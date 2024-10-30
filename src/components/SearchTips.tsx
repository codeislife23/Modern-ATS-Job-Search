import React from 'react';

interface SearchTipsProps {
  isDark: boolean;
}

export default function SearchTips({ isDark }: SearchTipsProps) {
  const tips = [
    { operator: '""', description: 'Exact phrase match', example: '"Senior Developer"' },
    { operator: '( )', description: 'Group terms', example: '(Frontend OR Backend)' },
    { operator: 'NOT', description: 'Exclude terms', example: 'Developer NOT Junior' },
    { operator: 'AND', description: 'Include all terms', example: 'React AND TypeScript' },
    { operator: 'OR', description: 'Include any terms', example: 'Remote OR Hybrid' },
  ];

  return (
    <div className={`rounded-lg p-4 mb-4 text-sm ${
      isDark ? 'bg-gray-700' : 'bg-gray-50'
    }`}>
      <h3 className={`font-medium mb-2 ${
        isDark ? 'text-gray-200' : 'text-gray-900'
      }`}>
        Search Operators:
      </h3>
      <div className="space-y-2">
        {tips.map(({ operator, description, example }) => (
          <div key={operator} className="flex items-start gap-2">
            <code className={`px-1.5 py-0.5 rounded font-mono text-xs ${
              isDark
                ? 'bg-gray-600 text-red-300'
                : 'bg-indigo-100 text-indigo-800'
            }`}>
              {operator}
            </code>
            <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
              {description} <span className="text-gray-400">|</span>{' '}
              <em className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                {example}
              </em>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}