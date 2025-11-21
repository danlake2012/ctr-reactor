'use client';

import { useState } from 'react';
import { Search, CheckCircle, XCircle, Crown, ExternalLink, Loader2 } from 'lucide-react';

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
  const [searchedDomain, setSearchedDomain] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!domain.trim()) {
      setError('Please enter a domain name');
      return;
    }

    setIsSearching(true);
    setError('');
    setResults([]);
    setSearchedDomain(domain.trim());

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
    setSearchedDomain('');
    onClose();
  };

  const getDomainSuggestions = (baseDomain: string) => {
    const suggestions = [];
    const prefixes = ['get', 'my', 'the', 'go', 'try'];
    const suffixes = ['app', 'site', 'online', 'hub', 'zone'];

    // Add prefix suggestions
    prefixes.forEach(prefix => {
      suggestions.push(`${prefix}${baseDomain}`);
    });

    // Add suffix suggestions
    suffixes.forEach(suffix => {
      suggestions.push(`${baseDomain}${suffix}`);
    });

    // Add number variations
    for (let i = 1; i <= 5; i++) {
      suggestions.push(`${baseDomain}${i}`);
    }

    return suggestions.slice(0, 8); // Limit to 8 suggestions
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-blue-panel border border-blue-primary/40 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-primary/30 bg-linear-to-r from-blue-panel to-blue-panel-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-accent/20 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-accent tracking-widest uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Domain Search
              </h2>
              <p className="text-slate-400 text-sm">Find the perfect domain for your project</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-blue-accent transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center hover:bg-blue-primary/20 rounded-lg"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter your desired domain name"
                  className="w-full bg-blue-panel-2 border border-blue-primary/40 rounded-lg px-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:ring-2 focus:ring-blue-accent/20 transition-all"
                  disabled={isSearching}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                  .com
                </div>
              </div>
              <button
                type="submit"
                disabled={isSearching || !domain.trim()}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-lg transition-all tracking-widest uppercase text-sm flex items-center gap-2 min-w-[140px] justify-center"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search
                  </>
                )}
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-2">
              We&apos;ll check availability across .com, .net, .org, .io, .co, and .app
            </p>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/40 rounded-lg text-red-400 flex items-center gap-3">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  Results for &quot;{searchedDomain}&quot;
                </h3>
                <span className="text-slate-400 text-sm">
                  {results.filter(r => r.available).length} available
                </span>
              </div>

              <div className="grid gap-3">
                {results.map((result) => (
                  <div
                    key={result.domain}
                    className="flex items-center justify-between p-4 bg-blue-panel-2 border border-blue-primary/30 rounded-lg hover:border-blue-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        result.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {result.available ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <XCircle className="w-3 h-3" />
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-white font-mono text-lg">{result.domain}</span>
                        {result.premium && (
                          <div className="flex items-center gap-1 text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded-md text-xs">
                            <Crown className="w-3 h-3" />
                            PREMIUM
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {result.available ? (
                        <div className="text-right">
                          <div className="text-green-400 font-semibold text-lg">
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
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-accent hover:bg-blue-bright text-black px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2">
                          Register
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggestions for when no domains are available */}
              {results.filter(r => r.available).length === 0 && (
                <div className="mt-8 p-6 bg-blue-panel-2 border border-blue-primary/30 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Alternative Suggestions
                  </h4>
                  <p className="text-slate-400 mb-4">
                    Try these variations of &quot;{searchedDomain}&quot;:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {getDomainSuggestions(searchedDomain).map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setDomain(suggestion)}
                        className="text-left p-3 bg-blue-panel border border-blue-primary/20 rounded-md hover:border-blue-accent/50 transition-colors text-slate-300 hover:text-blue-accent"
                      >
                        {suggestion}.com
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-accent/10 rounded-full mb-4">
                <Loader2 className="w-8 h-8 text-blue-accent animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Searching Domains
              </h3>
              <p className="text-slate-400">
                Checking availability across multiple TLDs...
              </p>
              <div className="mt-4 flex justify-center gap-2">
                {['.com', '.net', '.org', '.io', '.co', '.app'].map((tld, index) => (
                  <div
                    key={tld}
                    className="w-2 h-2 bg-blue-accent/30 rounded-full animate-pulse"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isSearching && !error && results.length === 0 && searchedDomain && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-accent" />
              </div>
              <h3 className="text-xl font-semibold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                Ready to Search
              </h3>
              <p className="text-slate-400">
                Enter a domain name above to check availability
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}