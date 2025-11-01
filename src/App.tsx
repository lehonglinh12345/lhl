import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Listening from "./pages/Listening";
import Speaking from "./pages/Speaking";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import Roadmap from "./pages/Roadmap";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/listening" element={<Listening />} />
            <Route path="/speaking" element={<Speaking />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/community" element={<Community />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/test" element={<Test />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
