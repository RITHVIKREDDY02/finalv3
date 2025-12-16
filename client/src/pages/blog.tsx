import { useState } from "react";
import { Link } from "wouter";
import { Home, Calendar, ArrowRight, X } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import Footer from "@/components/footer";
import blogImage1 from "@assets/1_1765905221064.png";
import blogImage2 from "@assets/2_1765905221063.png";
import blogImage3 from "@assets/3_1765905221064.png";
import blogImage4 from "@assets/4_1765905221064.png";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to V3 GAME Blog",
    excerpt: "Stay tuned for the latest updates, tips, and strategies for winning predictions.",
    date: "2025-01-01",
  },
];

const guideArticles = [
  {
    id: 1,
    image: blogImage1,
    title: "How to Register in V3 Game?",
    excerpt: "Complete step-by-step guide to register on V3 Game and claim your sign up bonus.",
    content: `
      <h2>V3 Game Register Online Guide – Get Sign Up Bonus</h2>
      <p>If you are new to the online gaming world and want to start with a trusted platform, V3 Game is one of the popular names in India. This guide will walk you through everything you need to know about how to register online, claim your sign up bonus, and start playing safely and responsibly.</p>
      
      <h3>1. What is V3 Game?</h3>
      <p>V3 Game is an online gaming and entertainment platform that offers users a variety of skill-based and fun games. Indian players often choose it because of its easy registration process, simple user interface, and exciting welcome rewards. Whether you enjoy casual games or competitive play, it provides a mix of both.</p>
      
      <h3>2. Why Choose V3 Game?</h3>
      <ul>
        <li><strong>Quick registration</strong> – You can complete the registration process in just a few minutes.</li>
        <li><strong>Attractive sign-up rewards</strong> – New users can claim a register bonus as soon as they create an account.</li>
        <li><strong>Secure platform</strong> – It uses strong data encryption to keep your account and payments safe.</li>
        <li><strong>Easy withdrawals</strong> – The platform allows fast and hassle-free withdrawals to your verified account.</li>
      </ul>
      
      <h3>3. Step-by-Step Guide to V3 Game Register Online</h3>
      <ol>
        <li>Visit the official V3 Game register link – Make sure you use the correct website to avoid fake pages.</li>
        <li>Click on "Register" or "Sign Up" – This will open the online registration form.</li>
        <li>Enter your mobile number and create a password – This helps secure your account.</li>
        <li>Verify your OTP – An OTP will be sent to your phone for verification.</li>
        <li>Complete your profile – Fill in basic details like name, age, and email.</li>
        <li>Claim your sign up bonus – After registration, you can receive the welcome reward or deposit bonus.</li>
      </ol>
      
      <h3>4. V3 Game Register Bonus and How to Claim It</h3>
      <p>The platform rewards new users with a register bonus as a welcome gift. This can be in the form of free credits, cash bonuses, or promotional offers. To claim this reward:</p>
      <ul>
        <li>Complete your registration using the official register link.</li>
        <li>Make your first deposit (if required).</li>
        <li>Check your account dashboard for bonus details.</li>
      </ul>
      
      <h3>5. Safety Tips Before You Register</h3>
      <ul>
        <li>Always use the official register link to avoid scams.</li>
        <li>Never share your password or OTP with anyone.</li>
        <li>Set strong passwords and keep your login details private.</li>
        <li>Play responsibly and avoid spending more than your set limit.</li>
      </ul>
      
      <h3>6. Login After Registration</h3>
      <ol>
        <li>Go to the website homepage.</li>
        <li>Click on the login option.</li>
        <li>Enter your registered mobile number and password.</li>
        <li>Click "Login" to access your dashboard.</li>
      </ol>
      
      <h3>7. Benefits of Registering on V3 Game</h3>
      <ul>
        <li>Instant sign up bonus and promotional offers.</li>
        <li>Access to exclusive games and tournaments.</li>
        <li>Priority customer support for registered users.</li>
        <li>Opportunity to earn more through referral bonuses.</li>
      </ul>
    `
  },
  {
    id: 2,
    image: blogImage2,
    title: "V3 Game Login & Win Bonus",
    excerpt: "Learn how to login and claim your daily bonuses on V3 Game platform.",
    content: `
      <h2>V3 Game Login & Win Bonus – Your Complete Guide to Fun and Rewards</h2>
      <p>If you love online games that offer real excitement and daily rewards, V3 Game Login is a great choice for you. This platform allows Indian users to play, win, and earn bonuses through a smooth and secure system.</p>
      
      <h3>V3 Game Login Process</h3>
      <p>Here's how to log in easily every time you want to play:</p>
      <ol>
        <li>Go to the V3 Game login app or official website.</li>
        <li>Enter your registered mobile number and password.</li>
        <li>Tap "Login" to access your account.</li>
      </ol>
      <p>If you ever forget your password, there's a simple "Forgot Password" option that helps you reset it instantly.</p>
      <p>Once logged in, you'll see your profile, wallet, and available games on the dashboard.</p>
      
      <h3>V3 Game Lottery and Bonus Opportunities</h3>
      <p>One of the most exciting parts of V3 Game is its lottery system. The lottery section lets players buy tickets for a small amount and stand a chance to win big rewards. The results are updated daily, and you can view them directly on your dashboard.</p>
      <p>Apart from the lottery, players can also enjoy:</p>
      <ul>
        <li>Daily check-in bonuses</li>
        <li>Referral rewards</li>
        <li>Spin-the-wheel offers</li>
        <li>Special festival bonuses</li>
      </ul>
      
      <h3>Safety and Security</h3>
      <p>When it comes to online games, safety is very important. V3 Game uses encrypted connections to keep user data secure. Payments and withdrawals are handled through trusted Indian gateways, making transactions safe and quick.</p>
      <p>Users should always download the app from the official download link to avoid fake or harmful versions.</p>
      
      <h3>Why Choose V3 Game?</h3>
      <ul>
        <li>Easy registration and login process</li>
        <li>Fast bonus crediting system</li>
        <li>Multiple earning options (lottery, spin, and referrals)</li>
        <li>Works on both web and app platforms</li>
        <li>User-friendly design for smooth gameplay</li>
      </ul>
      
      <h3>Responsible Gaming Advice</h3>
      <p>While the V3 platform is designed for entertainment, it's important to play responsibly. Always set a limit on how much time and money you spend on games. Treat it as a fun activity, not as a source of guaranteed income.</p>
    `
  },
  {
    id: 3,
    image: blogImage3,
    title: "How to Withdraw in V3 Game?",
    excerpt: "Complete guide to withdraw money from V3 Game wallet to your bank account.",
    content: `
      <h2>How to Withdraw Money from V3 Game? Guide V3 Game Wallet Withdraw</h2>
      <p>Online earning platforms like V3 Game have become very popular in India. Players enjoy games while also having the opportunity to win real cash. But the most common question players ask is — how to withdraw money from V3 Game safely and easily?</p>
      
      <h3>What is V3 Game Wallet Withdraw?</h3>
      <p>V3 Game is an online gaming and earning app that offers various games, challenges, and rewards. Players can deposit money, play, and earn real cash prizes. The app also provides a V3 Wallet, where all your winnings are stored.</p>
      <p>Once you earn enough balance, you can transfer the funds from your V3 Game Wallet to your bank account or UPI.</p>
      
      <h3>Step-by-Step Process for V3 Game Money Withdraw</h3>
      <ol>
        <li><strong>Login to Your V3 Account</strong> – Open the V3 Game app or website and log in using your registered mobile number or email.</li>
        <li><strong>Go to the Wallet Section</strong> – Tap on the "Wallet" or "My Wallet" option to see your available balance.</li>
        <li><strong>Select the Withdraw Option</strong> – Look for the "Withdraw" button in your Wallet section.</li>
        <li><strong>Enter the Withdrawal Amount</strong> – Enter the exact amount you want to withdraw within the limits.</li>
        <li><strong>Choose Your Payment Method</strong> – V3 Game allows UPI (Google Pay, PhonePe, Paytm), Direct Bank Transfer, or Paytm Wallet.</li>
        <li><strong>Submit and Confirm</strong> – Check your account details before submitting the request.</li>
        <li><strong>Wait for the Transfer</strong> – Withdrawals are usually completed within a few minutes to a few hours.</li>
      </ol>
      
      <h3>Things to Check Before V3 Game Wallet Withdraw</h3>
      <ul>
        <li><strong>Verify your account</strong> – Your mobile number and payment method should be verified.</li>
        <li><strong>Meet the minimum withdrawal limit</strong> – Some platforms require a minimum balance (for example, ₹100).</li>
        <li><strong>Avoid fake apps</strong> – Always use the official V3 Game app or website.</li>
        <li><strong>Stable internet connection</strong> – Interrupted transactions can delay withdrawals.</li>
      </ul>
      
      <h3>Common Issues During V3 Game Wallet Money Withdraw</h3>
      <ul>
        <li><strong>Pending Withdrawals</strong> – If your withdrawal shows as "Pending," wait for 24 hours before contacting support.</li>
        <li><strong>Incorrect UPI or Bank Details</strong> – Make sure your UPI ID or bank account number is entered correctly.</li>
        <li><strong>Unverified Account</strong> – Complete your KYC verification if required.</li>
        <li><strong>Technical Errors</strong> – Try again after some time if there are server delays.</li>
      </ul>
      
      <h3>Tips for Safe and Quick V3 Money Withdraw</h3>
      <ul>
        <li>Use your own account – Always withdraw money to your own verified UPI or bank account.</li>
        <li>Avoid multiple withdrawal requests – Wait for one transaction to complete before starting another.</li>
        <li>Keep screenshots – In case of any dispute, screenshots help when contacting customer support.</li>
        <li>Contact support if delayed – Use the in-app support or email option for help if your funds don't arrive within 24 hours.</li>
      </ul>
    `
  },
  {
    id: 4,
    image: blogImage4,
    title: "V3 Game App Download",
    excerpt: "Learn how to download the V3 Game app and start playing on your mobile device.",
    content: `
      <h2>V3 Game Login App & Lottery Download – Complete Guide for Indian Users</h2>
      <p>Online gaming and lottery platforms have gained massive popularity across India in recent years. Among these, the V3 Game Login App has quickly become a popular choice for players who enjoy games of skill, entertainment, and luck-based lotteries.</p>
      
      <h3>How to Download the V3 Game App in India?</h3>
      <p>Downloading the V3 Game login app apk is easy and quick. Since it may not be available directly on the Google Play Store, users can follow these steps:</p>
      <ol>
        <li>Visit the official V3 Game website on your mobile browser.</li>
        <li>Find the download link for the V3 Game login apk.</li>
        <li>Tap the link to download the file.</li>
        <li>Once downloaded, go to your phone settings and enable "Install from Unknown Sources."</li>
        <li>Open the apk file and install it on your device.</li>
        <li>After installation, launch the app and complete the V3 Game login process using your registered mobile number or email.</li>
      </ol>
      
      <h3>V3 Game Login Lottery – How It Works?</h3>
      <p>The V3 Game login lottery section allows players to buy digital tickets for upcoming draws. Each lottery has a fixed schedule, and players can view results through their login dashboard. The more tickets you purchase, the higher your chances of winning.</p>
      <p>The lottery operates transparently, displaying winners and results publicly within the app.</p>
      
      <h3>Why Choose the V3 Game Login App in India?</h3>
      <ul>
        <li><strong>Convenience</strong> – Easy to access from anywhere through mobile login or apk download.</li>
        <li><strong>Entertainment</strong> – Offers both gaming and lottery experiences in one place.</li>
        <li><strong>Security</strong> – Uses advanced data protection systems.</li>
        <li><strong>Transparency</strong> – Clear rules and visible results for all lottery draws.</li>
        <li><strong>Accessibility</strong> – Works well on Android devices with low system requirements.</li>
      </ul>
      
      <h3>FAQ's</h3>
      <p><strong>How do I register for V3 Game login?</strong><br/>You can register using your mobile number or email on the official app or website and then log in with your credentials.</p>
      <p><strong>Is the V3 Game login app safe to use in India?</strong><br/>Yes, the app follows standard security measures, making it safe for Indian users who download it from the official source.</p>
      <p><strong>How can I participate in the V3 Game lottery?</strong><br/>After logging in, visit the lottery section, choose your draw, buy tickets, and wait for the result announcements.</p>
      <p><strong>Can I withdraw my earnings easily?</strong><br/>Yes, the app supports quick withdrawals to bank accounts or digital wallets like UPI and Paytm.</p>
    `
  }
];

