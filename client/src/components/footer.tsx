import { Link } from "wouter";
import { FaTelegram, FaInstagram, FaYoutube } from "react-icons/fa";
import { Gift, BookOpen, FileText, Shield, Phone, Home } from "lucide-react";
import logoPath from "@assets/logo_nav_1756545819204.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #000c1c 0%, #001228 100%)' }}>
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, transparent, #FED358, transparent)' }}
      />
      
      <div className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={logoPath} alt="V3 GAME Logo" className="h-8" />
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(253, 228, 188, 0.7)' }}>
                Your trusted platform for winning predictions. Join thousands of VIP members winning daily with our expert analysis.
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://t.me/Earn_With_Milind_77" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, rgba(254, 211, 88, 0.2), rgba(251, 94, 4, 0.2))', border: '1px solid rgba(254, 211, 88, 0.3)' }}
                  data-testid="link-footer-telegram"
                >
                  <FaTelegram className="w-5 h-5" style={{ color: '#FED358' }} />
                </a>
                <a 
                  href="#" 
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, rgba(254, 211, 88, 0.2), rgba(251, 94, 4, 0.2))', border: '1px solid rgba(254, 211, 88, 0.3)' }}
                  data-testid="link-footer-instagram"
                >
                  <FaInstagram className="w-5 h-5" style={{ color: '#FED358' }} />
                </a>
                <a 
                  href="#" 
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, rgba(254, 211, 88, 0.2), rgba(251, 94, 4, 0.2))', border: '1px solid rgba(254, 211, 88, 0.3)' }}
                  data-testid="link-footer-youtube"
                >
                  <FaYoutube className="w-5 h-5" style={{ color: '#FED358' }} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: '#FED358' }}>
                <Home className="w-4 h-4" />
                Quick Links
              </h3>
              <div className="flex flex-col gap-3">
                <Link href="/" className="text-sm hover:translate-x-1 transition-all duration-200 flex items-center gap-2" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-home">
                  <span className="w-1 h-1 rounded-full" style={{ background: '#FED358' }} />
                  Home
                </Link>
                <Link href="/register-guide" className="text-sm hover:translate-x-1 transition-all duration-200 flex items-center gap-2" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-register-guide">
                  <span className="w-1 h-1 rounded-full" style={{ background: '#FED358' }} />
                  Register Guide
                </Link>
                <Link href="/login-bonus" className="text-sm hover:translate-x-1 transition-all duration-200 flex items-center gap-2" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-login-bonus">
                  <span className="w-1 h-1 rounded-full" style={{ background: '#FED358' }} />
                  Login Bonus
                </Link>
                <Link href="/blog" className="text-sm hover:translate-x-1 transition-all duration-200 flex items-center gap-2" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-blog">
                  <span className="w-1 h-1 rounded-full" style={{ background: '#FED358' }} />
                  Blog
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: '#FED358' }}>
                <FileText className="w-4 h-4" />
                Legal
              </h3>
              <div className="flex flex-col gap-3">
                <Link href="/disclaimer" className="text-sm hover:translate-x-1 transition-all duration-200 flex items-center gap-2" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-disclaimer">
                  <span className="w-1 h-1 rounded-full" style={{ background: '#FED358' }} />
                  Disclaimer
                </Link>
                <Link href="/terms" className="text-sm hover:translate-x-1 transition-all duration-200 flex items-center gap-2" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-terms">
                  <span className="w-1 h-1 rounded-full" style={{ background: '#FED358' }} />
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-sm hover:translate-x-1 transition-all duration-200 flex items-center gap-2" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-privacy">
                  <span className="w-1 h-1 rounded-full" style={{ background: '#FED358' }} />
                  Privacy Policy
                </Link>
                <Link href="/contact" className="text-sm hover:translate-x-1 transition-all duration-200 flex items-center gap-2" style={{ color: 'rgba(253, 228, 188, 0.7)' }} data-testid="link-footer-contact">
                  <span className="w-1 h-1 rounded-full" style={{ background: '#FED358' }} />
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: '#FED358' }}>
                <Gift className="w-4 h-4" />
                Join VIP
              </h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(253, 228, 188, 0.7)' }}>
                Get exclusive predictions and win big with our VIP membership!
              </p>
              <a 
                href="https://t.me/Earn_With_Milind_77" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(180deg,#f8bf6e,#fb5e04)', color: '#000' }}
                data-testid="button-footer-join-vip"
              >
                <FaTelegram className="w-4 h-4" />
                Join Now
              </a>
            </div>
          </div>
          
          <div 
            className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(254, 211, 88, 0.15)' }}
          >
            <p className="text-sm" style={{ color: 'rgba(253, 228, 188, 0.5)' }}>
              © 2025 V3 GAME. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" style={{ color: 'rgba(253, 228, 188, 0.4)' }} />
              <span className="text-xs" style={{ color: 'rgba(253, 228, 188, 0.4)' }}>
                Secure & Trusted Platform
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
