import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
// ❌ Removed: import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import Terminal from "@/pages/terminal";
import MarketOverview from "@/pages/market-overview";
import FlowIntelligence from "@/pages/flow-intelligence";
import FlowIntelligenceComplete from "@/pages/flow-intelligence-complete";
import MarketHub from "@/pages/market-hub";
import EnhancedMarketHub from "@/pages/enhanced-market-hub";
import EnhancedFlowIntel from "@/pages/enhanced-flow-intel";
import MarketDashboard from "@/pages/market/MarketDashboard";
import LiveFlow from "@/pages/market/LiveFlow";
import Analysis from "@/pages/market/Analysis";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/terminal" component={Terminal} />
      <Route path="/market-overview" component={MarketOverview} />
      <Route path="/flow-intelligence" component={FlowIntelligence} />
      {/* Redirect old flow-intel route to new market/live */}
      <Route path="/flow-intel">
        {() => {
          window.location.replace("/market/live");
          return null;
        }}
      </Route>
      <Route path="/market" component={MarketHub} />
      <Route path="/enhanced-market" component={EnhancedMarketHub} />
      <Route path="/enhanced-flow" component={EnhancedFlowIntel} />
      <Route path="/market/dashboard" component={MarketDashboard} />
      <Route path="/market/live" component={LiveFlow} />
      <Route path="/market/analysis" component={Analysis} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Disable all automatic scrolling globally
    window.onscroll = function () {
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
        {/* ❌ Removed <Toaster /> */}
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
