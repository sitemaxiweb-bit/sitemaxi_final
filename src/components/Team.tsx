import { Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

export function Team() {
  const teamMembers: TeamMember[] = [
    {
      name: "Sani Nirosh",
      role: "Co-Founder",
      bio: "15+ years of strategic marketing experience helping brands grow across multiple industries. Passionate about building systems that drive real business outcomes through clear strategy, strong positioning, and modern digital execution.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "Sani@sitemaxi.com"
    },
    {
      name: "Sarah Chen",
      role: "Head of SEO",
      bio: "SEO specialist who has helped hundreds of businesses rank #1 in their markets.",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
      linkedin: "#",
      email: "sarah@sitemaxi.com"
    },
    {
      name: "Michael Torres",
      role: "Creative Director",
      bio: "Award-winning designer focused on creating brands that convert and inspire.",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
      linkedin: "#",
      email: "michael@sitemaxi.com"
    },
    {
      name: "Emily Rodriguez",
      role: "Content Strategist",
      bio: "Content expert who crafts compelling narratives that drive engagement and results.",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400",
      linkedin: "#",
      email: "emily@sitemaxi.com"
    },
    {
      name: "Rafaela Gadelha",
      role: "Social Media & Digital Communication Specialist",
      bio: "A Publicist specializing in social media and digital communication, focused on strategic content planning and audience engagement. I help brands shape their online presence through creative, purpose-driven messaging that aligns with business goals and market needs.",
      image: "/whatsapp_image_2025-12-21_at_11.36.05.jpeg",
      email: "rafaela@sitemaxi.com"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-white" id="team">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
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
      </div>
    </section>
  );
}
