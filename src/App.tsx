import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// pages we actually need
import Home from "@/pages/home";
import Terminal from "@/pages/terminal";
import MarketDashboard from "@/pages/market/MarketDashboard";
import LiveFlow from "@/pages/market/LiveFlow";
import Analysis from "@/pages/market/Analysis";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      {/* main CTAs from the landing */}
      <Route path="/terminal" component={Terminal} />
      <Route path="/market/live" component={LiveFlow} />
      <Route path="/market/dashboard" component={MarketDashboard} />
      <Route path="/market/analysis" component={Analysis} />

      {/* safety redirects in case old links exist */}
      <Route path="/flow">
        {() => {
          window.location.replace("/market/live");
          return null;
        }}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  useEffect(() => {
    // Disable automatic scrolling globally
    (window as any).onscroll = function () {
      return false;
    };
    // Scroll to top on app load
    window.scrollTo(0, 0);
    // Prevent any scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
