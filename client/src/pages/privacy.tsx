import { Link } from "wouter";
import { ArrowLeft, Shield, Database, Cookie, Eye, Trash2, Share2, Lock, Baby, Link2, RefreshCw, Mail } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import logoPath from "@assets/logo_nav_1756545819204.png";

export default function PrivacyPage() {
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
            <Shield className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: '#FED358' }}>
            Privacy Policy
          </h1>
          <p className="text-lg opacity-80" style={{ color: '#FDE4BC' }}>
            How we collect, use, and protect your information
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-6">
        {/* Introduction */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <p className="text-base leading-relaxed" style={{ color: '#FDE4BC' }}>
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You. We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
          </p>
        </div>

        {/* Definitions */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Database className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Definitions</h2>
              <ul className="space-y-3" style={{ color: '#FDE4BC' }}>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to V3 Game.</li>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website.</li>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Country</strong> refers to: Delhi, India.</li>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Website</strong> refers to V3 Game, accessible from https://v3game.digital/.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Collection */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Eye className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Collecting and Using Your Personal Data</h2>
              <p className="text-base leading-relaxed opacity-90 mb-4" style={{ color: '#FDE4BC' }}>
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You.
              </p>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                Usage Data is collected automatically when using the Service. This may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.
              </p>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Cookie className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Tracking Technologies and Cookies</h2>
              <p className="text-base leading-relaxed opacity-90 mb-4" style={{ color: '#FDE4BC' }}>
                We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent.
              </p>
              <ul className="space-y-2 ml-4" style={{ color: '#FDE4BC' }}>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Necessary Cookies:</strong> Essential to provide You with services available through the Website.</li>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Acceptance Cookies:</strong> Identify if users have accepted the use of cookies on the Website.</li>
                <li className="opacity-90"><strong style={{ color: '#FED358' }}>Functionality Cookies:</strong> Allow us to remember choices You make when You use the Website.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use of Data */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Share2 className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Use of Your Personal Data</h2>
              <ul className="space-y-2" style={{ color: '#FDE4BC' }}>
                <li className="opacity-90">- To provide and maintain our Service, including to monitor the usage of our Service.</li>
                <li className="opacity-90">- To manage Your Account and registration as a user of the Service.</li>
                <li className="opacity-90">- For the performance of a contract for products, items or services You have purchased.</li>
                <li className="opacity-90">- To contact You by email, telephone calls, SMS, or other electronic communication.</li>
                <li className="opacity-90">- To provide You with news, special offers and general information about other goods and services.</li>
                <li className="opacity-90">- To manage Your requests to Us.</li>
                <li className="opacity-90">- For data analysis, identifying usage trends, and improving our Service.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Database className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Retention of Your Personal Data</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
              </p>
            </div>
          </div>
        </div>

        {/* Delete Data */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Trash2 className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Delete Your Personal Data</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You. You may update, amend, or delete Your information at any time by signing in to Your Account and visiting the account settings section. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.
              </p>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Lock className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Security of Your Personal Data</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
              </p>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Baby className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Children's Privacy</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.
              </p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <Link2 className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Links to Other Websites</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
              </p>
            </div>
          </div>
        </div>

        {/* Changes */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(254,211,88,0.2)' }}>
              <RefreshCw className="w-5 h-5" style={{ color: '#FED358' }} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Changes to this Privacy Policy</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="p-6 rounded-2xl" style={{ background: 'rgba(254,211,88,0.1)', border: '1px solid rgba(254,211,88,0.2)' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1" style={{ background: '#FED358' }}>
              <Mail className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-3" style={{ color: '#FED358' }}>Contact Us</h2>
              <p className="text-base leading-relaxed opacity-90" style={{ color: '#FDE4BC' }}>
                If you have any questions about this Privacy Policy, You can contact us by visiting our website:{" "}
                <a href="https://v3game.digital/" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: '#FED358' }}>
                  https://v3game.digital/
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="pt-6 text-center">
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
