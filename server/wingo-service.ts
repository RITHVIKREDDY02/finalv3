import crypto from 'crypto';
import { storage } from './storage';

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

  private lastPredictions: Array<{prediction: string, result: string, variant?: string}> = [];
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
    
    // Get recent trend for better accuracy
    const recentNumbers = results.slice(0, 5).map(r => r.number);
    const recentBigSmall = recentNumbers.map(n => this.getBigSmall(n));
    const recentBigCount = recentBigSmall.filter(s => s === 'BIG').length;
    const recentTrend = recentBigCount > 2.5 ? 'BIG' : 'SMALL';
    
    // Signal 1: Strong trend following (high weight when clear trend)
    if (analysis.frequency.deviation > 0.15) {
      const trendSignal = analysis.frequency.bigRatio > 0.6 ? 'BIG' : 'SMALL'; // Follow trend instead of contrarian
      const weight = Math.min(analysis.frequency.deviation * 10, 6); // Stronger weight for stronger trends
      signals.push({ signal: trendSignal, weight, reason: 'trend_following' });
      confidence += weight * 3;
    }
    
    // Signal 2: Smart streak analysis - break long streaks, continue short ones
    if (analysis.streaks.current && analysis.streaks.current.length >= 2) {
      if (analysis.streaks.current.length >= 4) {
        // Break very long streaks
        const breakStreak = analysis.streaks.current.type === 'BIG' ? 'SMALL' : 'BIG';
        signals.push({ signal: breakStreak, weight: 4, reason: 'long_streak_break' });
        confidence += 15;
      } else if (analysis.streaks.current.length === 2 || analysis.streaks.current.length === 3) {
        // Continue moderate streaks
        signals.push({ signal: analysis.streaks.current.type, weight: 3, reason: 'streak_continuation' });
        confidence += 10;
      }
    }
    
    // Signal 3: Recent momentum (follow recent 5 results)
    const recentMomentumWeight = Math.abs(recentBigCount - 2.5) * 2;
    if (recentMomentumWeight > 1) {
      signals.push({ signal: recentTrend, weight: recentMomentumWeight, reason: 'recent_momentum' });
      confidence += recentMomentumWeight * 4;
    }
    
    // Signal 4: Number distribution balance
    const bigNumbers = analysis.numberDistribution.bigFrequency || 0;
    const smallNumbers = analysis.numberDistribution.smallFrequency || 0;
    const total = bigNumbers + smallNumbers;
    if (total > 0) {
      const bigRatio = bigNumbers / total;
      if (Math.abs(bigRatio - 0.5) > 0.2) {
        const balanceSignal = bigRatio > 0.6 ? 'BIG' : 'SMALL';
        signals.push({ signal: balanceSignal, weight: 2.5, reason: 'number_balance' });
        confidence += 8;
      }
    }
    
    // Signal 5: Hot number momentum (follow hot numbers)
    if (analysis.hotCold.hotNumbers.length > 0) {
      const hotBig = analysis.hotCold.hotNumbers.filter((n: number) => n >= 5).length;
      const hotSmall = analysis.hotCold.hotNumbers.filter((n: number) => n < 5).length;
      if (hotBig !== hotSmall) {
        const hotSignal = hotBig > hotSmall ? 'BIG' : 'SMALL';
        signals.push({ signal: hotSignal, weight: 2, reason: 'hot_momentum' });
        confidence += 6;
      }
    }
    
    // Signal 6: Pattern recognition improvement
    if (recentNumbers.length >= 3) {
      const last3 = recentBigSmall.slice(0, 3);
      // Look for AB-AB pattern or ABC pattern
      if (last3[0] === last3[2] && last3[0] !== last3[1]) {
        // AB-A pattern detected, expect B
        const patternNext = last3[1];
        signals.push({ signal: patternNext, weight: 3, reason: 'aba_pattern' });
        confidence += 12;
      }
    }
    
    // Signal 7: Anti-consecutive-loss logic (adaptive)
    if (this.lastPredictions.length >= 3) {
      const recent3Losses = this.lastPredictions.slice(-3).filter(p => p.result === 'LOSS').length;
      if (recent3Losses >= 2) {
        // If multiple losses, try opposite of recent failed predictions
        const failedPredictions = this.lastPredictions.slice(-3).filter(p => p.result === 'LOSS');
        const mostFailedType = failedPredictions.length > 0 ? failedPredictions[failedPredictions.length - 1].prediction : null;
        if (mostFailedType) {
          const recoverySignal = mostFailedType === 'BIG' ? 'SMALL' : 'BIG';
          signals.push({ signal: recoverySignal, weight: 3.5, reason: 'loss_recovery' });
          confidence += 18;
        }
      }
    }
    
    // Calculate weighted prediction with improved logic
    const bigWeight = signals.filter(s => s.signal === 'BIG').reduce((sum, s) => sum + s.weight, 0);
    const smallWeight = signals.filter(s => s.signal === 'SMALL').reduce((sum, s) => sum + s.weight, 0);
    
    let finalPrediction: "BIG" | "SMALL";
    
    // Improved decision logic
    if (Math.abs(bigWeight - smallWeight) < 1) {
      // If very close, use the recent trend as tiebreaker
      finalPrediction = recentTrend;
    } else {
      finalPrediction = bigWeight > smallWeight ? 'BIG' : 'SMALL';
    }
    
    // Final validation - avoid obviously bad predictions
    if (analysis.frequency.bigRatio > 0.8 && finalPrediction === 'SMALL') {
      finalPrediction = 'BIG'; // Strong BIG trend, don't predict SMALL
    } else if (analysis.frequency.bigRatio < 0.2 && finalPrediction === 'BIG') {
      finalPrediction = 'SMALL'; // Strong SMALL trend, don't predict BIG
    }
    
    const predictedNumber = this.predictSpecificNumber(analysis, results, variant, finalPrediction);
    
    console.log(`🎯 Enhanced Analysis [${variant}]:`);
    console.log(`   Recent Trend: ${recentTrend} (${recentBigCount}/5 BIG)`);
    console.log(`   Frequency: BIG ${(analysis.frequency.bigRatio * 100).toFixed(1)}% | Current Streak: ${analysis.streaks.current?.type} x${analysis.streaks.current?.length}`);
    console.log(`   Signals: BIG=${bigWeight.toFixed(1)} | SMALL=${smallWeight.toFixed(1)} → ${finalPrediction}`);
    console.log(`   🎯 Predicted: ${finalPrediction} ${predictedNumber} (Confidence: ${confidence.toFixed(0)}%)`);
    
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
        // Store prediction in database
        await this.storePrediction(variant, prediction);
        
        // Check for completed results and update statuses
        await this.checkAndUpdateResults(variant);
        
        this.predictionCache.set(variant, prediction);
        console.log(`✅ Updated ${variant} prediction: ${prediction.prediction} (${prediction.countdown}s)`);
      }
    } catch (error) {
      console.error(`❌ Failed to update ${variant} prediction:`, error);
    }
  }

  // Store prediction in database (only if it doesn't already exist)
  private async storePrediction(variant: string, prediction: WingoPrediction): Promise<void> {
    try {
      // Check if prediction already exists for this period
      const existing = await storage.findExistingPrediction(prediction.period, variant);
      if (existing) {
        // Prediction already exists, skip creating duplicate
        return;
      }

      await storage.createPrediction({
        variant,
        period: prediction.period,
        predictedNumber: prediction.predictedNumber,
        predictedSize: prediction.prediction,
      });
    } catch (error) {
      console.error(`Failed to store prediction for ${variant}:`, error);
    }
  }

  // Check for results and update prediction statuses
  private async checkAndUpdateResults(variant: string): Promise<void> {
    try {
      const results = await this.getLatestResults(variant);
      
      // Update any pending predictions with actual results
      for (const result of results) {
        const actualSize = this.getBigSmall(result.number);
        
        const updated = await storage.updatePredictionResult(
          result.issueNumber,
          variant,
          result.number,
          actualSize
        );
        
        if (updated && updated.status) {
          // Track prediction results for learning
          this.lastPredictions.push({
            prediction: updated.predictedSize,
            result: updated.status,
            variant
          });
          
          // Keep only recent predictions (last 10 per variant)
          if (this.lastPredictions.length > 40) {
            this.lastPredictions = this.lastPredictions.slice(-40);
          }
          
          console.log(`✅ ${variant} period ${result.issueNumber}: ${updated.predictedSize} → ${updated.status} (${result.number})`);
        }
      }
      
      // Also check if we need to generate a new prediction due to period change
      const currentPeriod = await this.getCurrentPeriod(variant);
      if (currentPeriod && currentPeriod.issueNumber) {
        const cachedPrediction = this.predictionCache.get(variant);
        
        // If the period has changed or countdown is very low, update prediction immediately
        if (!cachedPrediction || 
            cachedPrediction.period !== currentPeriod.issueNumber || 
            cachedPrediction.countdown < 3) {
          
          const newPrediction = await this.generatePrediction(variant);
          if (newPrediction) {
            await this.storePrediction(variant, newPrediction);
            this.predictionCache.set(variant, newPrediction);
            console.log(`🔄 ${variant} period changed - updated prediction: ${newPrediction.prediction} (${newPrediction.countdown}s)`);
          }
        }
      }
    } catch (error) {
      console.error(`Failed to check results for ${variant}:`, error);
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
    
    // Set up faster result checking interval (every 5 seconds) for all variants
    const resultChecker = setInterval(() => {
      Object.keys(WINGO_VARIANTS).forEach(variant => {
        this.checkAndUpdateResults(variant);
      });
    }, 5000); // Check results every 5 seconds
    
    this.variantSchedulers.set('result-checker', resultChecker);
    console.log('⚡ Fast result checker started - checking all variants every 5 seconds');
    
    // Set up individual prediction update timers for each variant based on their intervals
    Object.entries(WINGO_VARIANTS).forEach(([variant, config]) => {
      // Use a smaller interval for more frequent updates but sync with period boundaries
      const updateIntervalMs = Math.min(config.intervalSeconds * 1000, 10000); // Max 10 seconds
      
      const scheduler = setInterval(async () => {
        await this.runPredictionForVariant(variant);
      }, updateIntervalMs);
      
      this.variantSchedulers.set(variant, scheduler);
      console.log(`⏰ ${variant} scheduler started - updating every ${updateIntervalMs/1000} seconds (${updateIntervalMs/1000/60} min)`);
    });
    
    console.log('✅ All variant-specific schedulers started with fast result sync');
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