'use server';

import { NextRequest, NextResponse } from 'next/server';

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

    // In development, return mock data since Name.com API doesn't work from localhost
    if (!isProduction) {
      console.log('Development mode: Returning mock domain data');

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
    const results = [];

    for (const tld of tlds) {
      const fullDomain = domain.toLowerCase().replace(/^\.+|\.+$/g, '') + tld;

      try {
        // Name.com API endpoint for domain check
        const apiUrl = `https://api.name.com/api/domain/check?domain=${encodeURIComponent(fullDomain)}`;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Api-Key': apiKey,
            'Api-Username': username,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          results.push({
            domain: fullDomain,
            available: data.available || false,
            premium: data.premium || false,
            price: data.price,
          });
        } else {
          console.error(`Name.com API error for ${fullDomain}:`, response.status, response.statusText);
          // Add a fallback result for failed requests
          results.push({
            domain: fullDomain,
            available: false,
            premium: false,
          });
        }
      } catch (error) {
        console.error(`Error checking ${fullDomain}:`, error);
        results.push({
          domain: fullDomain,
          available: false,
          premium: false,
        });
      }
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