import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const location = useLocation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const services = [
    { name: 'RankMaxi', description: 'Local SEO', path: '/rankmaxi' },
    { name: 'SearchMaxi', description: 'SEO', path: '/searchmaxi' },
    { name: 'SocialMaxi', description: 'Social Media', path: '/socialmaxi' },
    { name: 'AdMaxi', description: 'Social Ads', path: '/admaxi' },
    { name: 'ClickMaxi', description: 'Google Ads', path: '/clickmaxi' },
    { name: 'SiteMaxi', description: 'Web Design', path: '/sitemaxi' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/SiteMaxi Professional Websites.png"
            alt="SiteMaxi"
            className="h-10 md:h-10 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium">
            Home
          </Link>
          <Link to="/about" className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium">
            About Us
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium flex items-center gap-1"
            >
              Our Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl py-3 animate-fadeIn">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    to={service.path}
                    onClick={() => setIsServicesOpen(false)}
                    className="block px-6 py-3 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="font-semibold text-[#111111] group-hover:text-[#8B5CF6] transition-colors">
                      {service.name}
                    </div>
                    <div className="text-sm text-[#666666]">{service.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/blog" className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium">
            Blog
          </Link>
          <Link to="/contact" className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          <a href="https://calendar.app.google/Pn2PUD5NDJWr25mk8" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-6 py-2.5 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 inline-block">
            Schedule a Call
          </a>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#111111] hover:text-[#8B5CF6] transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[73px] bg-white z-50 overflow-y-auto">
          <nav className="flex flex-col px-6 py-6">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium py-4 border-b border-gray-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium py-4 border-b border-gray-200"
            >
              About Us
            </Link>

            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium py-4 border-b border-gray-200 flex items-center justify-between"
            >
              Our Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isServicesOpen && (
              <div className="pl-4 bg-gray-50">
                {services.map((service, index) => (
                  <Link
                    key={index}
                    to={service.path}
                    onClick={() => { setIsMobileMenuOpen(false); setIsServicesOpen(false); }}
                    className="block py-3 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="font-semibold text-[#111111]">{service.name}</div>
                    <div className="text-sm text-[#666666]">{service.description}</div>
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium py-4 border-b border-gray-200"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[#111111] hover:text-[#8B5CF6] transition-colors font-medium py-4 border-b border-gray-200"
            >
              Contact
            </Link>

            <a
              href="https://calendar.app.google/Pn2PUD5NDJWr25mk8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-6 py-3 rounded-lg font-semibold text-center"
            >
              Schedule a Call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
