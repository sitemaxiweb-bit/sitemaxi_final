import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Search } from 'lucide-react';

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2m0vspPUrR0-YqZ4woobo35YfltXEIKt__2utprk-3OdzJy3Qk9mCNHtvzlEdxZC0Y34jiLzfF";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <img src="/SiteMaxi Professional Websites.png" alt="SiteMaxi" className="h-9 brightness-0 invert" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              A Canadian digital marketing agency helping local businesses and e-commerce brands grow through SEO, paid ads, and high-converting websites.
            </p>
            <div className="flex gap-3 mb-8">
              <a href="http://facebook.com/sitemaxi" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://x.com/SiteMaxi" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/sitemaxi/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="http://linkedin.com/company/sitemaxi" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@SiteMaxiHQ" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/free-seo-audit"
                className="inline-flex items-center justify-center gap-2 bg-[#1D4ED8] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#2563EB] transition-colors"
              >
                <Search className="w-4 h-4" />
                Free Audit
              </Link>
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Book Strategy Call
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/rankmaxi" className="text-gray-400 text-sm hover:text-white transition-colors">RankMaxi — Local SEO</Link></li>
              <li><Link to="/searchmaxi" className="text-gray-400 text-sm hover:text-white transition-colors">SearchMaxi — SEO</Link></li>
              <li><Link to="/socialmaxi" className="text-gray-400 text-sm hover:text-white transition-colors">SocialMaxi — Social Media</Link></li>
              <li><Link to="/admaxi" className="text-gray-400 text-sm hover:text-white transition-colors">AdMaxi — Social Ads</Link></li>
              <li><Link to="/clickmaxi" className="text-gray-400 text-sm hover:text-white transition-colors">ClickMaxi — Google Ads</Link></li>
              <li><Link to="/sitemaxi" className="text-gray-400 text-sm hover:text-white transition-colors">SiteMaxi — Web Design</Link></li>
              <li><Link to="/services" className="text-[#60A5FA] text-sm hover:text-white transition-colors font-medium">View All Services →</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 text-sm hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 text-sm hover:text-white transition-colors">About</Link></li>
              <li><Link to="/industries" className="text-gray-400 text-sm hover:text-white transition-colors">Industries</Link></li>
              <li><Link to="/resources" className="text-gray-400 text-sm hover:text-white transition-colors">Resources Hub</Link></li>
              <li><Link to="/blog" className="text-gray-400 text-sm hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Get in Touch</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="mailto:hello@sitemaxi.com" className="hover:text-white transition-colors">
                  hello@sitemaxi.com
                </a>
              </li>
              <li>
                <a href="tel:+18663446294" className="hover:text-white transition-colors">
                  +1 (866) 344-6294
                </a>
              </li>
              <li className="leading-relaxed">
                7398 Yonge St 6d Unit 619<br />
                Vaughan, ON, CA L4J 2J2
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; 2025 SiteMaxi. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
