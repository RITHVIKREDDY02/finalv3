import { Link } from "wouter";
import { FaTelegram, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-8 px-4" style={{ background: 'rgba(0,12,28,0.98)', borderTop: '1px solid rgba(254,211,88,0.15)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FED358' }}>V3 GAME</h3>
            <p className="text-sm" style={{ color: 'rgba(253, 228, 188, 0.7)' }}>
              Your trusted platform for winning predictions. Join thousands of VIP members winning daily.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FED358' }}>Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-home">
                Home
              </Link>
              <Link href="/blog" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-blog">
                Blog
              </Link>
              <Link href="/disclaimer" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-disclaimer">
                Disclaimer
              </Link>
              <Link href="/terms" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-terms">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-privacy">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-sm hover:opacity-80 transition-opacity" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-contact">
                Contact Us
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: '#FED358' }}>Connect With Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://t.me/Earn_With_Milind_77" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(254, 211, 88, 0.2)', border: '1px solid rgba(254, 211, 88, 0.3)' }}
                data-testid="link-footer-telegram"
              >
                <FaTelegram className="w-5 h-5" style={{ color: '#FED358' }} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(254, 211, 88, 0.2)', border: '1px solid rgba(254, 211, 88, 0.3)' }}
                data-testid="link-footer-instagram"
              >
                <FaInstagram className="w-5 h-5" style={{ color: '#FED358' }} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(254, 211, 88, 0.2)', border: '1px solid rgba(254, 211, 88, 0.3)' }}
                data-testid="link-footer-youtube"
              >
                <FaYoutube className="w-5 h-5" style={{ color: '#FED358' }} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6" style={{ borderTop: '1px solid rgba(254, 211, 88, 0.1)' }}>
          <p className="text-center text-sm" style={{ color: 'rgba(253, 228, 188, 0.5)' }}>
            © 2025 V3 GAME. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
