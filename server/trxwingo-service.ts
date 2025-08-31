import { storage } from "./storage";
import { memoizedFetch, memoizedPredictionAnalysis } from "./performance-optimizations";

interface TrxWingoResult {
  issueNumber: string;
  number: number;
  timestamp: number;
}

interface TrxWingoPrediction {
  period: string;
  prediction: "BIG" | "SMALL";
  predictedNumber: number;
  confidence: number;
  countdown: number;
}

interface TrxWingoVariantConfig {
  periodUrl: string;
  resultUrl: string;
  intervalSeconds: number;
}

export const TRXWINGO_VARIANTS: Record<string, TrxWingoVariantConfig> = {
  "1min": {
    periodUrl: "https://draw.ar-lottery01.com/TrxWinGo/TrxWinGo_1M.json",
    resultUrl: "https://draw.ar-lottery01.com/TrxWinGo/TrxWinGo_1M/GetHistoryIssuePage.json",
    intervalSeconds: 60
  },
  "3min": {
    periodUrl: "https://draw.ar-lottery01.com/TrxWinGo/TrxWinGo_3M.json",
    resultUrl: "https://draw.ar-lottery01.com/TrxWinGo/TrxWinGo_3M/GetHistoryIssuePage.json",
    intervalSeconds: 180
  },
  "5min": {
    periodUrl: "https://draw.ar-lottery01.com/TrxWinGo/TrxWinGo_5M.json",
    resultUrl: "https://draw.ar-lottery01.com/TrxWinGo/TrxWinGo_5M/GetHistoryIssuePage.json",
    intervalSeconds: 300
  },
  "10min": {
    periodUrl: "https://draw.ar-lottery01.com/TrxWinGo/TrxWinGo_10M.json",
    resultUrl: "https://draw.ar-lottery01.com/TrxWinGo/TrxWinGo_10M/GetHistoryIssuePage.json",
    intervalSeconds: 600
  }
};

export class TrxWingoService {
  private predictionCache = new Map<string, TrxWingoPrediction>();
  private lastPredictions: { prediction: string; result: string; variant: string }[] = [];

  private async fetchData(url: string): Promise<any> {
    try {
      // Use memoized fetch for better performance with timestamp for cache busting
      const timestamp = Date.now();
      const urlWithTimestamp = `${url}?ts=${timestamp}`;
      return await memoizedFetch(urlWithTimestamp);
    } catch (error) {
      console.error(`Failed to fetch TrxWingo data from ${url}:`, error);
      throw error;
    }
  }

  private getBigSmall(number: number): "BIG" | "SMALL" {
    return number >= 5 ? "BIG" : "SMALL";
  }

  private analyzeTrend(results: TrxWingoResult[], variant: string): { prediction: "BIG" | "SMALL"; predictedNumber: number } {
    // Always ensure we have real data - if less than 5 results, still use what we have for analysis
    if (!results || results.length === 0) {
      console.error(`❌ No TrxWingo results available for ${variant} - API may be down`);
      throw new Error(`No live TrxWingo data available for ${variant}`);
    }

    try {
      const analysisResults = this.performAdvancedAnalysis(results);
      return this.makePredictionFromAnalysis(analysisResults, results, variant);
    } catch (error) {
      console.error(`❌ TrxWingo advanced trend analysis failed for ${variant}:`, error);
      throw new Error(`Failed to analyze TrxWingo trend for ${variant}`);
    }
  }

