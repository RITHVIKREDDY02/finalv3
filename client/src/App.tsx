import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AdminPanel from "@/pages/admin-new";
import Wingo from "@/pages/wingo";
import Wingo30Sec from "@/pages/wingo-30sec";
import Wingo1Min from "@/pages/wingo-1min";
import Wingo3Min from "@/pages/wingo-3min";
import Wingo5Min from "@/pages/wingo-5min";
import ImageTools from "@/pages/image-tools";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/wingo" component={Wingo} />
      <Route path="/wingo-30sec" component={Wingo30Sec} />
      <Route path="/wingo-1min" component={Wingo1Min} />
      <Route path="/wingo-3min" component={Wingo3Min} />
      <Route path="/wingo-5min" component={Wingo5Min} />
      <Route path="/image-tools" component={ImageTools} />
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
