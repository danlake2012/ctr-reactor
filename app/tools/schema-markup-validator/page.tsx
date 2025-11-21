'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SchemaValidationResult {
  overallScore: number;
  grade: string;
  summary: {
    totalSchemas: number;
    validSchemas: number;
    invalidSchemas: number;
    warnings: number;
    richResultsEligible: number;
  };
  schemas: Array<{
    type: string;
    url: string;
    isValid: boolean;
    errors: Array<{
      field: string;
      message: string;
      severity: 'error' | 'warning';
    }>;
    warnings: Array<{
      field: string;
      message: string;
      severity: 'warning';
    }>;
    richResults: {
      eligible: boolean;
      features: string[];
      missing: string[];
    };
    jsonLd: string;
  }>;
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    type: string;
    message: string;
    action: string;
  }>;
  missingSchemas: Array<{
    type: string;
    importance: 'high' | 'medium' | 'low';
    description: string;
    benefits: string[];
  }>;
  seoImpact: {
    richSnippets: number;
    knowledgePanel: boolean;
    localPack: boolean;
    featuredSnippet: boolean;
    voiceSearch: boolean;
  };
}

export default function SchemaMarkupValidator() {
  const [url, setUrl] = useState('');
  const [crawlDepth, setCrawlDepth] = useState('1');
  const [schemaTypes, setSchemaTypes] = useState<string[]>(['Organization', 'WebSite']);
  const [isValidating, setIsValidating] = useState(false);
  const [results, setResults] = useState<SchemaValidationResult | null>(null);

  const availableSchemaTypes = [
    'Organization', 'WebSite', 'Article', 'Product', 'Event', 'LocalBusiness',
    'Person', 'Recipe', 'VideoObject', 'FAQPage', 'HowTo', 'BreadcrumbList',
    'Review', 'AggregateRating', 'Offer', 'Place', 'PostalAddress'
  ];

  const toggleSchemaType = (type: string) => {
    if (schemaTypes.includes(type)) {
      setSchemaTypes(schemaTypes.filter(t => t !== type));
    } else {
      setSchemaTypes([...schemaTypes, type]);
    }
  };

  const startValidation = async () => {
    if (!url.trim()) return;

    setIsValidating(true);

    // Simulate AI validation delay
    await new Promise(resolve => setTimeout(resolve, 4500));

    // Mock comprehensive schema validation results
    const mockResults: SchemaValidationResult = {
      overallScore: 68,
      grade: 'C',
      summary: {
        totalSchemas: 8,
        validSchemas: 5,
        invalidSchemas: 2,
        warnings: 3,
        richResultsEligible: 3
      },
      schemas: [
        {
          type: 'Organization',
          url: 'https://example.com/',
          isValid: true,
          errors: [],
          warnings: [
            {
              field: 'contactPoint',
              message: 'Consider adding contact information for better rich results',
              severity: 'warning'
            }
          ],
          richResults: {
            eligible: true,
            features: ['Knowledge Panel', 'Local Pack'],
            missing: []
          },
          jsonLd: '{"@context":"https://schema.org","@type":"Organization","name":"Example Corp","url":"https://example.com"}'
        },
        {
          type: 'WebSite',
          url: 'https://example.com/',
          isValid: true,
          errors: [],
          warnings: [],
          richResults: {
            eligible: true,
            features: ['Sitelinks Searchbox'],
            missing: []
          },
          jsonLd: '{"@context":"https://schema.org","@type":"WebSite","name":"Example Corp","url":"https://example.com","potentialAction":{"@type":"SearchAction","target":"https://example.com/search?q={search_term_string}","query-input":"required name=search_term_string"}}'
        },
        {
          type: 'Article',
          url: 'https://example.com/blog/article-1',
          isValid: false,
          errors: [
            {
              field: 'headline',
              message: 'Headline is required for Article schema',
              severity: 'error'
            },
            {
              field: 'author',
              message: 'Author information is missing',
              severity: 'error'
            }
          ],
          warnings: [
            {
              field: 'datePublished',
              message: 'Consider adding publication date',
              severity: 'warning'
            }
          ],
          richResults: {
            eligible: false,
            features: [],
            missing: ['Top stories carousel', 'Article rich result']
          },
          jsonLd: '{"@context":"https://schema.org","@type":"Article","url":"https://example.com/blog/article-1"}'
        },
        {
          type: 'Product',
          url: 'https://example.com/products/widget',
          isValid: true,
          errors: [],
          warnings: [
            {
              field: 'aggregateRating',
              message: 'Product reviews could improve rich results',
              severity: 'warning'
            }
          ],
          richResults: {
            eligible: true,
            features: ['Product rich result', 'Merchant listing'],
            missing: []
          },
          jsonLd: '{"@context":"https://schema.org","@type":"Product","name":"Amazing Widget","offers":{"@type":"Offer","price":"29.99","priceCurrency":"USD"}}'
        },
        {
          type: 'BreadcrumbList',
          url: 'https://example.com/products/widget',
          isValid: true,
          errors: [],
          warnings: [],
          richResults: {
            eligible: true,
            features: ['Breadcrumb rich result'],
            missing: []
          },
          jsonLd: '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://example.com"},{"@type":"ListItem","position":2,"name":"Products","item":"https://example.com/products"}]}'
        },
        {
          type: 'FAQPage',
          url: 'https://example.com/faq',
          isValid: false,
          errors: [
            {
              field: 'mainEntity',
              message: 'FAQ questions and answers are malformed',
              severity: 'error'
            }
          ],
          warnings: [],
          richResults: {
            eligible: false,
            features: [],
            missing: ['FAQ rich result']
          },
          jsonLd: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}'
        },
        {
          type: 'LocalBusiness',
          url: 'https://example.com/',
          isValid: true,
          errors: [],
          warnings: [],
          richResults: {
            eligible: true,
            features: ['Local Pack', 'Knowledge Panel'],
            missing: []
          },
          jsonLd: '{"@context":"https://schema.org","@type":"LocalBusiness","name":"Example Corp","address":{"@type":"PostalAddress","streetAddress":"123 Main St","addressLocality":"Anytown","addressRegion":"CA","postalCode":"12345"}}'
        }
      ],
      recommendations: [
        {
          priority: 'high',
          type: 'Article',
          message: 'Fix missing required fields in Article schema',
          action: 'Add headline, author, and publication date to all articles'
        },
        {
          priority: 'high',
          type: 'FAQPage',
          message: 'Correct FAQ schema structure for rich results eligibility',
          action: 'Fix mainEntity array with proper question/answer pairs'
        },
        {
          priority: 'medium',
          type: 'Product',
          message: 'Add aggregate ratings to improve product rich results',
          action: 'Include review and rating data in Product schema'
        },
        {
          priority: 'medium',
          type: 'Organization',
          message: 'Add contact information for enhanced knowledge panel',
          action: 'Include contactPoint with telephone and email'
        },
        {
          priority: 'low',
          type: 'Article',
          message: 'Add image and video schema for richer article results',
          action: 'Include image and videoObject in Article markup'
        }
      ],
      missingSchemas: [
        {
          type: 'SearchAction',
          importance: 'high',
          description: 'Enables sitelinks search box in search results',
          benefits: ['Increased search result real estate', 'Better user experience', 'Higher click-through rates']
        },
        {
          type: 'SiteNavigationElement',
          importance: 'medium',
          description: 'Helps search engines understand site structure',
          benefits: ['Better crawling', 'Improved search appearance', 'Enhanced navigation understanding']
        },
        {
          type: 'Social Media Profiles',
          importance: 'medium',
          description: 'Connects your online presence across platforms',
          benefits: ['Enhanced knowledge panel', 'Social signals boost', 'Brand authority signals']
        },
        {
          type: 'Logo',
          importance: 'low',
          description: 'Displays your logo in search results and knowledge panel',
          benefits: ['Brand recognition', 'Professional appearance', 'Knowledge panel enhancement']
        }
      ],
      seoImpact: {
        richSnippets: 3,
        knowledgePanel: true,
        localPack: true,
        featuredSnippet: false,
        voiceSearch: true
      }
    };

    setResults(mockResults);
    setIsValidating(false);
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'error') return 'text-red-400';
    if (severity === 'warning') return 'text-yellow-400';
    return 'text-green-400';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'text-red-400';
    if (priority === 'medium') return 'text-yellow-400';
    return 'text-green-400';
  };

  const getImportanceColor = (importance: string) => {
    if (importance === 'high') return 'text-red-400';
    if (importance === 'medium') return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-slate-100">
      {/* Matrix background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(var(--blue-glow) 1px, transparent 1px), linear-gradient(90deg, var(--blue-glow) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-accent hover:text-blue-primary transition-colors mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span style={{ fontFamily: 'Orbitron, sans-serif' }}>Back to Tools</span>
          </Link>
        </div>

        <header className="text-center py-12 mb-12 border-2 border-blue-primary rounded-xl bg-blue-primary/5 shadow-[0_0_30px_var(--blue-glow)]">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-6xl">🔍</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              SCHEMA MARKUP VALIDATOR
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            VALIDATE STRUCTURED DATA FOR RICH RESULTS & SEO ENHANCEMENT
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* URL & Settings */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                VALIDATION CONFIGURATION
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    WEBSITE URL *
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-blue-accent mb-2">
                    CRAWL DEPTH
                  </label>
                  <select
                    value={crawlDepth}
                    onChange={(e) => setCrawlDepth(e.target.value)}
                    className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    <option value="1">Homepage Only</option>
                    <option value="2">2 Levels Deep</option>
                    <option value="3">3 Levels Deep</option>
                    <option value="5">5 Levels Deep</option>
                  </select>
                </div>

                <button
                  onClick={startValidation}
                  disabled={isValidating || !url.trim()}
                  className="w-full bg-blue-accent hover:bg-blue-bright disabled:bg-slate-600 text-black font-bold py-4 px-8 rounded-lg transition-colors tracking-widest uppercase disabled:cursor-not-allowed"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {isValidating ? 'VALIDATING SCHEMAS...' : 'START SCHEMA VALIDATION'}
                </button>
              </div>
            </div>

            {/* Schema Types */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h3 className="text-xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                SCHEMA TYPES TO CHECK
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {availableSchemaTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={schemaTypes.includes(type)}
                      onChange={() => toggleSchemaType(type)}
                      className="rounded border-blue-primary/50 bg-background text-blue-accent focus:ring-blue-accent"
                    />
                    <span className="text-slate-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <h2 className="text-2xl font-bold text-blue-accent mb-6" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              VALIDATION RESULTS
            </h2>

            {results ? (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {/* Overall Score */}
                <div className="bg-blue-primary/10 border border-blue-primary/30 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      SCHEMA HEALTH SCORE
                    </h3>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${results.overallScore >= 80 ? 'text-green-400' : results.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {results.grade}
                      </div>
                      <div className={`text-sm ${results.overallScore >= 80 ? 'text-green-400' : results.overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {results.overallScore}/100
                      </div>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-blue-accent">{results.summary.totalSchemas}</div>
                      <div className="text-xs text-slate-400">Total Schemas</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-green-400">{results.summary.validSchemas}</div>
                      <div className="text-xs text-slate-400">Valid</div>
                    </div>
                    <div className="bg-slate-800/30 rounded p-2">
                      <div className="text-lg font-bold text-red-400">{results.summary.invalidSchemas}</div>
                      <div className="text-xs text-slate-400">Invalid</div>
                    </div>
                  </div>
                </div>

                {/* SEO Impact */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    SEO IMPACT & RICH RESULTS
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-slate-900/30 rounded p-2">
                      <div className="text-green-400 font-bold">✓ Knowledge Panel</div>
                      <div className="text-slate-400 text-xs">Enhanced brand visibility</div>
                    </div>
                    <div className="bg-slate-900/30 rounded p-2">
                      <div className="text-green-400 font-bold">✓ Local Pack</div>
                      <div className="text-slate-400 text-xs">Local search prominence</div>
                    </div>
                    <div className="bg-slate-900/30 rounded p-2">
                      <div className="text-yellow-400 font-bold">○ Featured Snippet</div>
                      <div className="text-slate-400 text-xs">Position 0 opportunity</div>
                    </div>
                    <div className="bg-slate-900/30 rounded p-2">
                      <div className="text-green-400 font-bold">✓ Voice Search</div>
                      <div className="text-slate-400 text-xs">Voice assistant optimization</div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-slate-300">
                    <strong>Rich Snippets Eligible:</strong> {results.summary.richResultsEligible} schema types
                  </div>
                </div>

                {/* Schema Details */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    SCHEMA VALIDATION DETAILS
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {results.schemas.map((schema, i) => (
                      <div key={i} className="bg-slate-900/30 rounded p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-blue-accent">{schema.type}</span>
                          <div className="flex gap-2">
                            {schema.isValid ? (
                              <span className="text-green-400 text-sm px-2 py-1 rounded bg-slate-800/50">VALID</span>
                            ) : (
                              <span className="text-red-400 text-sm px-2 py-1 rounded bg-slate-800/50">INVALID</span>
                            )}
                            {schema.richResults.eligible && (
                              <span className="text-blue-400 text-sm px-2 py-1 rounded bg-slate-800/50">RICH</span>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 mb-2 truncate">{schema.url}</div>

                        {/* Errors */}
                        {schema.errors.length > 0 && (
                          <div className="mb-2">
                            {schema.errors.map((error, j) => (
                              <div key={j} className="text-xs bg-red-900/20 border border-red-500/30 rounded p-2 mb-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-red-400">{error.field}</span>
                                  <span className={`text-xs ${getSeverityColor(error.severity)}`}>{error.severity.toUpperCase()}</span>
                                </div>
                                <div className="text-slate-300">{error.message}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Warnings */}
                        {schema.warnings.length > 0 && (
                          <div className="mb-2">
                            {schema.warnings.map((warning, j) => (
                              <div key={j} className="text-xs bg-yellow-900/20 border border-yellow-500/30 rounded p-2 mb-1">
                                <div className="text-yellow-400 font-bold">{warning.field}:</div>
                                <div className="text-slate-300">{warning.message}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Rich Results */}
                        {schema.richResults.features.length > 0 && (
                          <div className="text-xs text-green-400">
                            <strong>Rich Features:</strong> {schema.richResults.features.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    RECOMMENDATIONS
                  </h3>
                  <div className="space-y-2">
                    {results.recommendations.map((rec, i) => (
                      <div key={i} className="text-sm bg-slate-900/30 rounded p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold">{rec.type}</span>
                          <span className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority.toUpperCase()}</span>
                        </div>
                        <div className="text-slate-300 text-xs mb-1">{rec.message}</div>
                        <div className="text-blue-accent text-xs"><strong>Action:</strong> {rec.action}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Schemas */}
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-accent mb-3" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    MISSING SCHEMA OPPORTUNITIES
                  </h3>
                  <div className="space-y-2">
                    {results.missingSchemas.map((missing, i) => (
                      <div key={i} className="text-sm bg-slate-900/30 rounded p-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold">{missing.type}</span>
                          <span className={`text-xs ${getImportanceColor(missing.importance)}`}>{missing.importance.toUpperCase()}</span>
                        </div>
                        <div className="text-slate-400 text-xs mb-1">{missing.description}</div>
                        <div className="text-slate-300 text-xs">
                          <strong>Benefits:</strong> {missing.benefits.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                {isValidating ? (
                  <div>
                    <div className="text-6xl mb-4">🔍</div>
                    <div className="text-blue-accent font-bold text-xl mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      VALIDATING SCHEMA MARKUP...
                    </div>
                    <div className="text-slate-400 text-sm">
                      AI is analyzing structured data, checking validity, and identifying rich result opportunities
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4">📋</div>
                    <p className="text-slate-400">
                      Enter a website URL to validate schema markup and check rich results eligibility
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>SCHEMA MARKUP VALIDATOR | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}