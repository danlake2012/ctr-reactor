'use client';

import { useState } from 'react';

interface DomainCheckResult {
  domain: string;
  available: boolean;
  premium: boolean;
  price?: number;
}

interface DomainSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DomainSearchModal({ isOpen, onClose }: DomainSearchModalProps) {
  const [domain, setDomain] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<DomainCheckResult[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    setIsSearching(true);
    setError('');
    setResults([]);

    try {
      // Check multiple TLDs
      const tlds = ['.com', '.net', '.org', '.io', '.co', '.app'];
      const searchPromises = tlds.map(async (tld) => {
        const fullDomain = domain.toLowerCase().replace(/^\.+|\.+$/g, '') + tld;

        const response = await fetch('/api/domain-search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ domain: fullDomain }),
        });

        if (!response.ok) {
          throw new Error('Search failed');
        }

        return response.json();
      });

      const searchResults = await Promise.allSettled(searchPromises);

      const validResults: DomainCheckResult[] = searchResults
        .filter((result): result is PromiseFulfilledResult<DomainCheckResult> =>
          result.status === 'fulfilled'
        )
        .map(result => result.value);

      setResults(validResults);

      if (validResults.length === 0) {
        setError('Unable to check domain availability. Please try again.');
      }

    } catch (err) {
      setError('Failed to search domains. Please try again.');
      console.error('Domain search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClose = () => {
    setDomain('');
    setResults([]);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-blue-panel border border-blue-primary/40 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-primary/30">
          <h2 className="text-2xl font-bold text-blue-accent tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            Domain Search
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-blue-accent transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="Enter domain name (without .com)"
                className="flex-1 bg-blue-panel-2 border border-blue-primary/40 rounded-md px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:ring-1 focus:ring-blue-accent"
                disabled={isSearching}
              />
              <button
                type="submit"
                disabled={isSearching || !domain.trim()}
                className="bg-blue-accent hover:bg-blue-bright disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold px-6 py-3 rounded-md transition-colors tracking-widest uppercase text-sm"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500/40 rounded-md text-red-400">
              {error}
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Availability Results
              </h3>
              {results.map((result) => (
                <div
                  key={result.domain}
                  className="flex items-center justify-between p-4 bg-blue-panel-2 border border-blue-primary/30 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      result.available ? 'bg-green-400' : 'bg-red-400'
                    }`} />
                    <span className="text-white font-mono">{result.domain}</span>
                    {result.premium && (
                      <span className="text-yellow-400 text-xs bg-yellow-900/20 px-2 py-1 rounded">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    {result.available ? (
                      <span className="text-green-400 font-semibold">
                        Available
                        {result.price && (
                          <span className="text-slate-400 text-sm ml-2">
                            ${result.price}/year
                          </span>
                        )}
                      </span>
                    ) : (
                      <span className="text-red-400">Taken</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-accent mb-4"></div>
              <p className="text-slate-400">Searching domains...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}