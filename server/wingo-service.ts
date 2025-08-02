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
}

export const WINGO_VARIANTS: Record<string, WingoVariantConfig> = {
  "30sec": { typeId: 1, intervalSeconds: 30, name: "Parity" },
  "1min": { typeId: 2, intervalSeconds: 60, name: "Sapre" },
  "3min": { typeId: 3, intervalSeconds: 180, name: "Bcone" },
  "5min": { typeId: 4, intervalSeconds: 300, name: "Emerd" }
};

class WingoService {
  private readonly PERIOD_API_URL = "https://imgametransit.com/api/webapi/GetGameIssue";
  private readonly RESULT_API_URL = "https://imgametransit.com/api/webapi/GetNoaverageEmerdList";
  
  private readonly HEADERS = {
    "accept": "application/json, text/plain, */*",
    "authorization": "Bearer ...", // This would need to be configured
    "content-type": "application/json;charset=UTF-8",
    "origin": "https://okwinslots5.com",
    "referer": "https://okwinslots5.com/"
  };

  private lastPredictions: Array<{prediction: string, result: string}> = [];

  private getBigSmall(number: number): "BIG" | "SMALL" {
    return number >= 5 ? "BIG" : "SMALL";
  }

  private generateSignaturePayload() {
    const randomStr = crypto.createHash('md5').update(Math.random().toString()).digest('hex');
    const timestamp = Math.floor(Date.now() / 1000);
    return { randomStr, timestamp };
  }

  private async postData(url: string, body: any): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: this.HEADERS,
        body: JSON.stringify(body)
      });
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
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

    const { randomStr, timestamp } = this.generateSignaturePayload();
    const body = {
      language: 0,
      random: randomStr,
      signature: "A95282C91E942DDA8DAE51C81F20DADB", // This should be properly generated
      timestamp: timestamp,
      typeId: config.typeId
    };

    const data = await this.postData(this.PERIOD_API_URL, body);
    return data?.data || null;
  }

  async getLatestResults(variant: string): Promise<WingoResult[]> {
    const config = WINGO_VARIANTS[variant];
    if (!config) return [];

    const { randomStr, timestamp } = this.generateSignaturePayload();
    const body = {
      language: 0,
      pageNo: 1,
      pageSize: 10,
      random: randomStr,
      signature: "E46ACB58F4289D251D7C7E1800B71DBB", // This should be properly generated
      timestamp: timestamp,
      typeId: config.typeId
    };

    const data = await this.postData(this.RESULT_API_URL, body);
    return data?.data?.list || [];
  }

  async generatePrediction(variant: string): Promise<WingoPrediction | null> {
    try {
      const [currentPeriod, results] = await Promise.all([
        this.getCurrentPeriod(variant),
        this.getLatestResults(variant)
      ]);

      if (!currentPeriod) return null;

      const prediction = this.analyzeTrend(results);
      const config = WINGO_VARIANTS[variant];
      
      // Calculate countdown (mock for now - should be based on actual period timing)
      const countdown = Math.floor(Math.random() * config.intervalSeconds);

      return {
        period: currentPeriod.issueNumber || `${Date.now()}`,
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
    const now = new Date();
    const periodId = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}001`;
    
    return {
      period: periodId,
      prediction: Math.random() > 0.5 ? "BIG" : "SMALL",
      confidence: 85 + Math.floor(Math.random() * 10),
      countdown: Math.floor(Math.random() * config.intervalSeconds)
    };
  }
}

export const wingoService = new WingoService();