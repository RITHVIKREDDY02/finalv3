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
import TrxWingo from "@/pages/trx-wingo";
import TrxWingo30Sec from "@/pages/trx-wingo-30sec";
import TrxWingo1Min from "@/pages/trx-wingo-1min";
import TrxWingo3Min from "@/pages/trx-wingo-3min";
import TrxWingo5Min from "@/pages/trx-wingo-5min";
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
      <Route path="/trx-wingo" component={TrxWingo} />
      <Route path="/trx-wingo-30sec" component={TrxWingo30Sec} />
      <Route path="/trx-wingo-1min" component={TrxWingo1Min} />
      <Route path="/trx-wingo-3min" component={TrxWingo3Min} />
      <Route path="/trx-wingo-5min" component={TrxWingo5Min} />
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
