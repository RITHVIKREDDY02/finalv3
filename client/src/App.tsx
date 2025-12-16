import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import RegisterPage from "@/pages/register";
import RegisterGuidePage from "@/pages/register-guide";
import LoginBonusPage from "@/pages/login-bonus";
import DisclaimerPage from "@/pages/disclaimer";
import TermsPage from "@/pages/terms";
import PrivacyPage from "@/pages/privacy";
import ContactPage from "@/pages/contact";
import BlogPage from "@/pages/blog";
import GuideArticlePage from "@/pages/guide-article";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/register-guide" component={RegisterGuidePage} />
      <Route path="/login-bonus" component={LoginBonusPage} />
      <Route path="/disclaimer" component={DisclaimerPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/guide/:id" component={GuideArticlePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
