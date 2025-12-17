import { Link } from "wouter";
import { Home, ArrowLeft } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import Footer from "@/components/footer";

const blogImage4 = "/images/4_1765905221064.webp";

export default function AboutPage() {
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <img 
              src={blogImage4} 
              alt="About V3 Game"
              loading="lazy"
              decoding="async"
              className="w-full h-64 object-cover rounded-2xl"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-6" style={{ color: '#FED358' }}>
            About Us
          </h1>
          
          <div className="prose prose-invert max-w-none" style={{ color: 'rgba(253, 228, 188, 0.9)' }}>
            <h2>Welcome to V3 Game Prediction Platform</h2>
            <p>We are a dedicated team of gaming enthusiasts and prediction experts committed to helping players make informed decisions on the V3 Game platform. Our mission is to provide accurate, reliable, and timely predictions to enhance your gaming experience.</p>
            
            <h3>Our Mission</h3>
            <p>At V3 Game Predictions, we believe in transparency, accuracy, and user satisfaction. Our goal is to create a trusted community where players can access quality predictions and guidance to improve their gaming journey.</p>
            
            <h3>What We Offer</h3>
            <ul>
              <li><strong>Expert Predictions</strong> – Our team analyzes patterns and trends to provide you with the best possible predictions.</li>
              <li><strong>Step-by-Step Guides</strong> – From registration to withdrawals, we guide you through every process.</li>
              <li><strong>24/7 Telegram Support</strong> – Join our community for real-time updates and assistance.</li>
              <li><strong>Free Resources</strong> – Access our blog articles, tips, and strategies at no cost.</li>
            </ul>
            
            <h3>Why Choose Us?</h3>
            <ul>
              <li><strong>Trusted by Thousands</strong> – Our community continues to grow with satisfied users across India.</li>
              <li><strong>Transparent Results</strong> – We share our prediction results openly with our community.</li>
              <li><strong>No Hidden Fees</strong> – All our basic resources and guides are completely free.</li>
              <li><strong>Active Community</strong> – Join our Telegram group for live updates and discussions.</li>
            </ul>
            
            <h3>Our Values</h3>
            <p>We are committed to responsible gaming. We encourage all our users to play within their limits and treat gaming as entertainment, not as a source of income. Always gamble responsibly and never bet more than you can afford to lose.</p>
            
            <h3>Contact Us</h3>
            <p>Have questions or suggestions? We'd love to hear from you! Join our Telegram community or reach out through our contact page. Our team is always ready to assist you.</p>
          </div>
          
          <style>{`
            .prose h2 { color: #FED358; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; }
            .prose h3 { color: #FDE4BC; font-size: 1.25rem; margin-top: 1.5rem; margin-bottom: 0.75rem; }
            .prose p { margin-bottom: 1rem; line-height: 1.8; }
            .prose ul { margin-left: 1.5rem; margin-bottom: 1rem; }
            .prose li { margin-bottom: 0.5rem; line-height: 1.7; }
            .prose strong { color: #FED358; }
          `}</style>
          
          <div className="mt-8 pt-6 border-t border-gray-700">
            <a
              href="https://t.me/Earn_With_Milind_77"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)' }}
              data-testid="button-join-telegram"
            >
              <FaTelegram className="text-xl" />
              Join Our Telegram Community
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
