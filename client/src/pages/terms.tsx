import { Link } from "wouter";
import { Home, FileText, Scale, Shield, AlertTriangle, RefreshCw, Link2, BookOpen, Lock, Gavel } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

export default function TermsPage() {
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
            <Scale className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#FED358' }}>
            Terms of Service
          </h1>
          <p className="text-lg opacity-80" style={{ color: '#FDE4BC' }}>
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-6">
        {/* Introduction */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
            By accessing this Website, accessible from https://v3game.digital/, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trademark law.
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <FileText className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>2. Use a License</h2>
              <p className="text-base leading-relaxed opacity-90 mb-4" style={{ color: '#FDE4BC' }}>
                Permission is granted to temporarily download one copy of the materials on the V3 Game's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#FDE4BC' }}>
                <li className="flex items-start gap-2 opacity-90">
                  <span style={{ color: '#FED358' }}>-</span>
                  <span>modify or copy the materials;</span>
                </li>
                <li className="flex items-start gap-2 opacity-90">
                  <span style={{ color: '#FED358' }}>-</span>
                  <span>use the materials for any commercial purpose or for any public display;</span>
                </li>
                <li className="flex items-start gap-2 opacity-90">
                  <span style={{ color: '#FED358' }}>-</span>
                  <span>attempt to reverse engineer any software contained on V3 Game's Website;</span>
                </li>
                <li className="flex items-start gap-2 opacity-90">
                  <span style={{ color: '#FED358' }}>-</span>
                  <span>remove any copyright or other proprietary notations from the materials; or</span>
                </li>
                <li className="flex items-start gap-2 opacity-90">
                  <span style={{ color: '#FED358' }}>-</span>
                  <span>transferring the materials to another person or "mirror" the materials on any other server.</span>
                </li>
              </ul>
              <p className="text-base leading-relaxed opacity-90 mt-4" style={{ color: '#FDE4BC' }}>
                This will let V3 Game terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <AlertTriangle className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>3. Disclaimer</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                All the materials on V3 Game's Website are provided "as is". V3 Game makes no warranties, may it be expressed or implied, and therefore negates all other warranties. Furthermore, V3 Game does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Shield className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>4. Limitations</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                V3 Game or its suppliers will not be held accountable for any damages that will arise with the use or inability to use the materials on V3 Game's Website, even if V3 Game or an authorized representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
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
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>5. Revisions and Errata</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                The materials appearing on V3 Game's Website may include technical, typographical, or photographic errors. V3 Game will not promise that any of the materials on this Website are accurate, complete, or current. V3 Game may change the materials contained on its Website at any time without notice. V3 Game does not make any commitment to update the materials.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Link2 className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>6. Links</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                V3 Game has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by the V3 Game of the site. The use of any linked website is at the user's own risk.
              </p>
            </div>
          </div>
        </div>

        {/* Section 7 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <BookOpen className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>7. Site Terms of Use Modifications</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                V3 Game may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
              </p>
            </div>
          </div>
        </div>

        {/* Section 8 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Lock className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>8. Your Privacy</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                Please read our{" "}
                <Link href="/privacy" className="hover:underline" style={{ color: '#FED358' }}>
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Section 9 */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Gavel className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>9. Governing Law</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                Any claim related to V3 Game's Website shall be governed by the laws of India without regard to its conflict of law provisions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
