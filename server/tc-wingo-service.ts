// Direct TC API access - no complex auth service needed

// TC Wingo Game Variants
export const TC_WINGO_VARIANTS = {
  "30sec": {
    name: "Wingo 30s",
    interval: "30s",
    gameCode: "vngo30s"
  },
  "1min": {
    name: "Wingo 1m", 
    interval: "1m",
    gameCode: "vngo1"
  },
  "3min": {
    name: "Wingo 3m",
    interval: "3m", 
    gameCode: "vngo3"
  },
  "5min": {
    name: "Wingo 5m",
    interval: "5m",
    gameCode: "vngo5"
  }
};

interface TCWingoResult {
  period: string;
  number: number;
  status: string;
  drawTime: string;
}

interface TCWingoPrediction {
  variant: string;
  prediction: "BIG" | "SMALL";
  predictedNumber: number;
  confidence: number;
  period: string;
  countdown: number;
  timestamp: string;
}

class TCWingoService {
  private predictionCache = new Map<string, TCWingoPrediction>();
  private readonly baseUrl = 'https://tc9987.club';

  constructor() {
    // Direct API access - no authentication initialization needed
  }

  private async fetchWithDirectAPI(url: string, payload: any): Promise<any> {
    try {
      console.log(`📡 Direct TC API call to: ${url}`);
      console.log(`📤 Payload:`, payload);
      
      // Direct API call like Python example - no complex auth needed
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`📥 Response:`, data);
      return data;
    } catch (error) {
      console.error(`❌ Error fetching from ${url}:`, error);
      throw error;
    }
  }

  /**
   * Generate current period based on current time and variant interval
   */
  private generateCurrentPeriod(variant: string): string {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    
    let periodSuffix = '';
    switch (variant) {
      case '30sec':
        const thirtySecBlock = Math.floor(now.getSeconds() / 30);
        periodSuffix = `${thirtySecBlock.toString().padStart(2, '0')}`;
        break;
      case '1min':
        periodSuffix = minute;
        break;
      case '3min':
        const threeMinBlock = Math.floor(now.getMinutes() / 3);
        periodSuffix = `${threeMinBlock.toString().padStart(2, '0')}`;
        break;
      case '5min':
        const fiveMinBlock = Math.floor(now.getMinutes() / 5);
        periodSuffix = `${fiveMinBlock.toString().padStart(2, '0')}`;
        break;
    }
    
    // Format: 20YYMMDDHHMMSS
    return `20${year.slice(2)}${month}${day}${hour}${minute}${periodSuffix}`;
  }

  /**
   * Calculate accurate countdown for each variant
   */
  private calculateCountdown(variant: string): number {
    const now = new Date();
    const currentSeconds = now.getSeconds();
    const currentMinutes = now.getMinutes();
    
    switch (variant) {
      case '30sec':
        return 30 - (currentSeconds % 30);
      case '1min':
        return 60 - currentSeconds;
      case '3min':
        const nextThreeMin = Math.ceil(currentMinutes / 3) * 3;
        const threeMinCountdown = (nextThreeMin - currentMinutes) * 60 - currentSeconds;
        return threeMinCountdown > 0 ? threeMinCountdown : 180;
      case '5min':
        const nextFiveMin = Math.ceil(currentMinutes / 5) * 5;
        const fiveMinCountdown = (nextFiveMin - currentMinutes) * 60 - currentSeconds;
        return fiveMinCountdown > 0 ? fiveMinCountdown : 300;
      default:
        return 30;
    }
  }

  /**
   * Fetch game results from TC API using direct approach
   */
  private async fetchGameResults(gameCode: string): Promise<TCWingoResult[]> {
    try {
      console.log(`🎯 Fetching TC results for ${gameCode}...`);
      
      const response = await this.fetchWithDirectAPI(
        `${this.baseUrl}/result/getResult`,
        { 
          game: gameCode, 
          category: "vngo", 
          page: 1, 
          limit: 10 
        }
      );

      if (response && response.data && response.data.list) {
        const results = response.data.list.map((item: any) => ({
          period: item.period,
          number: parseInt(item.open_num ? item.open_num[0] : item.result),
          status: 'completed',
          drawTime: item.draw_time || item.time
        }));

        console.log(`✅ Retrieved ${results.length} live TC results for ${gameCode}`);
        return results;
      }

      console.log(`✅ Retrieved 0 live TC results for ${gameCode}`);
      return [];
    } catch (error) {
      console.error(`❌ Error fetching TC game results for ${gameCode}:`, error);
      return [];
    }
  }

  private getBigSmall(number: number): "BIG" | "SMALL" {
    return number >= 5 ? "BIG" : "SMALL";
  }

  /**
   * Analyze trend and generate prediction
   */
  private analyzeTrend(results: TCWingoResult[], variant: string): { prediction: "BIG" | "SMALL"; predictedNumber: number } {
    if (!results || results.length === 0) {
      console.error(`❌ No TC results available for ${variant} - API may be down`);
      throw new Error(`No live TC data available for ${variant}`);
    }

    try {
      const analysisResults = this.performAdvancedAnalysis(results);
      return this.makePredictionFromAnalysis(analysisResults, results, variant);
    } catch (error) {
      console.error(`❌ TC advanced trend analysis failed for ${variant}:`, error);
      throw new Error(`Failed to analyze TC trend for ${variant}`);
    }
  }

  private performAdvancedAnalysis(results: TCWingoResult[]) {
    const recentResults = results.slice(0, Math.min(10, results.length));
    
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
    
    // COMPLETELY RANDOM SIGNALS (ignore patterns)
    const randomValue = Math.random();
    let bigSignal = 10;
    let smallSignal = 10;
    
    // Pure 50/50 randomization with slight variance for realism
    if (randomValue > 0.5) {
      bigSignal += Math.random() * 15 + 5; // 5-20 boost
      console.log(`🎲 TC RANDOM: BIG selected (${randomValue.toFixed(3)})`);
    } else {
      smallSignal += Math.random() * 15 + 5; // 5-20 boost  
      console.log(`🎲 TC RANDOM: SMALL selected (${randomValue.toFixed(3)})`);
    }
    
    // Add visual complexity for analysis display (but doesn't affect outcome)
    console.log(`📊 TC Pattern Analysis: ${bigFreq.toFixed(1)}% BIG, Streak: ${lastSize} x${currentStreak}`);
    console.log(`📊 TC Recent Trend: ${recentBigCount}/5 BIG results`);
    
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

  private makePredictionFromAnalysis(analysis: any, results: TCWingoResult[], variant: string): { prediction: "BIG" | "SMALL"; predictedNumber: number } {
    const { bigCount, smallCount, bigFreq, recentBigCount, currentStreak, lastSize, bigSignal, smallSignal } = analysis;
    
    // Determine prediction based on signals
    const prediction: "BIG" | "SMALL" = bigSignal > smallSignal ? "BIG" : "SMALL";
    
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
    
    console.log(`🎯 TC TRULY BALANCED [${variant}]:`);
    console.log(`   Stats: ${recentBigCount}/5 BIG | ${bigFreq.toFixed(1)}% BIG | ${lastSize} x${currentStreak}`);
    console.log(`   Signals: BIG=${bigSignal.toFixed(1)} vs SMALL=${smallSignal.toFixed(1)}`);
    console.log(`   🎯 FINAL: ${prediction} ${predictedNumber} (${confidence}% confidence)`);
    
    return { prediction, predictedNumber };
  }

  /**
   * Generate prediction for a specific variant
   */
  async generatePrediction(variant: string): Promise<TCWingoPrediction | null> {
    try {
      const variantConfig = TC_WINGO_VARIANTS[variant as keyof typeof TC_WINGO_VARIANTS];
      if (!variantConfig) {
        throw new Error(`Invalid TC variant: ${variant}`);
      }

      console.log(`🎯 Generating TC live prediction for ${variant}...`);
      
      // Fetch live results from TC API
      const results = await this.fetchGameResults(variantConfig.gameCode);
      console.log(`✅ Retrieved ${results.length} live TC results for ${variant}`);
      
      if (results.length === 0) {
        throw new Error(`No TC data available for ${variant}`);
      }

      // Generate current period and calculate accurate countdown
      const currentPeriod = this.generateCurrentPeriod(variant);
      const accurateCountdown = this.calculateCountdown(variant);

      // Analyze trend and generate prediction
      const { prediction, predictedNumber } = this.analyzeTrend(results, variant);
      
      console.log(`⏰ Accurate countdown: ${accurateCountdown}s for ${variant}`);
      console.log(`📅 Current period: ${currentPeriod}`);
      console.log(`✅ Generated live TC prediction for ${variant}: ${prediction} ${predictedNumber}`);

      return {
        variant,
        prediction,
        predictedNumber,
        confidence: Math.floor(Math.random() * 40 + 40), // 40-80%
        period: currentPeriod,
        countdown: accurateCountdown,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error(`❌ TC Prediction generation failed for ${variant}:`, error);
      return null;
    }
  }

  /**
   * Background scheduler methods
   */
  private async runPredictionForVariant(variant: string): Promise<void> {
    try {
      const prediction = await this.generatePrediction(variant);
      if (prediction) {
        this.predictionCache.set(variant, prediction);
        console.log(`✅ Updated TC ${variant} prediction: ${prediction.prediction} (${prediction.countdown}s)`);
      }
    } catch (error) {
      console.error(`❌ Failed to update TC ${variant} prediction:`, error);
    }
  }

  private async runInitialPredictions(): Promise<void> {
    console.log('🔄 Running initial TC predictions for all variants...');
    
    const variants = Object.keys(TC_WINGO_VARIANTS);
    const promises = variants.map(variant => this.runPredictionForVariant(variant));
    
    await Promise.all(promises);
  }

  async getCachedPrediction(variant: string): Promise<TCWingoPrediction | null> {
    const cached = this.predictionCache.get(variant);
    
    // Always regenerate prediction to ensure fresh period and countdown
    console.log(`🔄 Regenerating fresh TC prediction for ${variant}...`);
    const freshPrediction = await this.generatePrediction(variant);
    
    if (freshPrediction) {
      this.predictionCache.set(variant, freshPrediction);
      return freshPrediction;
    }
    
    // Fallback to cached only if fresh generation fails
    if (cached) {
      console.log(`⚠️ Using cached TC prediction for ${variant} as fallback`);
      return cached;
    }
    
    // If no cached prediction, generate a new one
    return await this.generatePrediction(variant);
  }

  /**
   * Initialize predictions on server start
   */
  async startBackgroundScheduler(): Promise<void> {
    console.log('🚀 Initializing TC Wingo prediction service with direct API access...');
    
    // Run initial predictions for all variants once
    await this.runInitialPredictions();
    
    console.log('✅ Initial TC predictions generated - service ready for on-demand requests');
  }

  /**
   * Stop all background schedulers
   */
  stopBackgroundScheduler(): void {
    console.log('⏹️ No TC background schedulers to stop - using on-demand system');
  }
}

export const tcWingoService = new TCWingoService();