import { Link } from "wouter";
import { Home, Calendar, ArrowRight } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import Footer from "@/components/footer";

const blogImage1 = "/images/1_1765905221064.png";
const blogImage2 = "/images/2_1765905221063.png";
const blogImage3 = "/images/3_1765905221064.png";
const blogImage4 = "/images/4_1765905221064.png";

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
  },
  {
    id: 2,
    image: blogImage2,
    title: "V3 Game Login & Win Bonus",
    excerpt: "Learn how to login and claim your daily bonuses on V3 Game platform.",
  },
  {
    id: 3,
    image: blogImage3,
    title: "How to Withdraw in V3 Game?",
    excerpt: "Complete guide to withdraw money from V3 Game wallet to your bank account.",
  },
  {
    id: 4,
    image: blogImage4,
    title: "V3 Game App Download",
    excerpt: "Learn how to download the V3 Game app and start playing on your mobile device.",
  }
];

export default function BlogPage() {
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

          {/* Blog Posts Section */}
          <div className="mb-12">
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

          {/* Guides & Tips Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#FED358' }}>Guides & Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guideArticles.map((article) => (
                <Link 
                  key={article.id}
                  href={`/guide/${article.id}`}
                  className="rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl block"
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
                    <span 
                      className="mt-3 text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 inline-flex items-center gap-2"
                      style={{ background: '#FED358', color: '#000' }}
                    >
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
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

      <Footer />
    </div>
  );
}
