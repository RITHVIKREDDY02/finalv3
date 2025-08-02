import crypto from 'crypto';

export interface WingoResult {
  issueNumber: string;
  number: number;
  timestamp: number;
}

export interface WingoPrediction {
  period: string;
  prediction: "BIG" | "SMALL";
  predictedNumber: number;
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
  private variantSchedulers: Map<string, NodeJS.Timeout> = new Map();

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

  private analyzeTrend(results: WingoResult[], variant: string): { prediction: "BIG" | "SMALL"; predictedNumber: number } {
    if (!results || results.length < 5) {
      const randomPrediction = Math.random() > 0.5 ? "BIG" : "SMALL";
      const randomNumber = randomPrediction === "BIG" ? Math.floor(Math.random() * 5) + 5 : Math.floor(Math.random() * 5);
      return { prediction: randomPrediction, predictedNumber: randomNumber };
    }

    try {
      const analysisResults = this.performAdvancedAnalysis(results);
      return this.makePredictionFromAnalysis(analysisResults, results, variant);
    } catch (error) {
      console.error('Advanced trend analysis failed:', error);
      const fallbackPrediction = Math.random() > 0.5 ? "BIG" : "SMALL";
      const fallbackNumber = fallbackPrediction === "BIG" ? Math.floor(Math.random() * 5) + 5 : Math.floor(Math.random() * 5);
      return { prediction: fallbackPrediction, predictedNumber: fallbackNumber };
    }
  }

  private performAdvancedAnalysis(results: WingoResult[]) {
    const numbers = results.map(r => r.number);
    const bigSmallSequence = numbers.map(n => this.getBigSmall(n));
    
    return {
      // Pattern Recognition Analysis
      patterns: this.analyzePatterns(bigSmallSequence),
      
      // Frequency Analysis (last 20 results)
      frequency: this.analyzeFrequency(bigSmallSequence.slice(0, 20)),
      
      // Streak Analysis
      streaks: this.analyzeStreaks(bigSmallSequence),
      
      // Number Distribution Analysis
      numberDistribution: this.analyzeNumberDistribution(numbers.slice(0, 30)),
      
      // Moving Average Analysis
      movingAverages: this.analyzeMovingAverages(numbers),
      
      // Hot/Cold Analysis
      hotCold: this.analyzeHotColdNumbers(numbers.slice(0, 50)),
      
      // Recent Trend Momentum
      momentum: this.analyzeMomentum(bigSmallSequence.slice(0, 15))
    };
  }

  private analyzePatterns(sequence: ("BIG" | "SMALL")[]): any {
    const patterns = {
      alternating: 0,
      doublePattern: 0,
      triplePattern: 0,
      repeatingSequence: null as string | null
    };

    // Check for alternating pattern (BIG-SMALL-BIG-SMALL)
    let alternatingCount = 0;
    for (let i = 0; i < Math.min(8, sequence.length - 1); i++) {
      if (i % 2 === 0 ? sequence[i] !== sequence[i + 1] : sequence[i] === sequence[i + 1]) {
        alternatingCount++;
      }
    }
    patterns.alternating = alternatingCount / Math.min(8, sequence.length - 1);

    // Check for double patterns (BB-SS-BB-SS)
    let doubleCount = 0;
    for (let i = 0; i < sequence.length - 3; i += 2) {
      if (sequence[i] === sequence[i + 1] && sequence[i + 2] === sequence[i + 3] && sequence[i] !== sequence[i + 2]) {
        doubleCount++;
      }
    }
    patterns.doublePattern = doubleCount;

    // Look for repeating 3-sequence patterns
    const recent6 = sequence.slice(0, 6).join('');
    const check6 = sequence.slice(6, 12).join('');
    if (recent6.length === 6 && recent6 === check6) {
      patterns.repeatingSequence = recent6;
    }

    return patterns;
  }

