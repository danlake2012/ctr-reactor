'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SchemaField {
  name: string;
  type: string;
  required: boolean;
  value: string;
  description: string;
}

interface SchemaType {
  name: string;
  description: string;
  fields: SchemaField[];
}

export default function SchemaMarkupGenerator() {
  const [selectedType, setSelectedType] = useState('Article');
  const [generatedMarkup, setGeneratedMarkup] = useState('');
  const [copied, setCopied] = useState(false);

  const schemaTypes: SchemaType[] = [
    {
      name: 'Article',
      description: 'News article, blog post, or other written content',
      fields: [
        { name: 'headline', type: 'text', required: true, value: '', description: 'The headline of the article' },
        { name: 'author', type: 'text', required: true, value: '', description: 'The author of the article' },
        { name: 'publisher', type: 'text', required: true, value: '', description: 'The publisher/organization' },
        { name: 'datePublished', type: 'date', required: true, value: '', description: 'Publication date (ISO format)' },
        { name: 'dateModified', type: 'date', required: false, value: '', description: 'Last modified date' },
        { name: 'image', type: 'url', required: false, value: '', description: 'Featured image URL' },
        { name: 'description', type: 'textarea', required: false, value: '', description: 'Article description' },
      ]
    },
    {
      name: 'Product',
      description: 'Physical or digital product for sale',
      fields: [
        { name: 'name', type: 'text', required: true, value: '', description: 'Product name' },
        { name: 'description', type: 'textarea', required: true, value: '', description: 'Product description' },
        { name: 'sku', type: 'text', required: false, value: '', description: 'Stock keeping unit' },
        { name: 'brand', type: 'text', required: false, value: '', description: 'Product brand' },
        { name: 'price', type: 'number', required: false, value: '', description: 'Product price' },
        { name: 'currency', type: 'text', required: false, value: 'USD', description: 'Currency code (USD, EUR, etc.)' },
        { name: 'availability', type: 'select', required: false, value: 'InStock', description: 'Product availability' },
        { name: 'image', type: 'url', required: false, value: '', description: 'Product image URL' },
      ]
    },
    {
      name: 'Event',
      description: 'Event like concert, webinar, or conference',
      fields: [
        { name: 'name', type: 'text', required: true, value: '', description: 'Event name' },
        { name: 'description', type: 'textarea', required: true, value: '', description: 'Event description' },
        { name: 'startDate', type: 'datetime-local', required: true, value: '', description: 'Event start date and time' },
        { name: 'endDate', type: 'datetime-local', required: false, value: '', description: 'Event end date and time' },
        { name: 'location', type: 'text', required: false, value: '', description: 'Event location' },
        { name: 'organizer', type: 'text', required: false, value: '', description: 'Event organizer' },
        { name: 'price', type: 'number', required: false, value: '', description: 'Ticket price' },
        { name: 'currency', type: 'text', required: false, value: 'USD', description: 'Currency code' },
      ]
    },
    {
      name: 'LocalBusiness',
      description: 'Local business with address and contact info',
      fields: [
        { name: 'name', type: 'text', required: true, value: '', description: 'Business name' },
        { name: 'description', type: 'textarea', required: false, value: '', description: 'Business description' },
        { name: 'address', type: 'text', required: false, value: '', description: 'Street address' },
        { name: 'city', type: 'text', required: false, value: '', description: 'City' },
        { name: 'state', type: 'text', required: false, value: '', description: 'State/Province' },
        { name: 'zipCode', type: 'text', required: false, value: '', description: 'ZIP/Postal code' },
        { name: 'telephone', type: 'tel', required: false, value: '', description: 'Phone number' },
        { name: 'email', type: 'email', required: false, value: '', description: 'Email address' },
        { name: 'url', type: 'url', required: false, value: '', description: 'Website URL' },
      ]
    }
  ];

  const currentSchema = schemaTypes.find(type => type.name === selectedType);

  const updateField = (fieldName: string, value: string) => {
    if (currentSchema) {
      const field = currentSchema.fields.find(f => f.name === fieldName);
      if (field) {
        field.value = value;
      }
    }
  };

  const generateMarkup = () => {
    if (!currentSchema) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: { [key: string]: any } = {
      '@context': 'https://schema.org',
      '@type': selectedType,
    };

    // Add required fields
    currentSchema.fields.forEach(field => {
      if (field.value.trim()) {
        if (field.type === 'number') {
          data[field.name] = parseFloat(field.value);
        } else if (field.name === 'price' && selectedType === 'Product') {
          data['offers'] = {
            '@type': 'Offer',
            'price': parseFloat(field.value),
            'priceCurrency': currentSchema.fields.find(f => f.name === 'currency')?.value || 'USD',
            'availability': `https://schema.org/${currentSchema.fields.find(f => f.name === 'availability')?.value || 'InStock'}`
          };
        } else if (field.name === 'currency' || field.name === 'availability') {
          // Skip these as they're handled in offers
        } else if (selectedType === 'LocalBusiness' && ['address', 'city', 'state', 'zipCode'].includes(field.name)) {
          // Handle address for LocalBusiness
          if (!data.address) data.address = { '@type': 'PostalAddress' };
          const addressFieldMap: { [key: string]: string } = {
            address: 'streetAddress',
            city: 'addressLocality',
            state: 'addressRegion',
            zipCode: 'postalCode'
          };
          data.address[addressFieldMap[field.name]] = field.value;
        } else {
          data[field.name] = field.value;
        }
      }
    });

    const markup = `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
    setGeneratedMarkup(markup);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedMarkup);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const validateMarkup = () => {
    // Basic validation - check if required fields are filled
    if (!currentSchema) return;

    const missingRequired = currentSchema.fields
      .filter(field => field.required && !field.value.trim())
      .map(field => field.name);

    if (missingRequired.length > 0) {
      alert(`Please fill in required fields: ${missingRequired.join(', ')}`);
      return;
    }

    alert('Schema markup looks valid! You can now copy and paste it into your HTML.');
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
            <span className="text-6xl">🏷️</span>
            <h1 className="text-5xl font-bold text-blue-accent tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              SCHEMA MARKUP GENERATOR
            </h1>
          </div>
          <p className="text-blue-primary text-lg tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
            GENERATE STRUCTURED DATA FOR RICH SNIPPETS
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Schema Type Selection */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                SELECT SCHEMA TYPE
              </h2>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {schemaTypes.map(type => (
                  <option key={type.name} value={type.name}>{type.name}</option>
                ))}
              </select>
              <p className="text-slate-300 text-sm mt-2">
                {schemaTypes.find(t => t.name === selectedType)?.description}
              </p>
            </div>

            {/* Form Fields */}
            <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
              <h2 className="text-2xl font-bold text-blue-accent mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                FILL IN DETAILS
              </h2>
              <div className="space-y-4">
                {currentSchema?.fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-bold text-blue-accent mb-1">
                      {field.name} {field.required && <span className="text-red-400">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={field.value}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        placeholder={field.description}
                        className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)] h-24"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={field.value}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        <option value="InStock">In Stock</option>
                        <option value="OutOfStock">Out of Stock</option>
                        <option value="PreOrder">Pre Order</option>
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => updateField(field.name, e.target.value)}
                        placeholder={field.description}
                        className="w-full bg-background border border-blue-primary/50 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-accent focus:shadow-[0_0_10px_var(--blue-glow)]"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={generateMarkup}
                  className="bg-blue-accent hover:bg-blue-bright text-black font-bold py-3 px-6 rounded-lg transition-colors tracking-widest uppercase"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  GENERATE MARKUP
                </button>
                <button
                  onClick={validateMarkup}
                  className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-colors tracking-widest uppercase"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  VALIDATE
                </button>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-blue-panel-dark/50 border border-blue-primary/30 rounded-xl p-6 shadow-[0_0_20px_var(--blue-glow)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-accent" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                GENERATED MARKUP
              </h2>
              {generatedMarkup && (
                <button
                  onClick={copyToClipboard}
                  className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {copied ? 'COPIED!' : 'COPY'}
                </button>
              )}
            </div>
            {generatedMarkup ? (
              <pre className="bg-slate-900 border border-slate-600 rounded-lg p-4 text-green-400 text-sm overflow-x-auto font-mono">
                {generatedMarkup}
              </pre>
            ) : (
              <div className="text-center text-slate-400 py-12">
                <p>Fill in the form and click &quot;Generate Markup&quot; to see your structured data here.</p>
              </div>
            )}

            {generatedMarkup && (
              <div className="mt-4 p-4 bg-blue-primary/10 border border-blue-primary/30 rounded-lg">
                <h3 className="text-lg font-bold text-blue-accent mb-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  IMPLEMENTATION INSTRUCTIONS
                </h3>
                <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                  <li>Copy the generated markup above</li>
                  <li>Paste it in the &lt;head&gt; section of your HTML page</li>
                  <li>Test with Google&apos;s Rich Results Test tool</li>
                  <li>Monitor improvements in search appearance</li>
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-blue-accent/60 text-sm" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          <p>SCHEMA MARKUP GENERATOR | CTR-REACTOR v2.0 | &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}