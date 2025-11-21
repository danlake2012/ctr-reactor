'use client';

import { useState, useCallback } from 'react';
import { Search, CheckCircle, XCircle, Crown, ExternalLink, Loader2, Sparkles, Zap, Globe } from 'lucide-react';

interface DomainCheckResult {
  domain: string;
  available: boolean;
  premium: boolean;
  price?: number;
  tld: string;
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
  const [searchedDomain, setSearchedDomain] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    const searchTerm = domain.trim();
    if (!searchTerm) {
      setError('Please enter a domain name');
      return;
    }

    // Validate domain name
    if (searchTerm.length < 2) {
      setError('Domain name must be at least 2 characters');
      return;
    }

    if (!/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/.test(searchTerm)) {
      setError('Domain name contains invalid characters');
      return;
    }

    setIsSearching(true);
    setError('');
    setResults([]);
    setSearchedDomain(searchTerm);

    // Add to search history
    setSearchHistory(prev => {
      const filtered = prev.filter(d => d !== searchTerm);
      return [searchTerm, ...filtered].slice(0, 5);
    });

    try {
      const response = await fetch('/api/domain-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain: searchTerm }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setResults(data);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (err) {
      console.error('Domain search error:', err);
      setError('Failed to search domains. Please try again.');
      // Provide mock results for demo purposes
      const mockResults: DomainCheckResult[] = [
        { domain: `${searchTerm}.com`, available: Math.random() > 0.7, premium: false, tld: 'com' },
        { domain: `${searchTerm}.net`, available: Math.random() > 0.8, premium: false, tld: 'net' },
        { domain: `${searchTerm}.org`, available: Math.random() > 0.6, premium: false, tld: 'org' },
        { domain: `${searchTerm}.io`, available: Math.random() > 0.5, premium: false, tld: 'io' },
        { domain: `${searchTerm}.co`, available: Math.random() > 0.9, premium: false, tld: 'co' },
        { domain: `${searchTerm}.app`, available: Math.random() > 0.4, premium: false, tld: 'app' },
      ];
      setResults(mockResults);
    } finally {
      setIsSearching(false);
    }
  }, [domain]);

  const handleClose = useCallback(() => {
    setDomain('');
    setResults([]);
    setError('');
    setSearchedDomain('');
    onClose();
  }, [onClose]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setDomain(suggestion);
  }, []);

  const getDomainSuggestions = useCallback((baseDomain: string): string[] => {
    const suggestions: string[] = [];
    const prefixes = ['get', 'my', 'the', 'go', 'try', 'use'];
    const suffixes = ['app', 'site', 'online', 'hub', 'zone', 'pro'];
    const numbers = ['1', '2', '3', '2024', '2025'];

    // Add prefix suggestions
    prefixes.forEach(prefix => {
      suggestions.push(`${prefix}${baseDomain}`);
    });

    // Add suffix suggestions
    suffixes.forEach(suffix => {
      suggestions.push(`${baseDomain}${suffix}`);
    });

    // Add number variations
    numbers.forEach(num => {
      suggestions.push(`${baseDomain}${num}`);
    });

    return [...new Set(suggestions)].slice(0, 12); // Remove duplicates and limit
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-500/20 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-linear-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 border-b border-blue-500/20 p-6">
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wider uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Domain Search
                </h2>
                <p className="text-slate-300 text-sm mt-1">Find your perfect domain name</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-white transition-all duration-200 text-2xl leading-none w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-lg backdrop-blur-sm"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-140px)]">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter your desired domain name"
                  className="w-full bg-slate-800/50 border border-blue-500/30 rounded-xl pl-12 pr-4 py-5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-lg"
                  disabled={isSearching}
                />
              </div>
              <button
                type="submit"
                disabled={isSearching || !domain.trim()}
                className="bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold px-8 py-5 rounded-xl transition-all duration-200 tracking-wider uppercase text-sm flex items-center gap-3 min-w-40 justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              We&apos;ll check availability across .com, .net, .org, .io, .co, and .app
            </p>
          </form>

          {/* Search History */}
          {searchHistory.length > 0 && !isSearching && results.length === 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Recent Searches</h4>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((historyItem) => (
                  <button
                    key={historyItem}
                    onClick={() => handleSuggestionClick(historyItem)}
                    className="px-3 py-1 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-blue-400 hover:border-blue-400/50 transition-all duration-200 text-sm"
                  >
                    {historyItem}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/40 rounded-xl text-red-300 flex items-center gap-3 backdrop-blur-sm">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-blue-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Results for &quot;{searchedDomain}&quot;
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-slate-300 text-sm">
                    {results.filter(r => r.available).length} of {results.length} available
                  </span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="grid gap-4">
                {results.map((result) => (
                  <div
                    key={result.domain}
                    className="group relative bg-linear-to-r from-slate-800/50 to-slate-700/30 border border-slate-600/30 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                          result.available
                            ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {result.available ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-white font-mono text-xl font-semibold">{result.domain}</span>
                          {result.premium && (
                            <div className="flex items-center gap-1 text-yellow-400 bg-yellow-900/20 px-3 py-1 rounded-full text-xs font-medium border border-yellow-400/30">
                              <Crown className="w-3 h-3" />
                              PREMIUM
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {result.available ? (
                          <div className="text-right">
                            <div className="text-green-400 font-bold text-lg">
                              Available
                            </div>
                            {result.price && (
                              <div className="text-slate-400 text-sm">
                                ${result.price}/year
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-red-400 font-medium">
                            Taken
                          </div>
                        )}

                        {result.available && (
                          <button 
                            onClick={() => window.open(`https://www.name.com/domain/search/${result.domain}`, '_blank')}
                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            Register
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>

              {/* Suggestions for when no domains are available */}
              {results.filter(r => r.available).length === 0 && (
                <div className="mt-8 p-6 bg-linear-to-r from-slate-800/50 to-slate-700/30 border border-slate-600/30 rounded-xl">
                  <h4 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    <Sparkles className="w-5 h-5" />
                    Alternative Suggestions
                  </h4>
                  <p className="text-slate-300 mb-6">
                    Try these variations of &quot;{searchedDomain}&quot;:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {getDomainSuggestions(searchedDomain).map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="group text-left p-4 bg-slate-800/50 border border-slate-600/30 rounded-lg hover:border-blue-400/50 hover:bg-blue-900/20 transition-all duration-200 text-slate-300 hover:text-blue-400 transform hover:scale-105"
                      >
                        <div className="font-mono font-semibold">{suggestion}.com</div>
                        <div className="text-xs text-slate-500 group-hover:text-blue-300 mt-1">Click to search</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="text-center py-16">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-ping opacity-20"></div>
                <Loader2 className="w-10 h-10 text-blue-400 animate-spin relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Searching Domains
              </h3>
              <p className="text-slate-300 mb-6">
                Scanning the web for your perfect domain...
              </p>
              <div className="flex justify-center gap-3">
                {['.com', '.net', '.org', '.io', '.co', '.app'].map((tld, index) => (
                  <div
                    key={tld}
                    className="px-3 py-1 bg-slate-800/50 border border-slate-600/30 rounded-full text-slate-400 text-sm animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {tld}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isSearching && !error && results.length === 0 && !searchedDomain && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Ready to Search
              </h3>
              <p className="text-slate-300">
                Enter a domain name above to check availability across multiple TLDs
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}