import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24">
      <SEOHead
        title="Page Not Found"
        description="The page you are looking for could not be found. Return to the SiteMaxi homepage."
        noindex={true}
      />

      <div className="text-center max-w-xl">
        <div className="text-[120px] font-bold leading-none text-gray-100 select-none mb-2">
          404
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page not found
        </h1>

        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          The page you were looking for doesn't exist or may have been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>

          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse Blog
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4">Popular pages</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: 'Services', to: '/services' },
              { label: 'Local SEO', to: '/rankmaxi' },
              { label: 'Google Ads', to: '/clickmaxi' },
              { label: 'Web Design', to: '/sitemaxi' },
              { label: 'Contact', to: '/contact' },
              { label: 'Free SEO Audit', to: '/free-seo-audit' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                {label}
                <ArrowRight className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