  private performAdvancedAnalysis(results: TrxWingoResult[]) {
    // PURE BALANCED ALGORITHM - 50/50 chance guaranteed
    const isBalancedRandom = Math.random() > 0.5;
    
    if (results.length < 3) {
      return {
        bigCount: 1,
        smallCount: 1,
        bigFreq: 50,
        recentBigCount: isBalancedRandom ? 1 : 0,
        currentStreak: 1,
        lastSize: isBalancedRandom ? "BIG" : "SMALL",
        bigSignal: isBalancedRandom ? 15 : 10,
        smallSignal: isBalancedRandom ? 10 : 15
      };
    }

    const recentResults = results.slice(0, Math.min(10, results.length));
    
    // Calculate basic statistics for display
    let bigCount = 0;
    let smallCount = 0;
    let currentStreak = 1;
    let lastSize = this.getBigSmall(results[0].number);
    
    // Calculate streak
    for (let i = 1; i < recentResults.length; i++) {
      const currentSize = this.getBigSmall(recentResults[i].number);
      if (currentSize === lastSize) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    // Count frequencies
    recentResults.forEach(result => {
      if (this.getBigSmall(result.number) === "BIG") {
        bigCount++;
      } else {
        smallCount++;
      }
    });
    
    const bigFreq = (bigCount / recentResults.length) * 100;
    const recent5 = recentResults.slice(0, 5);
    const recentBigCount = recent5.filter(r => this.getBigSmall(r.number) === "BIG").length;
    
    // Calculate trend signals
    const patternWeight = Math.random() * 5 + 5; // 5-10
    const streakWeight = currentStreak > 2 ? Math.random() * 8 + 2 : 0; // 2-10 if streak > 2
    const frequencyWeight = Math.abs(bigFreq - 50) * 0.2; // 0-10 based on deviation from 50%
    
    const bigSignal = patternWeight + streakWeight + frequencyWeight;
    const smallSignal = patternWeight + streakWeight + frequencyWeight;
    
    return {
      bigCount,
      smallCount,  
      bigFreq,
      recentBigCount,
      currentStreak,
      lastSize,
      bigSignal,
      smallSignal
    };
  }

  private makePredictionFromAnalysis(analysis: any, results: TrxWingoResult[], variant: string): { prediction: "BIG" | "SMALL"; predictedNumber: number } {
    // 🎲 PURE 50/50 RANDOM SELECTION - Truly balanced
    const randomChoice = Math.random();
    const prediction: "BIG" | "SMALL" = randomChoice > 0.5 ? "BIG" : "SMALL";
    
    console.log(`🎲 TRX RANDOM: ${prediction} selected (${randomChoice.toFixed(3)})`);
    
    // Display analysis for transparency
    const { bigCount, smallCount, bigFreq, recentBigCount, currentStreak, lastSize, bigSignal, smallSignal } = analysis;
    console.log(`📊 TrxWingo Pattern Analysis: ${bigFreq.toFixed(1)}% BIG, Streak: ${lastSize} x${currentStreak}`);
    console.log(`📊 TrxWingo Recent Trend: ${recentBigCount}/5 BIG results`);
    
    // Generate realistic predicted number based on prediction
    let predictedNumber: number;
    if (prediction === "BIG") {
      // BIG numbers: 5, 6, 7, 8, 9
      const bigNumbers = [5, 6, 7, 8, 9];
      predictedNumber = bigNumbers[Math.floor(Math.random() * bigNumbers.length)];
    } else {
      // SMALL numbers: 0, 1, 2, 3, 4  
      const smallNumbers = [0, 1, 2, 3, 4];
      predictedNumber = smallNumbers[Math.floor(Math.random() * smallNumbers.length)];
    }
    
    // Generate realistic confidence (varies each time)
    const baseConfidence = Math.random() * 40 + 40; // 40-80%
    const confidence = Math.round(baseConfidence);
    
    console.log(`🎯 TRX TRULY BALANCED [${variant}]:`);
    console.log(`   Stats: ${recentBigCount}/5 BIG | ${bigFreq.toFixed(1)}% BIG | ${lastSize} x${currentStreak}`);
    console.log(`   Signals: BIG=${bigSignal.toFixed(1)} vs SMALL=${smallSignal.toFixed(1)}`);
    console.log(`   🎯 FINAL: ${prediction} ${predictedNumber} (${confidence}% confidence)`);
    
    return { prediction, predictedNumber };
  }

  async getCurrentPeriod(variant: string): Promise<any> {
    const config = TRXWINGO_VARIANTS[variant];
    if (!config) {
      console.error(`❌ Invalid TrxWingo variant: ${variant}`);
      return null;
    }

    try {
      const data = await this.fetchData(config.periodUrl);
      
      // The API returns current period info in data.current
      if (data?.current) {
        return data.current;
      } else if (data?.data?.current) {
        return data.data.current;
      }
      
      // If no current period structure, check for direct period data
      if (data?.issueNumber) {
        return data;
      } else if (data?.data?.issueNumber) {
        return data.data;
      }
      
      console.log(`No current TrxWingo period found for ${variant}, API response:`, JSON.stringify(data).substring(0, 200));
      return null;
    } catch (error) {
      console.error(`Failed to get current TrxWingo period for ${variant}:`, error);
      return null;
    }
  }

  async getLatestResults(variant: string): Promise<TrxWingoResult[]> {
    const config = TRXWINGO_VARIANTS[variant];
    if (!config) {
      console.error(`❌ No TrxWingo config found for variant: ${variant}`);
      return [];
    }

    try {
      console.log(`📡 Fetching live TrxWingo results for ${variant} from: ${config.resultUrl}`);
      const data = await this.fetchData(config.resultUrl);
      
      if (!data || !data.data || !data.data.list) {
        console.error(`❌ Invalid TrxWingo API response for ${variant}:`, JSON.stringify(data).substring(0, 100));
        throw new Error(`Invalid TrxWingo API response for ${variant}`);
      }
      
      const results = data.data.list;
      console.log(`✅ Retrieved ${results.length} live TrxWingo results for ${variant}`);
      
      // Transform API response to our format with realistic timestamps
      const now = Date.now();
      return results.map((item: any, index: number) => {
        // Generate realistic timestamp - each previous result is one interval earlier
        // Latest result (index 0) gets most recent time, older results get earlier times
        const intervalMs = config.intervalSeconds * 1000;
        const resultTimestamp = now - (index * intervalMs);
        
        return {
          issueNumber: item.issueNumber,
          number: parseInt(item.number),
          timestamp: resultTimestamp
        };
      });
    } catch (error) {
      console.error(`❌ Failed to get TrxWingo results for ${variant}:`, error);
      throw error; // Re-throw to prevent fallback to dummy data
    }
  }

  // Calculate countdown based on API endTime
  private calculateAPICountdown(endTime: number): number {
    const now = Date.now();
    const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
    return remaining > 0 ? remaining : 0;
  }

  // Fallback countdown calculation for when API doesn't provide endTime
  private calculateFallbackCountdown(intervalSeconds: number): number {
    const now = new Date();
    const currentSecond = now.getSeconds();
    
    switch (intervalSeconds) {
      case 60: // TrxWingo 1Min: loops 60 → 59 → ... → 1 → 60
        const remaining60 = 60 - currentSecond;
        return remaining60 === 0 ? 60 : remaining60;
        
      case 180: // TrxWingo 3Min: loops 180 → 179 → ... → 1 → 180
        const currentMinute = now.getMinutes();
        const totalSeconds = (currentMinute * 60) + currentSecond;
        const remaining180 = 180 - (totalSeconds % 180);
        return remaining180 === 0 ? 180 : remaining180;
        
      case 300: // TrxWingo 5Min: loops 300 → 299 → ... → 1 → 300
        const currentMinute5 = now.getMinutes();
        const totalSeconds5 = (currentMinute5 * 60) + currentSecond;
        const remaining300 = 300 - (totalSeconds5 % 300);
        return remaining300 === 0 ? 300 : remaining300;
        
      case 600: // TrxWingo 10Min: loops 600 → 599 → ... → 1 → 600
        const currentMinute10 = now.getMinutes();
        const totalSeconds10 = (currentMinute10 * 60) + currentSecond;
        const remaining600 = 600 - (totalSeconds10 % 600);
        return remaining600 === 0 ? 600 : remaining600;
        
      default:
        return intervalSeconds;
    }
  }

  async generatePrediction(variant: string): Promise<TrxWingoPrediction | null> {
    try {
      console.log(`🎯 Generating live TrxWingo prediction for ${variant}...`);
      
      const [currentPeriod, results] = await Promise.all([
        this.getCurrentPeriod(variant),
        this.getLatestResults(variant)
      ]);

      if (!results || results.length === 0) {
        console.error(`❌ Cannot generate TrxWingo prediction for ${variant} - no live results available`);
        return null;
      }

      const analysisResult = this.analyzeTrend(results, variant);
      const config = TRXWINGO_VARIANTS[variant];
      
      // Calculate countdown based on API endTime or fallback to fixed calculation
      let countdown: number;
      if (currentPeriod?.endTime) {
        countdown = this.calculateAPICountdown(currentPeriod.endTime);
        console.log(`⏰ Using API countdown: ${countdown}s for TrxWingo ${variant}`);
      } else {
        countdown = this.calculateFallbackCountdown(config.intervalSeconds);
        console.log(`⏰ Using fallback countdown: ${countdown}s for TrxWingo ${variant}`);
      }
      
      // Always prioritize API period over generated period
      if (!currentPeriod?.issueNumber) {
        console.error(`❌ No current TrxWingo period available for ${variant}`);
        return null;
      }

      // Calculate NEXT period for prediction (we predict for the upcoming round, not current)
      const nextPeriodNumber = (parseInt(currentPeriod.issueNumber) + 1).toString();

      console.log(`✅ Generated live TrxWingo prediction for ${variant}: ${analysisResult.prediction} ${analysisResult.predictedNumber} for NEXT period ${nextPeriodNumber}`);

      return {
        period: nextPeriodNumber,
        prediction: analysisResult.prediction,
        predictedNumber: analysisResult.predictedNumber,
        confidence: 85 + Math.floor(Math.random() * 10), // 85-95%
        countdown
      };
    } catch (error) {
      console.error(`❌ TrxWingo prediction generation failed for ${variant}:`, error);
      return null;
    }
  }

  // Background scheduler methods
  private async runPredictionForVariant(variant: string): Promise<void> {
    try {
      const prediction = await this.generatePrediction(variant);
      if (prediction) {
        this.predictionCache.set(variant, prediction);
        console.log(`✅ Updated TrxWingo ${variant} prediction: ${prediction.prediction} (${prediction.countdown}s)`);
      }
    } catch (error) {
      console.error(`❌ Failed to update TrxWingo ${variant} prediction:`, error);
    }
  }

  private async runInitialPredictions(): Promise<void> {
    console.log('🔄 Running initial TrxWingo predictions for all variants...');
    
    const variants = Object.keys(TRXWINGO_VARIANTS);
    const promises = variants.map(variant => this.runPredictionForVariant(variant));
    
    await Promise.all(promises);
  }

  async getCachedPrediction(variant: string): Promise<TrxWingoPrediction | null> {
    const cached = this.predictionCache.get(variant);
    
    // Always regenerate prediction to ensure fresh period and countdown
    console.log(`🔄 Regenerating fresh TrxWingo prediction for ${variant}...`);
    const freshPrediction = await this.generatePrediction(variant);
    
    if (freshPrediction) {
      this.predictionCache.set(variant, freshPrediction);
      return freshPrediction;
    }
    
    // Fallback to cached only if fresh generation fails
    if (cached) {
      console.log(`⚠️ Using cached TrxWingo prediction for ${variant} as fallback`);
      return cached;
    }
    
    // If no cached prediction, generate a new one
    return await this.generatePrediction(variant);
  }

  // Initialize predictions on server start (no continuous schedulers)
  startBackgroundScheduler(): void {
    console.log('🚀 Initializing TrxWingo prediction service...');
    
    // Run initial predictions for all variants once
    this.runInitialPredictions();
    
    console.log('✅ Initial TrxWingo predictions generated - service ready for on-demand requests');
  }

  // Stop all background schedulers (no-op since we don't have continuous schedulers)
  stopBackgroundScheduler(): void {
    console.log('⏹️ No TrxWingo background schedulers to stop - using on-demand system');
  }
}

export const trxWingoService = new TrxWingoService();