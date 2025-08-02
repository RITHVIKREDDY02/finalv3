import crypto from 'crypto';

export interface WingoResult {
  issueNumber: string;
  number: number;
  timestamp: number;
}

export interface WingoPrediction {
  period: string;
  prediction: "BIG" | "SMALL";
  confidence: number;
  countdown: number;
}

export interface WingoVariantConfig {
  typeId: number;
  intervalSeconds: number;
  name: string;
  periodUrl: string;
  resultUrl: string;
}

export const WINGO_VARIANTS: Record<string, WingoVariantConfig> = {
  "30sec": { 
    typeId: 1, 
    intervalSeconds: 30, 
    name: "Wingo 30Sec",
    periodUrl: "https://draw.ar-lottery01.com/WinGo/WinGo_30S.json",
    resultUrl: "https://draw.ar-lottery01.com/WinGo/WinGo_30S/GetHistoryIssuePage.json"
  },
  "1min": { 
    typeId: 2, 
    intervalSeconds: 60, 
    name: "Wingo 1Min",
    periodUrl: "https://draw.ar-lottery01.com/WinGo/WinGo_1M.json",
    resultUrl: "https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json"
  },
  "3min": { 
    typeId: 3, 
    intervalSeconds: 180, 
    name: "Wingo 3Min",
    periodUrl: "https://draw.ar-lottery01.com/WinGo/WinGo_3M.json",
    resultUrl: "https://draw.ar-lottery01.com/WinGo/WinGo_3M/GetHistoryIssuePage.json"
  },
  "5min": { 
    typeId: 4, 
    intervalSeconds: 300, 
    name: "Wingo 5Min",
    periodUrl: "https://draw.ar-lottery01.com/WinGo/WinGo_5M.json",
    resultUrl: "https://draw.ar-lottery01.com/WinGo/WinGo_5M/GetHistoryIssuePage.json"
  }
};

class WingoService {
  private readonly HEADERS = {
    "accept": "application/json, text/plain, */*",
    "authorization": "Bearer ...", // This would need to be configured
    "content-type": "application/json;charset=UTF-8",
    "origin": "https://okwinslots5.com",
    "referer": "https://okwinslots5.com/"
  };

  private lastPredictions: Array<{prediction: string, result: string}> = [];
  private predictionCache: Map<string, WingoPrediction> = new Map();
  private backgroundScheduler: NodeJS.Timeout | null = null;

  private getBigSmall(number: number): "BIG" | "SMALL" {
    return number >= 5 ? "BIG" : "SMALL";
  }

  private generateSignaturePayload() {
    const randomStr = crypto.createHash('md5').update(Math.random().toString()).digest('hex');
    const timestamp = Math.floor(Date.now() / 1000);
    return { randomStr, timestamp };
  }

