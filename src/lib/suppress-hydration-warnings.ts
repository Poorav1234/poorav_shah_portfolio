/**
 * Hydration Warning Suppressor
 * Temporarily suppresses specific hydration warnings in development
 * NOT recommended for production - use for debugging only
 */

export function suppressHydrationWarnings() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Store original console.error
    const originalConsoleError = console.error;
    
    // Override console.error to filter out known hydration warnings
    console.error = (...args) => {
      const message = args[0];
      
      // Check if it's a hydration warning we want to suppress
      if (
        typeof message === 'string' && 
        (
          message.includes('Extra attributes from the server:') ||
          message.includes('did not match') ||
          message.includes('fdprocessedid')
        )
      ) {
        // Optionally log to a different channel for monitoring
        // console.debug('[SUPPRESSED HYDRATION WARNING]:', ...args);
        return;
      }
      
      // Pass through all other errors
      originalConsoleError(...args);
    };
  }
}