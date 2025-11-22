'use client';

import { useState, useEffect } from 'react';

interface WelcomeMessageProps {
  user: { email?: string; id?: string } | null;
  onClose: () => void;
}

const getUserName = (user: { email?: string; id?: string } | null): string => {
  if (!user) return 'User';
  
  // Try to get name from user object, or extract from email
  if (user.email) {
    // Extract name from email (part before @)
    const emailName = user.email.split('@')[0];
    // Capitalize first letter
    return emailName.charAt(0).toUpperCase() + emailName.slice(1);
  }
  
  return 'User';
};

export default function WelcomeMessage({ user, onClose }: WelcomeMessageProps) {
  const [location, setLocation] = useState<string>('Detecting location...');
  const [show, setShow] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get user's location with better error handling
    const getLocation = async () => {
      if (!navigator.geolocation) {
        console.log('Geolocation not supported');
        setLocation('Unknown location');
        return;
      }

      try {
        // Check if we already have permission
        if (navigator.permissions) {
          const permission = await navigator.permissions.query({ name: 'geolocation' });
          console.log('Geolocation permission state:', permission.state);
          if (permission.state === 'denied') {
            console.log('Geolocation permission denied');
            setLocation('Location access denied');
            return;
          }
        }

        console.log('Requesting geolocation...');
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            if (!mounted) return;

            console.log('Got position:', position.coords);
            try {
              const { latitude, longitude } = position.coords;
              // Use a reverse geocoding service to get location name
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );

              if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
              }

              const data = await response.json();
              console.log('Geocoding response:', data);
              const city = data.city || data.locality || data.localityInfo?.administrative?.[2]?.name;
              const country = data.countryName || data.localityInfo?.administrative?.[0]?.name;
              
              let locationString = 'Unknown location';
              if (city && country) {
                locationString = `${city}, ${country}`;
              } else if (city) {
                locationString = city;
              } else if (country) {
                locationString = country;
              }
              
              if (mounted) {
                setLocation(locationString);
              }
            } catch (error) {
              console.log('Failed to get location name, using coordinates:', error);
              if (mounted) {
                setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
              }
            }
          },
          (error: GeolocationPositionError) => {
            console.log('Geolocation error:', error.code, error.message);
            let errorMessage = 'Location unavailable';
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = 'Location access denied';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = 'Location unavailable';
                break;
              case error.TIMEOUT:
                errorMessage = 'Location request timeout';
                break;
            }
            if (mounted) {
              setLocation(errorMessage);
            }
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
          }
        );
      } catch (error) {
        console.log('Geolocation setup error:', error);
        setLocation('Location error');
      }
    };

    getLocation();

    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      if (mounted) {
        setShow(false);
        onClose();
      }
    }, 5000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right-4 fade-in-0 duration-500">
      <div className="bg-linear-to-r from-blue-600/95 to-purple-600/95 border border-blue-400/30 rounded-xl p-4 shadow-2xl backdrop-blur-md max-w-sm">
        <div className="flex items-start gap-3">
          <div className="text-2xl">👋</div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Welcome back, {getUserName(user)}!
            </h3>
            <p className="text-blue-100 text-sm mb-2">
              You&apos;re logging in from {location}
            </p>
            <p className="text-blue-200 text-xs">
              Hello, {user?.email || 'User'}!
            </p>
          </div>
          <button
            onClick={() => {
              setShow(false);
              onClose();
            }}
            className="text-blue-200 hover:text-white transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="mt-3 bg-blue-500/20 rounded-full h-1">
          <div className="bg-blue-400 h-1 rounded-full animate-pulse" style={{ width: '100%', animation: 'shrink 5s linear forwards' }}></div>
        </div>
      </div>
    </div>
  );
}