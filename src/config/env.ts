// Environment variables for deployment
// This file is used to provide environment variables for the deployed application
// Values will be replaced during the build process by GitHub Actions

export const ENV = {
  VAPI_API_KEY: import.meta.env.VITE_VAPI_API_KEY || 'a56df263-b54b-4176-96d0-f0a846dd968a',
  VAPI_ASSISTANT_ID_CHUNGUS: import.meta.env.VITE_VAPI_ASSISTANT_ID_CHUNGUS || '177b81f4-bdc2-48a0-ba02-6dd0acf78686',
  VAPI_ASSISTANT_ID_SONIC: import.meta.env.VITE_VAPI_ASSISTANT_ID_SONIC || '994cb777-31cf-4f00-9b88-5d7d48316cfd',
  VAPI_ASSISTANT_ID_SHADOW: import.meta.env.VITE_VAPI_ASSISTANT_ID_SHADOW || 'e18fee62-e6f1-4ab2-b2b1-51c8cd9b4cd4',
  VAPI_ASSISTANT_ID_SPONGEBOB: import.meta.env.VITE_VAPI_ASSISTANT_ID_SPONGEBOB || 'dca02ee5-c677-46f2-91e7-efb180d38939'
};

export default ENV;
