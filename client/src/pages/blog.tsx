import { Link } from "wouter";
import { Home, Calendar, ArrowRight } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import Footer from "@/components/footer";

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#FED358' }}>Blog</h1>
            <p className="text-lg" style={{ color: 'rgba(253, 228, 188, 0.8)' }}>
              Latest news, tips, and strategies
            </p>
          </div>

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

          {blogPosts.length === 0 && (
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
