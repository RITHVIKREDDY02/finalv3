import { Link } from "wouter";
import { ArrowLeft, Scale, Mail, FileText, CheckCircle, RefreshCw, ExternalLink, Shield } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import logoPath from "@assets/logo_nav_1756545819204.png";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000c1c 0%, #0a1628 50%, #000c1c 100%)' }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3" style={{ background: 'linear-gradient(180deg, rgba(0,12,28,0.98) 0%, rgba(0,12,28,0.9) 100%)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity" data-testid="link-back-home">
              <ArrowLeft className="w-5 h-5" />
              <img src={logoPath} alt="V3 GAME Logo" className="h-6" />
          </Link>
          <a 
            href="https://t.me/Earn_With_Milind_77" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #FED358, #FF6B35)' }}
          >
            <FaTelegram className="text-black" />
            <span className="text-black text-sm font-medium">Join Us</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(254,211,88,0.15) 0%, transparent 50%)' }}></div>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #FED358 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
        <div className="absolute top-40 right-10 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #FED358 0%, transparent 70%)', filter: 'blur(50px)' }}></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center pt-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 shadow-2xl" style={{ background: 'linear-gradient(135deg, #FED358 0%, #FED358 100%)' }}>
            <Scale className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: '#FED358' }}>
            Disclaimer
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#FDE4BC' }}>
            Important information about our website and services
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="p-6 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#FED358' }}>
              <Mail className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="text-base" style={{ color: '#FDE4BC' }}>
                If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at{" "}
                <a href="mailto:starletpo123@gmail.com" className="font-semibold hover:underline" style={{ color: '#FED358' }}>
                  starletpo123@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer Sections */}
      <div className="max-w-4xl mx-auto px-6 mb-16 space-y-6">
        {/* Disclaimers for V3 Game */}
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#FED358' }}>
              <FileText className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FED358' }}>Disclaimers for V3 Game</h3>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                All the information on this website - https://v3game.digital/ - is published in good faith and for general information purposes only. V3 Game does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (V3 Game), is strictly at your own risk. V3 Game will not be liable for any losses and/or damages in connection with the use of our website.
              </p>
            </div>
          </div>
        </div>

        {/* External Links */}
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#FED358' }}>
              <ExternalLink className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FED358' }}>External Links</h3>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link that may have gone 'bad'.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#FED358' }}>
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FED358' }}>Privacy Notice</h3>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.
              </p>
            </div>
          </div>
        </div>

        {/* Consent */}
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#FED358' }}>
              <CheckCircle className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FED358' }}>Consent</h3>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                By using our website, you hereby consent to our disclaimer and agree to its terms.
              </p>
            </div>
          </div>
        </div>

        {/* Update */}
        <div className="p-8 rounded-3xl" style={{ background: 'rgba(254,211,88,0.08)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: '#FED358' }}>
              <RefreshCw className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3" style={{ color: '#FED358' }}>Update</h3>
              <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
                Should we update, amend or make any changes to this document, those changes will be prominently posted here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="relative p-10 rounded-3xl overflow-hidden text-center" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(254,211,88,0.4) 0%, transparent 50%)' }}></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#FED358' }}>Questions?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#FDE4BC' }}>
              Contact us at starletpo123@gmail.com for any clarifications.
            </p>
            <Link 
              href="/"
              className="inline-block px-10 py-4 font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-lg"
              style={{ background: '#FED358', color: '#1a1520' }}
              data-testid="button-back-home"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
