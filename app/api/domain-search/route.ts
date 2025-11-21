'use server';

import { NextRequest, NextResponse } from 'next/server';

interface DomainResult {
  domain: string;
  available: boolean;
  premium: boolean;
  price?: number;
}

export async function POST(request: NextRequest) {
  try {
    const { domain } = await request.json();

    if (!domain) {
      return NextResponse.json(
        { error: 'Domain name is required' },
        { status: 400 }
      );
    }

    // Get API credentials from environment variables
    const apiKey = process.env.NAME_COM_API_KEY;
    const username = process.env.NAME_COM_USERNAME;
    const isProduction = process.env.NODE_ENV === 'production';
    const forceRealApi = process.env.FORCE_REAL_DOMAIN_API === 'true';

    // In development, return mock data unless FORCE_REAL_DOMAIN_API is set
    if (!isProduction && !forceRealApi) {
      console.log('Development mode: Returning mock domain data (set FORCE_REAL_DOMAIN_API=true to use real API)');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock responses for different TLDs
      const tlds = ['.com', '.net', '.org', '.io', '.co', '.app'];
      const results = tlds.map(tld => {
        const fullDomain = domain.toLowerCase().replace(/^\.+|\.+$/g, '') + tld;
        // Simple mock logic: assume domains with numbers are available
        const available = Math.random() > 0.7; // 30% chance of being available
        const premium = Math.random() > 0.9; // 10% chance of being premium

        return {
          domain: fullDomain,
          available,
          premium,
          price: premium ? Math.floor(Math.random() * 500) + 100 : undefined,
        };
      });

      return NextResponse.json(results);
    }

    if (!apiKey || !username) {
      console.error('Name.com API credentials not configured');
      return NextResponse.json(
        { error: 'Domain search service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Check multiple TLDs in production
    const tlds = ['.com', '.net', '.org', '.io', '.co', '.app'];
    const results: DomainResult[] = [];

    // Try Name.com API first
    const baseDomain = domain.toLowerCase().replace(/^\.+|\.+$/g, '');
    const nameComUrl = `https://api.name.com/api/domain/check?domain=${encodeURIComponent(baseDomain)}`;

    try {
      console.log('Trying Name.com API...');
      const response = await fetch(nameComUrl, {
        method: 'GET',
        headers: {
          'Api-Key': apiKey,
          'Api-Username': username,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const apiResponse = await response.json();
        console.log('Name.com API response:', JSON.stringify(apiResponse, null, 2));

        // Check if we got valid availability data
        let hasValidData = false;
        if (apiResponse.domains) {
          for (const tld of tlds) {
            const domainData = apiResponse.domains[tld];
            if (domainData && typeof domainData.avail === 'boolean') {
              hasValidData = true;
              break;
            }
          }
        }

        if (hasValidData) {
          // Use Name.com data
          for (const tld of tlds) {
            const domainData = apiResponse.domains[tld];
            if (domainData) {
              results.push({
                domain: baseDomain + tld,
                available: domainData.avail || false,
                premium: domainData.premium || false,
                price: domainData.price,
              });
            } else {
              results.push({
                domain: baseDomain + tld,
                available: false,
                premium: false,
              });
            }
          }
        } else {
          // Name.com API returned invalid data, fall back to alternative method
          console.log('Name.com API returned invalid data, using fallback...');
          await checkDomainsWithFallback(baseDomain, tlds, results);
        }
      } else {
        console.error('Name.com API error:', response.status, response.statusText);
        await checkDomainsWithFallback(baseDomain, tlds, results);
      }
    } catch (error) {
      console.error('Error calling Name.com API:', error);
      await checkDomainsWithFallback(baseDomain, tlds, results);
    }

    return NextResponse.json(results);

  } catch (error) {
    console.error('Domain search error:', error);
    return NextResponse.json(
      { error: 'Failed to check domain availability' },
      { status: 500 }
    );
  }
}

// Fallback domain checking using DNS lookup (simple availability check)
async function checkDomainsWithFallback(baseDomain: string, tlds: string[], results: DomainResult[]) {
  console.log('Using DNS-based fallback for domain checking...');

  for (const tld of tlds) {
    const fullDomain = baseDomain + tld;

    try {
      // Simple DNS lookup to check if domain resolves
      const dnsResponse = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(fullDomain)}&type=A`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (dnsResponse.ok) {
        const dnsData = await dnsResponse.json();
        // If Answer array exists and has entries, domain likely exists
        // If no Answer array or empty, domain might be available
        const available = !dnsData.Answer || dnsData.Answer.length === 0;
        const premium = false; // Can't determine premium status with DNS

        results.push({
          domain: fullDomain,
          available,
          premium,
          price: undefined,
        });
      } else {
        // Assume available if DNS check fails
        results.push({
          domain: fullDomain,
          available: true,
          premium: false,
        });
      }
    } catch (error) {
      console.error(`DNS check failed for ${fullDomain}:`, error);
      // Assume available if DNS check fails
      results.push({
        domain: fullDomain,
        available: true,
        premium: false,
      });
    }

    // Add small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}