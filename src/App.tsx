import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';
import { StickyAuditCTA } from './components/StickyAuditCTA';
import { FloatingContactButton } from './components/FloatingContactButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { RankMaxiPage } from './pages/RankMaxiPage';
import { SearchMaxiPage } from './pages/SearchMaxiPage';
import { SocialMaxiPage } from './pages/SocialMaxiPage';
import { AdMaxiPage } from './pages/AdMaxiPage';
import { ClickMaxiPage } from './pages/ClickMaxiPage';
import { SiteMaxiPage } from './pages/SiteMaxiPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminSetupPage } from './pages/AdminSetupPage';
import { AdminBlogPage } from './pages/AdminBlogPage';
import { AdminBlogEditorPage } from './pages/AdminBlogEditorPage';
import { AdminImageManagerPage } from './pages/AdminImageManagerPage';
import { AdminSubmissionsPage } from './pages/AdminSubmissionsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { CreditCardAuthorizationPage } from './pages/CreditCardAuthorizationPage';
import { AdminCCPasswordSetupPage } from './pages/AdminCCPasswordSetupPage';
import { AdminCCAuthorizationsPage } from './pages/AdminCCAuthorizationsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AIBlueprintPage } from './pages/AIBlueprintPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { FreeSEOAuditPage } from './pages/FreeSEOAuditPage';
import { AdminAuditLeadsPage } from './pages/AdminAuditLeadsPage';
import { ServicesPage } from './pages/ServicesPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourcesHubPage } from './pages/ResourcesHubPage';
import { AdminLocationsPage } from './pages/AdminLocationsPage';
import AdminKeywordsPage from './pages/AdminKeywordsPage';
import AdminKeywordEditorPage from './pages/AdminKeywordEditorPage';
import AdminKeywordImportPage from './pages/AdminKeywordImportPage';
import AdminClustersPage from './pages/AdminClustersPage';
import AdminClusterEditorPage from './pages/AdminClusterEditorPage';
import { LocationsPage, CityPage, CityServicePage } from './pages/locations';
import {
  LocalSEOChecklistPage,
  GoogleBusinessProfileGuidePage,
  EcommerceSEOChecklistPage,
  GoogleAdsStarterGuidePage,
  LandingPageChecklistPage,
  SmallBusinessPlaybookPage,
  KeywordResearchGuidePage,
  MetaAdsGuidePage,
  WebsiteConversionTipsPage,
  EcommerceGrowthGuidePage,
  ContentCalendarTemplatePage,
  SEOAuditChecklistPage,
} from './pages/resources';
import {
  DentistsPage,
  LawyersPage,
  ContractorsPage,
  PlumbersPage,
  HVACPage,
  RoofersPage,
  MedSpasPage,
  ClinicsPage,
  RealEstatePage,
  FuneralHomesPage,
  RestaurantsPage,
  AutoRepairPage,
  EcommercePage,
} from './pages/industries';

function PublicLayout() {
  const location = useLocation();
  const isAuditPage = location.pathname === '/free-seo-audit';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/rankmaxi" element={<RankMaxiPage />} />
        <Route path="/searchmaxi" element={<SearchMaxiPage />} />
        <Route path="/socialmaxi" element={<SocialMaxiPage />} />
        <Route path="/admaxi" element={<AdMaxiPage />} />
        <Route path="/clickmaxi" element={<ClickMaxiPage />} />
        <Route path="/sitemaxi" element={<SiteMaxiPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/credit-card-authorization" element={<CreditCardAuthorizationPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/ai-ecommerce-blueprint" element={<AIBlueprintPage />} />
        <Route path="/free-seo-audit" element={<FreeSEOAuditPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/dentists" element={<DentistsPage />} />
        <Route path="/industries/lawyers" element={<LawyersPage />} />
        <Route path="/industries/contractors" element={<ContractorsPage />} />
        <Route path="/industries/plumbers" element={<PlumbersPage />} />
        <Route path="/industries/hvac" element={<HVACPage />} />
        <Route path="/industries/roofers" element={<RoofersPage />} />
        <Route path="/industries/med-spas" element={<MedSpasPage />} />
        <Route path="/industries/clinics" element={<ClinicsPage />} />
        <Route path="/industries/real-estate" element={<RealEstatePage />} />
        <Route path="/industries/funeral-homes" element={<FuneralHomesPage />} />
        <Route path="/industries/restaurants" element={<RestaurantsPage />} />
        <Route path="/industries/auto-repair" element={<AutoRepairPage />} />
        <Route path="/industries/ecommerce" element={<EcommercePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources-hub" element={<ResourcesHubPage />} />
        <Route path="/resources/local-seo-checklist" element={<LocalSEOChecklistPage />} />
        <Route path="/resources/google-business-profile-guide" element={<GoogleBusinessProfileGuidePage />} />
        <Route path="/resources/ecommerce-seo-checklist" element={<EcommerceSEOChecklistPage />} />
        <Route path="/resources/google-ads-starter-guide" element={<GoogleAdsStarterGuidePage />} />
        <Route path="/resources/landing-page-checklist" element={<LandingPageChecklistPage />} />
        <Route path="/resources/small-business-playbook" element={<SmallBusinessPlaybookPage />} />
        <Route path="/resources/keyword-research-guide" element={<KeywordResearchGuidePage />} />
        <Route path="/resources/meta-ads-guide" element={<MetaAdsGuidePage />} />
        <Route path="/resources/website-conversion-tips" element={<WebsiteConversionTipsPage />} />
        <Route path="/resources/ecommerce-growth-guide" element={<EcommerceGrowthGuidePage />} />
        <Route path="/resources/content-calendar-template" element={<ContentCalendarTemplatePage />} />
        <Route path="/resources/seo-audit-checklist" element={<SEOAuditChecklistPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/locations/:city" element={<CityPage />} />
        <Route path="/locations/:city/:service" element={<CityServicePage />} />
      </Routes>
      <Footer />
      {!isAuditPage && <StickyAuditCTA />}
      <FloatingContactButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/admin/setup" element={<AdminSetupPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/blog" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminBlogPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/blog/:id" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminBlogEditorPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/images" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminImageManagerPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/submissions" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminSubmissionsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/cc-password-setup" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminCCPasswordSetupPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/cc-authorizations" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminCCAuthorizationsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/audit-leads" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminAuditLeadsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/locations" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLocationsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/keywords" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminKeywordsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/keywords/import" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminKeywordImportPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/keywords/:id" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminKeywordEditorPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/clusters" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminClustersPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/clusters/:id" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminClusterEditorPage />
          </ProtectedRoute>
        } />

        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
