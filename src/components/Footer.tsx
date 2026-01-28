import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-4">
              <img src="/SiteMaxi Professional Websites.png" alt="SiteMaxi" className="h-8" />
            </div>
            <p className="text-[#666666] mb-6">
              A digital growth agency dedicated to helping local businesses thrive online.
            </p>
            <div className="flex gap-3">
              <a href="http://facebook.com/sitemaxi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#1D4ED8] hover:to-[#8B5CF6] hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/SiteMaxi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#1D4ED8] hover:to-[#8B5CF6] hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/sitemaxi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#1D4ED8] hover:to-[#8B5CF6] hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="http://linkedin.com/company/sitemaxi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#1D4ED8] hover:to-[#8B5CF6] hover:text-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@SiteMaxiHQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#1D4ED8] hover:to-[#8B5CF6] hover:text-white transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#111111] mb-4">Services</h4>
            <ul className="space-y-2 text-[#666666]">
              <li><Link to="/rankmaxi" className="hover:text-[#8B5CF6] transition-colors">RankMaxi</Link></li>
              <li><Link to="/searchmaxi" className="hover:text-[#8B5CF6] transition-colors">SearchMaxi</Link></li>
              <li><Link to="/socialmaxi" className="hover:text-[#8B5CF6] transition-colors">SocialMaxi</Link></li>
              <li><Link to="/admaxi" className="hover:text-[#8B5CF6] transition-colors">AdMaxi</Link></li>
              <li><Link to="/clickmaxi" className="hover:text-[#8B5CF6] transition-colors">ClickMaxi</Link></li>
              <li><Link to="/sitemaxi" className="hover:text-[#8B5CF6] transition-colors">SiteMaxi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#111111] mb-4">Company</h4>
            <ul className="space-y-2 text-[#666666]">
              <li><Link to="/" className="hover:text-[#8B5CF6] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#8B5CF6] transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-[#8B5CF6] transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-[#8B5CF6] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#111111] mb-4">Get in Touch</h4>
            <ul className="space-y-2 text-[#666666]">
              <li>hello@sitemaxi.com</li>
              <li>+1 (866) 344-6294</li>
              <li className="text-sm">7398 Yonge St 6d Unit 619<br/>Vaughan, ON, CA L4J 2J2<br/></li>
              <li className="pt-4">
                {isHomePage ? (
                  <a href="#contact" className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-6 py-2.5 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 w-full inline-block text-center">
                    Book a Call
                  </a>
                ) : (
                  <Link to="/#contact" className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-6 py-2.5 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 w-full inline-block text-center">
                    Book a Call
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#666666] text-sm">&copy; 2025 SiteMaxi. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-[#666666]">
            <Link to="/privacy-policy" className="hover:text-[#8B5CF6] transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-[#8B5CF6] transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-[#8B5CF6] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
