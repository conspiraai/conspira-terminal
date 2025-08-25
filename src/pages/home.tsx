import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Mail, Twitter, Terminal, BarChart3, TrendingUp, Activity, Zap, MousePointer, PieChart } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { HypedNowWidget } from "@/components/HypedNowWidget";



const memePhrases = [
  "To the Moon! 🚀",
  "HODL or FOLD 💎", 
  "Wen Lambo? 🐂"
];

function MemeMarquee() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);

    const handleChange = () => setShouldAnimate(!mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memePhrases.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [shouldAnimate]);

  // Ensure motd-text class is always applied
  useEffect(() => {
    const rot = document.getElementById('motd-rotator');
    if (rot) {
      const ensureSpan = () => {
        const txtNode = [...rot.childNodes].find(n => n.nodeType === 3) || null;
        const existing = rot.querySelector('.motd-text');
        if (txtNode) {
          const span = document.createElement('span');
          span.className = 'motd-text';
          span.textContent = txtNode.textContent;
          rot.replaceChild(span, txtNode);
        } else if (existing && !existing.classList.contains('motd-text')) {
          existing.classList.add('motd-text');
        }
      };
      ensureSpan();
      const observer = new MutationObserver(() => setTimeout(ensureSpan, 0));
      observer.observe(rot, { childList: true, subtree: true, characterData: true });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="py-4 bg-gray-900/30 border-y border-gray-700">
      <div className="text-center flex items-center justify-center min-h-[2rem]">
        <span id="motd-rotator">
          <span className="motd-text text-lg font-bold">
            {memePhrases[currentIndex]}
          </span>
        </span>
      </div>
    </div>
  );
}

function QuickNavCard({ title, description, href, icon, iconComponent }: {
  title: string;
  description: string;
  href: string;
  icon?: string;
  iconComponent?: React.ReactNode;
}) {
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Random ambient scanline animation every 10-20 seconds
    const scheduleNextScan = () => {
      const delay = Math.random() * 10000 + 10000; // 10-20 seconds
      setTimeout(() => {
        setIsScanning(true);
        setTimeout(() => setIsScanning(false), 2000); // Scan duration
        scheduleNextScan();
      }, delay);
    };
    
    scheduleNextScan();
  }, []);

  return (
    <Link href={href}>
      <div 
        className={`module-card scanline-sweep cursor-pointer feature-box ${isScanning ? 'active' : ''}`} 
        data-testid={`nav-card-${title.toLowerCase().replace(' ', '-')}`}
        aria-label={`Navigate to ${title.replace('ENHANCED FLOW', 'Live Flow').replace('FLOW INTEL', 'Live Flow').replace('MARKET HUB', 'Dashboard').replace('ENHANCED MARKET', 'Analysis')} page`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="module-icon">
            {iconComponent || <span className="text-3xl">{icon}</span>}
          </div>
          <h3 className="module-title text-[color:var(--text-primary)]">{title}</h3>
        </div>
        <p className="module-description">{description}</p>
      </div>
    </Link>
  );
}

function EarthCamSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    if (!isExpanded) {
      setIsLoading(true);
    }
    setIsExpanded(!isExpanded);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="mt-8">
      <div className="text-center mb-4">
        <p className="mb-4 text-sm">
          <span className="trippy-text">If you're not touching grass, at least look at it 🌱</span>
        </p>
        <Button
          onClick={handleToggle}
          variant="outline"
          className="bg-black/60 border-green-500/30 text-green-400 hover:bg-green-500/10"
          aria-expanded={isExpanded}
          aria-controls="earthcam-embed"
        >
          {isExpanded ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
          View EarthCam
        </Button>
      </div>
      
      {isExpanded && (
        <div id="earthcam-embed" className="max-w-4xl mx-auto">
          <div className="relative">
            {isLoading && (
              <div className="h-96 bg-gray-800/50 rounded-lg flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
              </div>
            )}
            <iframe
              src="https://www.earthcam.com/"
              className={`w-full h-96 rounded-lg border border-green-500/30 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
              title="EarthCam Live Feed"
              onLoad={handleIframeLoad}
              style={{ 
                filter: 'sepia(20%) hue-rotate(260deg) saturate(120%) contrast(110%)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function EmailSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service
    console.log("Email signup:", email);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="text-center text-green-400 font-mono">
        ✓ You're in the loop!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
      <Input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-black/60 border-pink-500/30 text-white placeholder:text-gray-400"
      />
      <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white">
        <Mail className="h-4 w-4" />
      </Button>
    </form>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Navigation />
      
      {/* Hero Header */}
      <div className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 text-[#ff1493]" style={{
            textShadow: '0 0 5px #ff1493, 0 0 10px #ff1493'
          }}>
            CONSPIRA AI
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
            Uncover the Crypto Undercurrent
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/flow">
              <Button 
                size="lg" 
                className="bg-black/80 hover:bg-black/60 text-white border-2 border-white/20 hover:border-white/40 transition-all duration-300 px-8 py-3"
              >
                <Terminal className="mr-2 h-5 w-5" />
                Enter Terminal
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.open("https://x.com/conspira_ai?s=21", "_blank")}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/40 hover:border-white/60 transition-all duration-300 px-8 py-3"
            >
              <Twitter className="mr-2 h-5 w-5" />
              Follow on X
            </Button>
            
            <div className="bg-black/60 rounded-lg p-4 border-2 border-white/20">
              <div className="text-sm text-white/90 mb-2">Get Notified</div>
              <EmailSignup />
            </div>
          </div>
        </div>
      </div>

      {/* Meme Marquee */}
      <MemeMarquee />

      <div className="container mx-auto px-4 py-12">
        {/* Hyped Now Widget */}
        <div className="mb-12">
          <HypedNowWidget />
        </div>
        
        {/* Quick Navigation Cards */}
        <div className="section--navigate-intel mb-12">
          <h2 className="section-title text-3xl font-bold text-center mb-8 text-[color:var(--text-primary)] module-title">
            NAVIGATE INTELLIGENCE
          </h2>
          <div className="flex flex-col lg:flex-row gap-6">
            <QuickNavCard
              title="ENHANCED FLOW"
              description="Premium flow analysis with advanced filtering and predictive insights"
              href="/market/live"
              iconComponent={<Zap className="w-8 h-8" style={{color: '#A259FF'}} />}
            />
            
            <QuickNavCard
              title="FLOW INTEL"
              description="Real-time trade streams with whale tracking and live market pulse monitoring"
              href="/market/live"
              iconComponent={<Activity className="w-8 h-8" style={{color: '#FF8C42'}} />}
            />
            
            <QuickNavCard
              title="MARKET HUB"
              description="Live Solana market data with comprehensive token analytics and insights"
              href="/market/dashboard"
              iconComponent={<PieChart className="w-8 h-8" style={{color: '#00CFFF'}} />}
            />
            
            <QuickNavCard
              title="ENHANCED MARKET"
              description="Advanced market intelligence with deep analytics and volume tracking"
              href="/market/analysis"
              iconComponent={<TrendingUp className="w-8 h-8" style={{color: '#4ADE80'}} />}
            />
          </div>
        </div>

        {/* EarthCam Section */}
        <EarthCamSection />
      </div>
      
      <Footer />
    </div>
  );
}