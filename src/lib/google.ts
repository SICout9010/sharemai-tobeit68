// Google Maps API configuration
import { PUBLIC_GOOGLE_API_KEY } from '$env/static/public'

export interface GoogleMapsConfig {
  apiKey: string;
  center: { lat: number; lng: number };
  zoom: number;
}

export const defaultConfig: GoogleMapsConfig = {
  apiKey: PUBLIC_GOOGLE_API_KEY,
  center: { lat: 13.748782, lng: 100.5062401 },
  zoom: 12
};

// Load Google Maps API
export const loadGoogleMaps = () => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${PUBLIC_GOOGLE_API_KEY}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  return new Promise((resolve) => {
    script.onload = resolve;
  });
};