export const environment = {
  production: true,
  apiUrl: process.env.PRODUCTION_API_URL || 'https://fallback-api-url.com/api' // Use environment variable or fallback
};