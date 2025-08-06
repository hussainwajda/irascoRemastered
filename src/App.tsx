import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/not-found";
import ServicesPage from "./pages/services/page";
import CommercialACPage from "./pages/services/commercial-air-conditioning/page";
import CommercialCoolersPage from "./pages/services/commercial-air-coolers/page";
import DuctworkPage from "./pages/services/ductwork-ventilation/page";
import KitchenChimneyPage from "./pages/services/kitchen-chimney-systems/page";
import { ScrollToTop } from "./components/scrollToTop";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/commercial-air-conditioning" element={<CommercialACPage />} />
            <Route path="/services/commercial-air-coolers" element={<CommercialCoolersPage />} />
            <Route path="/services/ductwork-ventilation" element={<DuctworkPage />} />
            <Route path="/services/kitchen-chimney-systems" element={<KitchenChimneyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
