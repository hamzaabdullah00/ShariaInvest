import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language-context";
import SplashScreen from "@/components/splash-screen";
import Home from "@/pages/home";
import Invest from "@/pages/invest";
import FundDetail from "@/pages/fund-detail";
import Dashboard from "@/pages/dashboard";
import Investments from "@/pages/investments";
import Mosque from "@/pages/mosque";
import Causes from "@/pages/causes";
import Community from "@/pages/community";
import Profile from "@/pages/profile";
import BottomNavigation from "@/components/bottom-navigation";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/invest" component={Invest} />
      <Route path="/fund/:id" component={FundDetail} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/investments" component={Investments} />
      <Route path="/mosque" component={Mosque} />
      <Route path="/causes" component={Causes} />
      <Route path="/community" component={Community} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <div className="mobile-container">
            {showSplash ? (
              <SplashScreen />
            ) : (
              <>
                <Router />
                <BottomNavigation />
              </>
            )}
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
