import { Switch, Route } from "wouter";
import { useEffect } from "react";

import Home from "@/pages/home";
import Terminal from "@/pages/terminal";
import MarketOverview from "@/pages/market-overview";
import FlowIntelligence from "@/pages/flow-intelligence";
import FlowIntelligenceComplete from "@/pages/flow-intelligence-complete";
import MarketHub from "@/pages/market-hub";
import EnhancedMarketHub from "@/pages/enhanced-market-hub";
import EnhancedFlowIntel from "@/pages/enhanced-flow-intel";

// ✅ these three MUST match the files you just created
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
      <Route path="/flow-intelligence-complete" component={FlowIntelligenceComplete} />
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
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);
  return <Router />;
}

export default App;
