import { Link } from "wouter";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import logoPath from "@assets/logo_nav_1756545819204.png";

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000c1c 0%, #0a1628 100%)' }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3" style={{ background: 'rgba(0,12,28,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(254,211,88,0.15)' }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity" data-testid="link-back-home">
            <ArrowLeft className="w-5 h-5" />
            <img src={logoPath} alt="V3 GAME Logo" className="h-6" />
          </Link>
          <a 
            href="https://t.me/officialteacherofv3games_bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: '#FED358' }}
          >
            <FaTelegram className="text-black" />
            <span className="text-black text-sm font-medium">Contact Us</span>
          </a>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: '#FED358' }}>
            <MessageCircle className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#FED358' }}>
            Contact Us
          </h1>
          <p className="text-lg opacity-80" style={{ color: '#FDE4BC' }}>
            Get in touch with our team
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="p-8 rounded-2xl text-center" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ background: 'rgba(0,136,204,0.2)' }}>
            <FaTelegram className="w-10 h-10" style={{ color: '#0088cc' }} />
          </div>
          
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#FED358' }}>
            Reach Us on Telegram
          </h2>
          
          <p className="text-base leading-relaxed opacity-90 mb-6" style={{ color: '#FDE4BC' }}>
            For any queries, support, or assistance, feel free to contact us through our official Telegram channel. Our team is ready to help you!
          </p>
          
          <a 
            href="https://t.me/officialteacherofv3games_bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-lg"
            style={{ background: '#0088cc', color: 'white' }}
            data-testid="link-telegram-contact"
          >
            <FaTelegram className="w-6 h-6" />
            @officialteacherofv3games_bot
          </a>
          
          <p className="mt-6 text-sm opacity-70" style={{ color: '#FDE4BC' }}>
            Click the button above to open Telegram and start a conversation
          </p>
        </div>

        {/* Back Button */}
        <div className="pt-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            style={{ background: '#FED358', color: '#000c1c' }}
            data-testid="button-back-home"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
