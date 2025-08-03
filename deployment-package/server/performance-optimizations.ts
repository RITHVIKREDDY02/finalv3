// Performance optimizations for VPS deployment
import memoize from 'memoizee';

// API Response caching for prediction data (5 second cache)
export const memoizedFetch = memoize(
  async (url: string): Promise<any> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  },
  {
    maxAge: 5000, // 5 seconds cache
    max: 50, // Maximum 50 cached responses
    promise: true, // Cache promises to prevent duplicate requests
    normalizer: (args) => args[0] // Use URL as cache key
  }
);

// User status caching (10 second cache for approved users)
export const memoizedUserLookup = memoize(
  async (uid: string, lookupFn: (uid: string) => Promise<any>): Promise<any> => {
    return await lookupFn(uid);
  },
  {
    maxAge: 10000, // 10 seconds cache
    max: 100, // Cache up to 100 users
    promise: true,
    normalizer: (args) => args[0] // Use UID as cache key
  }
);

// Prediction algorithm caching (30 second cache)
export const memoizedPredictionAnalysis = memoize(
  (results: any[], variant: string): { prediction: "BIG" | "SMALL"; predictedNumber: number } => {
    // This will be replaced with actual prediction logic
    const random = Math.random();
    const prediction: "BIG" | "SMALL" = random > 0.5 ? "BIG" : "SMALL";
    const predictedNumber = prediction === "BIG" ? Math.floor(Math.random() * 5) + 5 : Math.floor(Math.random() * 5);
    return { prediction, predictedNumber };
  },
  {
    maxAge: 30000, // 30 seconds cache for predictions
    max: 20, // Cache up to 20 prediction analyses
    normalizer: (args) => `${args[1]}-${JSON.stringify(args[0].slice(0, 3))}` // Cache key based on variant and first 3 results
  }
);

// Memory cleanup utility
export class MemoryManager {
  private static instance: MemoryManager;
  private cleanupInterval: NodeJS.Timeout | null = null;

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  startMemoryCleanup(): void {
    // Clear caches every 5 minutes to prevent memory leaks
    this.cleanupInterval = setInterval(() => {
      // Clear memoization caches
      memoizedFetch.clear?.();
      memoizedUserLookup.clear?.();
      memoizedPredictionAnalysis.clear?.();
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      console.log('🧹 Memory cleanup completed');
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  stopMemoryCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

// Request rate limiting for API endpoints
export class RateLimiter {
  private requests = new Map<string, number[]>();
  
  isAllowed(identifier: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Get or create request log for this identifier
    let requestTimes = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    requestTimes = requestTimes.filter(time => time > windowStart);
    
    // Check if under the limit
    if (requestTimes.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    requestTimes.push(now);
    this.requests.set(identifier, requestTimes);
    
    return true;
  }
  
  cleanup(): void {
    const now = Date.now();
    for (const [identifier, times] of Array.from(this.requests.entries())) {
      const validTimes = times.filter((time: number) => time > now - 60000);
      if (validTimes.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, validTimes);
      }
    }
  }
}

export const rateLimiter = new RateLimiter();

// Start memory cleanup on module load
MemoryManager.getInstance().startMemoryCleanup();

// Cleanup rate limiter every minute
setInterval(() => rateLimiter.cleanup(), 60000);