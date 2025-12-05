import { Linkedin, Mail, Heart, Target, Users, Zap, Award, TrendingUp, Globe, Lightbulb, ArrowRight } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  fullBio: string;
  image: string;
  linkedin?: string;
  email?: string;
  expertise: string[];
  achievements: string[];
}

export function TeamPage() {
  const teamMembers: TeamMember[] = [
    {
      name: "Alex Martinez",
      role: "Founder & CEO",
      bio: "Visionary leader with 15+ years in digital marketing",
      fullBio: "Alex founded SiteMaxi with a simple mission: to help local businesses thrive in the digital age. With over 15 years of experience in digital marketing, he's worked with hundreds of businesses, from startups to Fortune 500 companies. His approach combines data-driven strategies with creative innovation.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
      linkedin: "#",
      email: "alex@sitemaxi.com",
      expertise: ["Business Strategy", "Digital Marketing", "Leadership", "Growth Hacking"],
      achievements: ["Built 3 successful marketing agencies", "Featured in Forbes", "TEDx Speaker"]
    },
    {
      name: "Sarah Chen",
      role: "Head of SEO",
      bio: "SEO expert who has ranked 500+ websites on page 1",
      fullBio: "Sarah is a certified SEO specialist with a proven track record of helping businesses dominate search results. She's passionate about technical SEO and has developed proprietary strategies that consistently deliver first-page rankings. Her analytical mindset and creative problem-solving make her invaluable to our clients.",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=800",
      linkedin: "#",
      email: "sarah@sitemaxi.com",
      expertise: ["Technical SEO", "Content Strategy", "Link Building", "Analytics"],
      achievements: ["Google Analytics Certified", "Ranked #1 for 200+ keywords", "Published SEO research"]
    },
    {
      name: "Michael Torres",
      role: "Creative Director",
      bio: "Award-winning designer with a passion for brands",
      fullBio: "Michael brings a unique blend of artistic vision and business acumen to every project. With a background in both traditional design and digital marketing, he creates visual identities that not only look stunning but also convert. His work has been featured in design publications worldwide.",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800",
      linkedin: "#",
      email: "michael@sitemaxi.com",
      expertise: ["Brand Design", "UI/UX", "Web Design", "Creative Strategy"],
      achievements: ["Webby Award Winner", "Featured in Design Week", "50+ brand transformations"]
    },
    {
      name: "Emily Rodriguez",
      role: "Content Strategist",
      bio: "Master storyteller who drives engagement and results",
      fullBio: "Emily specializes in creating content that resonates with audiences and drives measurable business results. With a journalism background and marketing expertise, she crafts compelling narratives that turn readers into customers. Her content has generated millions in revenue for clients.",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=800",
      linkedin: "#",
      email: "emily@sitemaxi.com",
      expertise: ["Content Marketing", "Copywriting", "Social Media", "Brand Voice"],
      achievements: ["Content Marketing Institute Featured", "100M+ content views", "Published author"]
    },
    {
      name: "James Wilson",
      role: "Paid Ads Manager",
      bio: "Performance marketer generating 8-figure revenue",
      fullBio: "James is a data-driven advertising specialist who has managed over $10M in ad spend across Google, Facebook, and LinkedIn. His analytical approach to campaign optimization has helped clients achieve ROI that consistently exceeds industry standards.",
      image: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=800",
      linkedin: "#",
      email: "james@sitemaxi.com",
      expertise: ["Google Ads", "Facebook Ads", "PPC Strategy", "Conversion Optimization"],
      achievements: ["Google Ads Certified", "Average 5.5x ROAS", "$10M+ ad spend managed"]
    },
    {
      name: "Lisa Park",
      role: "Social Media Director",
      bio: "Social media strategist with viral content expertise",
      fullBio: "Lisa has built and grown social media presences for dozens of brands, generating millions of organic impressions. Her understanding of platform algorithms and audience psychology allows her to create content that consistently outperforms competitors.",
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=800",
      linkedin: "#",
      email: "lisa@sitemaxi.com",
      expertise: ["Social Media Strategy", "Community Management", "Influencer Marketing", "Viral Content"],
      achievements: ["50M+ organic impressions", "Built 100K+ follower accounts", "Social Media Examiner Featured"]
    },
    {
      name: "David Kumar",
      role: "Technical Lead",
      bio: "Full-stack developer building high-performance sites",
      fullBio: "David leads our technical team, ensuring every website we build is fast, secure, and optimized for conversions. His expertise in modern web technologies and performance optimization means our clients' sites consistently outperform the competition.",
      image: "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&w=800",
      linkedin: "#",
      email: "david@sitemaxi.com",
      expertise: ["Web Development", "Performance Optimization", "Security", "Technical SEO"],
      achievements: ["Built 200+ websites", "PageSpeed expert", "Open source contributor"]
    },
    {
      name: "Rachel Foster",
      role: "Client Success Manager",
      bio: "Dedicated to ensuring every client achieves their goals",
      fullBio: "Rachel is the bridge between our team and our clients, ensuring smooth communication and outstanding results. Her proactive approach and deep understanding of digital marketing help clients maximize their investment and achieve their business objectives.",
      image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=800",
      linkedin: "#",
      email: "rachel@sitemaxi.com",
      expertise: ["Client Relations", "Project Management", "Marketing Strategy", "Analytics"],
      achievements: ["98% client satisfaction", "150+ successful projects", "Certified PMP"]
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We measure success by your success. Every strategy is designed to deliver measurable business outcomes."
    },
    {
      icon: Heart,
      title: "Client-Focused",
      description: "Your goals are our goals. We build lasting partnerships based on trust, transparency, and mutual growth."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We stay ahead of trends and leverage cutting-edge tools to give our clients a competitive advantage."
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Great work happens when great minds collaborate. We work as an extension of your team."
    }
  ];

  const stats = [
    { number: "50+", label: "Team Members" },
    { number: "500+", label: "Clients Served" },
    { number: "15", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-32 bg-gradient-to-br from-[#1D4ED8] to-[#8B5CF6] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyem00LTRoLTJ2LTJoMnYyem0wIDRoLTJ2LTJoMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center text-white">
            <div className="inline-block mb-6">
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                Our Team
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Meet the people driving<br />your success
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're a diverse team of digital marketing experts, creatives, and strategists united by one mission: helping businesses grow online.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-[#8B5CF6] font-bold text-sm tracking-wide uppercase">
                Our Values
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
              What drives us every day
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              These core values guide everything we do and shape how we work with our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border border-gray-200 hover:border-[#8B5CF6] hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-16 h-16 bg-[#EDE9FE] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-[#8B5CF6]" />
                </div>
                <h3 className="text-2xl font-bold text-[#111111] mb-3">{value.title}</h3>
                <p className="text-[#666666] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-[#8B5CF6] font-bold text-sm tracking-wide uppercase">
                Leadership & Experts
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-[#111111] mb-6 leading-tight">
              The team behind your growth
            </h2>
            <p className="text-xl text-[#666666] max-w-3xl mx-auto">
              Each member brings unique expertise and a shared commitment to delivering exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#8B5CF6] hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative overflow-hidden h-[400px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex gap-2 mb-3">
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
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#111111] mb-1">{member.name}</h3>
                  <p className="text-[#8B5CF6] font-semibold text-sm mb-3">{member.role}</p>
                  <p className="text-[#666666] leading-relaxed mb-4 text-sm">{member.bio}</p>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-xs font-semibold text-[#111111] mb-2">EXPERTISE</div>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#EDE9FE] text-[#8B5CF6] px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="text-[#8B5CF6] font-bold text-sm tracking-wide uppercase">
                  Our Culture
                </span>
              </div>
              <h2 className="text-5xl font-bold text-[#111111] mb-6 leading-tight">
                Why our team loves working here
              </h2>
              <p className="text-xl text-[#666666] mb-8 leading-relaxed">
                We've built more than a marketing agency. We've created a culture where creativity thrives, innovation is encouraged, and everyone's contribution matters.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#EDE9FE] rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111111] mb-2">Continuous Learning</h3>
                    <p className="text-[#666666] leading-relaxed">
                      We invest in our team's growth with training, certifications, and conferences.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#EDE9FE] rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111111] mb-2">Remote-First</h3>
                    <p className="text-[#666666] leading-relaxed">
                      Work from anywhere. We believe in flexibility and trust our team to deliver.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#EDE9FE] rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111111] mb-2">Recognition & Rewards</h3>
                    <p className="text-[#666666] leading-relaxed">
                      We celebrate wins, big and small, and reward exceptional performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <img
                  src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team collaboration"
                  className="w-full h-[300px] object-cover rounded-3xl shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team workspace"
                  className="w-full h-[200px] object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div className="space-y-6 pt-12">
                <img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team meeting"
                  className="w-full h-[240px] object-cover rounded-3xl shadow-lg"
                />
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Team celebration"
                  className="w-full h-[260px] object-cover rounded-3xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-[#1D4ED8] to-[#8B5CF6]">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <div className="inline-block mb-6">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
              Join Our Team
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Want to work with us?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            We're always looking for talented marketers, designers, developers, and strategists who are passionate about helping businesses grow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="bg-white text-[#8B5CF6] px-12 py-5 rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2">
              View Open Positions <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#contact"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-12 py-5 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 inline-block"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
