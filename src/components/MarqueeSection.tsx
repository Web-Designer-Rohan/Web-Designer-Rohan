import { useRef, useEffect, useCallback } from 'react';

const ALL_GIFS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const ROW1_GIFS = ALL_GIFS.slice(0, 11);
const ROW2_GIFS = ALL_GIFS.slice(11, 21);

const row1Images = [...ROW1_GIFS, ...ROW1_GIFS, ...ROW1_GIFS];
const row2Images = [...ROW2_GIFS, ...ROW2_GIFS, ...ROW2_GIFS];

const TILE_BASE_WIDTH = 420;
const TILE_BASE_HEIGHT = 270;

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const prefersReducedMotion = useRef(false);

  const updateMarquee = useCallback(() => {
    if (prefersReducedMotion.current) return;
    if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

    row1Ref.current.style.transform = `translate3d(${offset - 200}px, 0, 0)`;
    row2Ref.current.style.transform = `translate3d(${-(offset - 200)}px, 0, 0)`;
  }, []);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion.current) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateMarquee();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateMarquee();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateMarquee]);

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ background: '#0C0C0C' }}
      aria-label="Project showcase reel"
    >
      {/* Row 1 - Moves RIGHT */}
      <div className="mb-3 overflow-hidden">
        <div
          ref={row1Ref}
          className="flex gap-2 sm:gap-3"
        >
          {row1Images.map((src, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 rounded-2xl"
              style={{ width: 'clamp(200px, 42vw, 420px)', height: 'clamp(128px, 27vw, 270px)' }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                width={TILE_BASE_WIDTH}
                height={TILE_BASE_HEIGHT}
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Moves LEFT */}
      <div className="overflow-hidden">
        <div
          ref={row2Ref}
          className="flex gap-2 sm:gap-3"
        >
          {row2Images.map((src, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 rounded-2xl"
              style={{ width: 'clamp(200px, 42vw, 420px)', height: 'clamp(128px, 27vw, 270px)' }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                width={TILE_BASE_WIDTH}
                height={TILE_BASE_HEIGHT}
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
