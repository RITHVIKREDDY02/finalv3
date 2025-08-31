import fetch from 'node-fetch';

// TC LOTTERY Authentication Service
// This service handles login and maintains authenticated session for API calls

interface AuthCredentials {
  username: string;
  password: string;
}

interface AuthSession {
  cookies: Record<string, string>;
  headers: Record<string, string>;
  isAuthenticated: boolean;
  expiresAt: Date;
}

class TCLotteryAuthService {
  private session: AuthSession | null = null;
  private readonly baseUrl = 'https://tc9987.club';
  private readonly loginUrl = `${this.baseUrl}/login`;
  
  // Standard headers for TC LOTTERY requests
  private readonly defaultHeaders = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X)',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Referer': 'https://tc9987.club/',
    'Origin': 'https://tc9987.club'
  };

  /**
   * Login to TC LOTTERY and establish authenticated session
   */
  async login(credentials: AuthCredentials): Promise<boolean> {
    try {
      console.log('🔐 Attempting to login to TC LOTTERY...');
      
      // First, get the login page to extract any CSRF tokens or session data
      const loginPageResponse = await fetch(this.loginUrl, {
        method: 'GET',
        headers: {
          ...this.defaultHeaders,
          'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });

      if (!loginPageResponse.ok) {
        throw new Error(`Failed to access login page: ${loginPageResponse.status}`);
      }

      // Extract cookies from login page
      const setCookieHeaders = loginPageResponse.headers.raw()['set-cookie'] || [];
      const initialCookies = this.parseCookies(setCookieHeaders);
      
      // Prepare login data
      const loginData = {
        username: credentials.username,
        password: credentials.password,
        // Add any additional fields that might be required
        remember: true,
        _token: '', // Will be extracted from page if needed
      };

      // Perform login request
      const loginResponse = await fetch(this.loginUrl, {
        method: 'POST',
        headers: {
          ...this.defaultHeaders,
          'Cookie': this.formatCookies(initialCookies)
        },
        body: JSON.stringify(loginData)
      });

      // Check if login was successful
      if (loginResponse.ok) {
        // Extract session cookies from login response
        const authCookieHeaders = loginResponse.headers.raw()['set-cookie'] || [];
        const authCookies = this.parseCookies(authCookieHeaders);
        
        // Combine initial and auth cookies
        const allCookies = { ...initialCookies, ...authCookies };
        
        // Store authenticated session
        this.session = {
          cookies: allCookies,
          headers: {
            ...this.defaultHeaders,
            'Cookie': this.formatCookies(allCookies)
          },
          isAuthenticated: true,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        };

        console.log('✅ Successfully authenticated with TC LOTTERY');
        console.log('📝 Session cookies obtained:', Object.keys(allCookies));
        
        return true;
      } else {
        console.error('❌ Login failed:', loginResponse.status, loginResponse.statusText);
        const errorText = await loginResponse.text();
        console.error('Error response:', errorText);
        return false;
      }
      
    } catch (error) {
      console.error('🚨 Authentication error:', error);
      return false;
    }
  }

  /**
   * Get authenticated headers for API requests
   */
  getAuthenticatedHeaders(): Record<string, string> {
    if (!this.session || !this.session.isAuthenticated || this.isSessionExpired()) {
      throw new Error('No valid authenticated session available');
    }
    
    return this.session.headers;
  }

  /**
   * Check if current session is valid
   */
  isAuthenticated(): boolean {
    return this.session !== null && 
           this.session.isAuthenticated && 
           !this.isSessionExpired();
  }

  /**
   * Check if session has expired
   */
  private isSessionExpired(): boolean {
    return this.session !== null && new Date() > this.session.expiresAt;
  }

  /**
   * Parse cookies from Set-Cookie headers
   */
  private parseCookies(setCookieHeaders: string[]): Record<string, string> {
    const cookies: Record<string, string> = {};
    
    setCookieHeaders.forEach(header => {
      const [cookiePair] = header.split(';');
      const [name, value] = cookiePair.split('=');
      if (name && value) {
        cookies[name.trim()] = value.trim();
      }
    });
    
    return cookies;
  }

  /**
   * Format cookies for Cookie header
   */
  private formatCookies(cookies: Record<string, string>): string {
    return Object.entries(cookies)
      .map(([name, value]) => `${name}=${value}`)
      .join('; ');
  }

  /**
   * Make authenticated API request to TC LOTTERY
   */
  async makeAuthenticatedRequest(url: string, options: any = {}): Promise<any> {
    if (!this.isAuthenticated()) {
      throw new Error('No valid authentication session. Please login first.');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthenticatedHeaders(),
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Clear current session
   */
  logout(): void {
    this.session = null;
    console.log('🚪 Logged out from TC LOTTERY');
  }
}

// Export singleton instance
export const tcLotteryAuth = new TCLotteryAuthService();

// Export types
export { AuthCredentials, AuthSession };