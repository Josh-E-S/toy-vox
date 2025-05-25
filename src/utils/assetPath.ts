/**
 * Helper function to get the correct asset path for both local development and GitHub Pages deployment
 * @param path The asset path (should start without a leading slash)
 * @returns The correct asset path for the current environment
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // In development, use the root path
  // In production with GitHub Pages, use the base path from Vite config
  const basePath = import.meta.env.DEV ? '' : '.';
  
  return `${basePath}/${cleanPath}`;
};

export default getAssetPath;
