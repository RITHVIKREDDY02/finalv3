import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import logoPath from "@assets/logo_nav_1756545819204.png";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen" style={{ background: '#000c1c' }}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3" style={{ background: 'rgba(0,12,28,0.95)', borderBottom: '1px solid rgba(254,211,88,0.2)' }}>
        <div className="max-w-4xl mx-auto flex items-center">
          <Link href="/" className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity" data-testid="link-back-home">
            <ArrowLeft className="w-5 h-5" />
            <img src={logoPath} alt="V3 GAME Logo" className="h-6" />
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#FED358' }}>Disclaimer</h1>
        
        <div className="space-y-6 leading-relaxed" style={{ color: '#FDE4BC' }}>
          <p>
            If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at{" "}
            <a href="mailto:starletpo123@gmail.com" className="hover:underline" style={{ color: '#FED358' }}>
              starletpo123@gmail.com
            </a>
          </p>

          <h2 className="text-xl font-semibold mt-8" style={{ color: '#FED358' }}>Disclaimers for V3 Game</h2>
          <p>
            All the information on this website - https://v3game.digital/ - is published in good faith and for general information purposes only. V3 Game does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (V3 Game), is strictly at your own risk. V3 Game will not be liable for any losses and/or damages in connection with the use of our website.
          </p>

          <p>
            From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link that may have gone 'bad'.
          </p>

          <p>
            Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.
          </p>

          <h2 className="text-xl font-semibold mt-8" style={{ color: '#FED358' }}>Consent</h2>
          <p>
            By using our website, you hereby consent to our disclaimer and agree to its terms.
          </p>

          <h2 className="text-xl font-semibold mt-8" style={{ color: '#FED358' }}>Update</h2>
          <p>
            Should we update, amend or make any changes to this document, those changes will be prominently posted here.
          </p>
        </div>

        <div className="mt-12">
          <Link 
            href="/"
            className="inline-block px-6 py-3 font-medium rounded-lg transition-colors"
            style={{ background: '#FED358', color: '#000c1c' }}
            data-testid="button-back-home"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
