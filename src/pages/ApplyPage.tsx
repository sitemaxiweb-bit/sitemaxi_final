import { useEffect } from 'react';
import { ArrowRight, Clock, Users, TrendingUp } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function ApplyPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://web.sitemaxi.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Apply For A Growth Call — SiteMaxi | Canadian Digital Marketing Agency"
        description="Apply for a Growth Call with SiteMaxi. We'll review your business, identify your biggest growth opportunity, and show you exactly what we'd do to improve your results."
        keywords="apply for growth call, digital marketing consultation, SiteMaxi growth call, Canadian digital marketing agency"
      />

      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left column — context */}
            <div className="lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1D4ED8] px-4 py-2 rounded-full mb-6">
                <span className="font-semibold text-sm uppercase tracking-wide">Growth Call Application</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
                Let's Find Your Biggest Growth Opportunity
              </h1>
              <p className="text-lg text-[#555555] mb-8 leading-relaxed">
                Apply below and one of our growth strategists will review your business before the call. We'll come prepared with specific observations. No generic pitch, no wasted time.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  {
                    icon: Clock,
                    title: "30-Minute Call",
                    desc: "Focused, no-fluff conversation about your growth opportunities."
                  },
                  {
                    icon: TrendingUp,
                    title: "We Come Prepared",
                    desc: "We review your online presence before the call so the conversation is specific to your business."
                  },
                  {
                    icon: Users,
                    title: "No Hard Sell",
                    desc: "If we're a good fit, we'll outline a plan. If not, we'll tell you honestly."
                  }
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#1D4ED8]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111111] mb-0.5">{title}</p>
                      <p className="text-[#666666] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <p className="text-sm font-semibold text-[#111111] mb-3">Who is this call for?</p>
                <ul className="space-y-2">
                  {[
                    "Canadian businesses serious about online growth",
                    "Business owners who want qualified leads, not just traffic",
                    "Companies ready to invest in a real strategy",
                    "Anyone frustrated with their current marketing results",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#555555]">
                      <ArrowRight className="w-4 h-4 text-[#1D4ED8] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column — embedded survey */}
            <div className="w-full">
              <iframe
                src="https://web.sitemaxi.com/widget/survey/q7Mz8pFihmhP7KrqeKGY"
                style={{ border: 'none', width: '100%', minHeight: '700px' }}
                scrolling="no"
                id="q7Mz8pFihmhP7KrqeKGY"
                title="survey"
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