  private async fetchData(url: string, body?: any): Promise<any> {
    try {
      const timestamp = Date.now();
      const fullUrl = `${url}?ts=${timestamp}`;
      
      const options: RequestInit = {
        method: 'GET',
        headers: {
          "accept": "application/json, text/plain, */*",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      };
      
      const response = await fetch(fullUrl, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      // console.log(`Raw API response from ${url}:`, JSON.stringify(data).substring(0, 200));
      return data;
    } catch (error) {
      console.error(`API request failed for ${url}:`, error);
      return null;
    }
  }

  private analyzeTrend(results: WingoResult[]): "BIG" | "SMALL" {
    if (!results || results.length < 10) {
      return Math.random() > 0.5 ? "BIG" : "SMALL";
    }

    try {
      const lastNumbers = results.slice(0, 10).map(r => r.number);
      let weightedScore = 0;
      
      // Calculate weighted score
      for (let i = 0; i < lastNumbers.length; i++) {
        const weight = i === 0 ? 3 : i === 1 ? 2 : 1;
        weightedScore += this.getBigSmall(lastNumbers[i]) === "BIG" ? weight : -weight;
      }

      // Check for streaks
      let streak = 1;
      for (let i = 1; i < lastNumbers.length; i++) {
        if (this.getBigSmall(lastNumbers[i]) === this.getBigSmall(lastNumbers[i - 1])) {
          streak++;
        } else {
          break;
        }
      }

      // Determine prediction
      let prediction: "BIG" | "SMALL";
      if (streak >= 3) {
        // Break the streak
        prediction = this.getBigSmall(lastNumbers[0]) === "BIG" ? "SMALL" : "BIG";
      } else {
        prediction = weightedScore > 0 ? "BIG" : "SMALL";
      }

      // Anti-loss logic
      if (this.lastPredictions.length >= 3) {
        const last3 = this.lastPredictions.slice(-3);
        if (last3.every(p => p.result === "LOSS" && p.prediction === prediction)) {
          prediction = prediction === "BIG" ? "SMALL" : "BIG";
        }
      }

      return prediction;
    } catch (error) {
      console.error('Trend analysis failed:', error);
      return Math.random() > 0.5 ? "BIG" : "SMALL";
    }
  }

  async getCurrentPeriod(variant: string): Promise<any> {
    const config = WINGO_VARIANTS[variant];
    if (!config) return null;

    try {
      const data = await this.fetchData(config.periodUrl);
      return data?.current || null;
    } catch (error) {
      console.error(`Failed to get current period for ${variant}:`, error);
      return null;
    }
  }

  async getLatestResults(variant: string): Promise<WingoResult[]> {
    const config = WINGO_VARIANTS[variant];
    if (!config) return [];

    try {
      const data = await this.fetchData(config.resultUrl);
      const results = data?.data?.list || [];
      
      // Transform API response to our format
      return results.map((item: any) => ({
        issueNumber: item.issueNumber,
        number: parseInt(item.number),
        timestamp: Date.now() // Use current time since API doesn't provide timestamp
      }));
    } catch (error) {
      console.error(`Failed to get results for ${variant}:`, error);
      return [];
    }
  }

  // Fixed countdown timers that start at specified times
  private calculateFixedCountdown(intervalSeconds: number): number {
    const now = new Date();
    const currentSecond = now.getSeconds();
    
    switch (intervalSeconds) {
      case 30: // Wingo 30Sec: loops 30 → 29 → ... → 1 → 30
        const remaining30 = 30 - (currentSecond % 30);
        return remaining30 === 0 ? 30 : remaining30;
        
      case 60: // Wingo 1Min: loops 60 → 59 → ... → 1 → 60
        const remaining60 = 60 - currentSecond;
        return remaining60 === 0 ? 60 : remaining60;
        
      case 180: // Wingo 3Min: loops 180 → 179 → ... → 1 → 180
        const currentMinute = now.getMinutes();
        const totalSeconds = (currentMinute * 60) + currentSecond;
        const remaining180 = 180 - (totalSeconds % 180);
        return remaining180 === 0 ? 180 : remaining180;
        
      case 300: // Wingo 5Min: loops 300 → 299 → ... → 1 → 300
        const currentMinute5 = now.getMinutes();
        const totalSeconds5 = (currentMinute5 * 60) + currentSecond;
        const remaining300 = 300 - (totalSeconds5 % 300);
        return remaining300 === 0 ? 300 : remaining300;
        
      default:
        return intervalSeconds;
    }
  }

  async generatePrediction(variant: string): Promise<WingoPrediction | null> {
    try {
      const [currentPeriod, results] = await Promise.all([
        this.getCurrentPeriod(variant),
        this.getLatestResults(variant)
      ]);

      const prediction = this.analyzeTrend(results);
      const config = WINGO_VARIANTS[variant];
      
      // Use fixed countdown based on timer loops
      const countdown = this.calculateFixedCountdown(config.intervalSeconds);
      
      // Generate period ID based on current time and interval
      const now = new Date();
      const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const periodId = `${istTime.getFullYear()}${(istTime.getMonth() + 1).toString().padStart(2, '0')}${istTime.getDate().toString().padStart(2, '0')}${istTime.getHours().toString().padStart(2, '0')}${istTime.getMinutes().toString().padStart(2, '0')}${Math.floor(istTime.getSeconds() / config.intervalSeconds).toString().padStart(3, '0')}`;

      return {
        period: currentPeriod?.issueNumber || periodId,
        prediction,
        confidence: 85 + Math.floor(Math.random() * 10), // 85-95%
        countdown
      };
    } catch (error) {
      console.error('Prediction generation failed:', error);
      return null;
    }
  }

  // Mock prediction for development when API is not available
  generateMockPrediction(variant: string): WingoPrediction {
    const config = WINGO_VARIANTS[variant];
    const countdown = this.calculateFixedCountdown(config.intervalSeconds);
    
    const now = new Date();
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    const periodId = `${istTime.getFullYear()}${(istTime.getMonth() + 1).toString().padStart(2, '0')}${istTime.getDate().toString().padStart(2, '0')}${istTime.getHours().toString().padStart(2, '0')}${istTime.getMinutes().toString().padStart(2, '0')}${Math.floor(istTime.getSeconds() / config.intervalSeconds).toString().padStart(3, '0')}`;
    
    return {
      period: periodId,
      prediction: Math.random() > 0.5 ? "BIG" : "SMALL",
      confidence: 85 + Math.floor(Math.random() * 10),
      countdown
    };
  }

  // Background scheduler methods
  private async runBackgroundPredictions(): Promise<void> {
    console.log('🔄 Running background predictions for all variants...');
    
    // Generate predictions for all variants simultaneously
    const variants = Object.keys(WINGO_VARIANTS);
    const promises = variants.map(async (variant) => {
      try {
        const prediction = await this.generatePrediction(variant);
        if (prediction) {
          this.predictionCache.set(variant, prediction);
          console.log(`✅ Updated ${variant} prediction: ${prediction.prediction} (${prediction.countdown}s)`);
        }
      } catch (error) {
        console.error(`❌ Failed to update ${variant} prediction:`, error);
      }
    });
    
    await Promise.all(promises);
  }

  // Get cached prediction or generate new one
  async getCachedPrediction(variant: string): Promise<WingoPrediction | null> {
    // Return cached prediction if available
    if (this.predictionCache.has(variant)) {
      const cached = this.predictionCache.get(variant)!;
      // Update countdown in real-time
      const config = WINGO_VARIANTS[variant];
      cached.countdown = this.calculateFixedCountdown(config.intervalSeconds);
      return cached;
    }
    
    // Generate new prediction if not cached
    return await this.generatePrediction(variant);
  }

  // Start background scheduler at 5:30 PM
  startBackgroundScheduler(): void {
    console.log('🚀 Starting background prediction scheduler...');
    
    // Run predictions immediately
    this.runBackgroundPredictions();
    
    // Set up interval to run every minute (60000ms)
    this.backgroundScheduler = setInterval(() => {
      this.runBackgroundPredictions();
    }, 60000);
    
    console.log('⏰ Background scheduler started - predictions will run every minute');
  }

  // Stop background scheduler
  stopBackgroundScheduler(): void {
    if (this.backgroundScheduler) {
      clearInterval(this.backgroundScheduler);
      this.backgroundScheduler = null;
      console.log('⏹️ Background scheduler stopped');
    }
  }
}

export const wingoService = new WingoService();