export default function BlogPage() {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  const selectedArticle = guideArticles.find(a => a.id === selectedArticleId);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #000c1c 0%, #001a3d 100%)' }}>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3" style={{ background: 'rgba(0,12,28,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(254,211,88,0.15)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity" data-testid="link-back-home">
            <Home className="w-5 h-5" style={{ color: '#FED358' }} />
            <span className="text-sm font-medium" style={{ color: '#FED358' }}>Home</span>
          </Link>
          <a 
            href="https://t.me/Earn_With_Milind_77" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: '#FED358' }}
          >
            <FaTelegram className="text-black" />
            <span className="text-black text-sm font-medium">Join Us</span>
          </a>
        </div>
      </nav>

      <main className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#FED358' }}>Blog</h1>
            <p className="text-lg" style={{ color: 'rgba(253, 228, 188, 0.8)' }}>
              Latest news, tips, and strategies
            </p>
          </div>

          {/* Guides & Tips Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#FED358' }}>Guides & Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guideArticles.map((article) => (
                <div 
                  key={article.id}
                  onClick={() => setSelectedArticleId(article.id)}
                  className="rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(254, 211, 88, 0.2)'
                  }}
                  data-testid={`card-guide-${article.id}`}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 text-sm md:text-base line-clamp-2" style={{ color: '#FDE4BC' }}>
                      {article.title}
                    </h3>
                    <p className="text-xs md:text-sm line-clamp-2" style={{ color: 'rgba(253, 228, 188, 0.7)' }}>
                      {article.excerpt}
                    </p>
                    <button 
                      className="mt-3 text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 flex items-center gap-2"
                      style={{ background: '#FED358', color: '#000' }}
                      data-testid={`button-read-guide-${article.id}`}
                    >
                      Read More <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blog Posts Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#FED358' }}>Latest Posts</h2>
            <div className="grid gap-6">
              {blogPosts.map((post) => (
                <article 
                  key={post.id}
                  className="rounded-2xl p-6 transition-all hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(254, 211, 88, 0.2)'
                  }}
                  data-testid={`blog-post-${post.id}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4" style={{ color: '#FED358' }} />
                    <span className="text-sm" style={{ color: 'rgba(253, 228, 188, 0.6)' }}>
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3" style={{ color: '#FDE4BC' }}>
                    {post.title}
                  </h2>
                  <p className="mb-4" style={{ color: 'rgba(253, 228, 188, 0.7)' }}>
                    {post.excerpt}
                  </p>
                  <button 
                    className="flex items-center gap-2 font-medium transition-all hover:gap-3"
                    style={{ color: '#FED358' }}
                    data-testid={`button-read-more-${post.id}`}
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>

          {blogPosts.length === 0 && guideArticles.length === 0 && (
            <div className="text-center py-12">
              <p style={{ color: 'rgba(253, 228, 188, 0.6)' }}>
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Article Dialog */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          onClick={() => setSelectedArticleId(null)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6"
            style={{ 
              background: 'linear-gradient(135deg, #000c1c 0%, #001a3d 100%)',
              border: '2px solid rgba(254, 211, 88, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticleId(null)}
              className="absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110"
              style={{ background: 'rgba(254, 211, 88, 0.2)' }}
              data-testid="button-close-article"
            >
              <X className="w-5 h-5" style={{ color: '#FED358' }} />
            </button>
            
            <div className="mb-6">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#FED358' }}>
              {selectedArticle.title}
            </h2>
            
            <div 
              className="prose prose-invert max-w-none"
              style={{ 
                color: 'rgba(253, 228, 188, 0.9)',
              }}
              dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
            />
            
            <style>{`
              .prose h2 { color: #FED358; font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 1rem; }
              .prose h3 { color: #FDE4BC; font-size: 1.25rem; margin-top: 1.25rem; margin-bottom: 0.75rem; }
              .prose p { margin-bottom: 1rem; line-height: 1.7; }
              .prose ul, .prose ol { margin-left: 1.5rem; margin-bottom: 1rem; }
              .prose li { margin-bottom: 0.5rem; }
              .prose strong { color: #FED358; }
            `}</style>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
