import { InfiniteSlider } from './InfiniteSlider';

const logos = [
  { src: '/salon-chez-pierre-beauty-client-logo.png', alt: 'Salon Chez Pierre' },
  { src: '/adly-travel-agency-client-logo.png', alt: 'Adly Travel' },
  { src: '/south-surrey-client-logo.png', alt: 'South Surrey Medical Equipment' },
  { src: '/therapy-supply-client-logo.png', alt: 'Therapy Supply' },
  { src: '/mywelcare-healthcare-client-logo.webp', alt: 'MyWelcare' },
];

export function LogoSlider() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-[#111111] mb-8 tracking-tight">
          Trusted by growing businesses across Canada &amp; beyond
        </p>

        <div className="h-px bg-gray-200 [mask-image:linear-gradient(to_right,transparent,black,transparent)] mb-8" />

        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <InfiniteSlider gap={72} duration={40} durationOnHover={80}>
            {logos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="h-10 w-auto object-contain select-none pointer-events-none grayscale opacity-60 hover:opacity-90 hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </InfiniteSlider>
        </div>

        <div className="h-px bg-gray-200 [mask-image:linear-gradient(to_right,transparent,black,transparent)] mt-8" />
      </div>
    </section>
  );
}
