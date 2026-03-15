import { InfiniteSlider } from './ui/infinite-slider';

const logos = [
  {
    src: '/mywelcare-healthcare-client-logo.webp',
    alt: 'MyWelcare Healthcare Solutions',
  },
  {
    src: '/salon-chez-pierre-beauty-client-logo.png',
    alt: 'Salon Chez Pierre',
  },
  {
    src: '/adly-travel-agency-client-logo.png',
    alt: 'ADLY Travel Agency',
  },
  {
    src: '/south-surrey-client-logo.png',
    alt: 'South Surrey Medical Equipment',
  },
  {
    src: '/therapy-supply-client-logo.png',
    alt: 'Therapy Supply',
  },
  {
    src: '/care-made-home-care-client-logo.webp',
    alt: 'Care Made Home Care',
  },
];

export function LogoSlider() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-6 text-center mb-10">
        <h2 className="text-base font-semibold text-[#6B7280] tracking-wide uppercase">
          Trusted by local businesses and e-commerce brands across Canada
        </h2>
        <div className="mx-auto mt-5 h-px max-w-sm bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <InfiniteSlider gap={80} speed={60} speedOnHover={20}>
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </InfiniteSlider>
      </div>

      <div className="mx-auto mt-10 h-px max-w-2xl bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
}