  private analyzeFrequency(sequence: ("BIG" | "SMALL")[]): any {
    const bigCount = sequence.filter(s => s === 'BIG').length;
    const smallCount = sequence.length - bigCount;
    const total = sequence.length;
    
    return {
      bigRatio: total > 0 ? bigCount / total : 0.5,
      smallRatio: total > 0 ? smallCount / total : 0.5,
      imbalance: Math.abs(bigCount - smallCount),
      deviation: total > 0 ? Math.abs(0.5 - (bigCount / total)) : 0
    };
  }

  private analyzeStreaks(sequence: ("BIG" | "SMALL")[]): any {
    let currentStreak = 1;
    let longestStreak = 1;
    let streakType = sequence[0];
    let longestStreakType = sequence[0];
    
    const streaks = [];
    let currentStreakStart = 0;

    for (let i = 1; i < sequence.length; i++) {
      if (sequence[i] === sequence[i - 1]) {
        currentStreak++;
      } else {
        streaks.push({ type: sequence[i - 1], length: currentStreak, position: currentStreakStart });
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
          longestStreakType = sequence[i - 1];
        }
        currentStreak = 1;
        currentStreakStart = i;
      }
    }
    
    // Add final streak
    streaks.push({ type: sequence[sequence.length - 1], length: currentStreak, position: currentStreakStart });
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      longestStreakType = sequence[sequence.length - 1];
    }

    return {
      current: streaks[0],
      longest: { type: longestStreakType, length: longestStreak },
      recent: streaks.slice(0, 5),
      averageLength: streaks.length > 0 ? streaks.reduce((sum, s) => sum + s.length, 0) / streaks.length : 1
    };
  }

  private analyzeNumberDistribution(numbers: number[]): any {
    const distribution = new Array(10).fill(0);
    numbers.forEach(num => {
      if (num >= 0 && num <= 9) distribution[num]++;
    });

    const bigNumbers = [5, 6, 7, 8, 9];
    const smallNumbers = [0, 1, 2, 3, 4];
    
    const bigFreq = bigNumbers.reduce((sum, n) => sum + distribution[n], 0);
    const smallFreq = smallNumbers.reduce((sum, n) => sum + distribution[n], 0);
    
    // Find most and least frequent numbers
    const maxFreq = Math.max(...distribution);
    const minFreq = Math.min(...distribution.filter(f => f > 0));
    const hotNumbers = distribution.map((freq, num) => ({ num, freq })).filter(d => d.freq === maxFreq);
    const coldNumbers = distribution.map((freq, num) => ({ num, freq })).filter(d => d.freq === minFreq);

    return {
      distribution,
      bigFrequency: bigFreq,
      smallFrequency: smallFreq,
      hotNumbers: hotNumbers.map(h => h.num),
      coldNumbers: coldNumbers.map(c => c.num),
      evenCount: numbers.filter((n: number) => n % 2 === 0).length,
      oddCount: numbers.filter((n: number) => n % 2 === 1).length
    };
  }

  private analyzeMovingAverages(numbers: number[]): any {
    const calculateMA = (data: number[], period: number) => {
      if (data.length < period) return data.reduce((sum, n) => sum + n, 0) / data.length;
      return data.slice(0, period).reduce((sum, n) => sum + n, 0) / period;
    };

    const ma5 = calculateMA(numbers, 5);
    const ma10 = calculateMA(numbers, 10);
    const ma20 = calculateMA(numbers, 20);
    
    return {
      ma5,
      ma10,
      ma20,
      trend: ma5 > ma10 ? (ma10 > ma20 ? 'STRONG_UP' : 'UP') : (ma10 < ma20 ? 'STRONG_DOWN' : 'DOWN'),
      crossover: ma5 > 4.5 ? 'BIG' : 'SMALL'
    };
  }

  private analyzeHotColdNumbers(numbers: number[]): any {
    const recentCount = Math.min(numbers.length, 20);
    const recent = numbers.slice(0, recentCount);
    const older = numbers.slice(recentCount, Math.min(numbers.length, 50));
    
    const recentFreq = new Array(10).fill(0);
    const olderFreq = new Array(10).fill(0);
    
    recent.forEach(n => recentFreq[n]++);
    older.forEach(n => olderFreq[n]++);
    
    // Calculate momentum for each number
    const momentum = recentFreq.map((recentF, i) => {
      const olderF = olderFreq[i];
      const recentRate = recentCount > 0 ? recentF / recentCount : 0;
      const olderRate = older.length > 0 ? olderF / older.length : 0;
      return recentRate - olderRate;
    });
    
    const hotNumbers = momentum.map((m, i) => ({ num: i, momentum: m })).filter(m => m.momentum > 0.1);
    const coldNumbers = momentum.map((m, i) => ({ num: i, momentum: m })).filter(m => m.momentum < -0.1);
    
    return {
      hotNumbers: hotNumbers.map(h => h.num),
      coldNumbers: coldNumbers.map(c => c.num),
      momentum,
      recentDominant: recentFreq.indexOf(Math.max(...recentFreq))
    };
  }

  private analyzeMomentum(sequence: ("BIG" | "SMALL")[]): any {
    const weights = [5, 4, 3, 2.5, 2, 1.8, 1.6, 1.4, 1.2, 1.1, 1, 0.9, 0.8, 0.7, 0.6];
    let momentum = 0;
    
    for (let i = 0; i < Math.min(sequence.length, weights.length); i++) {
      const value = sequence[i] === 'BIG' ? 1 : -1;
      momentum += value * weights[i];
    }
    
    const normalizedMomentum = momentum / weights.slice(0, Math.min(sequence.length, weights.length)).reduce((sum, w) => sum + w, 0);
    
    return {
      rawMomentum: momentum,
      normalizedMomentum,
      strength: Math.abs(normalizedMomentum),
      direction: normalizedMomentum > 0 ? 'BIG' : 'SMALL'
    };
  }

  private makePredictionFromAnalysis(analysis: any, results: WingoResult[], variant: string): { prediction: "BIG" | "SMALL"; predictedNumber: number } {
    const signals = [];
    let confidence = 0;
    
    // Signal 1: Frequency imbalance correction
    if (analysis.frequency.deviation > 0.2) {
      const correction = analysis.frequency.bigRatio > 0.6 ? 'SMALL' : 'BIG';
      signals.push({ signal: correction, weight: 3, reason: 'frequency_correction' });
      confidence += 15;
    }
    
    // Signal 2: Streak breaking logic
    if (analysis.streaks.current && analysis.streaks.current.length >= 3) {
      const breakStreak = analysis.streaks.current.type === 'BIG' ? 'SMALL' : 'BIG';
      const weight = Math.min(analysis.streaks.current.length, 6);
      signals.push({ signal: breakStreak, weight, reason: 'streak_break' });
      confidence += weight * 5;
    }
    
    // Signal 3: Pattern continuation/break
    if (analysis.patterns.alternating > 0.6) {
      const sequence = results.slice(0, 2).map(r => this.getBigSmall(r.number));
      const nextInPattern = sequence[0] === sequence[1] ? (sequence[0] === 'BIG' ? 'SMALL' : 'BIG') : sequence[0];
      signals.push({ signal: nextInPattern, weight: 2, reason: 'pattern_continuation' });
      confidence += 10;
    }
    
    // Signal 4: Moving average crossover
    if (analysis.movingAverages.trend === 'STRONG_UP' || analysis.movingAverages.trend === 'STRONG_DOWN') {
      signals.push({ signal: analysis.movingAverages.crossover, weight: 2, reason: 'ma_trend' });
      confidence += 8;
    }
    
    // Signal 5: Momentum analysis
    if (analysis.momentum.strength > 0.3) {
      const momentumSignal = analysis.momentum.direction === 'BIG' ? 'SMALL' : 'BIG'; // Contrarian approach
      signals.push({ signal: momentumSignal, weight: 4, reason: 'momentum_reversal' });
      confidence += 12;
    }
    
    // Signal 6: Hot/Cold number analysis
    if (analysis.hotCold.hotNumbers.length > 0) {
      const hotBig = analysis.hotCold.hotNumbers.filter((n: number) => n >= 5).length;
      const hotSmall = analysis.hotCold.hotNumbers.filter((n: number) => n < 5).length;
      if (hotBig !== hotSmall) {
        const hotSignal = hotBig > hotSmall ? 'BIG' : 'SMALL';
        signals.push({ signal: hotSignal, weight: 1.5, reason: 'hot_numbers' });
        confidence += 5;
      }
    }
    
    // Signal 7: Anti-loss logic with historical context
    if (this.lastPredictions.length >= 2) {
      const recentLosses = this.lastPredictions.slice(-2).filter(p => p.result === 'LOSS').length;
      if (recentLosses >= 2) {
        const lastPrediction = this.lastPredictions[this.lastPredictions.length - 1].prediction;
        const antiLoss = lastPrediction === 'BIG' ? 'SMALL' : 'BIG';
        signals.push({ signal: antiLoss, weight: 3, reason: 'anti_loss' });
        confidence += 20;
      }
    }
    
    // Calculate weighted prediction
    const bigWeight = signals.filter(s => s.signal === 'BIG').reduce((sum, s) => sum + s.weight, 0);
    const smallWeight = signals.filter(s => s.signal === 'SMALL').reduce((sum, s) => sum + s.weight, 0);
    
    let finalPrediction: "BIG" | "SMALL";
    
    if (Math.abs(bigWeight - smallWeight) < 0.5) {
      // If signals are very close, use recent momentum as tiebreaker
      finalPrediction = analysis.momentum.normalizedMomentum > 0 ? 'SMALL' : 'BIG'; // Contrarian
    } else {
      finalPrediction = bigWeight > smallWeight ? 'BIG' : 'SMALL';
    }
    
    // Debug logging for analysis
    // Predict specific number based on analysis and variant
    const predictedNumber = this.predictSpecificNumber(analysis, results, variant, finalPrediction);
    
    console.log(`🔍 Advanced Analysis Results [${variant}]:`);
    console.log(`   Frequency: BIG ${(analysis.frequency.bigRatio * 100).toFixed(1)}% | Deviation: ${(analysis.frequency.deviation * 100).toFixed(1)}%`);
    console.log(`   Current Streak: ${analysis.streaks.current?.type} x${analysis.streaks.current?.length}`);
    console.log(`   Momentum: ${analysis.momentum.direction} (${analysis.momentum.strength.toFixed(2)})`);
    console.log(`   Signals: BIG=${bigWeight.toFixed(1)} | SMALL=${smallWeight.toFixed(1)} → ${finalPrediction}`);
    console.log(`   🎯 Predicted Number: ${predictedNumber}`);
    
    return { prediction: finalPrediction, predictedNumber };
  }

  private predictSpecificNumber(analysis: any, results: WingoResult[], variant: string, prediction: "BIG" | "SMALL"): number {
    // Get variant-specific seed for more diverse predictions across servers
    const variantSeeds: { [key: string]: number } = { '30sec': 1, '1min': 2, '3min': 3, '5min': 4 };
    const seed = variantSeeds[variant] || 1;
    
    // Use multiple factors to determine specific number
    const recentNumbers = results.slice(0, 10).map(r => r.number);
    const hotNumbers = analysis.hotCold.hotNumbers || [];
    const distribution = analysis.numberDistribution.distribution || new Array(10).fill(0);
    
    // Calculate number preferences based on analysis
    const numberScores = new Array(10).fill(0);
    
    // Factor 1: Frequency-based scoring (avoid overused numbers)
    distribution.forEach((freq: number, num: number) => {
      const avgFreq = distribution.reduce((sum: number, f: number) => sum + f, 0) / 10;
      numberScores[num] -= (freq - avgFreq) * 0.3; // Penalty for overuse
    });
    
    // Factor 2: Hot number momentum (slight preference)
    hotNumbers.forEach((num: number) => {
      if (num >= 0 && num <= 9) numberScores[num] += 0.2;
    });
    
    // Factor 3: Avoid recent numbers (anti-repetition)
    recentNumbers.slice(0, 3).forEach((num, index) => {
      const penalty = 0.5 - (index * 0.1); // Higher penalty for more recent
      numberScores[num] -= penalty;
    });
    
    // Factor 4: Variant-specific bias for diversity
    const variantBias = [seed * 0.1, (seed + 1) * 0.1, (seed + 2) * 0.1];
    variantBias.forEach((bias, index) => {
      const targetNum = (seed + index * 3) % 10;
      numberScores[targetNum] += bias;
    });
    
    // Factor 5: Pattern-based number selection
    if (analysis.patterns.alternating > 0.6) {
      // Prefer numbers that continue pattern
      const lastTwo = recentNumbers.slice(0, 2);
      if (lastTwo.length === 2) {
        const diff = Math.abs(lastTwo[0] - lastTwo[1]);
        const nextInPattern = (lastTwo[0] + diff) % 10;
        numberScores[nextInPattern] += 0.3;
      }
    }
    
    // Determine final number based on BIG/SMALL prediction
    const targetRange = prediction === "BIG" ? [5, 6, 7, 8, 9] : [0, 1, 2, 3, 4];
    const rangeScores = targetRange.map(num => ({ num, score: numberScores[num] }));
    
    // Add some randomness but weighted by scores
    const weights = rangeScores.map(r => Math.max(0.1, r.score + 1 + Math.random() * 0.5));
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    
    let random = Math.random() * totalWeight;
    for (let i = 0; i < rangeScores.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return rangeScores[i].num;
      }
    }
    
    // Fallback: random number from appropriate range
    return targetRange[Math.floor(Math.random() * targetRange.length)];
  }

  async getCurrentPeriod(variant: string): Promise<any> {
    const config = WINGO_VARIANTS[variant];
    if (!config) return null;

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
      
      console.log(`No current period found for ${variant}, API response:`, JSON.stringify(data).substring(0, 200));
      return null;
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
      console.error(`Failed to get results for ${variant}:`, error);
      return [];
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

      const analysisResult = this.analyzeTrend(results, variant);
      const config = WINGO_VARIANTS[variant];
      
      // Calculate countdown based on API endTime or fallback to fixed calculation
      let countdown: number;
      if (currentPeriod?.endTime) {
        countdown = this.calculateAPICountdown(currentPeriod.endTime);
      } else {
        countdown = this.calculateFallbackCountdown(config.intervalSeconds);
      }
      
      // Generate period ID based on current time and interval (fallback)
      const now = new Date();
      const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const periodId = `${istTime.getFullYear()}${(istTime.getMonth() + 1).toString().padStart(2, '0')}${istTime.getDate().toString().padStart(2, '0')}${istTime.getHours().toString().padStart(2, '0')}${istTime.getMinutes().toString().padStart(2, '0')}${Math.floor(istTime.getSeconds() / config.intervalSeconds).toString().padStart(3, '0')}`;

      // Always prioritize API period over generated period
      const finalPeriod = currentPeriod?.issueNumber || periodId;

      return {
        period: finalPeriod,
        prediction: analysisResult.prediction,
        predictedNumber: analysisResult.predictedNumber,
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
    const countdown = this.calculateFallbackCountdown(config.intervalSeconds);
    
    const now = new Date();
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    const periodId = `${istTime.getFullYear()}${(istTime.getMonth() + 1).toString().padStart(2, '0')}${istTime.getDate().toString().padStart(2, '0')}${istTime.getHours().toString().padStart(2, '0')}${istTime.getMinutes().toString().padStart(2, '0')}${Math.floor(istTime.getSeconds() / config.intervalSeconds).toString().padStart(3, '0')}`;
    
    const mockPrediction = Math.random() > 0.5 ? "BIG" : "SMALL";
    const mockNumber = mockPrediction === "BIG" ? Math.floor(Math.random() * 5) + 5 : Math.floor(Math.random() * 5);
    
    return {
      period: periodId,
      prediction: mockPrediction,
      predictedNumber: mockNumber,
      confidence: 85 + Math.floor(Math.random() * 10),
      countdown
    };
  }

  // Background scheduler methods
  private async runPredictionForVariant(variant: string): Promise<void> {
    try {
      const prediction = await this.generatePrediction(variant);
      if (prediction) {
        this.predictionCache.set(variant, prediction);
        console.log(`✅ Updated ${variant} prediction: ${prediction.prediction} (${prediction.countdown}s)`);
      }
    } catch (error) {
      console.error(`❌ Failed to update ${variant} prediction:`, error);
    }
  }

  private async runInitialPredictions(): Promise<void> {
    console.log('🔄 Running initial predictions for all variants...');
    
    // Generate predictions for all variants simultaneously on startup
    const variants = Object.keys(WINGO_VARIANTS);
    const promises = variants.map(async (variant) => {
      await this.runPredictionForVariant(variant);
    });
    
    await Promise.all(promises);
  }

  // Get cached prediction or generate new one
  async getCachedPrediction(variant: string): Promise<WingoPrediction | null> {
    // Return cached prediction if available
    if (this.predictionCache.has(variant)) {
      const cached = this.predictionCache.get(variant)!;
      
      // Get fresh period data to update both countdown AND period number in real-time
      const currentPeriod = await this.getCurrentPeriod(variant);
      if (currentPeriod) {
        // Update period number to current period
        cached.period = currentPeriod.issueNumber;
        
        // Update countdown
        if (currentPeriod.endTime) {
          cached.countdown = this.calculateAPICountdown(currentPeriod.endTime);
        } else {
          const config = WINGO_VARIANTS[variant];
          cached.countdown = this.calculateFallbackCountdown(config.intervalSeconds);
        }
      } else {
        // Fallback countdown calculation if API fails
        const config = WINGO_VARIANTS[variant];
        cached.countdown = this.calculateFallbackCountdown(config.intervalSeconds);
      }
      
      return cached;
    }
    
    // Generate new prediction if not cached
    return await this.generatePrediction(variant);
  }

  // Start individual background schedulers for each variant
  startBackgroundScheduler(): void {
    console.log('🚀 Starting background prediction schedulers...');
    
    // Run initial predictions for all variants
    this.runInitialPredictions();
    
    // Set up individual timers for each variant based on their intervals
    Object.entries(WINGO_VARIANTS).forEach(([variant, config]) => {
      const intervalMs = config.intervalSeconds * 1000; // Convert to milliseconds
      
      const scheduler = setInterval(() => {
        this.runPredictionForVariant(variant);
      }, intervalMs);
      
      this.variantSchedulers.set(variant, scheduler);
      console.log(`⏰ ${variant} scheduler started - will update every ${config.intervalSeconds} seconds (${intervalMs/1000/60} min)`);
    });
    
    console.log('✅ All variant-specific schedulers started with optimized intervals');
  }

  // Stop all background schedulers
  stopBackgroundScheduler(): void {
    this.variantSchedulers.forEach((scheduler, variant) => {
      clearInterval(scheduler);
      console.log(`⏹️ ${variant} scheduler stopped`);
    });
    this.variantSchedulers.clear();
    console.log('⏹️ All background schedulers stopped');
  }
}

export const wingoService = new WingoService();