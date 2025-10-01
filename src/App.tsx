
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LockScreen from "./components/LockScreen";
import Desktop from "./components/Desktop";
import LoveWrapped from "./pages/LoveWrapped";
import GuessTheMoment from "./pages/GuessTheMoment";
import TerminalLove from "./pages/TerminalLove";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Desktop />} />
            <Route path="/love-wrapped" element={<LoveWrapped />} />
            <Route path="/guess-moment" element={<GuessTheMoment />} />
            <Route path="/terminal-love" element={<TerminalLove />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
