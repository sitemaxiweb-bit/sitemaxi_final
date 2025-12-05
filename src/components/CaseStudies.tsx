import { ArrowRight, TrendingUp, Users, DollarSign } from 'lucide-react';

interface CaseStudy {
  title: string;
  client: string;
  category: string;
  image: string;
  results: {
    metric: string;
    value: string;
    icon: any;
  }[];
  description: string;
}

export function CaseStudies() {
  const caseStudies: CaseStudy[] = [
    {
      title: "Local HVAC Company Dominates Search Results",
      client: "Climate Control Pros",
      category: "Local SEO",
      image: "https://images.pexels.com/photos/3964736/pexels-photo-3964736.jpeg?auto=compress&cs=tinysrgb&w=800",
      results: [
        { metric: "Traffic Increase", value: "+385%", icon: TrendingUp },
        { metric: "New Leads", value: "+250%", icon: Users },
        { metric: "Revenue Growth", value: "+$180K", icon: DollarSign }
      ],
      description: "From page 3 to #1 in Google Maps for 12 high-value keywords in just 4 months."
    },
    {
      title: "E-commerce Store Scales to 7 Figures",
      client: "Modern Home Decor",
      category: "SEO & Paid Ads",
      image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800",
      results: [
        { metric: "Monthly Sales", value: "+412%", icon: DollarSign },
        { metric: "ROAS", value: "6.2x", icon: TrendingUp },
        { metric: "Customer Base", value: "+890%", icon: Users }
      ],
      description: "Strategic combination of SEO and targeted advertising drove sustainable growth."
    },
    {
      title: "Law Firm Becomes Market Leader",
      client: "Thompson & Associates",
      category: "Content Marketing",
      image: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800",
      results: [
        { metric: "Organic Traffic", value: "+520%", icon: TrendingUp },
        { metric: "Case Inquiries", value: "+340%", icon: Users },
        { metric: "Annual Revenue", value: "+$425K", icon: DollarSign }
      ],
      description: "Comprehensive content strategy established them as the go-to legal experts."
    }
  ];

  return (
    <section className="py-32 bg-white" id="case-studies">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-[#8B5CF6] font-bold text-sm tracking-wide uppercase">
              Case Studies
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Real results from real businesses
          </h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            See how we've helped businesses like yours achieve remarkable growth through strategic digital marketing.
          </p>
        </div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#8B5CF6] hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 relative overflow-hidden h-[400px] md:h-auto">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white text-[#8B5CF6] px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {study.category}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-3 p-10 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#111111] mb-3">
                    {study.title}
                  </h3>
                  <p className="text-[#8B5CF6] font-semibold mb-6">{study.client}</p>
                  <p className="text-[#666666] text-lg mb-8 leading-relaxed">
                    {study.description}
                  </p>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <result.icon className="w-8 h-8 text-[#8B5CF6] mx-auto mb-3" />
                        <div className="text-3xl font-bold text-[#111111] mb-1">
                          {result.value}
                        </div>
                        <div className="text-sm text-[#666666]">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  <button className="text-[#8B5CF6] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 text-lg group-hover:text-[#1D4ED8]">
                    Read Full Case Study <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-10 py-4 rounded-lg font-semibold hover:from-[#1E40AF] hover:to-[#7C3AED] hover:scale-105 transition-all duration-300 text-lg shadow-lg">
            View All Case Studies
          </button>
        </div>
      </div>
    </section>
  );
}
