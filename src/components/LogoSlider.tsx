export function LogoSlider() {
  const logos = [
    {
      src: '/mywelcare-healthcare-client-logo.webp',
      alt: 'MyWelcare Healthcare Solutions - Digital Marketing Client Success Story'
    },
    {
      src: '/care-made-home-care-client-logo.webp',
      alt: 'Care Made Home Care Services - Social Media Marketing Client'
    },
    {
      src: '/salon-chez-pierre-beauty-client-logo.png',
      alt: 'Salon Chez Pierre Beauty Salon - Brand Development Client'
    },
    {
      src: '/adly-travel-agency-client-logo.png',
      alt: 'ADLY Travel Agency - Content Marketing Client Success'
    },
    {
      src: '/south-surrey-client-logo.png',
      alt: 'South Surrey Client - Digital Marketing Success'
    },
    {
      src: '/therapy-supply-client-logo.png',
      alt: 'Therapy Supply - Healthcare Marketing Client'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-[#666666] mb-10 font-medium">Trusted by growing businesses across Canada & beyond</p>
        <div className="relative">
          <div className="logo-slider-mask">
            <div className="logo-slider">
              {[...logos, ...logos].map((logo, index) => (
                <div key={index} className="logo-item">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="logo-image"
                    loading="lazy"
                    width="200"
                    height="80"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
