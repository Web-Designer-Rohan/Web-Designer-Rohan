import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';

const ABOUT_TEXT =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

const CORNER_IMAGES = [
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
    alt: 'Moon icon',
    position: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
    width: 'w-[80px] sm:w-[120px] md:w-[160px] lg:w-[210px]',
    fadeIn: { delay: 0.1, x: -80, y: 0, duration: 0.9 },
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
    alt: '3D decorative object',
    position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
    width: 'w-[60px] sm:w-[100px] md:w-[140px] lg:w-[180px]',
    fadeIn: { delay: 0.25, x: -80, y: 0, duration: 0.9 },
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
    alt: 'Lego icon',
    position: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
    width: 'w-[80px] sm:w-[120px] md:w-[160px] lg:w-[210px]',
    fadeIn: { delay: 0.15, x: 80, y: 0, duration: 0.9 },
  },
  {
    src: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
    alt: '3D decorative group',
    position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
    width: 'w-[80px] sm:w-[130px] md:w-[170px] lg:w-[220px]',
    fadeIn: { delay: 0.3, x: 80, y: 0, duration: 0.9 },
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
      style={{ background: '#0C0C0C' }}
      aria-label="About me"
    >
      {/* Corner decorative images */}
      {CORNER_IMAGES.map((img, i) => (
        <FadeIn
          key={i}
          delay={img.fadeIn.delay}
          x={img.fadeIn.x}
          y={img.fadeIn.y}
          duration={img.fadeIn.duration}
          className={`absolute ${img.position} ${img.width}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full object-contain"
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </FadeIn>
      ))}

      {/* Heading */}
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </h2>
      </FadeIn>

      {/* Animated paragraph */}
      <div className="flex flex-col items-center mt-10 sm:mt-14 md:mt-16">
        <AnimatedText
          text={ABOUT_TEXT}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[90vw] sm:max-w-[560px]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />

        {/* Contact button */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.5} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
