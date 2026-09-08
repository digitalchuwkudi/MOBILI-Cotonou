import { LanguageProvider } from './components/LanguageContext';
import { RouterProvider, Switch, Route } from './components/Router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { Home } from './pages/Home';
import { Apartments } from './pages/Apartments';
import { ApartmentDetail } from './pages/ApartmentDetail';
import { Locations } from './pages/Locations';
import { LocationDetail } from './pages/LocationDetail';
import { ShortStays, ExtendedStays, BusinessStays, VacationStays } from './pages/StayTypePage';
import { ListYourApartmentPage } from './pages/ListYourApartmentPage';
import { PrivacyPage, TermsPage } from './pages/LegalPages';
import { ErrorState } from './components/ErrorState';

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-[#172033] selection:bg-[#C6922E]/30 selection:text-[#102A43]">
          
          {/* Sticky responsive navigation header */}
          <Header />

          {/* Core Route Switching content frame */}
          <main className="flex-grow">
            <Switch>
              <Route path="/" element={<Home />} />
              <Route path="/apartments" element={<Apartments />} />
              <Route path="/apartments/:slug" element={<ApartmentDetail />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/:slug" element={<LocationDetail />} />
              
              {/* Specialized stay pages */}
              <Route path="/short-stays" element={<ShortStays />} />
              <Route path="/extended-stays" element={<ExtendedStays />} />
              <Route path="/business-stays" element={<BusinessStays />} />
              <Route path="/vacation-stays" element={<VacationStays />} />

              {/* Informational pages */}
              <Route path="/list-your-apartment" element={<ListYourApartmentPage />} />
              
              {/* Dynamic interactions & legal */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* 404 Fallback error state page */}
              <Route path="*" element={<ErrorState />} />
            </Switch>
          </main>

          {/* Unified global Footer */}
          <Footer />

          {/* Floating interactive WhatsApp agent coordinator button */}
          <WhatsAppButton variant="floating" />

        </div>
      </RouterProvider>
    </LanguageProvider>
  );
}
