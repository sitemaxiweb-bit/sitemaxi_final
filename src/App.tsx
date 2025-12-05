import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ProtectedRoute } from './components/ProtectedRoute';
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

        <Route path="/*" element={
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
            </Routes>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
