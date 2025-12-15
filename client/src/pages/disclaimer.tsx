import { Link } from "wouter";
import { Home, Mail, FileText, Link2, Shield, CheckCircle, RefreshCw } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000c1c 0%, #0a1628 100%)' }}>
      {/* Navigation Bar */}
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

      {/* Hero Header */}
      <div className="pt-24 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: '#FED358' }}>
            <FileText className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#FED358' }}>
            Disclaimer
          </h1>
          <p className="text-lg opacity-80" style={{ color: '#FDE4BC' }}>
            Please read this disclaimer carefully before using our services
          </p>
        </div>
      </div>

      {/* Contact Card */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="p-5 rounded-2xl flex items-center gap-4" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FED358' }}>
            <Mail className="w-6 h-6 text-black" />
          </div>
          <div>
            <p className="text-sm opacity-70 mb-1" style={{ color: '#FDE4BC' }}>Have questions? Contact us at</p>
            <a href="mailto:starletpo123@gmail.com" className="text-lg font-semibold hover:underline" style={{ color: '#FED358' }}>
              starletpo123@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-6">
        {/* Section 1 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <FileText className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Disclaimers for V3 Game</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                All the information on this website - https://v3game.digital/ - is published in good faith and for general information purposes only. V3 Game does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (V3 Game), is strictly at your own risk. V3 Game will not be liable for any losses and/or damages in connection with the use of our website.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Link2 className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>External Links</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link that may have gone 'bad'.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Shield className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Privacy Notice</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Consent</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                By using our website, you hereby consent to our disclaimer and agree to its terms.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <RefreshCw className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Update</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                Should we update, amend or make any changes to this document, those changes will be prominently posted here.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
