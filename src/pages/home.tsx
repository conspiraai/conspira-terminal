import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/ui/navigation-menu";
import Footer from "@/components/footer";
import { Mail, Twitter, Terminal, TrendingUp, Activity, Zap, PieChart } from "lucide-react";

function QuickNavCard({
  title,
  description,
  href,
  iconComponent,
}: {
  title: string;
  description: string;
  href: string;
  iconComponent?: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <div
        className="module-card scanline-sweep cursor-pointer feature-box"
        data-testid={`nav-card-${title.toLowerCase().replace(" ", "-")}`}
        aria-label={`Navigate to ${title}`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="module-icon">{iconComponent}</div>
          <h3 className="module-title text-[color:var(--text-primary)]">{title}</h3>
        </div>
        <p className="module-description">{description}</p>
      </div>
    </Link>
  );
}

function EarthCamSection() {
  return (
    <div className="mt-8">
      <div className="text-center mb-4">
        <p className="mb-4 text-sm">
          <span className="trippy-text">If you're not touching grass, at least look at it 🌱</span>
        </p>
        <Button
          onClick={() => window.open("https://www.earthcam.com/", "_blank")}
          variant="outline"
          className="bg-black/60 border-green-500/30 text-green-400 hover:bg-green-500/10"
        >
          View EarthCam
        </Button>
      </div>
    </div>
  );
}

function EmailSignup() {
  return (
    <form className="flex gap-2 max-w-sm mx-auto">
      <Input
        type="email"
        placeholder="Enter email"
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

      {/* Hero */}
      <div className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <h1
            className="text-6xl md:text-8xl font-black mb-6 text-[#ff1493]"
            style={{ textShadow: "0 0 5px #ff1493, 0 0 10px #ff1493" }}
          >
            CONSPIRA AI
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
            Uncover the Crypto Undercurrent
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/terminal">
              <Button
                size="lg"
                className="bg-black/80 hover:bg-black/60 text-white border-2 border-white/20 hover:border-white/40 px-8 py-3"
              >
                <Terminal className="mr-2 h-5 w-5" />
                Enter Terminal
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://x.com/conspira_ai?s=21", "_blank")}
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/40 hover:border-white/60 px-8 py-3"
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

      {/* Navigate Intelligence */}
      <div className="container mx-auto px-4 py-12">
        <div className="section--navigate-intel mb-12">
          <h2 className="section-title text-3xl font-bold text-center mb-8 text-[color:var(--text-primary)] module-title">
            NAVIGATE INTELLIGENCE
          </h2>
          <div className="flex flex-col lg:flex-row gap-6">
            <QuickNavCard
              title="ENHANCED FLOW"
              description="Premium flow analysis with advanced filtering and predictive insights"
              href="/market/live"
              iconComponent={<Zap className="w-8 h-8" style={{ color: "#A259FF" }} />}
            />
            <QuickNavCard
              title="FLOW INTEL"
              description="Real-time trade streams with whale tracking and live market pulse monitoring"
              href="/market/live"
              iconComponent={<Activity className="w-8 h-8" style={{ color: "#FF8C42" }} />}
            />
            <QuickNavCard
              title="MARKET HUB"
              description="Live Solana market data with comprehensive token analytics and insights"
              href="/market/dashboard"
              iconComponent={<PieChart className="w-8 h-8" style={{ color: "#00CFFF" }} />}
            />
            <QuickNavCard
              title="ENHANCED MARKET"
              description="Advanced market intelligence with deep analytics and volume tracking"
              href="/market/analysis"
              iconComponent={<TrendingUp className="w-8 h-8" style={{ color: "#4ADE80" }} />}
            />
          </div>
        </div>

        <EarthCamSection />
      </div>

      <Footer />
    </div>
  );
}
