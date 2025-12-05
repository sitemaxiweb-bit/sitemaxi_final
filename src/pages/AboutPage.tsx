import { Target, Users, Award, TrendingUp, Lightbulb, Heart, Linkedin, Mail } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurValues />
      <WhyChooseUs />
      <OurTeam />
      <CallToAction />
    </>
  );
}

function AboutHero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-[#8B5CF6] font-semibold text-sm tracking-wide uppercase bg-purple-50 px-4 py-2 rounded-full">
              About SiteMaxi
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
            Your Partner in Digital Growth
          </h1>
          <p className="text-xl text-[#666666] leading-relaxed">
            We're a team of passionate marketers, designers, and strategists dedicated to helping local businesses thrive in the digital world. No corporate jargon, no empty promises—just real results.
          </p>
        </div>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaboration"
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Marketing workspace"
                  className="w-full h-[200px] object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 pt-12">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="SEO strategy"
                  className="w-full h-[240px] object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Creative brainstorming"
                  className="w-full h-[200px] object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="inline-block mb-6">
              <span className="text-[#8B5CF6] font-semibold text-sm tracking-wide uppercase bg-purple-50 px-4 py-2 rounded-full">
                Our Story
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-8 leading-tight">
              Built from experience, driven by results
            </h2>
            <div className="space-y-6 text-[#6B7280] text-lg leading-relaxed">
              <p>
                SiteMaxi was founded with a simple mission: to make digital marketing accessible, effective, and transparent for local businesses. After years of seeing businesses struggle with agencies that over-promise and under-deliver, we knew there had to be a better way.
              </p>
              <p>
                We started by helping small businesses in our community rank on Google, build their social presence, and create websites that actually convert. Word spread, and now we're proud to partner with businesses across multiple industries—helping them grow sustainably and strategically.
              </p>
              <p>
                Today, SiteMaxi combines deep marketing expertise with modern AI and automation tools to deliver results that matter. We're not just another agency; we're your growth partner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurValues() {
  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We measure success by your growth. Every strategy is designed to deliver measurable, meaningful results.",
      color: "#1D4ED8",
      bgColor: "#DBEAFE"
    },
    {
      icon: Heart,
      title: "Client-First Approach",
      description: "Your success is our success. We treat your business like our own and provide dedicated, personalized support.",
      color: "#DC2626",
      bgColor: "#FEE2E2"
    },
    {
      icon: Lightbulb,
      title: "Innovation & Creativity",
      description: "We stay ahead of trends and leverage cutting-edge tools to give you a competitive advantage.",
      color: "#F59E0B",
      bgColor: "#FEF3C7"
    },
    {
      icon: Users,
      title: "Transparency & Trust",
      description: "No hidden fees, no confusing reports. We keep you informed every step of the way with clear, honest communication.",
      color: "#8B5CF6",
      bgColor: "#EDE9FE"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-[#8B5CF6] font-semibold text-sm tracking-wide uppercase bg-purple-50 px-4 py-2 rounded-full">
              Our Values
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
            What we stand for
          </h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            These core values guide everything we do and define who we are as a team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-opacity-0 hover:shadow-2xl transition-all duration-300 group"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: value.bgColor }}
              >
                <value.icon className="w-8 h-8" style={{ color: value.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-3">{value.title}</h3>
              <p className="text-[#6B7280] leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: "Proven Track Record",
      description: "We've helped hundreds of businesses achieve top rankings, increase traffic, and grow revenue."
    },
    {
      icon: Users,
      title: "Dedicated Team",
      description: "You'll work with experienced professionals who genuinely care about your success."
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Strategies",
      description: "Every decision is backed by analytics and insights to maximize your ROI."
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-[#8B5CF6] font-semibold text-sm tracking-wide uppercase bg-purple-50 px-4 py-2 rounded-full">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
            What sets us apart
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#1D4ED8] to-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-6">
                <reason.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#111111] mb-4">{reason.title}</h3>
              <p className="text-[#666666] leading-relaxed text-lg">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-10 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl text-[#111111] font-semibold leading-relaxed">
              "We're not just another agency—we're your local growth partner, committed to your long-term success."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurTeam() {
  const teamMembers = [
    {
      name: "Sani Nirosh",
      role: "Co-Founder",
      bio: "15+ years of strategic marketing experience helping brands grow across multiple industries. Passionate about building systems that drive real business outcomes through clear strategy, strong positioning, and modern digital execution.",
      image: "https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/content/sani-nirosh-1763018688091-bc7kg.jpg",
      email: "Sani@sitemaxi.com"
    },
    {
      name: "Moji Seneveratne",
      role: "Head of Client Success",
      bio: "Dedicated to ensuring every client gets exceptional support and measurable results. Moji combines strong communication, project management, and relationship-building skills to create smooth, consistent client experiences.",
      image: "https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/content/moji-senevitarne-1763018766585-bcmeyd.jpg",
      email: "moji@sitemaxi.com"
    },
    {
      name: "Sarah Zizolfo",
      role: "Paid Media Manager",
      bio: "Experienced in managing high-performing Facebook, Instagram, and Google Ads campaigns. Sarah drives measurable ROI through smart targeting, creative testing, and continuous optimization.",
      image: "https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/content/1764212855448-uidojj.png",
      email: "socil@sitemaxi.com"
    },
    {
      name: "Tharindu Shalika",
      role: "SEO Manager",
      bio: "Specialist in local SEO, technical optimization, and Google Business Profile optimization. Tharindu helps businesses increase visibility, outrank competitors, and achieve sustainable search performance.",
      image: "https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/content/tharindu-1763018778967-tpljv.jpg",
      email: "seo@sitemaxi.com"
    },
     {
      name: "Malinda Speedy",
      role: "UX/UI Specialist",
      bio: "Design expert focused on creating clean, conversion-optimized digital experiences. Malinda blends modern aesthetics with usability to deliver websites that are both beautiful and effective.",
      image: "https://shwcwyonepqlupiwxijx.supabase.co/storage/v1/object/public/blog-images/content/mallinda-1763018826831-suoou6.jpg",
      email: "web@sitemaxi.com"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-[#8B5CF6] font-semibold text-sm tracking-wide uppercase bg-purple-50 px-4 py-2 rounded-full">
              Our Team
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
            Meet the experts behind your success
          </h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto">
            Our diverse team brings together years of experience in marketing, design, and strategy to deliver exceptional results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#8B5CF6] hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden h-[320px]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#8B5CF6] hover:text-white transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#8B5CF6] hover:text-white transition-all duration-300"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#111111] mb-1">{member.name}</h3>
                <p className="text-[#8B5CF6] font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-[#666666] leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-3xl mx-auto">
          {teamMembers.slice(3).map((member, index) => (
            <div
              key={index + 3}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#8B5CF6] hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative overflow-hidden h-[320px]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#8B5CF6] hover:text-white transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#8B5CF6] hover:text-white transition-all duration-300"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#111111] mb-1">{member.name}</h3>
                <p className="text-[#8B5CF6] font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-[#666666] leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
          Ready to grow with us?
        </h2>
        <p className="text-xl text-[#666666] mb-10">
          Let's discuss how we can help you achieve your business goals and take your digital presence to the next level.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="https://calendar.app.google/Pn2PUD5NDJWr25mk8" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#1D4ED8] to-[#8B5CF6] text-white px-12 py-5 rounded-lg font-semibold text-lg hover:from-[#1E40AF] hover:to-[#7C3AED] hover:scale-105 transition-all duration-300 inline-block shadow-lg">
            Schedule a Call
          </a>
        </div>
      </div>
    </section>
  );
}
