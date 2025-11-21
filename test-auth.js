#!/usr/bin/env node

// Simple test script to verify authentication flow
import fetch from 'node-fetch';

async function testAuthFlow() {
  console.log('Testing authentication flow...');

  try {
    // Test login endpoint
    console.log('Testing login endpoint...');
    const loginResponse = await fetch('http://localhost:3000/api/auth/sql/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful:', loginData);

      // Test session persistence by checking /me endpoint
      console.log('Testing session persistence...');
      const meResponse = await fetch('http://localhost:3000/api/auth/sql/me', {
        headers: {
          'Cookie': loginResponse.headers.get('set-cookie') || ''
        }
      });

      if (meResponse.ok) {
        const meData = await meResponse.json();
        console.log('✅ Session persistence works:', meData);
      } else {
        console.log('❌ Session persistence failed');
      }
    } else {
      const errorData = await loginResponse.json().catch(() => ({}));
      console.log('ℹ️  Login failed (expected for test user):', errorData.message || 'Unknown error');
    }

    console.log('✅ Authentication flow test completed');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAuthFlow();