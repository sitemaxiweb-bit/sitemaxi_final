import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, TrendingUp, Target, Share2, Zap, MousePointerClick, Palette, Search, Wrench, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { MenuItem, Menu as NavMenu } from './ui/navbar-menu';

const services = [
  {
    icon: TrendingUp,
    name: 'RankMaxi',
    description: 'Local SEO — rank in Google Maps & local search',
    path: '/rankmaxi',
    color: '#1D4ED8',
    bg: '#DBEAFE',
  },
  {
    icon: Target,
    name: 'SearchMaxi',
    description: 'SEO — grow organic traffic that converts',
    path: '/searchmaxi',
    color: '#0891B2',
    bg: '#CFFAFE',
  },
  {
    icon: Share2,
    name: 'SocialMaxi',
    description: 'Social Media — content, strategy & engagement',
    path: '/socialmaxi',
    color: '#059669',
    bg: '#D1FAE5',
  },
  {
    icon: Zap,
    name: 'AdMaxi',
    description: 'Social Ads — paid campaigns for customer acquisition',
    path: '/admaxi',
    color: '#D97706',
    bg: '#FEF3C7',
  },
  {
    icon: MousePointerClick,
    name: 'ClickMaxi',
    description: 'Google Ads — capture high-intent buyers',
    path: '/clickmaxi',
    color: '#DC2626',
    bg: '#FEE2E2',
  },
  {
    icon: Palette,
    name: 'SiteMaxi',
    description: 'Web Design — high-converting websites',
    path: '/sitemaxi',
    color: '#7C3AED',
    bg: '#EDE9FE',
  },
];

export function Header() {
  const location = useLocation();
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActive(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActive(null);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md border-b border-gray-100' : 'border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src="/SiteMaxi Professional Websites.png"
            alt="SiteMaxi"
            className="h-9 md:h-10 w-auto"
          />
        </Link>

        <div className="hidden lg:flex items-center" ref={navRef}>
          <NavMenu setActive={setActive}>
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/') ? 'text-[#1D4ED8]' : 'text-[#374151] hover:text-[#1D4ED8]'}`}
            >
              Home
            </Link>

            <MenuItem setActive={setActive} active={active} item="Our Services">
              <div className="w-[520px]">
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: service.bg }}>
                        <service.icon className="w-4 h-4" style={{ color: service.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-[#111111] text-sm group-hover:text-[#1D4ED8] transition-colors">{service.name}</div>
                        <div className="text-xs text-[#6B7280] leading-snug mt-0.5">{service.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Link
                    to="/services"
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors py-1"
                  >
                    View All Services
                    <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                  </Link>
                </div>
              </div>
            </MenuItem>

            <Link
              to="/industries"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/industries') ? 'text-[#1D4ED8]' : 'text-[#374151] hover:text-[#1D4ED8]'}`}
            >
              Industries
            </Link>

            <MenuItem setActive={setActive} active={active} item="Resources">
              <div className="flex flex-col space-y-1 min-w-[220px]">
                <Link to="/resources-hub" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-4 h-4 text-[#1D4ED8]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#111111]">Resources Hub</div>
                    <div className="text-xs text-[#6B7280]">Guides, checklists & templates</div>
                  </div>
                </Link>
                <Link to="/free-seo-audit" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Search className="w-4 h-4 text-[#059669]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#111111]">Free AI Audit</div>
                    <div className="text-xs text-[#6B7280]">Instant website analysis</div>
                  </div>
                </Link>
                <Link to="/ai-brand-visibility-checker" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#111111]">AI Visibility Checker</div>
                    <div className="text-xs text-[#6B7280]">See how AI finds your brand</div>
                  </div>
                </Link>
                <Link to="/blog" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-[#D97706]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#111111]">Blog</div>
                    <div className="text-xs text-[#6B7280]">Marketing insights & tips</div>
                  </div>
                </Link>
                <Link to="/resources" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors border-t border-gray-100 mt-1 pt-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-[#6B7280]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#111111]">Free Tools</div>
                    <div className="text-xs text-[#6B7280]">Marketing tools & resources</div>
                  </div>
                </Link>
              </div>
            </MenuItem>

            <Link
              to="/blog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/blog') ? 'text-[#1D4ED8]' : 'text-[#374151] hover:text-[#1D4ED8]'}`}
            >
              Blog
            </Link>

            <Link
              to="/about"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/about') ? 'text-[#1D4ED8]' : 'text-[#374151] hover:text-[#1D4ED8]'}`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/contact') ? 'text-[#1D4ED8]' : 'text-[#374151] hover:text-[#1D4ED8]'}`}
            >
              Contact
            </Link>
          </NavMenu>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/free-seo-audit"
            className="bg-[#1D4ED8] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1E40AF] transition-colors"
          >
            Free Audit
          </Link>
          <Link
            to="/apply"
            className="border border-[#1D4ED8] text-[#1D4ED8] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            Apply For A Growth Call
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#374151] hover:text-[#1D4ED8] transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-white z-50 overflow-y-auto">
          <nav className="flex flex-col px-6 py-4">
            <Link to="/" className="text-[#374151] font-medium py-4 border-b border-gray-100 flex items-center justify-between">
              Home
            </Link>

            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="text-[#374151] font-medium py-4 border-b border-gray-100 flex items-center justify-between"
            >
              Our Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMobileServicesOpen && (
              <div className="bg-gray-50 rounded-xl mb-2">
                {services.map((service) => (
                  <Link
                    key={service.path}
                    to={service.path}
                    className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: service.bg }}>
                      <service.icon className="w-4 h-4" style={{ color: service.color }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#111111]">{service.name}</div>
                      <div className="text-xs text-[#6B7280]">{service.description.split('—')[0].trim()}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <Link to="/industries" className="text-[#374151] font-medium py-4 border-b border-gray-100">
              Industries
            </Link>
            <Link to="/resources-hub" className="text-[#374151] font-medium py-4 border-b border-gray-100">
              Resources Hub
            </Link>
            <Link to="/free-seo-audit" className="text-[#374151] font-medium py-4 border-b border-gray-100">
              Free AI Audit
            </Link>
            <Link to="/ai-brand-visibility-checker" className="text-[#374151] font-medium py-4 border-b border-gray-100">
              AI Visibility Checker
            </Link>
            <Link to="/resources" className="text-[#374151] font-medium py-4 border-b border-gray-100">
              Free Tools
            </Link>
            <Link to="/blog" className="text-[#374151] font-medium py-4 border-b border-gray-100">
              Blog
            </Link>
            <Link to="/about" className="text-[#374151] font-medium py-4 border-b border-gray-100">
              About
            </Link>
            <Link to="/contact" className="text-[#374151] font-medium py-4 border-b border-gray-100">
              Contact
            </Link>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/free-seo-audit"
                className="bg-[#1D4ED8] text-white px-6 py-3.5 rounded-xl font-semibold text-center"
              >
                Free Audit
              </Link>
              <Link
                to="/apply"
                className="border border-[#1D4ED8] text-[#1D4ED8] px-6 py-3.5 rounded-xl font-semibold text-center"
              >
                Apply For A Growth Call
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
