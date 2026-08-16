// Radar API configuration
export const RADAR_CONFIG = {
    // Get this from your Radar dashboard (https://dashboard.radar.com/)
    // The publishable key starts with 'pk_' and is safe to use in the browser
    apiKey: process.env.NEXT_PUBLIC_RADAR_API_KEY || '',
    
    // Default location options
    defaultLocation: {
        latitude: 13.736717, // Bangkok coordinates as default
        longitude: 100.523186,
    },
    
    // Autocomplete options
    autocomplete: {
        countries: ['TH', 'US', 'GB', 'JP', 'AU'], // Limit to specific countries
        layers: ['address', 'locality', 'country'], // Search layers
        limit: 10, // Max results
    },
};

// Validate that the API key is set
export const isRadarConfigured = () => {
    return !!RADAR_CONFIG.apiKey && RADAR_CONFIG.apiKey.length > 0;
};